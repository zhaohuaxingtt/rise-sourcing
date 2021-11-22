<!--
 * @Author: YoHo
 * @Date: 2021-10-27 19:30:16
 * @LastEditTime: 2021-11-22 16:30:29
 * @LastEditors: YoHo
 * @Description: 
-->
<template>
  <div>
    <!-- 基础信息 -->
    <iCard :title="language('LK_JICHUXINXI','基础信息')">
      <iFormGroup row="4" class="basic-form" label-width="100px">
          <template v-for="(item,index) in basicTitle">
            <iFormItem v-permission.dynamic="item.permissionKey" :key="'basicInfo_'+index" :label="language(item.labelKey,item.label)+':'"  >
              <iText v-if="item.isObj">{{aekoInfo[item.props] && aekoInfo[item.props]['desc']}}</iText>
              <iText v-else >{{aekoInfo[item.props] || '-'}}</iText>
            </iFormItem>
          </template>
      </iFormGroup>
    </iCard>
    <iTabsList class="aekodetail-tabs margin-top20" type="card" v-model="currentTab" @tab-click="tabChange">
      <!-- language(tab.key, tab.label) -->
      <el-tab-pane lazy v-for="(tab, $tabIndex) in tabs" :key="$tabIndex" :label="tab.label" :name="tab.name" v-permission.dynamic="tab.permissionKey">
        <span slot="label">{{tab.label}}<icon v-if="tab.isAlarm" symbol name="iconbaojiadan-youfujian" class="icon-alarm" ></icon></span>
        <template v-if="currentTab==tab.name">
          <component :ref="tab.name" :is="component" v-for="(component, $componentIndex) in tab.components" :class="$componentIndex !== 0 ? 'margin-top20' : ''" :key="$componentIndex" :aekoInfo="aekoInfo" @getBbasicInfo="getBbasicInfo"/>
        </template>
      </el-tab-pane>
    </iTabsList>
  </div>
</template>

<script>
import { 
  iTabsList,
  iCard,
  iFormGroup,
  iFormItem,
  iText,
  icon,
  iMessage,
 } from "rise"
import contentDeclare from "./contentDeclare"
import partsList from "./partsList"
import cover from "./cover"
import attachment from "./attachment"
import record from "./record"
import { permissionArray } from "@/utils"
import { cloneDeep } from "lodash"

import {
  getAekoDetail,
} from '@/api/aeko/detail'
import {
  aekoAuditSupplementalresult,
} from '@/api/aeko/detail/approveRecord'
import { roleMixins } from "@/utils/roleMixins";

export default {
  mixins: [roleMixins],
  components: { 
    iTabsList, 
    contentDeclare,
    iCard,
    icon,
    iFormGroup,
    iFormItem,
    iText,
    partsList,
    cover,
    attachment,
    record,
  },
  async created() {
    const roleList = this.roleList;
    this.isAekoManager = roleList.includes('AEKOGLY'); // AKEO管理员
    this.isCommodityCoordinator = roleList.includes('AEKOXTY'); // Aeko科室协调员
    this.isLinie = roleList.includes('LINIE') || roleList.includes('ZYCGY'); // 专业采购员

    // 判断下多角色情况 若多角色时就判断url的跳转来源
    const {query} = this.$route;
    const {from=''} = query;
    const {auditType=''} = query;
    const roleArr = [this.isAekoManager,this.isCommodityCoordinator,this.isLinie].filter((item)=>item == true);
    if(roleArr.length > 1){
        if(from == 'manage'){
            this.isLinie = false;
            this.tabs = this.tabs.filter((item)=>item.key != 'NEIRONGBIAOTAI');
        }else if(from == 'stance'){
            this.isAekoManager = false;
            this.isCommodityCoordinator = false;
        }
    }

    this.aekoInfo = {
      requirementAekoId: this.$route.query.requirementAekoId
    }


    // 若从AEKO查看跳转过来的默认进入封面表态
    if(from == 'check'){
      this.currentTab ='cover';
      this.isLinie = true;
      this.isAekoManager = false;
      this.isCommodityCoordinator = false;
    }
    
    // 如果是linie的话 再从新排下序 将内容表态和封面表态放在前面
    if(this.isLinie){
      let newTabs = cloneDeep(this.tabs);
      newTabs.sort((a,b)=>{
        return (a.index - b.index)
      })

      if(from != 'check'){
        this.tabs = newTabs;
        this.currentTab = 'contentDeclare';
      }
    }

    
    
    if (sessionStorage.getItem(`aekoConatentDeclareParams_${ this.$route.query.requirementAekoId }`)) {
      try {
        const aekoConatentDeclareParams = JSON.parse(sessionStorage.getItem(`aekoConatentDeclareParams_${ this.$route.query.requirementAekoId }`))
        this.currentTab = aekoConatentDeclareParams.currentTab
      } catch(e) {
        console.error(e)
      }
    }
    // 通过permissionKey(权限)字段过滤tabs
    this.tabs = permissionArray("permissionKey", this.tabs)
    
    await this.getBbasicInfo(null,'aekodetailPage');  // 申请详情页内嵌部分判断显示哪个tab页
    if(this.aekoInfo.coverStatusDesc==="补充材料"){
      this.currentTab ='record';
    }else if(auditType&&auditType==1||auditType==2){ //封面表态
      this.currentTab ='cover';
    }else if(auditType&&auditType==3){  // 内容表态
      this.currentTab ='contentDeclare';
    }

    // 从AEKO管理进来的 TAB过滤调审批记录
    if(from == 'manage'){
      let newTabs = cloneDeep(this.tabs);
      newTabs = newTabs.filter((item)=>item.name!=='record');
      this.tabs = newTabs;
    }

    // 从AEKO跳转查看跳转过来的 tab不需要展示审批附件
    if(from =='check'){
      let newTabs = cloneDeep(this.tabs);
      newTabs = newTabs.filter((item)=>item.name!=='attachment');
      // 按查看顺序排下序
      newTabs.sort((a,b)=>{
        return (a.checkIndex - b.checkIndex)
      })
      this.tabs = newTabs;
    }

    
  },
  mounted() {
    this.getBbasicInfo();
  },
  computed: {
    //eslint-disable-next-line no-undef
    ...Vuex.mapState({
      permission: state => state.permission,
      userInfo: state => state.permission.userInfo,
    }),
  },
  data() {
    return {
      aekoInfo: {},
      currentTab: "partsList",
      basicTitle:[
        {label:'AEKO状态',labelKey:'LK_AEKOZHUANGTAI',props:'aekoStatusDesc',permissionKey: "AEKO_AEKODETAIL_TEXT_STATUS"},
        {label:'来源',labelKey:'LK_AEKO_LAIYUAN',props:'sourseDesc',permissionKey: "AEKO_AEKODETAIL_TEXT_SOURCE"},
        {label:'创建⽇期',labelKey:'LK_AEKOCHUANGJIANRIQI',props:'createDate',permissionKey: "AEKO_AEKODETAIL_TEXT_CREATE_DATE"},
        {label:'截⽌⽇期',labelKey:'LK_AEKOJIEZHIRIQI',props:'deadLine',permissionKey: "AEKO_AEKODETAIL_TEXT_DUE_DATE"},
      ],
      tabs: [
        { label: "零件清单", name: "partsList", key: "LINGJIANQINGDAN", permissionKey: "AEKO_AEKODETAIL_TAB_PART_LIST", components: ["partsList"],index:3,checkIndex:3, },
        { label: "内容表态", name: "contentDeclare", key: "NEIRONGBIAOTAI", permissionKey: "AEKO_AEKODETAIL_TAB_CONTENT_DECLARE", components: [ "contentDeclare" ],index:1,checkIndex:1,  },
        { label: "封⾯表态", name: "cover", key: "FENGMIANBIAOTAI", permissionKey: "AEKO_AEKODETAIL_TAB_COVER_DECLARE", components: ['cover'],index:2 ,checkIndex:2},
        { label: "审批附件", name: "attachment", key: "SHENPIFUJIAN", permissionKey: "AEKO_AEKODETAIL_TAB_APPROVE_ATTACHMENT", components: ['attachment'],index:4 },
        { label: "审批记录", name: "record", key: "SHENPIFUJIAN", permissionKey: "AEKO_AEKODETAIL_TAB_APPROVE_RECORD", components: ['record'],index:5,checkIndex:4  }
      ],
      isAekoManager: false,
      isCommodityCoordinator: false,
      isLinie: false
    }
  },
  methods: {
    /**
     * @description: 审批记录选项卡，有审批记录或补充材料的，选项卡要做红点标识
     * @param {*}
     * @return {*}
     */    
    checkAttachAlarm() {
      const params = {
        linieId: this.userInfo.id || '',
        manageId: this.aekoInfo.aekoManageId || '',
      }
      const record = this.tabs.find(o => o.name === 'record') || {}
      aekoAuditSupplementalresult(params).then(res => {
        this.$set(record, 'isAlarm', res.code === '200' && res.data)
      })
    },
    // 页签切换
    tabChange() {
      this.$nextTick(() => {
        const component = this.$refs[this.currentTab][0]
        if (typeof component.init === "function") component.init()
      })
    },
    // 获取基础信息
    async getBbasicInfo(type=null, page=''){
      const {query} = this.$route;
      const { requirementAekoId =''} = query;
      const { aekoInfo={} } = this;
      await getAekoDetail({requirementAekoId}).then((res)=>{
        const {code,data={}} = res;
        if(code == 200){
          this.aekoInfo = {...aekoInfo,...data};
          if(page!='aekodetailPage'){
            this.$emit('setAekoInfo',this.aekoInfo)
            if(!type){
              // if (this.isLinie) {
              //   this.currentTab = "contentDeclare"
              // }
              this.tabChange();
            }
            // 审批记录选项卡，有审批记录或补充材料的，选项卡要做红点标识
            this.checkAttachAlarm();
          }         
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
    ::v-deep.el-form-item{
      margin-bottom: 0;
    }
  }
  .aekodetail-tabs {
    ::v-deep.el-tabs__item {
      position: relative;
      .icon-alarm {
        display: block;
        position: absolute;
        right: 1px;
        top: 1px;
      }
    }
  }
}
</style>