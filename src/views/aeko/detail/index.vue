<!--
 * @Author: your name
 * @Date: 2021-07-26 16:45:48
 * @LastEditTime: 2021-07-28 15:50:14
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\views\aekomanage\detail\index.vue
-->
<template>
  <iPage class="aekodetail">
    <div class="header flex-between-center margin-bottom20">
      <h2>AEKO号：AE19221</h2>
      <div>
        <iButton>AEKO详情</iButton>
        <logButton class="margin-left20" />
      </div>
    </div>
    <!-- 基础信息 -->
    <iCard :title="language('LK_JICHUXINXI','基础信息')">
      <iFormGroup row="4" class="basic-form" label-width="100px">
          <template v-for="(item,index) in basicTitle">
            <iFormItem :key="'basicInfo_'+index" :label="language(item.labelKey,item.label)+':'"  >
              <iText>{{basicInfo[item.props]}}</iText>
            </iFormItem>
          </template>
      </iFormGroup>
    </iCard>
    <iTabsList class="margin-top20" type="card" v-model="currentTab" @tab-click="tabChange">
      <!-- language(tab.key, tab.label) -->
      <el-tab-pane v-for="(tab, $tabIndex) in tabs" :key="$tabIndex" :label="tab.label" :name="tab.name">
        <component :ref="tab.name" :is="component" v-for="(component, $componentIndex) in tab.components" :class="$componentIndex !== 0 ? 'margin-top20' : ''" :key="$componentIndex" />
      </el-tab-pane>
    </iTabsList>
  </iPage>
</template>

<script>
import { 
  iPage, 
  iTabsList,
  iCard,
  iButton,
  iFormGroup,
  iFormItem,
  iText,
 } from "rise"
import logButton from "@/components/logButton"
import contentDeclare from "./components/contentDeclare"
import partsList from "./components/partsList"


export default {
  components: { 
    iPage, iTabsList, contentDeclare,
    iCard,
    iButton,
    logButton,
    iFormGroup,
    iFormItem,
    iText,
    partsList,
     },
  data() {
    return {
      currentTab: "partsList",
      basicTitle:[
        {label:'AEKO状态',labelKey:'LK_AEKOZHUANGTAI',props:'a'},
        {label:'来源',labelKey:'LK_AEKO_LAIYUAN',props:'b'},
        {label:'创建⽇期',labelKey:'LK_AEKOCHUANGJIANRIQI',props:'c'},
        {label:'截⽌⽇期',labelKey:'LK_AEKOJIEZHIRIQI',props:'d'},
      ],
      basicInfo:{
        'a':'已导⼊',
        'b':'⼿⼯导⼊',
        'c':'2021-03-01',
        'd':'2021-03-16'
      },
      tabs: [
        { label: "内容表态", name: "contentDeclare", key: "NEIRONGBIAOTAI", components: [ "contentDeclare" ] },
        { label: "封⾯表态", name: "a", key: "FENGMIANBIAOTAI", components: [] },
        { label: "零件清单", name: "b", key: "LINGJIANQINGDAN", components: [partsList] },
        { label: "审批附件", name: "c", key: "SHENPIFUJIAN", components: [] },
        { label: "审批记录", name: "d", key: "SHENPIFUJIAN", components: [] }
      ],
    }
  },
  methods: {
    tabChange() {}
  }
}
</script>

<style lang="scss" scoped>
.aekodetail {
  .basic-form{
    ::v-deep.el-form-item__content {
      margin-left: 0!important;
    }
  }
}
</style>