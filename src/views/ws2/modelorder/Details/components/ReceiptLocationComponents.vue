<template>
  <div>
    <i-select v-if='isEdit&&!row.isDelete' v-model='row.inventoryLocation'
              :placeholder="$t('partsignLanguage.QingXuanZe')">
      <el-option v-for='(item, index) in stockLocations' :value='item.inventoryLocation'
                 :label='`${item.inventoryLocation}-${item.description}`' :key='index'></el-option>
    </i-select>
    <span v-else>{{ inventoryLocation }}</span>
  </div>

</template>

<script>
import {
  iSelect
} from 'rise'

export default {
  name: 'ReceiptLocationComponents',
  props: {
    stockLocations: { type: Array, require: true, default: null },
    row: { type: Object, require: true },
    isEdit: { type: Boolean, require: true, default: false }
  },
  computed: {
    inventoryLocation: function() {
      if (null != this.stockLocations && this.stockLocations.length > 0 && this.stockLocations != undefined) {
        let stockLocation = this.stockLocations.find((i) => i.inventoryLocation == this.row.inventoryLocation)
        if (stockLocation != null && stockLocation != undefined) {
          return `${stockLocation.inventoryLocation}-${stockLocation.description}`
        }
        return this.row.inventoryLocation
      }
      return this.row.inventoryLocation
    }
  },
  components: {
    iSelect
  }
}
</script>

<style scoped>

</style>