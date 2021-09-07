<template>
  <div>
    <iTableCustom ref='testTable' :columns='columns' :data='orderData' :extraData='extraData'
                  @handle-selection-change='handleSelectionChange' @open-page='openPage'
                  :treeExpand='treeExpand'></iTableCustom>

  </div>

</template>

<script>
import iTableCustom from '@/components/iTableCustom'

export default {
  name: 'OrderHomeTableComponents',
  components: {
    iTableCustom,
  },
  props: {
    columns: { type: Array, require: true },
    orderData: { type: Array, require: true },
    extraData: { type: Object, require: true }
  },
  data() {
    return {
      treeExpand: {
        expandKey: 'index',
        childrenKey: 'historyList'
      }
    }
  },
  methods: {
    handleSelectionChange(row) {
      this.$emit('handleSelectionChange', row)

    },
    openPage(row) {
      this.$emit('open-page', row)
    },
    expandAll() {
      this.$refs.testTable.expandAll()
    },
    //收起
    collapseAll() {
      this.$refs.testTable.collapseAll()
    }
  }
}
</script>

<style scoped>

</style>