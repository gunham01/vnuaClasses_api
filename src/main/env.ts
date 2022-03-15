import * as dotenv from "dotenv";
dotenv.config();  // Luôn phải có dòng này để đọc được file .env

export function getPort(): number { 
  if (!process.env.PORT) {
    process.exit(1);
  }
  
  return parseInt(process.env.PORT);
}
