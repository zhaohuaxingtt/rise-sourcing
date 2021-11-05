<!--
 * @Author: Luoshuang
 * @Date: 2021-05-26 19:46:16
 * @LastEditors: Luoshuang
 * @LastEditTime: 2021-07-17 01:37:38
 * @Description: 添加附件弹窗
 * @FilePath: \front-web\src\views\accessoryPart\createRfq\components\addFile.vue
-->

<template>
  <iDialog 
    :title="language('TIANJIAFUJIAN','添加附件')"
    :visible.sync="dialogVisible"
    @close="clearDialog"
    width="90%"
    class="addPartsDialog"
  >
    <iSearch @sure="sure" @reset="reset">
      <el-form>
        <el-form-item v-for="(item, index) in searchList" :key="index" :label="language(item.key, item.label)">
          <iSelect v-if="item.type === 'select'" v-model="searchParams[item.value]"></iSelect> 
          <iDatePicker v-else-if="item.type === 'date'" value-format="" v-model="searchParams[item.value]"></iDatePicker>
          <iInput v-else v-model="searchParams[item.value]"></iInput> 
        </el-form-item>
      </el-form>
    </iSearch>
    <div class="margin-bottom20 clearFloat margin-top20">
      <div class="floatright">
        <!--------------------选择按钮----------------------------------->
        <iButton @click="handleSelectPart" >{{language('XUANZE','选择')}}</iButton>
      </div>
    </div>
    <tableList :activeItems='"a1"' selection indexKey :tableData="tableData" :tableTitle="tableTitle" :tableLoading="tableLoading" @handleSelectionChange="handleSelectionChange" @openPage="openPage"></tableList>
    <!------------------------------------------------------------------------>
    <!--                  表格分页                                          --->
    <!------------------------------------------------------------------------>
    <iPagination v-update @size-change="handleSizeChange($event, getTableList)" @current-change="handleCurrentChange($event, getTableList)" background :page-sizes="page.pageSizes"
      :page-size="page.pageSize"
      :layout="page.layout"
      :current-page="page.currPage"
      :total="page.totalCount"
      class="padding-bottom20"
    />
  </iDialog>
</template>

<script>
import { iDialog, iButton, iSelect, iInput, iSearch, iPagination, iDatePicker, iMessage } from 'rise'
import tableList from '@/views/designate/designatedetail/components/tableList'
import { pageMixins } from "@/utils/pageMixins"
import { tableTitle, tableMockData, fileSearchList } from '@/views/designateFiles/fileManage/data'
import { getAffixList } from '@/api/designateFiles/index'

export default {
  mixins: [pageMixins],
  components: { iDialog, iButton, iSelect, iInput, tableList, iSearch, iPagination, iDatePicker },
  props: {
    dialogVisible: { type: Boolean, default: false }
  },
  data() {
    return {
      backType: '',
      backReason: '',
      tableData: tableMockData,
      tableTitle: tableTitle,
      searchList: fileSearchList,
      searchParams: {},
      tableLoading: false
    }
  },
  watch: {
    dialogVisible(val) {
      if (val) {
        this.getTableList()
      }
    }
  },
  methods: {
    reset() {
      this.searchParams = {}
      this.sure()
    },
    sure() {
      this.page.currPage = 1
      this.getTableList()
    },
    /**
     * @Description: 获取表格数据
     * @Author: Luoshuang
     * @param {*}
     * @return {*}
     */    
    getTableList() {
      this.tableLoading = true
      const params = {
        ...this.searchParams,
        current: this.page.currPage,
        size: this.page.pageSize
      }
      getAffixList(params).then(res => {
        if (res?.result) {
          this.tableData = res.data.records
          this.page.currPage = res.data.current
          this.page.pageSize = res.data.size
          this.page.totalCount = res.data.total
        } else {
          this.tableData = []
          iMessage.error(this.$i18n.locale === 'zh' ? res?.desZh : res?.desEn)
        }
      }).finally(() => {
        this.tableLoading = false
      })
    },
    /**
     * @Description: 表格选中事件
     * @Author: Luoshuang
     * @param {*} val 选中的行
     * @return {*}
     */    
    handleSelectionChange(val) {
      this.selectParts = val
    },
    clearDialog() {
      this.$emit('changeVisible', false)
    },
    /**
     * @Description: 点击选择按钮
     * @Author: Luoshuang
     * @param {*}
     * @return {*}
     */    
    handleSelectPart() {
      if (this.selectParts.length < 1) {
        iMessage.warn(this.language('QINGXUANZEFUJIAN','请选择附件'))
        return
      }
      if (this.selectParts.some(item => item.rfqId)) {
        iMessage.warn(this.language('LK_QINGXUANZEWEIFENPEIRFQDEFUJIAN','请选择未分配RFQ的附件'))
        return
      }
      const selectLINIE = uniq(this.selectParts.map(item => item.csfuserId))
      if (selectLINIE.length > 1 || selectLINIE[0] !== this.$route.query.linie) {
        iMessage.warn(this.language('QINGXUANZEXIANGTONGLINIEDEFUJIAN','请选择相同LINIE的附件'))
        return
      } if (!selectLINIE[0]) {
        iMessage.warn(this.language('QINGXUANZEYIFENPEILINIEDEFUJIAN','请选择已分配LINIE的附件'))
        return
      }
      this.$emit('selectPart', this.selectParts.map(item => item.spnrNum))
    },
    /**
     * @Description: 点击SP号跳转事件
     * @Author: Luoshuang
     * @param {*}
     * @return {*}
     */    
    openPage(row) {
      const router =  this.$router.resolve({path: `/sourceinquirypoint/sourcing/partsrfq/editordetail?id=${row.rfqId}`})
      window.open(router.href,'_blank')
    },
  }
}
</script>

<style lang="scss" scoped>
.addPartsDialog {
  .card {
    box-shadow: none;
    border-radius: 0;
    border-bottom: 1px solid rgba(112, 112, 112, .1);
    ::v-deep .cardBody {
      padding-top: 0;
      padding-left: 0;
      padding-right: 0;
    }
  }
  ::v-deep .el-dialog {
    margin-top: 30px !important;
    // height: 90%;
    // .el-dialog__body {
    //   height: calc(100% - 70px);
    //   overflow: auto;
    // }
  }
}
</style>