<!--
 * @Author: yz
 * @Date: 2021-04-21 17:24:15
-->
<template>
  <iDialog :title="$t(title)" :visible.sync="value" width="95%" top="5vh" @close='clearDiolog' z-index="1000" class="iDialogAdd">
    <div slot="title" class="title">
      <div class="text">{{ $t(title) + '：' + RFQID }}</div>
    </div>
    <div class="changeContent">
      <div v-loading="tableLoading">
        <iTableList
            :selection="false"
            :height="tableHeight - 260"
            :tableData="tableListData"
            :tableTitle="tableTitle"
        >
          <template #budget="scope">
            <div>{{ getTousandNum(scope.row.budget) }}</div>
          </template>
        </iTableList>
        <iPagination
            v-update
            @size-change="handleSizeChange($event, findAddColumnInvestmentBuild)"
            @current-change="handleCurrentChange($event, findAddColumnInvestmentBuild)"
            background
            :current-page="page.currPage"
            :page-sizes="page.pageSizes"
            :page-size="page.pageSize"
            :layout="page.layout"
            :total="page.totalCount"
        />
      </div>
    </div>
  </iDialog>
</template>
<script>
import {
  iDialog,
  iMessage,
  iPagination,
} from 'rise'
import {
  iTableList
} from '@/components'
import {RFQList, form} from "../components/data";
import {pageMixins} from "@/utils/pageMixins";
import {tableHeight} from "@/utils/tableHeight";
import {getTousandNum} from "@/utils/tool";
import {detail} from "@/api/ws2/budgetApproval";

export default {
  mixins: [pageMixins, tableHeight],
  components: {
    iDialog,
    iTableList,
    iPagination,
  },
  props: {
    title: {type: String, default: 'RFQ号'},
    RFQID: {type: String, default: ''},
    value: {type: Boolean},
  },
  data() {
    return {
      form: form,
      tableListData: [],
      tableTitle: RFQList,
      tableLoading: false,
      getTousandNum: getTousandNum
    }
  },
  mounted() {
    // this.findAddColumnInvestmentBuild()
  },
  methods: {
    detail() {
      console.log([this.RFQID])
      this.tableLoading = true
      detail({
        rfqIds: [this.RFQID],
        current: this.page.currPage,
        size: this.page.pageSize,
      }).then((res) => {
        const result = this.$i18n.locale === 'zh' ? res.desZh : res.desEn
        if (Number(res.code) === 200) {
          this.page.currPage = Number(res.pageNum);
          this.page.pageSize = Number(res.pageSize);
          this.page.totalCount = Number(res.total);
          this.tableListData = res.data;
        } else {
          iMessage.error(result);
        }
        this.tableLoading = false
      });
    },
    clearDiolog() {
      this.$emit('input', false)
    },
  },
  watch: {
    value(val) {
      if (val) {
        this.detail()
      }
    }
  }
}
</script>
<style lang='scss' scoped>
.iDialogAdd.el-dialog__wrapper {
  overflow: hidden;
  ::v-deep .el-dialog{
    height: 90%;
    overflow-y: auto;
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

  .star {
    position: absolute;
    right: -15px;
    top: 0;
    font-size: 30px;
    color: red;
  }
}

.changeContent {
  padding-bottom: 30px;

  ::v-deep .card {
    box-shadow: none;
    border-radius: 0;
    background: none;

    .cardBody {
      margin-top: 0;
      padding-top: 0;
      padding-left: 0;
      padding-right: 0;
    }

    .iSearch-content {
      border-bottom: 1px solid #E3E3E3;
      padding-bottom: 20px;
    }
  }

  .add {
    float: right;
    margin-bottom: 10px;
  }
}
</style>

