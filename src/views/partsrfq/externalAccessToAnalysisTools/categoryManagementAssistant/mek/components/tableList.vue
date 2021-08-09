<!--
 * @Author: your name
 * @Date: 2021-08-06 11:07:05
 * @LastEditTime: 2021-08-09 09:44:05
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\views\partsrfq\externalAccessToAnalysisTools\categoryManagementAssistant\mek\components\tableList.vue
-->
<template>
  <div id="app">
    <el-table :data="gridData1"
              style="width: 100%">
      <!-- <el-table-column label="Operations"
                       min-width="180">
        <template slot-scope="{row, index}">
          <el-button icon="el-icon-edit"
                     @click="setEditMode(row, index)">
          </el-button>
          <el-button type="success"
                     icon="el-icon-check"
                     @click="saveRow(row, index)">
          </el-button>
        </template>
      </el-table-column> -->
      <el-table-column type="selection"
                       width="55">
      </el-table-column>
      <el-table-column label="#"
                       prop="index"
                       width="55">
      </el-table-column>

      <el-table-column label="Name"
                       min-width="180">
        <editable-cell :show-input="row.editMode"
                       slot-scope="{row}"
                       v-model="row.name">
          <span slot="content">{{row.name}}</span>
        </editable-cell>
      </el-table-column>

      <el-table-column min-wwidth="150"
                       label="Gender">
        <editable-cell :show-input="row.editMode"
                       slot-scope="{row}"
                       editable-component="el-select"
                       close-event="change"
                       v-model="row.gender">
          <el-tag size="medium"
                  :type="row.gender === 'M' ? 'primary' : 'danger'"
                  slot="content">
            {{row.gender === 'M' ? 'Male': 'Female'}}
          </el-tag>
          <template slot="edit-component-slot">
            <el-option value="M"
                       label="Male"></el-option>
            <el-option value="F"
                       label="Female"></el-option>
          </template>
        </editable-cell>
      </el-table-column>

      <el-table-column label="Birth Date"
                       min-width="250">
        <editable-cell :show-input="row.editMode"
                       slot-scope="{row}"
                       editable-component="el-date-picker"
                       format="yyyy-MM-dd"
                       value-format="yyyy-MM-dd"
                       v-model="row.date">
          <span slot="content">{{row.date}}</span>
        </editable-cell>
      </el-table-column>
    </el-table>
  </div>
</template>
 
<script>
import EditableCell from "./editCell";
export default {
  name: "App",
  components: {
    EditableCell
  },
  props: {
    gridData: {
      type: Array,
      default: () => {
        return []
      }
    },
    editFlag: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    editFlag: {
      handler (newVal) {
        console.log(newVal)
        if (newVal) {
          this.gridData1.forEach(item => {
            item.editMode = true
          })
        } else {
          this.gridData1.forEach(item => {
            item.editMode = false
          })
        }
      }
    }
  },
  data () {
    return {
      gridData1: []
    };
  },
  methods: {
    setEditMode (row, index) {
      row.editMode = true;
    },
    saveRow (row, index) {
      row.editMode = false;
    }
  },
  mounted () {
    this.gridData1 = this.gridData.map(row => {
      return {
        ...row,
        editMode: false
      };
    });
  }
};
</script>
 
<style>
.edit-cell {
  min-height: 35px;
  /* cursor: pointer; */
}
</style>