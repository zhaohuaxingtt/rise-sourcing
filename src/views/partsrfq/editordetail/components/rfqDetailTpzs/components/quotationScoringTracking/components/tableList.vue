<!--
 * @Author: yuszhou
 * @Date: 2021-05-26 19:14:39
 * @LastEditTime: 2021-05-27 10:43:06
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\views\partsrfq\editordetail\components\rfqDetailTpzs\components\quotationScoringTracking\components\tableList.vue
-->

<template>
<el-table class="table" tooltip-effect="light"  :data="tableData" v-loading="tableLoading" :empty-text="$t('LK_ZANWUSHUJU')">
    <template v-for="(item,index) in tableTile">
       <!--------------------------------------------------------->
       <!------------------------ep模块---------------------------->
       <!--------------------------------------------------------->
       <el-table-column v-if='item.props == "ep"' :key="index" align="center" :label="item.key ? $t(item.key) : item.name" :prop="item.props" :show-overflow-tooltip="item.tooltip" :width="item.width">
         <template slot="header" slot-scope="scope">
            <div class="mineTile">{{scope.column.label}} <span class="line" :style='`height:${height}px;`'></span></div> 
         </template>
        <template slot-scope="scope">
        <!--------------------------------------------------------->
        <!------------------------ep模块如果出现警告------------------>
        <!--------------------------------------------------------->
          <span>
            {{scope.row[item.props]}} <icon v-if='scope.row[item.props] == 1' name='iconzhongyaoxinxitishi' symbol></icon>
          </span>
        </template>
       </el-table-column>
       <el-table-column v-else :key="index" align="center" :label="item.key ? $t(item.key) : item.name" :prop="item.props" :show-overflow-tooltip="item.tooltip" :width="item.width">
         <template slot-scope="scope">
           <span v-if='scope.row[item.props] == 0'>
             <icon name='iconbaojiazhuangtailiebiao_yibaojia' symbol></icon>
           </span>
            <span v-else-if='scope.row[item.props] == 1'>
             <icon name='iconbaojiazhuangtailiebiao_yijujue' symbol></icon>
           </span>
           <span v-else>{{scope.row[item.props]}}</span>
         </template>
       </el-table-column>
    </template>
  </el-table>  
</template>
<script>
import {icon} from 'rise'
export default{
  components:{icon},
  props:{
    tableTile:{
      type:Array,
      default:()=>[]
    },
    tableData:{
      type:Array,
      default:()=>[]
    },
    tableLoading:Boolean
  },
  data(){
    return {
      height:0
    }
  },
  mounted(){
    this.$nextTick(()=>{
      this.height = document.querySelector('.el-table').offsetHeight
    })
  }
}
</script>
<style lang='scss' scoped>
  .mineTile{
    .line{
      position: absolute;
      left: 0px;
      height: 330px;
      z-index: 9999;
      width: 1px;
      border-left:2px dotted #ccc  
  }
  }
</style>