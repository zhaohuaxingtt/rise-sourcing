<!--
 * @version: 1.0
 * @Author: zbin
 * @Date: 2021-06-21 16:12:47
 * @LastEditors: zbin
 * @Descripttion: your project
-->
<template>
  <iCard style="height:870px" :title="$t('TPZS.CXJHCLYXSLJCLFX')">
    <template slot="header">
      <div> <span class="title">
          {{$t('TPZS.LJLB')}}
        </span>
        <el-popover trigger="hover" placement="top-start" width="400" :content="$t('TPZS.JHCLDQSJCLSOP')">
          <icon slot="reference" name="iconxinxitishi" tip="" symbol></icon>
        </el-popover>
      </div>
    </template>
    <div class="btn">
      <iButton v-if="activityTabIndex==='unSelect'" @click="hanleParts">{{$t('TPZS.CZLJ')}}</iButton>
      <iButton @click="handleAffirm" v-if="activityTabIndex==='unSelect'">{{$t('LK_QUEREN')}}</iButton>
      <iButton @click="handleAnalyse" v-if="activityTabIndex==='selected'">{{$t('TPZS.JRFX')}}</iButton>
    </div>
    <div class="circle">{{selectTableData1.length}}</div>
    <div class="itab">
      <iTabsList v-model="activityTabIndex" @tab-click="handleTabClick" type="card" slot="components" class='margin-top20'>
        <!-------------------------已选零件-  ----------------------------------------->
        <el-tab-pane name="unSelect" :label="$t('TPZS.QLLJ')">
          <tableList :tableData="tableListData" :tableTitle="tableTitle" :tableLoading="tableLoading" :selection='true' :index="true" @handleSelectionChange="handleSelectionChange" />
          <iPagination v-update @size-change="handleSizeChange($event, getTableList)" @current-change="handleCurrentChange($event, getTableList)" background :page-sizes="page.pageSizes" :page-size="page.pageSize" :layout="page.layout" :current-page='page.currPage' :total="page.totalCount" />
        </el-tab-pane>
        <el-tab-pane name="selected" :label="$t('TPZS.YXLJ')">
          <tableList :tableData="tableListData" :tableTitle="tableTitle" :tableLoading="tableLoading" :selection='true' :index="true" @handleSelectionChange="handleSelectionChange1" />
        </el-tab-pane>
      </iTabsList>
    </div>
    <searchPartDialog @add="add" :carClassify="carClassify" v-model="partsDialog" />
  </iCard>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';
import { iCard, icon, iTabsList, iButton, iPagination } from "rise";
import { partsTableTitle } from "./data.js";
import tableList from '@/components/ws3/commonTable';
import { pageMixins } from '@/utils/pageMixins';
import resultMessageMixin from '@/utils/resultMessageMixin.js';
import searchPartDialog from "./searchPartDialog.vue";
import { getPartsList, searchCarPartsAdd } from "@/api/partsrfq/vpAnalysis/vpAnalyseCreate/index.js";

export default {
  // import引入的组件需要注入到对象中才能使用
  components: { iCard, icon, tableList, iTabsList, iButton, iPagination, searchPartDialog },
  mixins: [pageMixins, resultMessageMixin],
  data() {
    // 这里存放数据
    return {
      partsDialog: false,
      tableListData: [],
      tableTitle: partsTableTitle,
      tableLoading: false,
      selectTableData: [],
      selectTableData1: [],
      activityTabIndex: 'unSelect',
      carClassify: '',
    }
  },
  // 监听属性 类似于data概念
  computed: {},
  // 监控data中的数据变化
  watch: {},
  // 方法集合
  methods: {
    hanleParts() {
      this.partsDialog = true
    },
    async getTableList(data) {
      if (!!data) {
        this.carClassify = data.carClassify
      }
      console.log(this.carClassify);
      this.tableLoading = true;
      try {
        const req = {
          current: this.page.currPage,
          size: this.page.pageSize,
          partsStatus: this.activityTabIndex,
          carClassify: this.carClassify,
          userId: this.$store.state.permission.userInfo.id
        };
        const res = await getPartsList(req);
        if (res.result) {
          this.tableListData = res.data;
          this.page.currPage = res.pageNum;
          this.page.pageSize = res.pageSize;
          this.page.totalCount = res.total;
        }
        this.tableLoading = false;
      } catch {
        this.tableListData = [];
        this.tableLoading = false;
      }
    },
    handleTabClick(target) {
      this.activityTabIndex = target.name
      this.getTableList()
    },
    add(val) {
      this.activityTabIndex = val
    },
    handleSelectionChange(data) {
      this.selectTableData = data
    },
    handleSelectionChange1(data) {
      this.selectTableData1 = data
    },
    async handleAffirm() {
      if (this.selectTableData.length === 0) {
        iMessage.warn(this.$t('TPZS.QXZYTSJ'))
        return false
      }
      const res = await searchCarPartsAdd(this.selectTableData)
      this.resultMessage(res, () => {
        this.activityTabIndex = 'selected'
        this.getTableList()
      })
    },
    handleAnalyse() {
      this.$router.push({ path: '/sourcing/partsrfq/vpAnalyseDetail', query: { type: 'add', carClassify: this.carClassify, carClassifyId: '' } })
    }
  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created() {
  },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
  },
}
</script>
<style lang='scss' scoped>
// @import url(); 引入公共css类
.btn {
  position: absolute;
  top: 7rem;
  right: 2rem;
  z-index: 1;
}
.itab {
  position: relative;
}
::v-deep .el-tabs--card {
  background-color: #fff;
}
.circle {
  width: 20px;
  height: 20px;
  border-radius: 10px;
  background-color: #e30d0d;
  color: #ffffff;
  font-size: 14px;
  text-align: center;
  position: absolute;
  top: 6rem;
  z-index: 3;
  right: 32rem;
}
</style>
