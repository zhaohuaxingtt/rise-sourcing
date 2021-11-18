<!--
 * @Autor: Hao,Jiang
 * @Date: 2021-10-29 10:26:18
 * @LastEditors: Hao,Jiang
 * @LastEditTime: 2021-11-17 13:34:41
 * @Description: 
-->
<template>
  <div class="aeko-mtz" v-permission.auto="MTZ_MODIFY_DETAILS_PAGE|MTZ变更">
    <!-- 表格 -->
    <iCard class="aeko-mtz-table">
      <div class="floatright margin-bottom15" v-if="!disable">
        <iButton
          v-permission.auto="MTZ_MODIFY_DETAILS_BUTTON_RESET|MTZ重置"
          @click="resetAekoMtz"
        >
          {{ language('REST', '重置') }}
        </iButton>
        <iButton
          v-permission.auto="MTZ_MODIFY_DETAILS_BUTTON_COPY|MTZ复制"
          @click="copyAekoMtz"
        >
          {{ language('LK_COPY', '复制') }}
        </iButton>
        <iButton
          v-permission.auto="MTZ_MODIFY_DETAILS_BUTTON_REMOVE|MTZ删除"
          @click="removeAekoMtz"
        >
          {{ language('SHANCHU', '删除') }}
        </iButton>
        <iButton
          v-permission.auto="MTZ_MODIFY_DETAILS_BUTTON_SAVE|MTZ保存"
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
        v-permission.auto="MTZ_MODIFY_DETAILS_TABLE|MTZ变更表格"
        v-loading="tableLoading"
        @handleSelectionChange="handleSelectionChange"
      >
      <template #dosageChange="scope">
        <span :class="{validateDosageChangeError: scope.row.validateDosageChangeError}" v-if="!disable">
          <iInput
            v-model="scope.row.dosageChange"
            @change="formatDosChangeNum(scope.row)"
            :placeholder="language('LK_QINGSHURU','请输入')"
          ></iInput>
        </span>
        <span v-else>{{scope.row.dosageChange}}</span>
      </template>
      <template #newDosage="scope">
        {{calcNewDosage(scope.row)}}
      </template>
      <template #newStartDate="scope">
        <span :class="{validateStartError: scope.row.validateStartError}" v-if="!disable">
          <iDatePicker 
              v-model="scope.row.newStartDate" 
              format="yyyy-MM-dd" 
              value-format="yyyy-MM-dd"
              :clearable="false"
              @focus="clearValidateError"
              @change="validateDueDateInput(scope.row, [2])"
              :picker-options="pickerOptions"
          />
        </span>
        <span v-else>{{scope.row.newStartDate}}</span>
      </template>
      <template #newEndDate="scope">
        <span :class="{validateEndError: scope.row.validateEndError}" v-if="!disable">
          <iDatePicker 
              v-model="scope.row.newEndDate" 
              format="yyyy-MM-dd" 
              value-format="yyyy-MM-dd"
              :clearable="false"
              @focus="clearValidateError"
              @change="validateDueDateInput(scope.row, [3])"
              :picker-options="pickerOptions"
          />
        </span>
        <span v-else>{{scope.row.newEndDate}}</span>
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
          :total="tablePageSizeTotal" />
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
  computed: {
    tablePageSizeTotal() {
      return this.page.totalCount + this.copyDataLength
    }
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
      copyDataLength: 0,
      disable: !['TOBE_STATED', 'QUOTING', 'BOUND', 'QUOTED'].includes(this.$route.query.status) // 待表态,报价中,已绑定,已报价支持编辑
    }
  },
  created() {
    // 隐藏log按钮
    this.$emit('showLog', false)
  },
  mounted() {
    this.getFetchData()
  },
  methods: {
    calcNewDosage(row) {
      return parseFloat(window._.sum([parseFloat(row.dosageChange || 0), parseFloat(row.originDosage || 0)]) || 0).toFixed(2)
    },
    formatDosChangeNum(row) {
      const dosageChange = row.dosageChange
      const decimal = String(dosageChange).split('.')[1] || ''
      const decimalLength = decimal.length > 6 ? 6 : decimal.length
      this.$set(row, 'dosageChange', isNaN(Number(dosageChange)) ? 0 : Number(dosageChange).toFixed(decimalLength))
      this.validateDueDateInput(row, [1])
    },
    clearValidateError() {
      this.tableListData.map(o => {
        delete o.validateEndError
        delete o.validateStartError
        delete o.validateDosageChangeError
        return o
      })
    },
    /**
     * @description: 
     * @param {*} row 行数据
     * @param {*} priority 优先校验 1用量变化 2新有效期 3 新有效期止
     * @return {*}
     */    
    validateDueDateInput(row, priority = [1]) {
      let state = true
      let errorInfo = ''

      // 清除错误信息
      this.clearValidateError()
      // 用量必填校验
      if (state && !row.dosageChange && priority.includes(1)) {
        state = false
        errorInfo = this.language('YONGLIANGBIANHUABUNENGWEIKONG', '用量变化不能为空')
         this.$set(row, 'validateDosageChangeError', true)
      }
      if (state && !row.newStartDate && priority.includes(3)) {
        state = false
        errorInfo = this.language('XINYOUXIAOQIKAISHISHIJIANBITIAN', '有效期开始时间不能为空')
        this.$set(row, 'validateStartError', true)
      }
      if (state && !row.newEndDate && priority.includes(2)) {
        state = false
        errorInfo = this.language('XINYOUXIAOQIJIESHUJIANBITIAN', '有效期结束时间不能为空')
        this.$set(row, 'validateEndError', true)
      }
      if (state && row.newEndDate && row.newEndDate < row.newStartDate && priority.includes(2)) {
        state = false
        errorInfo = this.language('XINYOUXIAOQIKAISHIWANYUJIESU', '有效期结束时间不能早于开始时间')
        this.$set(row, 'validateStartError', true)
        this.$set(row, 'validateEndError', true)
      }
      if (state && row.newStartDate && row.newStartDate > row.newEndDate && priority.includes(3)) {
        state = false
        errorInfo = this.language('XINYOUXIAOQIKAISHIWANYUJIESU', '有效期开始时间不能晚于结束时间')
        this.$set(row, 'validateStartError', true)
        this.$set(row, 'validateEndError', true)
      }

      // 校验是否有相同的开始时间或者结束时间
      let theSameNewStartDate = ''
      let theSameNewEndDate = ''
      // ***检查时间交叉****
      // 根据开始日期排序
      const dataList = window._.sortBy(this.tableListData, 'newStartDate')
      // 上一次结束时间
      let parEndId = dataList.length && dataList[0] && dataList[0].id
      let parEndDate = dataList.length && dataList[0] && dataList[0].newEndDate
      // 根据日期从小到大排序，校验是否出现每一行数据开始时间小于上一行结束时间的记录
      dataList.forEach((item) => {
        console.log(item.id, item.newStartDate, parEndId, parEndDate)
        // 时间段重叠
        if (state && item.newStartDate && parEndDate && parEndId !== item.id && item.newStartDate < parEndDate && window._.intersection(priority, [2,3]).length) {
          state = false
          errorInfo = this.language('LINGJIANSHIJIANDUANCONGDIECUOWU','所填零件行项目有时间段重叠,请修改')
          const parItem = this.tableListData.find(o => o.id === parEndId)
          const curItem = this.tableListData.find(o => o.id === item.id)
          this.$set(parItem, 'validateEndError', true)
          this.$set(curItem, 'validateStartError', true)
        }

        // 校验是否有相同的开始时间或者结束时间
        const theSameStartDateLength = this.tableListData.filter(o => o.newStartDate === item.newStartDate).length
        const theSameEndDateLength = this.tableListData.filter(o => o.newEndDate === item.newEndDate).length
        if (theSameStartDateLength > 1 && !theSameNewStartDate) theSameNewStartDate = item.newStartDate
        if (theSameEndDateLength > 1 && !theSameNewEndDate) theSameNewEndDate = item.newEndDate
        theSameNewStartDate === item.newStartDate && (this.$set(item, 'validateStartError', true))
        theSameNewEndDate === item.newEndDate && (this.$set(item, 'validateEndError', true))
        if (state && item.newStartDate && item.newEndDate && (theSameStartDateLength > 1 || theSameEndDateLength > 1) && window._.intersection(priority, [2,3]).length) {
          state = false
          errorInfo = this.language('LINGJIANSHIJIANDUANCONGDIECUOWU','所填零件行项目有时间段重叠,请修改')
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
          this.tableListData = (res.data && res.data.records || []).map(o => {
            o.newStartDate = o.newStartDate ? window.moment(o.newStartDate).format('YYYY-MM-DD') : ''
            o.newEndDate = o.newEndDate ? window.moment(o.newEndDate).format('YYYY-MM-DD') : ''
            return o
          })
          this.page.totalCount = res.data.total
          // 抽取截止时间范围
          const dataLine0 = this.tableListData[0]
          this.maxEndDate = dataLine0.maxEndDate
          this.minStartDate = dataLine0.minStartDate
          if (dataLine0 && (dataLine0.maxEndDate || dataLine0.minStartDate)) {
            console.log(this.maxEndDate, this.minStartDate)
            this.pickerOptions = {
              disabledDate: (time) =>{
                let state = true
                const checkstart = time.getTime() < new Date(this.minStartDate).getTime()
                const checkend = time.getTime() > new Date(this.maxEndDate).getTime()
                this.minStartDate &&  (state = checkstart)
                this.maxEndDate &&  (state = checkend)
                this.minStartDate && this.maxEndDate && (state = checkstart || checkend)
                return state;
              }
            }
          }
        } else {
          this.tableListData = []
          this.$message.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn);
        }
        this.copyDataLength = 0
        this.tableLoading = false
      }).catch(e => {
        this.tableLoading = false
        this.$message.error(this.$i18n.locale === "zh" ? e.desZh : e.desEn);
      }).finally(() => {
        this.tableLoading = false
      })
    },
    modifyCopyDataLength(Num = 0) {
      this.copyDataLength += Num
      if (this.copyDataLength < 0) {
        this.copyDataLength = 0
      }
    },
    copyAekoMtz() {
      if (!this.selectTableData.length) {
        iMessage.warn(this.language('QINGGOUXUANXUYAOFUZHIDEHANGXIANGMU', '请勾选需要复制的行项目'))
        return
      }
      // 检查新零件与原零件一致(同号零件)，不允许删除/复制
      const dumplicatedParts = this.selectTableData.filter(o => o.partNum === o.originPartNum)
      if (dumplicatedParts.length) {
        iMessage.error(this.language('DUMPLIDATEDPARDWARNING', '新零件号和原零件号一致，不可删除/新增，请在现有的项目上进行编辑'))
        return
      }
      const copyData = window._.cloneDeep(this.selectTableData).map(o => {
        o.id = Math.floor(Math.random() * 10000000)
        o.mtzPriceId = ''
        o.isNew = true
        return o
      })
      this.modifyCopyDataLength(copyData.length)
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
        iMessage.warn(this.language('QINGGOUXUANXUYAOSHANCHCUDEHANGXIANGMU', '请勾选需要删除的行项目'))
        return
      }
      // 检查新零件与原零件一致(同号零件)，不允许删除/复制
      const dumplicatedParts = this.selectTableData.filter(o => o.partNum === o.originPartNum)
      if (dumplicatedParts.length) {
        iMessage.error(this.language('DUMPLIDATEDPARDWARNING', '新零件号和原零件号一致，不可删除/新增，请在现有的项目上进行编辑'))
        return
      }
      // 删除新增的项目
      const copyDataIds = this.selectTableData.filter(o => o.isNew).map(o => o.objectAekoPartId)
      if (copyDataIds.length) {
        copyDataIds.forEach(item => {
          const targetIndex = this.tableListData.findIndex(o => o.id === item && o.isNew)
          this.tableListData.splice(targetIndex, 1)
        })
        this.modifyCopyDataLength(-copyDataIds.length)
        return
      }
      // 删除选中的老数据
      const idList = this.selectTableData.filter(o => !o.isNew).map(o => Number(o.id))
      console.log('idList', idList)
      const confirmInfo = await this.$confirm(this.language('deleteSure','您确定要执行删除操作吗？'))
      if (confirmInfo !== 'confirm') return
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
      // if (!this.selectTableData.length) {
      //   iMessage.warn(this.language('QINGXUANZEZHISHAOYITIAOSHUJU', '请选择至少一条数据'))
      //   return
      // }
      // 校验每一行数据是否合法
      let state = true
      this.tableListData.forEach(o => {
        if (state) {
          const validation = this.validateDueDateInput(o, [1,2,3]) || {}
          state = validation.state
          console.log(validation)
        }
      })
      if (!state) return

      const confirmInfo = await this.$confirm(this.language('saveSure','您确定要保存吗？'))
      if (confirmInfo !== 'confirm') return
      const paramsList = window._.cloneDeep(this.tableListData)
      paramsList.map(o => {
        o.newStartDate = String(o.newStartDate).split(' ').length === 1 ? `${o.newStartDate} 00:00:00` : o.newStartDate
        o.newEndDate = String(o.newEndDate).split(' ').length === 1 ? `${o.newEndDate} 00:00:00` : o.newEndDate
        return o
      })
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