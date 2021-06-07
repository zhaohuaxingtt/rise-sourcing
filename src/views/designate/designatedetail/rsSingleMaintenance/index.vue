<!--
 * @Author: Luoshuang
 * @Date: 2021-05-24 14:39:43
 * @LastEditors: Luoshuang
 * @LastEditTime: 2021-06-07 15:09:08
 * @Description: RS单维护界面
 * @FilePath: \front-web\src\views\designate\designatedetail\rsSingleMaintenance\index.vue
-->

<template>
  <iPage>
    <!------------------------------------------------------------------------>
    <!--                     界面标题模块                                   --->
    <!------------------------------------------------------------------------>
    <detailTop right lev='2' :pageMenu='detailPage' :query='$route.query'>
      <span slot="left" class="floatleft font20 font-weight">
        RS单维护
      </span>
    </detailTop>
    <!------------------------------------------------------------------------>
    <!--                  search 搜索模块                                   --->
    <!------------------------------------------------------------------------>
    <iSearch class="margin-bottom20 margin-top20" icon @reset="handleSearchReset" @sure="filterTableData">
      <el-form>
        <el-form-item :label="'零件采购项目编号'" >
          <iInput :placeholder="$t('LK_QINGSHURU')" v-model="form.fsnrGsnrNum"></iInput>
        </el-form-item>
        <el-form-item :label="'零件号'" >
          <iInput :placeholder="$t('LK_QINGSHURU')" v-model="form.partNo"></iInput>
        </el-form-item>
        <el-form-item :label="'零件名称'" >
          <iInput :placeholder="$t('LK_QINGSHURU')" v-model="form.partName"></iInput>
        </el-form-item>
        <el-form-item :label="'供应商编号'" >
          <iInput :placeholder="$t('LK_QINGSHURU')" v-model="form.supplierNo"></iInput>
        </el-form-item>
        <el-form-item :label="'供应商名称'" >
          <iInput :placeholder="$t('LK_QINGSHURU')" v-model="form.supplierName"></iInput>
        </el-form-item>
      </el-form>
    </iSearch>
    <iCard>
      <div class="margin-bottom20 clearFloat">
          <div class="floatright">
            <!--------------------返回按钮----------------------------------->
            <iButton @click="handleSave">保存</iButton>
            <!--------------------选择按钮----------------------------------->
            <iButton @click="downloadTemp">下载模板</iButton>
            <!--------------------返回按钮----------------------------------->
            <iButton @click="goBack">上传</iButton>
            <!--------------------选择按钮----------------------------------->
            <iButton @click="handleReadQuotation" :loading="readQuotationLoading">读取报价单</iButton>
            <!--------------------返回按钮----------------------------------->
            <iButton @click="changersEeditionDialogVisible(true)">RS单预览</iButton>
            
          </div>
      </div>
        <!------------------------------------------------------------------------>
        <!--                  表格模块                                          --->
        <!------------------------------------------------------------------------>
        <tableList :activeItems='"rfqId"' selection indexKey :tableData="tableListData" :tableTitle="tableTitle" :tableLoading="tableLoading" @handleSelectionChange="handleSelectionChange" @openPage="openPage" @updateSlot='toTop'></tableList>
    </iCard>
    <rsDialog :dialogVisible="rsEeditionDialogVisible" @changeVisible="changersEeditionDialogVisible" />
  </iPage>
</template>

<script>
import { iPage, iCard, iButton, iSearch, iInput, iMessage } from 'rise'
import tableList from '../components/tableList'
import { rsTableTitle, rsMockData } from './data'
import detailTop from '../components/topComponents'
import rsDialog from '@/views/partsprocure/editordetail/components/designateInfo/components/rsEEdition'
import { getList, readQuotation, downloadRSDoc } from '@/api/designate/decisiondata/rs'
import { cloneDeep } from 'lodash'
export default {
  components: { iPage, iCard, iButton, tableList, iSearch, iInput, detailTop, rsDialog },
  data() {
    return {
      tableListData: rsMockData,
      tableTitle: rsTableTitle,
      tableLoading: false,
      form: {
        fsnrGsnrNum: '',
        partNo: '',
        partName: '',
        supplierNo: '',
        supplierName: ''
      },
      rsEeditionDialogVisible: false,
      tableListDataTemp: [],
      selectedTableData: [],
      readQuotationLoading: false
    }
  },
  methods: {
    /**
     * @Description: 下载模板，可多选
     * @Author: Luoshuang
     * @param {*}
     * @return {*}
     */    
    async downloadTemp() {
      // if (this.tableListData.length < 1) {
      //   return
      // }
      const params = {recordIds:[1,2,3,4]}
      await downloadRSDoc(params)
    },
    /**
     * @Description: 读取报价单
     * @Author: Luoshuang
     * @param {*}
     * @return {*}
     */    
    handleReadQuotation() {
      this.readQuotationLoading = true
      const params = {
        nominateId: this.$route.query.desinateId,
        dtoList: this.selectedTableData.map(item => {
          return {
            nominateDetailId: item.nominateDetailId,
            rfqId: item.rfqId,
            fsnrGsnrNum: item.fsnrGsnrNum,
            supplierId: item.supplierId
          }
        })
      }
      readQuotation(params).then(res => {
        if(res?.result) {
          iMessage.success(this.$i18n.locale === 'zh' ? res.desZh : res.desEn)
          this.getTableList()
        } else {
          iMessage.error(this.$i18n.locale === 'zh' ? res.desZh : res.desEn)
        }
      }).finally(() => {
        this.readQuotationLoading = false
      })
    },
    /**
     * @Description: 保存修改的RS
     * @Author: Luoshuang
     * @param {*}
     * @return {*}
     */    
    handleSave() {

    },
    /**
     * @Description: 重置筛选条件
     * @Author: Luoshuang
     * @param {*}
     * @return {*}
     */    
    handleSearchReset() {
      this.form = {
        fsnrGsnrNum: '',
        partNo: '',
        partName: '',
        supplierNo: '',
        supplierName: ''
      }
    },
    /**
     * @Description: 过滤表格数据
     * @Author: Luoshuang
     * @param {*}
     * @return {*}
     */    
    filterTableData() {
      this.tableListData = this.tableListDataTemp.filter(item => (
        item.fsnrGsnrNum.includes(this.form.fsnrGsnrNum) && item.partNo.includes(this.form.partNo) && item.partName.includes(this.form.partName) && item.supplierNo.includes(this.form.supplierNo) && item.supplierName.includes(this.form.supplierName)
      ))
    },
    /**
     * @Description: 获取表格初始数据
     * @Author: Luoshuang
     * @param {*}
     * @return {*}
     */    
    getTableList() {
      getList(this.$route.query.desinateId).then(res => {
        if (res?.result) {
          this.tableListData = res.data?.lines
          this.tableListDataTemp = cloneDeep(res.data?.lines)
        } else {
          this.tableListData = []
          this.tableListDataTemp = []
          iMessage.error(this.$i18n.locale === 'zh' ? res.desZh : res.desEn)
        }
      })
    },
    handleSelectionChange(val) {
      this.selectedTableData = val
    },
    openPage() {},
    toTop() {},
    handleSelect() {},
    goBack() {
      this.$router.push({path:'/designate/rfqdetail'})
    },
    changersEeditionDialogVisible(visible) {
      this.rsEeditionDialogVisible = visible
    }
  }
}
</script>

<style lang="scss" scoped>

</style>