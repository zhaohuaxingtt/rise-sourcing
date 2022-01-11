<template>
  <div class="bdl">
    <iCard class="bdlCard" v-for="(rfq, $index) in rfqList" :key="$index"
           :title="`RFQ NO.${ rfq.id },RFQ Name:${ rfq.rfq_name }`">
      <div v-if="dataGroup[rfq.id]">
        <el-table class="table" default-expand-all :data="dataGroup[rfq.id].tableListData"
                  :cell-class-name="cellClassName">
          <el-table-column type="expand">
            <template slot-scope="scope">
              <table class="expandTable">
                <colgroup>
                  <col width="140">
                </colgroup>
                <tr>
                  <td><span class="label">Supplier Name: </span></td>
                  <td><span>{{ scope.row.supplierName }}</span></td>
                </tr>
                <tr>
                  <td><span class="label">Rating: </span></td>
                  <td>
                    <div class="rateFlex">
                      <div class="rate"
                           v-for="(rateInfo, $rateIndex) in (Array.isArray(scope.row.departmentRate) ? scope.row.departmentRate : [])"
                           :key="$rateIndex">{{ rateInfo.rateDepartNum }}: {{ rateInfo.rate }}
                      </div>
                    </div>
                  </td>
                </tr>
              </table>
            </template>
          </el-table-column>
          <template v-for="item in dataGroup[rfq.id].tableTitle">
            <el-table-column :key="item.props" align="center" :label="item.name" :prop="item.props">
              <template #header>
                <div>
                  <p>{{ item.name }}</p>
                  <p>{{ item.enName }}</p>
                </div>
                <template v-if="item.props === 'supplierName'" slot-scope="scope">
                  <span>{{ scope.row.supplierName }}</span>
                  <supplierBlackIcon
                      :isShowStatus="typeof(scope.row.isComplete) ==='boolean' ? !scope.row.isComplete : false"
                      :BlackList="scope.row.blackStuffs || []"/>
                </template>
                <template v-if="item.props === 'sapCode'" slot-scope="scope">
                  <span>{{ scope.row.sapCode || scope.row.svwCode || scope.row.svwTempCode }}</span>
                </template>
              </template>
            </el-table-column>
          </template>
        </el-table>
      </div>
    </iCard>
  </div>
</template>

<script>
import {iCard} from "rise"
import supplierBlackIcon from "@/views/partsrfq/components/supplierBlackIcon"
import {tableTitle} from "@/views/designate/designatedetail/decisionData/bdl/data"
import {findRfqSupplierQuotationPage, readQuotation} from "@/api/designate/decisiondata/bdl"

export default {
  components: {iCard, supplierBlackIcon},
  data() {
    return {
      rfqList: [],
      dataGroup: {},
    }
  },
  async created() {
    await this.readQuotation()

    this.rfqList.forEach(rfq => {
      this.$set(this.dataGroup, rfq.id, {
        tableTitle: _.cloneDeep(tableTitle),
        tableListData: []
      })

      this.findRfqSupplierQuotationPage(rfq.id)
    })
  },
  methods: {
    readQuotation: function () {
      return readQuotation(this.$route.query.desinateId)
          .then(res => {
            if (res.code == 200) {
              this.rfqList = Array.isArray(res.data) ? res.data : []
            }
          })
    },
    findRfqSupplierQuotationPage: function (rfqId) {
      findRfqSupplierQuotationPage({
        nominateId: this.$route.query.desinateId,
        rfqId,
        current: 1,
        size: 999999,
      })
          .then(res => {
            if (res.code == 200) {
              this.$set(this.dataGroup[rfqId], "tableListData", Array.isArray(res.data) ? res.data : [])
            }
          })
    },
    cellClassName: function ({column}) {
      if (column.type === "expand") return "hideExpand"
      else return ""
    }
  }
}
</script>

<style lang="scss" scoped>
.bdl {
  .bdlCard {
    margin-bottom: 20px;

    &:last-of-type {
      margin-bottom: 0;
    }
  }

  .table {
    ::v-deep .el-table__expanded-cell {
      background: #ffffff78;
      padding-top: 0;
      padding-bottom: 0;
    }

    ::v-deep .hideExpand .cell {
      display: none;
    }

    .expandTable {
      width: 100%;

      tr, td {
        background: transparent !important;
      }

      tr {
        td:first-of-type {
          vertical-align: baseline;
        }
      }

      .rateFlex {
        display: flex;
        flex-wrap: wrap;

        .rate {
          width: 25%;
        }
      }
    }

    .label {
      color: #000;
      font-weight: 700;
      padding-left: 10px;
    }
  }
}
</style>
