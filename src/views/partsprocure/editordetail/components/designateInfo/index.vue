<!--
 * @Author: Luoshuang
 * @Date: 2021-05-27 17:45:44
 * @LastEditors: Luoshuang
 * @LastEditTime: 2021-05-28 10:35:30
 * @Description: 零件采购项目-定点信息
 * @FilePath: \front-web\src\views\partsprocure\editordetail\components\designateInfo\index.vue
-->

<template>
  <iCard>
    <div class="margin-bottom20 clearFloat">
      <span class="font18 font-weight">定点信息</span>
      <div class="floatright">
        <!--------------------纸质RS单----------------------------------->
        <iButton @click="changersPaperDialogVisible(true)">纸质RS单</iButton>
        <!--------------------电子RS单----------------------------------->
        <iButton @click="changersEeditionDialogVisible(true)">电子RS单</iButton>
        <!--------------------SEL分摊单----------------------------------->
        <iButton @click="changeselDialogVisible(true)">SEL分摊单</iButton>
        
      </div>
    </div>
    <tableList selection :tableTitle="tableTitle" :tableData="tableData" />
    <!------------------------------------------------------------------------>
    <!--                  表格分页                                          --->
    <!------------------------------------------------------------------------>
    <iPagination v-update @size-change="handleSizeChange($event, getTableList)" @current-change="handleCurrentChange($event, getTableList)" background :page-sizes="page.pageSizes"
      :page-size="page.pageSize"
      :layout="page.layout"
      :current-page="page.currPage"
      :total="page.totalCount"
    />
    <!------------------------------------------------------------------------>
    <!--                  纸质RS单弹窗                                          --->
    <!------------------------------------------------------------------------>
    <rsPaperDialog :dialogVisible="rsPaperDialogVisible" @changeVisible="changersPaperDialogVisible" />
    <!------------------------------------------------------------------------>
    <!--                  SEL分摊单弹窗                                          --->
    <!------------------------------------------------------------------------>
    <selDialog :dialogVisible="selDialogVisible" @changeVisible="changeselDialogVisible" />
    <!------------------------------------------------------------------------>
    <!--                  电子RS单弹窗                                          --->
    <!------------------------------------------------------------------------>
    <rsEEditionDialog :dialogVisible="rsEeditionDialogVisible" @changeVisible="changersEeditionDialogVisible" />
  </iCard>
</template>

<script>
import { iCard, iButton, iPagination } from 'rise'
import { tableTitle } from './data'
import tableList from '@/views/designate/designatedetail/components/tableList'
import { pageMixins } from "@/utils/pageMixins"
import rsPaperDialog from './components/rsPaper'
import selDialog from './components/sel'
import rsEEditionDialog from './components/rsEEdition'
export default {
  mixins: [pageMixins],
  components: { tableList, iCard, iButton, iPagination, rsPaperDialog, selDialog, rsEEditionDialog },
  data() {
    return {
      tableTitle: tableTitle,
      tableData: [],
      rsPaperDialogVisible: false,
      selDialogVisible: false,
      rsEeditionDialogVisible: false
    }
  },
  methods: {
    /**
     * @Description: 纸质RS单弹窗状态变化
     * @Author: Luoshuang
     * @param {*} visible
     * @return {*}
     */    
    changersPaperDialogVisible(visible) {
      this.rsPaperDialogVisible = visible
    },
    /**
     * @Description: SEL分摊单弹窗状态变化
     * @Author: Luoshuang
     * @param {*} visible
     * @return {*}
     */    
    changeselDialogVisible(visible) {
      this.selDialogVisible = visible
    },
    /**
     * @Description: 电子RS单弹窗变化
     * @Author: Luoshuang
     * @param {*} visible
     * @return {*}
     */    
    changersEeditionDialogVisible(visible) {
      this.rsEeditionDialogVisible = visible
    }
  }
}
</script>

<style lang="scss" scoped>

</style>