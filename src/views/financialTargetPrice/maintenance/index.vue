<!--
 * @Author: Luoshuang
 * @Date: 2021-06-22 09:12:31
 * @LastEditors: Luoshuang
 * @LastEditTime: 2021-06-24 16:56:22
 * @Description: 财务目标价-目标价维护
 * @FilePath: \front-web\src\views\financialTargetPrice\maintenance\index.vue
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
              :key="item.code"
              :label="item.name"
              :value="item.code">
            </el-option>
          </iSelect> 
          <iDatePicker v-else-if="item.type === 'dateRange'" value-format="" type="daterange" v-model="searchParams[item.value]"></iDatePicker>
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
          <!--------------------保存按钮----------------------------------->
          <iButton v-if="!isEdit" @click="changeEdit(true)">编辑</iButton>
          <!--------------------保存按钮----------------------------------->
          <iButton v-if="isEdit" @click="handleSave" :loading="signLoading">保存</iButton>
          <!--------------------取消按钮----------------------------------->
          <iButton v-if="isEdit" @click="handleCancel" >取消</iButton>
          <!--------------------导出批量维护按钮----------------------------------->
          <iButton @click="handleExport" >导出批量维护</iButton>
          <!--------------------导入批量维护按钮----------------------------------->
          <el-upload
            class=" margin-left10 margin-right10"
            :action="uploadUrl + '/cf-target-price-applies/export/import'"
            accept='.xlsx'
            style="display:inline-block;"
            :show-file-list='false'
            :on-progress='()=>{uploadLoading=true}'
            :on-error='()=>{uploadLoading=false;iMessage.error("上传失败！")}'
            :on-success='fileSuccess'
          >
            <iButton :loading='uploadLoading'>导入批量维护</iButton>
          </el-upload>
        </div>
      </div>
      <tableList 
        :activeItems='"partNum"' 
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
        @openEditdetail="openEditdetail"
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
    <!--                  附件弹窗                                      --->
    <!------------------------------------------------------------------------>
    <attachmentDialog :dialogVisible="attachmentDialogVisible" @changeVisible="changeAttachmentDialogVisible" />
    <!------------------------------------------------------------------------>
    <!--                  审批记录弹窗                                      --->
    <!------------------------------------------------------------------------>
    <approvalRecordDialog :dialogVisible="approvalDialogVisible" @changeVisible="changeApprovalDialogVisible" />
  </iPage>
</template>

<script>
import { iPage, iCard, iPagination, iButton, iSelect, iDatePicker, iInput, iSearch } from 'rise'
import headerNav from '../components/headerNav'
import { tableTitle, searchList } from './data'
import { pageMixins } from "@/utils/pageMixins"
import tableList from '../components/tableList'
import modificationRecordDialog from './components/modificationRecord'
import attachmentDialog from '@/views/costanalysismanage/components/home/components/downloadFiles/index'
import approvalRecordDialog from './components/approvalRecord'
import { dictkey } from "@/api/partsprocure/editordetail"
import { getTargetPriceList } from "@/api/financialTargetPrice/index"
export default {
  mixins: [pageMixins],
  components: {iPage,headerNav,iCard,tableList,iPagination,iButton,iSelect,iDatePicker,iInput,iSearch,modificationRecordDialog,attachmentDialog,approvalRecordDialog},
  data() {
    return {
      tableTitle: tableTitle,
      tableData: [{partNum:'2342342',purchasePrjectId:'119'}],
      searchList: searchList,
      searchParams: {},
      isEdit: false,
      tableLoading: false,
      selectOptions: {},
      attachmentDialogVisible: false,
      updateDialogVisible: false,
      approvalDialogVisible: false,
      uploadUrl: process.env.VUE_APP_SOURCING_MH,
    }
  },
  created() {
    this.getProcureGroup()
    this.getTableList()
  },
  methods: {
    fileSuccess(res){
      if(res.code == 200){
        // this.vm.init()
        this.uploadLoading=false;
        iMessage.success("上传成功！")
        this.getTableList()
      }else{
        this.uploadLoading = false;
        iMessage.error(res.desZh)
      }
    },
    /**
     * @Description: 获取下拉框
     * @Author: Luoshuang
     * @param {*}
     * @return {*}
     */    
    getProcureGroup() {
      dictkey().then((res) => {
        if (res.data) {
          this.selectOptions = res.data;
        }
      });
    },
    /**
     * @Description: 点击操作列
     * @Author: Luoshuang
     * @param {*} row
     * @return {*}
     */    
    openEditdetail(row) {
      const router =  this.$router.resolve({path: '/financialtargetprice/detail', query: { item: JSON.stringify(row) }})
      window.open(router.href,'_blank')
    },
    openPage(row) {
      const router =  this.$router.resolve({path: '/sourcing/partsprocure/editordetail', query: { item: JSON.stringify(row) }})
      window.open(router.href,'_blank')
    },
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
     * @Description: 附件查看
     * @Author: Luoshuang
     * @param {*} row
     * @return {*}
     */    
    openAttachmentDialog(row){
      this.changeAttachmentDialogVisible(true)
    },
    /**
     * @Description: 修改附件弹窗状态
     * @Author: Luoshuang
     * @param {*} visible
     * @return {*}
     */    
    changeAttachmentDialogVisible(visible) {
      this.attachmentDialogVisible = visible
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
        current: this.page.currPage,
        size: this.page.pageSize
      }
      getTargetPriceList(params).then(res => {
        if (res?.result) {
          
        } else {
          
        }
      })
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