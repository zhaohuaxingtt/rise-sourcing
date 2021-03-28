<template>
  <div>
    <iTabsList class="margin-top20" type='border-card' @tab-click="handleTabClick">
      <el-tab-pane :label="item.label" v-for="item of tabList" :key="item.label" v-permisstion='item.permissionKey'>
        <component :is="item.component" v-if="activityTabLabel === item.label"/>
      </el-tab-pane>
    </iTabsList>
  </div>
</template>

<script>
import {iTabsList} from "@/components";
import targetPrice from './components/targetPrice'
import referenceOutput from './components/referenceOutput'
import logisticsRequirements from './components/logisticsRequirements'
import inquiryAttachment from './components/inquiryAttachment'
// import bomList from './components/bom'

export default {
  components: {
    iTabsList,
    targetPrice,
    referenceOutput,
    logisticsRequirements,
    inquiryAttachment,
    //bomList
  },
  data() {
    return {
      editStatus: false,
      activityTabLabel: '目标价',
      tabList: [
        {label: '目标价', component: 'targetPrice',permissionKey:'PARTSRFQ_EDITORDETAIL_TARGETPRICE_INDEXPAGE'},
        {label: '参考产量及时间计划', component: 'referenceOutput',permissionKey:'PARTSRFQ_EDITORDETAIL_RFQDETAILINFO_TIMEPLAN_INDEXPAGE'},
        {label: '物流要求', component: 'logisticsRequirements',permissionKey:'PARTSRFQ_EDITORDETAIL_RFQDETAILINFO_LOGISTICSREQUIREMENTS_INDEXPAGE'},
        {label: '询价附件', component: 'inquiryAttachment',permissionKey:'PARTSRFQ_EDITORDETAIL_RFQDETAILINFO_INQUIRYATTACHMENT_INQUIRYATTACHMENT_INDEXPAGE'},
      ]
    }
  },
  methods: {
    handleTabClick(target) {
      this.activityTabLabel = target.label
    }
  }
}
</script>

<style scoped lang="scss">
.mt20 {
  margin-top: 20px;
}


</style>