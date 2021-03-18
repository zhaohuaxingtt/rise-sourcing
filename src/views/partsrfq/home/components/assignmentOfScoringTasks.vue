<!--
 * @Author: moxuan
 * @Date: 2021-03-04 11:24:15
 * @LastEditTime: 2021-03-17 19:13:08
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
-->
<template>
  <iDialog :title="title" :visible.sync="value" width="80%" @close='clearDiolog'>
    <div class="changeContent">
      <div class="margin-bottom20 clearFloat">
        <div class="floatright title-button-box">
          <iButton @click="edit">编辑</iButton>
          <iButton @click="save">保存</iButton>
        </div>
      </div>
      <tablelist
          v-if="showStatus"
          @handleSelectionChange="handleSelectionChange"
          :tableData="tableListData"
          :tableTitle="tableTitle"
          :tableLoading="tableLoading"
          :index="true"
          :select-props="selectProps"
          :select-props-options-object="selectPropsOptionsObject"
          @handleSelectChange="handleSelectChange"
      ></tablelist>
    </div>
    <span slot="footer" class="dialog-footer">
          <iButton @click="$emit('input',false)">取 消</iButton>
        </span>
  </iDialog>
</template>
<script>
import {iButton, iMessage, iDialog} from '@/components'
import tablelist from "pages/partsrfq/components/tablelist";
import {assignmentOfScroingTasksTableTitle} from "pages/partsrfq/home/components/data";
import {editRfqData} from "@/api/partsrfq/home";
import {getDictByCode, getDeptByDeptType} from "@/api/dictionary";

export default {
  components: {iButton, iDialog, tablelist},
  props: {
    title: {type: String, default: '转派评分任务'},
    value: {type: Boolean},
    repeatClick: Boolean,
    rfqId: {
      required: true,
      type: Array, default: () => {
        return []
      }
    }
  },
  data() {
    return {
      tableListData: [],
      tableTitle: assignmentOfScroingTasksTableTitle,
      tableLoading: false,
      selectTableData: [],
      selectProps: [],
      selectPropsOptionsObject: [],
      showStatus: true
    }
  },
  created() {
    this.getTableList()
    this.getDeptType()
  },
  methods: {
    //获取表格数据
    getTableList() {
      this.tableListData = [
        {deptType: '', deptNum: '', graderId: ''},
        {deptType: '', deptNum: '', graderId: ''},
        {deptType: '', deptNum: '', graderId: ''},
      ]
    },
    clearDiolog() {
      this.$emit('input', false)
    },
    edit() {
      this.showStatus = false
      this.selectProps = ['deptType', 'deptNum', 'graderId']
      this.$nextTick(() => {
        this.showStatus = true
      })
    },
    async save() {
      if (this.selectTableData.length == '') return iMessage.warn('抱歉！您当前还未选择！')
      const req = {
        ratingInfoPackage: {
          ratingInfoList: this.selectTableData,
          rfqId: this.rfqId,
          userId: 12321,
        }
      }
      const res = await editRfqData(req)
      iMessage.success(res.desZh)
      this.showStatus = false
      this.selectProps = []
      this.$nextTick(() => {
        this.showStatus = true
      })
      this.$emit('sure', JSON.parse(this.selectTableData))
    },
    //修改表格改动列
    handleSelectionChange(val) {
      this.selectTableData = val;
    },
    async getDeptType() {
      const res = await getDictByCode('score_dept')
      this.selectPropsOptionsObject = {
        0: {
          deptType: res.data[0].subDictResultVo,
          deptNum: [],
          graderId: []
        },
        1: {
          deptType: res.data[0].subDictResultVo,
          deptNum: [],
          graderId: []
        },
        2: {
          deptType: res.data[0].subDictResultVo,
          deptNum: [],
          graderId: []
        }
      }
    },
    async handleSelectChange(res) {
      switch (res.type) {
        case 'deptType':
          this.selectPropsOptionsObject[res.index].deptNum = (await getDeptByDeptType(res.val)).data
          this.tableListData[res.index].deptNum = ''
          this.tableListData[res.index].graderId = ''
          break;
        case 'deptNum':
          this.tableListData[res.index].graderId = ''
          this.selectPropsOptionsObject[res.index].graderId = [
          ]
          break;
      }
      console.log(this.selectPropsOptionsObject);
    }
  }
}
</script>
<style lang='scss' scoped>
.changeContent {
  padding: 0px 10px 20px 10px;

  .title-button-box {
    margin-top: -60px;
    margin-right: 30px;
  }
}
</style>

