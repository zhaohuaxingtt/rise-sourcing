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
                  <iInput v-model="scope.row[item.props]"   @input="isStartYear($event,item.props)" maxlength="4" size="4"></iInput>
              </template>
            </el-table-column>
            <el-table-column v-else :key="$index" align="center" :prop="item.props" :label="item.name">
              <template slot-scope="scope">
                <iInput v-model="scope.row[item.props]"  @input="handleInput($event,item.props)"></iInput>
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
import {getPlanyear} from './data'
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
      tableTitle: [],
      tableListData:[
        {
          startyear:''
        }
      ],
      numStart:''
    }
  },
  created(){
    this.tableTitle = getPlanyear()
  },
  methods: {
    clearDiolog() {
      this.$emit('changeVisible', false)
    },
    apply() {
      let yearOutputDTOsdata = []
      let templateTableList = cloneDeep(this.tableListData)|| []
      templateTableList.forEach(val => {
        Object.keys(val).filter(re => re != 'startyear').forEach(value => {
          const maps = {
            year:(val.startyear-0)+(value-0),
           output:val[value]
          }
          yearOutputDTOsdata.push(maps)
        })
      })
      if(this.tableListData[0].startyear == '') {
        return iMessage.warn(
          this.language(
            "LK_NINSHANGWEISHURUKAISHINIANFEN",
            '抱歉，您尚未输入开始年份'
          )
        )
      } else{
          let batchMaintainOutPutPlanDTO  = {}
          batchMaintainOutPutPlanDTO.purchasingProjectIds = this.openPlanItemsIds
          batchMaintainOutPutPlanDTO.yearOutputDTOs = yearOutputDTOsdata
          batchMaintainOutPutPlan(batchMaintainOutPutPlanDTO).then(res=>{
        })
      }

    },
    isStartYear(val,key) {
      this.tableListData[0][key] = (val + '').replace(/\D/g, '')
    },
    handleInput(val,key) {
      this.tableListData[0][key] = (val + '').replace(/[^\d.]/g, '').replace(/^\./g,'').replace(/\.{2,}/g,'.'). replace(".", "$#$").replace(/\./g, "").replace("$#$", ".").replace(/^(\-)*(\d+)\.(\d\d\d\d\d\d).*$/, "$1$2.$3")
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