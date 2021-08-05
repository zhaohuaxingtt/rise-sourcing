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
      <el-col :span="8" v-for="item of treeData" :key="item.id">
        <div class="header-title"> {{ $i18n.locale === 'zh' ? item.name : item.nameEn }}</div>
        <theCard
            v-for="level1Children of item.children"
            :key="level1Children.id"
            :title="$i18n.locale === 'zh' ? level1Children.name : level1Children.nameEn"
            :star="level1Children.star"
            :iconName="level1Children.iconUrl"
            class="theCard"
        >
          <div>
            1233
          </div>
        </theCard>
      </el-col>
    </el-row>
  </iPage>
</template>

<script>
import {iPage, iButton} from 'rise';
import headerNav from '../components/headerNav';
import theCard from './compoents/theCard';
import {getList, saveInfos} from '../../../../../api/categoryManagementAssistant/listOfInitiatives';

export default {
  components: {
    iPage,
    iButton,
    headerNav,
    theCard,
  },
  data() {
    return {
      treeData: {},
    };
  },
  created() {
    this.getList();
  },
  methods: {
    handleEdit() {

    },
    async getList() {
      try {
        const req = {
          categoryCode: '111',
          quadrant: 'LEVERAGE',
        };
        const res = await getList(req);
        this.treeData = res.data;
      } catch {
        this.treeData = {};
      }
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

.theCard + .theCard {
  margin-top: 20px;
}

</style>
