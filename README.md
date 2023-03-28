# rollup-plugin-chrome-extensions-hmr
用于 rollup 或者 vite 来开发浏览器插件的热更新插件，只要你有的项目中有 background 模块，用它就完事了（用不了的话辛苦发下issue，我看到会处理的）。
rollup/vite based on the development of browser hmr plugin

# 1.0.4
Complete the business code automatic generation, you just in use

```
// vite.config.js or rollup.config.js
import chromeExtensionsHmr from 'rollup-plugin-chrome-extensions-hmr';
import { resolve } from "path";

export default {
  ....
  plugins: [
    chromeExtensionsHmr{
      backgroundPath: path.resolve(pagesDir, "background", "index.ts"),
      needWatchMode: true
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
