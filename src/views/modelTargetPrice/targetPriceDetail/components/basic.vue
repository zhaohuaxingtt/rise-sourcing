<!--
 * @Author: Luoshuang
 * @Date: 2021-06-23 15:16:47
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-11-09 21:15:23
 * @Description: 基础信息
 * @FilePath: \front-web\src\views\modelTargetPrice\targetPriceDetail\components\basic.vue
-->

<template>
  <iCard :title="language('SHENQINGMUBIAOJIA','申请目标价')" class="margin-top30 applyModuleTargetPrice" :loading="loading">
    <div class="applyMemo margin-bottom20">
      <span class="applyMemo-label margin-right10">{{language('SHENQINGBEIZHU', '申请备注')}}：</span>
      <iText v-if="applyType !== '1'"></iText>
      <iInput v-else />
    </div>
    <!------------------------------------------------------------------------>
    <!--                  表格                                              --->
    <!------------------------------------------------------------------------>
    <tableList :activeItems='"fsNum"' indexKey :tableData="tableData" :tableTitle="tableTitle" :tableLoading="tableLoading" @handleSelectionChange="handleSelectionChange" @openPage="openPage">
      <!-----------期望目标价--------------------------->
      <template #aaa="scope">
        <iText v-if="applyType !== '1'">{{scope.row.aaa}}</iText>
        <span v-else-if="scope.row.type === '1' && !scope.row.isEdit">{{scope.row.aaa}}</span>
        <iInput v-else :value="scope.row.aaa" @input="handleInput($event, scope.row, 'aaa')" />
      </template>
      <!-----------目标价--------------------------->
      <template #bbb="scope">
        <iText v-if="scope.row.type !== '2'">{{scope.row.aaa}}</iText>
        <span v-else-if="scope.row.type === '2' && !scope.row.isEdit">{{scope.row.aaa}}</span>
        <iInput v-else :value="scope.row.aaa" @input="handleInput($event, scope.row, 'aaa')" />
      </template>
      <!-----------操作--------------------------->
      <template #operation="scope">
        <template v-if="applyType === '1'">
          <!-----------类型为再申请-------------------------->
          <span @click.stop="$set(scope.row, 'isEdit', true)" v-if="scope.row.type === '1' && !scope.row.isEdit" class="cursor link">再申请</span>
          <span @click.stop="handleCancel(scope.row)" v-if="scope.row.type === '1' && scope.row.isEdit" class="cursor link">取消</span>
          <!-----------类型为新申请-------------------------->
          <span v-else ></span>
        </template>
        <template v-else-if="applyType === '2'">
          <!-----------已有目标价，不在这次申请列表里-------------------------->
          <span @click.stop="$set(scope.row, 'isEdit', true)" v-if="scope.row.approveType === '1' && !scope.row.isEdit" class="cursor link">修改</span>
          <span @click.stop="handleCancel(scope.row)" v-if="scope.row.approveType === '1' && scope.row.isEdit" class="cursor link">取消</span>
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
import { getTargetPriceDetail, setPrice } from "@/api/financialTargetPrice/index"
import { getDictByCode } from '@/api/dictionary'
export default {
  props: {
    id: {type:String},
    applyType: {type:String}
  },
  components: {iCard, iText, tableList, iInput},
  watch: {
    id:{
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
      tableData: [{fsNum: 'FS21-0032131230', type: '1'}, {fsNum: 'FS21-43243244332', type: '2'}],
      loading: false,
      currencyOptions: []
    }
  },
  computed: {
    tableTitle() {
      return applyTableTitle.filter(item => this.applyType === '1' ? item.key !== 'MUBIAOJIA' : true )
    }
  },
  created() {
    this.getDict()
  },
  methods: {
    handleCancel(row) {
      this.$set(row, 'isEdit', false)
      this.$set(row, 'aaa', '')
    },
    handleInput(value, row, name) {
      if (/^\d*\.?\d*$/.test(value)) {
        this.$set(row, name, value)
      }
    },
    openPage(row) {
      const router =  this.$router.resolve({path: '/sourceinquirypoint/sourcing/partsprocure/editordetail', query: { projectId:row.purchasingProjectId,businessKey:row.partProjectType}})
      window.open(router.href,'_blank')
    },
    isDisabled(type) {
      const lcs = ['lcTcCurrencyId','lcBPrice','lcAPrice']
      const skds = ['skdTcCurrencyId','skdBPrice','skdAPrice']
      const ckds = ['ckdExwork','ckdLanded','ckdDuty','ckdTcCurrencyId']
      if ((lcs.includes(type) || ckds.includes(type)) && this.detailData.applyType === 'SKD') {
        return true
      }
      if ((ckds.includes(type) || skds.includes(type)) && this.detailData.applyType === 'LC') {
        return true
      }
      if ((lcs.includes(type) || skds.includes(type)) && this.detailData.applyType === 'CKD LANDED') {
        return true
      }
      return false
    },
    getDict() {
      getDictByCode('PP_CSTMGMT_CURRENCY').then(res => {
        if(res?.result) {
          this.currencyOptions = res.data[0]?.subDictResultVo || []
        }
      })
    },
    getDetail() {
      if (!this.id) {
        return
      }
      // this.loading = true
      // getTargetPriceDetail(this.id).then(res => {
      //   if (res?.result) {
      //     this.detailData = res.data
      //   } else {
      //     this.detailData = {}
      //     iMessage.error(this.$i18n.locale === 'zh' ? res?.desZh : res?.desEn)
      //   }
      // }).finally(() => {
      //   this.loading = false
      // })
    },
    /**
     * @Description: 保存基础信息编辑
     * @Author: Luoshuang
     * @param {*}
     * @return {*}
     */    
    handleBasicSave() {
      this.loading = true
      const params = {
        ...this.detailData,
        partPrjCode: this.detailData.fsnrGsnrNum
      }
      setPrice(params).then(res => {
        if (res?.result) {
          iMessage.success(this.$i18n.locale === 'zh' ? res?.desZh : res?.desEn)
          this.changeBasicIsEdit(false)
          this.$emit('basicSaving')
        } else {
          iMessage.error(this.$i18n.locale === 'zh' ? res?.desZh : res?.desEn)
        }
      }).finally(() => {
        this.loading = false
      })
    },
    /**
     * @Description: 取消基础信息编辑
     * @Author: Luoshuang
     * @param {*}
     * @return {*}
     */    
    handleBasicCancel() {
      this.changeBasicIsEdit(false)
      this.getDetail()
    },
    /**
     * @Description: 切换基础信息部分编辑状态
     * @Author: Luoshuang
     * @param {*} isEdit
     * @return {*}
     */    
    changeBasicIsEdit(isEdit) {
      this.isEdit = isEdit
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