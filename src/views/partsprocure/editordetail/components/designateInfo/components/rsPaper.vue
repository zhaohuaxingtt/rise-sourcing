<!--
 * @Author: Luoshuang
 * @Date: 2021-05-27 21:20:41
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-05-31 15:10:55
 * @Description: 
 * @FilePath: \front-web\src\views\partsprocure\editordetail\components\designateInfo\components\rsPaper.vue
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
        <span class="font18 font-weight">纸质RS单</span>
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
import { iDialog, iButton, iPagination } from 'rise'
import tableList from '@/views/designate/designatedetail/components/tableList'
import { fileTableTitle } from '../data'
import { pageMixins } from "@/utils/pageMixins"
export default {
  mixins: [pageMixins],
  components: { iDialog, iButton, iPagination, tableList },
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