<!--
 * @Author: your name
 * @Date: 2021-08-08 15:16:42
 * @LastEditTime: 2021-08-08 15:45:47
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\views\partsrfq\externalAccessToAnalysisTools\categoryManagementAssistant\mek\components\report.vue
-->
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
        {{ language("BAOGAOQINGDAN", "报告清单") }}
      </div>
      <div class="operation">
        <iButton>{{ $t("全选") }} </iButton>
        <iButton>{{ $t("LK_DAOCHU") }} </iButton>
      </div>
    </div>
    <div class="content">
      <div class="table" v-for="(value, key, index) in tableList" :key="index">
        <el-table :data="value">
          <el-table-column type="selection" width="55"> </el-table-column>
          <el-table-column prop="index" label="#" width="55"> </el-table-column>
          <el-table-column prop="name" :label="key"> </el-table-column>
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
      tableList: {
        内部需求分析: [
          {
            index: 1,
            name: "内部需求分析",
          },
        ],
        外部供应分析: [
          {
            index: 1,
            name: "内部需求分析",
          },
        ],
        材料组定位: [
          {
            index: 1,
            name: "内部需求分析",
          },
        ],
        举措清单: [
          {
            index: 1,
            name: "内部需求分析",
          },
        ],
      },
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
.operation {
  display: flex;
  align-items: center;
  margin-right: 40px;
}
.dialog-Header {
  display: flex;
  justify-content: space-between;
}
.content{
    display: flex;
}
.title {
  font-size: 16px;
  font-family: Arial;
  font-weight: bold;
  line-height: 18px;
  color: #000000;
  opacity: 1;
}
.table {
  flex: 1;
  margin-top: 20px;
  margin-right: 40px;
  &:last-child{
      margin-right: 0;
  }
}
</style>
