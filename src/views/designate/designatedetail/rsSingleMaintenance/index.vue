<!--
 * @Author: Luoshuang
 * @Date: 2021-05-24 14:39:43
 * @LastEditors: Luoshuang
 * @LastEditTime: 2021-05-31 09:58:09
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
    <iSearch class="margin-bottom20 margin-top20" icon @reset="handleSearchReset" @sure="getTableList">
      <el-form>
        <el-form-item :label="'零件采购项目编号'" >
          <iInput :placeholder="$t('LK_QINGSHURU')" v-model="form.searchConditions"></iInput>
        </el-form-item>
        <el-form-item :label="'零件号'" >
          <iInput :placeholder="$t('LK_QINGSHURU')" v-model="form.searchConditions"></iInput>
        </el-form-item>
        <el-form-item :label="'零件名称'" >
          <iInput :placeholder="$t('LK_QINGSHURU')" v-model="form.searchConditions"></iInput>
        </el-form-item>
        <el-form-item :label="'供应商编号'" >
          <iInput :placeholder="$t('LK_QINGSHURU')" v-model="form.searchConditions"></iInput>
        </el-form-item>
        <el-form-item :label="'供应商名称'" >
          <iInput :placeholder="$t('LK_QINGSHURU')" v-model="form.searchConditions"></iInput>
        </el-form-item>
      </el-form>
    </iSearch>
    <iCard>
      <div class="margin-bottom20 clearFloat">
          <div class="floatright">
            <!--------------------返回按钮----------------------------------->
            <iButton @click="goBack">保存</iButton>
            <!--------------------选择按钮----------------------------------->
            <iButton @click="handleSelect">下载模板</iButton>
            <!--------------------返回按钮----------------------------------->
            <iButton @click="goBack">上传</iButton>
            <!--------------------选择按钮----------------------------------->
            <iButton @click="handleSelect">读取报价单</iButton>
            <!--------------------返回按钮----------------------------------->
            <iButton @click="changersEeditionDialogVisible(true)">RS单预览</iButton>
            
          </div>
      </div>
        <!------------------------------------------------------------------------>
        <!--                  表格模块                                          --->
        <!------------------------------------------------------------------------>
        <tableList :activeItems='"rfqId"' selection indexKey :tableData="tableListData" :tableTitle="tableTitle" :tableLoading="tableLoading" @handleSelectionChange="handleSelectionChange" @openPage="openPage" @updateSlot='toTop'></tableList>
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
    <rsDialog :dialogVisible="rsEeditionDialogVisible" @changeVisible="changersEeditionDialogVisible" />
  </iPage>
</template>

<script>
import { iPage, iCard, iPagination, iButton, iSearch, iSelect, iInput } from 'rise'
import { pageMixins } from "@/utils/pageMixins"
import tableList from '../components/tableList'
import { rsTableTitle, rsMockData } from './data'
import detailTop from '../components/topComponents'
import rsDialog from '@/views/partsprocure/editordetail/components/designateInfo/components/rsEEdition'
export default {
  mixins: [pageMixins],
  components: { iPage, iCard, iPagination, iButton, tableList, iSearch, iSelect, iInput, detailTop, rsDialog },
  data() {
    return {
      tableListData: rsMockData,
      tableTitle: rsTableTitle,
      tableLoading: false,
      form: {},
      rsEeditionDialogVisible: false
    }
  },
  methods: {
    getTableList() {},
    handleSelectionChange() {},
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