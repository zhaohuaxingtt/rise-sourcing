<!--
 * @Author: Luoshuang
 * @Date: 2021-05-27 21:20:49
 * @LastEditors: Luoshuang
 * @LastEditTime: 2021-05-28 10:39:59
 * @Description: 
 * @FilePath: \front-web\src\views\partsprocure\editordetail\components\designateInfo\components\sel.vue
-->

<template>
  <iDialog 
    :visible.sync="dialogVisible"
    @close="clearDialog"
    width="90%"
    class="addPartsDialog"
  >
    <template slot="title">
      <div class="clearFloat">
        <span class="font18 font-weight">SEL分摊单</span>
          <div class="floatright">
            <!--------------------下载按钮----------------------------------->
            <iButton @click="handleDownload" class="margin-right20" >下载</iButton>
          </div>
      </div>
    </template>
    <tableList selection indexKey :tableTitle="tableTitle" :tableData="tableData" class="doubleHeader"></tableList>
    <iPagination v-update 
      @size-change="handleSizeChange($event, getRfqTableList)" 
      @current-change="handleCurrentChange($event, getRfqTableList)" 
      background 
      :page-sizes="page.pageSizes"
      :page-size="page.pageSize"
      :layout="page.layout"
      :current-page="page.currPage"
      :total="page.totalCount"
      class="padding-bottom20"
    />
  </iDialog>
</template>

<script>
import { iDialog, iButton, iInput, iPagination } from 'rise'
import tableList from '@/views/designate/designatedetail/components/tableList'
import { fileTableTitle } from '../data'
import { pageMixins } from "@/utils/pageMixins"
export default {
  mixins: [pageMixins],
  components: { iDialog, iButton, iInput, iPagination, tableList },
  props: {
    dialogVisible: { type: Boolean, default: false }
  },
  data() {
    return {
      tableTitle: fileTableTitle,
      tableData: []
    }
  },
  methods: {
    clearDialog() {
      this.$emit('changeVisible', false)
    }
  }
}
</script>

<style lang="scss" scoped>
.addPartsDialog {
  .card {
    box-shadow: none;
    border-radius: 0;
    border-bottom: 1px solid rgba(112, 112, 112, .1);
    ::v-deep .cardBody {
      padding-top: 0;
      padding-left: 0;
      padding-right: 0;
    }
  }
  ::v-deep .el-dialog {
    margin-top: 30px !important;
    height: 90%;
    .el-dialog__body {
      height: calc(100% - 70px);
      overflow: auto;
    }
  }
}
</style>