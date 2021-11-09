<!--
 * @Author: your name
 * @Date: 2021-11-06 14:39:44
 * @LastEditTime: 2021-11-06 14:53:50
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \front-web\src\components\biddingComponents\iLabelML\index.vue
-->
<template>
  <div class="title-header">
    <div class="label">
      <slot name="label"></slot>
    </div>
    <el-popover placement="right" trigger="hover">
      <div class="text-content">
        <slot></slot>
      </div>
      <div class="tip" v-if="showTip" slot="reference">
        <div class="image-box">
          <img src="~@/assets/images/tool-tip.svg" />
        </div>
      </div>
    </el-popover>
  </div>
</template>
<script>
export default {
  props: {
    showTip: {
      type: Boolean,
      default: () => {
        return false;
      },
    },
  },
};
</script>
<style lang="scss" scoped>
.title-header {
  display: flex;
  line-height: 35px;
  .image-box {
    cursor: pointer;
    width: 20px;
    height: 20px;
    margin-left: 2px;
    margin-top: -2px;
    position: relative;
    img {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 50%;
      object-fit: contain;
      /* transform: translateY(2px); */
    }
  }
}
::v-deep .el-icon-question-box {
  display: flex;
  align-items: center !important;
  height: 35px !important;
}
::v-deep .margin-left4 {
  display: none;
}
</style>
