/*
 * @Author: yuszhou
 * @Date: 2021-06-01 11:57:45
 * @LastEditTime: 2021-06-25 12:16:17
 * @LastEditors: Please set LastEditors
 * @Description: 打包找到所有翻译key，发送到后台配置
 * @FilePath: \front-web\loadersPlugins\language.js
 */
const fs = require('fs')
const path = require('path')
const resolve = dir => path.join(__dirname, dir)
const publicPath = '../language.txt'
const jsonData = []
fs.writeFile(resolve(publicPath),'',()=>{})
module.exports = function(source){
  console.log(source)
  const languageExge = /language\(.*?\)/g;
  source.replace(languageExge,function(matchedString) {
    const matchedStringArray = matchedString.split(/'|"/)
    const fileData = matchedStringArray[1] + "----" + matchedStringArray[3]+'\r\n'
    fs.appendFileSync(resolve(publicPath),fileData)
  })
}
