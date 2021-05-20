/*
 * @Author: yangzhen
 * @Date: 2021-05-19 14:28:34
 * @Description: 针对页面高度适配table高度
 */

 export const tableHeight = {
   data(){
     return {
       tableHeight: 0
     }
   },
   created() {
       this.tableHeight = document.documentElement.clientHeight || document.body.clientHeight
       window.onresize = () => {
           this.tableHeight = document.documentElement.clientHeight || document.body.clientHeight
       }
   }
 } 

