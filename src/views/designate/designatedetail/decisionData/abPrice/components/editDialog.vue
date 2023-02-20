<!--
 * @Author: 余继鹏 917955345@qq.com
 * @Date: 2023-02-14 11:34:22
 * @LastEditors: 余继鹏 917955345@qq.com
 * @LastEditTime: 2023-02-19 17:50:11
 * @FilePath: \front-web\src\views\designate\designatedetail\previewCSC\abPrice\components\editDialog.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <iDialog
    class="dialog"
    v-bind="$props"
    :visible.sync="visible"
    v-on="$listeners"
  >
    <div class="dialog-Header" slot="title">
      <div class="font18 font-weight">VSI</div>
    </div>
    <div class="body">
      <tableList
        :selection="false"
        class="table header"
        height="400"
        border
        :tableData="tableData"
        :tableTitle="tableTitle"
        :tableLoading="tableLoading"
      >
        <template #vsi="scope">
          <i-input v-model="scope.row.vsi" @input="handleInput($event, scope.row)"></i-input>
        </template>
      </tableList>
    </div>
    <div slot="footer" class="footer">
      <iButton @click="cancel">取消</iButton>
      <iButton @click="save">保存</iButton>
    </div>
  </iDialog>
</template>

<script>
import { iInput, iDialog, iMessage, iButton } from "rise";
import { tableTitle } from "./data";
import { numberProcessor } from "@/utils";
import tableList from "@/views/designate/supplier/components/tableList";
import { findNomiProject, updateNomiProject } from "@/api/partsrfq/editordetail/abprice";

export default {
  components: { tableList, iInput, iDialog, iButton },
  props: {
    ...iDialog.props,
    visible: {
      type: Boolean,
      default: false,
    },
    carTypeList: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      tableTitle,
      tableData: [],
      tableLoading: false,
    };
  },
  created() {
    this.findVsi();
  },
  methods: {
    findVsi() {
      let params = this.carTypeList.map(item=>{
        return {
          nominateId: this.$route.query.desinateId,
          carProjectCode: item.carTypeProjectNum,
          carProjectId: item.carTypeProjectId,
        };
      })
      findNomiProject(params).then((res) => {
        this.tableData = res.data;
      });
    },
    cancel(){
      this.$emit('update:visible',false)
    },
    save() {
      this.tableLoading = true;
        updateNomiProject(this.tableData)
          .then((res) => {
            if (res?.code == "200") {
              console.log(res);
              this.$emit('getData')
              this.$emit('update:visible',false)
            } else {
              iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn);
            }
            this.tableLoading = false;
          })
          .catch((e) => {
            this.tableLoading = false;
            iMessage.error(this.$i18n.locale === "zh" ? e.desZh : event.desEn);
          });
    },
    
    // 限制输入数值
    handleInput(value, row) {
      this.$set(row, "vsi", numberProcessor(value, 2));
    },
  },
};
</script>

<style lang="scss" scoped>
.header {
  ::v-deep td {
    padding-top: 4px;
    padding-bottom: 4px;
    .cell {
      padding: 0 4px;
    }
  }
}
.table {
  ::v-deep .el-table__header {
    tr {
      background-color: #364d6e;
    }
    tr:nth-child(even) {
      background-color: #364d6e;
    }
  }
}
</style>