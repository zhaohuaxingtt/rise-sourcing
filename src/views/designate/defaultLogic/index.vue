<!--
 * @Author: Luoshuang
 * @Date: 2021-05-24 18:06:45
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-07-09 14:08:59
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
        {{language('LK_DINGDIANSHENQINGYUSHELUOJI','定点申请预设逻辑')}}
      </span>
    </detailTop>
    <iCard>
      <div class="margin-bottom20 clearFloat">
          <div class="floatright">
            <!--------------------添加按钮----------------------------------->
            <iButton @click="handleAdd">{{language('LK_TIANJIA','添加')}}</iButton>
            <!--------------------删除按钮----------------------------------->
            <iButton @click="handleDelete">{{language('LK_SHANCHU','删除')}}</iButton>
            <!--------------------恢复按钮----------------------------------->
            <!-- <iButton @click="handleRecover">恢复</iButton> -->
            <!--------------------保存按钮----------------------------------->
            <!-- <iButton @click="handleSave">保存</iButton> -->
          </div>
      </div>
        <!------------------------------------------------------------------------>
        <!--                  表格模块                                          --->
        <!------------------------------------------------------------------------>
        <tableList selection indexKey :tableData="tableListData" :tableTitle="tableTitle" :tableLoading="tableLoading" @handleSelectionChange="handleSelectionChange" ></tableList>
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
    <addRule ref="addRuleRef" :dialogVisible="dialogVisible" @changeVisible="changeVisible" @handleSave="handleSaveLogic" />
  </iPage>
</template>

<script>
import { iPage, iCard, iPagination, iButton, iMessage } from 'rise'
import { pageMixins } from "@/utils/pageMixins"
import tableList from '../designatedetail/components/tableList'
import { defaultLogicTableTitle, defaultLogicMockData } from './data'
import detailTop from '../designatedetail/components/topComponents'
import addRule from './addRule'
import { getNominateRulesList, deleteNominateRules, addNominateRules } from '@/api/designate/defaultLogic'
export default {
  mixins: [pageMixins],
  components: { iPage, iCard, iPagination, iButton, tableList, detailTop, addRule },
  data() {
    return {
      tableListData: defaultLogicMockData,
      tableTitle: defaultLogicTableTitle,
      tableLoading: false,
      form: {},
      dialogVisible: false,
      selectedItems: []
    }
  },
  created() {
    this.getTableList()
  },
  methods: {
    /**
     * @Description: 恢复按钮，恢复到上一次保存的数据
     * @Author: Luoshuang
     * @param {*}
     * @return {*}
     */    
    handleRecover() {
      this.getTableList()
    },
    /**
     * @Description: 获取表格数据
     * @Author: Luoshuang
     * @param {*}
     * @return {*}
     */    
    getTableList() {
      this.tableLoading = true
      const params = {
        current: this.page.currPage,
        size: this.page.pageSize
      }
      getNominateRulesList(params).then(res => {
        if (res?.result) {
          this.tableListData = res.data
          this.page.currPage = Number(res.pageNum)
          this.page.pageSize = Number(res.pageSize)
          this.page.totalCount = Number(res.total)
        } else {
          this.tableListData = []
          iMessage.error(this.$i18n.locale === 'zh' ? res.desZh : res.desEn)
        }
      }).finally(() => {
        this.tableLoading = false
      })
    },
    /**
     * @Description: 保存添加的逻辑
     * @Author: Luoshuang
     * @param {*} logic
     * @return {*}
     */    
    handleSaveLogic(logic) {
      this.$refs.addRuleRef.changeSaveLoading(true)
      addNominateRules(logic).then(res => {
        if (res?.result) {
          iMessage.success(this.$i18n.locale === 'zh' ? res.desZh : res.desEn)
          this.changeVisible(false)
          this.getTableList()
        } else {
          iMessage.error(this.$i18n.locale === 'zh' ? res?.desZh : res?.desEn)
        }
      }).finally(() => {
        this.$refs.addRuleRef.changeSaveLoading(false)
      })
    },
    /**
     * @Description: 表格选中切换事件
     * @Author: Luoshuang
     * @param {*} val
     * @return {*}
     */    
    handleSelectionChange(val) {
      this.selectedItems = val
    },
    /**
     * @Description: 删除选中的rule
     * @Author: Luoshuang
     * @param {*}
     * @return {*}
     */    
    handleDelete() {
      if (this.selectedItems.length < 1) {
        iMessage.warn(this.language('LK_QINGXUANZEXUYAOSHANCHUDEGUIZE','请选择需要删除的规则'))
      }
      this.tableLoading = true
      const params = {
        rulesId: this.selectedItems.map(item => item.rulesId)
      }
      deleteNominateRules(params).then(res => {
        if (res?.result) {
          iMessage.success(this.$i18n.locale === 'zh' ? res.desZh : res.desEn)
          this.getTableList()
        } else {
          iMessage.error(this.$i18n.locale === 'zh' ? res.desZh : res.desEn)
        }
      }).finally(() => {
        this.tableLoading = false
      })
    },
    /**
     * @Description: 点击添加按钮
     * @Author: Luoshuang
     * @param {*}
     * @return {*}
     */    
    handleAdd() {
      this.changeVisible(true)
    },
    /**
     * @Description: 切换设置规则弹窗显示
     * @Author: Luoshuang
     * @param {*} visible
     * @return {*}
     */    
    changeVisible(visible) {
      this.dialogVisible = visible
    }
  }
}
</script>

<style lang="scss" scoped>

</style>