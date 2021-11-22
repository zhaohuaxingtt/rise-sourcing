<!--
 * @Author: Luoshuang
 * @Date: 2021-06-23 15:16:47
 * @LastEditors: Luoshuang
 * @LastEditTime: 2021-11-22 17:14:38
 * @Description: 基础信息
 * @FilePath: \front-sourcing\src\views\modelTargetPrice\targetPriceDetail\components\basic.vue
-->

<template>
  <iCard :title="language('SHENQINGMUBIAOJIA','申请目标价')" class="margin-top30 applyModuleTargetPrice" :loading="loading">
    <div class="applyMemo margin-bottom20">
      <span class="applyMemo-label margin-right10">{{language('SHENQINGBEIZHU', '申请备注')}}：</span>
      <iText v-if="applyType !== '1'">{{remarks}}</iText>
      <iInput v-else  v-model="remarks" />
    </div>
    <!------------------------------------------------------------------------>
    <!--                  表格                                              --->
    <!------------------------------------------------------------------------>
    <tableList :activeItems='"fsnrGsnrNum"' indexKey :tableData="tableData" :tableTitle="tableTitle" :tableLoading="loading" @handleSelectionChange="handleSelectionChange" @openPage="openPage">
      <!-----------期望目标价--------------------------->
      <template #expectedTargetPrice="scope">
        <iText v-if="applyType !== '1'">{{scope.row.expectedTargetPrice}}</iText>
        <span v-else-if="scope.row.businessType == '2' && !scope.row.isEdit">{{scope.row.expectedTargetPrice}}</span>
        <iInput v-else :value="scope.row.expectedTargetPrice" @input="handleInput($event, scope.row, 'expectedTargetPrice')" />
      </template>
      <!-----------目标价--------------------------->
      <template #targetPrice="scope">
        <iText v-if="applyType !== '2'">{{scope.row.targetPrice}}</iText>
        <span v-else-if="!scope.row.expectedTargetPrice && !scope.row.isEdit">{{scope.row.targetPrice}}</span>
        <iInput v-else :value="scope.row.targetPrice" @input="handleInput($event, scope.row, 'targetPrice')" />
      </template>
      <!-----------操作--------------------------->
      <template #operation="scope">
        <template v-if="applyType === '1'">
          <!-----------类型为再申请-------------------------->
          <span @click.stop="$set(scope.row, 'isEdit', true)" v-if="scope.row.businessType == '2' && !scope.row.isEdit" class="cursor link">{{language('ZAISHENQING','再申请')}}</span>
          <span @click.stop="handleCancel(scope.row, 'expectedTargetPrice')" v-if="scope.row.businessType == '2' && scope.row.isEdit" class="cursor link">{{language('QUXIAO','取消')}}</span>
          <!-----------类型为新申请-------------------------->
          <span v-else ></span>
        </template>
        <template v-else-if="applyType === '2'">
          <!-----------已有目标价，不在这次申请列表里-------------------------->
          <span @click.stop="$set(scope.row, 'isEdit', true)" v-if="!scope.row.expectedTargetPrice && !scope.row.isEdit" class="cursor link">{{language('XIUGAI','修改')}}</span>
          <span @click.stop="handleCancel(scope.row, 'targetPrice')" v-if="!scope.row.expectedTargetPrice && scope.row.isEdit" class="cursor link">{{language('QUXIAO','取消')}}</span>
          <!-----------当前申请目标价的零件-------------------------->
          <span v-else ></span>
        </template>
        <span v-else ></span>
      </template>
    </tableList>
  </iCard>
</template>

<script>
import { iCard, iMessage, iText, iInput } from 'rise'
import { applyTableTitle } from '../data'
import tableList from '../../components/tableList'
import { getTaskPartList, importBatchMaintain, getTaskPartListRfq, submitApplyTargetPrice, saveMaintain, submitMaintain, exportBatchMaintain } from "@/api/modelTargetPrice/index"
import { getDictByCode } from '@/api/dictionary'
export default {
  props: {
    rfqId: {type:String},
    taskId: {type:String},
    applyType: {type:String}
  },
  components: {iCard, iText, tableList, iInput},
  watch: {
    applyType: {
      handler(val) {
        if(val) {
          this.getDetail()
        }
      },
      immediate: true
     }
  },
  data() {
    return {
      isEdit: false,
      tableData: [],
      loading: false,
      currencyOptions: [],
      remarks: '',
      selectList: []
    }
  },
  computed: {
    tableTitle() {
      return applyTableTitle.filter(item => this.applyType === '1' ? item.key !== 'MUBIAOJIA' : true )
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
            targetPrice: !item.targetPrice || item.targetPrice === '' ? 0 : item.targetPrice
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
        const params = {
          remarks: this.remarks,
          rfqId: this.rfqId,
          toolingTargetPrices: this.tableData.map(item => {
            return {
              ...item,
              expectedTargetPrice: !item.expectedTargetPrice || item.expectedTargetPrice === '' ? 0 : item.expectedTargetPrice
            }
          })
        }
        submitApplyTargetPrice(params).then(res => {
          if (res?.result) {
            iMessage.success(this.$i18n.locale === 'zh' ? res.desZh : res.desEn)
            this.gotoQuery()
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
              targetPrice: !item.targetPrice || item.targetPrice === '' ? 0 : item.targetPrice
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
      this.$router.push('/modeltargetprice/query')
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
                fsnrGsnrNum: item.fsNum
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
  .applyMemo {
    display: flex;
    align-items: center;
    ::v-deep .itext,.el-input {
      width: 400px
    }
  }
}
</style>