<template>
  <iDialog :visible.sync="visible" class="margin-top30 applyModuleTargetPrice" :loading="loading" v-on="$listeners">
    <template slot="title">
      <div class="el-dialog__title header">
        <span>{{ language('申请SEL目标价', '申请SEL目标价') }}</span>
        <iButton class="btn" @click="handleSubmit">{{ language('LK_APPLAY', '申请') }}</iButton>
      </div>
    </template>
    <!-- <div class="applyMemo margin-bottom20">
      <span class="applyMemo-label margin-right10">{{language('SHENQINGBEIZHU', '申请备注')}}：</span>
      <iText v-if="applyType !== '1'">{{remarks}}</iText>
      <iInput v-else  v-model="remarks" />
    </div> -->
    <!------------------------------------------------------------------------>
    <!--                  表格                                              --->
    <!------------------------------------------------------------------------>
    <tableList class="table" :selection="false" :tableData="tableData" :tableTitle="tableTitle" :tableLoading="loading" >
      <!-----------期望目标价--------------------------->
      <template #expectedTargetPrice="scope">
        <iInput :value="scope.row.expectedTargetPrice" maxlength="8" @input="handleInput($event, scope.row, 'expectedTargetPrice')" />
      </template>
      <!-----------目标价--------------------------->
      <!-- <template #targetPrice="scope">
        <iInput v-if="applyType === '3'" :value="scope.row.targetPrice" maxlength="8" @input="handleInput($event, scope.row, 'targetPrice')" />
        <iText v-else-if="applyType !== '2'">{{thousandsFilter(scope.row.targetPrice)}}</iText>
        <span v-else-if="!scope.row.expectedTargetPrice && !scope.row.isEdit">{{thousandsFilter(scope.row.targetPrice)}}</span>
        <iInput v-else :value="scope.row.targetPrice" maxlength="8" @input="handleInput($event, scope.row, 'targetPrice')" />
      </template> -->
    </tableList>
  </iDialog>
</template>

<script>
import { iDialog, iMessage, iText, iInput, iButton } from 'rise'
import { selDialogTitle } from './data'
import tableList from 'pages/modelTargetPrice/components/tableList.vue'
import { getTaskPartList, importBatchMaintain, getTaskPartListRfq, submitApplyTargetPrice, saveMaintain, submitMaintain, exportBatchMaintain } from "@/api/modelTargetPrice/index"
import { getDictByCode } from '@/api/dictionary'
import { thousandsFilter } from "@/utils/filters.js";
export default {
  props: {
    // rfqId: {type:String},
    // taskId: {type:String},
    // applyType: {type:String},
    // isAgainEdit: {type:Boolean},
    // isAgain: {type:Boolean},
    todo: {type:Boolean},
    visible:{type:Boolean}
  },
  components: {iDialog, iText, tableList, iInput, iButton},
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
       }
     }
  },
  data() {
    return {
      isEdit: false,
      tableData: [],
      loading: false,
      currencyOptions: [],
      remarks: '',
      selectList: [],
      isAgainEdit:false,
    }
  },
  computed: {
    tableTitle(){
      if(this.todo){
        return moduleDialogTitle.filter(i=> !i.todoHiddel)
      }
      return moduleDialogTitle
    },
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
  methods: {
    upload(content) {
      const formData = new FormData()
      formData.append('file', content.file)
      // formData.append('applicationName', 'procurereq-service')
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
        // this.vm.init()
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
      if (this.applyType === '1' && this.tableData.some(item => !item.expectedTargetPrice || item.expectedTargetPrice === '')) {
        iMessage.warn(this.language('XINSHENGQINGMUBIAOJIA_QIWANGMUBIAOJIABUNENGWEIKONG', '新申请目标价，期望目标价不能为空'))
        return
      }
      this.loading = true
      if (this.applyType === '1') {
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
        submitApplyTargetPrice(params).then(res => {
          if (res?.result) {
            iMessage.success(this.$i18n.locale === 'zh' ? res.desZh : res.desEn)
            this.$store.dispatch('setTodoObj',this.$route.query.id);
            this.$emit('update','moldTargetPrice')
            this.$emit("update:visible", false)
          } else {
            iMessage.error(this.$i18n.locale === 'zh' ? res.desZh : res.desEn)
          }
        }).finally(() => {
          this.loading = false
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
      if (!this.rfqId) return
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
      width: 300px
    }
  }
}
</style>