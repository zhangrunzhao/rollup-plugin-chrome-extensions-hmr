import { Plugin } from 'rollup';
import WebSocket, { WebSocketServer } from 'ws';

const PROXY_SUFFIX = '?insert-ws-code';

interface ChromeExtensionsHmrType {
  backgroundPath: string;
  needWatchMode?: boolean;
}

/**
 * This is a hot update plugin for the development of chrome extensions
 * Thank you for reading my code
 */
const chromeExtensionsHmr = ({
  backgroundPath,
  needWatchMode = true,
}: ChromeExtensionsHmrType): Plugin => {
  let ws: WebSocket | null;
  let wss: WebSocketServer | null;
  let time: NodeJS.Timeout | null;

  return {
    name: 'chrome-extensions-hmr',

    resolveId: {
      order: 'pre',
      async handler (source, importer, option) {
        if (needWatchMode && !this.meta.watchMode) return;

        if (option.isEntry) {
          // if it's an entry file
          const resolution = await this.resolve(source, importer, { skipSelf: true, ...option });
          // if this module cannot be resolved, or is an external module, return directly
          if (!resolution || resolution.external) {
            return resolution;
          }

          if (resolution.id === backgroundPath) {
            // load module content
            await this.load(resolution);
            // marked path
            return `${resolution.id}${PROXY_SUFFIX}`;
          }
        }
        return null;
      },
    },

    load (id) {
      // if it is an entry that requires a proxy, take a special step and generate a module with an intermediate proxy
      if (id.endsWith(PROXY_SUFFIX)) {
        // obtain the path to the entry file
        const entryId = id.slice(0, -PROXY_SUFFIX.length);
        const code = `
          const ws = new WebSocket('ws://localhost:7788');
          ws.onmessage = (event) => {
            if (event.data === 'reload-extension') {
              chrome.runtime.reload();
            }
          }
          export * from ${JSON.stringify(entryId)}
        `;
        return code;
      }
      return null;
    },

    buildStart () {
      // create a websocket server if you are in listening mode
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
