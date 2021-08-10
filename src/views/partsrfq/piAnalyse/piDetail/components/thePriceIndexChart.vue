<template>
  <div>
    <div class="header-box">
      <div class="title">
        {{ language('PI.PIJIAGEFENXI', 'Price Index价格分析') }}
        <iconTips
            iconName="iconxinxitishi"
            :tipContent="language('PI.PIINDEXTISHI', '图中波动均为加权平均波动')"
            :iconStyle="{'fontSize': '12px'}"
            class="margin-left10"
        />
      </div>
    </div>
  </div>
</template>

<script>
import iconTips from '../../../../../components/ws3/iconTips'
export default {
  components: {
    iconTips
  }
};
</script>

<style scoped lang="scss">
.header-box {
  font-size: 16px;
  font-weight: bold;
  color: #000000;
  .title{
    display: flex;
    align-items: center;
  }
}
</style>
