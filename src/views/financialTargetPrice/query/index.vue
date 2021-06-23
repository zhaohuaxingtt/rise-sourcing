<!--
 * @Author: Luoshuang
 * @Date: 2021-06-22 11:14:02
 * @LastEditors: Luoshuang
 * @LastEditTime: 2021-06-23 18:00:48
 * @Description: 财务目标价-目标价查询
 * @FilePath: \front-web\src\views\financialTargetPrice\query\index.vue
-->

<template>
  <iPage>
    <headerNav />
    <!----------------------------------------------------------------->
    <!---------------------------搜索区域------------------------------->
    <!----------------------------------------------------------------->
    <iSearch @sure="getTableList" @reset="reset">
      <el-form>
        <el-form-item v-for="(item, index) in searchList" :key="index" :label="item.label">
          <iSelect v-if="item.type === 'select'" v-model="searchParams[item.value]">
            <el-option value="" :label="$t('all')"></el-option>
            <el-option
              v-for="item in selectOptions[item.selectOption] || []"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </iSelect> 
          <iDatePicker v-else-if="item.type === 'date'" value-format="" type="date" v-model="searchParams[item.value]"></iDatePicker>
          <iInput v-else v-model="searchParams[item.value]"></iInput> 
        </el-form-item>
      </el-form>
    </iSearch>
    <!----------------------------------------------------------------->
    <!---------------------------表格区域------------------------------->
    <!----------------------------------------------------------------->
    <iCard class="margin-top20">
      <div class="margin-bottom20 clearFloat">
        <span class="font18 font-weight"></span>
        <div class="floatright">
          <!--------------------指派按钮----------------------------------->
          <iButton @click="openAssignDialog" >指派</iButton>
          <!--------------------导出按钮----------------------------------->
          <iButton @click="handleUpload" >导出</iButton>
        </div>
      </div>
      <tableList 
        :isEdit="isEdit" 
        selection 
        indexKey 
        :tableData="tableData" 
        :tableTitle="tableTitle" 
        :tableLoading="tableLoading" 
        @handleSelectionChange="handleSelectionChange" 
        @openPage="openPage"
        @openModifyDialog="openUpdateDialog"
        @openAttachmentDialog="openAttachmentDialog"
        @openApprovalDialog="openApprovalDialog"
      >
      </tableList>
      <!------------------------------------------------------------------------>
      <!--                  表格分页                                          --->
      <!------------------------------------------------------------------------>
      <iPagination v-update @size-change="handleSizeChange($event, getTableList)" @current-change="handleCurrentChange($event, getTableList)" background :page-sizes="page.pageSizes"
        :page-size="page.pageSize"
        :layout="page.layout"
        :current-page="page.currPage"
        :total="page.totalCount"
      />
    </iCard>
    <!------------------------------------------------------------------------>
    <!--                  修改记录弹窗                                      --->
    <!------------------------------------------------------------------------>
    <modificationRecordDialog :dialogVisible="updateDialogVisible" @changeVisible="changeUpdateDialogVisible" />
    <!------------------------------------------------------------------------>
    <!--                  审批记录弹窗                                      --->
    <!------------------------------------------------------------------------>
    <approvalRecordDialog :dialogVisible="approvalDialogVisible" @changeVisible="changeApprovalDialogVisible" />
    <!------------------------------------------------------------------------>
    <!--                  指派弹窗                                      --->
    <!------------------------------------------------------------------------>
    <assignDialog :dialogVisible="assignDialogVisible" @changeVisible="changeAssignDialogVisible" />
  </iPage>
</template>

<script>
import { iPage, iCard, iPagination, iButton, iSelect, iDatePicker, iInput, iSearch } from 'rise'
import headerNav from '../components/headerNav'
import { tableTitle, searchList } from './data'
import { pageMixins } from "@/utils/pageMixins"
import tableList from '../components/tableList'
import modificationRecordDialog from '../maintenance/components/modificationRecord'
import approvalRecordDialog from '../maintenance/components/approvalRecord'
import assignDialog from './components/assign'
export default {
  mixins: [pageMixins],
  components: {iPage,headerNav,iCard,tableList,iPagination,iButton,iSelect,iDatePicker,iInput,iSearch,modificationRecordDialog,approvalRecordDialog, assignDialog},
  data() {
    return {
      tableTitle: tableTitle,
      tableData: [{partNum:'2342342'}],
      searchList: searchList,
      searchParams: {},
      isEdit: false,
      tableLoading: false,
      selectOptions: {},
      assignDialogVisible: false,
      updateDialogVisible: false,
      approvalDialogVisible: false
    }
  },
  methods: {
    /**
     * @Description: 审批记录查看
     * @Author: Luoshuang
     * @param {*} row
     * @return {*}
     */    
    openApprovalDialog(row){
      this.changeApprovalDialogVisible(true)
    },
    /**
     * @Description: 修改审批记录弹窗状态
     * @Author: Luoshuang
     * @param {*} visible
     * @return {*}
     */    
    changeApprovalDialogVisible(visible) {
      this.approvalDialogVisible = visible
    },
    /**
     * @Description: 修改记录查看
     * @Author: Luoshuang
     * @param {*} row
     * @return {*}
     */    
    openUpdateDialog(row){
      this.changeUpdateDialogVisible(true)
    },
    /**
     * @Description: 修改修改记录弹窗状态
     * @Author: Luoshuang
     * @param {*} visible
     * @return {*}
     */    
    changeUpdateDialogVisible(visible) {
      this.updateDialogVisible = visible
    },
    /**
     * @Description: 指派
     * @Author: Luoshuang
     * @param {*}
     * @return {*}
     */    
    openAssignDialog(){
      this.changeAssignDialogVisible(true)
    },
    /**
     * @Description: 修改指派弹窗状态
     * @Author: Luoshuang
     * @param {*} visible
     * @return {*}
     */    
    changeAssignDialogVisible(visible) {
      this.assignDialogVisible = visible
    },
    /**
     * @Description: 获取表格数据
     * @Author: Luoshuang
     * @param {*}
     * @return {*}
     */    
    getTableList() {
      const params = {
        ...this.searchParams,
      }
    },
    /**
     * @Description: 更改编辑状态
     * @Author: Luoshuang
     * @param {*} isEdit 是否为编辑状态
     * @return {*}
     */    
    changeEdit(isEdit) {
      this.isEdit = isEdit
    },
    handleExport() {},
    handleUpload() {},
    /**
     * @Description: 保存编辑后的内容
     * @Author: Luoshuang
     * @param {*}
     * @return {*}
     */    
    handleSave() {
      this.changeEdit(false)
    },
    /**
     * @Description: 取消编辑
     * @Author: Luoshuang
     * @param {*}
     * @return {*}
     */    
    handleCancel() {
      this.changeEdit(false)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>