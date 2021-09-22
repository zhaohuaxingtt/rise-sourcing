<template>
  <div>
    <div class="margin-bottom20 clearFloat">
      <span class="font18 font-weight">
        <span class="margin-right30">{{ $t('TPZS.ZONGDANJIA') }}：{{ toFixedNumber(dataInfo.totalPrice, 2) }}{{
            language('TPZS.YUANKUAHAO', '（元）')
          }}</span>
        <span>{{ $t('TPZS.GUDINGCHENGBENZHANBI') }}：{{ toFixedNumber(dataInfo.costProportion, 2) }}%</span>
      </span>
      <div class="floatright">
        <template v-if="tableStatus === 'edit'">
          <!--新增-->
          <iButton @click="handleAdd">{{ $t('LK_XINZENG') }}</iButton>
          <!--删除-->
          <iButton @click="handleDelete">{{ $t('delete') }}</iButton>
          <!--取消-->
          <iButton @click="handleCancel">{{ $t('LK_QUXIAO') }}</iButton>
          <!--完成-->
          <iButton @click="handleFinish">{{ $t('TPZS.WANCHENG') }}</iButton>
        </template>
        <template v-else>
          <!--编辑-->
          <iButton @click="handleEdit" v-if="tableStatus !== 'edit' && showEditButton">{{ $t('LK_BIANJI') }}</iButton>
        </template>
      </div>
    </div>

    <!--    显示表格-->
    <tableList
        :tableData="tableListData"
        :tableTitle="tableTitle"
        :tableLoading="tableLoading"
        :index="true"
        @handleSelectionChange="handleSelectionChange"
    >
      <!--自定义列开始-->
      <template #type="scope">
        <template v-if="costShowOnly.includes(scope.row.type) || tableStatus !== 'edit'">
          {{ scope.row.type }}
        </template>
        <template v-else>
          <iInput v-model="scope.row.type"/>
        </template>
      </template>
      <template #total="scope">
        <template v-if="totalShowOnly.includes(scope.row.type) || tableStatus !== 'edit'">
          {{ toThousands(toFixedNumber(Number(scope.row.total), 2)) }}
        </template>
        <template v-else>
          <iInput v-model="scope.row.total" @input="handleNumber($event,scope.row, 'total')"/>
        </template>
      </template>
      <template #apportionedNum="scope">
        {{ toThousands(scope.row.apportionedNum) }}
      </template>
      <template #affectUnitPrice="scope">
        <template v-if="unitPriceShowOnly.includes(scope.row.type) || tableStatus !== 'edit'">
          {{ toThousands(toFixedNumber(Number(scope.row.affectUnitPrice), 2)) }}
        </template>
        <template v-else>
          <iInput v-model="scope.row.affectUnitPrice" @input="handleNumber($event,scope.row, 'affectUnitPrice')"/>
        </template>
      </template>
      <template #proportionOfAffectedCost="scope">
        {{ toFixedNumber(scope.row.proportionOfAffectedCost, 2) }}%
      </template>
      <!--自定义列结束-->
      <template #isShow="scope">
        <div @click="handleHide(scope.row)">
          <icon symbol name="iconxianshi" class="iconStyle cursor"/>
        </div>
      </template>
    </tableList>

    <el-divider class="margin-top20 margin-bottom20"/>

    <!--    隐藏-->
    <tableList
        v-if="tableStatus === 'edit'"
        :tableData="hideTableData"
        :tableTitle="tableTitle"
        :tableLoading="tableLoading"
        :index="true"
        :customIndex="tableListData.length"
        @handleSelectionChange="handleHideSelectionChange"
    >
      <!--自定义列开始-->
      <template #type="scope">
        <template v-if="costShowOnly.includes(scope.row.type)">
          {{ scope.row.type }}
        </template>
        <template v-else>
          <iInput v-model="scope.row.type"/>
        </template>
      </template>
      <template #total="scope">
        <template v-if="totalShowOnly.includes(scope.row.type)">
          {{ toThousands(toFixedNumber(Number(scope.row.total), 2)) }}
        </template>
        <template v-else>
          <iInput v-model="scope.row.total" @input="handleNumber($event,scope.row, 'total')"/>
        </template>
      </template>
      <template #apportionedNum="scope">
        {{ toThousands(scope.row.apportionedNum) }}
      </template>
      <template #affectUnitPrice="scope">
        <template v-if="unitPriceShowOnly.includes(scope.row.type)">
          {{ toThousands(toFixedNumber(Number(scope.row.affectUnitPrice), 2)) }}
        </template>
        <template v-else>
          <iInput v-model="scope.row.affectUnitPrice" @input="handleNumber($event,scope.row, 'affectUnitPrice')"/>
        </template>
      </template>
      <template #proportionOfAffectedCost="scope">
        {{ toFixedNumber(scope.row.proportionOfAffectedCost, 2) }}%
      </template>
      <!--自定义列结束-->
      <template #isShow="scope">
        <div @click="handleShow(scope.row)">
          <icon symbol name="iconyincang" class="iconStyle cursor"/>
        </div>
      </template>
    </tableList>
  </div>
</template>

<script>
import {iButton, icon, iInput, iMessage, iMessageBox} from 'rise';
import tableList from '@/components/ws3/commonTable';
import {tableTitle, tableEditTitle} from './data';
import {numberProcessor, toFixedNumber, toThousands, deleteThousands} from '@/utils';
import _ from 'lodash';

export default {
  components: {
    iButton,
    tableList,
    icon,
    iInput,
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
      costShowOnly: ['专用设备费', '分摊模具费', '分摊开发费', '研发费', '管理费', '利润费'],
      totalShowOnly: ['管理费', '利润费'],
      apportionShowOnly: ['专用设备费', '分摊模具费', '分摊开发费', '研发费', '管理费', '利润费'],
      unitPriceShowOnly: ['专用设备费', '分摊模具费', '分摊开发费', '研发费'],
      recordTableData: [],
      recordHideTableData: [],
      fiexedApportionedNum: '',
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
        apportionedNum: this.fiexedApportionedNum,
        isShow: true,
      });
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
      let flag = true;
      this.tableListData.some(item => {
        if (item.total === '' || item.affectUnitPrice === '') {
          flag = false;
          return true;
        }
      });
      if (flag) {
        this.$emit('handlePriceTableFinish');
        this.tableStatus = '';
      } else {
        iMessage.warn(this.$t('TPZS.FEIYONGZONGEHEYINGXIANGDANJIABUENGWEIKONG'));
      }
    },
    getTableList() {
      try {
        this.tableListData = [];
        this.hideTableData = [];
        this.copyDataInfo = _.cloneDeep(this.dataInfo);
        this.copyDataInfo.costDetailList.map((item, index) => {
          if (!item.id) {
            item.time = new Date().getTime() + index;
          }
          if (item.isShow) {
            this.tableListData.push(item);
          } else {
            this.hideTableData.push(item);
          }
        });
        this.fiexedApportionedNum = this.dataInfo.planTotalPro
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
    handleNumber(val, row, props) {
      this.$set(row, props, numberProcessor(val, 2));
      if (props === 'total') {
        const result = row.total / row.apportionedNum;
        this.$set(row, 'affectUnitPrice', result);
      } else if (props === 'affectUnitPrice') {
        const result = row.affectUnitPrice * row.apportionedNum;
        this.$set(row, 'total', result);
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
</style>
