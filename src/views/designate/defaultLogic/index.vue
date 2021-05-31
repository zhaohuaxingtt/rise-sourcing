<!--
 * @Author: Luoshuang
 * @Date: 2021-05-24 18:06:45
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-05-31 15:28:24
 * @Description: 定点申请预设逻辑界面
 * @FilePath: \front-web\src\views\designate\defaultLogic\index.vue
-->

<template>
  <iPage>
    <!------------------------------------------------------------------------>
    <!--                     界面标题模块                                   --->
    <!------------------------------------------------------------------------>
    <detailTop right lev='2' :pageMenu='detailPage' :query='$route.query'>
      <span slot="left" class="floatleft font20 font-weight">
        定点申请预设逻辑
      </span>
    </detailTop>
    <iCard>
      <div class="margin-bottom20 clearFloat">
          <div class="floatright">
            <!--------------------返回按钮----------------------------------->
            <iButton @click="handleAdd">添加</iButton>
            <!--------------------选择按钮----------------------------------->
            <iButton @click="handleSelect">删除</iButton>
            <!--------------------返回按钮----------------------------------->
            <iButton @click="handleRecover">恢复</iButton>
            <!--------------------选择按钮----------------------------------->
            <iButton @click="handleSave">保存</iButton>
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
    <addRule :dialogVisible="dialogVisible" @changeVisible="changeVisible" />
  </iPage>
</template>

<script>
import { iPage, iCard, iPagination, iButton } from 'rise'
import { pageMixins } from "@/utils/pageMixins"
import tableList from '../designatedetail/components/tableList'
import { defaultLogicTableTitle, defaultLogicMockData } from './data'
import detailTop from '../designatedetail/components/topComponents'
import addRule from './addRule'
export default {
  mixins: [pageMixins],
  components: { iPage, iCard, iPagination, iButton, tableList, detailTop, addRule },
  data() {
    return {
      tableListData: defaultLogicMockData,
      tableTitle: defaultLogicTableTitle,
      tableLoading: false,
      form: {},
      dialogVisible: false
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
    handleAdd() {
      this.changeVisible(true)
    },
    changeVisible(visible) {
      this.dialogVisible = visible
    }
  }
}
</script>

<style lang="scss" scoped>

</style>