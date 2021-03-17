/*
 * @Author: yuszhou
 * @Date: 2021-02-24 14:28:34
 * @LastEditTime: 2021-03-17 13:01:11
 * @LastEditors: Please set LastEditors
 * @Description: 针对所有的分页插件，实行方法混入。
 * @FilePath: \rise\src\utils\pageMixins.js
 */

 export const pageMixins = {
   data(){
     return {
       page:{
         totalCount:100, //总页数
         pageSize:10,   //每页多少条
         pageSizes:[10,20,50,100], //每页条数切换
         currPage:1,    //当前页
         layout:"sizes, prev, pager, next, jumper"
       }
     }
   },
   methods:{
    handleSizeChange(val,callback){
      if(typeof callback != 'function') return console.warn('function handleSizeChange parmars must be a function!')
      this.page.pageSize = val
      callback();
    },
    handleCurrentChange(val,callback){
      if(typeof callback != 'function') return console.warn('function handleCurrentChange parmars must be a function!')
      this.page.currPage = val
      callback();
    }
   }
 } 

