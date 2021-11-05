/*
 * @Author: yuszhou
 * @Date: 2021-04-07 10:57:19
 * @LastEditTime: 2021-04-07 11:47:36
 * @LastEditors: Please set LastEditors
 * @Description: 由于大众的环境无法在启动docker的时候定义环境变量参数
 *               根据npm启动参数获取环境变量重写nginxConfig达到一套环
 *               境多个部署的效果,并且这个只是在除dev环境中运行。
 * @FilePath: \front-web\src\utils\loader\translateNginx.config.js
 */
const fs = require('fs')
const path = require('path')
const resolve = dir => path.join(__dirname, dir)

/*********************************获取当前项目中的dockerFile，动态替换关键字*************************************/
class ChangeNginxConfig {
  constructor(options){}
  apply(compiler){
    compiler.plugin('compilation',async function(){
      try {
        const nginxConfig = await fs.readFileSync(resolve('../nginx.template.conf'),'utf-8').replace('NODE_ENV_PATH',process.env.VUE_APP_NGINX_PATH)
        console.log(`-----------------------生成的nginx配置文件为:---------------------------------------------`)
        console.log(nginxConfig)
        fs.writeFile(resolve('../nginx.conf'),nginxConfig,(err)=>{
          if(err){
            console.log(`-----------------------写入配置文件错误:---------------------------------------------`)
            console.log(err)
          }
        })
      }catch (err){
        console.error(err);
      }
    })
  }
}

module.exports = ChangeNginxConfig
