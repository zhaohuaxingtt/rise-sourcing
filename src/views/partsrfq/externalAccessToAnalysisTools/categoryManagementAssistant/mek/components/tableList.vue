<!--
 * @Author: your name
 * @Date: 2021-08-06 11:07:05
 * @LastEditTime: 2022-01-25 17:11:34
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
          <iButton @click="edit" v-permission="WORKBENCH_RFQ_TPZS_CARD_MEK_INFOR_EDIT">{{$t("LK_BIANJI")}}</iButton>
        </div>
        <div v-else>
          <iButton @click="addRow">{{language('XINZENG','新增')}}</iButton>
          <iButton @click="del">{{language('SHANCHU','删除')}}</iButton>
          <iButton @click="saveTable">{{language('BAOCUN','保存')}}</iButton>
          <iButton @click="cancel">{{language('QUXIAO','取消')}}</iButton>
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
        <el-table-column :prop="item.label"
                         show-overflow-tooltip>
          <editable-cell slot-scope="{row}"
                         :show-input="row.editMode"
                         v-model="row[item.label]">
            <span slot="content">{{row[item.label]}}</span>
          </editable-cell>
          <template slot="header">
            <el-tooltip effect="light"
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
import { iPage, iCard, iButton, iMessage } from 'rise';
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
      if (this.multipleSelection.length === 0) {
        return iMessage.error(this.language('QINGXUANZESHUJU', '请选择数据'))
      }
      let textTypeId = [];
      let index = [];
      this.multipleSelection.forEach(item => {
        textTypeId.push(item.textTypeId)
        index.push(item.index)
      })
      deleteMekTable({
        comparedType: this.$parent.$parent.comparedType,
        schemeId: this.$parent.$parent.schemeId,
        textTypeId,
        index
      }).then(res => {
        if (res?.code === '200') {
          this.$parent.$parent.getMekTable()
        } else {
          iMessage.error(res.desZh)
        }

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
        h('p', {
          style: {
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap'
          },
          on: {
            hover: () => {

            }
          },
        }, header[0]),
        h('p', {
          style: {
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap'
          }
        }, header[1]),
        h('p', {
          style: {
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap'
          }
        }, header[2]),
        h('p', {
          style: {
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap'
          }
        }, header[3]),
        h('p', {
          style: {
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap'
          }
        }, header[4])
      ])];
    },
    //表格保存
    saveTable () {
      this.editFlag = false
      let params = {
        "comparedType": this.$parent.$parent.comparedType,
        "detail": [],
        "schemeId": this.$parent.$parent.schemeId
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
  flex-direction: row-reverse;
  /* justify-content: flex-end; */
}
</style>