<!--
 * @Author: Luoshuang
 * @Date: 2021-05-27 17:45:44
 * @LastEditors: YoHo
 * @LastEditTime: 2022-03-23 16:36:16
 * @Description: 零件采购项目-定点信息
 * @FilePath: \front-web\src\views\partsprocure\editordetail\components\designateInfo\index.vue
-->

<template>
  <iCard>
    <div class="margin-bottom20 clearFloat">
      <span class="font18 font-weight">{{language('DINGDIANXINXI','定点信息')}}</span>
      <div class="floatright">
        <!--------------------纸质RS单----------------------------------->
        <iButton v-permission.auto="PARTSPROCURE_DESIGNATEINFO_PAPERRSSHEET|定点信息-纸质RS单" @click="changersPaperDialogVisible(true)">{{language('ZHIZHIRSDAN','纸质RS单')}}</iButton>
        <!--------------------电子RS单----------------------------------->
        <iButton  v-permission.auto="PARTSPROCURE_DESIGNATEINFO_ELECTRONICRSSHEET|定点信息-电子RS单" @click="changersEeditionDialogVisible(true)">{{language('DIANZIRSDAN','电子RS单')}}</iButton>
        <!--------------------SEL分摊单----------------------------------->
        <iButton v-permission.auto="PARTSPROCURE_DESIGNATEINFO_SELALLOCATIONSHEET|定点信息-SEL分摊单" @click="changeselDialogVisible(true)">{{language('SELFENTANDAN ','SEL分摊单')}}</iButton>
        <buttonTableSetting @click="edittableHeader"></buttonTableSetting>
        
        <button-table-setting @click="edittableHeader" />
      </div>
    </div>
    <tableList
      permissionKey="PARTSPROCURE_EDITORDETAIL_COMPONENTS_DESIGNATEINFO"
      ref="tableList"
      :lang="true"
      v-permission.auto="PARTSPROCURE_DESIGNATEINFO_TABLE|定点信息-表格"  :selection="false" :tableTitle="tableTitle" :tableData="tableData" :tableLoading="tableLoading" />
    <!------------------------------------------------------------------------>
    <!--                  表格分页                                          --->
    <!------------------------------------------------------------------------>
    <!-- <iPagination v-update @size-change="handleSizeChange($event, getTableList)" @current-change="handleCurrentChange($event, getTableList)" background :page-sizes="page.pageSizes"
      :page-size="page.pageSize"
      :layout="page.layout"
      :current-page="page.currPage"
      :total="page.totalCount"
    /> -->
    <!------------------------------------------------------------------------>
    <!--                  纸质RS单弹窗                                          --->
    <!------------------------------------------------------------------------>
    <rsPaperDialog :dialogVisible="rsPaperDialogVisible" @changeVisible="changersPaperDialogVisible" :nominateAppId="nominateAppId" />
    <!------------------------------------------------------------------------>
    <!--                  SEL分摊单弹窗                                          --->
    <!------------------------------------------------------------------------>
    <selDialog :dialogVisible="selDialogVisible" @changeVisible="changeselDialogVisible" :nominateAppId="nominateAppId" />
    <!------------------------------------------------------------------------>
    <!--                  电子RS单弹窗                                          --->
    <!------------------------------------------------------------------------>
    <rsEEditionDialog :dialogVisible="rsEeditionDialogVisible" @changeVisible="changersEeditionDialogVisible" :otherPreview="true" :otherNominationType="nominateType" :otherNominationId="nominateAppId" :otherPartProjectType="otherPartProjectType" />
  </iCard>
</template>

<script>
import { iCard, iButton, iMessage } from 'rise'
import { tableTitle } from './data'
// import tableList from '@/views/designate/designatedetail/components/tableList'
import tableList from "@/components/iTableSort";
import { tableSortMixins } from "@/components/iTableSort/tableSortMixins";
import { pageMixins } from "@/utils/pageMixins"
import rsPaperDialog from './components/rsPaper'
import selDialog from './components/sel'
import rsEEditionDialog from './components/rsEEdition'
import { findNominateInfo } from "@/api/partsprocure/editordetail"
import buttonTableSetting from '@/components/buttonTableSetting'
export default {
  mixins: [pageMixins,tableSortMixins],
  components: { tableList, iCard, iButton, rsPaperDialog, selDialog, rsEEditionDialog, buttonTableSetting },
  data() {
    return {
      tableTitle: tableTitle,
      tableData: [],
      rsPaperDialogVisible: false,
      selDialogVisible: false,
      rsEeditionDialogVisible: false,
      tableLoading: false,
      nominateAppId: '',
      nominateType: '',
      otherPartProjectType: ''
    }
  },
  props: {
    params: {
      type: Object,
      require: true
    }
  },
  created() {
    this.getTableInfo()
  },
  methods: {
    /**
     * @Description: 获取表格信息
     * @Author: Luoshuang
     * @param {*}
     * @return {*}
     */    
    getTableInfo() {
      this.tableLoading = true 
      findNominateInfo(this.params.fsnrGsnrNum).then(res => {
        if (res?.result) {
          this.tableData = res.data || []
          if (this.tableData.length) {
            this.nominateAppId = this.tableData[0].nominateAppId || ''
            this.nominateType = this.tableData[0].applicationStatus || ''
            this.otherPartProjectType = this.tableData[0].partProjectType || ''
          }
        } else {
          iMessage.error(this.$i18n.locale === 'zh' ? res.desZh : res.desEn)
        }
      }).finally(() => {
        this.tableLoading = false
      })
    },
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
      if(this.nominateAppId == '') {
        iMessage.error(this.language('DANGQIANRSDANWUSHUJU','当前RS单无数据'))
        return
      }
      this.rsEeditionDialogVisible = visible
    }
  }
}
</script>

<style lang="scss" scoped>

</style>