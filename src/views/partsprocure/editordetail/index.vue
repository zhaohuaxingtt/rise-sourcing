<!--
 * @Author: yuszhou
 * @Date: 2021-02-25 10:09:36
 * @LastEditTime: 2021-03-02 16:01:42
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \rise\src\views\partsprocure\editordetail\index.vue
-->
<template>
  <iPage>
      <!------------------------------------------------------------------------>
      <!--                  详情页头部保存区域                                  --->
      <!------------------------------------------------------------------------>
    <div class="margin-bottom20 clearFloat">
      <span class="font18 font-weight">零件采购项目</span>
      <div class="floatright">
        <iButton @click="save">保存</iButton>
        <iButton @click="openDiologBack">退回</iButton>
      </div>
    </div>
      <!------------------------------------------------------------------------>
      <!--                  基本信息区域                                       --->
      <!------------------------------------------------------------------------>
    <iCard>
      <iFormGroup row="4" inline :rules="rules">
        <div class="row">
          <div class="col">
            <iFormItem label="零件号：" name="test">
              <iText></iText>
            </iFormItem>
            <iFormItem label="零件名称（中）：" name="test">
              <iText></iText>
            </iFormItem>
            <iFormItem label="零件项目类型：" name="test">
              <iSelect></iSelect>
            </iFormItem>
            <iFormItem label="采购工厂：" name="test">
              <iSelect></iSelect>
            </iFormItem>
            <iFormItem label="Common Sourcing：" name="test">
              <iSelect></iSelect>
            </iFormItem>
          </div>
          <div class="col">
            <iFormItem label="FSNR/GSNR/SPNR：" name="test">
              <iText></iText>
            </iFormItem>
            <iFormItem label="零件名称（德）：" name="test">
              <iText></iText>
            </iFormItem>
            <iFormItem label="事件类型：" name="test">
              <iSelect></iSelect>
            </iFormItem>
            <iFormItem label="单位：" name="test">
              <iSelect></iSelect>
            </iFormItem>
            <iFormItem label="MTZ零件：" name="test">
              <iSelect></iSelect>
            </iFormItem>
          </div>
          <div class="col">
            <iFormItem label="询价采购员：" name="test">
              <iText></iText>
            </iFormItem>
            <iFormItem label="LINIE部门：" name="test">
              <iSelect></iSelect>
            </iFormItem>
            <iFormItem label="LINIE：" name="test">
              <iSelect></iSelect>
            </iFormItem>
            <iFormItem label="CF控制员：" name="test">
              <iSelect></iSelect>
            </iFormItem>
          </div>
          <div class="col">
            <iFormItem label="签收日期：" name="test">
              <iText></iText>
            </iFormItem>
            <iFormItem label="SOP日期：" name="test">
              <iText></iText>
            </iFormItem>
            <iFormItem label="零件状态：" name="test">
              <iText></iText>
            </iFormItem>
            <iFormItem label="BMG：" name="test">
              <iText></iText>
            </iFormItem>
          </div>
        </div>
      </iFormGroup>
    </iCard>
    <iTabsList class="margin-top20" type='border-card'>
      <el-tab-pane label="材料组信息"></el-tab-pane>
      <el-tab-pane label="零件产量计划"></el-tab-pane>
      <el-tab-pane label="图纸和TP详情页"></el-tab-pane>
      <el-tab-pane label="物流要求">
		  <logistics></logistics>
	  </el-tab-pane>
      <el-tab-pane label="申请目标价">
		  <targePrice></targePrice>
	  </el-tab-pane>
      <el-tab-pane label="备注信息"></el-tab-pane>
      <el-tab-pane label="SCB"></el-tab-pane>
      <el-tab-pane label="重要操作日志"></el-tab-pane>
    </iTabsList>
  </iPage>
</template>
<script>
import {
  iPage,
  iFormGroup,
  iFormItem,
  iCard,
  iText,
  iSelect,
  iButton,
  iTabsList
} from "@/components";
import logistics from "./components/logistics"
import targePrice from "./components/targetPrice"
export default {
  components: { iPage, iFormGroup, iFormItem, iCard, iText, iSelect ,iButton,iTabsList,logistics,targePrice},
};
</script>
<style lang="scss" scoped>
.row {
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  justify-content: space-between;
  .col {
    width: 395px;
    border-right: 1px solid $color-border;
    margin-right: 10px;
    &:last-child {
      margin-right: 0px;
      border-right: none;
    }
  }
  .items {
    width: 300px;
  }
}
</style>
