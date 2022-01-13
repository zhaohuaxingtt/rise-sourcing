<!--
 * @Author: 舒杰
 * @Date: 2021-07-06 13:40:04
 * @LastEditTime: 2022-01-11 16:53:01
 * @LastEditors: caopeng
 * @Description: 导出 报告清单 弹窗
 * @FilePath: \front-sourcing-new\src\views\partsrfq\reportList\components\exportReport.vue
-->
<template>
  <iDialog  :visible.sync="value"
           width="90%"
           @close="clearDiolog">
    <div class="flex-between-center margin-right30"
         slot="title">
      <!-- 报告清单 -->
      <span class="pageTitle">{{language('DAOCHU','导出')}}</span>

      <div>
        <iButton @click="remove">{{ language('YICHU','移出' )}}</iButton>
        <!-- 下载 -->
        <iButton v-loading="btnLoading"
                 @click="down">{{ $t('LK_XIAZAI') }}</iButton>
      </div>

    </div>
    <table-list style="padding-bottom:20px"
                :tableData="tableListData"
                :tableTitle="tableTitle"
                :tableLoading="tableLoading"
                index
                @selectBox="selectBox"
                @handleSelectionAllChange="handleSelectionAllChange"
                @handleSelectionChange="handleSelectionChange"
                ref="regTable">
    </table-list>
  </iDialog>
</template>

<script>
import { iDialog, iButton, iMessage } from 'rise'
import tableList from './tableList'
import { specialToolsTitle } from './data'
import resultMessageMixin from '@/utils/resultMessageMixin'
import { downloadUdFileWithName } from '@/api/file'
import { reportRemove } from '@/api/partsrfq/reportList'
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
      btnLoading: false,
      checkNumber: 10,
    }
  },
  watch: {
    value(val) {
      this.$nextTick(() => {
        this.tableListData.forEach((e, i) => {
          if (i < this.checkNumber) {
            this.$refs.regTable.$refs.table.toggleRowSelection(e, true)
          }
        })
      })
    },
  },
  mounted(){
          this.$nextTick(() => {
        this.tableListData.forEach((e, i) => {
          if (i < this.checkNumber) {
            this.$refs.regTable.$refs.table.toggleRowSelection(e, true)
          }
        })
      })
  },
  methods: {
    selectBox(val) {
      if (val.val.length > this.checkNumber) {
        iMessage.warn(
          this.language(
            'ZUIDUOZHINENGXUANZESHITIAOSHUJU',
            '最多只能选择10条数据'
          )
        )
        this.$refs.regTable.$refs.table.toggleRowSelection(val.row, false)
      }
    },
    handleSelectionAllChange(val) {
      // 过滤当前表格数据
      if (this.selectData.length == this.checkNumber) {
        this.tableListData.forEach((v, index) => {
          // 大于设置的条数，取消选择
          this.$refs.regTable.$refs.table.toggleRowSelection(v, false)
        })
      } else {
        this.tableListData.forEach((v, index) => {
          if (index >= this.checkNumber) {
            // 大于设置的条数，取消选择
            this.$refs.regTable.$refs.table.toggleRowSelection(v, false)
          }
        })
      }
    },

    handleSelectionChange(val) {
      if (val.length > this.checkNumber) {
        this.$refs.regTable.$refs.table.toggleRowSelection(val.row, false)
      } else {
        this.selectData = val
      }
    },
    clearDiolog() {
      this.$emit('input', false)
    },
    async down() {
      this.btnLoading = true
      if (this.selectData.length == 0) {
        iMessage.error(this.$t('TPZS.CANNOTSELECT'))
          this.btnLoading = false
        return
      }
      let fileIds = []
      this.selectData.map((item) => {
        fileIds.push(item.downloadUrl)
      })
      var fileName=''
      console.log(fileIds)
      if(fileIds.length==1){
        fileName=this.selectData[0].downloadName
        console.log(this.selectData)
      }else{
        fileName='rise.zip'
      }
    
      downloadUdFileWithName([fileIds], fileName).then((res) => {
        this.btnLoading = false
      })
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
