<template>
  <iDialog 
  title="批量维护产量计划" 
  :visible.sync="dialogVisible"
  @close="clearDiolog" 
  class="iDialogHeight"
  width="1300px"
  >
    <div class="main_body">
      <div class="btn margin-bottom20">
        <iButton @close="clearDiolog" >取消</iButton>
        <iButton @click="apply">应用</iButton>
      </div>
      <div class="tableYear margin-top20">
        <el-table
        :data="tableListData"
        >
          <template v-for="(item, $index) in tableTitle">
            <el-table-column v-if="$index == 0"  :key="$index" align="center" :label="item.name">
              <template slot-scope="scope">
                  <iInput v-model="scope.row[item.props]" @input="isStartYear(item.props)"></iInput>
              </template>
            </el-table-column>
            <el-table-column v-else :key="$index" align="center" :prop="numStart -0 +$index -1" :label="item.name">
              <template slot-scope="scope">
                <iInput v-model="scope.row[numStart -0 +$index -1]"  @input="handleInput($event, numStart -0 +$index -1)"></iInput>
              </template>
            </el-table-column>
          </template>
        </el-table>
      </div>
    </div>
  </iDialog>
</template>

<script>
import {iDialog, iButton, iInput, iMessage} from 'rise'
import {batchMaintainTableTitle as tableTitle} from './data'
import {batchMaintainOutPutPlan} from '@/api/partsprocure/editordetail'
import { cloneDeep } from 'lodash'
export default {
  components:{iDialog, iButton, iInput},
  props: {
    dialogVisible: {
      type:Boolean
    },
    openPlanItemsIds: {
      type:Array,
      default:()=>[]
    }
  },
  data() {
    return {
      tableTitle: cloneDeep(tableTitle),
      tableListData:[
        {
          startyear:''
        }
      ],
      numStart:''
    }
  },
  methods: {
    clearDiolog() {
      this.$emit('changeVisible', false)
      console.log('11');
    },
    apply() {
      let testYear = /^\d{4}$/
      this.startYear = this.tableListData[0].startyear
      let isYear = testYear.test(this.startYear)
      if(isYear == false) {
        return iMessage.warn(
          this.language(
            "LK_NINDANGQIANHAIWEIXUANZENINXUYAOPILIANGWEIHUCHANLIANGJIHUADEXIANGMU",
            '抱歉，您当前还未选择您需要批量维护产量计划的项目！'
          )
        )
      } 
      let Yeardata = this.tableListData[0]
      let yearOutputDTOs =[]
      for(let item in Yeardata) {
        yearOutputDTOs.push()
        let itemdata = {}
        itemdata.year = item
        itemdata.output = Yeardata[item]
        if( itemdata.year != 'startyear') {
          yearOutputDTOs.push(itemdata)
        }
      }
      let batchMaintainOutPutPlanDTO  = {}
      batchMaintainOutPutPlanDTO.purchasingProjectIds = this.openPlanItemsIds
      batchMaintainOutPutPlanDTO.yearOutputDTOs = yearOutputDTOs
      batchMaintainOutPutPlan(batchMaintainOutPutPlanDTO).then(res=>{
        console.log(res);
      })
      console.log(batchMaintainOutPutPlanDTO);
    },
    isStartYear() {
      this.numStart = this.tableListData[0].startyear-0
    },
    handleInput(val,key) {
      this.tableListData[0][key] = (val + '').replace(/\D/g, '').replace(/([0]*)(0|[1-9]+[0-9]+)/, "$2")
    }
  }
}
</script>
<style lang="scss" scoped>
  .iDialogHeight {
    ::v-deep .el-dialog{
      height: 600px;
    }
  }
  .main_body{
    margin-bottom: 100px;
  }
  .btn{
    display: flex;
    justify-content: flex-end;
    margin: 0 0 20px 0;
  }

</style>