import fs from "fs";

export class FileIOUtils {
  public static readFile(fileLocation: string): Promise<string> {
    return new Promise((resolve, reject) => {
      fs.readFile(fileLocation, "utf-8", (err, data) => {
        if (err) { 
          reject(err);
        }
        
        resolve(data);
      })
    });
  }
}