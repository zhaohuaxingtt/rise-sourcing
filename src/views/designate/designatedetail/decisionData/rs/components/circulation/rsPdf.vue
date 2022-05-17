<template>
  <div class="rsPdf">
    <template v-for="(tableData,index) in tableList">
      <div :key="index" class="pageCard-main">
        <slot name="tabTitle"></slot>
        <iCard :key="index" class="rsCard pageCard">
          <template #header>
            <div class="title">
              <p>{{ `流转定点推荐 - ${cardTitle}` }}</p>
            </div>
          </template>
            <div class="pdf-content">
              <div class="infos">
                <div class="infoWrapper" v-for="(info, $index) in infos" :key="$index">
                  <div class="info">
                    <span class="label">{{ info.name }}：</span>
                    <span v-if="info.props === 'exchange'" v-html="exchangeRate"></span>
                    <!-- <span v-if="info.props === 'nominateAppTime'">{{ basicData[info.props] | dateFilter('YYYY-MM-DD') }}</span> -->
                    <div v-else>{{ basicData[info.props] }}</div>
                  </div>
                </div>
              </div>
              <!-- 第一页比其它页面多一个头部 -->
              <div :style="{'height':tableHeight + 'px'}">
                <tableList
                  :selection="false"
                  :tableTitle="tableTitle"
                  :tableData="tableData"
                  class="rsTable"
                  :tableRowClassName="tableRowClassName"
                  border
                >
                <template #fsnrGsnrNum="scope">
                    <div>
                      <p>{{ scope.row.fsnrGsnrNum }}</p>
                      <p>{{ scope.row.purchasingFactoryShortName ? `(${ scope.row.purchasingFactoryShortName })` : '' }}</p>
                    </div>
                  </template>
                  <template #oldAPrice="scope">
                    <span>{{ scope.row.oldAPrice | toThousands(true) }}</span>
                  </template>

                  <template #cfTargetAPrice="scope">
                    <div v-if="scope.row.status === 'SKDLC'">
                      <p>{{ scope.row.cfTargetSkdAPrice | toThousands(true) }}</p>
                      <p>{{ scope.row.cfTargetAPrice | toThousands(true) }}</p>
                    </div>
                    <span v-else-if="scope.row.status === 'SKD'">{{ scope.row.cfTargetSkdAPrice | toThousands(true) }}</span>
                    <span v-else>{{ scope.row.cfTargetAPrice | toThousands(true) }}</span>
                  </template>

                  <template #cfTargetBPrice="scope">
                    <div v-if="scope.row.status === 'SKDLC'">
                      <p>{{ scope.row.cfTargetSkdBPrice | toThousands(true) }}</p>
                      <p>{{ scope.row.cfTargetBPrice | toThousands(true) }}</p>
                    </div>
                    <span v-else-if="scope.row.status === 'SKD'">{{ scope.row.cfTargetSkdBPrice | toThousands(true) }}</span>
                    <span v-else>{{ scope.row.cfTargetBPrice | toThousands(true) }}</span>
                  </template>

                  <template #rw="scope">
                    <span>{{ scope.row.rw | toThousands(true) }}</span>
                  </template>
                  <template #packPrice="scope">
                    <span>{{ scope.row.packPrice | toThousands(true) }}</span>
                  </template>
                  <template #transportPrice="scope">
                    <span>{{ scope.row.transportPrice | toThousands(true) }}</span>
                  </template>
                  <template #operatePrice="scope">
                    <span>{{ scope.row.operatePrice | toThousands(true) }}</span>
                  </template>
                  <template #turnover="scope">
                    <span>{{ scope.row.turnover | toThousands(true) }}</span>
                  </template>

                <!-- 年降 -->
                <template #ltc="scope">
                  <span>{{ resetLtcData(scope.row.ltcs, 'ltc') }}</span>
                </template>

                <!-- 年降开始时间 -->
                <template #beginYearReduce="scope">
                  <span>{{
                    resetLtcData(scope.row.ltcs, 'beginYearReduce')
                  }}</span>
                </template>

							<template #svwCode="scope">
								<span>{{ scope.row.svwCode || scope.row.svwTempCode }}</span>
							</template>

                <template #aprice="scope">
                  <div v-if="scope.row.status === 'SKDLC'">
                    <p>{{ scope.row.skdAPrice | toThousands(true) }}</p>
                    <p>{{ scope.row.aprice | toThousands(true) }}</p>
                  </div>
                  <span v-else-if="scope.row.status === 'SKD'">{{
                    scope.row.skdAPrice | toThousands(true)
                  }}</span>
                  <span v-else>{{ scope.row.aprice | toThousands(true) }}</span>
                </template>

                <template #bprice="scope">
                  <div v-if="scope.row.status === 'SKDLC'">
                    <p>{{ scope.row.skdBPrice | toThousands(true) }}</p>
                    <p>{{ scope.row.bprice | toThousands(true) }}</p>
                  </div>
                  <span v-else-if="scope.row.status === 'SKD'">{{
                    scope.row.skdBPrice | toThousands(true)
                  }}</span>
                  <span v-else>{{ scope.row.bprice | toThousands(true) }}</span>
                </template>

                <template #investFee="scope">
                  <div v-if="scope.row.status === 'SKDLC'">
                    <el-popover
                      placement="top-start"
                      width="200"
                      trigger="hover"
                      :disabled="!scope.row.investFeeIsShared"
                    >
                      <div>
                        <div>
                          分摊金额：{{ scope.row.moldApportionPrice || '0.00' }}
                        </div>
                        <div>
                          未分摊金额：{{ scope.row.unShareInvestPrice || '0.00' }}
                        </div>
                      </div>
                      <div slot="reference">
                        <p>{{ scope.row.skdInvestFee | toThousands(true) }}</p>
                        <p>
                          <span
                            v-if="scope.row.investFeeIsShared"
                            style="color: red"
                            >*</span
                          >
                          <span>{{
                            scope.row.investFee | toThousands(true)
                          }}</span>
                        </p>
                      </div>
                    </el-popover>
                  </div>
                  <span v-else-if="scope.row.status === 'SKD'">
                    <p>{{ scope.row.skdInvestFee | toThousands(true) }}</p>
                  </span>
                  <span v-else>
                    <el-popover
                      placement="top-start"
                      width="200"
                      trigger="hover"
                      :disabled="!scope.row.investFeeIsShared"
                    >
                      <div>
                        <div>
                          分摊金额：{{ scope.row.moldApportionPrice || '0.00' }}
                        </div>
                        <div>
                          未分摊金额：{{ scope.row.unShareInvestPrice || '0.00' }}
                        </div>
                      </div>
                      <div slot="reference">
                        <span
                          v-if="scope.row.investFeeIsShared"
                          style="color: red"
                          >*</span
                        >
                        <span>{{ scope.row.investFee | toThousands(true) }}</span>
                      </div>
                    </el-popover>
                  </span>
                </template>

                <template #remarks="scope">
                  <div>
                    <iInput
                      v-if="editStatus"
                      v-model="scope.row.remarks"
                    ></iInput>
                    <span v-else>{{ scope.row.remarks }}</span>
                  </div>
                </template>

							<template #share="scope">
								<span>{{ +scope.row.share || 0 }}</span>
							</template>

                  <template #savingFee="scope">
                    <span>{{ scope.row.savingFee | toThousands(true) }}</span>
                  </template>
                </tableList>
                <div style="margin-left:20px">
                  <span style="color: red">*</span><span>代表投资费已分摊</span>
                </div>
                <div v-if="index==tableList.length-1 && !hasOtherPage">
                  <div class="beizhu">
                    备注 Remarks:
                    <div class="beizhu-value">
                      <p v-for="(item,index) in remarkItem" :key="index" v-html="remarkProcess(item.value)"></p>
                    </div>
                  </div>
                </div>
                <iCard class="checkDate rsCard Application" :title="`Application Date：${ dateFilter(processApplyDate, 'YYYY-MM-DD') }`">
                  <div class="checkList">
                    <div class="checkList-item" v-for="(item, index) in checkList" :key="index">
                      <icon v-if="item.approveStatus === true" name="iconrs-wancheng" class="complete"></icon>
                      <icon v-else-if="item.approveStatus === false" name="iconrs-quxiao" class="cancel"></icon>
                      <div v-else class="" >-</div>
                      <div class="checkList-item-info">
                        <span>Dept.:</span>
                        <span class="checkList-item-info-depart">{{item.approveDeptNumName}}</span>
                      </div>
                      <div class="checkList-item-info">
                        <span>Date:</span>
                        <span>{{item.approveDate|dateFilter('YYYY-MM-DD')}}</span>
                      </div>
                    </div>
                  </div>
                </iCard>
              </div>
              <div class="page-logo">
                <img src="../../../../../../../assets/images/logo.png" alt="" :height="46*0.6+'px'" :width="126*0.6+'px'">
                <div>
                  <p class="pageNum">{{'page '+(index+1)+' of '+(tableList.length+remarkList.length)}}</p>
                </div>
                <div>
                  <p>{{ userName }}</p>
                  <p>{{ new Date().getTime() | dateFilter('YYYY-MM-DD')}}</p>
                </div>
              </div>
            </div>
        </iCard>
      </div>
    </template>
    <div v-if="hasOtherPage">
      <template v-for="(remarkItem,index) in remarkList">
        <div :key="index" class="pageCard-main">
        <slot name="tabTitle"></slot>
        <iCard :key="index" class="rsCard pageCard">
          <template #header>
            <div class="title">
              <p>{{ `流转定点推荐 - ${cardTitle}` }}</p>
            </div>
          </template>
            <div :style="{'height': otherPageHeight + 'px'}">
              <div class="beizhu">
                备注 Remarks:
                <div class="beizhu-value">
                  <p v-for="(item,index) in remarkItem" :key="index" v-html="remarkProcess(item.value)"></p>
                </div>
              </div>
            </div>
            <div class="pdf-content">
              <div class="page-logo">
                <img src="../../../../../../../assets/images/logo.png" alt="" :height="46*0.6+'px'" :width="126*0.6+'px'">
                <div>
                  <p class="pageNum">{{'page '+(tableList.length+index+1)+' of '+(tableList.length+remarkList.length)}}</p>
                </div>
                <div>
                  <p>{{ userName }}</p>
                  <p>{{ new Date().getTime() | dateFilter('YYYY-MM-DD')}}</p>
                </div>
              </div>
            </div>
        </iCard>
    </div>
      </template>
    </div>
  </div>
</template>

<script>
import { iCard, iFormGroup, iFormItem, iText, icon } from "rise"
import tableList from "@/views/designate/designatedetail/components/tableList"
import { dateFilter } from "./data"
import { resetLtcData, remarkProcess } from '../meeting/data'
import filters from "@/utils/filters"
import { toThousands } from "@/utils"
export default {
	mixins: [filters],
	components: { iCard, iFormGroup, iFormItem, iText, tableList, icon },
	props: {
		cardTitle: { type: String },
		basicData: { type: Object, default: () => ({}) },
		infos: { type: Array, default: () => [] },
		tableTitle: { type: Array, default: () => [] },
		tableData: { type: Array, default: () => [] },
		remarkItem: { type: Array, default: () => [] },
    remarkList: { type: Array, default: () => [] },
		checkList: { type: Array, default: () => [] },
		exchangeRate: { type: String, default: '' },
		tableHeight: { type: Number, default: 0 },
    otherPageHeight: { type: Number, default: 0 },
    hasOtherPage:{ type: Boolean, default: false },
		tableList: { type: Array, default: () => [[]] },
		processApplyDate: { type: String, default: '' },
	},
	filters: {
		toThousands,
	},
	computed: {
		userName() {
			return this.$i18n.locale === 'zh'
				? this.$store.state.permission.userInfo.nameZh
				: this.$store.state.permission.userInfo.nameEn
		},
  },
  methods: {
    remarkProcess,
    dateFilter,
    resetLtcData,
    tableRowClassName({ row }) {
      if (row.isSuggestion) {
        return "suggestionRow"
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.rsPdf {
	width: 100%;
	background: #ffffff;
}
.pageCard-main{
	.rsCard {
		box-shadow: none;
		& + .rsCard {
			margin-top: 20px; /*no*/
		}

		::v-deep .cardHeader {
			padding: 30px 0px;
		}
		::v-deep .cardBody {
			padding: 0px;
		}
	}
	.pdf-content {
		& + .pdf-content {
			margin-top: 20px;
		}
	}

  .rsTable {
    &.el-table--group, &.el-table--border{
      border-color: #ccc;
    }
    font-size: 8px; /*no*/
    &::before, &::after {
      background-color: #ccc;
    }
    ::v-deep .el-table__fixed::before, .el-table__fixed-right::before{
      background-color: #ccc;
    }
    ::v-deep thead th {
      padding-top: 8px; /*no*/
      padding-bottom: 8px; /*no*/
      & > .cell {
        padding-left: 3px; /*no*/
        padding-right: 3px; /*no*/
        line-height: 14px; /*no*/
        p {
          min-height: 16px; /*no*/
        }
      }
    }
    ::v-deep tr {
      border-left: 1px solid #EBEEF5;
      border-bottom: 1px solid #EBEEF5;
      td {
        border-top: 1px solid #ccc;
        & > .cell{
          padding-right: 1px; /*no*/
          padding-left: 1px; /*no*/
          &:first-child{
          padding-left: 8px; /*no*/
          }
        }
      }
      &:nth-child(even) {
          background-color: #f7f7ff;
      }
    }
  }

  .infos {
    display: flex;
    padding: 0 0 20px;

    .infoWrapper {
      flex: 1;
    
      .info {
        font-size: 13px;
        display: flex;
        .label {
          font-weight: 800;
        }
      }
    }
  }
  .pdf-item, .pageCard{
    ::v-deep .cardHeader{
      padding-left: 0;
    }
    ::v-deep .cardBody {
      padding-left: 0;
      padding-right: 0;
    }
  }

  .beizhu {
    background-color: rgba(22, 96, 241, 0.03);
    // height: 40px;
    padding: 12px 14px;
    font-weight: bold;
    display: flex;
    &-value {
      font-weight: 400;
      margin-left: 20px;
    }
  }
  .page-logo {
    display: flex;
    justify-content: space-between;
    padding: 10px;
    align-items: center;
    border-top: 1px solid #666;
  }

	.checkDate {
		::v-deep .card .cardHeader .title {
			// font-size: 16px;
			font-weight: 400;
			color: rgba(75, 75, 76, 1);
		}
	}

	.Application {
		::v-deep .cardHeader {
			padding-top: 12px;
			padding-bottom: 12px;
			.title .title_content {
				font-size: 13px !important;
			}
		}
	}

  .checkList {
    display: flex;
    overflow: auto;
    &-item {
      flex: 1;
      flex-shrink: 0;
      max-width: 224px;
      width: 224px;
      height: 125px;
      border-radius: 15px;
      background-color: rgba(205, 212, 226, 0.12);
      margin-right: 19px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      padding: 10px 15px;
      font-size: 16px;
      color: rgba(65, 67, 74, 1);
      &-info {
        width: 100%;
        display: flex;
        justify-content: space-between;
        &-depart {
          font-size: 18px;
          font-weight: bold;
        }
      }
    }
    &-item:last-child {
      margin-right: 0;
    }
  }

	.complete {
		color: rgb(104, 193, 131);
	}

	.cancel {
		color: rgb(95, 104, 121);
	}
}
</style>
