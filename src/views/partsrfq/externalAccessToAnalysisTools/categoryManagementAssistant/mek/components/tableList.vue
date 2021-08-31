<!--
 * @Author: your name
 * @Date: 2021-08-06 11:07:05
 * @LastEditTime: 2021-08-31 14:04:51
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\views\partsrfq\externalAccessToAnalysisTools\categoryManagementAssistant\mek\components\tableList.vue
-->
<template>

  <iCard class="tableList">
    <template v-slot:header>
      <div class="titleBox"
           v-if="!preview">
        <div v-if="!editFlag">
          <iButton @click="addRow">新增</iButton>
          <iButton @click="del">删除</iButton>
          <iButton @click="edit">编辑</iButton>
        </div>
        <div v-else>
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
                       width="55">
      </el-table-column>
      <el-table-column v-for="(item,index) in gridData.title"
                       :key="index"
                       :label="item.motorTypeName"
                       min-width="180">
        <el-table-column :label="gridData.config[item.label]"
                         :prop="item.label">
          <editable-cell slot-scope="{row}"
                         :show-input="row.editMode"
                         v-model="row[item.label]">
            <span slot="content">{{row[item.label]}}</span>
          </editable-cell>
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
    }
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
      console.log(val, "111111")
    },
    gridData: {
      handler (newVal) {
        if (newVal) {
          if (newVal.data) {
            this.tableData = newVal.data
            this.gridData1 = this.tableData.map((row, index) => {
              return {
                ...row,
                index: index + 1,
                editMode: false
              }
            });
          } else {
            newVal.data = []
            this.tableData = newVal.data
            this.gridData1 = this.tableData.map((row, index) => {
              return {
                ...row,
                index: index + 1,
                editMode: false
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
        addRowList[item.label] = ""
        addRowList['id#' + item.label.split("#")[1]] = ""
        addRowList.editMode = false
      })
      if (!this.gridData1) {
        this.gridData1.push(addRowList)
        this.gridData1 = [...this.gridData1]
      } else {
        this.gridData1.push(addRowList)
        this.gridData1 = [...this.gridData1]
      }

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