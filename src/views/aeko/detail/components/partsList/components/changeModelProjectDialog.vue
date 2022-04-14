<!--
 * @Author: YoHo
 * @Date: 2022-04-01 16:54:39
 * @LastEditTime: 2022-04-01 18:30:53
 * @LastEditors: YoHo
 * @Description: 等待接口完善
-->
<template>
  <iDialog
    :visible.sync="dialogVisible"
    @close="clearDialog"
  >
    <template #title>
      <p class="title">{{isAeA?'车型变更':'车型项目变更'}}</p>
      <div class="control">
        <iButton @click="save">{{ language("QUEREN", "确认") }}</iButton>
        <!-- <iButton @click="reset">{{ language("CHONGZHI", "重置") }}</iButton> -->
      </div>
    </template>
    <div>
      <el-table ref="table" :data="tableData" class="padding-bottom20">
        <el-table-column
          label="PID"
          prop="PID"
          align="center"
          width="100"
        ></el-table-column>
        <el-table-column
          :label="isAeA?'现有车型':'现有车型项目'"
          prop="col1"
          align="center"
        ></el-table-column>
        <el-table-column label="PID" prop="col2" align="center">
          <template slot="header">
            {{isAeA?'变更车型':'变更车型项目'}} <span class="required">*</span>
          </template>
          <template slot-scope="scope">
            <iSelect
              v-model="scope.row.col2"
              clearable
              @visible-change="getOptions(scope.$index,scope.row)"
              :placeholder="language('QINGXUANZE', '请选择')"
            >
              <template v-for="item in scope.row.options || []">
                <el-option
                  :key="item.key || item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </template>
            </iSelect>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </iDialog>
</template>

<script>
import { iDialog, iSelect, iButton, iMessage } from "rise";
import tableList from "@/components/iTableSort";
export default {
  props: {
    dialogVisible: { type: Boolean, default: false },
    isAeA: { type: Boolean, default: false },
  },
  components: {
    iDialog,
    iButton,
    iSelect,
    tableList,
  },
  data() {
    return {
      tableData: [],
    };
  },
  created() {
    this.getList();
  },
  methods: {
    clearDialog() {
      this.$emit("changeVisible", "changeModelProjectVisible", false);
    },
    save() {
      let arr = this.tableData.filter((item) => !item.col2.trim());
      if (arr.length) return iMessage.error("请维护必填项");
    },
    // reset() {
    //   this.getList();
    //   this.tableData.forEach((item) => {
    //     item.col2 = item.col1;
    //   });
    // },
    getList() {
      this.tableData = [
        {
          PID: "PID-TEST",
          col1: "123",
        },
      ];
    },
    getOptions(index,row){
      row.options = [
            {
              key: "1",
              value: "test",
              label: "test",
            },
            {
              key: "12",
              value: "123",
              label: "123test",
            },
          ],
      this.tableData.splice(index,1,row)
    }
  },
};
</script>

<style lang="scss" scoped>
::v-deep .el-dialog__header {
  position: relative;
  .title{
    font-size: 18px;
    font-weight: bold;
    line-height: 25px;
  }
}
.control {
  position: absolute;
  top: 50%;
  right: 94px;
  transform: translate(0, -50%);
}
.required {
  font-size: 14px;
  color: red;
}
</style>