<!--
 * @Author: wentliao
 * @Date: 2021-05-11 16:31:08
 * @Description: 
-->
<template>
  <div>
    <iTabsList class="margin-top20" type='card' @tab-click="handleTabClick" >
      <el-tab-pane lazy :label="language(item.keystring,item.label)" v-for="item of tabList" :key="item.label" v-permisstion='item.permissionKey'>
        <component :is="item.component" v-if="activityTabIndex === item.index"/>
      </el-tab-pane>
    </iTabsList>
  </div>
</template>

<script>
import {iTabsList} from "rise";
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
      activityTabIndex: '0',
      tabList: [
        {
          index: '0',
          label: '目标价',
          component: 'targetPrice',
          permissionKey: 'PARTSRFQ_EDITORDETAIL_TARGETPRICE_INDEXPAGE',
          keystring: 'LK_MUBIAOJIA'
        },
        {
          index: '1',
          label: '参考产量及时间计划',
          component: 'referenceOutput',
          permissionKey: 'PARTSRFQ_EDITORDETAIL_RFQDETAILINFO_TIMEPLAN_INDEXPAGE',
          keystring: 'LK_CANKAOCHANLIANGJISHIJIANJIHUA'
        },
        {
          index: '2',
          label: '物流要求',
          component: 'logisticsRequirements',
          permissionKey: 'PARTSRFQ_EDITORDETAIL_RFQDETAILINFO_LOGISTICSREQUIREMENTS_INDEXPAGE',
          keystring: 'LK_WULIUYAOQIU'
        },
        {
          index: '3',
          label: '询价附件',
          component: 'inquiryAttachment',
          permissionKey: 'PARTSRFQ_EDITORDETAIL_RFQDETAILINFO_INQUIRYATTACHMENT_INQUIRYATTACHMENT_INDEXPAGE',
          keystring: 'LK_XUNJIAFUJIAN'
        },
      ]
    }
  },
  methods: {
    handleTabClick(target) {
      this.activityTabIndex = target.index
    }
  }
}
</script>

<style scoped lang="scss">
.mt20 {
  margin-top: 20px;
}


</style>