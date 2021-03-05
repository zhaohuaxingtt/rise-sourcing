<!--
 * @Author: moxuan
 * @Date: 2021-03-05 17:24:15
 * @LastEditTime: 2021-03-05 17:24:15
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
-->
<template>
  <iDialog :title="title" :visible.sync="value" width="90%" @close='clearDiolog'>
    <div class="changeContent">
      <div class="clearFloat">
        <div class="floatright title-button-box">
          <template v-if="identityStatus === 1">
            <iButton @click="edit">保存</iButton>
            <iButton>发送询价</iButton>
          </template>
          <template v-else>
            <iButton @click="edit">保存</iButton>
            <iButton>保存并创建</iButton>
          </template>
        </div>
      </div>
      <iFormGroup inline icon>
        <iFormItem label="轮次类型" name="test">
          <i-select></i-select>
        </iFormItem>
        <iFormItem label="本轮报价起止时间" name="test" v-if="identityStatus === 1">
          <div class="flex">
            <i-select></i-select>
            <div class="margin-left20 margin-right20">-</div>
            <i-select></i-select>
          </div>
        </iFormItem>
      </iFormGroup>
      <tablelist
          :tableData="tableListData"
          :tableTitle="tableTitleComputed"
          :tableLoading="tableLoading"
          :index="true"
          @handleSelectionChange="handleSelectionChange"
          :hide-open-page="true"
      ></tablelist>
      <!------------------------------------------------------------------------>
      <!--                  表格分页                                          --->
      <!------------------------------------------------------------------------>
      <iPagination
          @size-change="handleSizeChange($event, getTableList)"
          @current-change="handleCurrentChange($event, getTableList)"
          background
          :page-sizes="page.pageSizes"
          :page-size="page.page"
          :layout="page.layout"
          :current-page='page.size'
          :total="page.total"
      />
    </div>
  </iDialog>
</template>
<script>
import {iButton, iMessage, iDialog, iFormGroup, iFormItem, iSelect, iPagination} from '@/components'
import tablelist from './components/tablelist1'
import {pageMixins} from "@/utils/pageMixins";
import {tableTitle, tableTitle2} from "./components/data";
import {getNewRfqRoundList} from "@/api/partsrfq/editordetail";

export default {
  components: {iButton, iDialog, iFormGroup, iFormItem, iSelect, tablelist, iPagination},
  mixins: [pageMixins],
  props: {
    title: {type: String, default: '新建RFQ轮次'},
    value: {type: Boolean},
    repeatClick: Boolean
  },
  data() {
    return {
      editStatus: false,
      tableListData: [],
      tableLoading: false,
      selectTableData: [],
      identityStatus: 2
    }
  },
  created() {
    this.getTableList();
  },
  computed: {
    tableTitleComputed() {
      return this.identityStatus === 1 ? tableTitle : tableTitle2
    }
  },
  methods: {
    //获取表格数据
    getTableList() {
      this.tableLoading = true;
      getNewRfqRoundList().then((res) => {
        this.tableListData = res.data;
        this.tableLoading = false;
      });
    },
    sureChangeItems() {
      if (this.selectTableData.length == '') return iMessage.warn('抱歉！您当前还未选择！')
      this.$emit('sure', JSON.parse(this.selectTableData))
    },
    edit() {
      this.editStatus = !this.editStatus
    },
    clearDiolog() {
      this.$emit('input', false)
    },
    handleSelectionChange(val) {
      this.selectTableData = val;
    },
  }
}
</script>
<style lang='scss' scoped>
.changeContent {
  padding: 0 10px 20px 10px;

  .form-title {
    height: 25px;
    font-size: 18px;
    font-weight: 600;
    line-height: 25px;
    color: #000000;
    margin-bottom: 17px;
  }

  .title-button-box {
    margin-top: -60px;
    margin-right: 30px;
  }
}
</style>

