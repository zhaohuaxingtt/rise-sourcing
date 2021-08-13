<!--
 * @Author: yourname
 * @Date: 2021-04-13 17:30:36
 * @LastEditTime: 2021-08-06 14:22:35
 * @LastEditors: Please set LastEditors
 * @Description: 通用表格
-->
<template>
  <el-table :height="height"
            class="tableBox"
            ref="dataTable"
            tooltip-effect='light'
            :data='tableData'
            :empty-text="$t('LK_ZANWUSHUJU')"
            v-loading='tableLoading'
            @selection-change="handleSelectionChange"
            :row-key="rowKey"
            :cell-style="borderStyle"
            :header-cell-style="headerBorderStyle"
            :row-class-name="rowStyle"
  >
    <el-table-column v-if="selection"
                     type='selection'
                     width="50"
                     align='center'></el-table-column>
    <el-table-column v-if='index'
                     type='index'
                     width='50'
                     align='center'
                     label='#'
                     :index="indexMethod"></el-table-column>
    <template v-for="(items,index) in tableTitle">
      <!--类别-->
      <el-table-column
          v-if="items.props === 'a'"
          :width="items.width"
          :show-overflow-tooltip='items.tooltip'
          :key="index"
          align='center'
          :label="items.key ? language(items.key, items.name) : items.name"
          :prop="items.props"
          :fixed="items.fixed">
        <template slot-scope="scope">
          <iInput
              v-if="scope.row.newRow"
              v-model="scope.row[items.props]"
              :maxlength="50"
          />
          <span v-else>{{ scope.row[items.props] }}</span>
        </template>
      </el-table-column>
      <!--价格影响系数%-->
      <el-table-column
          v-if="items.props === 'b'"
          :width="items.width"
          :show-overflow-tooltip='items.tooltip'
          :key="index"
          align='center'
          :label="items.key ? language(items.key, items.name) : items.name"
          :prop="items.props"
          :fixed="items.fixed">
        <template slot-scope="scope">
          <iInput
              v-if="isTableEdit"
              v-model="scope.row[items.props]"
              :maxlength="50"
          />
          <span v-else>{{ scope.row[items.props] }}</span>
        </template>
      </el-table-column>
      <!--价格变动比率%-->
      <el-table-column
          v-if="items.props === 'c'"
          :width="items.width"
          :show-overflow-tooltip='items.tooltip'
          :key="index"
          align='center'
          :label="items.key ? language(items.key, items.name) : items.name"
          :prop="items.props"
          :fixed="items.fixed"
      >
        <template slot-scope="scope">
          <div class="rateOfChange" :style="{'backgroundColor': getColor({colorArray: rawMaterialColor})}">
            {{ scope.row.c }}
          </div>
        </template>
      </el-table-column>
      <!--CBD-->
      <el-table-column
          v-if="items.props === 'd'"
          :width="items.width"
          :show-overflow-tooltip='items.tooltip'
          :key="index"
          align='center'
          :label="items.key ? language(items.key, items.name) : items.name"
          :prop="items.props"
          :fixed="items.fixed">
        <template slot-scope="scope">
          <span>{{ scope.row[items.props] }}</span>
        </template>
      </el-table-column>
      <!--系统匹配信息-->
      <el-table-column
          v-if="items.props === 'systemMatch'"
          :width="items.width"
          :show-overflow-tooltip='items.tooltip'
          :key="index"
          align='center'
          :label="items.key ? language(items.key, items.name) : items.name"
          :prop="items.props"
          :fixed="items.fixed"
      >
        <template slot-scope="scope">
          <div class="systemMatchBox">
            <template v-if="isTableEdit">
              <iSelect v-model="scope.row.q"
                       @visible-change="(boolean)=>handleGetFirstList(boolean,scope.row)"
                       @change="(value)=>handleSelectChange({props:items.props,value, time:scope.row.time})"
                       style="width: 120px;margin-right: 10px;"
              >
                <el-option
                    :key='1'
                    :value='1'
                    :label="1"/>
                <el-option
                    :key='2'
                    :value='2'
                    :label="2"/>
              </iSelect>
              <iSelect v-model="scope.row.w"
                       @change="(value)=>handleSelectChange({props:items.props,value, time:scope.row.time})"
                       style="width: 120px;margin-right: 10px;"
              >
                {{ scope.row.d }}
              </iSelect>
              <iSelect v-model="scope.row.e"
                       @change="(value)=>handleSelectChange({props:items.props,value, time:scope.row.time})"
                       style="width: 120px;margin-right: 10px;"
              >
                {{ scope.row.d }}
              </iSelect>
            </template>
            <template v-else>
              <div class="systemMatchText">{{ scope.row.q }}</div>
              <div class="systemMatchText">{{ scope.row.w }}</div>
              <div class="systemMatchText">{{ scope.row.e }}</div>
            </template>
            <div class="systemMatchText" style="width: auto;">
              <span>数据来源: XXXXXXXX</span>
              <iconTips
                  iconName="iconzhongyaoxinxitishi"
                  :tipContent="language('PI.SHUJULAIYUANTISHI', '由于CBD与市场数据匹配失败，此项无法生成\n'+'对应的指数变动百分比，可手动补充系统匹配\n'+'模块信息。')"
                  class="margin-left6"
                  :iconStyle="{'fontSize': '12px'}"
              />
            </div>
          </div>
        </template>
      </el-table-column>
      <!--显示隐藏-->
      <el-table-column
          v-if="items.props === 'isShow'"
          :width="items.width"
          :show-overflow-tooltip='items.tooltip'
          :key="index"
          align='center'
          :label="items.key ? language(items.key, items.name) : items.name"
          :prop="items.props"
          :fixed="items.fixed">
        <template slot-scope="scope">
          <div @click="handleHide(scope.row)" v-if="isShowTable">
            <icon symbol name="iconxianshi" class="iconStyle cursor"/>
          </div>
          <div @click="handleShow(scope.row)" v-else>
            <icon symbol name="iconyincang" class="iconStyle cursor"/>
          </div>
        </template>
      </el-table-column>
    </template>
  </el-table>
</template>
<script>
import {iInput, iSelect, icon} from 'rise';
import {getColor, rawMaterialColor} from './data';
import iconTips from '../../../../../components/ws3/iconTips';
import {getSelectMateria} from '../../../../../api/partsrfq/piAnalysis/piDetail';

export default {
  props: {
    tableData: {type: Array},
    tiledTableData: {type: Array},
    tableTitle: {type: Array},
    tableLoading: {type: Boolean, default: false},
    selection: {type: Boolean, default: true},
    index: {type: Boolean, default: false},
    height: {type: Number || String},
    customIndex: {type: Number, default: 0},
    rowKey: {type: String, default: 'id'},
    isShowTable: {type: Boolean, default: true},
    isTableEdit: {type: String, default: ''},
  },
  components: {
    iInput,
    iSelect,
    icon,
    iconTips,
  },
  data() {
    return {
      rawMaterialColor,
    };
  },
  methods: {
    getColor,
    handleSelectionChange(val) {
      this.$emit('handleSelectionChange', val);
    },
    handleSelectChange({props, value, time}) {
      const res = {
        props,
        value,
        time,
      };
      this.$emit('handleSelectChange', res);
    },
    indexMethod(index) {
      return index + 1 + this.customIndex;
    },
    handleHide(row) {
      this.$emit('handleHide', row);
    },
    handleShow(row) {
      this.$emit('handleShow', row);
    },
    borderStyle({row, column}) {
      switch (column.property) {
        case 'systemMatch':
        case 'isShow':
          return 'border-left: 3px solid white';
      }
    },
    headerBorderStyle({row, column}) {
      switch (column.property) {
        case 'systemMatch':
        case 'isShow':
          return 'border-left: 3px solid white';
      }
    },
    rowStyle({row, column}) {
      if (row.a === 2) {
        return 'rowStyle';
      }
    },
    // 材料下拉
    async getSelectMateria(req = {}) {
      const res = await getSelectMateria(req);
    },
    handleGetFirstList(boolean, row) {
      if (boolean) {
        switch (row.dataType) {
          case '1':
            this.getSelectMateria();
            break;
        }
      }
    },
  },
};
</script>
<style lang='scss'>
.tableBox {
  .el-select {
    margin: 2px 0;
  }

  ::v-deep .el-table__row .el-input {
    height: 35px !important;

    .el-input__inner {
      height: 35px !important;
    }
  }

  .iconStyle {
    font-size: 22px;
  }

  .systemMatchBox {
    display: flex;
    justify-content: space-around;
    align-items: center;
  }

  .systemMatchText {
    width: 120px;
    display: flex;
    align-items: center;
    font-size: 14px;
    color: #000000;
    white-space: nowrap;
  }

  .whiteBorder {
    border-left: 5px solid white;
    background: red;
  }

  .rateOfChange {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    width: 84px;
    height: 35px;
    border-radius: 5px;
    font-size: 14px;
    font-weight: bold;
    color: #FFFFFF;
  }
}

.el-table .rowStyle td {
  border-top: 3px dashed #727272;
}
</style>
