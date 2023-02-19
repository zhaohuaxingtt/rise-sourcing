<!--
 * @Author: 余继鹏 917955345@qq.com
 * @Date: 2023-02-14 11:34:22
 * @LastEditors: 余继鹏 917955345@qq.com
 * @LastEditTime: 2023-02-19 15:37:42
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
      <div class="font18 font-weight">Strategy</div>
    </div>
    <i-input v-model="value" type="textarea" :autosize="{ minRows: 2, maxRows: 14}"></i-input>
    <div slot="footer" class="footer">
      <iButton @click="cancel">取消</iButton>
      <iButton @click="save">保存</iButton>
    </div>
  </iDialog>
</template>

<script>
import { iInput, iDialog, iMessage, iButton } from "rise";
import { findNomiProject } from "@/api/partsrfq/editordetail/abprice";
export default {
  components: { iInput, iDialog, iButton },
  props: {
    ...iDialog.props,
    visible: {
      type: Boolean,
      default: false,
    },
    strategy: {
      type: String,
    },
  },
  data() {
    return {
      value:'',
    };
  },
  created(){
    this.value = _.clone(this.strategy)
  },
  methods: {
    save() {
      this.$emit('updateData')
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