import cors from "cors";
import express from "express";
import helmet from "helmet";
import { vnuaSchedule } from "../router/vnua-schedule.router";


export function initializeExpress(port: number) {
  const app  = express();

  app.use(helmet())
     .use(cors())
     .use(express.json())
     .use("/api/vnua/schedule", vnuaSchedule)
  
  const appServer = app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });

  return {
    app: app,
    server: appServer
  }
}