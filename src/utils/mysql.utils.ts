import mysql, { Connection, ConnectionConfig } from "mysql";

export class MySQLUtils {
  public static createConnection(
    info: Readonly<ConnectionConfig>
  ): Connection {
    return mysql.createConnection(info);
  }
}

// export class MySQLQueryBuilder()
