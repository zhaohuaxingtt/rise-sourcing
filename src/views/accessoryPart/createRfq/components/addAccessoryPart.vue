<!--
 * @Author: Luoshuang
 * @Date: 2021-05-26 14:48:50
 * @LastEditors: Luoshuang
 * @LastEditTime: 2021-05-26 15:56:05
 * @Description: 添加配件弹窗
 * @FilePath: \front-web\src\views\accessoryPart\createRfq\components\addAccessoryPart.vue
-->

<template>
  <iDialog 
    title="添加配件"
    :visible.sync="dialogVisible"
    @close="clearDialog"
    width="90%"
    class="addPartsDialog"
  >
    <iSearch @sure="sure" @reset="reset">
      <el-form>
        <el-form-item v-for="(item, index) in searchList" :key="index" :label="item.label">
          <iSelect v-if="item.type === 'select'" v-model="searchParams[item.value]"></iSelect> 
          <iInput v-else v-model="searchParams[item.value]"></iInput> 
        </el-form-item>
      </el-form>
    </iSearch>
    <div class="margin-bottom20 clearFloat margin-top20">
      <div class="floatright">
        <!--------------------分配询价科室按钮----------------------------------->
        <iButton @click="changeInquiryDialogVisible(true)" >选择</iButton>
      </div>
    </div>
    <tableList :activeItems='"a1"' selection indexKey :tableData="tableData" :tableTitle="tableTitle" :tableLoading="tableLoading" @handleSelectionChange="handleSelectionChange" @openPage="openPage"></tableList>
    <!------------------------------------------------------------------------>
    <!--                  表格分页                                          --->
    <!------------------------------------------------------------------------>
    <iPagination v-update @size-change="handleSizeChange($event, getTableList)" @current-change="handleCurrentChange($event, getTableList)" background :page-sizes="page.pageSizes"
      :page-size="page.pageSize"
      :layout="page.layout"
      :current-page="page.currPage"
      :total="page.totalCount"
      class="padding-bottom20"
    />
  </iDialog>
</template>

<script>
import { iDialog, iButton, iSelect, iInput, iSearch, iPagination } from 'rise'
import tableList from '@/views/designate/designatedetail/components/tableList'
import { pageMixins } from "@/utils/pageMixins"
import { tableTitle, tableMockData, searchList } from '../../integratedManage/data'
export default {
  mixins: [pageMixins],
  components: { iDialog, iButton, iSelect, iInput, tableList, iSearch, iPagination },
  props: {
    dialogVisible: { type: Boolean, default: false }
  },
  data() {
    return {
      backType: '',
      backReason: '',
      tableData: tableMockData,
      tableTitle: tableTitle,
      searchList,
      searchParams: {}
    }
  },
  methods: {
    clearDialog() {
      this.$emit('changeVisible', false)
    },
    /**
     * @Description: 点击SP号跳转事件
     * @Author: Luoshuang
     * @param {*}
     * @return {*}
     */    
    openPage() {
      const router =  this.$router.resolve({path: '/sourcing/accessorypartdetail', query: {  }})
      window.open(router.href,'_blank')
    },
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