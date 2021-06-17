<template>
  <div>
    <div class="header">
      <div>
        车型包名称
        <iInput v-model="a" :placeholder="$t('LK_RFQPLEASEENTERQUERY')" maxlength="6">
          <i slot="suffix" class="el-input__icon el-icon-search"></i>
        </iInput>
      </div>
      <iButton slot="reference" icon="el-icon-circle-plus-outline" type="primary">新增车型项目</iButton>
    </div>
    <div class="content">
      w
    </div>
  </div>
</template>

<script>
import {iInput, iButton} from 'rise'
export default {
  name: "commonSourcing",
  components: {
    iInput,
    iButton
  },
  data(){
    return {
      a: ''
    }
  },

}
</script>

<style lang="scss" scoped>
.header{
  font-size: 16px;
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  ::v-deep .el-input{
    width: 220px;
    margin-left: 40px;
  }
  ::v-deep .el-button--primary{
    font-size: 16px;
    color: #1660F1;
    background-color: #EEF2FB;
    border-color: #EEF2FB;
  }
}
</style>