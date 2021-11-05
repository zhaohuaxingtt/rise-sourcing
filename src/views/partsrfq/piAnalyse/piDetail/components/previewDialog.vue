<!--
 * @Author: your name
 * @Date: 2021-10-12 21:45:35
 * @LastEditTime: 2021-10-27 15:14:22
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\views\partsrfq\piAnalyse\piDetail\components\previewDialog.vue
-->
<template>
  <iDialog :visible.sync="value"
           width="95%"
           @close="clearDiolog">
    <piPreview v-bind="$attrs"></piPreview>
  </iDialog>
</template>

<script>
import { iDialog } from 'rise';
import piPreview from './piPreview'

export default {
  props: {
    value: { type: Boolean },
  },
  components: {
    iDialog,
    piPreview
  },
  data () {
    return {
    };
  },
  mounted () {
  },
  methods: {
    clearDiolog () {
      this.$emit('input', false);
    }
  },
};
</script>

<style scoped lang="scss">
#content {
  padding: 20px;
  .title {
    font-size: 22px;
    font-weight: bold;
    color: #000000;
  }

  .chartBox {
    display: flex;
    justify-content: space-between;
    height: 573px;

    .lineBox {
      width: 69%;
      height: 100%;
    }

    .pieBox {
      width: 30%;
      height: 100%;
    }
  }
}
</style>
