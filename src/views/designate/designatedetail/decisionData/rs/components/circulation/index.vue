<!--
 * @Author: Luoshuang
 * @Date: 2021-05-28 15:18:01
 * @LastEditors: Luoshuang
 * @LastEditTime: 2021-09-18 11:25:50
 * @Description: 流转RS单
 * @FilePath: \front-web\src\views\designate\designatedetail\decisionData\rs\components\circulation\index.vue
-->

<template>
  <div :class="isPreview && 'isPreview'">
    <iCard v-if="projectType === partProjTypes.PEIJIAN || projectType === partProjTypes.FUJIAN" :title="'CSC推荐表/CSC Recommendation Sheet会外流转'">
      <iFormGroup row="4" class="csc">
        <div class="col">
          <iFormItem v-for="(item,index) in titleData" :key="'titleData'+index"  :label="item.label+':'">
            <iText v-if="item.props === 'currency'">
              {{ basicData.currencyMap && basicData.currencyMap[basicData.currency] ? basicData.currencyMap[basicData.currency].name : '' }}
            </iText>
            <iText v-else-if="item.props === 'exchangeRate'">
              <span class="exchangeRageCurrency" v-for="item in exchangeRageCurrency" :key="item">
                1{{basicData.currencyMap && basicData.currencyMap[item] ? basicData.currencyMap[item].name : item}}={{basicData.currencyRateMap[item]}}{{basicData.currencyMap.RMB ? basicData.currencyMap.RMB.name : 'RMB'}}
              </span>
            </iText>
            <iText v-else-if="item.props === 'partProjectType'">
              {{basicData[item.props] === partProjTypes.PEIJIAN ? '配件' : '附件'}}
            </iText>
            <iText v-else>{{basicData[item.props]}}</iText>
          </iFormItem>
        </div>
      </iFormGroup>
    </iCard>
    <iCard :title="'流转定点推荐 - ' + cardTitle" :class="!isPreview && 'margin-top20'">
      <tableList :selection="false" :tableTitle="tableTitle" :tableData="tableData" class="rsTable" >
        <!-- 年降 -->
        <template #ltc="scope">
          <span>{{resetLtcData(scope.row.ltcs,'ltc')}}</span>
        </template>

        <!-- 年降开始时间 -->
        <template #beginYearReduce="scope">
          <span>{{resetLtcData(scope.row.ltcs,'beginYearReduce')}}</span>
        </template>
      </tableList>
    </iCard>
    <iCard :title="language('BEIZHU','备注')" :class="!isPreview && 'margin-top20'">
      <template slot="header-control" v-if="!isPreview">
        <iButton v-if="!isEdit" @click="handleEdit">{{language('BIANJI','编辑')}}</iButton>
        <template v-else>
          <iButton @click="handleDeleteRemark">{{language('SHANCHU','删除')}}</iButton>
          <iButton @click="handleAddRemark">{{language('TIANJIA','添加')}}</iButton>
          <iButton @click="handleSaveRemarks" :loading="saveLoading">{{language('BAOCUN','保存')}}</iButton>
          <iButton @click="cancelEdit">{{language('QUXIAO','取消')}}</iButton>
        </template>
      </template>
      <div class="meetingRemark">
        <div class="meetingRemark-item" v-for="(item, index) in remarkItem" :key="index">
          <el-checkbox v-if="!isPreview" v-model="item.checked"></el-checkbox>
          <iInput v-model="item.value" class="margin-top10" :class="!isPreview && 'margin-left20'" type="textarea" :rows="3" resize="none"></iInput>
        </div>
      </div>
    </iCard>
    <iCard :title="language('JINGLINGJIANAOCARD','上传仅零件号变更单')" class="margin-top20" v-if="$route.query.partProjType == partProjTypes.JINLINGJIANHAOGENGGAI">
        <div class="text-align-right margin-bottom10">
          <Upload hideTip @on-success='upLoadsucess' class="margin-right10"></Upload>
          <iButton @click='downloadFile'>下载</iButton>
          <iButton @click='deleteFile' >删除</iButton>
        </div> 
        <tableList :tableTitle="fileTableTitle" @handleSelectionChange="(r)=>fileTableSelect=r" :tableData="fileTableData"></tableList>
    </iCard>
  </div>
</template>

<script>
import { iCard, iButton, iInput, iFormGroup, iFormItem, iText, iMessage } from 'rise'
import { nomalTableTitle, checkList, accessoryTableTitle, sparePartTableTitle,fileTableTitle } from './data'
import tableList from '@/views/designate/designatedetail/components/tableList'
import { getList, getRemark, updateRemark } from '@/api/designate/decisiondata/rs'
import {uploadFiles} from '@/api/costanalysismanage/costanalysis'
import {partProjTypes,fileType} from '@/config'
import Upload from '@/components/Upload'
import {getFile,downloadUdFile,deleteFiles} from '@/api/file'
export default {
  components: { iCard, tableList, iButton, iInput, iFormGroup, iFormItem, iText ,Upload},
  props: {
    isPreview: {type:Boolean, default:false},
    nominateId: {type:String},
    // projectType: {type:String}
  },
  data() {
    return {
      // 零件项目类型
      partProjTypes,
      fileTableTitle,
      fileTableData:[],
      fileTableSelect:[],
      titleData:[
        {label:'零件关系',value:'配件', props: 'partProjectType'},
        {label:'询价采购员',value:'胡伟', props: 'fsBuyer'},
        {label:'货币单位',value:'RMB', props: 'currency'},
        {label:'申请单号',value:'', props: 'nominateAppId'},
        {label:'申请日期',value:'2020-01-01', props: 'nominateAppTime'},
        {label:'LINIE采购员',value:'胡伟', props: 'buyer'},
        {label:'Exchange rate',value:'1 RMB=1.00 RMB', props: 'exchangeRate'},
      ],
      // tableTitle: cloneDeep(nomalTableTitle),
      tableData: [],
      remarkItem: [{value: '', checked: false},{value: '', checked: false},{value: '', checked: false}],
      checkList: checkList,
      isEdit: false,
      saveLoading: false,
      projectType: '',
      basicData: {}
    }
  },
  computed: {
    exchangeRageCurrency() {
      if (this.basicData.currencyRateMap) {
        const exchangeRageCurrency = []
        for (var key in this.basicData.currencyRateMap) {
          if (key) {
            exchangeRageCurrency.push(key)
          }
        }
        return exchangeRageCurrency
      }
      return []
    },
    cardTitle() {
      if (this.projectType === partProjTypes.PEIJIAN) {
        return '配件采购 Nomination Recommendation - Spare Part Purchasing'
      } else if (this.projectType === partProjTypes.FUJIAN) {
        return '附件采购 Nomination Recommendation – Accessory Purchasing'
      }
      return '生产采购 Nomination Recommendation - Production Purchasing'
    },
    tableTitle() {
      if (this.projectType === partProjTypes.PEIJIAN) {
        return sparePartTableTitle
      } else if (this.projectType === partProjTypes.FUJIAN) {
        return accessoryTableTitle
      }
      return nomalTableTitle
    }
  },
  methods: {
    downloadFile(){
      if(this.fileTableSelect.length == 0) return iMessage.warn(this.language('NINGHAIWEIXUANZESHUJUWENJIAN',"您当前还未选择列表文件，请选择后重试！"))
      downloadUdFile(this.fileTableSelect.map(r=>r.uploadId))
    },
    deleteFile(){
      if(this.fileTableSelect.length == 0) return iMessage.warn(this.language('NINGHAIWEIXUANZESHUJUWENJIAN',"您当前还未选择列表文件，请选择后重试！"))
      deleteFiles(this.fileTableSelect.map(r=>r.id))
      this.getFileList()
    },
    /**
     * @description: 绑定仅零件号变更的文件和当前定点申请单的关系
     * @param {*} res
     * @return {*}
     */
    upLoadsucess(res){
      const sendMap = {
        hostId: res.data.hostId || this.$store.getters.nomiAppId || '',
        filePath:res.data.path,
        uploadId:res.data.id,
        fileSize:res.file.size,
        fileName:res.file.name,
        fileCode:'0',
        source:'0',
        fileType:fileType.JINGLINGHAOBIANG
      }
      uploadFiles(sendMap).then(res=>{
        if(res.result){
          this.getFileList()
          iMessage.success('上传成功！')
        }
      }).catch(err=>{
        iMessage.error(err.desZh)
      })
    },
    getFileList(){
      getFile({hostId:this.$store.getters.nomiAppId,fileType:fileType.JINGLINGHAOBIANG}).then(r=>{
        this.fileTableData = r.data
      }).catch(err=>{
        iMessage.error(err.desZh)
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
       let strList = [];
       let strFlag = false;
       for(let i =0;i<row.length;i++){
         if(row[i].ltcRate !='0.00'){
            strFlag = true;
           strList.push(row[i].ltcRate);
         }else if(strFlag && row[i].ltcRate == '0.00'){
           break
         }
       }
       return strList.length ? strList.join('/') : '-'
      }
    },
    handleEdit() {
      this.isEdit = true
    },
    cancelEdit() {
      this.isEdit = false
      this.getRemark()
    },
    handleAddRemark() {
      this.remarkItem.push({value: '', checked: false})
    },
    handleDeleteRemark() {
      this.remarkItem = this.remarkItem.filter(item => !item.checked)
    },
    /**
     * @Description: 保存备注
     * @Author: Luoshuang
     * @param {*}
     * @return {*}
     */    
    handleSaveRemarks() {
      this.saveLoading = true
      const params = {
        // meetRemark: this.remarks[this.resetRemarkType],
        nominateAppId: this.nominateId,
        // remarkType: this.resetRemarkType
        remarks: this.remarkItem.map(item => item.value)
      }
      updateRemark(params).then(res => {
        if (res?.result) {
          iMessage.success(this.$i18n.locale === 'zh' ? res?.desZh : res?.desEn)
          this.getRemark()
        } else {
          iMessage.error(this.$i18n.locale === 'zh' ? res?.desZh : res?.desEn)
        }
      }).finally(() => {
        this.saveLoading = false
      })
    },
    /**
     * @Description: 页面初始化
     * @Author: Luoshuang
     * @param {*}
     * @return {*}
     */    
    init() {
      this.getTopList()
      this.getRemark()
      this.$route.query.partProjType == partProjTypes.JINLINGJIANHAOGENGGAI && this.getFileList()
    },
    /**
     * @Description: 获取表格初始数据
     * @Author: Luoshuang
     * @param {*}
     * @return {*}
     */    
    getTopList() {
      getList(this.nominateId).then(res => {
        if (res?.result) {
          this.basicData = res.data
          this.tableData = res.data.lines
          this.projectType = res.data.partProjectType || ''
        } else {
          this.basicData = {}
          this.tableData = []
          this.projectType = ''
          iMessage.error(this.$i18n.locale === 'zh' ? res?.desZh : res?.desEn)
        }
      })
    },
    /**
     * @Description: 获取备注
     * @Author: Luoshuang
     * @param {*}
     * @return {*}
     */    
    getRemark() {
      getRemark(this.nominateId).then(res => {
        if (res?.result) {
          // res.data.forEach(element => {
          //   this.remarks[element.remarkType] = element.remark
          //   this.remarkItem = this.remarkItem.map(item => {
          //     return {...item, value: this.remarks[item.type]}
          //   })
          // })
          this.remarkItem = res.data.map(item => {
            return {value: item, checked: false}
          })
        } else {
          this.remarks = {}
          iMessage.error(this.$i18n.locale === 'zh' ? res?.desZh : res?.desEn)
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.exchangeRageCurrency + .exchangeRageCurrency {
  margin-left: 20px;
}
.meetingRemark {
  &-item {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
  }
}
.csc {
  ::v-deep .el-form-item__label {
    width: 150px;
  }
}
.isPreview {
  .card {
    box-shadow: none;
  }
}
</style>