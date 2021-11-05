<!--
 * @Author: moxuan
 * @Date: 2021-03-04 11:24:15
 * @LastEditTime: 2021-07-07 17:34:26
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
-->
<template>
  <iDialog
    :title="title || language('LK_ZHUANPAIPINGFENRENWU','转派评分任务')"
    :visible.sync="value"
    width="80%"
    @close="clearDiolog"
  >
    <div class="changeContent">
      <div class="margin-bottom20 clearFloat">
        <div class="floatright title-button-box">
          <iButton
            @click="add"
            v-permission="PARTSRFQ_ASSIGNMENTOFSCORINGTASKS_SAVE"
            >{{ language("LK_TIANJIA",'添加') }}</iButton
          >
          <iButton @click="deleteItems">{{ language("LK_SHANCHU",'删除') }}</iButton>
          <iButton @click="save">{{ language("LK_ZHUANPAI",'转派') }}</iButton>
        </div>
      </div>
      <tablelist
        v-if="showStatus"
        @handleSelectionChange="handleSelectionChange"
        :tableData="tableListData"
        :tableTitle="tableTitle"
        :tableLoading="tableLoading"
        :index="true"
        :select-props="selectProps"
        :select-props-options-object="selectPropsOptionsObject"
        @handleSelectChange="handleSelectChange"
        :is-select-options-linkage="true"
      ></tablelist>
    </div>
    <span slot="footer" class="dialog-footer">
      <iButton @click="$emit('input', false)">{{ language("LK_QUXIAO",'取 消') }}</iButton>
    </span>
  </iDialog>
</template>
<script>
import { iButton, iMessage, iDialog } from 'rise';
import tablelist from "pages/partsrfq/components/tablelist";
import { assignmentOfScroingTasksTableTitle } from "pages/partsrfq/home/components/data";
import { editRfqData } from "@/api/partsrfq/home";
import { getDictByCode, getDeptByDeptType } from "@/api/dictionary";
import { getGraderIdByDept } from "@/api/usercenter";
import store from "@/store";
import { rfqCommonFunMixins } from "pages/partsrfq/components/commonFun";

export default {
  components: { iButton, iDialog, tablelist },
  props: {
    title: { type: String, default: "" },
    value: { type: Boolean },
    repeatClick: Boolean,
    rfqId: {
      required: true,
      type: Array,
      default: () => {
        return [];
      },
    },
    selectDatalist:{
      type:Array,
      default:()=>[]
    }
  },
  mixins: [rfqCommonFunMixins],
  data() {
    return {
      tableListData: [],
      tableTitle: assignmentOfScroingTasksTableTitle,
      tableLoading: false,
      selectTableData: [],
      selectProps: ["deptType", "deptNum", "graderId"],
      selectPropsOptionsObject: {},
      showStatus: true,
      deptTypeList: [],
    };
  },
  created() {
    this.getDeptType();
  },
  methods: {
    clearDiolog() {
      this.$emit("input", false);
    },
    async save() {
      if (this.selectTableData.length == "")
        return iMessage.warn(this.language("LK_NINDANGQIANHAIWEIXUANZE",'抱歉！您当前还未选择！'));
      const req = {
        ratingInfoPackage: {
          ratingInfoList: this.selectTableData,
          rfqId: this.rfqId,
          userId: store.state.permission.userInfo.id,
        },
      };
      const res = await editRfqData(req);
      this.resultMessage(res);
      this.$emit("sure", this.selectTableData);
    },
    //修改表格改动列
    handleSelectionChange(val) {
      this.selectTableData = val;
    },
    async getDeptType() {
      const res = await getDictByCode("score_dept");
      this.deptTypeList = res.data[0].subDictResultVo;
    },
    async handleSelectChange(res) {
      const newObj = JSON.parse(JSON.stringify(this.selectPropsOptionsObject));
      switch (res.type) {
        case "deptType":
          newObj[res.time].deptNum = (await getDeptByDeptType(res.val)).data;
          this.tableListData.map((item) => {
            if (item.time === res.time) {
              item.deptNum = "";
              item.graderId = "";
            }
          });
          break;
        case "deptNum":
          this.tableListData.map((item) => {
            if (item.time === res.time) {
              item.graderId = "";
            }
          });
          newObj[res.time].graderId = (
            await getGraderIdByDept(res.val)
          ).data.map((item) => {
            return {
              code: item.id,
              name: item.nameZh,
            };
          });
          break;
        case "graderId":
          this.tableListData.map((item) => {
            if (item.time === res.time) {
              item.graderName = newObj[res.time].graderId.filter((item2) => {
                return item2.code === res.val;
              })[0].name;
            }
          });
          break;
      }
      this.selectPropsOptionsObject = newObj;
    },
    add() {
      const time = new Date().getTime();
      this.tableListData.push({
        deptType: "",
        deptNum: "",
        graderId: "",
        time: time,
      });
      this.selectPropsOptionsObject[time] = {
        deptType: this.deptTypeList,
        deptNum: [],
        graderId: [],
      };
    },
    deleteItems() {
      if (this.selectTableData.length === 0) {
        // return iMessage.warn("抱歉，您当前还未选择！");
        return iMessage.warn(this.language("LK_NINDANGQIANHAIWEIXUANZE",'抱歉！您当前还未选择！'));
      }
      const indexList = this.selectTableData.map((item) => {
        return item.time;
      });
      this.tableListData = this.tableListData.filter((item) => {
        if (!indexList.includes(item.time)) {
          return item;
        }
      });
    },
  },
};
</script>
<style lang='scss' scoped>
.changeContent {
  padding: 0px 10px 20px 10px;

  .title-button-box {
    margin-top: -60px;
    margin-right: 30px;
  }
}
</style>

