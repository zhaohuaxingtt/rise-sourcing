/*
 * @Author: yuszhou
 * @Date: 2021-02-19 14:29:21
 * @LastEditTime: 2021-02-19 16:08:42
 * @LastEditors: Please set LastEditors
 * @Description: cdnElement组件化切分。
 * @FilePath: \rise\babel.config.js
 */
module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  plugins: [
    [
      "component",
      {
        "libraryName": "element-ui",
        "styleLibraryName": "theme-chalk"
      }
    ],
    [
      "component",
      {
        "libraryName": "rise",
        "styleLibraryName": "style"
      },
      "rise"
    ]

  ]
}
