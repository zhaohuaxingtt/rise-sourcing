<template>
  <div class="btns-txt">
    <span>{{$t('LK_HUOBI')}}：{{$t('LK_RENMINBI')}}</span>
    <span>{{$t('LK_DANWEI')}}：{{$t('LK_YUAN')}}</span>
    <span>{{$t('LK_BUHANSUI')}}</span>
  </div><!-- 货币：人民币  |  单位：元  |  不含税  -->
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.btns-txt{
  font-size: 14px;
  color: #8c98ac;

  span{
    margin-right: 20px;
    position: relative;

    &::after{
      content: '';
      width: 1px;
      height: 18px;
      background-color: #8c98ac;
      position: absolute;
      left: -9px;
      top: 1px;
    }

    &:nth-child(1){
      &::after{
        content: '';
        display: none;
      }
    }
  }
}
</style>