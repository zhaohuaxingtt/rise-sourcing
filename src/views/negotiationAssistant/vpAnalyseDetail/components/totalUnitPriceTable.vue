<template>
  <iCard>
    <div class="margin-bottom20 clearFloat">
      <span class="font18 font-weight">
        <span class="margin-right30">{{ $t('TPZS.ZONGDANJIA') }}：52.77</span>
        <span>{{ $t('TPZS.GUDINGCHENGBENZHANBI') }}：22%</span>
      </span>
      <div class="floatright">
        <template v-if="tableStatus === 'edit'">
          <!--新增-->
          <iButton @click="handleAdd">{{ $t('LK_BIANJI') }}</iButton>
          <!--删除-->
          <iButton @click="handleDelete">{{ $t('delete') }}</iButton>
          <!--取消-->
          <iButton @click="handleCancel">{{ $t('LK_QUXIAO') }}</iButton>
          <!--完成-->
          <iButton @click="handleFinish">{{ $t('TPZS.WANCHENG') }}</iButton>
        </template>
        <template v-else>
          <!--编辑-->
          <iButton @click="handleEdit" v-if="tableStatus !== 'edit'">{{ $t('LK_BIANJI') }}</iButton>
        </template>
      </div>
    </div>
    <tableList
        :tableData="tableListData"
        :tableTitle="tableTitle"
        :tableLoading="tableLoading"
        :index="true"
    >
      <template #showOrHide='scope'>
        <div>
          {{ scope.row.showOrHide }}
          <icon symbol name="iconxianshi" class="iconStyle"/>
          <icon symbol name="iconyincang" class="iconStyle"/>
        </div>
      </template>
    </tableList>
  </iCard>
</template>

<script>
import {iCard, iButton, icon} from 'rise';
import tableList from '@/components/ws3/commonTable';
import {tableTitle, tableEditTitle} from './data';

export default {
  components: {
    iCard,
    iButton,
    tableList,
    icon,
  },
  data() {
    return {
      tableListData: [
        {'1': 1},
      ],
      tableTitle: tableTitle,
      tableLoading: false,
      tableStatus: '',
    };
  },
  methods: {
    handleEdit() {
      this.tableStatus = 'edit';
    },
    handleAdd() {},
    handleDelete() {},
    handleCancel() {
      this.tableStatus = '';
    },
    handleFinish() {},
  },
  watch: {
    tableStatus(val) {
      if (val === 'edit') {
        this.tableTitle = tableEditTitle;
      } else {
        this.tableTitle = tableTitle;
      }
    },
  },
};
</script>

<style scoped lang="scss">
::v-deep .el-form-item {
  margin-top: 0;
  margin-bottom: 0;
}
.iconStyle{
  font-size: 22px;
}
</style>
