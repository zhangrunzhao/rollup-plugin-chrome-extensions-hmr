用于 rollup 或者 vite 来开发浏览器插件的热更新插件，只要你现在写的浏览器插件项目中有 background 模块，用它就完事了（用不了的话辛苦发下 issue ，我看到会处理的）。

rollup/vite based on the development of browser hmr plugin

# Install
Use npm/yarn to install the plugin:
```
# npm
npm install -D rollup-plugin-chrome-extensions-hmr

# yarn
yarn add rollup-plugin-chrome-extensions-hmr

```

# Usage
To to the plugin, add the following code in rollup/vite config:
```
import chromeExtensionsHmr from 'rollup-plugin-chrome-extensions-hmr';
import { resolve } from "path";

export default {
  // ....
  plugins: [
    chromeExtensionsHmr{
      backgroundPath: path.resolve(pagesDir, "background", "index.ts"),
      needWatchMode: true
    }
  ]
}
```

# Options
| Params | Type | Default Value | Description |
| ------------ | ------------- | ------------- | ------------- |
| backgroundPath | string | - | the physical address of background module |
| needWatchMode | boolean | true | is used in watch mode |
