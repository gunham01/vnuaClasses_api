
/**
 * Object mà query insert/update/delete trả về
 */
export interface SqlModQueryResult {
  affectedRows: number;
  insertId?: number;
  changedRow?: number
}