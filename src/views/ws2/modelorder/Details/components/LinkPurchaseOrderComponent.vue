<template>
  <div>
    <span v-if='isEdit'>{{content}}</span>
    <span class="openLinkText" v-else>{{content}}</span>
  </div>
</template>

<script>
export default {
  name: 'LinkPurchaseOrderComponent',
  props:{
    isEdit: { type: Boolean, require: true, default: false },
    content:{type:String,require: true,default: ''}
  },
}
</script>

<style scoped lang='scss'>
.openLinkText {
  cursor: pointer; //鼠标变手
  color: $color-blue;
}
</style>