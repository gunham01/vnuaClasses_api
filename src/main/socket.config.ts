import http from "http";
import { Server } from "socket.io";

export function createConfigedSocket(app: any) {
  const httpServer = http.createServer(app);
  const socketServer = new Server(httpServer);
  configSocketServer(socketServer);
}

function configSocketServer(socketServer: Server) {
  socketServer.on("connection", (socket) => {
    socket.on("first login", () => {
      // TODO: thêm người dùng vào CSDL + chuyển hướng người dùng sang giao diện đăng nhập của MS Teams
      socket.emit("first login", "Socket run successful!"); // Code giả lập
    })
  });
}
