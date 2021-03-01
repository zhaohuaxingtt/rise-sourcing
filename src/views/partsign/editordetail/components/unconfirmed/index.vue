<template>
  <div class="usage">
    <div class="header clearFloat">
      <span class="title">待确认版本</span>
      <div class="control">
        <iButton>同意</iButton>
        <iButton @click="visible = true">拒绝</iButton>
      </div>
    </div>
    <div class="body margin-top27">
      <tablelist class="table" index :tableData="tableListData" :tableTitle="tableTitle" :tableLoading="loading"></tablelist>
    </div>
    <div class="footer margin-top30">
      <div class="control">
        <iButton>导出</iButton>
      </div>
    </div>
    <backItems class="backItems" v-model="visible" title="拒绝" @sure="refuseSure" />
  </div>
</template>

<script>
import { iButton } from '@/components'
import tablelist from '@/views/partsign/home/components/tablelist'
import { tableTitle } from './components/data'
import backItems from '@/views/partsign/home/components/backItems'
import { getUnconfirmed } from '@/api/partsign/editordetail'

export default {
  components: { tablelist, iButton, backItems },
  data() {
    return {
      tableTitle,
      tableListData: [],
      loading: false,
      visible: false
    }
  },
  created() {
    this.getUnconfirmed()
  },
  methods: {
    getUnconfirmed() {
      this.loading = true
      getUnconfirmed({})
        .then(res => {
          this.tableListData = res.data
          this.loading = false
          this.$emit('after-get-unconfirmed', !!this.tableListData.length)
        })
        .catch(() => this.loading = false)
    },
    refuseSure() {}
  }
}
</script>

<style lang="scss" scoped>
.usage {
  .header {
    position: relative;

    .title {
      font-size: 18px;
      font-weight: bold;
      color: #001847;
    }

    .control {
      position: absolute;
      top: 50%;
      right: 0;
      transform: translate(0, -50%);
    }
  }

 .body {
    .pagination {
      margin-top: 30px;
    }
  }

  .footer {
    .control {
      text-align: right;
    }
  }

  .backItems {
    ::v-deep .el-dialog {
      width: 878px!important;

      .el-dialog__body {
        // padding-top: 0;
        // padding-bottom: 0;
      }

      textarea {
        height: 274px!important;
      }
    }
  }
}
</style>