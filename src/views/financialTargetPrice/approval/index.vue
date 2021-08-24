<!--
 * @Author: Luoshuang
 * @Date: 2021-06-22 09:12:02
 * @LastEditors: Luoshuang
 * @LastEditTime: 2021-08-24 14:07:53
 * @Description: 财务目标价-目标价审批
 * @FilePath: \front-web\src\views\financialTargetPrice\approval\index.vue
-->

<template>
  <iPage>
    <headerNav />
    <!----------------------------------------------------------------->
    <!---------------------------搜索区域------------------------------->
    <!----------------------------------------------------------------->
    <iSearch @sure="sure" @reset="reset">
      <el-form>
        <el-form-item v-for="(item, index) in searchList" :key="index" :label="language(item.i18n_label,item.label)">
          <iSelect v-if="item.type === 'select'" v-model="searchParams[item.value]">
            <el-option value="" :label="language('all','全部')"></el-option>
            <el-option
              v-for="item in selectOptions[item.selectOption] || []"
              :key="item.code"
              :label="item.name"
              :value="item.selectOption === 'LINIE' ? item.name : item.code">
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
          <iButton @click="handleApprove" >{{language('PIZHUN','批准')}}</iButton>
          <!--------------------导出按钮----------------------------------->
          <iButton @click="handleExport" >{{language('DAOCHU','导出')}}</iButton>
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
        @openApprovalDetailDialog="openApprovalDetailDialog"
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
    <!--                      审批弹窗                                      --->
    <!------------------------------------------------------------------------>
    <approvalDialog :dialogVisible="approvalDialogVisible" @changeVisible="changeApprovalDialogVisible" :applyId="applyId" />
  </iPage>
</template>

<script>
import { iPage, iCard, iPagination, iButton, iSelect, iDatePicker, iInput, iSearch, iMessage } from 'rise'
import headerNav from '../components/headerNav'
import { tableTitle, searchList } from './data'
import { pageMixins } from "@/utils/pageMixins"
import tableList from '../components/tableList'
import approvalDialog from './components/approval'
import { dictkey } from "@/api/partsprocure/editordetail"
import { getApprovalTargetPriceList, targetPriceApprove, getCFList } from '@/api/financialTargetPrice/index'  
import { excelExport } from "@/utils/filedowLoad"
import { getDictByCode } from '@/api/dictionary'
export default {
  mixins: [pageMixins],
  components: {iPage,headerNav,iCard,tableList,iPagination,iButton,iSelect,iDatePicker,iInput,iSearch,approvalDialog},
  data() {
    return {
      tableTitle: tableTitle,
      tableData: [],
      searchList: searchList,
      searchParams: {
        cfId: '',
        linieName: '',
        buyerId: '',
        applyType: ''
      },
      isEdit: false,
      tableLoading: false,
      selectOptions: {},
      approvalDialogVisible: false,
      selectedItems: [],
      applyId: ''
    }
  },
  created() {
    this.getDicts()
    this.getProcureGroup()
    this.getCF()
    this.getTableList()
  },
  methods: {
    reset() {
      this.searchParams = {
        cfId: '',
        linieName: '',
        buyerId: '',
        applyType: ''
      }
    },
    getDict(type) {
      getDictByCode(type).then(res => {
        if (res?.result) {
          this.selectOptions = {
            ...this.selectOptions,
            [type]: res.data[0]?.subDictResultVo || []
          }
        }
      })
    },
    getDicts() {
      // 申请类型
      this.getDict('CF_APPLY_TYPE')
    },
    getCF() {
      getCFList().then(res => {
        if (res?.result) {
          this.selectOptions = {
            ...this.selectOptions,
            CF_USER: res.data.map(item => {
              return {
                code: item.id,
                name: item.nameZh
              }
            })
          }
        }
      })
    },
    sure() {
      this.page = {
        ...this.page,
        currPage: 1
      }
      this.getTableList()
    },
    handleSelectionChange(val) {
      this.selectedItems = val
    },
    handleApprove() {
      if (this.selectedItems.length < 1) {
        iMessage.warn(this.language('ZHISHAOXUANZEYITIAOJILU','至少选择一条记录'))
        return
      }
      this.tableLoading = true
      targetPriceApprove({idList:this.selectedItems.map(item => item.applyId)}).then(res => {
        if (res?.result) {
          iMessage.success(this.$i18n.locale === 'zh' ? res?.desZh : res?.desEn)
          this.getTableList()
        } else {
          iMessage.error(this.$i18n.locale === 'zh' ? res?.desZh : res?.desEn)
        }
      }).finally(() => {
        this.tableLoading = false
      })
    },
    getTableList() {
      this.tableLoading = true
      const params = {
        ...this.searchParams,
        current: this.page.currPage,
        size: this.page.pageSize
      }
      getApprovalTargetPriceList(params).then(res => {
        if (res?.result) {
          this.page = {
            ...this.page,
            totalCount: Number(res.total),
            currPage: Number(res.pageNum),
            pageSize: Number(res.pageSize)
          }
          this.tableData = res.data
        } else {
          this.tableData = []
          iMessage.error(this.$i18n.locale === 'zh' ? res?.desZh : res?.desEn)
        }
      }).finally(() => {
        this.tableLoading = false
      })
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
          this.selectOptions = {
            ...this.selectOptions,
            ...res.data
          }
        }
      });
    },
    openPage(row) {
      const router =  this.$router.resolve({path: '/sourcing/partsprocure/editordetail', query: { item: JSON.stringify({...row,id:row.purchasingProjectId}) }})
      window.open(router.href,'_blank')
    },
    openApprovalDetailDialog(row){
      this.applyId = row.applyId
      this.changeApprovalDialogVisible(true)
    },
    changeApprovalDialogVisible(visible) {
      this.approvalDialogVisible = visible
      if (!visible) {
        this.getTableList()
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
    handleExport() {
      excelExport(this.tableData, this.tableTitle)
    },
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