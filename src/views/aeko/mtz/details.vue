<!--
 * @Autor: Hao,Jiang
 * @Date: 2021-10-29 10:26:18
 * @LastEditors: Hao,Jiang
 * @LastEditTime: 2021-11-03 17:50:52
 * @Description: 
-->
<template>
  <div class="aeko-mtz" >
    <!-- 表格 -->
    <iCard class="aeko-mtz-table">
      <div class="floatright margin-bottom15">
        <iButton
          @click="resetAekoMtz"
        >
          {{ language('REST', '重置') }}
        </iButton>
        <iButton
          @click="copyAekoMtz"
        >
          {{ language('LK_COPY', '复制') }}
        </iButton>
        <iButton
          @click="removeAekoMtz"
        >
          {{ language('SHANCHU', '删除') }}
        </iButton>
        <iButton
          @click="saveAekoMtz"
        >
          {{ language('BAOCUN', '保存') }}
        </iButton>
      </div>
      <tablelist
        height="400"
        index
        :selection="true"
        :tableData="tableListData"
        :tableTitle="tableTitle"
        :tableLoading="tableLoading"
        :lang="true"
        v-loading="tableLoading"
        @handleSelectionChange="handleSelectionChange"
      >
      <template #dosageChange="scope">
        <iInput
          v-model="scope.row.dosageChange"
          @change="formatDosChangeNum(scope.row)"
          :placeholder="language('LK_QINGSHURU','请输入')"
        ></iInput>
        <!-- <span>{{scope.row.dosageChange}}</span> -->
      </template>
      <template #newStartDate="scope">
        <span :class="{validateStartError: scope.row.validateStartError}">
          <iDatePicker 
              v-model="scope.row.newStartDate" 
              format="yyyy-MM-dd" 
              value-format="yyyy-MM-dd"
              :clearable="false"
              @focus="clearValidateError"
              @change="validateDueDateInput(scope.row)"
              :picker-options="pickerOptions"
          />
          <!-- <span>{{scope.row.newStartDate}}</span> -->
        </span>
      </template>
      <template #newEndDate="scope">
        <span :class="{validateEndError: scope.row.validateEndError}">
          <iDatePicker 
              v-model="scope.row.newEndDate" 
              format="yyyy-MM-dd" 
              value-format="yyyy-MM-dd"
              :clearable="false"
              @focus="clearValidateError"
              @change="validateDueDateInput(scope.row)"
              :picker-options="pickerOptions"
          />
          <!-- <span>{{scope.row.newEndDate}}</span> -->
        </span>
      </template>
      </tablelist>
      <div class="pagination">
        <iPagination v-update
          class="pagination"
          @size-change="handleSizeChange($event, getFetchData)"
          @current-change="handleCurrentChange($event, getFetchData)"
          background
          :current-page="page.currPage"
          :page-sizes="page.pageSizes"
          :page-size="page.pageSize"
          :layout="page.layout"
          :total="page.totalCount" />
      </div>
    </iCard>
  </div>
</template>

<script>
import {tableTitle} from './components/data'
import tablelist from 'rise/web/components/iFile/tableList'; 
import {iCard, iButton, iPagination, iInput, iDatePicker, iMessage} from 'rise'
import { pageMixins } from '@/utils/pageMixins'
// 解释附件、审批附件查询，审批附件带taskId
import {
  pageAekoMtz,
  resetAekoMtz,
  saveAekoMtz,
  removeAekoMtz
} from '@/api/aeko/mtz'

export default {
  mixins: [pageMixins],
  components: {
    iCard,
    iButton,
    iInput,
    iDatePicker,
    iPagination,
    tablelist
  },
  data() {
    return {
      tableTitle,
      tableListData: [],
      tableLoading: false,
      selectTableData: [],
      minStartDate: '',
      maxEndDate: '',
      pickerOption: null,
    }
  },
  mounted() {
    this.getFetchData()
  },
  methods: {
    formatDosChangeNum(row) {
      const dosageChange = row.dosageChange
      const decimal = String(dosageChange).split('.')[1] || ''
      const decimalLength = decimal.length > 6 ? 6 : decimal.length
      if (decimal) {
        this.$set(row, 'dosageChange', Number(dosageChange).toFixed(decimalLength))
      }
    },
    clearValidateError() {
      this.tableListData.map(o => {
        delete o.validateEndError
        delete o.validateStartError
        return o
      })
    },
    validateDueDateInput(row) {
      let state = true
      let errorInfo = ''

      // 清除错误信息
      this.clearValidateError()

      if (state && !row.newStartDate) {
        state = false
        errorInfo = this.language('XINYOUXIAOQIKAISHISHIJIANBITIAN', '新有效期开始时间不能为空')
        this.$set(row, 'validateStartError', true)
      }
      if (state && !row.newEndDate) {
        state = false
        errorInfo = this.language('XINYOUXIAOQIJIESHUJIANBITIAN', '新有效期开始时间结束时间不能为空')
        this.$set(row, 'validateEndError', true)
      }
      if (state && row.newEndDate < row.newStartDate) {
        state = false
        errorInfo = this.language('XINYOUXIAOQIKAISHIWANYUJIESU', '新有效期结束时间不能早于开始时间')
        this.$set(row, 'validateStartError', true)
        this.$set(row, 'validateEndError', true)
      }
      if (state && row.newStartDate > row.newEndDate) {
        state = false
        errorInfo = this.language('XINYOUXIAOQIKAISHIWANYUJIESU', '新有效期开始时间不能晚于结束时间')
        this.$set(row, 'validateStartError', true)
        this.$set(row, 'validateEndError', true)
      }
      let dataList = window._.cloneDeep(this.tableListData)
      // 根据开始日期排序
      dataList = window._.sortBy(dataList, 'newStartDate')
      // 上一次结束时间
      let parEndId = dataList.length && dataList[0] && dataList[0].id
      let parEndDate = dataList.length && dataList[0] && dataList[0].newEndDate
      // 根据日期从小到大排序，校验是否出现每一行数据开始时间小于上一行结束时间的记录
      dataList.forEach((item) => {
        console.log(item.id, item.newStartDate, parEndId, parEndDate)
        // 时间段重叠
        if (state && parEndId !== item.id && item.newStartDate < parEndDate) {
          state = false
          errorInfo = this.language('LINGJIANSHIJIANDUANCONGDIECUOWU','所填零件行项目有时间段重叠,请修改')
          const parItem = this.tableListData.find(o => o.id === parEndId)
          const curItem = this.tableListData.find(o => o.id === item.id)
          this.$set(parItem, 'validateEndError', true)
          this.$set(curItem, 'validateStartError', true)
        }
        // 记录上一次
        parEndId = item.id
        parEndDate = item.newEndDate
        
      })
      if (!state) {
        console.log(errorInfo)
        iMessage.error(errorInfo)
      }
      console.log(this.tableListData, dataList, row)
      return {
        state,
        errorInfo
      }
    },
    handleSelectionChange(val) {
      this.selectTableData = val
    },
    onSearch() {
      this.page.currPage = 1
      this.getFetchData()
    },
    /**
     * @description: 获取数据列表
     * @param {*}
     * @return {*}
     */    
    getFetchData() {
      const parmas = {
        objectAekoPartId: this.$route.query.objectAekoPartId || '',
        current: this.page.currPage,
        size: this.page.pageSize
      }
      if (!parmas.objectAekoPartId) {
        this.$message.error(this.language('LK_OBJECTAEKOPARTIDBUNENGWEIKONG', 'objectAekoPartId不能为空'));
        return
      }
      this.tableLoading = true
      pageAekoMtz(parmas).then(res => {
        if (res.code === '200') {
          this.tableListData = (res.data && res.data.records || [])
          this.page.totalCount = res.data.total
          // 抽取截止时间范围
          const dataLine0 = this.tableListData[0]
          this.maxEndDate = dataLine0.maxEndDate
          this.minStartDate = dataLine0.minStartDate
          if (dataLine0 && dataLine0.maxEndDate && dataLine0.minStartDate) {
            console.log(this.maxEndDate, this.minStartDate)
            this.pickerOptions = {
              disabledDate: (time) =>{
                return time.getTime() < new Date(this.minStartDate).getTime() || time.getTime() > new Date(this.maxEndDate).getTime();
              }
            }
          }
        } else {
          this.tableListData = []
          this.$message.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn);
        }
        this.tableLoading = false
      }).catch(e => {
        this.tableLoading = false
        this.$message.error(this.$i18n.locale === "zh" ? e.desZh : e.desEn);
      }).finally(() => {
        this.tableLoading = false
      })
    },
    copyAekoMtz() {
      if (!this.selectTableData.length) {
        iMessage.warn(this.language('QINGXUANZEZHISHAOYITIAOSHUJU', '请选择至少一条数据'))
        return
      }
      const copyData = window._.cloneDeep(this.selectTableData).map(o => {
        o.isNew = true
        return o
      })
      this.tableListData = this.tableListData.concat(copyData)
    },
    /**
     * @description: 重置
     * @param {*}
     * @return {*}
     */    
    async resetAekoMtz() {
      const confirmInfo = await this.$confirm(this.language('resetSure','您确定要重置吗？'))
      if (confirmInfo !== 'confirm') return
      try {
        const res = await resetAekoMtz({objectAekoPartId: this.$route.query.objectAekoPartId})
        if (res.code === '200') {
          iMessage.success(this.language('LK_CAOZUOCHENGGONG','操作成功'))
          this.getFetchData()
        } else {
          iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn)
        }
      } catch (e) {
        iMessage.error(this.$i18n.locale === "zh" ? e.desZh : e.desEn)
      }
    },
    /**
     * @description: 移除
     * @param {*}
     * @return {*}
     */    
    async removeAekoMtz() {
      if (!this.selectTableData.length) {
        iMessage.warn(this.language('QINGXUANZEZHISHAOYITIAOSHUJU', '请选择至少一条数据'))
        return
      }
      const confirmInfo = await this.$confirm(this.language('deleteSure','您确定要执行删除操作吗？'))
      if (confirmInfo !== 'confirm') return
      // 删除新增的项目
      const copyDataIds = this.selectTableData.filter(o => o.isNew).map(o => o.objectAekoPartId)
      if (copyDataIds.length) {
        copyDataIds.forEach(item => {
          const targetIndex = this.tableListData.findIndex(o => o.id === item && o.isNew)
          this.tableListData.splice(targetIndex, 1)
        })
        return
      }
      // 删除选中的老数据
      const idList = this.selectTableData.filter(o => !o.isNew).map(o => Number(o.id))
      try {
        const res = await removeAekoMtz(idList)
        if (res.code === '200') {
          iMessage.success(this.language('LK_CAOZUOCHENGGONG','操作成功'))
          this.getFetchData()
        } else {
          iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn)
        }
      } catch (e) {
        iMessage.error(this.$i18n.locale === "zh" ? e.desZh : e.desEn)
      }
    },
    async saveAekoMtz() {
      if (!this.selectTableData.length) {
        iMessage.warn(this.language('QINGXUANZEZHISHAOYITIAOSHUJU', '请选择至少一条数据'))
        return
      }
      // 校验每一行数据是否合法
      let state = true
      let errorInfo = ''
      this.selectTableData.forEach(o => {
        if (state) {
          const validation = this.validateDueDateInput(o) || {}
          state = validation.state
          errorInfo = validation.errorInfo
          console.log(validation)
        }
      })
      if (!state) return

      const confirmInfo = await this.$confirm(this.language('saveSure','您确定要保存吗？'))
      if (confirmInfo !== 'confirm') return
      const paramsList = window._.cloneDeep(this.selectTableData)
      // paramsList.map(o => {
      //   o.newStartDate = String(o.newStartDate).split(' ').length === 1 ? `${o.newStartDate} 00:00:00` : o.newStartDate
      //   o.newEndDate = String(o.newEndDate).split(' ').length === 1 ? `${o.newEndDate} 00:00:00` : o.newEndDate
      //   return o
      // })
      try {
        const res = await saveAekoMtz(paramsList)
        if (res.code === '200') {
          iMessage.success(this.language('LK_CAOZUOCHENGGONG','操作成功'))
          this.getFetchData()
        } else {
          iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn)
        }
      } catch (e) {
        iMessage.error(this.$i18n.locale === "zh" ? e.desZh : e.desEn)
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.aeko-mtz-details {
  .aeko-mtz-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .akeoTitle {
      font-weight: bold;
    }
  }
  .aeko-mtz-submenu {
    display: flex;
    justify-content: space-between;
    align-items: center
  }
  .aeko-mtz-table {
    .cardBody {
      padding: 10px;
    }
  }
}
.icon {
  svg {
    font-size: 28px;
  }
}
.validateStartError,.validateEndError {
  ::v-deep.el-input {
    .el-input__inner {
      border: 1px solid #e30d0d;
    }
  }
}
</style>