<!--
 * @Author: yourname
 * @Date: 2021-04-13 17:30:36
 * @LastEditTime: 2022-03-31 22:30:31
 * @LastEditors: YoHo
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
            :row-class-name="rowStyle">
    <el-table-column v-if="selection"
                     type='selection'
                     width="55"
                     align='center'></el-table-column>
    <el-table-column v-if='index'
                     type='index'
                     width='50'
                     align='center'
                     label='#'
                     :index="indexMethod"></el-table-column>
    <template v-for="(items,index) in tableTitle">
      <!--类别-->
      <el-table-column v-if="items.props === 'partName'"
                       :width="items.width"
                       :show-overflow-tooltip='items.tooltip'
                       :key="index"
                       align='center'
                       :label="items.key ? language(items.key, items.name) : items.name"
                       :prop="items.props"
                       :fixed="items.fixed">
        <template slot-scope="scope">
          <iSelect v-if="scope.row.newRow"
                   v-model="scope.row[items.props]"
                   @change="handleNewRowClassTypeSelectChange({event: $event, row:scope.row})">
            <el-option v-for="item of classTypeSelect"
                       :key='item.value'
                       :value='item.value'
                       :label="item.name" />
          </iSelect>
          <span v-else>{{ scope.row[items.props] }}</span>
        </template>
      </el-table-column>
      <!--价格影响系数%-->
      <el-table-column v-if="items.props === 'costProportion'"
                       :width="items.width"
                       :show-overflow-tooltip='items.tooltip'
                       :key="index"
                       align='center'
                       :label="items.key ? language(items.key, items.name) : items.name"
                       :prop="items.props"
                       :fixed="items.fixed">
        <template slot-scope="scope">
          <iInput @input="handleNumber($event,scope.row, 'costProportion')"
                  v-if="isTableEdit"
                  v-model="scope.row[items.props]"
                  :maxlength="50" />
          <span v-else>{{ scope.row[items.props] }}</span>
        </template>
      </el-table-column>
      <!--价格变动比率%-->
      <el-table-column v-if="items.props === 'priceChange'"
                       :width="items.width"
                       :show-overflow-tooltip='items.tooltip'
                       :key="index"
                       align='center'
                       :label="items.key ? language(items.key, items.name) : items.name"
                       :prop="items.props"
                       :fixed="items.fixed">
        <template slot-scope="scope">
          <div class="rateOfChange"
               :style="{'backgroundColor': scope.row.color}">
            <template v-if="Number(scope.row[items.props]) > 0">+</template>
            {{ scope.row[items.props] }}
          </div>
        </template>
      </el-table-column>
      <!--CBD-->
      <el-table-column v-if="items.props === 'attributeValue'"
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
      <el-table-column v-if="items.props === 'systemMatch'"
                       :key="index"
                       :label="items.key ? language(items.key, items.name) : items.name"
                       :prop="items.props"
                       :fixed="items.fixed">
        <template v-if="items.children.length>0">
          <el-table-column v-for="(itemSmall,num) in items.children"
                        :key="num"
                        :width="itemSmall.width"
                        :show-overflow-tooltip='itemSmall.tooltip'
                        align='center'
                        :label="itemSmall.key ? $t(itemSmall.key) : itemSmall.name"
                        :prop="itemSmall.props"
                        :fixed="itemSmall.fixed"
                        >
            <template slot-scope="scope">
              <template v-if="isTableEdit">
                <template v-if="itemSmall.props === 'systemMatch1'">
                  <iSelect v-model="scope.row[getMatchProps({props: FIRSTSELECT, row: scope.row})]"
                          @focus="handleGetSelectList({props: '',row: scope.row})"
                          @change="handleSelectChange({props:FIRSTSELECT , event: $event, row:scope.row})"
                          style="width: 120px;margin-right: 10px;"
                          value-key="id"
                          :loading="selectLoading">
                    <template v-if="scope.row.newRow">
                      <el-option v-for="item of selectOptionsObject[scope.row.time][FIRSTSELECT]"
                                :key='item.id'
                                :value='item'
                                :label="getSelectLabel({props: FIRSTSELECT, row:scope.row, itemData: item})" />
                    </template>
                    <template v-else>
                      <el-option v-for="item of selectOptionsObject[scope.row.id || scope.row.time][FIRSTSELECT]"
                                :key='item.id'
                                :value='item'
                                :label="getSelectLabel({props: FIRSTSELECT, row:scope.row, itemData: item})" />
                    </template>
                  </iSelect>
                </template>

                <template v-if="itemSmall.props === 'systemMatch2'">
                  <iSelect v-if="scope.row.dataType === classType['rawMaterial']"
                          v-model="scope.row[getMatchProps({props: THIRDSELECT, row: scope.row})]"
                          @change="handleSelectChange({props:THIRDSELECT , event: $event, row:scope.row})"
                          style="width: 120px;margin-right: 10px;"
                          value-key="id"
                          :loading="selectLoading">
                    <template v-if="scope.row.newRow">
                      <el-option v-for="item of selectOptionsObject[scope.row.time][THIRDSELECT]"
                                :key='item.id'
                                :value='item'
                                :label="getSelectLabel({props: THIRDSELECT, row:scope.row, itemData: item})" />
                    </template>
                    <template v-else>
                      <el-option v-for="item of selectOptionsObject[scope.row.id || scope.row.time][THIRDSELECT]"
                                :key='item.id'
                                :value='item'
                                :label="getSelectLabel({props: THIRDSELECT, row:scope.row, itemData: item})" />
                    </template>
                  </iSelect>

                  <iSelect v-else
                          v-model="scope.row[getMatchProps({props: SECONDSELECT, row: scope.row})]"
                          @change="handleSelectChange({props:SECONDSELECT , event: $event, row:scope.row})"
                          style="width: 120px;margin-right: 10px;"
                          value-key="id"
                          :loading="selectLoading">
                    <template v-if="scope.row.newRow">
                      <el-option v-for="item of selectOptionsObject[scope.row.time][SECONDSELECT]"
                                :key='item.id'
                                :value='item'
                                :label="getSelectLabel({props: SECONDSELECT, row:scope.row, itemData: item})" />
                    </template>
                    <template v-else>
                      <el-option v-for="item of selectOptionsObject[scope.row.id || scope.row.time][SECONDSELECT]"
                                :key='item.id'
                                :value='item'
                                :label="getSelectLabel({props: SECONDSELECT, row:scope.row, itemData: item})" />
                    </template>
                  </iSelect>
                </template>

                <template v-if="itemSmall.props === 'systemMatch3'">
                  <div class="systemMatchText" style="width: auto;">
                    <template>
                      {{ language('PI.SHUJULAIYUAN', '数据来源') }}（{{ scope.row.partSource ? scope.row.partSource : '' }}）
                    </template>
                    <!-- <iconTips v-if="!scope.row.isMatch"
                              iconName="iconzhongyaoxinxitishi"
                              :tipContent="language('PI.SHUJULAIYUANTISHI', '由于CBD与市场数据匹配失败，此项无法生成对应的指数变动百分比，可手动补充系统匹配模块信息。')"
                              class="margin-left6"
                              :iconStyle="{'fontSize': '12px'}" /> -->
                  </div>
                </template>
              </template>
          
              <template v-else>
                <template v-if="itemSmall.props === 'systemMatch1'">
                  <el-popover placement="top-start"
                              width="200"
                              trigger="hover"
                              :content="getMatchTextLabel({props: FIRSTSELECT, row: scope.row })">
                    <div class="systemMatchText"
                        slot="reference">
                      <span>{{ scope.row[getMatchProps({props: FIRSTSELECT, row: scope.row})] }}</span>
                    </div>
                  </el-popover>
                </template>

                <template v-if="itemSmall.props === 'systemMatch2'">
                  <el-popover v-if="scope.row.dataType === classType['rawMaterial']"
                              placement="top-start"
                              width="200"
                              trigger="hover"
                              :content="getMatchTextLabel({props: THIRDSELECT, row: scope.row })">
                    <div class="systemMatchText"
                        slot="reference">
                        <span>{{ scope.row[getMatchProps({props: THIRDSELECT, row: scope.row})] }}</span>
                    </div>
                  </el-popover>
                  <el-popover v-else
                              placement="top-start"
                              width="200"
                              trigger="hover"
                              :content="getMatchTextLabel({props: SECONDSELECT, row: scope.row })">
                    <div class="systemMatchText"
                        slot="reference">
                        <span>{{ scope.row[getMatchProps({props: SECONDSELECT, row: scope.row})] }}</span>
                    </div>
                  </el-popover>
                </template>
                <template v-if="itemSmall.props === 'systemMatch3'">
                  <div class="systemMatchText" style="width: auto;">
                    <template>
                      <el-popover placement="top-start"
                                  width="200"
                                  trigger="hover"
                                  :content="language('PI.SHUJULAIYUAN', '数据来源') + '：' + scope.row.partSource ? scope.row.partSource : ''">
                        <span slot="reference">
                          {{ scope.row.partSource ? scope.row.partSource : '' }}
                        </span>
                      </el-popover>
                    </template>
                    <iconTips v-if="!scope.row.isMatch"
                              iconName="iconzhongyaoxinxitishi"
                              :tipContent="language('PI.SHUJULAIYUANTISHI', '由于CBD与市场数据匹配失败，此项无法生成对应的指数变动百分比，可手动补充系统匹配模块信息。')"
                              class="margin-left6"
                              :iconStyle="{'fontSize': '12px'}" />
                  </div>
                </template>
              </template>
            </template>
          </el-table-column>
        </template>
        
          
          <!-- <template slot-scope="scope"> -->

            <!-- <div class="systemMatchBox">
              <template v-if="isTableEdit">

                <iSelect v-model="scope.row[getMatchProps({props: FIRSTSELECT, row: scope.row})]"
                         @focus="handleGetSelectList({props: '',row: scope.row})"
                         @change="handleSelectChange({props:FIRSTSELECT , event: $event, row:scope.row})"
                         style="width: 120px;margin-right: 10px;"
                         value-key="id"
                         :loading="selectLoading">
                  <template v-if="scope.row.newRow">
                    <el-option v-for="item of selectOptionsObject[scope.row.time][FIRSTSELECT]"
                               :key='item.id'
                               :value='item'
                               :label="getSelectLabel({props: FIRSTSELECT, row:scope.row, itemData: item})" />
                  </template>
                  <template v-else>
                    <el-option v-for="item of selectOptionsObject[scope.row.id || scope.row.time][FIRSTSELECT]"
                               :key='item.id'
                               :value='item'
                               :label="getSelectLabel({props: FIRSTSELECT, row:scope.row, itemData: item})" />
                  </template>
                </iSelect>

                <iSelect v-model="scope.row[getMatchProps({props: SECONDSELECT, row: scope.row})]"
                         @change="handleSelectChange({props:SECONDSELECT , event: $event, row:scope.row})"
                         style="width: 120px;margin-right: 10px;"
                         value-key="id"
                         :loading="selectLoading">
                  <template v-if="scope.row.newRow">
                    <el-option v-for="item of selectOptionsObject[scope.row.time][SECONDSELECT]"
                               :key='item.id'
                               :value='item'
                               :label="getSelectLabel({props: SECONDSELECT, row:scope.row, itemData: item})" />
                  </template>
                  <template v-else>
                    <el-option v-for="item of selectOptionsObject[scope.row.id || scope.row.time][SECONDSELECT]"
                               :key='item.id'
                               :value='item'
                               :label="getSelectLabel({props: SECONDSELECT, row:scope.row, itemData: item})" />
                  </template>
                </iSelect>

                <iSelect v-if="scope.row.dataType === classType['rawMaterial']"
                         v-model="scope.row[getMatchProps({props: THIRDSELECT, row: scope.row})]"
                         @change="handleSelectChange({props:THIRDSELECT , event: $event, row:scope.row})"
                         style="width: 120px;margin-right: 10px;"
                         value-key="id"
                         :loading="selectLoading">
                  <template v-if="scope.row.newRow">
                    <el-option v-for="item of selectOptionsObject[scope.row.time][THIRDSELECT]"
                               :key='item.id'
                               :value='item'
                               :label="getSelectLabel({props: THIRDSELECT, row:scope.row, itemData: item})" />
                  </template>
                  <template v-else>
                    <el-option v-for="item of selectOptionsObject[scope.row.id || scope.row.time][THIRDSELECT]"
                               :key='item.id'
                               :value='item'
                               :label="getSelectLabel({props: THIRDSELECT, row:scope.row, itemData: item})" />
                  </template>
                </iSelect>
                <div v-else
                     style="width: 120px;margin-right: 10px;" />
              </template>
              <template v-else>
                <el-popover placement="top-start"
                            width="200"
                            trigger="hover"
                            :content="getMatchTextLabel({props: FIRSTSELECT, row: scope.row })">
                  <div class="systemMatchText"
                       slot="reference">
                    <span>{{ getMatchTextLabel({props: FIRSTSELECT, row: scope.row}) }}</span>
                  </div>
                </el-popover>
                <el-popover placement="top-start"
                            width="200"
                            trigger="hover"
                            :content="getMatchTextLabel({props: SECONDSELECT, row: scope.row })">
                  <div class="systemMatchText"
                       slot="reference">
                    <span>{{ getMatchTextLabel({props: SECONDSELECT, row: scope.row}) }}</span>
                  </div>
                </el-popover>
                <el-popover placement="top-start"
                            width="200"
                            trigger="hover"
                            :content="getMatchTextLabel({props: THIRDSELECT, row: scope.row })">
                  <div class="systemMatchText"
                       slot="reference">
                    <span>{{ getMatchTextLabel({props: THIRDSELECT, row: scope.row}) }}</span>
                  </div>
                </el-popover>
              </template>
              <div class="systemMatchText"
                   style="width: auto;">
                <template v-if="!isTableEdit">
                  <el-popover placement="top-start"
                              width="200"
                              trigger="hover"
                              :content="language('PI.SHUJULAIYUAN', '数据来源') + '：' + scope.row.partSource ? scope.row.partSource : ''">
                    <span slot="reference">
                      {{ language('PI.SHUJULAIYUAN', '数据来源') }}: {{ scope.row.partSource ? scope.row.partSource : '' }}
                    </span>
                  </el-popover>
                </template>
                <template v-else>
                  {{ language('PI.SHUJULAIYUAN', '数据来源') }}（{{ scope.row.partSource ? scope.row.partSource : '' }}）
                </template>
                <iconTips v-if="!scope.row.isMatch"
                          iconName="iconzhongyaoxinxitishi"
                          :tipContent="language('PI.SHUJULAIYUANTISHI', '由于CBD与市场数据匹配失败，此项无法生成对应的指数变动百分比，可手动补充系统匹配模块信息。')"
                          class="margin-left6"
                          :iconStyle="{'fontSize': '12px'}" />
              </div>
            </div> -->
          <!-- </template> -->
        <!-- </el-table-column> -->

      </el-table-column>
      <!--显示隐藏-->
      <el-table-column v-if="items.props === 'isShow'"
                       :width="items.width"
                       :show-overflow-tooltip='items.tooltip'
                       :key="index"
                       align='center'
                       :label="items.key ? language(items.key, items.name) : items.name"
                       :prop="items.props"
                       :fixed="items.fixed">
        <template slot-scope="scope">
          <div @click="handleHide(scope.row)"
               v-if="isShowTable">
            <icon symbol
                  name="iconxianshi"
                  class="iconStyle cursor" />
          </div>
          <div @click="handleShow(scope.row)"
               v-else>
            <icon symbol
                  name="iconyincang"
                  class="iconStyle cursor" />
          </div>
        </template>
      </el-table-column>
    </template>
  </el-table>
</template>
<script>
import { iInput, iSelect, icon } from 'rise';
import {
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
import { numberProcessor } from '@/utils';

export default {
  props: {
    tableData: { type: Array },
    tiledTableData: { type: Array },
    tableTitle: { type: Array },
    tableLoading: { type: Boolean, default: false },
    selection: { type: Boolean, default: true },
    index: { type: Boolean, default: false },
    height: { type: Number || String },
    customIndex: { type: Number, default: 0 },
    rowKey: { type: String, default: 'id' },
    isShowTable: { type: Boolean, default: true },
    isTableEdit: { type: String, default: '' },
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
  data () {
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
    aababba(data){
      console.log(data)
    },
    handleSelectionChange (val) {
      this.$emit('handleSelectionChange', val);
    },
    async handleSelectChange ({ props, event, row }) {

      let req = {};
      switch (row.dataType) {
        case this.classType['rawMaterial']:

          if (props === this.FIRSTSELECT) {
            req.rawMaterialDetails = event.rawMaterialDetails;
            row.rawMaterialDetails = event.rawMaterialDetails;
            row.partType = event.rawMaterialDetails.split("-")[0];

            row.partSource = null;
          }
           else if (props === this.THIRDSELECT) {
            // req.classType = event.classType;
            // req.specs = event.specs;
            req.areaName = event.area;
            req.rawMaterialDetails = row.rawMaterialDetails;
          }
          break;
        case this.classType['manpower']:
          if (props === this.FIRSTSELECT) {
            req.profession = event.profession;
            row.profession = event.profession;
            row.partSource = null;
          }
          else if (props === this.SECONDSELECT) {
            req.area = event.city;
            req.profession = row.profession;
          }
          break;
        case this.classType['exchangeRate']:
          if (props === this.FIRSTSELECT) {
            req.currency = event.currency;
          }
          break;
      }
      this.$emit('handleSelectReset', { props, row });
      this.selectLoading = true;
      await this.handleGetSelectList({ props, row, req });
      this.selectLoading = false;
    },
    indexMethod (index) {
      return index + 1 + this.customIndex;
    },
    handleHide (row) {
      this.$emit('handleHide', row);
    },
    handleShow (row) {
      this.$emit('handleShow', row);
    },
    borderStyle ({ column }) {
      switch (column.property) {
        case 'systemMatch':
        case 'isShow':
          return 'border-left: 3px solid white;text-align:center;';
      }
    },
    headerBorderStyle ({ column }) {
      switch (column.property) {
        case 'systemMatch':
        case 'isShow':
          return 'border-left: 3px solid white;text-align:center;';
      }
    },
    rowStyle ({ row }) {
      if (row[FIRSTEXCHANGERATE]) {
        return 'rowStyle';
      }
    },
    // 获取下拉
    async handleGetSelectList ({ props, row, req = {} }) {//---------------------------------------
      this.selectLoading = true;
      let selectList = '';
      switch (row.dataType) {
        case this.classType['rawMaterial']:
          selectList = (await getSelectMateria(req)).data;
          
          if (props === this.THIRDSELECT) {
            if(selectList.length>0){
              row.partSource = selectList[0].dataSource;
            }
          }

          break;
        case this.classType['manpower']:
          selectList = (await getSelectManpower(req)).data;

          if (props === this.SECONDSELECT) {
            if(selectList.length>0){
              row.partSource = selectList[0].dataSource;
            }
          }

          break;
        case this.classType['exchangeRate']:
          if (props === '') {
            selectList = (await getSelectCountry(req)).data;
          } else if (props === this.FIRSTSELECT) {
            selectList = (await getSelectExchange(req)).data;
          }
          break;
      }
      this.selectLoading = false;
      this.$emit('handleGetSelectList', { props, row, selectList });
    },
    // 获取select Label
    getSelectLabel ({ props, row, itemData }) {
      switch (row.dataType) {
        case this.classType['rawMaterial']:
          if (props === this.FIRSTSELECT) {
            return itemData.rawMaterialDetails;
          }
          else if (props === this.SECONDSELECT) {
            return itemData.area;
          } 
          else if (props === this.THIRDSELECT) {
            return itemData.area;
          }
          break;
        case this.classType['manpower']:
          if (props === this.FIRSTSELECT) {
            return itemData.profession;
          } else if (props === this.SECONDSELECT) {
            return itemData.city;
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
    handleNewRowClassTypeSelectChange ({ event, row }) {
      if(event == "1"){
        row.work = null;
        row.workProvince = null;

        row.partSource = null;

        row.productionCountry = null;
        row.currency = null;
      }else if(event == "2"){
        row.partType = null;
        row.partNumber = null;
        row.partRegion = null;

        row.partSource = null;

        row.productionCountry = null;
        row.currency = null;
      }else if(event == "3"){
        row.partType = null;
        row.partNumber = null;
        row.partRegion = null;

        row.partSource = null;

        row.work = null;
        row.workProvince = null;
      }
      
      row.dataType = event;
      this.handleGetSelectList({ props: '', row });
    },
    // 获取匹配props
    getMatchProps ({ props, row }) {
      switch (row.dataType) {
        case this.classType['rawMaterial']:
          if (props === this.FIRSTSELECT) {
            return 'rawMaterialDetails';
          }
           else if (props === this.SECONDSELECT) {
            return 'partNumber';
          } 
          else if (props === this.THIRDSELECT) {
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
    getMatchTextLabel ({ props, row }) {
      const value = row[this.getMatchProps({ props, row })] ? `（${row[this.getMatchProps({ props, row })]}）` : '（）';
      // console.log(value)
      switch (row.dataType) {
        case this.classType['rawMaterial']:
          if (props === this.FIRSTSELECT) {
            return this.language('PI.LEIBIE', '类别') + value;
          } else if (props === this.SECONDSELECT) {
            return this.language('PI.GUIGEPAIHAO', '规格/牌号') + value;
          } 
          else if (props === this.THIRDSELECT) {
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
    handleNumber (val, row, props) {
      this.$set(row, props, numberProcessor(val, 2));
    },
  },
};
</script>
<style lang='scss'>
::v-deep .has-gutter{
  text-align: center;
}
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
      width: 80%;
      text-align: left;
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
    color: #ffffff;
  }
}

.el-table .rowStyle td {
  border-top: 3px dashed #727272;
}
</style>
