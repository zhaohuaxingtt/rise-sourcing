<!--
 * @Author: youyuan
 * @Date: 2021-10-28 16:45:22
 * @LastEditTime: 2022-12-02 19:37:18
 * @LastEditors: 余继鹏 917955345@qq.com
 * @Description: mtz
 * @FilePath: \front-portal\src\views\mtz\annualGeneralBudget\locationChange\components\MtzLocationPoint\components\decisionMaterial\components\mtz.vue
-->
<template>
  <div>
    <div>
      <div ref="qrCodeDiv" class="sign_swap">
        <p class="tableTitle" v-if="chipTableData.length > 0">
          {{ language('GUIZEQINGDAN', '规则清单') }}-Regulation
        </p>
        <tableList class="margin-top20" :tableData="chipTableData" v-if="chipTableData.length > 0"
          :tableTitle="ruleTableTitle" :index="true" :selection="false" border>
          <template slot-scope="scope" slot="method">
            <span>{{
                scope.row.method == '2' ? $t('变价单补差') : $t('一次性补差')
            }}</span>
          </template>
          <template slot-scope="scope" slot="sapCode">
            <span>{{ scope.row.sapCode }}</span>
          </template>
          <template slot-scope="scope" slot="startDate">
            <span>{{ getDay(scope.row.startDate) }}</span>
          </template>
          <template slot-scope="scope" slot="endDate">
            <span>{{ getDay(scope.row.endDate) }}</span>
          </template>
        </tableList>
      </div>
    </div>
  </div>
</template>

<script>
import {
  iCard,
} from 'rise'
import tableList from '@/views/partsign/editordetail/components/tableList'
import { ruleTableTitle } from './components/data'
import { getApproveSignChipDetail } from "@/api/designate/decisiondata/rs"
export default {
  components: {
    iCard,
    tableList,
  },
  props:{
    chipTableData:{
      type:Array,
      default:()=>[]
    }
  },
  data() {
    return {
      ruleTableTitle,
    }
  },
  async created() {
    // this.getApproveSignChipDetail()
  },
  methods: {
    getDay(date) {
      console.log(date)
      return date ? date.split(' ')[0] : date
    },
    // getApproveSignChipDetail() {
    //   this.loadingRule = true
    //   getApproveSignChipDetail({
    //     signId: this.$route.query.signId
    //   }).then((res) => {
    //     this.ruleTableListData = res.data || []
    //     if (this.ruleTableListData.length) {
    //       this.$emit('haveData')
    //     } else {
    //       this.$emit('noData')
    //     }
    //   }).finally(() => {
    //     this.loadingRule = false
    //   })
    // }
  }
}
</script>

<style lang='scss' scoped>
$tabsInforHeight: 35px;

.sign_swap {
  width: 100%;
  height: 100%;
}

.tableTitle {
  display: inline-block;
  font-weight: bold;
  font-family: Arial;
  color: #000000;
  opacity: 1;
  font-size: 18px;
}

.headBox {
  position: relative;
  justify-content: space-between;
  width: 100%;
  display: flex;

  .headTitle {
    display: inline-block;
    font-weight: bold;
    font-family: Arial;
    color: #000000;
    opacity: 1;
  }

  .buttonBox {
    position: absolute;
    right: 13px;
  }
}

.applayDateBox1 {
  display: flex;
  align-items: center;
  flex-flow: wrap;
  margin-top: 20px;
}

.applayDateIcon {
  margin-top: 10px;
  width: 33px;
  height: 33px;
}

.applayDateContentItem {
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-top: 12px;
  padding: 0 20px;
  font-size: 16px;

  .applayDateDeptTitle {
    font-weight: bold;
  }
}

.applayDateContent {
  display: inline-block;
  background-color: #cdd4e2;
  height: 178px;
  width: 16%;
  margin: 10px 0.3% 0;
  border-radius: 15px;
  text-align: center;
}

.tabsBoxInfor {
  margin-bottom: 10px;
  display: flex;
  flex-flow: wrap;
  justify-content: space-between;

  .inforDiv {
    width: 29%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 0;
    margin-bottom: 20px;

    span {
      font-size: 15px;
    }

    .inforText {
      font-size: 14px;
      padding: 10px 10px;
      width: 68%;
      min-height: $tabsInforHeight;
      height: auto;
      background: #f8f8fa;
      text-align: center;
    }
  }
}

.download_btn {
  width: 100%;
  display: flex;
  justify-content: flex-end;
  padding-top: 20px;
  padding-bottom: 20px;
  padding-right: 20px;
}

::v-deep .el-form {
  .el-table {
    .cell {
      padding: 0 !important;

      span {
        margin-right: 0px !important;
      }
    }
  }
}

.tabs_box_right {
  .samll_title {
    width: 80px;
  }

  .small_text {
    float: left;
  }

  div {
    display: flex;
    align-items: flex-start;
    margin-right: 20px;
  }

  span {
    display: inline-block;
    font-size: 15px !important;
  }
}

.hr_divider {
  margin: 0 1.5rem 0 0;
}

::v-deep .cardHeader {
  padding: 1.875rem 1.5625rem 0 2.4rem !important;
}

.infor_futitle {
  padding: 0.5rem 0;
  font-size: 15px !important;
  line-height: 25px;

  .big_font {
    font-weight: bold;
  }

  .big_small {
    padding-left: 15px;
  }
}

.over_flow_y_ture {
  ::v-deep .el-table__body-wrapper {
    max-height: 300px;
    overflow-y: auto;
  }
}

::v-deep .el-form-item__content {
  line-height: 20px !important;
}

.first_one {
  margin-top: 30px !important;
}
</style>
