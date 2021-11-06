<!--
 * @Author: Luoshuang
 * @Date: 2021-05-24 14:39:43
 * @LastEditors: Luoshuang
 * @LastEditTime: 2021-08-24 13:52:18
 * @Description: RS单维护界面
 * @FilePath: \front-web\src\views\designate\designatedetail\rsSingleMaintenance\index.vue
-->

<template>
  <iPage>
    <!------------------------------------------------------------------------>
    <!--                     界面标题模块                                   --->
    <!------------------------------------------------------------------------>
    <detailTop right lev='2' :pageMenu='detailPage' :query='$route.query'>
      <span slot="left" class="floatleft font20 font-weight">
        {{language('RSDANWEIHU','RS单维护')}}
      </span>
    </detailTop>
    <!------------------------------------------------------------------------>
    <!--                  search 搜索模块                                   --->
    <!------------------------------------------------------------------------>
    <iSearch class="margin-bottom20 margin-top20" icon @reset="handleSearchReset" @sure="filterTableData">
      <el-form>
        <el-form-item :label="language('LINGJIANCAIGOUXIANGMUBIANHAO','零件采购项目编号')" >
          <iInput :placeholder="language('LK_QINGSHURU','请输入')" v-model="form.fsnrGsnrNum"></iInput>
        </el-form-item>
        <el-form-item :label="language('LINGJIANHAO','零件号')" >
          <iInput :placeholder="language('LK_QINGSHURU','请输入')" v-model="form.partNo"></iInput>
        </el-form-item>
        <el-form-item :label="language('LINGJIANMINGCHENG','零件名称')" >
          <iInput :placeholder="language('LK_QINGSHURU','请输入')" v-model="form.partName"></iInput>
        </el-form-item>
        <el-form-item :label="language('GONGYINGSHANGBIANHAO','供应商编号')" >
          <iInput :placeholder="language('LK_QINGSHURU','请输入')" v-model="form.supplierNo"></iInput>
        </el-form-item>
        <el-form-item :label="language('GONGYINGSHANGMINGCHENG','供应商名称')" >
          <iInput :placeholder="language('LK_QINGSHURU','请输入')" v-model="form.supplierName"></iInput>
        </el-form-item>
      </el-form>
    </iSearch>
    <iCard>
      <div class="margin-bottom20 clearFloat">
          <div class="floatright">
            <!--------------------返回按钮----------------------------------->
            <iButton v-if="!nominationDisabled && !rsDisabled" @click="handleSave" :loading="saveLoading">{{language('BAOCUN','保存')}}</iButton>
            <!--------------------选择按钮----------------------------------->
            <iButton v-if="!nominationDisabled && !rsDisabled" @click="downloadTemp" :loading="downloadLoading">{{language('XIAZAIMOBAN','下载模板')}}</iButton>
            <!--------------------返回按钮----------------------------------->
            <!-- <iButton @click="goBack">上传</iButton> -->
            <el-upload
              v-if="!nominationDisabled && !rsDisabled" 
              class=" margin-left10 margin-right10"
              :action="uploadUrl + '/rs/uploadNomiRsDoc'"
              accept='.xlsx'
              style="display:inline-block;"
              :show-file-list='false'
              :on-progress='()=>{uploadLoading=true}'
              :on-error='()=>{uploadLoading=false;iMessage.error(language("SHANGCHUANSHIBAI","上传失败！"))}'
              :on-success='fileSuccess'
            >
              <iButton :loading='uploadLoading' >{{language('SHANGCHUAN','上传')}}</iButton>
            </el-upload>
            <!--------------------选择按钮----------------------------------->
            <iButton v-if="!nominationDisabled && !rsDisabled" @click="handleReadQuotation" :loading="readQuotationLoading">{{language('DUQUBAOJIADAN','读取报价单')}}</iButton>
            <!--------------------RS单预览按钮----------------------------------->
            <iButton @click="handlePreviewRS">{{language('RSDANYULAN','RS单预览')}}</iButton>
          </div>
      </div>
        <!------------------------------------------------------------------------>
        <!--                  表格模块                                          --->
        <!------------------------------------------------------------------------>
        <tableList :disabled="nominationDisabled || rsDisabled" :activeItems='"rfqId"' selection indexKey :tableData="tableListData" :tableTitle="tableTitle" :tableLoading="tableLoading" @handleSelectionChange="handleSelectionChange" @openPage="openPage" @updateSlot='toTop' @changeTableValue="changeTableValue">
          <!-- 年降开始时间 -->
          <template #beginYearReduce="scope">
            <span>{{resetLtcData(scope.row.ltcs,'beginYearReduce')}}</span>
          </template>
        </tableList>
    </iCard>
    <rsDialog :dialogVisible="rsEeditionDialogVisible" @changeVisible="changersEeditionDialogVisible" :otherPreview="false" :otherNominationType="otherNominationType" :otherNominationId="otherNominationId" :otherPartProjectType="otherPartProjectType" />
  </iPage>
</template>

<script>
import { iPage, iCard, iButton, iSearch, iInput, iMessage } from 'rise'
import tableList from '../components/tableList'
import { rsTableTitle, defaultLtcs } from './data'
import detailTop from '../components/topComponents'
import rsDialog from '@/views/partsprocure/editordetail/components/designateInfo/components/rsEEdition'
import { getList, readQuotation, downloadRSDoc, updateRS } from '@/api/designate/decisiondata/rs'
import { cloneDeep } from 'lodash'
import moment from 'moment'
import {partProjTypes} from '@/config'
import { nominateAppSDetail } from "@/api/designate"
import { getNominateDisabled } from "rise/web/common"
export default {
  components: { iPage, iCard, iButton, tableList, iSearch, iInput, detailTop, rsDialog },
  data() {
    return {
      tableListData: [],
      // tableTitle: rsTableTitle,
      tableLoading: false,
      form: {
        fsnrGsnrNum: '',
        partNo: '',
        partName: '',
        supplierNo: '',
        supplierName: ''
      },
      rsEeditionDialogVisible: false,
      tableListDataTemp: [],
      selectedTableData: [],
      readQuotationLoading: false,
      uploadUrl: process.env.VUE_APP_SOURCING,
      otherNominationType: '',
      otherNominationId: '',
      otherPartProjectType: '',
      saveLoading: false,
      downloadLoading: false,
      partProjectType: ''
    }
  },
  computed: {
    // eslint-disable-next-line no-undef
    ...Vuex.mapState({
      nominationDisabled: state => state.nomination.nominationDisabled,
      rsDisabled: state => state.nomination.rsDisabled,
    }),
    tableTitle() {
      if ([partProjTypes.GSLINGJIAN,partProjTypes.GSCOMMONSOURCING].includes(this.partProjectType)) {
        return rsTableTitle
      }
      return rsTableTitle.filter(item => !['addFee','savingFee','presentPrice'].includes(item.props))
    }
  },
  created() {
    this.nominateAppSDetail()
    this.otherNominationId = this.$route.query.desinateId
    this.getTableList()
  },
  methods: {
    nominateAppSDetail() {
      nominateAppSDetail({
        nominateAppId: this.$route.query.desinateId
      })
      .then(res => {
        if (res.code == 200) {
            this.$store.dispatch('setNominationDisabled', getNominateDisabled({ ...res.data, designateType: this.$route.query.designateType } || {}))
            this.$store.dispatch('setRsDisabled', res.data.rsStatus === "FROZEN")
          } else {
            iMessage.error(this.$i18n.locale === 'zh' ? res.desZh : res.desEn)
          }
      })
    },
    // 单独处理下年降或年降计划
    resetLtcData(row=[],type){
      // 年降开始时间
      if(type == 'beginYearReduce'){
        // 取第一个非0的年份
        const list = row.filter((item)=> item.ltcRate!='0.00');
        return list.length ? list[0].ltcDate : '-'
      }else{ // 年降
       // 从非0开始至非0截至的数据 不包含0
      //  let strList = [];
      //  let strFlag = false;
      //  for(let i =0;i<row.length;i++){
      //    if(row[i].ltcRate !='0.00'){
      //       strFlag = true;
      //      strList.push(row[i].ltcRate);
      //    }else if(strFlag && row[i].ltcRate == '0.00'){
      //      break
      //    }
      //  }
      //  return strList.length ? strList.join('/') : '-'

        const ltcRateStrArr = row.map(item => item.ltcRateStr)

        let i = 0
        do {
          i = ltcRateStrArr.length
          if (ltcRateStrArr[0] == 0) ltcRateStrArr.shift()
          if (ltcRateStrArr[ltcRateStrArr.length - 1] == 0) ltcRateStrArr.pop()
        } while (i !== ltcRateStrArr.length)

        return ltcRateStrArr.length ? ltcRateStrArr.join('/') : '-'
      }
    },
    handlePreviewRS() {
      
      // 当前界面的table中 是当前定点ID所包含的所有零件。预览基于定点ID 不需要勾选。
      // if (this.selectedTableData.length < 1) {
      //   iMessage.warn(this.language('QINGXUANZEXUYAOYULANDERSDAN','请选择需要预览的RS单'))
      //   return
      // }
      // if (this.selectedTableData.length > 1) {
      //   iMessage.warn(this.language('ZHINENGXUANZEYITIAORSDANYULAN','只能选择一条RS单预览'))
      //   return
      // }
      // this.otherNominationId = this.selectedTableData[0].nominateAppId
      // this.otherNominationType = this.selectedTableData[0].nominateProcessType
      // this.otherPartProjectType = this.selectedTableData[0].partProjectType
      this.changersEeditionDialogVisible(true)
    },
    /**
     * @Description: 修改表格
     * @Author: Luoshuang
     * @param {*} val 修改的值
     * @param {*} row 修改的行 
     * @param {*} item 修改的props
     * @return {*}
     */    
    changeTableValue(val, row, item) {
      // console.log(val, row, item)
    },
    fileSuccess(res){
      if(res.code == 200){
        // this.vm.init()
        this.uploadLoading=false;
        iMessage.success(this.language('SHANGCHUANCHENGGONG',"上传成功！"))
        this.getTableList()
      }else{
        this.uploadLoading = false;
        iMessage.error(res.desZh)
      }
    },
    /**
     * @Description: 下载模板，可多选
     * @Author: Luoshuang
     * @param {*}
     * @return {*}
     */    
    async downloadTemp() {
      if (this.tableListData.length < 1) {
        iMessage.warn(this.language('QINGXUANZEXUYAOXIAZAIDESHUJU','请选择需要下载的数据'))
        return
      }
      this.downloadLoading = true
      const params = this.tableListData.map(item => {
        return {
          supplierId: item.supplierId,
          rfqId: item.rfqId,
          fsnrGsnrNum: item.fsnrGsnrNum,
          nominateAppId: item.nominateAppId,
          quotationId: item.quotationId
        }
      })
      await downloadRSDoc(params)
      this.downloadLoading = false
    },
    /**
     * @Description: 读取报价单
     * @Author: Luoshuang
     * @param {*}
     * @return {*}
     */    
    handleReadQuotation() {
      if (this.selectedTableData.length < 1) {
        iMessage.warn(this.language('QINGXUANZEXUYAODUQUDEBAOJIADAN','请选择需要读取的报价单'))
        return
      }
      this.readQuotationLoading = true
      const params = {
        nominateAppId: this.$route.query.desinateId,
        nomiMaintenanceRecordIdlist: this.selectedTableData.map(item => item.nominateRecordId)
      }
      // this.selectedTableData.map(item => {
      //     return {
      //       // nominateDetailId: item.nominateDetailId,
      //       rfqId: item.rfqId,
      //       fsnrGsnrNum: item.fsnrGsnrNum,
      //       supplierId: item.supplierId,
      //       nominateId: item.nominateAppId,
      //       quotationId: item.quotationId
      //     }
      //   })
      
      readQuotation(params).then(res => {
        if(res?.result) {
          iMessage.success(this.$i18n.locale === 'zh' ? res.desZh : res.desEn)
          this.getTableList()
        } else {
          iMessage.error(this.$i18n.locale === 'zh' ? res.desZh : res.desEn)
        }
      }).finally(() => {
        this.readQuotationLoading = false
      })
    },
    /**
     * @Description: 保存修改的RS
     * @Author: Luoshuang
     * @param {*}
     * @return {*}
     */    
    handleSave() {
      this.saveLoading = true
      const params = this.tableListData.map(item => {
        return {
          // ...item,
          supplierId: item.supplierId,
          fsnrGsnrNum: item.fsnrGsnrNum,
          nominateDetailId: item.nominateDetailId,
          nominateRecordId: item.nominateRecordId,
          nominateAppId: item.nominateAppId,
          partProjType: item.partProjectType,
          quotationId: item.quotationId,
          aPrice: item.aprice,
          bPrice: item.bprice,
          investFee: item.investFee,
          investFeeIsShared: item.investFeeIsShared,
          devFee: item.devFee,
          devFeeIsShared: item.devFeeIsShared,
          addFee: item.addFee,
          savingFee: item.savingFee,
          presentPrice: item.presentPrice,
          ltcs: defaultLtcs.map((ltcsItem, ltcIndex) => {
            return {
              ltcDate: item['ltcDate'+(ltcIndex+1)] ? moment(item['ltcDate'+(ltcIndex+1)]).format('yyyy-MM') : '',
              ltcDateIsChange:item['ltcDateIsChange'+(ltcIndex+1)],
              ltcRate:item['ltcRate'+(ltcIndex+1)],
              ltcRateIsChange:item['ltcRateIsChange'+(ltcIndex+1)]
            }
          })
        }
      })
      updateRS(params).then(res => {
        if (res.result) {
          iMessage.success(this.$i18n.locale === 'zh' ? res.desZh : res.desEn)
          this.getTableList()
        } else {
          iMessage.error(this.$i18n.locale === 'zh' ? res.desZh : res.desEn)
        }
      }).finally(() => {
        this.saveLoading = false
      })
    },
    /**
     * @Description: 重置筛选条件
     * @Author: Luoshuang
     * @param {*}
     * @return {*}
     */    
    handleSearchReset() {
      this.form = {
        fsnrGsnrNum: '',
        partNo: '',
        partName: '',
        supplierNo: '',
        supplierName: ''
      }
    },
    /**
     * @Description: 过滤表格数据
     * @Author: Luoshuang
     * @param {*}
     * @return {*}
     */    
    filterTableData() {
      this.tableListData = this.tableListDataTemp.filter(item => {
        let result = true
        if (this.form.fsnrGsnrNum) {
          result = result && item.fsnrGsnrNum.includes(this.form.fsnrGsnrNum)
        }
        if (this.form.partNo) {
          result = result && item.partNo.includes(this.form.partNo)
        }
        if (this.form.partName) {
          result = result && item.partName.includes(this.form.partName)
        }
        if (this.form.supplierNo) {
          result = result && item.supplierId.includes(this.form.supplierNo)
        }
        if (this.form.supplierName) {
          result = result && item.supplierName.includes(this.form.supplierName)
        }
        return result
      })
    },
    /**
     * @Description: 获取表格初始数据
     * @Author: Luoshuang
     * @param {*}
     * @return {*}
     */    
    getTableList() {
      getList(this.$route.query.desinateId).then(res => {
        if (res?.result) {
          this.partProjectType = res.data?.partProjectType
          this.otherNominationType = res.data?.nominateProcessType
          const cloneData = cloneDeep(res.data?.lines).map(item => {
            const singleItem = { ...item }
            const watchChangeData = ['aprice','bprice','investFee','investFeeIsShared','devFee','devFeeIsShared']
            watchChangeData?.forEach((element, index) => {
              singleItem[element+'Temp'] = cloneDeep(item[element] === null ? '' : item[element])
            })
            defaultLtcs?.forEach((element, index) => {
              singleItem['ltcDate'+(index+1)] = cloneDeep(item.ltcs && item.ltcs[index]?.ltcDate ? item.ltcs[index].ltcDate : element.ltcDate),
              singleItem['ltcDate'+(index+1)+'Temp'] = cloneDeep(item.ltcs && item.ltcs[index]?.ltcDate ? moment(item.ltcs[index].ltcDate).format('yyyy-MM') : element.ltcDate),
              singleItem['ltcDateIsChange'+(index+1)] = item.ltcs && item.ltcs[index]?.ltcDateIsChange ? item.ltcs[index].ltcDateIsChange : element.ltcDateIsChange,
              singleItem['ltcRate'+(index+1)] = cloneDeep(item.ltcs && item.ltcs[index]?.ltcRate ? item.ltcs[index].ltcRate : element.ltcRate),
              singleItem['ltcRate'+(index+1)+'Temp'] = cloneDeep(item.ltcs && item.ltcs[index]?.ltcRate ? item.ltcs[index].ltcRate : element.ltcRate),
              singleItem['ltcRateIsChange'+(index+1)] = item.ltcs && item.ltcs[index]?.ltcRateIsChange ? item.ltcs[index].ltcRateIsChange : element.ltcRateIsChange
            })
            return singleItem
          })
          this.tableListData = cloneData
          this.tableListDataTemp = cloneDeep(cloneData)
        } else {
          this.tableListData = []
          this.tableListDataTemp = []
          iMessage.error(this.$i18n.locale === 'zh' ? res.desZh : res.desEn)
        }
      })
    },
    handleSelectionChange(val) {
      this.selectedTableData = val
    },
    openPage() {},
    toTop() {},
    handleSelect() {},
    goBack() {
      this.$router.push({path:'/designate/rfqdetail'})
    },
    changersEeditionDialogVisible(visible) {
      this.rsEeditionDialogVisible = visible
    }
  }
}
</script>

<style lang="scss" scoped>

</style>