<!--
 * @Author: 余继鹏 917955345@qq.com
 * @Date: 2023-02-14 11:34:22
 * @LastEditors: 余继鹏 917955345@qq.com
 * @LastEditTime: 2023-02-14 17:46:06
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
    <div class="body" v-loading="tableLoading">
      <tableList
        :selection="false"
        class="table header"
        height='400'
        border
        :tableData="tableData"
        :tableTitle="tableTitle"
        :tableLoading="loading"
      >
        <template #aPrice="scope">
          <i-input v-model="scope.row.aPrice"></i-input>
        </template>
        <template #bPrice="scope">
          <i-input v-model="scope.row.bPrice"></i-input>
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
import tableList from "@/views/designate/supplier/components/tableList";

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
      loading: false,
      tableTitle,
      tableData:[],
      tableLoading: false,
    };
  },
  created(){
    this.tableData = _.clone(this.carTypeList)
  },
  methods: {
    save() {
      console.log(this.tableData);
    //   updateDaringSort(params)
    //     .then((res) => {
    //       if (res?.code == "200") {
    //         console.log(res);
    //       } else {
    //         iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn);
    //       }
    //       this.tableLoading = false;
    //     })
    //     .catch((e) => {
    //       this.tableLoading = false;
    //       iMessage.error(this.$i18n.locale === "zh" ? e.desZh : event.desEn);
    //     });
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