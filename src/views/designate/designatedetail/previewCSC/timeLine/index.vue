<!--
 * @Author: wentliao
 * @Date: 2021-05-24 11:39:32
 * @Description: 决策资料-timeLine
-->
<template>
  <div
    class="decision-data-timeLine"
    v-permission.auto="
      SOURCING_NOMINATION_ATTATCH_TIMELINE | (决策资料 - timeline)
    "
  >
    <!-- <div v-for="(item, index) in detailData" :key="'timeLine_' + index"> -->
      <!-- <iCard collapse :title=" $i18n.locale === 'zh' ? item.materialGroupName : item.materialGroupDe" class="timeLine-card">
                <template v-for="(groupNode,groupNodeIndex) in item.nomiTimeAxisGroup">
                    <groupStep 
                        v-if="groupNode.isVisible"
                        :stepList="stepList"
                        :groupNode="groupNode.nomiTimeAxisLine"
                        :key="'groupNode_'+groupNodeIndex">
                        <template slot="myStep">
                            <icon symbol name="iconTimeLine-Today" class="step-icon" ></icon>
                            <p>Today</p>
                        </template>
                    </groupStep>
                </template>
                
                <div class="supplier-list" v-for="(supplierItem,supplierIndex) in item.nomiTimeAxisSupplierResultVOList" :key="'nomiTimeAxisSupplierResultVOList_'+supplierIndex">
                    <iCard collapse :title="$i18n.locale === 'zh' ? supplierItem.supplierName : supplierItem.supplierNameEn" class="supplier-item">
                        <template slot="header-control" >
                            <supplierStep :supplierData="supplierItem.nomiTimeAxisSuppliers"/>
                        </template>
                        <ul class="supplier-item-list">
                            <li class="flex-between-center" v-for="(supplierListItem,supplierListItemIndex) in supplierItem.nomiTimeAxisSupplierExps" :key="'supplier-item-'+supplierListItemIndex">
                                <span class="supplier-item-name">{{supplierListItem.durationName}}</span>
                                <div class="supplier-item-line">
                                    <supplierLine 
                                        :allList="supplierItem.nomiTimeAxisSupplierExps"
                                        :supplierIndex="supplierListItemIndex"
                                        :cardIndex="index"
                                    />
                                </div>
                            </li>
                        </ul>
                    </iCard>
                </div>
            </iCard> -->
            <!-- </div> -->
            <div class="time-box">

            <el-table class="table" ref="table" :data="tableData">
                <el-table-column
                prop="supplier"
                label="supplier"
                align="center"
                width="140"
                ></el-table-column>
                <template v-for="year in timeRange">
                <el-table-column :label="year" :key="year" align="center">
                    <template v-for="month in monthLabel">
                    <el-table-column
                        :label="month"
                        :key="month"
                        minWidth="20"
                        align="center"
                    ></el-table-column>
                    </template>
                </el-table-column>
                </template>
            </el-table>
    <div class="time-line" ref="time-line" :style="rfqStyle">
        <span>RFQ</span>
        <div class="text-line"></div>
    </div>
            </div>
  </div>
</template>

<script>
import { iCard, iButton, icon, iMessage } from "rise";
import { stepList } from "./components/data";
import groupStep from "./components/groupStep";
import supplierStep from "./components/supplierStep";
import supplierLine from "./components/supplierLine";
import supplierItem from "./components/supplierItem";
import {
  getTimeaxis,
  saveTimeaxis,
} from "@/api/designate/decisiondata/timeLine";
export default {
  name: "timeLine",
  components: {
    groupStep,
    supplierStep,
    supplierLine,
    supplierItem,
    iCard,
    iButton,
    icon,
  },
  data() {
    return {
      isEdit: false,
      stepList: stepList,
      isLoading: false,
      detailData: [],
      timeRange: [2023, 2024,2025,2026],
      monthLabel: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
      tableData: [
        {
          supplier: "供应商1",
        },
      ],
      rfqStyle:{
        height:'',
        width:'',
        left:''
      }
    };
  },
  created() {
    this.getDetail();
  },
  mounted() {},
  methods: {
    // 编辑 取消
    edit() {
      const { isEdit } = this;
      if (isEdit) {
        this.getDetail();
      }
      this.isEdit = !isEdit;
    },

    // 保存
    async save() {
      this.isLoading = true;
      const { detailData } = this;
      const data = {
        nomiTimeAxisList: detailData,
      };
      const { query = {} } = this.$route;
      const { desinateId = "" } = query;
      await saveTimeaxis(data)
        .then((res) => {
          const { code } = res;
          this.isLoading = false;
          if (code == 200) {
            iMessage.success(
              this.$i18n.locale === "zh" ? res.desZh : res.desEn
            );
            this.getDetail();
            this.isEdit = false;
            this.$store.dispatch("updateNominationStep", {
              desinateId,
              phaseType: "5",
            });
          } else {
            iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn);
          }
        })
        .catch((err) => {
          this.isLoading = false;
        });
    },

    // 获取timeLine详情
    getDetail() {
      const { query = {} } = this.$route;
      const { desinateId = "" } = query; // 34
      getTimeaxis(desinateId)
        .then((res) => {
          const { code, data } = res;
          if (code == 200 && data) {
            this.detailData = this.resetDetail(data);
            this.$nextTick(() => {
              let tableEl = this.$refs.table;
              let width = tableEl.$el.clientWidth
              let height = tableEl.$el.clientHeight
              this.setTimeline(width,height)
            });
          } else {
            iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn);
          }
        })
        .catch((err) => {});
    },
    setTimeline(width,height){
        this.rfqStyle = {
            height: `${height+40}px`,
            width: `${5}px`,
        }
    },
    // 显示隐藏指定的line
    showLine(index, line) {
      line.map((item, itemIndex) => {
        if (itemIndex == index) item.isVisible = true;
        else item.isVisible = false;
      });
    },

    // 重置下timeline数据
    resetDetail(data) {
      const newData = data;
      data.map((item) => {
        const { nomiTimeAxisSupplierResultVOList = [] } = item;
        nomiTimeAxisSupplierResultVOList.map((axisItem) => {
          const { nomiTimeAxisSupplierExps = [] } = axisItem;
          nomiTimeAxisSupplierExps.map((expsItem) => {
            // 添加一个range字段给日期组件
            expsItem.rangeDate = [expsItem.beginDate, expsItem.endDate];
          });
        });
      });

      return data;
    },
  },
  computed: {
    // eslint-disable-next-line no-undef
    ...Vuex.mapState({
      nominationDisabled: (state) => state.nomination.nominationDisabled,
      rsDisabled: (state) => state.nomination.rsDisabled,
    }),
    isPreview() {
      return this.$store.getters.isPreview;
    },
  },
};
</script>

<style lang="scss" scoped>
.decision-data-timeLine {
  padding: 40px;
  position: relative;
  .supplier-list {
    margin-top: 30px;
    .supplier-item {
      position: relative;
      ::v-deep .cardHeader {
        .collapse {
          position: absolute;
          left: -5px;
          top: 43px;
        }
      }
      .supplier-item-list {
        width: 100%;
        overflow: hidden;
        li {
          padding: 25px 0;
          align-items: center;
          .supplier-item-name {
            font-size: 16px;
            color: #0d2451;
          }
          .supplier-item-line {
            width: 900px;
          }
          &:not(:last-child) {
            border-bottom: 1px solid rgba($color: #707070, $alpha: 0.18);
          }
        }
      }
    }
  }
  .timeLine-card {
    margin-bottom: 20px;
  }
  .timeLine-btn-list {
    margin-bottom: 20px;
    text-align: right;
  }
  .timeLine-edit-list {
    .show-icon {
      width: 100px;
      padding-top: 10px;
      .show-icon-item {
        width: 25px;
        height: 25px;
        margin-left: 20px;
        &:hover {
          cursor: pointer;
        }
      }
    }
    .list-item-step {
      flex: 1;
    }
  }
  .step-icon {
    color: rgb(112, 112, 112);
  }
}
.time-box{
    position: relative;
}
.table {
  ::v-deep .el-table__header {
    background-color: #364d6e;
    tr:nth-child(even) {
      background-color: #fff;
      .cell {
        color: #222 !important;
      }
    }
  }
}
.time-line {
  position: absolute;
  display: flex;
  flex-flow: column;
  align-items: center;
  top: 0;
  z-index: 9;
  .text-line{
    margin-top: 5px;
    width: 2px;
    flex: 1;
    background: red;
  }
}
</style>