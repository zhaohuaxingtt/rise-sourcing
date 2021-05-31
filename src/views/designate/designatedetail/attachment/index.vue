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
      <rssheet />
  </div>
</template>
<script>

import attachment from "./components/attachment";
import rssheet from "./components/rssheet";

export default {
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
