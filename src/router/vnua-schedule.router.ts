import express, { Request, Response } from "express";
import { TeacherScheduleProvider } from "../crawler/teacher-schedule-provider";
import { HttpStatus } from "../utils/http.utils";

export const vnuaSchedule = express.Router();
vnuaSchedule.get("/teacher/:id", getTeacherSchedule);

async function getTeacherSchedule(request: Request, response: Response) {
  const teacherId = request.params.id;
  try {
    const teacherSchedule = await TeacherScheduleProvider.getSchedule(
      teacherId
    );
    response.status(HttpStatus.OK).send(teacherSchedule);
  } catch (error) {
    // console.log(error);
    response.status(HttpStatus.INTERNAL_SERVER_ERROR).send(error);
  }
}
