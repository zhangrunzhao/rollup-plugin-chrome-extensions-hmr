基于 rollup/vite 开发浏览器插件的热更新插件

# 1.0.0
你必须在使用时在 background.js 中添加以下代码

```
const ws = new WebSocket('ws://localhost:7788');
  ws.onmessage = (event) => {
  if (event.data === 'reload-extension') {
  chrome.runtime.reload();
  }
}
```
