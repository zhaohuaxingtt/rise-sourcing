<!--
 * @Author: moxuan
 * @Date: 2021-03-05 17:24:15
 * @LastEditTime: 2022-03-23 17:26:06
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
-->
<template>
  <iDialog
    class="newRfqRound"
    :visible.sync="value"
    width="90%"
    @close="clearDiolog"
    z-index="1000"
  >
    <div slot="title" class="el-dialog__title">
      {{ title || language("LK_XINJIANRFQLUNCI", "新建RFQ轮次") }}
      <!-- 黑名单文案 -->
      <span class="blackuserInfo" v-if="containeBlackUser">
        <i class="blackIcon"></i>
        {{
          language(
            "GONGYINGSHANGHEIMINGDANBUKEXUNJIA",
            "供应商黑名单，不可询价"
          )
        }}
      </span>
    </div>
    <div class="changeContent">
      <div class="clearFloat">
        <div class="floatright title-button-box">
          <template>
            <iButton
              @click="save"
              :loading="loading"
              v-permission.auto="
                PARTSRFQ_EDITORDETAIL_NEWRFQROUND_SAVE |
                  (新建rfq轮次弹窗 - 保存)
              "
              >{{ language("LK_BAOCUN", "保存") }}</iButton
            >
            <iButton
              v-if="roundType === 'commonRound'"
              @click="updateRfqStatus('06')"
              :disabled="!saveStaus"
              v-permission.auto="
                PARTSRFQ_EDITORDETAIL_NEWRFQROUND_SAND |
                  (新建rfq轮次弹窗 - 发出询价)
              "
              >{{ language("LK_FASONGXUNJIA", "发送询价") }}
            </iButton>
          </template>
          <!-- <template v-else>
            <iButton @click="saveAndCreate" v-permission="PARTSRFQ_EDITORDETAIL_NEWRFQROUND_SAVEANDCREATE">
              {{ language('LK_BAOCUNBINGCHUANGJIAN','保存') }}
            </iButton>
          </template> -->
        </div>
      </div>
      <iFormGroup class="fromGroup" inline icon>
        <iFormItem
          :label="language('LK_LUNCILEIXING', '轮次类型')"
          name="test"
          v-permission.auto="
            PARTSRFQ_EDITORDETAIL_NEWRFQROUND_ROUNDTYPE |
              (新建rfq轮次弹窗 - 轮次类型)
          "
        >
          <i-select v-model="roundType" @change="handleSelectChange">
            <el-option
              v-for="items in roundTypeOptions"
              :key="items.code"
              :value="items.code"
              :label="items.name"
              :disabled="items.disabled"
            />
          </i-select>
        </iFormItem>
        <iFormItem
          :label="language('LK_BENLUNBAOJIAQIZHISHIJIAN', '本轮报价起止时间')"
          name="test"
          v-if="
            [
              'commonRound',
              'manualBidding',
              'autoBidding',
              'bidRound',
              'biddingRound',
            ].includes(roundType)
          "
        >
          <div class="flex">
            <iDatePicker
              type="date"
              :placeholder="language('LK_QINGXUANZE', '请选择')"
              v-model="startTime"
              value-format="yyyy-MM-dd"
              v-permission.auto="
                PARTSRFQ_EDITORDETAIL_NEWRFQROUND_STARTTIME |
                  (新建rfq轮次弹窗 - 起始时间)
              "
              disabled
            ></iDatePicker>
            <span class="padding10 flex"></span>
            <iDatePicker
              type="date"
              :placeholder="language('LK_QINGXUANZE', '请选择')"
              v-model="endTime"
              value-format="yyyy-MM-dd"
              v-permission.auto="
                PARTSRFQ_EDITORDETAIL_NEWRFQROUND_ENDTIME |
                  (新建rfq轮次弹窗 - 结束时间)
              "
              :picker-options="{
                disabledDate(time) {
                  return time.getTime() < Date.now() - 24 * 60 * 60 * 1000;
                },
              }"
            ></iDatePicker>
          </div>
        </iFormItem>
        <!-- <iFormItem :label="language('LK_BENLUNBAOJIAQIZHISHIJIAN竞价','竞价起止时间')" name="test" v-if="['biddingRound'].includes(roundType)">
          <div class="flex">
            <iDatePicker type="date" :placeholder="language('LK_QINGXUANZE','请选择')" v-model="startTime" value-format="yyyy-MM-dd"
                            v-permission="PARTSRFQ_EDITORDETAIL_NEWRFQROUND_STARTTIME"></iDatePicker> 
            <span class="padding10 flex"></span>
            <iDatePicker type="date" :placeholder="language('LK_QINGXUANZE','请选择')" v-model="endTime" value-format="yyyy-MM-dd"
                          v-permission="PARTSRFQ_EDITORDETAIL_NEWRFQROUND_ENDTIME"
                          :picker-options="{
                            disabledDate(time) {
                              return time.getTime() < Date.now()
                            }
                          }"
          ></iDatePicker>
          </div>
        </iFormItem> -->
        <!-- <iFormItem :label="language('KAIBIASHIJIANXUANZE','开标时间')" name="test" v-if="['bidRound'].includes(roundType)">
            <iDatePicker type="date" :placeholder="language('LK_QINGXUANZE','请选择')" v-model="startTime" value-format="yyyy-MM-dd" v-permission="PARTSRFQ_EDITORDETAIL_NEWRFQROUND_STARTTIME"></iDatePicker>           
        </iFormItem> -->
      </iFormGroup>
      <tablelist
        ref="multipleTable"
        :tableData="tableListData"
        :tableTitle="tableTitle"
        :tableLoading="tableLoading"
        :index="true"
        @handleSelectionChange="handleSelectionChange"
        @handleRowClick="handleRowClick"
        :select-props="['cbdTemplateId']"
        :round-type="roundType"
        :rfqInfo="rfqInfo"
      ></tablelist>
      <!-- <tablelist
          ref="multipleTable"
          v-else
          :tableData="tableListData"
          :tableTitle="tableTitle2"
          :tableLoading="tableLoading"
          :index="true"
          @handleSelectionChange="handleSelectionChange"
          @handleRowClick="handleRowClick"
      ></tablelist> -->
      <!------------------------------------------------------------------------>
      <!--                  表格分页                                          --->
      <!------------------------------------------------------------------------>
      <!-- <iPagination
          v-update
          @size-change="handleSizeChange($event, getTableList)"
          @current-change="handleCurrentChange($event, getTableList)"
          background
          :page-sizes="page.pageSizes"
          :page-size="page.pageSize"
          :layout="page.layout"
          :current-page='page.currPage'
          :total="page.totalCount"
      /> -->
    </div>
  </iDialog>
</template>
<script>
import {
  iButton,
  iMessage,
  iDialog,
  iFormGroup,
  iFormItem,
  iSelect,
  iPagination,
} from "rise";
import { iDatePicker } from "rise";
import tablelist from "./components/tablelist";
import { pageMixins } from "@/utils/pageMixins";
import { tableTitle, tableTitle2 } from "./components/data";
import {
  findBySearches,
  pageRfqRound,
  rfqRoundCreated,
  modification,
} from "@/api/partsrfq/home";
import store from "@/store";
import { partProjTypes, roundsType } from "@/config";
import { rfqCommonFunMixins } from "pages/partsrfq/components/commonFun";
export default {
  components: {
    iButton,
    iDialog,
    iFormGroup,
    iFormItem,
    iSelect,
    tablelist,
    iPagination,
    iDatePicker,
  },
  mixins: [pageMixins, rfqCommonFunMixins],
  props: {
    // title: {type: String, default: '新建RFQ轮次'},
    title: { type: String, default: "" },
    value: { type: Boolean },
    repeatClick: Boolean,
    dataRes: {
      type: Object,
      default: () => {},
    },
    rfqInfo: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    //eslint-disable-next-line no-undef
    ...Vuex.mapState({
      rfqSelectedProjectParts: (state) => state.rfq.pendingPartsList,
    }),
    // 包含黑名单供应商
    containeBlackUser() {
      return this.tableListData.filter((o) => o.isDisabled).length > 0;
    },
  },
  data() {
    return {
      loading: false,
      editStatus: false,
      tableListData: [],
      tableLoading: false,
      selectTableData: [],
      roundType: "",
      roundTypeOptions: [],
      // eslint-disable-next-line no-undef
      startTime: moment().format("YYYY-MM-DD"),
      endTime: null,
      tableTitle,
      tableTitle2,
      saveStaus: false,
      roundsPhase: "",
      dbParts: [
        partProjTypes.DBLINGJIANYICIXCAIGOU,
        partProjTypes.DBYICHIXINGCAIGOU,
        partProjTypes.DBJINLINGJIANHAOGENGAI,
        partProjTypes.DBZHANGJIA,
        partProjTypes.DBLINGJIAN,
      ],
    };
  },
  created() {
    this.getRoundTypeOptions();
  },
  methods: {
    init() {
      const res = this.dataRes;
      this.tableListData = res.data.map((item) => ({
        ...item,
        cbdTemplateId: item.cbdTemplateId + "",
      }));
      this.roundsPhase = this.tableListData[0].roundsPhase;
      // this.page.currPage = res.pageNum
      // this.page.pageSize = res.pageSize
      // this.page.totalCount = res.total
      this.setTableRowSelected();
      this.initTimeData();
    },
    //获取表格数据
    async getTableList() {
      const id = this.$route.query.id;
      if (id) {
        this.tableLoading = true;
        const req = {
          findType: "10",
          rfqId: id,
          // current: this.page.currPage,
          // size: this.page.pageSize,
          current: 1,
          size: 9999,
        };
        try {
          const res = await pageRfqRound(req);
          this.tableListData = res.data.map((item) => ({
            ...item,
            cbdTemplateId: item.cbdTemplateId + "",
          }));
          this.roundsPhase = this.tableListData[0].roundsPhase;
          // this.page.currPage = res.pageNum
          // this.page.pageSize = res.pageSize
          // this.page.totalCount = res.total
          this.setTableRowSelected();
          this.tableLoading = false;
          this.initTimeData();
        } catch {
          this.tableLoading = false;
        }
      }
    },
    sureChangeItems() {
      if (this.selectTableData.length == "")
        return iMessage.warn(
          this.language("LK_NINDANGQIANHAIWEIXUANZE", "抱歉！您当前还未选择！")
        );
      this.$emit("sure", JSON.parse(this.selectTableData));
    },
    clearDiolog() {
      this.$emit("input", false);
    },
    handleSelectionChange(val) {
      this.selectTableData = val;
    },
    async getRoundTypeOptions() {
      const res = await findBySearches("04");
      this.roundTypeOptions = res.data.map((item) => {
        item.disabled = item.code === "autoBidding";
        return item;
      });
      this.roundType = this.roundTypeOptions[0].code;
    },
    async save() {
      if (this.selectTableData.length === 0) {
        return iMessage.warn(
          this.language(
            "LK_NINDANGQIANHAIWEIXUANZERENWU",
            "抱歉，您当前还未选择任务！"
          )
        );
      }
      //online-bidding逻辑：如果当前rfq中的零件采购项目为DB零件 && 货币类型不一样，无法选择在线竞价-英式
      if (
        this.rfqSelectedProjectParts &&
        this.rfqSelectedProjectParts.some(
          (r) => r.currencyCode !== this.rfqSelectedProjectParts[0].currencyCode
        ) &&
        this.roundType == "biddingRound" &&
        this.rfqSelectedProjectParts.every((r) =>
          this.dbParts.includes(r.partProjectType)
        )
      ) {
        return iMessage.warn(
          this.language("DBLJQTYZXHBFQZXJ", "DB业务请统一货币再发起在线竞价")
        );
      }
      const id = this.$route.query.id;
      if (id) {
        const req = {
          userId: store.state.permission.userInfo.id,
          startTime: this.startTime,
          endTime: this.endTime,
          rfqId: id,
          roundsType: this.roundType,
          bdlInfos: this.selectTableData,
        };
        this.loading = true
        const res = await rfqRoundCreated(req);
        this.loading = false
        //保存的时候，如果保存成功！自动将窗口关闭，并且刷新详情数据，和询价管理(包含普通询价)
        if (res?.code == "200") {
          // 更新数据
          this.$emit("refreshBaseInfo");
        }
        if (res.data) {
          this.clearDiolog();
        }
        this.resultMessage(res, () => {
          this.saveStaus = true;
        });
      }
    },
    async updateRfqStatus(updateType) {
      const query = this.$route.query;
      const req = {
        updateType,
        tmRfqIdList: [query.id],
        userId: store.state.permission.userInfo.id,
      };
      const res = await modification(req);
      this.resultMessage(res);
      if (res?.code == "200") {
        this.clearDiolog();
        this.$emit("showTodo");
      }
    },
    initTimeData() {
      if (this.roundType === "commonRound") {
        // eslint-disable-next-line no-undef
        this.startTime = moment().format("YYYY-MM-DD");
        if (this.roundsPhase === "01") {
          // eslint-disable-next-line no-undef
          this.endTime = moment().add(14, "d").format("YYYY-MM-DD");
        } else if (this.roundsPhase === "02") {
          // eslint-disable-next-line no-undef
          this.endTime = moment().add(7, "d").format("YYYY-MM-DD");
        }
      }
    },
    handleSelectChange(val) {
      this.setTableRowSelected();
      if (val === "commonRound") {
        this.initTimeData();
      } else if (val === "manualBidding") {
        this.endTime = "";
      }
    },
    setTableRowSelected() {
      this.$nextTick(() => {
        this.tableListData.forEach((item) => {
          if (
            this.rfqInfo.currentRounds == 0 &&
            this.rfqInfo.partProjectType &&
            this.rfqInfo.partProjectType[0] == partProjTypes.COPLINGJIAN
          )
            return;

          if (
            item.isMbdl === "2" &&
            typeof item.isDisabled === "boolean" &&
            item.isDisabled !== true
          ) {
            //这个地方的勾选逻辑为：只要是Mbdl，都默认勾选上。但是在组件内部中，会判断当前是否是普通轮次，并且当前是否是第一轮（如果满足当前要求，则将出现默认勾选并且不让取消）
            // 加个黑名单的判断 当isDisabled为true的时候默认不勾选不可操作
            this.$refs.multipleTable.$refs.newRoundTable.toggleRowSelection(
              item,
              true
            );
          }
        });
      });
    },
    handleRowClick(row, column, event) {
      // if (!this.$refs.multipleTable.selectable(row)) this.$refs.multipleTable.$refs.newRoundTable.toggleRowSelection(row, true)
    },
  },
  watch: {
    value(val) {
      if (val) {
        this.saveStaus = false;
        // this.getTableList()
        this.init();
      }
    },
  },
};
</script>

<style scoped lang='scss'>
.changeContent {
  padding: 0 10px 20px 10px;

  .form-title {
    height: 25px;
    font-size: 18px;
    font-weight: 600;
    line-height: 25px;
    color: #000000;
    margin-bottom: 17px;
  }

  .title-button-box {
    margin-top: -60px;
    margin-right: 30px;
  }

  .inline-block {
    display: inline-block;
  }
}
.blackIcon {
  display: inline-block;
  background-image: url("~@/assets/images/if-not-allowed.svg");
  width: 1rem;
  height: 1rem;
  background-size: 1rem 1rem;
  margin-bottom: -3px;
}
.blackuserInfo {
  font-weight: 100;
  font-size: 12px;
  margin-left: 10px;
}

.newRfqRound {
  .fromGroup {
    ::v-deep .el-form-item {
      width: calc((100% - 2 * 100px) / 2.8) !important;

      .el-form-item__label {
        width: auto;
        min-width: 50px;
        max-width: 200px;
      }

      .el-select {
        width: 300px;
      }
    }
  }
}
</style>

