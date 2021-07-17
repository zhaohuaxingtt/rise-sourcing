<!--
 * @Author: your name
 * @Date: 2021-06-21 10:50:38
 * @LastEditTime: 2021-07-17 16:58:08
 * @LastEditors: Please set LastEditors
 * @Description: 费用详情
 * @FilePath: \front-web\src\views\partsrfq\bobAnalysis\components\feeDetails.vue
-->
<template>
  <div>
    <iCard>
      <template v-slot:header>
        <div class="flex-between-center titleBox">
          <div class="flex-between-center">
            <span class="title">费用详情</span>
            <div class="wrap">
              <span v-if="remark"
                    class="margin-left40 remark">{{
                remark
              }}</span>
              <span v-if="remark"
                    class="margin-left40 remark2">备注：{{ remark }}</span>
            </div>
          </div>
          <div v-show="checkFLag">
            <iButton v-show="flag"
                     @click="open">全部展开</iButton>
            <iButton v-show="flag1"
                     @click="close">全部收回</iButton>
            <iButton @click="remarks">备注</iButton>
            <iButton @click="reduction">还原</iButton>
            <iButton @click="group">数据分组</iButton>
            <iButton @click="down">导出</iButton>
          </div>
          <div v-show="!checkFLag">
            <iButton @click="clear">移除</iButton>
            <iButton @click="finish">完成</iButton>
            <iButton @click="off">取消</iButton>
          </div>
        </div>
      </template>
      <table1 :tableList="tableList"
              v-if="totalTable"
              v-bind="$attrs"></table1>
      <groupedTable ref="groupedTable"
                    class="margin-top20"
                    :tableList="groupList"
                    v-if="!totalTable"
                    @groupBy="groupBtn"></groupedTable>
      <iDialog :visible.sync="visible1"
               title="分组至"
               width="20%">
        <el-form>
          <el-form-item label="分组至">
            <el-select v-model="value1"
                       clearable
                       placeholder="请选择"
                       value-key="matchId">
              <el-option v-for="(item) in options"
                         :key="item.matchId"
                         :label="item.groupName"
                         :value="item">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <span slot="footer"
              class="dialog-footer">
          <el-button type="primary"
                     @click="groupToList">确 定</el-button>
        </span>
      </iDialog>
      <remarkDialog :visible="visible"
                    @remake="sure"
                    @cancel="cancel"></remarkDialog>
    </iCard>
    <ungroupedTable ref="ungroupedTable"
                    class="margin-top20"
                    :tableList="ungroupList"
                    v-if="groupby"
                    @groupBy="groupBtn"></ungroupedTable>
  </div>
</template>

<script>
import { iCard, iButton, iDialog, iMessage } from "rise";
import table1 from "./components/table1.vue";
import table2 from "./components/table2.vue";
import table3 from "./components/table3.vue";
import table4 from "./components/table4.vue";
import table5 from "./components/table5.vue";
import table6 from "./components/table6.vue";
import remarkDialog from "./components/remarkDialog.vue";
import ungroupedTable from "@/views/partsrfq/bob/bobAnalysis/ungroupedTable.vue";
import groupedTable from "@/views/partsrfq/bob/bobAnalysis/groupedTable.vue";
import { filterEmptyChildren } from '@/utils'
import {
  chargeRetrieve,
  getRfqToRemark,
  modifyRfqToRemark,
  down,
  getGroupInfo,
  addComponentToGroup,
  groupTerms
} from "@/api/partsrfq/bob";
import {
  tableList,
  ungroupList,
  groupList,
  groupByList,
  ungroupByList,
  ungroupByHeader,
} from "./components/data.js";

export default {
  inheritAttrs: true,
  components: {
    iCard,
    iDialog,
    iButton,
    table1,
    ungroupedTable,
    groupedTable,
    remarkDialog,
  },
  data () {
    return {
      flag: true,
      flag1: false,
      tableList: [],
      ungroupList: [],
      ungroupByList,
      ungroupByHeader,
      groupList: [],
      groupByList,
      expends: [],
      visible: false,
      visible1: false,
      remark: "",
      groupby: false,
      totalTable: true,
      value: "",
      value1: "",
      options: [],
      result: [],
      activeName: "",
      checkFLag: true,
      SchemeId: ""
    };
  },
  created () {

    if (this.$store.state.rfq.entryStatus === 1) {
      this.SchemeId = this.$route.query.rfqId
      this.chargeRetrieve("all");
    } else {
      if (this.$route.query.rfqId) {
        this.SchemeId = this.$route.query.rfqId
        this.chargeRetrieve("all");
      } else {
        this.SchemeId = this.$store.state.rfq.SchemeId;
      }
    }
    this.getRfqToRemark();
  },
  mounted () {
    console.log(this.$attrs, '传值')
  },
  methods: {
    getRfqToRemark () {
      getRfqToRemark({
        rfqCode: this.rfqCode,
      }).then((res) => {
        if (res) {
          if (res.data) {
            this.remark = res.data.remark;
          }
        }
      });
    },
    chargeRetrieve (type) {
      chargeRetrieve({
        schemaId: this.SchemeId,
        viewType: type,
      })
        .then((res) => {
          this.tableList = res;
          this.tableList.title.forEach(value => {
            this.$attrs.supplierList.forEach(i => {
              if (value.title == i.supplierId) {
                value.title = i.shortNameZh
              }
            })
          })
          filterEmptyChildren(this.tableList.element, 'detailId')
          console.log(this.tableList, 23232332)
          this.$nextTick(() => {
            this.open();
          });
        })
        .catch((err) => { });
    },
    open () {
      let els = this.$el.getElementsByClassName("el-table__expand-icon");
      if (this.tableList.element.length != 0 && els.length != 0) {
        this.flag = false;
        this.flag1 = true;
        for (let j1 = 0; j1 < els.length; j1++) {
          els[j1].classList.add("dafult");
        }
        if (
          this.$el.getElementsByClassName("el-table__expand-icon--expanded")
        ) {
          const open = this.$el.getElementsByClassName(
            "el-table__expand-icon--expanded"
          );
          for (let j = 0; j < open.length; j++) {
            open[j].classList.remove("dafult");
          }
          const dafult = this.$el.getElementsByClassName("dafult");
          for (let a = 0; a < dafult.length; a++) {
            dafult[a].click();
          }
        }
      }
    },
    close () {
      if (this.tableList.element.length != 0) {
        this.flag = true;
        this.flag1 = false;
        const elsopen = this.$el.getElementsByClassName(
          "el-table__expand-icon--expanded"
        );
        if (
          this.$el.getElementsByClassName("el-table__expand-icon--expanded")
        ) {
          for (let i = 0; i < elsopen.length; i++) {
            elsopen[i].click();
          }
        }
      }
    },
    cancel (flag) {
      this.visible = flag;
    },
    reduction () {
      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      });
      groupTerms({
        analysisSchemeId: this.SchemeId
      }).then(res => {
        loading.close();
        iMessage.success('还原成功')
        this.chargeRetrieve("all");
      })

    },
    sure (val, flag) {
      this.visible = flag;
      this.remark = val;
      modifyRfqToRemark({
        remark: this.remark,
        rfqCode: this.rfqCode,
      }).then(() => iMessage.success("备注成功"));
    },
    // 递归获取checked属性方法
    getTreeExpandKeys (obj) {
      // obj是传入的array
      if (obj && obj.length !== 0) {
        obj.forEach((item) => {
          this.expends.push(item.id);
          // 如果此列表有children, 进行递归
          if (item.children) {
            this.getTreeExpandKeys(item.children);
          }
        });
      }
    },
    remarks () {
      this.visible = true;
    },
    group () {
      this.totalTable = false;
      this.groupby = true;
      this.checkFLag = false
    },
    groupBtn (e, result, activeName) {
      if (result.length === 0) {
        this.$message.error('请选择数据');
        return
      }
      this.visible1 = e;
      this.result = result
      this.activeName = activeName
      console.log(result, activeName, 222222222)
      getGroupInfo({
        schemaId: 135,
        code: activeName === 'rawUngrouped' ? '1' : '2'
      }).then(res => {
        this.options = res.data
      })

    },
    groupToList () {
      if (!this.value1) {
        this.$message.error('请选择分组');
        return
      }

      addComponentToGroup({
        groupId: this.value1.matchId,
        groupName: this.value1.groupName,
        roundDetailIdList: this.result
      }).then(res => {
        this.$refs.ungroupedTable.activeName = ""
        this.$nextTick(() => {
          this.$refs.ungroupedTable.activeName = this.activeName
          this.$refs.ungroupedTable.chargeRetrieve(this.activeName)
        });
        this.$refs.groupedTable.chargeRetrieve(this.activeName === 'rawUngrouped' ? 'rawGrouped' : 'maGrouped')
        this.visible1 = false;
      })
    },
    handleChange (value) { },
    clear () { },
    finish () {
      this.finishGroup()
    },
    off () {
      this.finishGroup()
    },
    finishGroup () {
      this.totalTable = true
      this.groupby = false
      this.checkFLag = true
      this.chargeRetrieve("all");
    },
    down () {
      down({
        schemaId: 5,
      }).then((res) => { });
    },
  },
};
</script>

<style lang="scss" scoped>
// .titleBox {
//   width: 100%;
//   font-weight: bold;
//   font-size: $font-size18 ;
// }
.wrap {
  width: 100px;
  position: relative;
}
.title {
  font-size: $font-size18 !important;
}
.remark {
  font-size: $font-size14 !important;
  font-weight: normal;
  color: #949494;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.remark2 {
  font-size: $font-size14 !important;
  font-weight: normal;
  color: #949494;
  position: absolute;
  top: -40px;
  left: 40px;
  width: 400px;
  padding: 10px;
  box-shadow: 0px 3px 10px rgba(27, 29, 33, 0.16);
  border-radius: 5px;
  background: #ffffff;
  display: none;
}
.wrap:hover .remark2 {
  display: block;
}
</style>
