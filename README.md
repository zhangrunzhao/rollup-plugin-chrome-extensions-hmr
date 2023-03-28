# rollup-plugin-chrome-extensions-hmr
rollup/vite based on the development of browser hmr plugin

# 1.0.3
Complete the business code automatic generation, you just in use

```
// vite.config.js or rollup.config.js
import chromeExtensionsHmr from 'rollup-plugin-chrome-extensions-hmr';
import { resolve } from "path";

export default {
  ....
  plugins: [
    chromeExtensionsHmr{
    backgroundPath: path.resolve(pagesDir, "background", "index.ts")
    }
  ]
}
```


# 1.0.0
You must add the following code to background.js when using

```
const ws = new WebSocket('ws://localhost:7788');
ws.onmessage = (event) => {
  if (event.data === 'reload-extension') {
    chrome.runtime.reload();
  }
}
```
