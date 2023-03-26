import { Plugin } from 'rollup';
import WebSocket, { WebSocketServer } from 'ws';

/**
 * This is a hot update plugin for the development of chrome extensions
 */
const chromeExtensionsHmr = (): Plugin => {
  let ws: WebSocket | null;
  let wss: WebSocketServer | null;
  let time: NodeJS.Timeout | null;

  return {
    name: 'chrome-extensions-hmr',

    buildStart () {
      // Create a ws server if you are in listening mode
      if (this.meta.watchMode && !wss) {
        wss = new WebSocketServer({ port: 7788 });
        wss.on('connection', client => {
          ws = client;
        });
      }
    },

    watchChange () {
      time && clearTimeout(time);
    },

    writeBundle () {
      if (this.meta.watchMode) {
        time = setTimeout(() => {
          ws?.send('reload-extension');
        }, 500);
      }
    },

    closeWatcher () {
      ws?.close();
      time && clearTimeout(time);
    },
  };
};

export default chromeExtensionsHmr;
