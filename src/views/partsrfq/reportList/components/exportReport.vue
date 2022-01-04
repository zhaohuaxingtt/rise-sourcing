<!--
 * @Author: 舒杰
 * @Date: 2021-07-06 13:40:04
 * @LastEditTime: 2021-12-24 15:01:40
 * @LastEditors: caopeng
 * @Description: 导出 报告清单 弹窗
 * @FilePath: \front-sourcing-new\src\views\partsrfq\reportList\components\exportReport.vue
-->
<template>
  <iDialog :visible.sync="value"
           width="90%"
           @close="clearDiolog">
    <div class="flex-between-center margin-right30"
         slot="title">
      <!-- 报告清单 -->
      <span class="pageTitle">{{language('DAOCHU','导出')}}</span>

      <div>
        <iButton @click="remove">{{ language('YICHU','移出' )}}</iButton>
        <!-- 下载 -->
        <iButton @click="down">{{ $t('LK_XIAZAI') }}</iButton>
      </div>

    </div>
    <div class="content">
      <tableList :tableData="tableListData"
                 :tableTitle="tableTitle"
                 :tableLoading="tableLoading"
                 index
                 @handleSelectionChange="handleSelectionChange">
      </tableList>
    </div>
  </iDialog>
</template>

<script>
import { iDialog, iButton, iMessage } from 'rise'
import tableList from './tableList'
import { specialToolsTitle } from './data'
import resultMessageMixin from '@/utils/resultMessageMixin'
import { downloadFile } from '@/api/file'
import {
  reportRemove,
  reportDownList,
  udDownWithName,
} from '@/api/partsrfq/reportList'
export default {
  mixins: [resultMessageMixin],
  components: {
    iDialog,
    iButton,
    tableList,
  },
  props: {
    value: { type: Boolean, default: false },
    tableListData: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      tableTitle: specialToolsTitle,
      tableLoading: false,
      selectData: [],
    }
  },
  created() {},
  methods: {
    handleSelectionChange(list) {
      this.selectData = list
    },
    clearDiolog() {
      this.$emit('input', false)
    },
    down() {
      if (this.selectData.length == 0) {
        iMessage.error(this.$t('TPZS.CANNOTSELECT'))
        return
      }
      let fileIds = []
      this.selectData.map((item) => {
        fileIds.push(item.downloadUrl)
      })
      const req = {
        fileName: 'rise.zip',
        fileIds: [fileIds],
      }
      udDownWithName(req)
    },
    remove() {
      if (this.selectData.length == 0) {
        iMessage.error(this.$t('TPZS.CANNOTSELECT'))
        return
      }
      const req = {
        ids: this.selectData.map((res) => res.id),
      }
      reportRemove(req).then((res) => {
        if (res && res.code == 200) {
          iMessage.success(res.desZh)
          this.$parent.$parent.getDownTable()
        } else {
          iMessage.error(res.desZh)
        }
      })
    },
  },
}
</script>

<style scoped lang="scss">
.content {
  padding-bottom: 20px;
}
</style>
