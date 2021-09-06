<template>
  <div>
    <el-tooltip class='item' effect='light' placement='bottom'>
      <div  slot="content" style="width: 200px">{{ row['contractRemark'] != null ? row['contractRemark'] : '原因不详'}}</div>
      <span>
              <icon class='el-icon-warning-outline icon_color' />
              {{ myContractStatus }}
      </span>
    </el-tooltip>
  </div>
</template>

<script>
export default {
  name: 'ContractStatusComponents',
  props: {
    contractStatus: { type: Array, require: true, default: () => [] },
    row: { type: Object, require: true }
  },
  computed: {
    myContractStatus: function() {

     return this.contractStatus.find((item) => item.code == this.row['contractStatus']).name
    }
  }
}
</script>

<style scoped>
.icon_color{
  color: skyblue;
}
</style>