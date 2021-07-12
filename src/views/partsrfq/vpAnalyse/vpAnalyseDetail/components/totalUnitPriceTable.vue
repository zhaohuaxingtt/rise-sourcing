<template>
  <div>
    <div class="margin-bottom20 clearFloat">
      <span class="font18 font-weight">
        <span class="margin-right30">{{ $t('TPZS.ZONGDANJIA') }}：{{ dataInfo.totalPrice }}</span>
        <span>{{ $t('TPZS.GUDINGCHENGBENZHANBI') }}：{{ dataInfo.costProportion }}%</span>
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
          {{ scope.row.total }}
        </template>
        <template v-else>
          <iInput v-model="scope.row.total" @input="handleNumber($event,scope.row, 'total')"/>
        </template>
      </template>
      <template #apportionedNum>
        <!--        <template v-if="apportionShowOnly.includes(scope.row.type) || tableStatus !== 'edit'">
                  {{ scope.row.apportionedNum }}
                </template>
                <template v-else>
                  <iInput v-model="scope.row.apportionedNum" @input="handleNumber($event,scope.row, 'apportionedNum')"/>
                </template>-->
        {{ fiexedApportionedNum }}
      </template>
      <template #affectUnitPrice="scope">
        <template v-if="unitPriceShowOnly.includes(scope.row.type) || tableStatus !== 'edit'">
          {{ scope.row.affectUnitPrice }}
        </template>
        <template v-else>
          <iInput v-model="scope.row.affectUnitPrice" @input="handleNumber($event,scope.row, 'affectUnitPrice')"/>
        </template>
      </template>
      <template #proportionOfAffectedCost="scope">
        {{ scope.row.proportionOfAffectedCost }}%
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
          {{ scope.row.total }}
        </template>
        <template v-else>
          <iInput v-model="scope.row.total" @input="handleNumber($event,scope.row, 'total')"/>
        </template>
      </template>
      <template #apportionedNum>
        <!--        <template v-if="apportionShowOnly.includes(scope.row.type)">
                  {{ scope.row.apportionedNum }}
                </template>
                <template v-else>
                  <iInput v-model="scope.row.apportionedNum" @input="handleNumber($event,scope.row, 'apportionedNum')"/>
                </template>-->
        {{ fiexedApportionedNum }}
      </template>
      <template #affectUnitPrice="scope">
        <template v-if="unitPriceShowOnly.includes(scope.row.type)">
          {{ scope.row.affectUnitPrice }}
        </template>
        <template v-else>
          <iInput v-model="scope.row.affectUnitPrice" @input="handleNumber($event,scope.row, 'affectUnitPrice')"/>
        </template>
      </template>
      <template #proportionOfAffectedCost="scope">
        {{ scope.row.proportionOfAffectedCost }}%
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
import {numberProcessor} from '@/utils';
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
  methods: {
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
      this.tableStatus = '';
      this.$emit('handlePriceTableFinish');
    },
    getTableList() {
      try {
        this.tableListData = [];
        this.hideTableData = [];
        this.copyDataInfo = _.cloneDeep(this.dataInfo);
        this.copyDataInfo.costDetailList.map(item => {
          if (item.isShow) {
            this.tableListData.push(item);
          } else {
            this.hideTableData.push(item);
          }
        });
        this.fiexedApportionedNum = this.tableListData[0].apportionedNum;
      } catch {
        this.tableListData = [];
        this.hideTableData = [];
      }
    },
    handleHide(row) {
      this.tableListData = this.tableListData.filter(item => {
        return item.id !== row.id;
      });
      row.isShow = false;
      this.hideTableData.push(row);
    },
    handleShow(row) {
      this.hideTableData = this.hideTableData.filter(item => {
        return item.id !== row.id;
      });
      row.isShow = true;
      this.tableListData.push(row);
    },
    handleNumber(val, row, props) {
      this.$set(row, props, numberProcessor(val, 2));
      if (props === 'total') {
        this.$set(row, 'affectUnitPrice', (row.total / this.fiexedApportionedNum).toFixed(2));
      } else if (props === 'affectUnitPrice') {
        this.$set(row, 'total', (row.affectUnitPrice * this.fiexedApportionedNum).toFixed(2));
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

.iconStyle {
  font-size: 22px;
}
</style>
