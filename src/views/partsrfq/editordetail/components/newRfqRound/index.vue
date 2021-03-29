<!--
 * @Author: moxuan
 * @Date: 2021-03-05 17:24:15
 * @LastEditTime: 2021-03-26 00:03:52
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
-->
<template>
  <iDialog :title="title" :visible.sync="value" width="90%" @close='clearDiolog' z-index="1000">
    <div class="changeContent">
      <div class="clearFloat">
        <div class="floatright title-button-box">
          <template v-if="roundType === '00'">
            <iButton @click="save" v-permission="PARTSRFQ_EDITORDETAIL_NEWRFQROUND_SAVE">保存</iButton>
            <iButton @click="updateRfqStatus('06')" :disabled="!saveStaus"
                     v-permission="PARTSRFQ_EDITORDETAIL_NEWRFQROUND_SAND">发送询价
            </iButton>
          </template>
          <template v-else>
            <iButton @click="saveAndCreate" v-permission="PARTSRFQ_EDITORDETAIL_NEWRFQROUND_SAVEANDCREATE">保存并创建
            </iButton>
          </template>
        </div>
      </div>
      <iFormGroup inline icon>
        <iFormItem label="轮次类型" name="test" v-permission="PARTSRFQ_EDITORDETAIL_NEWRFQROUND_ROUNDTYPE">
          <i-select v-model="roundType" @change="handleSelectChange">
            <el-option v-for="items in roundTypeOptions" :key='items.code' :value='items.code' :label="items.name"/>
          </i-select>
        </iFormItem>
        <iFormItem label="本轮报价起止时间" name="test" v-if="roundType === '00'">
          <div class="flex">
            <el-date-picker type="date" placeholder="请选择" v-model="startTime"
                            v-permission="PARTSRFQ_EDITORDETAIL_NEWRFQROUND_STARTTIME"></el-date-picker>
          </div>
        </iFormItem>
        <iFormItem label="" name="test" v-if="roundType === '00'">
          <el-date-picker type="date" placeholder="请选择" v-model="endTime"
                          v-permission="PARTSRFQ_EDITORDETAIL_NEWRFQROUND_ENDTIME"></el-date-picker>
        </iFormItem>
      </iFormGroup>
      <tablelist
          ref="multipleTable"
          v-if="roundType === '00'"
          :tableData="tableListData"
          :tableTitle="tableTitle"
          :tableLoading="tableLoading"
          :index="true"
          @handleSelectionChange="handleSelectionChange"
          :select-props="['cbdTemplateId']"
      ></tablelist>
      <tablelist
          ref="multipleTable"
          v-else
          :tableData="tableListData"
          :tableTitle="tableTitle2"
          :tableLoading="tableLoading"
          :index="true"
          @handleSelectionChange="handleSelectionChange"
      ></tablelist>
      <!------------------------------------------------------------------------>
      <!--                  表格分页                                          --->
      <!------------------------------------------------------------------------>
      <iPagination
          @size-change="handleSizeChange($event, getTableList)"
          @current-change="handleCurrentChange($event, getTableList)"
          background
          :page-sizes="page.pageSizes"
          :page-size="page.pageSize"
          :layout="page.layout"
          :current-page='page.currPage'
          :total="page.totalCount"
      />
    </div>
  </iDialog>
</template>
<script>
import {iButton, iMessage, iDialog, iFormGroup, iFormItem, iSelect, iPagination} from '@/components'
import tablelist from './components/tablelist'
import {pageMixins} from "@/utils/pageMixins";
import {tableTitle, tableTitle2} from "./components/data";
import {findBySearches, getRfqDataList, addRfq, editRfqData} from "@/api/partsrfq/home";
import store from '@/store'

export default {
  components: {iButton, iDialog, iFormGroup, iFormItem, iSelect, tablelist, iPagination},
  mixins: [pageMixins],
  props: {
    title: {type: String, default: '新建RFQ轮次'},
    value: {type: Boolean},
    repeatClick: Boolean
  },
  data() {
    return {
      editStatus: false,
      tableListData: [],
      tableLoading: false,
      selectTableData: [],
      roundType: '',
      roundTypeOptions: [],
      startTime: '',
      endTime: '',
      tableTitle,
      tableTitle2,
      saveStaus: false
    }
  },
  created() {
    this.getRoundTypeOptions()
  },
  methods: {
    //获取表格数据
    async getTableList() {
      const id = this.$route.query.id
      if (id) {
        this.tableLoading = true;
        const req = {
          otherInfoPackage: {
            findType: '10',
            rfqId: id,
            current: this.page.currPage,
            size: this.page.pageSize,
          }
        }
        try {
          const res = await getRfqDataList(req)
          this.tableListData = res.data.rfqRoundBdlVO.rfqBdlVOList;
          this.page.currPage = res.data.rfqRoundBdlVO.pageNum
          this.page.pageSize = res.data.rfqRoundBdlVO.pageSize
          this.page.totalCount = res.data.rfqRoundBdlVO.total
          this.setTableRowSelected()
          this.tableLoading = false;
        } catch {
          this.tableLoading = false;
        }
      }
    },
    sureChangeItems() {
      if (this.selectTableData.length == '') return iMessage.warn('抱歉！您当前还未选择！')
      this.$emit('sure', JSON.parse(this.selectTableData))
    },
    clearDiolog() {
      this.$emit('input', false)
    },
    handleSelectionChange(val) {
      this.selectTableData = val;
    },
    async getRoundTypeOptions() {
      const res = await findBySearches('04')
      this.roundTypeOptions = res.data
      this.roundType = this.roundTypeOptions[0].code
    },
    async save() {
      if (this.selectTableData.length === 0) {
        return iMessage.warn("抱歉，您当前还未选择任务！");
      }
      const id = this.$route.query.id
      if (id) {
        const req = {
          dblRoundDTOPackage: {
            userId: store.state.permission.userInfo.id,
            startTime: this.startTime,
            endTime: this.endTime,
            rfqId: id,
            roundsType: this.roundType,
            bdlInfos: this.selectTableData
          }
        }
        const res = await addRfq(req)
        if (res.result) {
          this.saveStaus = true
          iMessage.success(res.desZh)
        } else {
          iMessage.error(res.desZh)
        }
      }
    },
    async saveAndCreate() {
      const id = this.$route.query.id
      if (id) {
        const req = {
          dblRoundDTOPackage: {
            userId: store.state.permission.userInfo.id,
            rfqId: id,
            roundsType: this.roundType,
            bdlInfos: this.selectTableData
          }
        }
        const res = await addRfq(req)
        res.result ? iMessage.success(res.desZh) : iMessage.error(res.desZh)
        this.$emit('refreshBaseInfo')
      }
    },
    async updateRfqStatus(updateType) {
      const query = this.$route.query
      const req = {
        updateRfqStatusPackage: {
          updateType,
          tmRfqIdList: [Number(query.id)],
          userId: store.state.permission.userInfo.id
        }
      }
      const res = await editRfqData(req)
      res.result ? iMessage.success(res.desZh) : iMessage.error(res.desZh)
    },
    initTimeData() {
      if (this.roundType === '00') {
        // eslint-disable-next-line no-undef
        this.startTime = moment().format('YYYY-MM-DD ')
        // eslint-disable-next-line no-undef
        this.endTime = moment().add(7, 'd').format('YYYY-MM-DD')
      }
    },
    handleSelectChange(val) {
      if (val === '00') {
        this.initTimeData()
      }
    },
    setTableRowSelected() {
      this.$nextTick(() => {
        this.tableListData.map(item => {
          if (item.isChecked) {
            this.$refs.multipleTable.$refs.newRoundTable.toggleRowSelection(item, true)
          }
        })
      })
    }
  },
  watch: {
    value(val) {
      if (val) {
        this.saveStaus = false
        this.getTableList()
        this.initTimeData()
      }
    }
  }
}
</script>

<style scoped lang='scss'>
.changeContent {
  padding: 0 10px 20px 10px;

  .form-title {
    height: 25px;
    font-size: 18px;
    font-weight: 600;
    line-height: 25px;
    color: #000000;
    margin-bottom: 17px;
  }

  .title-button-box {
    margin-top: -60px;
    margin-right: 30px;
  }

  .inline-block {
    display: inline-block;
  }
}
</style>

