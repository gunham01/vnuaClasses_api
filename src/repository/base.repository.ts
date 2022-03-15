import { Connection, MysqlError } from "mysql";
import { SqlModQueryResult } from "../model/sql-result.model";
import { MySQLUtils } from "../utils/mysql.utils";

export class BaseRepository<TModel> {
  protected mysqlConnection: Connection;

  constructor() {
    this.mysqlConnection = MySQLUtils.createConnection({
      host: "localhost",
      database: "msteams_teacher_schedule",
      user: "root",
      password: "",
    });
  }

  private async connect(): Promise<undefined> {
    return new Promise((resolve, reject) => {
      this.mysqlConnection.connect((error: MysqlError) => {
        error ? reject(error) : resolve(undefined);
      });
    });
  }

  protected async query<TResult>(
    queryString: string,
    args?: any[]
  ): Promise<TResult> {
    await this.connect();
    return new Promise((resolve, reject) => {
      this.mysqlConnection.query(
        queryString,
        args ? [args] : [],
        (error: MysqlError | null, result: TResult) => {
          error ? reject(error) : resolve(result);
        }
      );
    });
  }

  protected async _get(
    queryString: string,
    args?: (number | string | object)[]
  ): Promise<TModel> {
    return this.query<TModel>(queryString, args);
  }

  protected async _insert(
    queryString: string,
    args?: (number | string | object)[]
  ): Promise<SqlModQueryResult> {
    return this.query<SqlModQueryResult>(queryString, args);
  }

  protected async _update(
    queryString: string,
    args?: (number | string | object)[]
  ): Promise<SqlModQueryResult> {
    return this.query<SqlModQueryResult>(queryString, args);
  }

  protected async _delete(
    queryString: string,
    args?: (number | string | object)[]
  ): Promise<SqlModQueryResult> {
    return this.query<SqlModQueryResult>(queryString, args);
  }
}
