import { Student } from "./student.model";

export interface SchoolEvent {
  subjectId: string;
  subjectName: string;
  subjectGroup: number;
  subjectClassCodes: string[];
  subjectPracticeGroup: number | null;
  
  dayOfWeekIndex: number;
  startPeriod: number;
  endPeriod: number;
  weekStr: string;

  location: string
  studentListUrl: string;
  studentListContent: Student[];
}