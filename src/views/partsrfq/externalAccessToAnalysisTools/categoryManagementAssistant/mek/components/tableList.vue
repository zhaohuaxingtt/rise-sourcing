<!--
 * @Author: your name
 * @Date: 2021-08-06 11:07:05
 * @LastEditTime: 2021-09-30 13:12:43
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\views\partsrfq\externalAccessToAnalysisTools\categoryManagementAssistant\mek\components\tableList.vue
-->
<template>

  <iCard class="tableList">
    <template v-slot:header>
      <div class="titleBox"
           v-if="!preview"
           v-show="reportFlag">
        <div v-if="!editFlag">

          <iButton @click="edit">编辑</iButton>
        </div>
        <div v-else>
          <iButton @click="addRow">新增</iButton>
          <iButton @click="del">删除</iButton>
          <iButton @click="saveTable">保存</iButton>
          <iButton @click="cancel">取消</iButton>
        </div>
      </div>
    </template>
    <el-table :data="gridData1"
              style="width: 100%"
              @selection-change="handleSelectionChange">
      <el-table-column type="selection"
                       width="55">
      </el-table-column>
      <el-table-column label="#"
                       prop="index"
                       width="65">
      </el-table-column>
      <el-table-column v-for="(item,index) in gridData.title"
                       :key="index"
                       :label="item.motorTypeName"
                       min-width="180"
                       show-overflow-tooltip>
        <el-table-column :label="gridData.config[item.label]"
                         :prop="item.label"
                         show-overflow-tooltip
                         :render-header="renderHeader">
          <editable-cell slot-scope="{row}"
                         :show-input="row.editMode"
                         v-model="row[item.label]">
            <span slot="content">{{row[item.label]}}</span>
          </editable-cell>
          <template slot="header">
            <el-tooltip effect="dark"
                        :content="gridData.config[item.label]"
                        placement="top">
              <span>{{ gridData.config[item.label] }}</span>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table-column>
    </el-table>
  </iCard>

</template>
 
<script>
import { iPage, iCard, iButton } from 'rise';
import EditableCell from "./editCell";
import { saveMekTable, deleteMekTable } from '@/api/categoryManagementAssistant/mek'
export default {
  name: "App",
  components: {
    EditableCell,
    iCard,
    iButton
  },
  props: {
    gridData: {
      type: Object,
      default: () => {
        return {}
      }
    },
    preview: {
      type: Boolean,
      default: false
    },
    reportFlag: Boolean
  },
  watch: {
    editFlag: {
      handler (newVal) {
        if (newVal) {
          this.gridData1.forEach((item, index) => {
            item.editMode = true
          })
          this.gridData1 = [...this.gridData1]
        } else {
          this.gridData1.forEach((item, index) => {
            item.editMode = false
          })
          this.gridData1 = [...this.gridData1]
        }
      }
    },
    preview (val) {
    },
    gridData: {
      handler (newVal) {
        console.log(newVal, 'hahahah')
        if (newVal) {
          if (newVal.data) {
            this.tableData = newVal.data
            this.gridData1 = this.tableData.map((row, index) => {
              return {
                ...row,
                index: index + 1,
                editMode: this.editFlag ? true : false
              }
            });
          } else {
            newVal.data = []
            this.tableData = newVal.data
            this.gridData1 = this.tableData.map((row, index) => {
              return {
                ...row,
                index: index + 1,
                editMode: this.editFlag ? true : false
              }
            });
            console.log(this.tableData)
          }
        }
      },
      deep: true,
      immediate: true
    }
  },
  data () {
    return {
      tableData: [],
      gridData1: [],
      addRowList: {},
      editFlag: false,
      multipleSelection: []
    };
  },
  methods: {
    // setEditMode (row, index) {
    //   row.editMode = true;
    // },
    // saveRow (row, index) {
    //   row.editMode = false;
    // },
    handleSelectionChange (val) {
      this.multipleSelection = val;
    },
    edit () {
      this.editFlag = true
    },
    cancel () {
      this.editFlag = false
    },
    del () {
      let textTypeId = []
      this.multipleSelection.forEach(item => {
        textTypeId.push(item.textTypeId)
      })
      deleteMekTable({
        comparedType: this.$parent.$parent.comparedType,
        schemeId: this.$parent.$parent.chemeId,
        textTypeId
      }).then(res => {
        this.$parent.$parent.getMekTable()
      })
    },
    renderHeader (h, { column }) {
      let header = column.label.split('<br/>');
      return [h('p', {
        style: {
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap'
        },
      }, [
        h('p', {}, header[0]),
        h('p', {}, header[1]),
        h('p', {}, header[2]),
        h('p', {}, header[3]),
        h('p', {}, header[4])
      ])];
    },
    //表格保存
    saveTable () {
      console.log(this.gridData1)
      this.editFlag = false
      let params = {
        "comparedType": this.$parent.$parent.comparedType,
        "detail": [],
        "schemeId": this.$parent.$parent.chemeId
      }
      this.gridData1.forEach(item => {
        let obj = {
          "detail": [],
          "type": item['label#-1'],
          "typeId": item.textTypeId || ''
        }
        this.gridData.title.forEach(i => {
          let obj1 = {
            "id": item['id#' + i.label.split('#')[1]],
            "motorTypeId": i.label.split('#')[1],
            "remark": item[i.label]
          }
          obj.detail.push(obj1)
        })
        params.detail.push(obj)
      })
      saveMekTable(params).then(res => {
        this.$parent.$parent.getMekTable()
      })
    },
    addRow () {
      let addRowList = {}
      this.gridData.title.forEach(item => {
        if (item.label === 'label#-1') {
          addRowList[item.label] = "自定义" + (this.gridData1.length + 1)
        } else {
          addRowList[item.label] = ""
        }
        addRowList['id#' + item.label.split("#")[1]] = ""
        addRowList.editMode = true
        addRowList['index'] = this.gridData1.length + 1
      })
      this.gridData1.push(addRowList)
      this.gridData1 = [...this.gridData1]
      console.log(this.gridData1)
    },
  },
  mounted () {
  }
};
</script>
 
<style>
.edit-cell {
  min-height: 35px;
  /* cursor: pointer; */
}
.titleBox {
  display: flex;
  width: 100%;
  justify-content: flex-end;
}
</style>