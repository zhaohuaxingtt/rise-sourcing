<!--
 * @Author: wentliao
 * @Date: 2021-08-25 09:56:39
 * @Description: 
-->
<template>
  <!-- 样件费 -->
  <iCard class="sampleFee">
    <template #header>
        <div class="header">
          <div>
            <span class="title">{{ language('LK_DAMAGES_SAMPLEFEE_YANGJIANFEI','样件费') }}</span>
          </div>
          <div class="control">
            <iButton @click="save">{{language('LK_BAOCUN','保存')}}</iButton>
          </div>
        </div>
      </template>
  </iCard>
</template>

<script>
import {
  iCard,
  iButton,
} from 'rise'
export default {
  components:{
    iCard,
    iButton,
  }
}
</script>

<style lang="scss" scoped>
  .sampleFee{
    .header {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;

      .title {
        height: 25px;
        line-height: 25px;
        font-size: 18px;
        font-weight: bold;
        color: #131523;
      }
    }
  }
</style>