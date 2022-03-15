import { User } from "../model/user.model";
import { BaseRepository } from "./base.repository";

export class UserRespoitory extends BaseRepository<User> {
  public insert(user: User) {
    return super._insert(
      "INSERT INTO user_tbl (fullname, email) VALUES ?",
      [user.fullname, user.email]
    );
  }

  public getByEmail(userEmail: string): Promise<User> {
    return this._get(
      "SELECT * FROM user_tbl WHERE user_email = ?",
      [userEmail]
    );
  }
}
