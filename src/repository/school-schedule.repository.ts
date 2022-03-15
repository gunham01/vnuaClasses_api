import { SchoolSchedule } from "../model/school-schedule.model";
import { SqlModQueryResult } from "../model/sql-result.model";
import { BaseRepository } from "./base.repository";

export class SchoolScheduleRepository extends BaseRepository<SchoolSchedule> {
  public insert(schoolSchedule: SchoolSchedule): Promise<SqlModQueryResult> {
    return super._insert(
      "INSERT INTO school_schedule_tbl (semester_start_at, schedule_hash, user_id) VALUES ?",
      [
        schoolSchedule.semesterStartAt,
        schoolSchedule.scheduleHash,
        schoolSchedule.teacherId,
      ]
    );
  }

  public updateById(
    schoolSchedule: SchoolSchedule
  ): Promise<SqlModQueryResult> {
    return this._update(
      "UPDATE school_schedule_tbl SET semester_start_at = ?, schedule_hash = ?, user_id = ? WHERE id = ?",
      [
        schoolSchedule.semesterStartAt,
        schoolSchedule.scheduleHash,
        schoolSchedule.teacherId,
        schoolSchedule.id,
      ]
    );
  }
}
