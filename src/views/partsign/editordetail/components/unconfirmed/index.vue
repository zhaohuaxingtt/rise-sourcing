<template>
  <div class="usage">
    <div class="header clearFloat">
      <span class="title">待确认版本</span>
      <div class="control">
        <iButton>同意</iButton>
        <iButton>拒绝</iButton>
      </div>
    </div>
    <div class="body margin-top27">
      <tablelist class="table" :tableData="tableListData" :tableTitle="tableTitle" :loading="loading"></tablelist>
    </div>
    <div class="footer margin-top30">
      <div class="control">
        <iButton>导出</iButton>
      </div>
    </div>
  </div>
</template>

<script>
import { iButton } from '@/components'
import tablelist from './components/tablelist'
import { tableTitle } from './components/data'
import { getUnconfirmed } from '@/api/partsign/editordetail'

export default {
  components: { tablelist, iButton },
  data() {
    return {
      tableTitle,
      tableListData: [],
      loading: false
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
    version() {
      window.open('/#/version', '_blank', 'width=900,height=600,menubar=no,toolbar=no,status=no,scrollbars=yes')
    }
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
}
</style>