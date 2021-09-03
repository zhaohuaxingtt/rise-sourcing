<template>
  <div>
    <i-input v-if="isEdit&&!row.isDelete" v-model="row.partNameZh"  :placeholder="$t('partsignLanguage.QingShuRu')"></i-input>
    <span v-else>{{row.partNameZh}}</span>
  </div>
</template>
<script>
import {
  iInput
} from 'rise'
export default {
  name: "CustomDescriptionComponents",
  props:{
    row: { type: Object, require: true },
    isEdit: { type: Boolean, require: true, default: false }
  },
  components:{
    iInput,
  },
}
</script>

<style scoped>

</style>