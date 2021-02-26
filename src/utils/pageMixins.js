/*
 * @Author: yuszhou
 * @Date: 2021-02-24 14:28:34
 * @LastEditTime: 2021-02-26 10:33:23
 * @LastEditors: Please set LastEditors
 * @Description: 针对所有的分页插件，实行方法混入。
 * @FilePath: \rise\src\utils\pageMixins.js
 */

 export const pageMixins = {
   data(){
     return {
       page:{
         total:100, //总页数
         page:10,   //每页多少条
         pageSizes:[10,20,50,100], //每页条数切换
         size:1,    //当前页
         layout:"total, sizes, prev, pager, next, jumper"
       }
     }
   },
   methods:{
    handleSizeChange(val,callback){
      if(typeof callback != 'function') return console.warn('function handleSizeChange parmars must be a function!')
      this.page.page = val
      callback();
    },
    handleCurrentChange(val,callback){
      if(typeof callback != 'function') return console.warn('function handleCurrentChange parmars must be a function!')
      this.page.size = val
      callback();
    }
   }
 } 

