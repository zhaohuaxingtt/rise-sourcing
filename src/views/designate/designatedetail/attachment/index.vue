<!--
 * @Author: haojiang
 * @Date: 2021-05-27 09:42:07
 * @LastEditTime: 2021-04-19 17:15:37
 * @LastEditors: Please set LastEditors
 * @Description: 决策资料 - 附件
-->
<template>
  <div class="designate-attachment">
      <!-- 附件列表 -->
      <attachment />
      <!-- RS Sheet -->
      <rssheet v-if="showRsSheet" />
  </div>
</template>
<script>

import attachment from "./components/attachment";
import rssheet from "./components/rssheet";

export default {
  computed: {
    // 若为备案类型定点申请，则显示线下RS单上传卡片
    showRsSheet() {
      const nominationType = this.$store.getters.nominationType
      const queryNomiType = this.$route.query.designateType
      const show = nominationType === 'RECORD' && queryNomiType === 'RECORD'
      return true
    }
  },
  data() {
    return {
      sortVisibal: false,
      uploadVisibal: false
    }
  },
  components: {
    attachment,
    rssheet
  }
}
</script>
