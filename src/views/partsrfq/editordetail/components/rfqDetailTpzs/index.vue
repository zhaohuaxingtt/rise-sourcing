<!--
 * @Author: yuszhou
 * @Date: 2021-05-25 13:01:23
 * @LastEditors: caopeng
 * @Description: 报价助手界面
 * @FilePath: \front-sourcing-new\src\views\partsrfq\editordetail\components\rfqDetailTpzs\index.vue
-->
<template>
  <iTabsList v-model="activityTabIndex"
             @tab-click="handleTabClick"
             type="card"
             slot="components"
             class='margin-top20'>
    <el-tab-pane name="one"
                 label="报价分析">
      <template>
        <div class="right-btn">
          <!-- <iButton  @click="addFile(1,'报价与评分跟踪')" >点击</iButton> -->
          <iButton @click="handleReport"
                   v-permission.auto="RFQ_DETAIL_TIPS_NEGOTIATEBASIC_BUTTON_BAOGAOQINGDAN|报告清单">{{ $t('TPZS.BGQD') }}</iButton>
        </div>
        <!--------------------报价评分跟踪----------------------------------------->
        <iCard id="card1"
               :title="'报价与评分跟踪'+`<span class='cursor' ><i style='color:#1660f1; font-weight: bold;font-size: 18px;' class='el-icon-shopping-cart-1'></i></span>`"
               @handleTitle="addFile($event,1,'报价与评分跟踪')"
               @handleCollapse="handleCollapse($event,'1')"
               collapse
               v-permission.auto="RFQ_DETAIL_TIPS_BAOJIAYUPINGFENGENZONG|报价与评分跟踪">
          <quotationScoringTracking v-if='cardShow.find(items=>items.key == "1").show'></quotationScoringTracking>
        </iCard>
        <!--------------------报价分析汇总-零件----------------------------------------->
        <iCard id="card2"
               @handleTitle="addFile($event,2,'报价分析汇总-零件')"
               :title="'报价分析汇总-零件'+`<span class='cursor' ><i style='color:#1660f1; font-weight: bold;font-size: 18px;' class='el-icon-shopping-cart-1'></i></span>`"
               @handleCollapse="handleCollapse($event,'2')"
               collapse
               class="margin-top20"
               :defalutCollVal='cardShow.find(items=>items.key == "2").show'
               v-permission.auto="RFQ_DETAIL_TIPS_BAOJIAFENXIHUIZONGLINGJIAN|报价分析汇总-零件">
          <quotationScoringHZ ref="quotationScoringHZ" v-if='cardShow.find(items=>items.key == "2").show'></quotationScoringHZ>
        </iCard>
        <!--------------------报价分析汇总-模具----------------------------------------->
        <quotationScoringMj :rfqInfoData="rfqInfoData" ref='quotationScoringMj'
                            v-if='cardShow.find(items=>items.key == "3").show'
                            class="margin-top20 poerstion"
                            titleKey='LK_BJFXHZMJ'
                            @handleCollapse='handleCollapse($event,"3")'>
                            
                            </quotationScoringMj>
                            
        <iCard @handleTitle="addFile($event,3,'报价分析汇总-模具',1)"
               :title="'报价分析汇总-模具'+`<span class='cursor' ><i style='color:#1660f1; font-weight: bold;font-size: 18px;' class='el-icon-shopping-cart-1'></i></span>`"
               v-else
               class="margin-top20"
               @handleCollapse='handleCollapse($event,"3")'
               collapse
               :defalutCollVal='false'
               v-permission.auto="RFQ_DETAIL_TIPS_BAOJIAFENXIHUIZONGMOJU|报价分析汇总-模具"></iCard>
       
        <!--------------------报价分析汇总-报价趋势----------------------------------------->
        <quotationScoringEcartsCard :rfqInfoData="rfqInfoData" id="card4" ref='quotationScoringEcartsCard'
                                    v-if='cardShow.find(items=>items.key == "4").show'></quotationScoringEcartsCard>
        <iCard  @handleTitle="addFile($event,4,'报价趋势',1)"
               :title="language('LK_BAOJIAQS','报价趋势')"
               v-else
               class="margin-top20"
               @handleCollapse="handleCollapse($event,'4')"
               collapse
               :defalutCollVal='false'
               v-permission.auto="RFQ_DETAIL_TIPS_BAOJIAQUSHI|报价趋势"></iCard>
        <!--------------------报价分析汇总-业务分配模拟----------------------------------------->
        <buMonitor @handleCollapse="handleCollapse($event,'5','业务分配模拟')"
                   id="card5"
                   :collapse='true'
                   :rfqInfoData="rfqInfoData"
                   :hideCombine="false"
                   :readOnly="false"
                   :tableSelection="true"
                   v-if='cardShow.find(items=>items.key == "5").show'
                   class="margin-top20"
                   v-permission.auto="RFQ_DETAIL_TIPS_YEWYFENPEIMONI|业务分配模拟"></buMonitor>
        <iCard @handleTitle="addFile($event,5,'业务分配模拟')"
               id="card5"
               :title="'业务分配模拟'+`<span class='cursor' ><i style='color:#1660f1; font-weight: bold;font-size: 18px;' class='el-icon-shopping-cart-1'></i></span>`"
               v-else
               class="margin-top20 buMonitor"
               @handleCollapse="handleCollapse($event,'5')"
               collapse
               :defalutCollVal='false'
               v-permission.auto="RFQ_DETAIL_TIPS_YEWUFENPEIMONI|业务分配模拟"></iCard>
      </template>
    </el-tab-pane>
    <el-tab-pane 
                 name="two"
                 label="专项分析工具"
                 v-if="hasPermission('RFQ_DETAIL_TIPS_ZHUANYEFENXIGONGJU123')"
                 v-permission.dynamic.auto="RFQ_DETAIL_TIPS_ZHUANYEFENXIGONGJU123">
      <gather />
    </el-tab-pane>
    <el-tab-pane lazy
                 name="three"
                 label="谈判基本信息"
                 v-if="hasPermission('RFQ_DETAIL_TIPS_TANPANJIBENXINXI')"
                 v-permission.dynamic.auto="RFQ_DETAIL_TIPS_TANPANJIBENXINXI">
      <negotiateBasicInfor :rfqInfoData="rfqInfoData"></negotiateBasicInfor>
    </el-tab-pane>
  </iTabsList>
</template>
<script>
import { iTabsList, iCard, iButton, iMessage, icon } from 'rise'
import quotationScoringTracking from './components/quotationScoringTracking'
import quotationScoringMj from './components/quotationScoringMj'
import quotationScoringHZ from './components/quotationScoringHz'
import quotationScoringEcartsCard from './components/quotationScoringEcartsCard'
import buMonitor from './components/qutaionScoringBusses'
import { icardData } from './components/data'
import gather from "@/views/partsrfq/externalAccessToAnalysisTools/negotiationAssistant/gather.vue";
import negotiateBasicInfor from "./components/negotiateBasicInfor";
import {  downloadPdfMixins } from '@/utils/pdf'
import { hasPermission } from "@/utils";
import { udMutilfiles, reportAdd } from '@/api/partsrfq/reportList/index'
export default {
  mixins: [downloadPdfMixins],
  components: { icon, iTabsList, iCard, quotationScoringTracking, quotationScoringMj, quotationScoringHZ, quotationScoringEcartsCard, buMonitor, gather, negotiateBasicInfor, iButton },
  props: {
    rfqInfoData: { type: Object },
  },
  watch: {
    rfqInfoData (val) {
      this.rfqInfoData = val
      console.log(val)
    }
  },
  data () {
    return {
      cardShow: JSON.parse(JSON.stringify(icardData)),
      activityTabIndex: 'one',
      downloadButtonLoading: false,

    }
  },
  created () {
    // window.sessionStorage.setItem('entryStatus', 1);
    this.$store.commit('SET_ENTRY_STATUS', 1)
    this.$store.dispatch('setRfqId', this.$route.query.id);
    if (this.$route.query.activityTabIndex) {
      this.activityTabIndex = this.$route.query.activityTabIndex
    }
  },
  methods: {
    hasPermission,
    handleTabClick (target) {
      this.activityTabIndex = target.name
    },
    /**
     * @description: 报价折叠
     * @param {*} e
     * @param {*} key
     * @return {*}
     */
    handleCollapse (e, key) {
      this.cardShow.forEach(i => {
        if (i.key == key) {
          i.show = !i.show
        }
      })
    },


    handleReport () {
      this.$router.push({ path: '/sourcing/partsrfq/reportList' });
    },
    //点击报告清单
    clickReport () {

    }
  }
}
</script>
<style lang='scss' scoped>
.MJbox{
    width: 200px;
    height: 30px;
    background: red;
}
.clearfix {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  span {
    font-size: 18px;
    color: #131523;
    font-weight: bold;
  }
  .icon {
    font-size: 20px;
    margin-left: 20px;
  }
}
.el-tabs--card {
  position: relative;
}
.right-btn {
  position: absolute;
  top: -3.5rem;
  right: 0;
}
.buMonitor {
  margin-bottom: 70px;
}
</style>
