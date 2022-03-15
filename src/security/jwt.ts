import { sign } from "jsonwebtoken";

export class JWT {
  public static generateAccessToken(payload: string | object | Buffer) {
    const secretAccessToken = process.env.SECRET_ACCESS_TOKEN;
    if (secretAccessToken === undefined) {
      throw new Error("Missing secret access token in .env");
    }

    sign(payload, secretAccessToken, {expiresIn: "5m"});
  }
}