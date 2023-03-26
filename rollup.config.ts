import typescript from '@rollup/plugin-typescript';
import { RollupOptions } from 'rollup';

const configs: RollupOptions[] = [
  {
    input: './src/index.ts',
    output: {
      dir: 'dist',
      format: 'esm',
      entryFileNames: '[name].esm.js',
    },
    plugins: [typescript()],
  },
];

export default configs;
