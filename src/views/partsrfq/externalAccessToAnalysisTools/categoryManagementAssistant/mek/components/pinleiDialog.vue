<!--
 * @Author: your name
 * @Date: 2021-08-08 14:31:25
 * @LastEditTime: 2021-08-08 15:15:53
 * @LastEditors: Please set LastEditors
 * @Description: 品类管理
 * @FilePath: \front-web\src\views\partsrfq\externalAccessToAnalysisTools\categoryManagementAssistant\mek\components\pinleiDialog.vue
-->
<template>
  <iDialog
    class="dialog"
    v-bind="$props"
    :visible.sync="dialogVisible"
    v-on="$listeners"
    width="90%"
    top="5%"
  >
    <div class="dialog-Header" slot="title">
      <div class="font18 font-weight">
        {{ language("CHAKANLISHI", "查看历史") }}
      </div>
      <div class="queryForm">
        <el-form class="queryForm">
          <el-form-item label="材料组：">
            <el-select v-model="value" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="年份：">
            <el-select v-model="value" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div class="operation">
          <iButton>{{ $t("LK_QUEREN") }} </iButton>
          <iButton>{{ $t("LK_CHONGZHI") }} </iButton>
        </div>
      </div>
    </div>
    <div class="content">
      <div class="flex-between-center titleBox">
        <span class="title">搜索结果</span>
        <div class="operation">
          <iButton>{{ $t("LK_XIAZAI") }} </iButton>
        </div>
      </div>
      <div class="table">
        <el-table :data="tableData" style="width: 100%">
          <el-table-column type="selection" width="55"> </el-table-column>
          <el-table-column prop="index" label="#" width="55"> </el-table-column>
          <el-table-column prop="name" label="材料组名称"> </el-table-column>
          <el-table-column prop="data" label="年份"> </el-table-column>
          <el-table-column prop="reportName" label="报告名称">
          </el-table-column>
          <el-table-column prop="createData" label="创建日期">
          </el-table-column>
          <el-table-column prop="createName" label="创建人"> </el-table-column>
        </el-table>
      </div>
    </div>
  </iDialog>
</template>

<script>
import { iDialog, iButton, iCard } from "rise";
export default {
  data() {
    return {
      tableData: [
        {
          index: 1,
          name: 111,
          date: "2010-1-1",
          reportName: "哈哈哈哈",
          createData: "2020-1-1",
          createName: "张三",
        },
      ],
      options: [
        {
          value: "选项1",
          label: "黄金糕",
        },
        {
          value: "选项2",
          label: "双皮奶",
        },
        {
          value: "选项3",
          label: "蚵仔煎",
        },
        {
          value: "选项4",
          label: "龙须面",
        },
        {
          value: "选项5",
          label: "北京烤鸭",
        },
      ],
    };
  },
  components: {
    iDialog,
    iButton,
  },
  props: {
    dialogVisible: {
      type: Boolean,
      default: false,
      value: "",
    },
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.queryForm {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.operation {
  display: flex;
  align-items: center;
}
.dialog-Header {
  border-bottom: 1px solid #ccc;
}
.title {
  font-size: 16px;
  font-family: Arial;
  font-weight: bold;
  line-height: 18px;
  color: #000000;
  opacity: 1;
}
.table{
    margin-top: 20px;
}
</style>
