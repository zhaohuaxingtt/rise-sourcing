<!--
 * @Author: yuszhou
 * @Date: 2021-05-26 19:14:39
 * @LastEditTime: 2021-06-16 20:56:27
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\views\partsrfq\editordetail\components\rfqDetailTpzs\components\quotationScoringTracking\components\tableList.vue
-->

<template>
  <div>
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
              <!-- {{scope.row[item.props]?scope.row[item.props].rate:""}} <span @click="optionLog" class="cursor"><icon v-if='scope.row[item.props] == 1' name='iconzhongyaoxinxitishi' symbol></icon></span> -->
              <span>{{scope.row[item.props]}}</span>
            </span>
          </template>
        </el-table-column>
        <el-table-column v-if='item.props == "mq" || item.props == "pl"' :key="index" :label="item.key ? $t(item.key) : item.name" :prop="item.props" :show-overflow-tooltip="item.tooltip" :width="item.width" align="center">
          <template slot-scope="scope">
            <!-- <span>{{scope.row[item.props]?scope.row[item.props].rate:""}}</span> -->
            <span>{{scope.row[item.props]}}</span>
          </template>
        </el-table-column>
        <el-table-column v-if="item.props == 'supplierName'" :key="index" :label="item.key ? $t(item.key) : item.name" :prop="item.props" :show-overflow-tooltip="item.tooltip" :width="item.width" align="center">
          <template slot-scope="scope">
            {{scope.row[item.props]?scope.row[item.props]:"-"}}
          </template>
        </el-table-column>
        <el-table-column v-if="(item.props+'').indexOf('round') > -1" :key="index" align="center" :label="item.key ? $t(item.key) : item.name" :prop="item.props" :show-overflow-tooltip="item.tooltip" :width="item.width">
          <template slot-scope="scope">
          <!--------------------------------------------------------->
          <!------------------------内容是打勾------------------------>
          <!--------------------------------------------------------->
            <span v-if='scope.row[item.props].schedule == 3' class="cursor" @click="openUrl('3',scope.row,item.props)">
              <icon name='iconbaojiazhuangtailiebiao_yibaojia' symbol></icon>
            </span>
          <!--------------------------------------------------------->
          <!------------------------内容是打叉------------------------>
          <!--------------------------------------------------------->
            <span v-else-if='scope.row[item.props].schedule == 2' class="cursor" @click="openUrl('2',scope.row,item.props)">
              <icon name='iconbaojiazhuangtailiebiao_yijujue' symbol></icon>
            </span>
          <!--------------------------------------------------------->
          <!------------------------内容是横岗百分比------------------->
          <!--------------------------------------------------------->
          <span v-else class="cursor">{{scope.row[item.props].schedule}}</span>
          </template>
        </el-table-column>
      </template>
    </el-table>  
    <div class="miaosu">
      <span><icon name='iconbaojiazhuangtailiebiao_yibaojia' symbol></icon> 全报</span>
      <span><icon name='iconbaojiazhuangtailiebiao_yijujue' symbol></icon> 已拒绝</span>
      <span><i>—</i> 已收RFQ尚未接受报价</span>
      <span>n/m 共m个零件，已进行n个零件的报价</span>
    </div>
          <!--------------------------------------------------------->
          <!------------------------零件评分弹窗----------------------->
          <!--------------------------------------------------------->

    <riteDialog :dialogVisible='dialogVisible'></riteDialog>
  </div>
</template>
<script>
import {icon} from 'rise'
import riteDialog from '@/views/designate/designatedetail/decisionData/bdl/partsRating.vue'
export default{
  components:{icon,riteDialog},
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
      height:0,
      dialogVisible:false
    }
  },
  mounted(){
    // this.$nextTick(()=>{
    //   this.height = document.querySelector('.el-table').offsetHeight
    // })
  },
  methods:{
    /**
     * @description: 打开评分弹窗。
     * @param {*}
     * @return {*}
     */
    optionLog(){
      this.dialogVisible = !this.dialogVisible
    },
    openUrl(type,items,round){
      const router = this.$router.resolve({
        path:'/supplier/quotationdetail',
        query:{
          rfqId:17,
          round:parseInt(round),
          supplierId:items.supplierId,
          fsNum:'FS21-00102'
        }
      })
      window.open(router.href,'_blank')
    }
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
  .miaosu{
    color: #000000;
    opacity: 0.3;
    margin-top:10px;
    span{
      margin-right: 10px;
    }
  }
</style>