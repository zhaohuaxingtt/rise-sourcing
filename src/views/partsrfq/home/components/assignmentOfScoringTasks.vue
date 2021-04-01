<!--
 * @Author: moxuan
 * @Date: 2021-03-04 11:24:15
 * @LastEditTime: 2021-03-26 00:10:28
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
-->
<template>
  <iDialog :title="$t(title)" :visible.sync="value" width="80%" @close='clearDiolog'>
    <div class="changeContent">
      <div class="margin-bottom20 clearFloat">
        <div class="floatright title-button-box">
          <iButton @click="add" v-permission="PARTSRFQ_ASSIGNMENTOFSCORINGTASKS_SAVE">{{$t('LK_TIANJIA')}}</iButton>
          <iButton @click="deleteItems">{{$t('LK_SHANCHU')}}</iButton>
          <iButton @click="save">{{$t('LK_ZHUANPAI')}}</iButton>
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
          :is-select-options-linkage="true"
      ></tablelist>
    </div>
    <span slot="footer" class="dialog-footer">
          <iButton @click="$emit('input',false)">{{ $t('LK_QUXIAO') }}</iButton>
        </span>
  </iDialog>
</template>
<script>
import {iButton, iMessage, iDialog} from '@/components'
import tablelist from "pages/partsrfq/components/tablelist";
import {assignmentOfScroingTasksTableTitle} from "pages/partsrfq/home/components/data";
import {editRfqData} from "@/api/partsrfq/home";
import {getDictByCode, getDeptByDeptType} from "@/api/dictionary";
import {getGraderIdByDept} from "@/api/usercenter";
import store from '@/store'
import {rfqCommonFunMixins} from "pages/partsrfq/components/commonFun";


export default {
  components: {iButton, iDialog, tablelist},
  props: {
    title: {type: String, default: 'LK_ZHUANPAIPINGFENRENWU'},
    value: {type: Boolean},
    repeatClick: Boolean,
    rfqId: {
      required: true,
      type: Array, default: () => {
        return []
      }
    }
  },
  mixins: [rfqCommonFunMixins],
  data() {
    return {
      tableListData: [],
      tableTitle: assignmentOfScroingTasksTableTitle,
      tableLoading: false,
      selectTableData: [],
      selectProps: ['deptType', 'deptNum', 'graderId'],
      selectPropsOptionsObject: {},
      showStatus: true,
      deptTypeList: []
    }
  },
  created() {
    this.getDeptType()
  },
  methods: {
    clearDiolog() {
      this.$emit('input', false)
    },
    async save() {
      if (this.selectTableData.length == '') return iMessage.warn(this.$t('LK_NINDANGQIANHAIWEIXUANZE'));
      const req = {
        ratingInfoPackage: {
          ratingInfoList: this.selectTableData,
          rfqId: this.rfqId,
          userId:store.state.permission.userInfo.id,
        }
      }
      const res = await editRfqData(req)
      this.resultMessage(res)
      this.$emit('sure', this.selectTableData)
    },
    //修改表格改动列
    handleSelectionChange(val) {
      this.selectTableData = val;
    },
    async getDeptType() {
      const res = await getDictByCode('score_dept')
      this.deptTypeList = res.data[0].subDictResultVo
    },
    async handleSelectChange(res) {
      const newObj = JSON.parse(JSON.stringify(this.selectPropsOptionsObject))
      switch (res.type) {
        case 'deptType':
          newObj[res.time].deptNum = (await getDeptByDeptType(res.val)).data
          this.tableListData.map(item => {
            if (item.time === res.time) {
              item.deptNum = ''
              item.graderId = ''
            }
          })
          break;
        case 'deptNum':
          this.tableListData.map(item => {
            if (item.time === res.time) {
              item.graderId = ''
            }
          })
          newObj[res.time].graderId = (await getGraderIdByDept(res.val)).data.map(item => {
            return {
              code: item.id,
              name: item.userName
            }
          })
          break;
      }
      this.selectPropsOptionsObject = newObj
    },
    add() {
      const time = new Date().getTime()
      this.tableListData.push({
        deptType: '', deptNum: '', graderId: '', time: time
      })
      this.selectPropsOptionsObject[time] = {
        deptType: this.deptTypeList,
        deptNum: [],
        graderId: []
      }
    },
    deleteItems() {
      if (this.selectTableData.length === 0) {
        // return iMessage.warn("抱歉，您当前还未选择！");
        return iMessage.warn(this.$t('LK_NINDANGQIANHAIWEIXUANZE'));
      }
      const indexList = this.selectTableData.map(item => {
        return item.time
      })
      this.tableListData = this.tableListData.filter(item => {
        if (!indexList.includes(item.time)) {
          return item
        }
      })
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

