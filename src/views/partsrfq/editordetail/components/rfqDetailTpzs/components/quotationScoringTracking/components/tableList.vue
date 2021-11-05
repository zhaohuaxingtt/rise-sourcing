<!--
 * @Author: yuszhou
 * @Date: 2021-05-26 19:14:39
 * @LastEditTime: 2021-11-03 11:10:15
 * @LastEditors:  
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\views\partsrfq\editordetail\components\rfqDetailTpzs\components\quotationScoringTracking\components\tableList.vue
-->

<template>
  <div>
    <el-table class="table" tooltip-effect="light" height="400px"  :data="tableData" v-loading="tableLoading" :empty-text="$t('LK_ZANWUSHUJU')">
      <template v-for="(item,index) in tableTile">
        <!--------------------------------------------------------->
        <!------------------------ep模块---------------------------->
        <!--------------------------------------------------------->
        <!-- <el-table-column v-if='item.props == "ep"' :key="index" align="center" :label="item.key ? $t(item.key) : item.name" :prop="item.props" :show-overflow-tooltip="item.tooltip">
          <template slot="header" slot-scope="scope">
              <div class="mineTile">{{scope.column.label}} <span class="line" :style='`height:${height}px;`'></span></div> 
          </template>
          <template slot-scope="scope"> -->
          <!--------------------------------------------------------->
          <!------------------------ep模块如果出现警告------------------>
          <!--------------------------------------------------------->
              <!-- <span>{{scope.row[item.props]}}</span> -->
            <!-- </span> -->
          <!-- </template>
        </el-table-column> -->

        <el-table-column v-if="item.props == 'supplierName'" fixed :key="index" :label="item.key ? $t(item.key) : item.name" :prop="item.props" :show-overflow-tooltip="item.tooltip" :width="200" align="center">
          <template slot-scope="scope">
            {{scope.row[item.props]?scope.row[item.props]:"-"}}
          </template>
        </el-table-column>
        <el-table-column v-else-if="(item.props+'').indexOf('round') > -1" :key="index" align="center" :label="item.key ? $t(item.key) : item.name" :prop="item.props" :show-overflow-tooltip="item.tooltip" :width="160">
          <template slot="header">
            <el-tooltip effect="light">
              <template slot="content">
               <p>{{`询价开始时间: ${item.roundHeadDetailVO.roundsStartTime || "-"}`}}</p>
               <p>{{`询价结束时间: ${item.roundHeadDetailVO.roundsEndTime || "-"}`}}</p>
              </template>
              <span>{{item.key ? $t(item.key) : item.name}}<icon v-if='item.roundHeadDetailVO.isNoBidOpen' name='iconweikaibiao' symbol class="margin-left5"></icon></span>
            </el-tooltip>
          </template> 
          <template slot-scope="scope">
          <!--------------------------------------------------------->
          <!------------------------内容是打勾------------------------>
          <!--------------------------------------------------------->
            <span v-if='scope.row[item.props].schedule == 3 && scope.row[item.props].quotationId' class="cursor blue-color" @click="openUrl('3',scope.row,item.props,scope.row[item.props].schedule,item.roundHeadDetailVO)">
              <icon name='iconbaojiazhuangtailiebiao_yibaojia' symbol></icon>
            </span>
          <!--------------------------------------------------------->
          <!------------------------内容是打叉------------------------>
          <!--------------------------------------------------------->
            <span v-else-if='scope.row[item.props].schedule == 2 && scope.row[item.props].quotationId' class="cursor blue-color" @click="openUrl('2',scope.row,item.props,scope.row[item.props].schedule,item.roundHeadDetailVO)">
              X
            </span>
          <!--------------------------------------------------------->
          <!------------------------内容是横岗百分比------------------->
          <!--------------------------------------------------------->
          <template v-else>
            <span v-if='scope.row[item.props].quotationId' class="cursor blue-color" @click="openUrl('1',scope.row,item.props,scope.row[item.props].schedule,item.roundHeadDetailVO)">{{scope.row[item.props].schedule}}</span>
            <span v-else>\</span>
          </template>
          </template>
        </el-table-column>
        <el-table-column v-else :key="index" :label="item.key ? $t(item.key) : item.name" :prop="item.props" :show-overflow-tooltip="item.tooltip" align="center">
          <template slot-scope="scope">
            <template v-if="scope.row && scope.row[item.props]">
               <span>{{scope.row[item.props].rate}} <span @click="optionLog(scope.row)" class="cursor"><icon v-if='scope.row[item.props].rate == "C"' name='iconzhongyaoxinxitishi' symbol></icon></span></span>
            </template>
          </template>
        </el-table-column>
      </template>
    </el-table>  
    <div class="miaosu">
      <span><icon name='iconbaojiazhuangtailiebiao_yibaojia' symbol></icon> 全报</span>
      <span>\ 未发生询价</span>
      <span><icon name='iconbaojiazhuangtailiebiao_yijujue' symbol></icon> 已拒绝</span>
      <span><i>—</i> 已收RFQ尚未接受报价</span>
      <span>n/m 共m个零件，已进行n个零件的报价</span>
      <span><icon name='iconweikaibiao' symbol class="margin-right5"></icon>尚未开标的轮次，无法查看报价内容</span>
    </div>
          <!--------------------------------------------------------->
          <!------------------------零件评分弹窗----------------------->
          <!--------------------------------------------------------->

    <riteDialog :dialogVisible='dialogVisible' :rfqId='this.$route.query.id' :supplierId='supplierId'></riteDialog>
  </div>
</template>
<script>
import {icon,iMessage} from 'rise'
import riteDialog from '@/views/designate/designatedetail/decisionData/bdl/partsRating.vue'
import { getPorpsNumber } from '../../quotationScoringHz/components/data'
import {onlyselfProject} from '@/config/index'
export default{
  inject:['getbaseInfoData'],
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
      dialogVisible:false,
      baseInfo:{},
      supplierId:''
    }
  },
  methods:{
      /**
   * @description: 跳转到报价汇总问题 
   * @param {*}
   * @return {*}
   */
  getQueryDatas(type,items,round,value){
      const map = {
            rfqId:this.$route.query.id || '',
            round:round.replace(/[^0-9]/ig,""),
            supplierId:items.supplierId,
            fsNum:items[round].partPrjCode || ''
          }
      if(round.replace(/[^0-9]/ig,"") != this.getbaseInfoData().currentRounds || this.getbaseInfoData().currentRoundsStatus == "已关闭"){
        // map['fix'] = true
        map['sourcing'] = true
      }else{
        if(type == 3){
          map['currentTab'] = "costsummary"
          map['sourcing'] = true
        }
        if(type == 2){
          map['fix'] = true
          map['sourcing'] = true
        }else{
          if(value.indexOf('/') > -1) {
            map['currentTab'] = "costsummary"
            map['sourcing'] = true
          } else {
            map['sourcing'] = true
          }
        }

        map['watingSupplier'] = true
      }
      return map
    },
    /**
     * @description: 打开评分弹窗。
     * @param {*}
     * @return {*}
     */
    optionLog(items){
      this.supplierId = items.supplierId
      this.dialogVisible = !this.dialogVisible
    },
    /**
     * @description: 跳转逻辑。第一 出现在界面上的所有图标都可以跳转。
     *                        第二 最新轮次跳转过去才和报价状态有关系，其他的都代表以及结束的轮次，只有预览的效果 fix 为 true
     *                        第三  当供应商状态为 √  报价成本汇总 代供应商报价
     *                                           x  详细信息    无按钮
     *                                            m/n 同 打勾
     *                                            -  报价成本汇总  接受报价，拒绝报价
     * 
     *                        第四：基于以上第三点 都取决于rfq状态，如果rfq是已经关闭的状态 则为 fix 
     *                        第五：所有供应商中，如果对应得有开标轮，得等到开标后采购员才能去给供应商报价。
     * @param {*} type
     * @param {*} items
     * @param {*} round
     * @return {*}
     */
    openUrl(type,items,round,value,headerVo){
      if(headerVo.isNoBidOpen) return iMessage.warn(this.language('DANGQIANLUNCIWEIKAIBIAO','当前轮次还未开标，请开标后再试'))

      const datas = this.getQueryDatas(type,items,round,value)

      const {query} = this.$route;
      const {businessKey=""} = query;
      // 若是aeko跳转到akeo的报价单
      if(businessKey == onlyselfProject.AEKOLINGJIAN){
        const {round} = datas;
        const {quotationId =''} = items['round'+round];
         const route = this.$router.resolve({
          path: '/aeko/quotationdetail',
          query: {
            quotationId,
          }
        })
        window.open(route.href,'_blank')

      }else{
        const router = this.$router.resolve({
          path:'/sourceinquirypoint/sourcing/supplier/quotationdetail',
          query:datas
        })
        window.open(router.href,'_blank')
       }
    }
  }
}
</script>
<style lang='scss' scoped>
  .blue-color{
    color:rgb(23, 99, 247)
  }
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