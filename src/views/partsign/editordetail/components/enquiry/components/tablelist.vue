<template>
  <el-table class="table" :data="tableData" v-loading="loading">
    <el-table-column type="selection" align="center"></el-table-column>
    <el-table-column type="index" align="center" label="#"></el-table-column>
    <template v-for="(item, $index) in tableTitle">
      <el-table-column :key="$index" align="center" :label="item.name" :prop="item.prop">
        <template>
          <div class="operation" v-if="item.prop === 'operation'">
            <span class="link">预览</span>
            <span class="link">下载</span>
            <span class="link" @click="log">查看日志</span>
          </div>
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
      this.$emit('log')
      // window.open('/#/log', '_blank', 'width=900,height=600,menubar=no,toolbar=no,status=no,scrollbars=yes')
    }
  }
}
</script>

<style lang="scss" scoped>
.table {
  .operation {
    .link + .link {
      margin-left: 44px;
    }
  }
}
</style>