<!--
 * @Author: yuszhou
 * @Date: 2021-02-25 15:12:41
 * @LastEditTime: 2021-02-25 16:06:04
 * @LastEditors: Please set LastEditors
 * @Description: 零件采购项目批量维护界面
 * @FilePath: \rise\src\views\partsprocure\batchmiantain\index.vue
-->

<template>
  <iPage class="batchmiantain">
    <div class="margin-bottom20 clearFloat">
      <span class="font18 font-weight">批量维护零件采购项目</span>
      <div class="floatright">
        <iButton>保存</iButton>
        <iButton>生成FS号</iButton>
        <iButton>启动询价</iButton>
      </div>
    </div>
    <iSearch class="margin-bottom20" title="采购项目信息" tabCard>
      <el-form>
        <el-form-item label="零件采购项目">
          <iSelect placeholder="请选择"></iSelect>
				</el-form-item>
        <el-form-item label="LINIE部门">
          <iSelect placeholder="请选择"></iSelect>
				</el-form-item>
        <el-form-item label="LINIE">
          <iSelect placeholder="请选择"></iSelect>
				</el-form-item>
        <el-form-item label="零件类型">
          <iSelect placeholder="请选择"></iSelect>
				</el-form-item>
        <el-form-item label="车型项目">
          <iSelect placeholder="请选择"></iSelect>
				</el-form-item>
        <el-form-item label="采购工厂">
          <iSelect placeholder="请选择"></iSelect>
				</el-form-item>
        <el-form-item label="单位">
          <iSelect placeholder="请选择"></iSelect>
				</el-form-item>
        <el-form-item label="CF控制员">
          <iSelect placeholder="请选择"></iSelect>
				</el-form-item>
      </el-form>
      <template slot="button">
        <iButton>确认</iButton>
        <iButton>重置</iButton>
      </template>
    </iSearch>
    <iSearch class="margin-bottom20" title="材料组工艺设置" tabCard icon>
      <el-form>
        <el-form-item label="材料组">
          <iSelect placeholder="请选择"></iSelect>
				</el-form-item>
        <el-form-item label="工艺">
          <iSelect placeholder="请选择"></iSelect>
				</el-form-item>
      </el-form>
      <template slot="button">
        <iButton>确认</iButton>
        <iButton>重置</iButton>
      </template>
    </iSearch>
    <outputPlan class="margin-bottom20" />
  </iPage>
</template>
<script>
import { iPage, iButton, iSearch, iSelect, iCard } from '@/components'
import outputPlan from './components/outputPlan'

export default{
  components: { iPage, iButton, iSearch, iSelect, iCard, outputPlan }
}
</script>
<style lang="scss" scoped>
.batchmiantain {
  
}
</style>