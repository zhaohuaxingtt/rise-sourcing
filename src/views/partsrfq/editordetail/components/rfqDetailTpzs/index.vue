<!--
 * @Author: yuszhou
 * @Date: 2021-05-25 13:01:23
 * @LastEditors: caopeng
 * @Description: 报价助手界面
 * @FilePath: \德勤项目\front-sourcing-new\src\views\partsrfq\editordetail\components\rfqDetailTpzs\index.vue
-->
<template>
  <iTabsList v-model="activityTabIndex" @tab-click="handleTabClick" type="card" slot="components" class='margin-top20'>
    <el-tab-pane name="one" label="报价分析">
      <template>
          <div class="right-btn">
              <iButton @click="handleReport" v-permission.auto="RFQ_DETAIL_TIPS_NEGOTIATEBASIC_BUTTON_BAOGAOQINGDAN|报告清单">{{ $t('TPZS.BGQD') }}</iButton>
          </div>
         <!--------------------报价评分跟踪----------------------------------------->
         <iCard title="报价与评分跟踪" @handleCollapse="handleCollapse($event,'1','报价与评分跟踪')" collapse v-permission.auto="RFQ_DETAIL_TIPS_BAOJIAYUPINGFENGENZONG|报价与评分跟踪">
           <quotationScoringTracking id="card1" v-if='cardShow.find(items=>items.key == "1").show'></quotationScoringTracking>
         </iCard>
         <!--------------------报价分析汇总-零件----------------------------------------->
         <iCard title="报价分析汇总-零件" @handleCollapse="handleCollapse($event,'2','报价分析汇总-零件')" collapse class="margin-top20" :defalutCollVal='cardShow.find(items=>items.key == "2").show' v-permission.auto="RFQ_DETAIL_TIPS_BAOJIAFENXIHUIZONGLINGJIAN|报价分析汇总-零件">
           <quotationScoringHZ  id="card2" v-if='cardShow.find(items=>items.key == "2").show'></quotationScoringHZ>
         </iCard>
          <!--------------------报价分析汇总-模具----------------------------------------->
         <quotationScoringMj ref='quotationScoringMj' v-if='cardShow.find(items=>items.key == "3").show' class="margin-top20" titleKey='LK_BJFXHZMJ' @handleCollapse='handleCollapse($event,"3")'></quotationScoringMj>
         <iCard  title="报价分析汇总-模具" v-else class="margin-top20" @handleCollapse='handleCollapse($event,"3")' collapse :defalutCollVal='false' v-permission.auto="RFQ_DETAIL_TIPS_BAOJIAFENXIHUIZONGMOJU|报价分析汇总-模具"></iCard>
          <!--------------------报价分析汇总-报价趋势----------------------------------------->
         <quotationScoringEcartsCard ref='quotationScoringEcartsCard' v-if='cardShow.find(items=>items.key == "4").show'></quotationScoringEcartsCard>
         <iCard title="报价趋势" v-else class="margin-top20" @handleCollapse="handleCollapse($event,'4')" collapse :defalutCollVal='false' v-permission.auto="RFQ_DETAIL_TIPS_BAOJIAQUSHI|报价趋势"></iCard>
          <!--------------------报价分析汇总-业务分配模拟----------------------------------------->
         <buMonitor @handleCollapse="handleCollapse($event,'5','业务分配模拟')" id="card5" :collapse='true' v-if='cardShow.find(items=>items.key == "5").show' class="margin-top20" v-permission.auto="RFQ_DETAIL_TIPS_YEWYFENPEIMONI|业务分配模拟"></buMonitor>
         <iCard title="业务分配模拟" v-else class="margin-top20" @handleCollapse="handleCollapse($event,'5','业务分配模拟')"  collapse :defalutCollVal='false' v-permission.auto="RFQ_DETAIL_TIPS_YEWUFENPEIMONI|业务分配模拟"></iCard>
      </template>
    </el-tab-pane>
    <el-tab-pane lazy name="two" label="专项分析工具" v-permission.auto="RFQ_DETAIL_TIPS_ZHUANYEFENXIGONGJU|专项分析工具">
      <gather />
    </el-tab-pane>
    <el-tab-pane lazy name="three" label="谈判基本信息" v-permission.auto="RFQ_DETAIL_TIPS_TANPANJIBENXINXI|谈判基本信息">
      <negotiateBasicInfor></negotiateBasicInfor>
    </el-tab-pane>
  </iTabsList>
</template>
<script>
import { iTabsList, iCard,iButton,iMessage } from 'rise'
import quotationScoringTracking from './components/quotationScoringTracking'
import quotationScoringMj from './components/quotationScoringMj'
import quotationScoringHZ from './components/quotationScoringHz'
import quotationScoringEcartsCard from './components/quotationScoringEcartsCard'
import buMonitor from './components/qutaionScoringBusses'
import { icardData } from './components/data'
import gather from "@/views/partsrfq/externalAccessToAnalysisTools/negotiationAssistant/gather.vue";
import negotiateBasicInfor from "./components/negotiateBasicInfor";
import { downloadPDF, downloadPdfMixins, dataURLtoFile } from '@/utils/pdf'
import { udMutilfiles,reportAdd } from '@/api/partsrfq/reportList/index'
export default {
  mixins: [downloadPdfMixins],
  components: { iTabsList, iCard, quotationScoringTracking, quotationScoringMj, quotationScoringHZ, quotationScoringEcartsCard, buMonitor, gather, negotiateBasicInfor ,iButton},
  data() {
    return {
      cardShow: JSON.parse(JSON.stringify(icardData)),
      activityTabIndex: 'one',
      toolType:[
         { code:'QUOTE_IMITATE',
          msg:'业务分配模拟'}
      ]
    }
  },
  created() {
    if (this.$route.query.activityTabIndex) {
      this.activityTabIndex = this.$route.query.activityTabIndex
    }
  },
  methods: {
          async upLoad(key, name) {
      //   let el = document.querySelector('#'+val)
      //   let el = document.querySelector('rightaa')
      //        iMessageBox(
      //       this.language('SHIFOUTUISONGKUAIZHAOZHIBAOGAOQINGDAN', '是否推送快照至报告清单?'),
      //       this.language('TUISONG', '推送'),
      //       {
      //         confirmButtonText: this.language('QUEREN', '确认'),
      //         cancelButtonText: this.language('QUXIAO', '取消')
      //       }
      //     )
      //   .then(async () => {
      //   })
      this.downloadButtonLoading = true

    if(key=='4'){
        this.$refs.quotationScoringEcartsCard.$refs.previewsCom.exportExcel('upload')
        }else  if(key=='3'){
       this.$refs.quotationScoringMj.handleDownload('upload')
        }else{
        downloadPDF({
            idEle: '#card' + key,
            pdfName: name,
            exportPdf: true,
            waterMark: true,
            callback: async (pdf, pdfName) => {
                try {
                const filename = pdfName.replaceAll(/\./g, '_') + '.pdf'
                const pdfFile = pdf.output('datauristring')
                const blob = dataURLtoFile(pdfFile, filename)
                const formData = new FormData()
                formData.append('businessId', Math.ceil(Math.random() * 100000)) // 业务id，默认固定8025
                formData.append('applicationName', name)
                formData.append('multifile', blob || []) // 文件
                
                udMutilfiles(formData).then((res) => {
                    if (res && res.code == 200) {
                    iMessage.success(this.language('CAOZUOCHENGGONG', '操作成功'))
                    let req={
                        instanceId:-1,
                        isBindingInstantce:false,
                        Type:'报告',
                        toolType:this.toolType.find(res=>res.msg==name).code,
                        downloadUrl:res.data[0].id
                    }
                    reportAdd().then(v=>{

                    })
                    }else{
                         iMessage.error(this.language('SHANGCHUANSHIBAI', '上传失败'))
                    }
                })
                } catch {
                iMessage.error(this.language('SHENGCHENGSHIBAI', '生成失败'))
                }
            },
            })
        }
    
    },
    handleTabClick(target) {
      this.activityTabIndex = target.name
    },
    /**
     * @description: 报价折叠
     * @param {*} e
     * @param {*} key
     * @return {*}
     */
    handleCollapse(e, key,name) {
      
      this.cardShow.forEach(i => {
        if (i.key == key) {
          i.show = e
        }
      })
      
    //   this.upLoad(key,name)
    },
    //点击返回
    clickReturn() {

    },
    handleReport() {
      this.$router.push({ path: '/sourcing/partsrfq/reportList' });
    },
    //点击报告清单
    clickReport() {

    }
  }
}
</script>
<style lang='scss' scoped>
.el-tabs--card {
  position: relative;
}
.right-btn {
    position: absolute;
    top: -3.5rem;
    right: 0;
}
</style>
