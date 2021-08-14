<template>
  <div>
    <div class="margin-bottom20 clearFloat">
      <span class="font18 font-weight">
        <span class="margin-right30">{{ language('PI.DANGQIANJIAGE', '当前价格') }}：</span>
        <span>{{ language('PI.ZONGHEJIAGEYINGXIANG', '综合价格影响') }}：</span>
      </span>
      <div class="floatright">
        <template v-if="isPreview">
          <span class="text timeRange">{{ language('PI.SHIJIANDAN', '时间段') }}：2020/09 - 2021/03</span>
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
            <iButton @click="handleEdit" v-if="tableStatus !== 'edit' && showEditButton">{{ $t('LK_BIANJI') }}</iButton>
          </template>
        </template>
      </div>
    </div>

    <!--显示表格-->
    <theTableTemplate
        :tableData="tableListData"
        :tableTitle="tableTitle"
        :tableLoading="tableLoading"
        :index="true"
        :isShowTable="true"
        :isTableEdit="tableStatus"
        @handleSelectionChange="handleSelectionChange"
        @handleHide="handleHide"
        @handleGetSelectList="handleGetSelectList"
        :selectOptionsObject="selectOptionsObject"
        @handleSelectReset="handleSelectReset"
    />
    <el-divider class="margin-top20 margin-bottom20" v-if="tableStatus === 'edit'"/>
    <!--隐藏表格-->
    <theTableTemplate
        v-if="tableStatus === 'edit'"
        :tableData="hideTableData"
        :tableTitle="tableTitle"
        :tableLoading="tableLoading"
        :index="true"
        :customIndex="tableListData.length"
        :isShowTable="false"
        :isTableEdit="tableStatus"
        @handleSelectionChange="handleHideSelectionChange"
        @handleShow="handleShow"
    />
  </div>
</template>

<script>
import {iButton, iMessage, iMessageBox} from 'rise';
import {tableTitle, tableEditTitle, FIRSTSELECT, SECONDSELECT, THIRDSELECT} from './data';
import {numberProcessor, toFixedNumber, toThousands, deleteThousands} from '@/utils';
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
  },
  computed: {
    pageType() {
      return this.$route.query.type;
    },
  },
  data() {
    return {
      tableListData: [],
      selectTableData: [],
      hideTableData: [],
      hideSelectTableData: [],
      tableTitle: tableTitle,
      tableStatus: '',
      recordTableData: [],
      recordHideTableData: [],
      selectOptionsObject: {},
      FIRSTSELECT,
      SECONDSELECT,
      THIRDSELECT,
    };
  },
  created() {
    this.getTableList();
  },
  methods: {
    toFixedNumber,
    toThousands,
    handleSelectionChange(val) {
      this.selectTableData = val;
    },
    handleHideSelectionChange(val) {
      this.hideSelectTableData = val;
    },
    handleEdit() {
      this.tableStatus = 'edit';
      this.recordTableData = _.cloneDeep(this.tableListData);
      this.recordHideTableData = _.cloneDeep(this.hideTableData);
    },
    handleAdd() {
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
      });
      this.selectOptionsObject[time] = {};
    },
    handleDelete() {
      if (this.selectTableData.length === 0 && this.hideSelectTableData.length === 0) {
        return iMessage.warn(this.$t('LK_NINDANGQIANHAIWEIXUANZE'));
      }
      iMessageBox(
          this.$t('LK_SHIFOUQUERENSHANCHU'),
          this.$t('LK_WENXINTISHI'),
          {confirmButtonText: this.$t('LK_QUEDING'), cancelButtonText: this.$t('LK_QUXIAO')},
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
    handleCancel() {
      this.tableListData = this.recordTableData;
      this.hideTableData = this.recordHideTableData;
      this.tableStatus = '';
    },
    handleFinish() {
      this.$emit('handlePriceTableFinish');
    },
    getTableList() {
      try {
        this.tableListData = [];
        this.hideTableData = [];
        //this.copyDataInfo = _.cloneDeep(this.dataInfo);
        this.copyDataInfo = [
          {'a': '材料', 'b': 2, 'c': 1, 'q': 1, 'w': 212312323, 'e': 3, isShow: true, dataType: '1', id: 1},
          {'a': '人力', 'b': 2, 'c': 1, 'q': 112, 'w': 2, 'e': 3, isShow: true, dataType: '2', id: 2},
          {'a': '汇率', 'b': 2, 'c': 1, 'q': 112, 'w': 2, 'e': 3, isShow: true, dataType: '3', id: 3},
        ];
        this.copyDataInfo.map((item, index) => {
          if (!item.id) {
            item.time = new Date().getTime() + index;
          }
          if (item.isShow) {
            this.tableListData.push(item);
          } else {
            this.hideTableData.push(item);
          }
        });
        this.copyDataInfo.map(item => {
          this.selectOptionsObject[item.id] = {};
        });
      } catch {
        this.tableListData = [];
        this.hideTableData = [];
      }
    },
    handleHide(row) {
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
    handleShow(row) {
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
    handleGetSelectList({props, row, selectList}) {
      const copyObj = _.cloneDeep(this.selectOptionsObject);
      this.tableListData.map(item => {
        if (item.id === row.id) {
          if (props === '') {
            copyObj[row.id][FIRSTSELECT] = selectList;
          } else if (props === FIRSTSELECT) {
            copyObj[row.id][SECONDSELECT] = selectList;
          } else if (props === SECONDSELECT) {
            copyObj[row.id][THIRDSELECT] = selectList;
          }
        }
      });
      this.selectOptionsObject = copyObj;
    },
    handleSelectReset({props, row}) {
      const id = row.id || row.time;
      if (id) {
        if (props === this.FIRSTSELECT) {
          this.selectOptionsObject[id][this.SECONDSELECT] = [];
          this.selectOptionsObject[id][this.THIRDSELECT] = [];
        } else if (props === this.SECONDSELECT) {
          this.selectOptionsObject[id][this.THIRDSELECT] = [];
        }
      }
    },
  },
  watch: {
    tableStatus(val) {
      if (val === 'edit') {
        this.tableTitle = tableEditTitle;
      } else {
        this.tableTitle = tableTitle;
      }
    },
    dataInfo: {
      deep: true,
      handler() {
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
