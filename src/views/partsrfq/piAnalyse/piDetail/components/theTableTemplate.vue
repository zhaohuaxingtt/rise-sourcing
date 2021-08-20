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
          v-if="items.props === 'partName'"
          :width="items.width"
          :show-overflow-tooltip='items.tooltip'
          :key="index"
          align='center'
          :label="items.key ? language(items.key, items.name) : items.name"
          :prop="items.props"
          :fixed="items.fixed">
        <template slot-scope="scope">
          <iSelect
              v-if="scope.row.newRow"
              v-model="scope.row[items.props]"
              @change="handleNewRowClassTypeSelectChange({event: $event, row:scope.row})"
          >
            <el-option
                v-for="item of classTypeSelect"
                :key='item.value'
                :value='item.value'
                :label="item.name"/>
          </iSelect>
          <span v-else>{{ scope.row[items.props] }}</span>
        </template>
      </el-table-column>
      <!--价格影响系数%-->
      <el-table-column
          v-if="items.props === 'costProportion'"
          :width="items.width"
          :show-overflow-tooltip='items.tooltip'
          :key="index"
          align='center'
          :label="items.key ? language(items.key, items.name) : items.name"
          :prop="items.props"
          :fixed="items.fixed">
        <template slot-scope="scope">
          <iInput
              @input="handleNumber($event,scope.row, 'costProportion')"
              v-if="isTableEdit"
              v-model="scope.row[items.props]"
              :maxlength="50"
          />
          <span v-else>{{ scope.row[items.props] }}</span>
        </template>
      </el-table-column>
      <!--价格变动比率%-->
      <el-table-column
          v-if="items.props === 'priceChange'"
          :width="items.width"
          :show-overflow-tooltip='items.tooltip'
          :key="index"
          align='center'
          :label="items.key ? language(items.key, items.name) : items.name"
          :prop="items.props"
          :fixed="items.fixed"
      >
        <template slot-scope="scope">
          <div class="rateOfChange" :style="{'backgroundColor': scope.row.color}">
            <template v-if="Number(scope.row[items.props]) > 0">+</template>
            <template v-else-if="Number(scope.row[items.props]) < 0">-</template>
            {{ scope.row[items.props] }}
          </div>
        </template>
      </el-table-column>
      <!--CBD-->
      <el-table-column
          v-if="items.props === 'attributeValue'"
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
              <!--第一个下拉框-->
              <iSelect
                  v-model="scope.row[getMatchProps({props: FIRSTSELECT, row: scope.row})]"
                  @visible-change="(boolean)=>handleGetSelectList({props: '',boolean,row: scope.row})"
                  @change="handleSelectChange({props:FIRSTSELECT , event: $event, row:scope.row})"
                  style="width: 120px;margin-right: 10px;"
                  value-key="id"
                  :loading="selectLoading"
              >
                <template v-if="scope.row.newRow">
                  <el-option
                      v-for="item of selectOptionsObject[scope.row.time][FIRSTSELECT]"
                      :key='item.id'
                      :value='item'
                      :label="getSelectLabel({props: FIRSTSELECT, row:scope.row, itemData: item})"/>
                </template>
                <template v-else>
                  <el-option
                      v-for="item of selectOptionsObject[scope.row.id || scope.row.time][FIRSTSELECT]"
                      :key='item.id'
                      :value='item'
                      :label="getSelectLabel({props: FIRSTSELECT, row:scope.row, itemData: item})"/>
                </template>
              </iSelect>
              <!--第二个下拉框-->
              <iSelect
                  v-model="scope.row[getMatchProps({props: SECONDSELECT, row: scope.row})]"
                  @change="handleSelectChange({props:SECONDSELECT , event: $event, row:scope.row})"
                  style="width: 120px;margin-right: 10px;"
                  value-key="id"
                  :loading="selectLoading"
              >
                <template v-if="scope.row.newRow">
                  <el-option
                      v-for="item of selectOptionsObject[scope.row.time][SECONDSELECT]"
                      :key='item.id'
                      :value='item'
                      :label="getSelectLabel({props: SECONDSELECT, row:scope.row, itemData: item})"/>
                </template>
                <template v-else>
                  <el-option
                      v-for="item of selectOptionsObject[scope.row.id || scope.row.time][SECONDSELECT]"
                      :key='item.id'
                      :value='item'
                      :label="getSelectLabel({props: SECONDSELECT, row:scope.row, itemData: item})"/>
                </template>
              </iSelect>
              <!--第三个下拉框-->
              <iSelect
                  v-if="scope.row.dataType === classType['rawMaterial']"
                  v-model="scope.row[getMatchProps({props: THIRDSELECT, row: scope.row})]"
                  @change="handleSelectChange({props:THIRDSELECT , event: $event, row:scope.row})"
                  style="width: 120px;margin-right: 10px;"
                  value-key="id"
                  :loading="selectLoading"
              >
                <template v-if="scope.row.newRow">
                  <el-option
                      v-for="item of selectOptionsObject[scope.row.time][THIRDSELECT]"
                      :key='item.id'
                      :value='item'
                      :label="getSelectLabel({props: THIRDSELECT, row:scope.row, itemData: item})"/>
                </template>
                <template v-else>
                  <el-option
                      v-for="item of selectOptionsObject[scope.row.id || scope.row.time][THIRDSELECT]"
                      :key='item.id'
                      :value='item'
                      :label="getSelectLabel({props: THIRDSELECT, row:scope.row, itemData: item})"/>
                </template>
              </iSelect>
              <div v-else style="width: 120px;margin-right: 10px;"/>
            </template>
            <template v-else>
              <el-popover
                  placement="top-start"
                  width="200"
                  trigger="hover"
                  :content="getMatchTextLabel({props: FIRSTSELECT, row: scope.row })">
                <div class="systemMatchText" slot="reference">
                  <span>{{ getMatchTextLabel({props: FIRSTSELECT, row: scope.row}) }}</span>
                </div>
              </el-popover>
              <el-popover
                  placement="top-start"
                  width="200"
                  trigger="hover"
                  :content="getMatchTextLabel({props: SECONDSELECT, row: scope.row })">
                <div class="systemMatchText" slot="reference">
                  <span>{{ getMatchTextLabel({props: SECONDSELECT, row: scope.row}) }}</span>
                </div>
              </el-popover>
              <el-popover
                  placement="top-start"
                  width="200"
                  trigger="hover"
                  :content="getMatchTextLabel({props: THIRDSELECT, row: scope.row })">
                <div class="systemMatchText" slot="reference">
                  <span>{{ getMatchTextLabel({props: THIRDSELECT, row: scope.row}) }}</span>
                </div>
              </el-popover>
            </template>
            <div class="systemMatchText" style="width: auto;">
              <el-popover
                  placement="top-start"
                  width="200"
                  trigger="hover"
                  :content="language('PI.SHUJULAIYUAN', '数据来源') + '：' + scope.row.partSource">
                <span slot="reference">
                  <template v-if="isTableEdit">
                      {{ language('PI.SHUJULAIYUAN', '数据来源') }}: {{ scope.row.partSource }}
                  </template>
                  <template v-else>
                     {{ language('PI.SHUJULAIYUAN', '数据来源') }}（{{ scope.row.partSource }}）
                  </template>
                </span>
              </el-popover>
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
import {
  getColor,
  rawMaterialColor,
  FIRSTSELECT,
  SECONDSELECT,
  THIRDSELECT,
  classTypeSelect,
  classType,
  FIRSTEXCHANGERATE,
} from './data';
import iconTips from '../../../../../components/ws3/iconTips';
import {
  getSelectMateria,
  getSelectManpower,
  getSelectCountry,
  getSelectExchange,
} from '../../../../../api/partsrfq/piAnalysis/piDetail';
import {numberProcessor} from '@/utils';

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
    selectOptionsObject: {
      type: Object,
      default: () => {
        return {};
      },
    },
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
      FIRSTSELECT,
      SECONDSELECT,
      THIRDSELECT,
      classTypeSelect,
      classType,
      selectLoading: false,
    };
  },
  methods: {
    getColor,
    handleSelectionChange(val) {
      this.$emit('handleSelectionChange', val);
    },
    async handleSelectChange({props, event, row}) {
      let req = {};
      switch (row.dataType) {
        case this.classType['rawMaterial']:
          if (props === this.FIRSTSELECT) {
            req.classType = event.classType;
          } else if (props === this.SECONDSELECT) {
            req.classType = event.classType;
            req.specs = event.specs;
          }
          break;
        case this.classType['manpower']:
          if (props === this.FIRSTSELECT) {
            req.profession = event.profession;
          }
          break;
        case this.classType['exchangeRate']:
          if (props === this.FIRSTSELECT) {
            req.currency = event.currency;
          }
          break;
      }
      this.$emit('handleSelectReset', {props, row});
      this.selectLoading = true;
      await this.handleGetSelectList({props, boolean: true, row, req});
      this.selectLoading = false;
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
    rowStyle({row}) {
      if (row[FIRSTEXCHANGERATE]) {
        return 'rowStyle';
      }
    },
    // 获取下拉
    async handleGetSelectList({props, boolean, row, req = {}}) {
      this.selectLoading = true;
      let selectList = '';
      if (boolean) {
        switch (row.dataType) {
          case this.classType['rawMaterial']:
            selectList = (await getSelectMateria(req)).data;
            break;
          case this.classType['manpower']:
            selectList = (await getSelectManpower(req)).data;
            break;
          case this.classType['exchangeRate']:
            if (props === '') {
              selectList = (await getSelectCountry(req)).data;
            } else if (props === this.FIRSTSELECT) {
              selectList = (await getSelectExchange(req)).data;
            }
            break;
        }
      }
      this.selectLoading = false;
      this.$emit('handleGetSelectList', {props, row, selectList});
    },
    // 获取select Label
    getSelectLabel({props, row, itemData}) {
      switch (row.dataType) {
        case this.classType['rawMaterial']:
          if (props === this.FIRSTSELECT) {
            return itemData.classType;
          } else if (props === this.SECONDSELECT) {
            return itemData.specs;
          } else if (props === this.THIRDSELECT) {
            return itemData.area;
          }
          break;
        case this.classType['manpower']:
          if (props === this.FIRSTSELECT) {
            return itemData.profession;
          } else if (props === this.SECONDSELECT) {
            return itemData.area;
          }
          break;
        case this.classType['exchangeRate']:
          if (props === this.FIRSTSELECT) {
            return itemData.countryOrigin;
          } else if (props === this.SECONDSELECT) {
            return itemData.currency;
          }
          break;
      }
    },
    handleNewRowClassTypeSelectChange({event, row}) {
      row.dataType = event;
      this.handleGetSelectList({props: '', boolean: true, row});
    },
    // 获取匹配props
    getMatchProps({props, row}) {
      switch (row.dataType) {
        case this.classType['rawMaterial']:
          if (props === this.FIRSTSELECT) {
            return 'partType';
          } else if (props === this.SECONDSELECT) {
            return 'partNumber';
          } else if (props === this.THIRDSELECT) {
            return 'partRegion';
          }
          break;
        case this.classType['manpower']:
          if (props === this.FIRSTSELECT) {
            return 'work';
          } else if (props === this.SECONDSELECT) {
            return 'workProvince';
          }
          break;
        case this.classType['exchangeRate']:
          if (props === this.FIRSTSELECT) {
            return 'productionCountry';
          } else if (props === this.SECONDSELECT) {
            return 'currency';
          }
          break;
      }
    },
    // 系统匹配展示LABEL
    getMatchTextLabel({props, row}) {
      const value = row[this.getMatchProps({props, row})] ? `（${row[this.getMatchProps({props, row})]}）` : '（）';
      switch (row.dataType) {
        case this.classType['rawMaterial']:
          if (props === this.FIRSTSELECT) {
            return this.language('PI.LEIBIE', '类别') + value;
          } else if (props === this.SECONDSELECT) {
            return this.language('PI.GUIGEPAIHAO', '规格/牌号') + value;
          } else if (props === this.THIRDSELECT) {
            return this.language('PI.SHENGSHI', '省市') + value;
          }
          break;
        case this.classType['manpower']:
          if (props === this.FIRSTSELECT) {
            return this.language('PI.GONGZHONG', '工种') + value;
          } else if (props === this.SECONDSELECT) {
            return this.language('PI.SHENGSHI', '省市') + value;
          }
          break;
        case this.classType['exchangeRate']:
          if (props === this.FIRSTSELECT) {
            return this.language('PI.GUOJIA', '国家') + value;
          } else if (props === this.SECONDSELECT) {
            return this.language('PI.HUILVDANWEI', '汇率单位') + value;
          }
          break;
      }
    },
    handleNumber(val, row, props) {
      this.$set(row, props, numberProcessor(val, 2));
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
    overflow: hidden;

    display: flex;
    align-items: center;
    font-size: 14px;
    color: #000000;
    white-space: nowrap;
    text-overflow: ellipsis;

    & span {
      width: 120px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
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
