<!--
 * @Author: Luoshuang
 * @Date: 2021-06-28 18:27:56
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-01-28 11:31:05
 * @Description: 
 * @FilePath: \front-web\src\views\designate\approvalPersonAndRecord\tableList.vue
-->

<template>
  <el-table ref="multipleTable" fit tooltip-effect='light' :height="height" :data='tableData' v-loading='tableLoading' @selection-change="handleSelectionChange" :empty-text="language('ZANWUSHUJU', '暂无数据')" >
    <el-table-column v-if="selection" type='selection' width="56" align='center'></el-table-column>
    <el-table-column v-if='indexKey' type='index' width='50' align='center' label='#'>
      <template slot-scope="scope">
        {{tableIndexString+(scope.$index+1)}}
      </template>
    </el-table-column>
    <template v-for="(items,index) in tableTitle">
      <!---------------------------可编辑列---------------------------------->
      <el-table-column :key="index" align='center' :width="items.width" :min-width="items.minWidth" :show-overflow-tooltip='items.tooltip' v-if="items.editable" :prop="items.props" :label="items.key ? language(items.key, items.name) : items.name">
        <template slot-scope="scope">
          <iInput v-if="items.type === 'input'" v-model="scope.row[items.props]" @input="val=>changeValue(val, scope.row, items)"></iInput>
          <iSelect v-else-if="items.type === 'select'" :popper-class="`autoClearSelect_${ items.props }_${ scope.$index }`" filterable  v-model="scope.row[items.props]" @change="val=>changeValue(val, scope.row, items)" @visible-change="handleVisibleChange($event, items.props, scope.$index)">
            <el-option
              :value="item.value"
              :label="item.label"
              v-for="(item, index) in (items.props === 'approveParentDeptNum' ? scope.row.deptOptions : scope.row.deptSubOptions)"
              :key="index"
            ></el-option>
          </iSelect>
        </template>
      </el-table-column>
      <!-------------------------正常列--------------------------->
      <el-table-column :key="index" align='center' :width="items.width" :min-width="items.minWidth" :show-overflow-tooltip='items.tooltip'  v-else :label="items.key ? language(items.key, items.name) : items.name" :prop="items.props">
        <template slot-scope="scope">
          <!------------------正常--------------------------->
          <span>{{scope.row[items.props]}}</span>
        </template>
      </el-table-column>
    </template>
  </el-table>
</template>
<script>
import {iSelect,iInput} from 'rise'
import {_getMathNumber} from '@/utils'
import { getSubDeptListByParam, getDeptLeader, findCfDeptNumList, findCfUserInfo } from '@/api/designate/decisiondata/approval'
export default{
  components:{iSelect,iInput},
  props:{
    tableData:{type:Array},
    tableTitle:{type:Array},
    tableLoading:{type:Boolean,default:false},
    selection:{type:Boolean,default:true},
    height:{type:Number||String},
    activeItems:{type:String,default:'b'},
    tableIndexString:{
      type:String,
      default:''
    },
    indexKey:Boolean,
    notEdit:Boolean,
    doubleHeader:Boolean,
    selectedItems:{type:Array},
    editCompare: {type: Boolean, default: true}
  },
  computed: {
    // eslint-disable-next-line no-undef
    ...Vuex.mapState({
      nominationType: state => state.nomination.nominationType
    })
  },
  inject:['vm'],
  data() {
    return {
      options: {}
    }
  },
  methods:{
    getDeptLeader(deptId, grade, row) {
      getDeptLeader({
        nominateId:this.$route.query.desinateId,
        deptNum: deptId,
        grade,
        nominateType: this.nominationType
      }).then(res => {
        // this.$set(row, 'deptManagerName')
        if (res.code == 200 && Array.isArray(res.data)) {
          this.$set(row, 'deptManager', res.data.map(item => item.id).join(","))
          this.$set(row, 'deptManagerName', res.data.map(item => item.nameZh).join(","))
          this.$set(row, 'approvalInfo', res.data[0].officeLocal)
        } else {
          this.$set(row, 'deptManager', "")
          this.$set(row, 'deptManagerName', "")
          this.$set(row, 'approvalInfo', "")

        }
      })
    },
    getDeptSubOptions(deptId, row, grade) {
      this.$set(row, 'approveDeptNum', '')
      getSubDeptListByParam(deptId, grade).then(res => {
        if (res.code == 200 && Array.isArray(res.data)) {
          this.$set(row, 'deptSubOptions', res.data.map(item => {
            return {
              ...item,
              label: item.deptNum,
              value: item.id
            }
          }))
        } else {
          this.$set(row, 'deptSubOptions', [])
        }
      })
    },
    getOptions(optionType) {
      return this.options[optionType]
    },
    // 获取cf科室
    findCfDeptNumList(row) {
      findCfDeptNumList()
      .then(res => {
        if (res.code == 200 && Array.isArray(res.data)) {
          this.$set(row, 'deptSubOptions', res.data.map(item => {
            return {
              ...item,
              label: item.deptNum,
              value: item.id
            }
          }))
        } else {
          this.$set(row, 'deptSubOptions', [])
        }
      })
    },
    // 获取CF部门审批人
    findCfUserInfo(cfDeptNum, row) {
      findCfUserInfo({
        cfDeptNum,
        nomiType: this.nominationType
      })
      .then(res => {
        if (res.code == 200 && Array.isArray(res.data)) {
          this.$set(row, 'deptManager', res.data.map(item => item.id).join(","))
          this.$set(row, 'deptManagerName', res.data.map(item => item.nameZh).join(","))
          this.$set(row, 'approvalInfo', res.data[0].officeLocal)
        } else {
          this.$set(row, 'deptManager', "")
          this.$set(row, 'deptManagerName', "")
          this.$set(row, 'approvalInfo', "")
        }
      })
    },
    changeValue(val, row, item) {
      this.$set(row, 'deptManager', "")
      this.$set(row, 'deptManagerName', "")

      if (item.props === "approveParentDeptNum") {
        const cfDept = row.deptOptions.find(item => item.value === val)

        if (cfDept && cfDept.label === "CF") {
          this.findCfDeptNumList(row)
          return
        }
      }
      
      if (item.props === "approveDeptNum") {
        const cfDept = row.deptOptions.find(item => item.value === row.approveParentDeptNum)

        if (cfDept && cfDept.label === "CF") {
          const cfSubDept = row.deptSubOptions.find(item => item.value === val)
          if (cfSubDept) this.findCfUserInfo(cfSubDept.deptNum, row)
          return
        }
      }

      console.log('val',val,'row',row,'item',item);
      this.$set(row, item.props, val)
      if (item.props === 'approveParentDeptNum') {
        this.$set(row, 'deptSubOptions', [])
        const dept = row.deptOptions.find(item => item.value === val)
        this.getDeptSubOptions(val, row, dept.grade)
        if (dept) {
          this.getDeptLeader(dept.deptNum, dept.grade, row)
        }
      } else {
        const dept = row.deptSubOptions.find(item => item.value === val)
        if (dept) {
          this.getDeptLeader(dept.deptNum, dept.grade, row)
        }
        // console.log(val, row, item)
        // const dept = row.deptSubOptions.find(item => item.value === val)
        // if  (dept) {
        //   this.$set(row, 'deptManager', dept.leadUserId)
        //   this.$set(row, 'deptManagerName', dept.leadUserName)
        // }
      }
      
    },
    getValue(row, item) {
      if (item.parentProps) {
        if (row && row[item.parentProps] && row[item.parentProps][item.propsIndex - 1]) {
          return row[item.parentProps][item.propsIndex - 1][item.props]
        }
      } else {
        return row[item.props]
      }
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val){
      this.$emit('handleSelectionChange',val)
    },
    openPage(e){
      this.$emit('openPage',e)
    },	
    activeTop(e){
      this.$emit('activeTop',e)
    },
    updateSlot(e,a){
      this.$emit('updateSlot',[e,a])
    },
    handleVisibleChange(status, key, index) {
      if (!status) {
        const domList = document.querySelectorAll(`.autoClearSelect_${ key }_${ index }`)
        Array.prototype.forEach.call(domList, dom => {
          dom.parentNode.removeChild(dom)
        })
      }
    },
    clearAllSelectPopDom() {
      this.$nextTick(() => {
        const domList = document.querySelectorAll('div[class*=autoClearSelect]')
        Array.prototype.forEach.call(domList, dom => {
          dom.parentNode.removeChild(dom)
        })
      })
    },
  }
}
</script>
<style lang='scss' scoped>
  .openLinkText{
    color:$color-blue;
    text-decoration: underline;
  }
  .radio{
    ::v-deep thead .el-table-column--selection .cell {
    display: none;
	}
  
  }
  .isChange {
    ::v-deep .el-input__inner {
      color: red;
      background: rgb(255 0 0 / 10%);
      border-color: red;
    }
  }
</style>