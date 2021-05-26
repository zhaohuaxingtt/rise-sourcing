<!--
 * @Author: Luoshuang
 * @Date: 2021-05-26 13:54:01
 * @LastEditors: Luoshuang
 * @LastEditTime: 2021-05-26 16:10:56
 * @Description: 创建RFQ界面
 * @FilePath: \front-web\src\views\accessoryPart\createRfq\index.vue
-->

<template>
  <iPage>
    <topComponents>
      <span slot="left" class="floatleft font20 font-weight">
        RFQ编号：SVZC5052
      </span>
    </topComponents>
    <iCard title="基础信息" collapse>
      <iFormGroup row="4" class="accessoryPartDetail">
        <iFormItem v-for="(item, index) in basicInfo" :key="index" :label="item.label" :class="item.row ? 'row'+item.row : ''">
          <iText v-if="!item.editable">{{detailData[item.value]}}</iText>
          <iInput v-else-if="item.type === 'input'"></iInput>
          <iSelect v-else-if="item.type === 'select'"></iSelect>
        </iFormItem>
      </iFormGroup>
      <div style="text-align:right;">
        <iButton>保存</iButton>
        <iButton>取消</iButton>
      </div>
    </iCard>
    <iCard class="margin-top20">
      <div class="margin-bottom20 clearFloat">
        <span class="font18 font-weight">配件需求签收</span>
          <div class="floatright">
            <!--------------------保存按钮----------------------------------->
            <iButton @click="handleSave" >保存</iButton>
            <!--------------------添加按钮----------------------------------->
            <iButton @click="handleAddParts" >添加</iButton>
            <!--------------------删除按钮----------------------------------->
            <iButton @click="handleDelete" >删除</iButton>
            <!--------------------批量更新采购工厂----------------------------------->
            <iButton @click="changefactoryDialogVisible(true)" >批量更新采购工厂</iButton>
          </div>
      </div>
      <tableList :activeItems='"a1"' selection indexKey :tableData="tableData" :tableTitle="tableTitle" :tableLoading="tableLoading" @handleSelectionChange="handleSelectionChange" @openPage="openPage"></tableList>
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
    <!--                  添加配件弹窗                                          --->
    <!------------------------------------------------------------------------>
    <addAccessoryPartDialog :dialogVisible="accDialogVisible" @changeVisible="changeAccDialogVisible" />
    <!------------------------------------------------------------------------>
    <!--                  批量更新采购工厂弹窗                                          --->
    <!------------------------------------------------------------------------>
    <updateFactoryDialog :dialogVisible="factoryDialogVisible" @changeVisible="changefactoryDialogVisible" />
  </iPage>
</template>

<script>
import { iPage, iCard, iFormGroup, iFormItem, iText, iButton, iInput, iSelect, iPagination, iMessage } from 'rise'
import topComponents from '../../designate/designatedetail/components/topComponents'
import { basicInfo, tableTitle } from './data'
import { pageMixins } from "@/utils/pageMixins"
import tableList from '@/views/designate/designatedetail/components/tableList'
import addAccessoryPartDialog from './components/addAccessoryPart'
import updateFactoryDialog from './components/updateFactory'
export default {
  mixins: [pageMixins],
  components: { iPage, topComponents, iCard, iFormGroup, iFormItem, iText, iButton, iInput, iSelect, iPagination, tableList, addAccessoryPartDialog, updateFactoryDialog },
  props: {
    partType: {type: String, default: '1'} // 零件类型：1：配件   2：附件
  },
  data() {
    return {
      basicInfo,
      detailData: {},
      tableTitle: tableTitle,
      tableData: [{}],
      accDialogVisible: false,
      factoryDialogVisible: false,
      selectItems: []
    }
  },
  methods: {
    /**
     * @Description: 表格选中行
     * @Author: Luoshuang
     * @param {*} val
     * @return {*}
     */    
    handleSelectionChange(val) {
      this.selectItems = val
    },
    /**
     * @Description: 添加配件弹窗状态修改
     * @Author: Luoshuang
     * @param {*} visible
     * @return {*}
     */    
    changeAccDialogVisible(visible) {
      this.accDialogVisible = visible
    },
    /**
     * @Description: 添加按钮点击事件，根据类型打开不同的弹窗
     * @Author: Luoshuang
     * @param {*}
     * @return {*}
     */    
    handleAddParts() {
      switch(this.partType) {
        case '1': // 配件
          this.changeAccDialogVisible(true)
          break
      }
    },
    /**
     * @Description: 添加配件弹窗状态修改
     * @Author: Luoshuang
     * @param {*} visible
     * @return {*}
     */
    changefactoryDialogVisible(visible) {
      if (this.selectItems.length < 1) {
        iMessage.warn('请选择零件')
        return
      }
      this.factoryDialogVisible = visible
    }
  }
}
</script>

<style lang="scss" scoped>
.accessoryPartDetail {
  .el-form-item {
    ::v-deep .el-form-item__label {
      width: 150px;
    }
  }
}
</style>