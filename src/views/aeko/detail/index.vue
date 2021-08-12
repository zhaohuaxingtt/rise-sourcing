<!--
 * @Author: your name
 * @Date: 2021-07-26 16:45:48
 * @LastEditTime: 2021-08-12 16:08:35
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\views\aekomanage\detail\index.vue
-->
<template>
  <iPage class="aekodetail">
    <div class="header flex-between-center margin-bottom20">
      <h2>AEKO号：{{ aekoInfo.aekoCode }}</h2>
      <div>
        <iButton @click="goToDetail">{{language('LK_AEKO_BUTTON_DETAIL','AEKO详情')}}</iButton>
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
      <el-tab-pane lazy v-for="(tab, $tabIndex) in tabs" :key="$tabIndex" :label="tab.label" :name="tab.name">
        <template v-if="currentTab==tab.name">
          <component :ref="tab.name" :is="component" v-for="(component, $componentIndex) in tab.components" :class="$componentIndex !== 0 ? 'margin-top20' : ''" :key="$componentIndex" :aekoInfo="aekoInfo" @getBbasicInfo="getBbasicInfo"/>
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
import attachment from "./components/attachment"
import record from "./components/record"

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
    attachment,
    record,
  },
  created() {
    this.aekoInfo = {
      requirementAekoId: this.$route.query.requirementAekoId
    }
    
    if (sessionStorage.getItem(`aekoConatentDeclareParams_${ this.$route.query.requirementAekoId }`)) {
      try {
        const aekoConatentDeclareParams = JSON.parse(sessionStorage.getItem(`aekoConatentDeclareParams_${ this.$route.query.requirementAekoId }`))
        this.currentTab = aekoConatentDeclareParams.currentTab
      } catch(e) {
        console.error(e)
      }
    }

    this.getBbasicInfo();
  },
  computed: {
    // eslint-disable-next-line no-undef
    ...Vuex.mapGetters([
        "isAekoManager", // Aeko管理员
        "isCommodityCoordinator", // 科室协调员
        "isLinie", // 专业采购员
    ]),
  },
  data() {
    return {
      aekoInfo: {},
      currentTab: "partsList",
      basicTitle:[
        {label:'AEKO状态',labelKey:'LK_AEKOZHUANGTAI',props:'aekoStatusDesc',},
        {label:'来源',labelKey:'LK_AEKO_LAIYUAN',props:'sourseDesc'},
        {label:'创建⽇期',labelKey:'LK_AEKOCHUANGJIANRIQI',props:'createDate'},
        {label:'截⽌⽇期',labelKey:'LK_AEKOJIEZHIRIQI',props:'deadLine'},
      ],
      tabs: [
        { label: "零件清单", name: "partsList", key: "LINGJIANQINGDAN", components: ["partsList"] },
        { label: "内容表态", name: "contentDeclare", key: "NEIRONGBIAOTAI", components: [ "contentDeclare" ] },
        { label: "封⾯表态", name: "cover", key: "FENGMIANBIAOTAI", components: ['cover'] },
        { label: "审批附件", name: "attachment", key: "SHENPIFUJIAN", components: ['attachment'] },
        { label: "审批记录", name: "record", key: "SHENPIFUJIAN", components: ['record'] }
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
    async getBbasicInfo(type=null){
      const {query} = this.$route;
      const { requirementAekoId =''} = query;
      const { aekoInfo={} } = this;
      await getAekoDetail({requirementAekoId}).then((res)=>{
        const {code,data={}} = res;
        if(code == 200){
          this.aekoInfo = {...aekoInfo,...data};

          if(!type){
            // if (this.isLinie) {
            //   this.currentTab = "contentDeclare"
            // }
            this.tabChange();
          }

         
        }else{
           iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn)
        }
      })
    },

    // 跳转到描述页
    goToDetail(){
       const { aekoInfo } = this;
       const {requirementAekoId,aekoCode} = aekoInfo;
        const routeData = this.$router.resolve({
          path: '/aeko/describe',
          query: {
            requirementAekoId,
            aekoCode,
          },
        })
        window.open(routeData.href, '_blank')
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