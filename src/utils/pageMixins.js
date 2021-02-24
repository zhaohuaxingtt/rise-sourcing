/*
 * @Author: yuszhou
 * @Date: 2021-02-24 14:28:34
 * @LastEditTime: 2021-02-24 14:45:02
 * @LastEditors: Please set LastEditors
 * @Description: 针对所有的分页插件，实行方法混入。
 * @FilePath: \rise\src\utils\pageMixins.js
 */

 export const pageMixins = {
   data(){
     return {
       page:{
         total:100,
         page:10,
         pageSizes:[10,20,50,100],
         size:1,
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

