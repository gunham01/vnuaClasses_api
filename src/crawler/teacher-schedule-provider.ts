import moment from "moment";
import { SchoolEvent } from "../model/school-event.model";
import { SchoolSchedule } from "../model/school-schedule.model";
import { Student } from "../model/student.model";
import { CryptoUtils } from "../utils/crypto.utils";
import { BrowserController } from "./browser.controller";
import { SchoolScheduleHelpler } from "./school-schedule.helpler";
import { WebCrawler } from "./web-crawler";

export class TeacherScheduleProvider {
  private static webCrawler: WebCrawler;
  private static readonly urlPrefix =
    "http://daotao.vnua.edu.vn/default.aspx?page=thoikhoabieu&sta=1&id=";
  private static readonly elementIds = {
    orderByPeriodRadioButton: "ctl00_ContentPlaceHolder1_ctl00_rad_ThuTiet",
    noteContainsSemesterStartDate: "ctl00_ContentPlaceHolder1_ctl00_lblNote",
  };
  private static readonly resourceLocation = {
    myJquery: "./src/resource/js/MyJQuery.js",
    captcha: "./src/resource/js/captcha.js",
    readSchedule: "./src/resource/js/readSchedule.js",
    readStudentList: "./src/resource/js/readStudentList.js",
  };

  /**
   * Lấy lịch giảng dạy của giảng viên trong trang đào tạo, với mã giảng viên nhận được từ hàm tạo
   * @returns lịch giảng dạy
   */
  public static async getSchedule(teacherId: string): Promise<SchoolSchedule> {
    await this.initializeWebCrawler(`${this.urlPrefix}${teacherId}`);
    await new SchoolScheduleHelpler(this.webCrawler).perpare();

    let [semesterStartDate, teachingEvents] = await Promise.all([
      this.getSemesterStartDate(),
      this.readScheduleOnWeb(),
    ]);
    teachingEvents = await this.getStudentListForTeachingEvents(teachingEvents);
    this.webCrawler.closeAndQuit();

    let teachingSchedule = new SchoolSchedule({
      teacherId: teacherId,
      semesterStartAt: semesterStartDate,
      events: teachingEvents,
      scheduleHash: CryptoUtils.createHash(
        JSON.stringify(teachingEvents),
        "sha256"
      ),
    });

    return teachingSchedule;
  }

  private static async initializeWebCrawler(url: string) {
    this.webCrawler = new WebCrawler(await BrowserController.openChrome());
    this.webCrawler.navigateTo(url);
  }

  /**
   * Lấy ngày bắt đầu của học kỳ trên trang thời khóa biểu
   * @returns ngày bắt đầu của học kỳ
   */
  private static async getSemesterStartDate(): Promise<Date> {
    const noteElement = await this.webCrawler.elementController.getElementById(
      TeacherScheduleProvider.elementIds.noteContainsSemesterStartDate
    );
    const noteContent = await noteElement.getText();
    const semesterStartDateStr = noteContent.match(
      /\d{1,2}\/\d{1,2}\/\d{4}/
    )?.[0];
    if (semesterStartDateStr === undefined) {
      throw Error("Không tìm thấy ngày bắt đầu học kỳ");
    }

    return moment(semesterStartDateStr, "DD/MM/YYYY").toDate();
  }

  /**
   * Đọc lịch giảng dạy
   * @returns lịch giảng dạy
   */
  private static async readScheduleOnWeb(): Promise<SchoolEvent[]> {
    try {
      return this.webCrawler.scriptExecutor.executeScript(
        TeacherScheduleProvider.resourceLocation.readSchedule
      ) as Promise<unknown> as Promise<SchoolEvent[]>;
    } catch (error) {
      await this.webCrawler.closeAndQuit();
      console.error("error when reading schedule: ", error);
      throw new Error("Lỗi khi đọc thời khóa biểu");
    }
  }

  /**
   * Thêm danh sách sinh viên vào các sự kiện giảng dạy
   * @param teachingEvents các sự kiện giảng dạy
   * @returns các sự kiện giảng dạy đi kèm với danh sách sinh viên tương ứng
   */
  private static async getStudentListForTeachingEvents(
    teachingEvents: SchoolEvent[]
  ): Promise<SchoolEvent[]> {
    for (const event of teachingEvents) {
      event.studentListContent = await this.readStudentList(
        event.studentListUrl
      );
    }

    return teachingEvents;
  }

  /**
   * Đọc danh sách sinh viên từ link
   * @param studentListUrl link danh sách sinh viên
   * @returns danh sách sinh viên
   */
  private static async readStudentList(
    studentListUrl: string
  ): Promise<Student[]> {
    await this.webCrawler.navigateTo(studentListUrl);
    try {
      return this.webCrawler.scriptExecutor.executeScript(
        TeacherScheduleProvider.resourceLocation.readStudentList
      ) as Promise<unknown> as Promise<Student[]>;
    } catch (error) {
      await this.webCrawler.closeAndQuit();
      console.error("error when reading student list: ", error);
      throw new Error("Lỗi khi đọc danh sách sinh viên");
    }
  }
}
