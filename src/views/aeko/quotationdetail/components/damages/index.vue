
<template>
  <!-- 终止费 -->
  <iCard class="damages">
      <template #header>
        <div class="header">
          <div>
            <span class="title">{{ language('LK_DAMAGES_ZHONGZHIFEI','终⽌费') }}</span>
          </div>
          <div class="control">
            <iButton @click="save">{{language('LK_BAOCUN','保存')}}</iButton>
          </div>
        </div>
      </template>
      <div class="contain">
        <span class="contain-label">{{ language('LK_DAMAGES_ZHONGZHIFEI','终⽌费') }}:</span>
        <iInput class="contain-input" v-model="value"></iInput>
      </div>
  </iCard>
</template>

<script>
import {
  iCard,
  iButton,
  iInput,
} from 'rise'
export default {
  components:{
    iCard,
    iButton,
    iInput,
  },
  data(){
    return{
      value:'',
    }
  },
}
</script>

<style lang="scss" scoped>
  .damages{
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
    .contain{
      display: flex;
      align-items: center;
      .contain-label{
        flex-shrink: 0;
        margin-right: 30px;
      }
      .contain-input{
        width: 300px;
      }
    }

  }
</style>