import { WebCrawler } from "./web-crawler";

export class SchoolScheduleHelpler {
  private readonly jsLocaltion = {
    myJquery: "./src/resource/js/MyJQuery.js",
    captcha: "./src/resource/js/captcha.js",
  }
  private readonly webElementId = {
    orderByPeriodRadioButton: "ctl00_ContentPlaceHolder1_ctl00_rad_ThuTiet"
  }

  public constructor(private webCrawler: WebCrawler) {}

  public async perpare(): Promise<void> {
    await Promise.all([
      this.handleAlertIfExists(),
      this.injectJQuery(),
      this.fillCaptchaIfExists(),
    ]);
    await this.selectOrderByPeriod();
  }

  private async handleAlertIfExists(): Promise<void> {
    let alertMessage =
      await this.webCrawler.elementController.getAcceptMessageIfExistAndAcceptIt();
    if (alertMessage !== null) {
      await this.webCrawler.closeAndQuit();
      if (
        alertMessage ===
        "Server đang tải lại dữ liệu. Vui lòng trở lại sau 15 phút!"
      ) {
        throw new Error(alertMessage);
      } else {
        throw new Error("Lỗi khi mở website thời khóa biểu");
      }
    }
  }

  private async injectJQuery(): Promise<void> {
    try {
      await this.webCrawler.scriptExecutor.executeScriptAsync(
        this.jsLocaltion.myJquery
      );
    } catch (error) {
      await this.webCrawler.closeAndQuit();
      console.error("error when inject jquery: ", error);
      throw new Error("Lỗi khi inject JQuery");
    }
  }

  private async fillCaptchaIfExists(): Promise<void> {
    try {
      await this.webCrawler.scriptExecutor.executeScript(
        this.jsLocaltion.captcha
      );
    } catch (error) {
      await this.webCrawler.closeAndQuit();
      console.error("error when filling captcha: ", error);
      throw new Error("Lỗi khi tự động điền captcha");
    }
  }

  private async selectOrderByPeriod(): Promise<void> {
    const orderRadioButton = await this.webCrawler.elementController.getElementById(
      this.webElementId.orderByPeriodRadioButton,
      50
    );
    await orderRadioButton.click();
  }
}