<template>
  <div>
    <i-card>
      <div class="margin-bottom20">
        <span class="card-title">{{ language('LK_AEKOSHENPI', 'AEKO审批') }}</span>
        <div class="floatright">
          <i-button medium>确认审批</i-button>
        </div>
      </div>
      <el-table :data="approveList" stripe>
        <el-table-column
            label="专业科室"
            align="center"
            width="150"
            prop="keshi">
        </el-table-column>
        <el-table-column
            label="采购员"
            align="center"
            width="150"
            prop="name">
        </el-table-column>
        <el-table-column
            label="批准"
            width="150"
            align="center"
        >
          <template slot-scope="scope">
            <icon v-if="calculateSelected(scope.row,1)" @click.native="changeStatus(scope.row,1)" symbol
                  name="iconguanlianlingjian-xuanzhong" class="cursor"></icon>
            <icon v-else symbol name="iconguanlianlingjian-moren" @click.native="changeStatus(scope.row,1)"
                  class="cursor"></icon>

          </template>
        </el-table-column>
        <el-table-column
            label="补充材料"
            align="center"
            width="150"
        >
          <template slot-scope="scope">
            <icon v-if="calculateSelected(scope.row,3)" @click.native="changeStatus(scope.row,3)" symbol
                  name="iconguanlianlingjian-xuanzhong" class="cursor"></icon>
            <icon v-else symbol name="iconguanlianlingjian-moren" @click.native="changeStatus(scope.row,3)"
                  class="cursor"></icon>
          </template>
        </el-table-column>
        <el-table-column
            label="拒绝"
            align="center"
            width="150">
          <template slot-scope="scope">
            <icon v-if="calculateSelected(scope.row,2)" @click.native="changeStatus(scope.row,2)" symbol
                  name="iconguanlianlingjian-xuanzhong" class="cursor"></icon>
            <icon v-else symbol name="iconguanlianlingjian-moren" @click.native="changeStatus(scope.row,2)"
                  class="cursor"></icon>
          </template>
        </el-table-column>

        <el-table-column align="center">
          <template slot="header">
            <span class="custom-title">审批意见</span>
          </template>
          <template slot-scope="scope">
            <i-input v-if="approvalComments(scope.row)" v-model="scope.row.approvalComments"></i-input>
            <span v-else>{{ scope.row.approvalComments }}</span>
          </template>

        </el-table-column>
        <el-table-column
            label="审批人解释"
            align="center"
            prop="explain">
        </el-table-column>
        <el-table-column
            label="解释附件"
            align="center"
            prop="explainAttachment">
        </el-table-column>
      </el-table>
    </i-card>
  </div>

</template>

<script>
import {iInput, iCard,  icon, iButton} from "rise"

export default {
  name: "AEKOApprovalComponents",
  components: {
    iCard,
    iButton,
    icon,
    iInput,
  },
  data() {
    return {
      //审批列表数据
      approveList: [
        {
          id: '1',
          keshi: 'CSP1',
          name: '张三',
          approvalStatus: 1,
          approvalComments: '同意',
          explain: '',
          explainAttachment: ''
        },
        {
          id: '2',
          keshi: 'CSP2',
          name: '李四',
          approvalStatus: 2,
          approvalComments: '拒绝',
          explain: '',
          explainAttachment: ''
        },
        {
          id: '3',
          keshi: 'CSP3',
          name: '王五',
          approvalStatus: 3,
          approvalComments: '补充材料',
          explain: '',
          explainAttachment: ''
        }
      ],

    }
  },
  methods: {
    calculateSelected(row, state) {
      return row.approvalStatus == state;
    },
    //审批意见状态
    approvalComments(row) {
      return row.approvalStatus == 3
    },
    changeStatus(row, state) {
      if(row.approvalStatus!=state){
         row.approvalStatus=state
      }
    }
  }
}
</script>

<style scoped lang="scss">
.card-title {
  font-size: 18px;
  font-family: Arial;
  font-weight: bold;
}

.custom-title:after {
  content: '*';
  color: red;
}

</style>