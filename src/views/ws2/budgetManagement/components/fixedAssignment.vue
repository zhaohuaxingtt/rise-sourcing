<!--
 * @Author: yz
 * @Date: 2021-04-21 17:24:15
-->
<template>
  <iDialog :title="$t(title)" :visible.sync="value" width="426px" top="0" @close='clearDiolog' class="iDialogCon">
    <div slot="title" class="title">
      <div class="text">{{ $t(title) }}</div>
    </div>
    <div class="info">
      {{ fixedAssignmentInfo }}
    </div>
    <iTableList
        v-loading="tableListLoading"
        :tableData="tableListData"
        :tableTitle="tableTitle"
        :height="300"
        :selection="false"
    >
      <template #amount="scope">
        <iInput
            v-model="scope.row.amount"
            @focus="focus(scope.row.index)"
            @blur="blur(scope.row.index)"
            @change="changeAmount"
            onkeyup="value=value.replace(/[^\d^\.]+/g,'').replace('.','$#$').replace(/\./g,'').replace('$#$','.')"
        ></iInput>
      </template>
    </iTableList>
    <div class="TOTAL">
      <div>
        Total
        <Popover
            class="iconTips"
            placement="top-start"
            content="车型项目分配总值需小于目标预算值"
            trigger="hover">
          <icon symbol name="iconxinxitishi" slot="reference"></icon>
        </Popover>
      </div>
      <div>{{ tableTotal }}</div>
    </div>
    <span slot="footer" class="dialog-footer">
      <iButton @click="save" :loading='saveLoading'>{{ $t('LK_QUEREN') }}</iButton>
    </span>
  </iDialog>
</template>
<script>
import {iDialog, iSearch, iInput, iButton, icon, iMessage} from 'rise'
import {Popover} from "element-ui"
import {pageMixins} from "@/utils/pageMixins";
import {fixedAssignmentTitle} from "pages/ws2/dataBase/components/data";
import {
  iTableList
} from '@/components'
import {
  partsPackageShareDetail,
  updatePackageShareAmount
} from '@/api/ws2/commonSourcing'
import {getTousandNum, delcommafy} from "@/utils/tool";

export default {
  mixins: [pageMixins],
  components: {
    iDialog,
    iInput,
    iButton,
    icon,
    Popover,
    iTableList,
  },
  props: {
    title: {type: String, default: '定点预分配详情'},
    value: {type: Boolean},
    id: {type: String, default: ''},
    fixedAssignmentInfo: {type: String, default: ''},
    targetBudgetAmount: {type: String, default: ''},
    partNameZh: {type: String, default: ''},
  },
  data() {
    return {
      tableTotal: '',
      tableListLoading: false,
      tableListData: '',
      tableTitle: fixedAssignmentTitle,
      getTousandNum: getTousandNum,
      delcommafy: delcommafy,
    }
  },
  mounted() {
  },
  methods: {
    focus(index){
      this.tableListData[index].amount = this.delcommafy(this.tableListData[index].amount)
    },
    blur(index){
      let value = this.tableListData[index].amount
      value = value.replace(/[^\d^\.]+/g,'').replace('.','$#$').replace(/\./g,'').replace('$#$','.')
      this.tableListData[index].amount = value !== '' ? this.getTousandNum(Number(value).toFixed(2)) : ''
    },
    changeAmount(){
      this.tableTotal = this.getTousandNum(this.tableListData.map(item => Number(this.delcommafy(item.amount))).reduce((a, b) => a + b).toFixed(2))
    },
    partsPackageShareDetail(){
      this.tableListLoading = true
      partsPackageShareDetail(this.id).then((res) => {
        const result = this.$i18n.locale === 'zh' ? res.desZh : res.desEn
        if (Number(res.code) === 0) {
          this.tableListData = res.data.map((item, index) => {
            item.index = index
            item.amount = this.getTousandNum(Number(item.amount).toFixed(2))
            return item
          })
          this.tableTotal = this.getTousandNum(this.tableListData.map(item => Number(this.delcommafy(item.amount))).reduce((a, b) => a + b).toFixed(2))
        } else {
          iMessage.error(result);
        }
        this.tableListLoading = false
      }).catch(err => {
        this.tableListLoading = false
      })
    },
    clearDiolog() {
      this.$emit('input', false)
    },
    save() {
      if(this.tableListData.some(item => item.amount === undefined || item.amount === null || item.amount === '')){
        iMessage.warn(`【${this.partNameZh}】并未进行预算分配！`);
        return
      }
      this.tableListLoading = true
      updatePackageShareAmount({
        packageDetailAmountVOList: this.tableListData.map(item => {
          item.amount = Number(this.delcommafy(item.amount))
          return item
        }),
        partsPackageId: this.id,
        targetBudgetAmount: this.targetBudgetAmount
      }).then((res) => {
        const result = this.$i18n.locale === 'zh' ? res.desZh : res.desEn
        if (Number(res.code) === 0) {
          iMessage.success(result);
          this.$emit('input', false)
          this.$emit('fixedAssignmentSave')
        } else {
          iMessage.error(result);
        }
        this.tableListLoading = false
      }).catch(err => {
        this.tableListLoading = false
      })
    },
  },
  watch: {
    value(val){
      if(val){
        this.partsPackageShareDetail()
      }
    }
  }
}
</script>
<style lang='scss' scoped>
.iDialogCon {
  ::v-deep .el-dialog {
    top: 50%;
    transform: translateY(-50%);
  }
}
.title {
  position: relative;
  display: inline-block;
  .text {
    font-size: 18px;
    font-weight: bold;
    line-height: 25px;
  }
}
.info{
  font-size: 16px;
  color: #000000;
  margin-bottom: 10px;
}
.TOTAL{
  color: #000000;
  font-size: 16px;
  font-weight: bold;
  display: flex;
  text-align: center;
  justify-content: space-around;
}
.iconTips{
  margin-left: 5px;
  cursor: pointer;
}
</style>

