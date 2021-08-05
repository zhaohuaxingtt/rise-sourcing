<template>
  <iPage>
    <headerNav>
      <template #extralButton>
        <iButton>{{ language('PLGLZS.CAILIAOZU', '材料组') }}</iButton>
        <iButton>{{ language('PLGLZS.BAOGAOQINGDAN', '报告清单') }}</iButton>
        <iButton @click="handleEdit">{{ language('PLGLZS.BIANJI', '编辑') }}</iButton>
        <iButton>{{ language('PLGLZS.DAOCHU', '导出') }}</iButton>
      </template>
    </headerNav>
    <el-row :gutter="20">
      <el-col :span="8">
        <div class="header-title"> {{ language('PLGLZS.CAIGOUCELUE', '采购策略') }}</div>
        <theCard title="12">
          <div>
            1233
          </div>
        </theCard>
      </el-col>
      <el-col :span="8">
        <div class="header-title"> {{ language('PLGLZS.CAIGOUXUQIUGUANLI', '采购需求管理') }}</div>
        <theCard title="12">
          <div>
            1233
          </div>
        </theCard>
      </el-col>
      <el-col :span="8">
        <div class="header-title"> {{ language('PLGLZS.ZONGCHENGBENGUANLI', '总成本管理') }}</div>
      </el-col>
    </el-row>
  </iPage>
</template>

<script>
import {iPage, iButton} from 'rise';
import headerNav from '../components/headerNav';
import theCard from './compoents/theCard'

export default {
  components: {
    iPage,
    iButton,
    headerNav,
    theCard
  },
  data() {
    return {
      collapseValue: false,
    };
  },
  methods: {
    handleEdit() {
      this.$refs.card1.handleCollapse();
    },
  },
};
</script>

<style scoped lang="scss">
.header-title {
  margin-top: 20px;
  margin-bottom: 20px;
  font-size: 22px;
  font-weight: bold;
  line-height: 26px;
  color: #000000;
}

</style>
