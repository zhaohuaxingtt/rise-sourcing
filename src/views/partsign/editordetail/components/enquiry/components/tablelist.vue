<template>
  <el-table :data="tableData" v-loading="loading">
    <el-table-column type="selection" align="center"></el-table-column>
    <el-table-column type="index"></el-table-column>
    <template v-for="(item, $index) in tableTitle">
      <el-table-column :key="$index" align="center" :label="item.name" :prop="item.prop">
        <template>
          <iButton v-if="item.prop === 'preview'" @click="preview(item)">预览</iButton>
          <iButton v-if="item.prop === 'download'" @click="download(item)">下载</iButton>
          <iButton v-if="item.prop === 'log'" @click="log(item)">查看</iButton>
        </template>
      </el-table-column>
    </template>
  </el-table>
</template>

<script>
import { iButton } from '@/components'

export default {
  components: { iButton },
  props:{
    tableData: { 
      type: Array,
      default: () => ([])
    },
    tableTitle: { 
      type: Array,
      default: () => ([])
    },
    loading: {
      type: Boolean,
      defalut: false
    }
  },
  methods: {
    preview() {},
    download() {},
    log() {
      window.open('/#/log', '_blank', 'width=900,height=600,menubar=no,toolbar=no,status=no,scrollbars=yes')
    }
  }
}
</script>

<style lang="scss" scoped>

</style>