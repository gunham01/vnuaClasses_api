import { SchoolEvent } from "./school-event.model";

// Dấu chấm than là "definite assigment", "x!: string" nghĩa là "biến x này ban 
// đầu sẽ có giá trị là undefined, nhưng tôi vẫn muốn bạn coi như nó là string"


export class SchoolSchedule {
  public id!: string;
  public teacherId!: string;
  public semesterStartAt!: Date;
  public events!: SchoolEvent[];
  public scheduleHash!: string;

  public constructor(initValue?: Partial<SchoolSchedule>) {
    Object.assign(this, initValue);
  }
}