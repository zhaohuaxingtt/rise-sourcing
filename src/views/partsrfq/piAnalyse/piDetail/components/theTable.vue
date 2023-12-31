<template>
  <div>
    <div class="margin-bottom20 clearFloat">
      <span class="font18 font-weight">
        <span class="margin-right30">{{
            language('PI.LINGJIANJIAGEBODONG', '零件价格波动')
          }}：{{ nowPriceRatio }}%</span>
        <span>{{
            language('PI.ZONGHEJIAGEYINGXIANG', '综合价格影响')
          }}：{{ totalPriceRatio }}%</span>
      </span>
      <div class="floatright">
        <template v-if="isPreview||propSchemeId">
          <span class="text timeRange"
                v-if="currentTab === AVERAGE">{{
              language('PI.SHIJIANDAN', '时间段')
            }}：{{ beginTime }} - {{ endTime }}</span>
        </template>
        <template v-else>
          <template v-if="tableStatus === 'edit'">
            <!--新增-->
            <iButton @click="handleAdd">{{ language('PI.XINZENG', '新增') }}</iButton>
            <!--删除-->
            <iButton @click="handleDelete">{{ $t('delete') }}</iButton>
            <!--取消-->
            <iButton @click="handleCancel">{{ $t('LK_QUXIAO') }}</iButton>
            <!--完成-->
            <iButton @click="handleFinish">{{ language('PI.BAOCUN', '保存') }}</iButton>
          </template>
          <template v-else>
            <!--编辑-->
            <iButton @click="handleEdit" v-permission="WORKBENCH_RFQ_TPZS_CARD_INFOR_EDIT"
                     v-if="tableStatus !== 'edit' && showEditButton">{{ $t('LK_BIANJI') }}</iButton>
          </template>
        </template>
      </div>
    </div>
    <!--显示表格-->
    <theTableTemplate :tableData="tableListData"
                      :tableTitle="tableTitle"
                      :tableLoading="tableLoading"
                      :index="true"
                      :isShowTable="true"
                      :isTableEdit="tableStatus"
                      @handleSelectionChange="handleSelectionChange"
                      @handleHide="handleHide"
                      @handleGetSelectList="({...params})=>handleGetSelectList({...params,tableListData: tableListData})"
                      :selectOptionsObject="selectOptionsObject"
                      @handleSelectReset="({...params})=>handleSelectReset({...params,tableListData: tableListData})"
                      :selection="!isPreview" />
    <el-divider class="margin-top20 margin-bottom20"
                v-if="tableStatus === 'edit'" />
    <!--隐藏表格-->
    <theTableTemplate v-if="tableStatus === 'edit'"
                      :tableData="hideTableData"
                      :tableTitle="tableTitle"
                      :tableLoading="tableLoading"
                      :index="true"
                      :customIndex="tableListData.length"
                      :isShowTable="false"
                      :isTableEdit="tableStatus"
                      @handleSelectionChange="handleHideSelectionChange"
                      @handleShow="handleShow"
                      @handleGetSelectList="({...params})=>handleGetSelectList({...params,tableListData: hideTableData})"
                      :selectOptionsObject="selectOptionsObject"
                      @handleSelectReset="({...params})=>handleSelectReset({...params,tableListData: hideTableData})"
                      :selection="!isPreview" />
  </div>
</template>

<script>
import { iButton, iMessage, iMessageBox } from 'rise';
import {
  tableTitle,
  tableEditTitle,
  FIRSTSELECT,
  SECONDSELECT,
  THIRDSELECT,
  classType,
  classTypeSelect,
  CURRENTTIME,
  AVERAGE,
  FIRSTEXCHANGERATE,
} from './data';
import { toFixedNumber, toThousands } from '@/utils';
import theTableTemplate from './theTableTemplate';
import _ from 'lodash';

export default {
  components: {
    iButton,
    theTableTemplate,
  },
  props: {
    showEditButton: {
      type: Boolean,
      default: true,
    },
    dataInfo: {
      type: Object,
      default: () => {
        return {};
      },
    },
    tableLoading: {
      type: Boolean,
      default: false,
    },
    isPreview: {
      type: Boolean,
      default: false,
    },
    currentTab: {
      type: String,
      default: '',
    },
    averageData: {
      type: Object,
      default: () => {
        return {};
      },
    },
    tableStatus: {
      type: String,
      default: '',
    },
    propSchemeId: {
      type: String,
      default: ""
    }
  },
  computed: {
    pageType () {
      return this.$route.query.type;
    },
  },
  data () {
    return {
      tableListData: [],
      selectTableData: [],
      hideTableData: [],
      hideSelectTableData: [],
      tableTitle: tableTitle,
      recordTableData: [],
      recordHideTableData: [],
      selectOptionsObject: {},
      FIRSTSELECT,
      SECONDSELECT,
      THIRDSELECT,
      classType,
      nowPriceRatio: '',
      totalPriceRatio: '',
      CURRENTTIME,
      AVERAGE,
      beginTime: '',
      endTime: '',
    };
  },
  created () {
    this.getTableList();
  },
  methods: {
    toFixedNumber,
    toThousands,
    handleSelectionChange (val) {
      this.selectTableData = val;
    },
    handleHideSelectionChange (val) {
      this.hideSelectTableData = val;
    },
    handleEdit () {
      this.recordTableData = _.cloneDeep(this.tableListData);
      this.recordHideTableData = _.cloneDeep(this.hideTableData);
      this.$emit('handleTableStatus', 'edit');
    },
    handleAdd () {
      const time = new Date().getTime();
      const newItemList = this.tableTitle.map(item => {
        return item.props;
      });
      const newItem = {};
      newItemList.map(item => {
        newItem[item] = '';
      });
      this.tableListData.push({
        ...newItem,
        time,
        isShow: true,
        newRow: true,
        partName: classTypeSelect[0].name,
        dataType: classTypeSelect[0].value,
      });
      this.selectOptionsObject[time] = {};
    },
    handleDelete () {
      if (this.selectTableData.length === 0 && this.hideSelectTableData.length === 0) {
        return iMessage.warn(this.$t('LK_NINDANGQIANHAIWEIXUANZE'));
      }
      iMessageBox(
        this.$t('LK_SHIFOUQUERENSHANCHU'),
        this.$t('LK_WENXINTISHI'),
        { confirmButtonText: this.$t('LK_QUEDING'), cancelButtonText: this.$t('LK_QUXIAO') },
      ).then(async () => {
        let ids = [], times = [], hideIds = [], hideTimes = [];
        // 显示表格
        this.selectTableData.map(item => {
          if (item.id) {
            ids.push(item.id);
          }
          if (item.time) {
            times.push(item.time);
          }
        });
        if (times.length !== 0) {
          this.tableListData = this.tableListData.filter(item => {
            return !times.includes(item.time);
          });
        }
        if (ids.length !== 0) {
          this.tableListData = this.tableListData.filter(item => {
            return !ids.includes(item.id);
          });
        }
        // 隐藏表格
        this.hideSelectTableData.map(item => {
          if (item.id) {
            hideIds.push(item.id);
          }
          if (item.time) {
            hideTimes.push(item.time);
          }
        });
        if (hideTimes.length !== 0) {
          this.hideTableData = this.hideTableData.filter(item => {
            return !hideTimes.includes(item.time);
          });
        }
        if (hideIds.length !== 0) {
          this.hideTableData = this.hideTableData.filter(item => {
            return !hideIds.includes(item.id);
          });
        }
      });
    },
    handleCancel () {
      this.tableListData = this.recordTableData;
      this.hideTableData = this.recordHideTableData;
      this.$emit('handleTableStatus', '');
    },
    handleFinish () {
      // this.handleAllSaveData();
      this.$emit('handlePriceTableFinish', this.handleAllSaveData());
    },
    handleAllSaveData () {
      const resTableData = this.handleSystemMatchData({ tableListData: this.tableListData });
      const hideTableData = this.handleSystemMatchData({ tableListData: this.hideTableData });
      const res = this.handleValidateTableFinish();
      
      if (res) {
        const tableList = resTableData.concat(hideTableData);

        console.log(
          {
            tableList,
            nowPriceRatio: this.nowPriceRatio,
            totalPriceRatio: this.totalPriceRatio,
            beginTime: this.beginTime,
            endTime: this.endTime,
          }
        )

        return {
          tableList,
          nowPriceRatio: this.nowPriceRatio,
          totalPriceRatio: this.totalPriceRatio,
          beginTime: this.beginTime,
          endTime: this.endTime,
        };
      }
    },
    handleValidateTableFinish () {
      const resTableData = this.handleSystemMatchData({ tableListData: this.tableListData });

      const hideTableData = this.handleSystemMatchData({ tableListData: this.hideTableData });
      const resTableValidate = this.validateFinish(resTableData);
      const hideTableValidate = this.validateFinish(hideTableData, true);

      return resTableValidate && hideTableValidate;
    },
    validateFinish (resTableData, isHideTable = false) {
      let validateStatus = true;
      resTableData.some((item, index) => {
        const newIndex = !isHideTable ? (index + 1) : this.tableListData.length + index + 1;
        switch (item.dataType) {
          case classType.rawMaterial:
            if (!item.partType || !item.partRegion) {
              validateStatus = false;
              iMessage.warn(`#${newIndex}：${this.language('PIBIAOGEJIANYAN', '请完成系统匹配信息的选择。')}`);
            }
            break;
          case classType.manpower:
            if (!item.work || !item.workProvince) {
              validateStatus = false;
              iMessage.warn(`#${newIndex}：${this.language('PIBIAOGEJIANYAN', '请完成系统匹配信息的选择。')}`);
            }
            break;
          case classType.exchangeRate:
            if (!item.productionCountry || !item.currency) {
              validateStatus = false;
              iMessage.warn(`#${newIndex}：${this.language('PIBIAOGEJIANYAN', '请完成系统匹配信息的选择。')}`);
            }
            break;
        }
        return !validateStatus;
      });
      return validateStatus;
    },
    handleSystemMatchData ({ tableListData }) {
      const newList = _.cloneDeep(tableListData);
      newList.map(item => {
        const copyItem = _.cloneDeep(item);
        if (item.dataType === classType['rawMaterial']) {
          // item.work = null;
          // item.workProvince = null;
          // item.productionCountry = null;
          // item.currency = "31313232";

          if (item.partType) {
            item.partType = copyItem.partType.classType || copyItem.partType;
            item.matchId = copyItem.partType.id || copyItem.matchId;
          }
          // if (item.partNumber) {
            item.partNumber = copyItem.rawMaterialDetails.split("-")[1] || copyItem.partNumber;
            // item.partNumber = copyItem.partNumber.specs || copyItem.partNumber;
            // item.matchId = copyItem.partNumber.id || copyItem.matchId;
          // }
          if (item.partRegion) {
            item.partRegion = copyItem.partRegion.area || copyItem.partRegion;
            item.matchId = copyItem.partRegion.id || copyItem.matchId;
          }
        } else if (item.dataType === classType['manpower']) {
          // item.partType = null;
          // item.partNumber = null;
          // item.partRegion = null;

          // item.productionCountry = null;
          // item.currency = "dsdsdsa";

          if (item.work) {
            item.work = copyItem.work.profession || copyItem.work;
            item.matchId = copyItem.work.id || copyItem.matchId;
          }
          if (item.workProvince) {
            item.workProvince = copyItem.workProvince.city || copyItem.workProvince;
            item.matchId = copyItem.workProvince.id || copyItem.matchId;
          }
        } else if (item.dataType === classType['exchangeRate']) {
          // item.partType = null;
          // item.partNumber = null;
          // item.partRegion = null;

          // item.work = null;
          // item.workProvince = null;
          if (item.productionCountry) {
            item.productionCountry = copyItem.productionCountry.countryOrigin || copyItem.productionCountry;
            item.matchId = copyItem.productionCountry.id || copyItem.matchId;
          }
          if (item.currency) {
            item.currency = copyItem.currency.currency || copyItem.currency;
            item.matchId = copyItem.currency.id || copyItem.matchId;
          }
        }
        return item;
      });
      return newList;
    },
    async getTableList () {
      try {
        this.tableListData = [];
        this.hideTableData = [];
        let copyDataInfo = {};
        let copyTableList = [];
        if (this.currentTab === this.CURRENTTIME) {
          copyDataInfo = _.cloneDeep(this.dataInfo);
          this.nowPriceRatio = copyDataInfo.currentPartCostTotalVO.nowPriceRatio;
          this.totalPriceRatio = copyDataInfo.currentPartCostTotalVO.totalPriceRatio;
          this.beginTime = copyDataInfo.currentPartCostTotalVO.beginTime;
          this.endTime = copyDataInfo.currentPartCostTotalVO.endTime;
          copyTableList = copyDataInfo?.currentPartCostTotalVO?.piPartCostVOS;
        } else if (this.currentTab === this.AVERAGE) {
          copyDataInfo = _.cloneDeep(this.averageData);
          this.nowPriceRatio = copyDataInfo.nowPriceRatio;
          this.totalPriceRatio = copyDataInfo.totalPriceRatio;
          this.beginTime = copyDataInfo.beginTime;
          this.endTime = copyDataInfo.endTime;
          copyTableList = copyDataInfo && copyDataInfo.piPartCostVOS;
        }
        let exchangeRateIndex = 0;
        copyTableList.map((item, index) => {
          const time = new Date().getTime() + index;
          if (item.dataType === classType['exchangeRate']) {
            exchangeRateIndex === 0 && (item[FIRSTEXCHANGERATE] = true);
            exchangeRateIndex++;
          }
          if (!item.id) {
            item.time = time;
            this.selectOptionsObject[time] = {};
          } else {
            this.selectOptionsObject[item.id] = {};
          }
          if (item.isShow) {
            this.tableListData.push(item);
          } else {
            this.hideTableData.push(item);
          }
        });
      } catch {
        this.tableListData = [];
        this.hideTableData = [];
      }
    },
    handleHide (row) {
      if (row.time) {
        this.tableListData = this.tableListData.filter(item => {
          return item.time !== row.time;
        });
      } else {
        this.tableListData = this.tableListData.filter(item => {
          return item.id !== row.id;
        });
      }
      row.isShow = false;
      this.hideTableData.push(row);
    },
    handleShow (row) {
      if (row.time) {
        this.hideTableData = this.hideTableData.filter(item => {
          return item.time !== row.time;
        });
      } else {
        this.hideTableData = this.hideTableData.filter(item => {
          return item.id !== row.id;
        });
      }
      row.isShow = true;
      this.tableListData.push(row);
    },
    handleGetSelectList ({ props, row, selectList, tableListData }) {
      const copyObj = _.cloneDeep(this.selectOptionsObject);
      const id = row.id || row.time;
      tableListData.map(item => {
        if ([item.id, row.time].includes(id)) {
          if (props === '') {
            copyObj[id][FIRSTSELECT] = selectList;
          } else if (props === FIRSTSELECT) {
            if (row.dataType === classType['rawMaterial']) {
              copyObj[id][THIRDSELECT] = selectList;
            }else{
              copyObj[id][SECONDSELECT] = selectList;
            }
          } else if (props === SECONDSELECT) {
            copyObj[id][THIRDSELECT] = selectList;
          }
        }
      });

      this.selectOptionsObject = copyObj;
    },
    handleSelectReset ({ props, row, tableListData }) {
      const id = row.id || row.time;
      if (id) {
        if (props === this.FIRSTSELECT) {
          this.selectOptionsObject[id][this.SECONDSELECT] = [];
          this.selectOptionsObject[id][this.THIRDSELECT] = [];
          if (row.dataType === classType['rawMaterial']) {
            this.handleSelectValueReset({ id, valueArray: ['partNumber', 'partRegion'], tableListData });
          } else if (row.dataType === classType['manpower']) {
            this.handleSelectValueReset({ id, valueArray: ['workProvince'], tableListData });
          } else if (row.dataType === classType['exchangeRate']) {
            this.handleSelectValueReset({ id, valueArray: ['currency'], tableListData });
          }
        } else if (props === this.SECONDSELECT) {
          this.selectOptionsObject[id][this.THIRDSELECT] = [];
          if (row.dataType === classType['rawMaterial']) {
            this.handleSelectValueReset({ id, valueArray: ['partRegion'], tableListData });
          }
        }
      }
    },
    handleSelectValueReset ({ id, valueArray, tableListData }) {
      tableListData.map(item => {
        if ([item.id, item.time].includes(id)) {
          valueArray.map(valueItem => {
            item[valueItem] = '';
          });
        }
        return item;
      });
    },
  },
  watch: {
    tableStatus (val) {
      if (val === 'edit') {
        this.tableTitle = tableEditTitle;
      } else {
        this.tableTitle = tableTitle;
      }
    },
    dataInfo: {
      deep: true,
      handler () {
        this.getTableList();
      },
    },
    averageData: {
      deep: true,
      handler () {
        this.getTableList();
      },
    },
  },
};
</script>

<style scoped lang="scss">
::v-deep .el-form-item {
  margin-top: 0;
  margin-bottom: 0;
}

::v-deep .el-table .el-table__body-wrapper {
  min-height: auto;
}

.iconStyle {
  font-size: 22px;
}

.timeRange {
  font-size: 16px;
  font-weight: bold;
  color: #000000;
}
</style>
