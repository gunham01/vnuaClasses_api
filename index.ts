import { initializeExpress } from './src/main/app.config';
import { getPort } from './src/main/env';
import { createConfigedSocket } from './src/main/socket.config';
import { WebpackHotModule } from './src/model/webpack-hot-module.model';

const port = getPort();
const { app, server } = initializeExpress(port);
createConfigedSocket(app);

// Webpack HRM Activation
declare const module: WebpackHotModule
if (module.hot) {
  module.hot.accept();
  module.hot.dispose(() => server.close());
}