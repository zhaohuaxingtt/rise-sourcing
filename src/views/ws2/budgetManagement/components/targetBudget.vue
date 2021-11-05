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
      {{ targetBudgetInfo }}
    </div>
    <iTableList
        v-loading="tableListLoading"
        :tableData="tableListData"
        :tableTitle="tableTitle"
        :height="300"
        :selection="false"
    >
    </iTableList>
    <div class="TOTAL">
      <div>Total</div>
      <div>{{ getTousandNum(tableTotal) }}</div>
    </div>
    <span slot="footer" class="dialog-footer">
    </span>
  </iDialog>
</template>
<script>
import {iDialog, iSearch, iInput, iButton, icon, iMessage} from 'rise'
import {Popover} from "element-ui"
import {pageMixins} from "@/utils/pageMixins";
import {targetBudgeTableTitle} from "pages/ws2/dataBase/components/data";
import {
  iTableList
} from '@/components'
import {
  partsPackageBudgetDetail
} from '@/api/ws2/commonSourcing'
import {getTousandNum} from "@/utils/tool";
import { cloneDeep } from 'lodash'

export default {
  mixins: [pageMixins],
  components: {
    iDialog,
    iTableList,
  },
  props: {
    title: {type: String, default: '目标预算详情'},
    value: {type: Boolean},
    id: {type: String, default: ''},
    targetBudgetInfo: {type: String, default: ''},
  },
  data() {
    return {
      tableTotal: '',
      tableListLoading: false,
      tableListData: '',
      tableTitle: targetBudgeTableTitle,
      getTousandNum: getTousandNum
    }
  },
  mounted() {
  },
  methods: {
    partsPackageBudgetDetail(){
      this.tableListLoading = true
      partsPackageBudgetDetail(this.id).then((res) => {
        const result = this.$i18n.locale === 'zh' ? res.desZh : res.desEn
        if (Number(res.code) === 0) {
          this.tableListData = cloneDeep(res.data).map(item => {
            item.amount = this.getTousandNum(Number(item.amount).toFixed(2))
            return item
          })
          this.tableTotal = cloneDeep(res.data).map(item => Number(item.amount)).reduce((a, b) => a + b).toFixed(2)
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
  },
  watch: {
    value(val){
      if(val){
        console.log(this.targetBudgetInfo)
        this.partsPackageBudgetDetail()
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
</style>

