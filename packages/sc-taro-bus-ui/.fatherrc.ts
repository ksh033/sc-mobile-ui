const path = require('path')
import { defineConfig } from 'father'

export default defineConfig({
  esm: {
    //alias: { 'antd/lib' : 'antd/es' },
    // input: "./src/button/index.tsx",
    // platform: 'browser', // 默认构建为 Browser 环境的产物
    // transformer: 'babel', // 默认使用 babel 以提供更好的兼容
    // output: 'dist'
    transformer: 'babel',
    output: 'es'
  },
  cjs: { output: 'lib', transformer: 'babel' },

  alias: {
    '@': path.resolve(__dirname, './src')
  },

  extraBabelPlugins: [
    [
      'import',
      {
        libraryName: '@nutui/nutui-react-taro',
        libraryDirectory: 'dist/esm',
        style: true,
        camel2DashComponentName: false
      },
      'nutui-react-taro'
    ]
  ],
  platform: 'browser'
})
