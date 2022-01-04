<!--
 * @Author: Luoshuang
 * @Date: 2021-06-23 15:16:47
 * @LastEditors: YoHo
 * @LastEditTime: 2022-01-04 16:09:28
 * @Description: 基础信息
 * @FilePath: \front-sourcing\src\views\modelTargetPrice\targetPriceDetail\components\basic.vue
-->

<template>
  <iDialog :visible.sync="visible" class="margin-top30 applyModuleTargetPrice" :loading="loading" v-on="$listeners">
    <template slot="title">
      <div class="el-dialog__title header">
        <span>{{'申请零件目标价'}}</span>
        <iButton @click="handleSubmit" class="btn">申请</iButton>
      </div>
    </template>
    <!------------------------------------------------------------------------>
    <!--                  表格                                              --->
    <!------------------------------------------------------------------------>
    <tableList ref="tableList" class="table" :tableData="tableData" :tableTitle="tableTitle" :tableLoading="loading" @handleSelectionChange="handleSelectionChange" @select="select">
      <!-----------期望目标价--------------------------->
      <template #expectedTargetPrice="scope">
        <iInput v-if="scope.row.isEdit" :value="scope.row.expectedTargetPrice" maxlength="8" @input="handleInput($event, scope.row, 'expectedTargetPrice')" />
        <iText v-else>{{scope.row.expectedTargetPrice}}</iText>
      </template>
      <!-- 财务控制人 -->
      <template #procureFactoryName="scope">
        <iSelect v-if="scope.row.isEdit" v-model="scope.row.procureFactoryName">
          <el-option :label="val" :value="(+val)" v-for="(val,key) in options" :key="key"></el-option>
        </iSelect>
        <iText v-else>{{scope.row.procureFactoryName}}</iText>
      </template>
      <!-- 申请类型 -->
      <template #businessType="scope">
        <iSelect v-if="scope.row.isEdit" v-model="scope.row.businessType">
          <el-option :label="val" :value="val" v-for="(val,key) in options" :key="key"></el-option>
        </iSelect>
        <iText v-else>{{options[scope.row.businessType]}}</iText>
      </template>
      <!-- 备注 -->
      <template #originalTargetPrice="scope">
        <iInput v-if="scope.row.isEdit" v-model="scope.row.originalTargetPrice"></iInput>
        <iText v-else>{{scope.row.originalTargetPrice}}</iText>
      </template>
    </tableList>
  </iDialog>
</template>

<script>
import { iDialog, iMessage, iText, iInput, iSelect, iButton } from 'rise'
import tableList from '@/views/partsign/home/components/tableList'
import { getTaskPartList, importBatchMaintain, getTaskPartListRfq, submitApplyTargetPrice, saveMaintain, submitMaintain, exportBatchMaintain } from "@/api/modelTargetPrice/index"
import { getDictByCode } from '@/api/dictionary'
export default {
  props: {
    // rfqId: {type:String},
    // taskId: {type:String},
    // applyType: {type:String},
    // isAgainEdit: {type:Boolean},
    // isAgain: {type:Boolean},
    visible:{type:Boolean}
  },
  components: {iDialog, iText, tableList, iInput, iSelect, iButton},
  watch: {
    applyType: {
      handler(val) {
        if(val) {
          this.getDetail()
        }
      },
      immediate: true
     },
     visible(val){
       if(val){
         this.getDetail()
         this.$nextTick(()=>{
           this.$refs.tableList.defaultSelectAll()
         })
       }
     }
  },
  data() {
    return {
      isEdit: false,
      options:{
        1: 'LC',
        2: 'SKD',
        3: 'CKD LANDED',
      },
      tableData: [],
      loading: false,
      currencyOptions: [],
      remarks: '',
      selectList: [],
      isAgainEdit:false,
      tableTitle: [
      {props:'fsnrGsnrNum',name:'零件采购项目号', key: "LINGJIANCAIGOUXIANGMUHAO", tooltip: true},
      {props:'partNum',name:'零件号', key: "LINGJIANHAO", tooltip: true},
      {props:'partNameZh',name:'零件名(中)', key: "LINGJIANMINGZHONG", tooltip: true},
      {props:'procureFactoryName',name:'财务控制员', key: "CAIWUKONGZHIYUAN", tooltip: true},
      {props:'businessType',name:'申请类别', key: "SHENQINGLEIBIE", tooltip: true},
      {props:'expectedTargetPrice',name:'期望目标价', key: "QIWANGMUBIAOJIA", tooltip: true},
      {props:'originalTargetPrice',name:'备注', key: "YUANMUBIAOJIA", tooltip: true},
    ]
    }
  },
  computed: {
    applyType() {
      return this.$route.query.applyType || '1'
    },
    rfqId() {
      return this.$route.query.rfqId || this.$route.query.id || ''
    },
    taskId() {
      return this.$route.query.taskId || ''
    },
    isAgain() {
      return this.$route.query.isAgain == 'false' ? false : true
    }
  },
  mounted(){
  },
  methods: {
    upload(content) {
      const formData = new FormData()
      formData.append('file', content.file)
      importBatchMaintain(formData)
        .then(res => {
          this.fileSuccess(res)
        })
        .catch(rej => {
          this.fileError(rej)
        })
    },
    fileError(err) {
      this.$emit('changeUploadLoaing', false)
      // console.log(err.message)
      const errRes = JSON.parse(err.message)
      this.uploadLoading=false;iMessage.error(this.$i18n.locale === 'zh' ? errRes?.desZh : errRes?.desEn || '上传失败')
    },
    fileSuccess(res){
      if(res.code == 200){
        this.$emit('changeUploadLoaing', false)
        iMessage.success(this.$i18n.locale === 'zh' ? res?.desZh : res?.desEn)
        this.tableData = this.tableData.map(item => {
          const newItem = res.data?.find(Rsitem => Rsitem.fsNum === item.fsNum)
          if (newItem) {
            return {
              ...item,
              ...newItem
            }
          }
          return item
        })
      }else{
        this.$emit('changeUploadLoaing', false)
        iMessage.error(this.$i18n.locale === 'zh' ? res?.desZh : res?.desEn)
      }
    },
    async handleExport() {
      const params = this.tableData
      await exportBatchMaintain(params)
      this.$emit('changeExportLoading', false)
    },
    /**
     * @Description: 目标价维护保存
     * @Author: Luoshuang
     * @param {*}
     * @return {*}
     */    
    handleSave() {
      this.$emit('changeSaveLoading', true)
      const params = {
        maintainingVos: this.tableData.map(item => {
          return {
            ...item,
            // targetPrice: !item.targetPrice || item.targetPrice === '' ? 0 : item.targetPrice
          }
        }),
        taskIds: this.tableData.map(item => item.taskId)
      }
      saveMaintain(params).then(res => {
        if (res?.result) {
          iMessage.success(this.$i18n.locale === 'zh' ? res.desZh : res.desEn)
          this.getDetail()
        } else {
          iMessage.error(this.$i18n.locale === 'zh' ? res.desZh : res.desEn)
        }
      }).finally(() => {
        this.$emit('changeSaveLoading', false)
      })
    },
    /**
     * @Description: 申请目标价提交
     * @Author: Luoshuang
     * @param {*}
     * @return {*}
     */    
    handleSubmit() {
      // if (this.applyType === '1' && this.tableData.some(item => item.businessType == '1' && (!item.expectedTargetPrice || item.expectedTargetPrice === ''))) {
      //   iMessage.warn(this.language('XINSHENGQINGMUBIAOJIADELINGJIANQIWANGMUBIAOJIABUNENGWEIKONG', '新申请目标价的零件期望目标价不能为空'))
      //   return
      // }
      this.$emit('changeSubmitLoading', true)
      if (this.applyType === '1') {
        console.log(this.tableData)
        const params = {
          remarks: this.remarks,
          rfqId: this.rfqId,
          toolingTargetPrices: this.tableData.map(item => {
            return {
              ...item,
              expectedTargetPrice: item.expectedTargetPrice ? item.expectedTargetPrice : item.businessType == 2 && item.expectedTargetPrice != 0 ? item.originalTargetPrice == '-' ? 0 : item.originalTargetPrice : item.expectedTargetPrice || 0,
              originalTargetPrice: item.originalTargetPrice === '-' ? -1 : item.originalTargetPrice
            }
          })
        }
        console.log('params',params)
        submitApplyTargetPrice(params).then(res => {
          if (res?.result) {
            iMessage.success(this.$i18n.locale === 'zh' ? res.desZh : res.desEn)
            // this.gotoQuery()
          } else {
            iMessage.error(this.$i18n.locale === 'zh' ? res.desZh : res.desEn)
          }
        }).finally(() => {
          this.$emit('changeSubmitLoading', false)
        })
      } else {
        const params = {
          maintainingVos: this.tableData.map(item => {
            return {
              ...item,
              targetPrice: (item.isEdit || item.expectedTargetPrice) ? !item.targetPrice || item.targetPrice === '' ? 0 : item.targetPrice : item.expectedTargetPrice
            }
          }),
          taskIds: this.tableData.map(item => item.taskId)
        }
        submitMaintain(params).then(res => {
          if (res?.result) {
            iMessage.success(this.$i18n.locale === 'zh' ? res.desZh : res.desEn)
            this.gotoQuery()
          } else {
            iMessage.error(this.$i18n.locale === 'zh' ? res.desZh : res.desEn)
          }
        }).finally(() => {
          this.$emit('changeSubmitLoading', false)
        })
      }
    },
    select(selection){
      // selection.row.isEdit = !selection.row.isEdit
      selection.row.isEdit = true
      // console.log(selection.row);
    },
    handleSelectionChange(val) {
      this.selectList = val
    },
    /**
     * @Description: 取消编辑
     * @Author: Luoshuang
     * @param {*} row
     * @param {*} key
     * @return {*}
     */    
    handleCancel(row, key) {
      this.$set(row, 'isEdit', false)
      this.$set(row, key, '')
    },
    /**
     * @Description: 输入限制
     * @Author: Luoshuang
     * @param {*} value
     * @param {*} row
     * @param {*} name
     * @return {*}
     */    
    handleInput(value, row, name) {
      if (/^\d*$/.test(value)) {
        this.$set(row, name, value)
      }
    },
    openPage(row) {
      const router =  this.$router.resolve({path: '/sourceinquirypoint/sourcing/partsprocure/editordetail', query: { projectId: row.purchasingProjectPartId, businessKey: row.partProjectType }})
      window.open(router.href,'_blank')
    },
    gotoQuery() {
      this.$router.push('/targetpriceandscore/modeltargetprice/query')
    },
    /**
     * @Description: 获取目标价申请列表
     * @Author: Luoshuang
     * @param {*}
     * @return {*}
     */    
    getDetail() {
      this.loading = true
      if (this.applyType === '1') {
        getTaskPartListRfq(this.rfqId).then(res => {
          if (res?.result) {
            this.tableData = res.data || []
          } else {
            this.tableData = []
            iMessage.error(this.$i18n.locale === 'zh' ? res.desZh : res.desEn)
          }
        }).catch(e => {
          this.tableData = []
          iMessage.error(this.$i18n.locale === 'zh' ? e.desZh : e.desEn)
        }).finally(() => {
          this.loading = false
        })
      } else {
        getTaskPartList(this.taskId).then(res => {
          if (res?.result) {
            this.remarks = res.data?.remarks || ''
            this.tableData = (res.data?.items || []).map(item => {
              return {
                ...item,
                fsnrGsnrNum: item.fsNum,
                // expectedTargetPrice: item.expectedTargetPrice ? Number(item.expectedTargetPrice).toFixed() : '',
                targetPrice: item.targetPrice ? Number(item.targetPrice).toFixed() : ''
              }
            })
          } else {
            this.tableData = []
            iMessage.error(this.$i18n.locale === 'zh' ? res.desZh : res.desEn)
          }
        }).catch(e => {
          this.tableData = []
          iMessage.error(this.$i18n.locale === 'zh' ? e.desZh : e.desEn)
        }).finally(() => {
          this.loading = false
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.applyModuleTargetPrice {
  .header{
    display: flex;
    align-items: center;
    justify-content: space-between;
    .btn{
      margin-right: 20px;
    }
  }
  .table{
    padding-bottom: 20px;
  }
  .applyMemo {
    display: flex;
    align-items: center;
    ::v-deep .itext,.el-input {
      width: 400px
    }
  }
}
</style>