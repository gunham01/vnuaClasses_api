import bcrypt from "bcryptjs";
import { createHash } from "crypto";

export class CryptoUtils {
  public static createHash(
    value: string,
    algorithm: HashAlgorithm
  ): string {
    return createHash(algorithm).update(value).digest("hex");
  }

  public static async hashPasswordWithBcrypt(password: string): Promise<string> {
    const salt = await bcrypt.genSalt();
    return bcrypt.hash(password, salt);
  }
}

export type HashAlgorithm = "sha256" | "md5";
