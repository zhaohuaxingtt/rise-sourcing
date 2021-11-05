/*
 * @Author: yuszhou
 * @Date: 2021-06-01 15:11:26
 * @LastEditTime: 2021-06-02 10:19:08
 * @LastEditors: Please set LastEditors
 * @Description: 当loader把文件形成后，需要借助当前工具将text中的文件上传到nodeServers
 * @FilePath: \front-web\loadersPlugins\pluginLanguage.js
 */
const fs = require('fs')
const path = require('path')
const resolve = dir => path.join(__dirname, dir)
const publicPath = '../language.txt'
const http = require('http');
const qs = require('querystring'); 
class NodeserverUpload {
  constructor(props){}
  apply(compiler){
    compiler.hooks.done.tap('Upload',function(){
     let data = []
     const languageTxt = fs.readFileSync(resolve(publicPath),'UTF-8')
     data = this.translateTxtToJson(languageTxt)
     const requstUpload =  http.request(this.options(data),function(params) {
        params.on('data',function (res) {
          console.log('-----------------在线文件包上传成功！------------------------')
        })
      })
      requstUpload.on('error',function(err){
        console.log('------------------在线文件包上传失败！------------------------')
      })
      console.log(data)
      requstUpload.write(data+'')
      requstUpload.end()
    }.bind(this))
  }
  options(){
    return {
      hostname: '10.160.137.73',  
      port: 3000,  
      path: '/i18n/api/putTranslationMap',  
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8'
      }
    }
  }
  translateTxtToJson(languageTxt){
    const ArrayList = []
    const url = languageTxt.split(/(\r\n)/g)
    url.forEach(element => {
      if(element!='' && element.split('----')[1]){
        ArrayList.push({
          name:element.split('----')[1],
          key:element.split('----')[0],
          project:'sourcing'
        })
      }
    });
    return ArrayList
  }
}

module.exports = NodeserverUpload
