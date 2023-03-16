<!--
 * @Author: your name
 * @Date: 2021-11-02 15:22:44
 * @LastEditTime: 2023-03-16 11:07:31
 * @LastEditors: 余继鹏 917955345@qq.com
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\views\designate\designatedetail\decisionData\costanalysis\index.vue
-->
<template>
<iCard class="costanalysis" :class="{ isPreview: isPreview }">
  <iFormGroup row='4' label-width='100px' class="Iform">
    <iFormItem label="Tool" v-permission.auto="SOURCING_NOMINATION_ATTATCH_CONSTANALYSIS_ANALYSISTYPE|分析类型">
      <iSelect :loading="toolsLoading" :loading-text="language('JIAZAIZHONG', '加载中')" v-model="typeSelect" @change="changeCostanalysisList">
        <el-option class="flex-aligin-items-center" v-for='(items,index) in tools' :label='items.label' :value='items.value' :key='index'>
          <span v-if="items.showTag" style="display: inline-block; width: 10px; color: #1763f7; font-size: 1.05rem;" :style="{ visibility: items.analysisTotal ? 'visible' : 'hidden' }">*</span><span>{{ items.label }}</span>
        </el-option>
      </iSelect>
    </iFormItem>
    <iFormItem  v-if='isPreview'  label='Analysis' v-permission.auto="SOURCING_NOMINATION_ATTATCH_CONSTANALYSIS_ANALYSIS|Analysis">
      <iSelect v-model="previewItems" v-loading='loadingRight' @change="refresh">
        <el-option v-for='(items,index) in (tableData.filter(r=>r.flag))' :label='items.analysisName' :value='JSON.stringify(items)' :key='index'></el-option>
      </iSelect>
    </iFormItem>
  </iFormGroup>
  <tabel v-if='!isPreview' :tableLoading='loading' :tableTitle='tableTitleComputed' :tableData='tableData' selection  v-permission.auto="SOURCING_NOMINATION_ATTATCH_CONSTANALYSIS_TABLE|table">
    <template #operate='scope'>
      <span class="underline" @click="openPage(scope.row)">{{language('CHAKAN','查看')}}</span>
    </template>
    <template #flag='scope'>
      <icon 
        symbol 
        class="icon" 
        :class="{ cursor: !isDisabled }"
        :name="scope.row.flag ? 'iconxianshi' : 'iconyincang'" 
        @click.native="isDisabled ? '' : costanalysisShow(scope.row)" />
      <!-- <span :class="{ cursor: !isDisabled }" class="bule font10" @click="isDisabled ? '' : costanalysisShow(scope.row)">
        <i v-if='scope.row.flag' class="iconfont iconxianshi"></i>
        <i v-else class="iconfont iconyincang"></i>
      </span> -->
    </template>
    <template #sortOrder='scope'> 
      <span class="bule font10">
        <icon symbol :class="{ cursor: !isDisabled && scope.$index !== 0 }" class="icon" :name="scope.$index === 0 ? 'iconliebiaoweizhiding' : 'iconliebiaoyizhiding'" @click.native="isDisabled ? '' : upOrDown(scope.row, 1)" />
        <icon symbol :class="{ cursor: !isDisabled && (scope.$index !== tableData.length - 1) }" class="icon desc" :name="scope.$index === tableData.length - 1 ? 'iconliebiaoweizhiding' : 'iconliebiaoyizhiding'" @click.native="isDisabled ? '' : upOrDown(scope.row, 0)" />
        <!-- <i @click="isDisabled ? '' : upOrDown(scope.row,1)" class="iconfont iconpaixu-xiangshang margin-right10"></i>
        <i @click="isDisabled ? '' : upOrDown(scope.row,0)" class="iconfont iconpaixu-xiangxia"></i> -->
      </span>
    </template>
  </tabel>
  <iDialog class="previewDialog" v-if='!isPreview' :visible.sync="messageBox" width='80%'>
      <div id="preview" style="min-height:80vh" class="flex-center-center">
        <template v-if="['PCA','TIA'].includes(typeSelect)">
          <iframe v-if='pdfUrl' :src="`${ pdfUrl }#view=fith`" frameborder="0" height="97%" width="100%"></iframe>
          <span v-else>{{language('DANGQIANZANWUCHAKAN','当前分析类型暂无PDF/图片可以查看')}}</span>
        </template>
        <template v-else>
          <echartsComponents v-if='messageBox' :rfqId='rfqId'></echartsComponents>
        </template>
      </div>
  </iDialog>
  <div v-if='isPreview'>
    <bob class="bob" v-if='typeSelect == "BOB" && previewItems' :propSchemeId='JSON.parse(previewItems).bizId' :key='keysRender' :statusProps="true" :isPreview="isPreview"></bob>
    <vp class="vp" v-else-if='typeSelect == "VP" && previewItems' propType='edit' :propSchemeId='JSON.parse(previewItems).bizId' :key='keysRender'></vp>
    <pi class="pi" v-else-if='typeSelect == "PI" && previewItems' :propSchemeId='JSON.parse(previewItems).bizId' :key='keysRender'></pi>
    <div v-else-if='["PCA","TIA"].includes(typeSelect)' id="preview2" :key='keysRender'>
      <div v-if="previewItems">
        <iframe class="iframe" width="100%" v-if='previewItems && JSON.parse(previewItems).reportLink' :src="`${ JSON.parse(previewItems).reportLink }#view=fith`" frameborder="0"></iframe>
        <div v-else>{{language('ZANWUYULAN','抱歉当前类型暂无预览文件')}}</div>
      </div>
    </div>
    <template v-else-if='typeSelect == "QT"'>
        <echartsComponents v-if='previewItems' :rfqId='JSON.parse(previewItems).rfqId' :key='keysRender'></echartsComponents>
    </template>
    <template v-else-if='typeSelect == "BL"'>
        <bdLink v-if='previewItems' :graphId='JSON.parse(previewItems).bizId' :key='keysRender'></bdLink>
    </template>
    <template v-else>
      <mek class="mek" v-if='previewItems' :propSchemeId='JSON.parse(previewItems).bizId' :key='keysRender'></mek>
    </template>
  </div>
</iCard>
</template>
<script>
import {iCard,iFormGroup,iFormItem,iSelect,iDialog,icon} from 'rise'
import tabel from '@/views/partsign/home/components/tableList'
import { tableTitle } from './data'
import {costanalysisList,costanalysisShow,costanalysisSort,getTools,getHaveDataTools} from '@/api/designate/decisiondata/costanalysis'
import bob from '@/views/partsrfq/bob/newReport'
import vp from '@/views/partsrfq/vpAnalyse/vpAnalyseDetail'
import pi from '@/views/partsrfq/piAnalyse/piDetail'
import mek from '@/views/partsrfq/externalAccessToAnalysisTools/categoryManagementAssistant/mek/mekDetails'
import echartsComponents from '@/views/partsrfq/editordetail/components/rfqDetailTpzs/components/quotationScoringEcartsCard/previewEcharts'
import bdLink from '@/views/biddingManage/bidding/project/hall/components/graph'
export default{
  components:{iCard,iFormGroup,iFormItem,iSelect,tabel,iDialog,bob,vp,pi,mek,echartsComponents,icon,bdLink},
  data(){
    return {
      typesOfData:'',
      tools: [
        {
          value: 'PCA',
          label: 'PCA'
        },{
          value: 'MEK',
          label: 'MEK'
        },{
          value: 'PI',
          label: 'Price Index'
        },{
          value: 'BOB',
          label: 'BOB'
        },{
          value: 'VP',
          label: 'Volume Pricing'
        },{
          value: 'TIA',
          label: 'TIA'
        },{
          value: 'BL',
          label: 'Bid Link'
        },{
          value: 'QT',
          label: 'Quotation Tendency'
        },
      ],
      tableTitle,
      tableData:[],
      typeSelect:'BOB',
      loading:false,
      messageBox:false,
      isPreview:false,
      previewItems:null,
      keysRender:parseInt(Math.random()*100000000000),
      toolsLoading: false
    }
  },
  computed: {
    // eslint-disable-next-line no-undef
    ...Vuex.mapState({
      nominationDisabled: state => state.nomination.nominationDisabled,
      rsDisabled: state => state.nomination.rsDisabled,
    }),
    isDisabled() {
      return this.isPreview || this.nominationDisabled || this.rsDisabled
    },
    tableTitleComputed() {
      if (this.isDisabled) return this.tableTitle.filter(item => item.props !== "sortOrder")
      return this.tableTitle
    }
  },
  async created(){
    //当前状态是否是预览状态
    this.isPreview = this.$route.query.isPreview == 1

    if (this.isPreview) {
      // 接口太慢,改为前端写死
      // await this.getHaveDataTools()

      if (!this.tools.some(item => item.value === this.$route.query.typeSelect)) {
        this.typeSelect = this.tools[0]?.value
      } else {
        this.typeSelect = this.$route.query.typeSelect || "BOB"
      }

      this.$store.dispatch('setCostType',this.typeSelect)
      
      this.costanalysisList()
    } else {
      this.typeSelect = "BOB"
      this.$store.dispatch('setCostType',this.typeSelect)

      // 接口太慢,改为前端写死
      // this.getTools()

      this.costanalysisList()
    }
  },
  watch: {
    previewItems(nv) {
      if (this.isPreview && ['PCA','TIA'].includes(this.typeSelect) && nv) {
        this.$nextTick(() => {
          const previewDom = this.$el.querySelector("#preview2")
          if (previewDom) {
            previewDom.querySelector("iframe").style.width = `${ previewDom.offsetWidth }px`
          }
        })
      }
    }
  },
  methods:{

    changeCostanalysisList(){
      this.$store.dispatch('setCostType',this.typeSelect) //记录preview的时候的下拉类型，保证在url打开的时候是匹配的
      console.log(this.$store.state.nomination.costType)
      this.costanalysisList()
    },
    refresh(){
      this.keysRender = parseInt(Math.random()*10000000000)
    },
        /**
     * @description: 是否展示
     * @param {*}
     * @return {*}
     */
    upOrDown({id},type){
      costanalysisSort({id:id,type:type}).then(r=>{
        if(r.result){
          this.costanalysisList()
        }
      })
    },
    /**
     * @description: 是否展示
     * @param {*}
     * @return {*}
     */
    costanalysisShow(row){
      costanalysisShow({flag:(!row.flag)-0,id:row.id}).then(r=>{
        if(r.result){
          this.costanalysisList()
        }
      })
    },
    /**
     * @description: 根据不同的类型，跳转到不同的编辑界面。 
     * @param {*}
     * @return {*}
     */
    openPage(row){
      this.rfqId = row.rfqId

      if(['PCA','TIA'].includes(this.typeSelect)){
        try {
          // this.pdfUrl = row.fileList.length?row.fileList[0].filePath:null
          // this.pdfUrl = row.reportLink
          window.open(`${ row.reportLink }#view=fith`, "_blank")
          return
        } catch (error) {
          this.pdfUrl = ''
          this.rfqId = ''
        }
      }

      if (this.typeSelect === "QT") {
        this.messageBox = true

        this.$nextTick(() => {
          const previewDom = this.$el.querySelector("#preview")
          if (previewDom) {
            previewDom.querySelector("iframe").style.height = `${ previewDom.offsetHeight * 0.97 }px`
          }
        })

        return
      }

      const urlMaps = {
        'BOB':`sourcing/partsrfq/bobNew?schemeId=${row.bizId}&rfqId=${row.rfqId}&groupId=`,
        'VP':`sourcing/partsrfq/vpAnalyseDetail?type=edit&schemeId=${row.bizId}&round&rfqId=${row.rfqId}`,
        'PI':`sourcing/partsrfq/piAnalyseDetail?schemeId=${row.bizId}&rfqId=${row.rfqId}`,
        'MEK':`sourcing/mek/mekDetails?schemeId=${row.bizId}&rfqId=${row.rfqId}`,
        'BL':`sourcing/partsrfq/graph/${row.bizId}`
      }
      window.open(process.env.VUE_APP_SOURCING_URL + urlMaps[this.typeSelect],'_blank')
    },
    costanalysisList(){
      this.previewItems = null
      this.loading = true
      const id = this.$route.query.desinateId
      this.loadingRight = true
      costanalysisList(id,this.typeSelect).then(r=>{
        this.loading = false
        this.tableData = r.data

        this.$nextTick(() => {
          if (Array.isArray(this.tableData)) { 
            const views = this.tableData.filter(item => item.flag)
            this.previewItems = views.length ? JSON.stringify(views[0]) : ""
          }
        })

        this.loadingRight = false
      }).catch(()=>{
        this.loading = false
      })
    },
    getTools() {
      this.toolsLoading = true

      return getTools({
        nominateAppId: this.$route.query.desinateId
      })
      .then(res => {
        if (res.code == 200) {
          this.tools = 
            Array.isArray(res.data) ?
            res.data.map(item => ({
              label: item.desc,
              value: item.code,
              analysisTotal: item.analysisTotal,
              showTag: true
            })) :
            []
        }
      })
      .finally(() => this.toolsLoading = false)
    },
    // 获取有数据的Tool下拉框
    getHaveDataTools() {
      this.toolsLoading = true

      return getHaveDataTools({
        nominateAppId: this.$route.query.desinateId
      })
      .then(res => {
        if (res.code == 200) {
          this.tools = 
            Array.isArray(res.data) ?
            res.data.map(item => ({
              label: item.desc,
              value: item.code,
              showTag: false
            })) :
            []
        }
      })
      .finally(() => this.toolsLoading = false)
    }
  },
  mounted() {
    console.log(this.$route, '路由参数')
  }
}
</script>
<style lang='scss' scoped>
.costanalysis {
  .previewDialog {
    ::v-deep .el-dialog {
      position: absolute;
      margin: 0 !important;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      height: 88vh;
    }
  }

  .iframe {
    height: calc(100vh - 70px);
  }

  .icon {
    font-size: 16px;
  }

  .cursor {
    cursor: pointer;
  }

  .desc {
    transform: rotate(180deg);
    margin-left: 10px;
  }

  .bob, .pi, .vp, .mek {
    overflow: hidden !important;
    padding-left: 0 !important;
    padding-right: 0 !important;
    padding-bottom: 0 !important;

    ::v-deep .cardBody {
      padding-left: 0 !important;
      padding-right: 0 !important;
      padding-bottom: 0 !important;
    }
  }
}

.isPreview {
  ::v-deep .cardBody {
    padding-top: 0;
  }
}

.Iform{
    ::v-deep.el-form-item__content{
      margin-left: 0px!important;
    }
}
</style>