<!--
 * @Author: haojiang
 * @Date: 2021-05-27 09:42:07
 * @LastEditTime: 2021-09-07 16:40:13
 * @LastEditors: Hao,Jiang
 * @Description: 决策资料 - 附件
-->
<template>
  <div class="designate-attachment" v-permission.auto="SOURCING_NOMINATION_ATTATCH_ATTACHMENT|决策资料-attachment">
      <!-- 附件列表 -->
      <attachment :type="type" v-permission.auto="SOURCING_NOMINATION_ATTATCH_ATTACHMENT_ATTACHMENT_FIRSTTABLE|attachment" />
      <!-- RS Sheet -->
      <rssheet :type="type" v-permission.auto="SOURCING_NOMINATION_ATTATCH_ATTACHMENT_RSSHEET|rssheet" />
      <!-- v-if="showRsSheet"  -->
      <!-- mtzAttachment -->
      <mtzAttachment :type="type" v-permission.auto="SOURCING_NOMINATION_ATTATCH_ATTACHMENT_MTZ|mtzAttachment" />

  </div>
</template>
<script>

import attachment from "./components/attachment";
import rssheet from "./components/rssheet";
import mtzAttachment from "./components/mtzAttachment";

export default {
  computed: {
    // 若为备案类型定点申请，则显示线下RS单上传卡片
    showRsSheet() {
      const nominationType = this.$store.getters.nominationType
      const queryNomiType = this.$route.query.designateType
      const show = nominationType === 'RECORD' && queryNomiType === 'RECORD'
      return show
    }
  },
  props:{
    type: { type: String, default: '' },
  },
  data() {
    return {
      sortVisibal: false,
      uploadVisibal: false
    }
  },
  components: {
    attachment,
    rssheet,
    mtzAttachment
  }
}
</script>
