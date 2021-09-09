<!--
 * @Author: yz
 * @Date: 2021-04-21 17:24:15
-->
<template>
  <iDialog :title="$t(title)" :visible.sync="value" width="95%" top="5vh" @close='clearDiolog' z-index="1000" class="iDialogAdd">
    <div slot="title" class="title">
      <iButton class="download" v-loading="downPdfLoading" @click="downPdf">{{ language('LK_XIAZAI', '下载') }}</iButton>
    </div>
    <div class="changeContent" v-loading="tableLoading">
      <div class="head">
        <div>
          <div class="title">上汽大众模具投资变更单</div>
          <div class="item">
            <span>BM单号：{{ baseInfo.bmNum }}</span>
            <span>WBS编号：{{ baseInfo.wbsCode }}</span>
            <span>车型项目名称：{{ baseInfo.carTypeProName }}</span>
            <span>供应商：{{ baseInfo.supplierName }}</span>
          </div>
        </div>
        <div>
          <div class="NO">NO.{{ baseInfo.changeNo }}</div>
          <div class="item">
            <span>变更类型：{{ baseInfo.changeTypeName }}</span>
            <span>原总价：{{ baseInfo.oldAmount }}</span>
            <span>资产总价：{{ baseInfo.newAmount }}</span>
            <span>总价变化：{{ baseInfo.diffAmount }}</span>
          </div>
        </div>
      </div>
      <div class="content">
        <div class="explain">变更说明：{{ baseInfo.changeReason }}</div>
        <el-table
            :data="baseInfo.moldChangeSummaryVos"
            border
            style="width: 100%">
          <el-table-column
              type="index"
              label="编号"
              width="60"
              align="center">
          </el-table-column>
          <el-table-column
              prop="moldId"
              width="70"
              align="center"
              label="模具ID">
          </el-table-column>
          <el-table-column
              prop="assetName"
              align="center"
              label="固定资产名称（原名称）"
              width="120">
            <template slot="header">
              <div>固定资产名称</div>
              <div>（原名称）</div>
            </template>
            <template slot-scope="scope">
              <div>{{ scope.row.assetName }}</div>
              <div v-if="scope.row.assetNameOld">（{{ scope.row.assetNameOld }}）</div>
            </template>
          </el-table-column>
          <el-table-column
              prop="craftTypeOld"
              width="100"
              align="center"
              label="工艺类型（原类型）">
            <template slot="header">
              <div>工艺类型</div>
              <div>（原类型）</div>
            </template>
            <template slot-scope="scope">
              <div>{{ scope.row.craftType }}</div>
              <div v-if="scope.row.craftTypeOld">（{{ scope.row.craftTypeOld }}）</div>
            </template>
          </el-table-column>
          <el-table-column
              prop="moldTypeOld"
              width="100"
              align="center"
              label="工模具种类（原种类）">
            <template slot="header">
              <div>工模具种类</div>
              <div>（原种类）</div>
            </template>
            <template slot-scope="scope">
              <div>{{ scope.row.moldType }}</div>
              <div v-if="scope.row.moldTypeOld">（{{ scope.row.moldTypeOld }}）</div>
            </template>
          </el-table-column>
          <el-table-column
              prop="assetTypeNumNameOld"
              width="100"
              align="center"
              label="资产分类（原分类）">
            <template slot="header">
              <div>资产分类</div>
              <div>（原分类）</div>
            </template>
            <template slot-scope="scope">
              <div>{{ scope.row.assetTypeNumName }}</div>
              <div v-if="scope.row.assetTypeNumNameOld">（{{ scope.row.assetTypeNumNameOld }}）</div>
            </template>
          </el-table-column>
          <el-table-column
              prop="partsTotalNumOld"
              width="120"
              align="center"
              label="总成零件号（原总成号）">
            <template slot="header">
              <div>总成零件号</div>
              <div>（原总成号）</div>
            </template>
            <template slot-scope="scope">
              <div>{{ scope.row.partsTotalNum }}</div>
              <div v-if="scope.row.partsTotalNumOld">（{{ scope.row.partsTotalNumOld }}）</div>
            </template>
          </el-table-column>
          <el-table-column
              prop="partsTotalNameOld"
              width="120"
              align="center"
              label="总成零件名（原总成名）">
            <template slot="header">
              <div>总成零件名</div>
              <div>（原总成名）</div>
            </template>
            <template slot-scope="scope">
              <div>{{ scope.row.partsTotalName }}</div>
              <div v-if="scope.row.partsTotalNameOld">（{{ scope.row.partsTotalNameOld }}）</div>
            </template>
          </el-table-column>
          <el-table-column
              prop="partsNumOld"
              width="120"
              align="center"
              label="零件号（原零件号）">
            <template slot="header">
              <div>零件号</div>
              <div>（原零件号）</div>
            </template>
            <template slot-scope="scope">
              <div>{{ scope.row.partsNum }}</div>
              <div v-if="scope.row.partsNumOld">（{{ scope.row.partsNumOld }}）</div>
            </template>
          </el-table-column>
          <el-table-column
              prop="partsNameOld"
              width="100"
              align="center"
              label="零部件名称（原名称）">
            <template slot="header">
              <div>零部件名称</div>
              <div>（原名称）</div>
            </template>
            <template slot-scope="scope">
              <div>{{ scope.row.partsName }}</div>
              <div v-if="scope.row.partsNameOld">（{{ scope.row.partsNameOld }}）</div>
            </template>
          </el-table-column>
          <el-table-column
              prop="countOld"
              align="center"
              label="原数量">
          </el-table-column>
          <el-table-column
              prop="count"
              align="center"
              label="数量">
          </el-table-column>
          <el-table-column
              prop="assetPriceOld"
              align="center"
              label="原单价">
          </el-table-column>
          <el-table-column
              prop="assetPrice"
              align="center"
              label="资产单价">
          </el-table-column>
          <el-table-column
              prop="address"
              align="center"
              label="原总价">
          </el-table-column>
          <el-table-column
              prop="assetTotalOld"
              align="center"
              label="资产总价">
          </el-table-column>
          <el-table-column
              prop="diffAssetTotal"
              align="center"
              label="总价变化">
          </el-table-column>
          <el-table-column
              prop="changeTypeName"
              align="center"
              label="变更类型">
          </el-table-column>
          <el-table-column
              prop="changeReason"
              align="center"
              label="变更说明">
          </el-table-column>
        </el-table>
        <div class="foot">
          <div class="bottomLine">
            <span v-for="(item, index) in baseInfo.approveVos" :key="index">{{ item.assigneeName }} {{ item.approveResult }} {{ item.approveDate }}</span>
          </div>
          <div class="weight">
            <span v-for="(item, index) in baseInfo.approveVos" :key="index">{{ item.userOrg }}</span>
          </div>
        </div>
      </div>
      <div class="foot">
        <icon symbol class="icon" name="iconshangqidazhong1" />
        <div class="weight">CONFIDENTAL</div>
        <div class="br">申请日期 APP Date：{{ baseInfo.applyDate }}
          <br />{{ baseInfo.applyName }}</div>
      </div>
    </div>
  </iDialog>
</template>
<script>
import {
  iButton,
  iDialog,
  iMessage,
  icon
} from 'rise'

import {
  show,
  preview,
  downPdf
} from "@/api/ws2/purchase/changeTask";

export default {
  components: {
    iButton,
    iDialog,
    icon
  },
  props: {
    title: {type: String, default: 'LK_XUANZEBMXINZENGBIANGENG'},
    value: {type: Boolean},
    isCheck: {type: Boolean, default: false},
    changeOederData: {type: Object, default: () => {}},
  },
  data() {
    return {
      tableLoading: false,
      downPdfLoading: false,
      baseInfo: {}

    }
  },
  mounted() {
  },
  methods: {
    getInfo(){
      this.tableLoading = true
      if(this.isCheck){
        show({changeId: this.$route.query.bmChangeId}).then((res) => {
          const result = this.$i18n.locale === 'zh' ? res.desZh : res.desEn
          if (Number(res.code) === 0) {
            this.baseInfo = res.data
          } else {
            iMessage.error(result)
          }
          this.tableLoading = false
        }).catch(err => {
          this.tableLoading = false
        })
      } else {
        preview(this.changeOederData).then((res) => {
          const result = this.$i18n.locale === 'zh' ? res.desZh : res.desEn
          if (Number(res.code) === 0) {
            this.baseInfo = res.data
          } else {
            iMessage.error(result)
          }
          this.tableLoading = false
        }).catch(err => {
          this.tableLoading = false
        })
      }
    },
    downPdf(){
      this.downPdfLoading = true
      downPdf(this.baseInfo).then((res) => {
        const result = this.$i18n.locale === 'zh' ? res.desZh : res.desEn
        if (Number(res.code) === 0) {
        } else {
          iMessage.error(result)
        }
        this.downPdfLoading = false
      }).catch(err => {
        this.downPdfLoading = false
      })
    },
    clearDiolog() {
      this.$emit('input', false)
    },
    sure() {
    },
    reset() {

    }
  },
  watch: {
    value(val) {
      if (val) {
        this.getInfo()
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
  text-align: right;
  .download{
    margin-right: 40px;
  }
}

.changeContent {
  color: #333333;
  padding-bottom: 30px;
  .head{
    padding-bottom: 20px;
    margin-bottom: 30px;
    border-bottom: 1px solid #888888;
    > div{
      margin-bottom: 10px;
      display: flex;
      justify-content: space-between;
      .title{
        font-size: 24px;
        font-weight: bold;
      }
      .item{
        font-size: 16px;
        color: #131523;
        span{
          margin-left: 40px;
          padding-top: 10px;
        }
      }
      .NO{
        font-size: 20px;
        font-weight: bold;
        color: #333333;
      }
      &:nth-of-type(2){
        .item{
          span{
            padding-top: 0px;
          }
        }
      }
    }
  }
  .content{
    padding-bottom: 30px;
    border-bottom: 1px solid #888888;
    .explain{
      font-size: 16px;
      color: #131523;
      margin-bottom: 20px;
    }
    ::v-deep .el-table {
      .el-table__header{
        background-color: #F7FAFF;
      }
      .el-table__body-wrapper{
        min-height: 0;
      }
      .cell{
        text-overflow: initial;
        overflow: initial;
        white-space: initial;
      }
      tr:nth-child(even) {
        background-color: #ffffff;
      }
      td, th.is-leaf {
        border-bottom: 1px solid #ebeef5;
      }
    }
    > .foot{
      color: #131523;
      font-size: 16px;
      margin-top: 30px;
      .bottomLine{
        span{
          border-bottom: 1px solid #131523;
        }
      }
      .weight{
        font-weight: bold;
      }
      span{
        width: 200px;
        margin-right: 60px;
        text-align: center;
        display: inline-block;
      }
    }
  }
  >.foot{
    color: #131523;
    font-size: 16px;
    margin-top: 12px;
    display: flex;
    justify-content: space-between;
    .icon{
      width: 132px;
      height: 51px;
    }
    .weight{
      font-weight: bold;
      padding-top: 10px;
    }
    .br{
      text-align: right;
    }
  }
}
</style>

