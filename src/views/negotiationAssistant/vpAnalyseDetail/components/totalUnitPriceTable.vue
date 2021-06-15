<template>
  <iCard>
    <div class="margin-bottom20 clearFloat">
      <span class="font18 font-weight">
        <span class="margin-right30">{{$t('TPZS.ZONGDANJIA')}}：52.77</span>
        <span>{{$t('TPZS.GUDINGCHENGBENZHANBI')}}：22%</span>
      </span>
      <div class="floatright">
        <!--编辑-->
        <iButton>{{ $t('LK_BIANJI') }}</iButton>
      </div>
    </div>
    <tableList
        :tableData="tableListData"
        :tableTitle="tableTitle"
        :tableLoading="tableLoading"
        :index="true"
    />
  </iCard>
</template>

<script>
import {iCard, iButton} from 'rise';
import tableList from '@/components/ws3/commonTable';
import {tableTitle}from './data'

export default {
  components: {
    iCard,
    iButton,
    tableList
  },
  data() {
    return {
      tableListData: [],
      tableTitle: tableTitle,
      tableLoading: false,
    };
  },
};
</script>

<style scoped>

</style>
