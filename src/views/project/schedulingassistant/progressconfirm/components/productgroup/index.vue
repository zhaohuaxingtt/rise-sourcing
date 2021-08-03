<!--
 * @Author: Luoshuang
 * @Date: 2021-08-02 10:54:35
 * @LastEditors: Luoshuang
 * @LastEditTime: 2021-08-03 11:20:08
 * @Description: 产品组
 * @FilePath: \front-web\src\views\project\schedulingassistant\progressconfirm\components\productgroup\index.vue
-->

<template>
  <div class="productGroup">
    <iSearch :icon="true" class="margin-top30">
      <template slot="button">
        <iButton @click="handleSure">{{language('QUEREN', '确认')}}</iButton>
        <iButton @click="handleReset">{{language('LK_CHONGZHI', '重置')}}</iButton>
      </template>
      <el-form>
        <el-form-item v-for="item in searchList" :key="item.value" :label="language(item.key,item.name)">
          <iSelect v-if="item.type ==='select'" :filterable="item.filterable" v-model="searchParams[item.value]" :placeholder="language('QINGXUANZE', '请选择')">
            <el-option
              v-for="item in selectOptions[item.selectOption]"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </iSelect>
          <iInput v-else-if="item.type === 'input'" v-model="searchParams[item.value]" :placeholder="language('QINGSHURU', '请输入')" />
        </el-form-item>
      </el-form>
    </iSearch>
    <iCard class="margin-top20">
      <div class="margin-bottom20 clearFloat">
        <span class="font18 font-weight">{{language('CHANPINZUJINDUQUERENHUIZONG', '产品组进度确认汇总')}}</span>
        <div class="floatright">
          <!--------------------发送按钮----------------------------------->
          <iButton v-if="!isFS" @click="handleSend" >{{language('FASONG','发送')}}</iButton>
          <template v-else>
            <!--------------------退回按钮----------------------------------->
            <iButton @click="openBack" >{{language('TUIHUI','退回')}}</iButton>
            <!--------------------转派按钮----------------------------------->
            <iButton @click="$emit('handleSend')" >{{language('ZHUANPAI','转派')}}</iButton>
            <!--------------------保存按钮----------------------------------->
            <iButton @click="$emit('handleSend')" >{{language('BAOCUN','保存')}}</iButton>
            <!--------------------确认并发送按钮----------------------------------->
            <iButton @click="$emit('handleSend')" >{{language('QUERENBINGFASONG','确认并发送')}}</iButton>
          </template>
        </div>
      </div>
      <tableList indexKey :tableTitle="tableTitle" :tableData="tableData" :tableLoading="tableLoading" @handleSelectionChange="handleSelectionChange">
        <template #scheBfToFirstTryoutWeek="scope">
          <iInput v-model="scope.row.scheBfToFirstTryoutWeek" onkeyup="value=value.replace(/[^\d]/g,'')" />
        </template>
        <template #scheFirstTryEmWeek="scope" >
          <iInput v-model="scope.row.scheFirstTryEmWeek" onkeyup="value=value.replace(/[^\d]/g,'')" />
        </template>
        <template #scheFirstTryOtsWeek="scope" >
          <iInput v-model="scope.row.scheFirstTryOtsWeek" onkeyup="value=value.replace(/[^\d]/g,'')" />
        </template>
      </tableList> 
      <iPagination v-update @size-change="handleSizeChange($event, getTableList)" @current-change="handleCurrentChange($event, getTableList)" background :page-sizes="page.pageSizes"
        :page-size="page.pageSize"
        :layout="page.layout"
        :current-page="page.currPage"
        :total="page.totalCount"
      />
    </iCard>
    <backDialog :dialogVisible="backDialogVisible" @changeVisible="changeBackVisible" />
  </div>
</template>

<script>
import { iSearch, iSelect, iInput, iButton, iCard, iPagination } from 'rise'
import { pageMixins } from "@/utils/pageMixins"
import { searchList, tableTitle } from './data'
import tableList from '@/views/project/schedulingassistant/progroup/components/tableList'
import backDialog from '../back'
export default {
  mixins: [pageMixins],
  components: { iSearch, iSelect, iInput, iButton, iCard, tableList, iPagination, backDialog },
  data() {
    return {
      searchList,
      searchParams: {},
      selectOptions: {},
      tableTitle,
      tableData: [{}],
      tableLoading: false,
      backDialogVisible: false,
      selectRows: []
    }
  },
  computed: {
    isFS() {
      return this.$route.path.includes('proconfirm')
    }
  },
  methods: {
    handleSelectionChange(val) {
      this.selectRows = val
    },
    openBack() {
      this.changeBackVisible(true)
    },
    changeBackVisible(visible) {
      this.backDialogVisible = visible
    },
    getTableList() {}
  }
}
</script>

<style lang="scss" scoped>

</style>