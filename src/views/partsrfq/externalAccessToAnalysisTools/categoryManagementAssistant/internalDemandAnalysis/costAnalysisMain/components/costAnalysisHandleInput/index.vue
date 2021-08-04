<!--
 * @Author: youyuan
 * @Date: 2021-07-30 15:59:20
 * @LastEditTime: 2021-08-04 15:35:21
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\views\partsrfq\externalAccessToAnalysisTools\categoryManagementAssistant\internalDemandAnalysis\components\costAnalyHandleInput.vue
-->
<template>
  <div>
    <iCard style="height: 850px;">
      <div slot="header" class="headBox">
        <p class="headTitle">{{ language('CHENGBENJIEGOUFENXITUSHOUGONGSHURU', '成本结构分析图-手工输入') }}</p>
        <span class="buttonBox">
          <iButton>{{ language('BIANJI', '编辑') }}</iButton>
          <iButton>{{ language('FENXIKU', '分析库') }}</iButton>
          <iButton>{{ language('BAOCUN', '保存') }}</iButton>
          <iButton>{{ language('FANHUI', '返回') }}</iButton>
        </span>
      </div>
      <div class="mainContent">
        <el-row :gutter="20">
          <el-col :span="16">
            <costChar :width="800" :height="600"/>
          </el-col>
          <el-col :span="8">
            <p class="formTitle">{{language('SHUZHI', '数值')}}</p>
            <el-form ref="form" :model="form" label-position="left" label-width="200px">
              <el-form-item :label="language('YUANCAILIAOSANJIANCHENGBEN', '原材料/散件成本')">
                <iInput v-model="form.rawMaterial" disabled></iInput>
              </el-form-item>
              <el-form-item :label="language('ZHIZAOCHENGBEN', '制造成本')">
                <iInput v-model="form.manufacture" disabled ></iInput>
              </el-form-item>
              <el-form-item :label="language('BAOFEICHENGBEN', '报废成本')">
                <iInput v-model="form.scrap" disabled></iInput>
              </el-form-item>
              <el-form-item :label="language('GUANLIFEI', '管理费')">
                <iInput v-model="form.manageCost" disabled></iInput>
              </el-form-item>
              <el-form-item :label="language('QITAFEIYONG', '其他费用')">
                <iInput v-model="form.otherCost" disabled></iInput>
              </el-form-item>
              <el-form-item :label="language('LIRUN', '利润')">
                <iInput v-model="form.profit" disabled></iInput>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
      </div>
    </iCard>
  </div>
</template>

<script>
import {iCard, iButton, iInput} from 'rise'
import costChar from '@/views/partsrfq/externalAccessToAnalysisTools/categoryManagementAssistant/internalDemandAnalysis/costAnalysisMain/components/char'
export default {
  name: 'CostAnalysisHandleInput',
  components: {iCard, iButton, iInput, costChar},
  data () {
    return {
      form: {
        rawMaterial: '25%',
        manufacture: '30%',
        scrap: '15%',
        manageCost: '5%',
        otherCost: '10%',
        profit: '15%',
      }
    }
  },
  created() {

  },
  methods: {
  }
}
</script>

<style lang='scss' scoped>
.headBox {
  position: relative;
  justify-content: space-between;
  width: 100%;
  .headTitle {
    display: inline-block;
    font-weight: bold;
    font-family: Arial;
    color: #000000;
    opacity: 1;
  }
  .buttonBox {
    position: absolute;
    right: 0;
  }
}
.mainContent {
  margin: 50px 50px;
  .formTitle {
    font-weight: bold;
    font-size: 20px;
    line-height: 100px;
  }
  ::v-deep .el-input .el-input__inner{
    text-align: center;
  }
  
}
</style>

