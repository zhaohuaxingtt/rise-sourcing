<!--
 * @Author: your name
 * @Date: 2021-07-26 16:45:48
 * @LastEditTime: 2021-08-04 15:20:28
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
              <iText v-if="item.isObj">{{aekoInfo[item.props] && aekoInfo[item.props]['desc']}}</iText>
              <iText v-else >{{aekoInfo[item.props] || '-'}}</iText>
            </iFormItem>
          </template>
      </iFormGroup>
    </iCard>
    <iTabsList class="margin-top20" type="card" v-model="currentTab" @tab-click="tabChange">
      <!-- language(tab.key, tab.label) -->
      <el-tab-pane v-for="(tab, $tabIndex) in tabs" :key="$tabIndex" :label="tab.label" :name="tab.name">
        <template v-if="currentTab==tab.name">
          <component :ref="tab.name" :is="component" v-for="(component, $componentIndex) in tab.components" :class="$componentIndex !== 0 ? 'margin-top20' : ''" :key="$componentIndex" :aekoInfo="aekoInfo" />
        </template>
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
  iMessage,
 } from "rise"
import logButton from "@/components/logButton"
import contentDeclare from "./components/contentDeclare"
import partsList from "./components/partsList"
import cover from "./components/cover"

import {
  getAekoDetail,
} from '@/api/aeko/detail'

export default {
  components: { 
    iPage, 
    iTabsList, 
    contentDeclare,
    iCard,
    iButton,
    logButton,
    iFormGroup,
    iFormItem,
    iText,
    partsList,
    cover,
  },
  created() {
    this.aekoInfo = {
      requirementAekoId: this.$route.query.requirementAekoId
    }
    this.getBbasicInfo();
  },
  mounted() {
    const component = this.$refs[this.currentTab][0]
    if (typeof component.init === "function") component.init()
  },
  data() {
    return {
      aekoInfo: {},
      currentTab: "cover",
      basicTitle:[
        {label:'AEKO状态',labelKey:'LK_AEKOZHUANGTAI',props:'aekoStatus',isObj:true,},
        {label:'来源',labelKey:'LK_AEKO_LAIYUAN',props:'sourse',isObj:true,},
        {label:'创建⽇期',labelKey:'LK_AEKOCHUANGJIANRIQI',props:'createDate'},
        {label:'截⽌⽇期',labelKey:'LK_AEKOJIEZHIRIQI',props:'deadLine'},
      ],
      tabs: [
        { label: "内容表态", name: "contentDeclare", key: "NEIRONGBIAOTAI", components: [ "contentDeclare" ] },
        { label: "封⾯表态", name: "cover", key: "FENGMIANBIAOTAI", components: ['cover'] },
        { label: "零件清单", name: "partsList", key: "LINGJIANQINGDAN", components: ["partsList"] },
        { label: "审批附件", name: "c", key: "SHENPIFUJIAN", components: [] },
        { label: "审批记录", name: "d", key: "SHENPIFUJIAN", components: [] }
      ],
    }
  },
  methods: {
    // 页签切换
    tabChange() {
      this.$nextTick(() => {
        const component = this.$refs[this.currentTab][0]
        if (typeof component.init === "function") component.init()
      })
    },
    // 获取基础信息
    async getBbasicInfo(){
      const {query} = this.$route;
      const { requirementAekoId =''} = query;
      const { aekoInfo={} } = this;
      await getAekoDetail({requirementAekoId}).then((res)=>{
        const {code,data={}} = res;
        if(code == 200){
          this.aekoInfo = {...aekoInfo,...data};
        }else{
           iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn)
        }
      })
    },
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