<!--
 * @Author: Luoshuang
 * @Date: 2021-05-26 13:54:01
 * @LastEditors: Luoshuang
 * @LastEditTime: 2021-06-02 16:38:51
 * @Description: 创建RFQ界面
       配件：选择的配件需要是分配了询价采购员的且是同一个询价采购员, 创建时能选择LINIE
       附件：选择的附件需要时分配了LINIE且为同一个LINIE, 创建时不能再选择LINIE
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
        <span class="font18 font-weight"></span>
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
      <tableList :activeItems='"a1"' selection indexKey :tableData="tableData" :tableTitle="tableTitle" :tableLoading="tableLoading" @handleSelectionChange="handleSelectionChange" @openPage="openPage" @openPlan="openPlanDialog"></tableList>
    </iCard>
    <!------------------------------------------------------------------------>
    <!--                  添加配件弹窗                                          --->
    <!------------------------------------------------------------------------>
    <addAccessoryPartDialog :dialogVisible="accDialogVisible" @changeVisible="changeAccDialogVisible" />
    <!------------------------------------------------------------------------>
    <!--                  批量更新采购工厂弹窗                                          --->
    <!------------------------------------------------------------------------>
    <updateFactoryDialog :dialogVisible="factoryDialogVisible" @changeVisible="changefactoryDialogVisible" />
    <!------------------------------------------------------------------------>
    <!--                  添加附件弹窗                                          --->
    <!------------------------------------------------------------------------>
    <addFileDialog :dialogVisible="fileDialogVisible" @changeVisible="changefileDialogVisible" />
    <!------------------------------------------------------------------------>
    <!--                  产能计划弹窗                                          --->
    <!------------------------------------------------------------------------>
    <capacityPlanningDialog :dialogVisible="planDialogVisible" @changeVisible="changeplanDialogVisible" />
  </iPage>
</template>

<script>
import { iPage, iCard, iFormGroup, iFormItem, iText, iButton, iInput, iSelect, iPagination, iMessage } from 'rise'
import topComponents from '../../designate/designatedetail/components/topComponents'
import { basicInfo, tableTitle, fileTableTitle } from './data'
import { pageMixins } from "@/utils/pageMixins"
import tableList from '@/views/designate/designatedetail/components/tableList'
import addAccessoryPartDialog from './components/addAccessoryPart'
import updateFactoryDialog from './components/updateFactory'
import addFileDialog from './components/addFile'
import capacityPlanningDialog from './components/capacityPlanning'
export default {
  mixins: [pageMixins],
  components: { iPage, topComponents, iCard, iFormGroup, iFormItem, iText, iButton, iInput, iSelect, iPagination, tableList, addAccessoryPartDialog, updateFactoryDialog, addFileDialog, capacityPlanningDialog },
  props: {
    partType: {type: String, default: '1'} // 零件类型：1：配件   2：附件
  },
  data() {
    return {
      basicInfo,
      detailData: {},
      // tableTitle: tableTitle,
      tableData: [{}],
      accDialogVisible: false,
      factoryDialogVisible: false,
      selectItems: [],
      fileDialogVisible: false,
      planDialogVisible: false
    }
  },
  computed: {
    tableTitle() {
      const type = this.$route.query.type
      console.log(type)
      return type === '1' ? tableTitle : fileTableTitle
    }
  },
  methods: {
    /**
     * @Description: 点击产能计划列打开产能计划弹窗
     * @Author: Luoshuang
     * @param {*} row
     * @return {*}
     */    
    openPlanDialog(row) {
      this.changeplanDialogVisible(true)
    },
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
     * @Description: 产能计划弹窗状态修改
     * @Author: Luoshuang
     * @param {*} visible
     * @return {*}
     */    
    changeplanDialogVisible(visible) {
      this.planDialogVisible = visible
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
     * @Description: 添加附件弹窗状态修改
     * @Author: Luoshuang
     * @param {*} visible
     * @return {*}
     */    
    changefileDialogVisible(visible) {
      this.fileDialogVisible = visible
    },
    /**
     * @Description: 添加按钮点击事件，根据类型打开不同的弹窗
     * @Author: Luoshuang
     * @param {*}
     * @return {*}
     */    
    handleAddParts() {
      switch(this.$route.query.type) {
        case '1': // 配件
          this.changeAccDialogVisible(true)
          break
        case '2':
          this.changefileDialogVisible(true)
          break
        default:
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