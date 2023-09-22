// generate nutui.react.ts file for dev or build
const config = require('../src/config.json')
const glob = require('glob')
const path = require('path')
const fs = require('fs-extra')

const packages = []
const onlineEditScss = []
const mds = []
const raws = []


let tsContent = []
const taroUI = []
const tsExport = []
config.nav.map((item) => {
  item.packages.forEach((element) => {
    let { name, show, exportEmpty, exclude, taro } = element

    if (taro) {
      taroUI.push(name)
      //aroUIType.push(`${name}Props`)
    }
    // if (show || exportEmpty) {
    //   importStr += `import ${name} from '@/packages/${name.toLowerCase()}';\n`
    //   importScssStr += `import '@/packages/${name.toLowerCase()}/${name.toLowerCase()}.scss';\n`

    //   packages.push(name)
    // }
    // if (show) {
    //   glob
    //     .sync(
    //       path.join(__dirname, `../src/packages/${name.toLowerCase()}/`) +
    //         '*.md'
    //     )
    //     .map((f) => {
    //       let lang = 'zh-CN'
    //       let matched = f.match(/doc\.([a-z-]+)\.md/i)
    //       if (matched) {
    //         ;[, lang] = matched
    //         const langComponentName = `${name}${lang.replace('-', '')}`
    //         importMarkdownStr += `import ${langComponentName} from '@/packages/${name.toLowerCase()}/doc.${lang}.md?raw';\n`
    //         raws.push(langComponentName)
    //       }
    //     })
    //   glob
    //     .sync(
    //       path.join(__dirname, `../src/packages/${name.toLowerCase()}/`) +
    //         'demo.scss'
    //     )
    //     .map((f) => {
    //       onlineEditScss.push(name)
    //       importOnlineEditScssStr += `import ${name}Scss from '@/packages/${name.toLowerCase()}/demo.scss?raw';\n`
    //     })
    //   importMarkdownStr += `import ${name} from '@/packages/${name.toLowerCase()}/doc.md?raw';\n`
    //   mds.push(name)
    //   raws.push(name)
    // }
  })
})

taroUI.map((name) => {
  tsContent = [];
  tsContent.push(`export {${name} as default} from "@nutui/nutui-react-taro"`);
  tsContent.push(`export type {${name}Props} from "@nutui/nutui-react-taro"`);

  tsExport.push(`export {default as ${name} } from './${name}'`);
  tsExport.push(`export type {${name}Props } from './${name}'`)
  fs.outputFile(
    path.resolve(__dirname, `../src/${name}/index.tsx`),
    tsContent.join("\r\n"),
    'utf8',
    (error) => {
      if (error) throw error
    }
  )
})


fs.outputFile(
  path.resolve(__dirname, `../src/nutui-react-taro.ts`),
  tsExport.join("\r\n"),
  'utf8',
  (error) => {
    if (error) throw error
  }
)
