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
        <icon name="iconxinxitishi" symbol></icon>
      </div>
    </template>
    <div class="btn">
      <iButton @click="hanleParts">{{$t('TPZS.CZLJ')}}</iButton>
      <iButton>{{$t('LK_QUEREN')}}</iButton>
      <iButton>{{$t('TPZS.JRFX')}}</iButton>
    </div>
    <div class="circle">12</div>
    <div class="itab">
      <iTabsList type="card" slot="components" class='margin-top20'>
        <!-------------------------已选零件-  ----------------------------------------->
        <el-tab-pane :label="$t('TPZS.QLLJ')">
          <tableList :tableData="tableListData" :tableTitle="tableTitle" :tableLoading="tableLoading" :selection='false' :index="false" @handleSelectionChange="handleSelectionChange" />
          <iPagination v-update @size-change="handleSizeChange($event, getTableList)" @current-change="handleCurrentChange($event, getTableList)" background :page-sizes="page.pageSizes" :page-size="page.pageSize" :layout="page.layout" :current-page='page.currPage' :total="page.totalCount" />
        </el-tab-pane>
        <el-tab-pane :label="$t('TPZS.QLLJ')">
        </el-tab-pane>
      </iTabsList>
    </div>
    <searchPartDialog v-model="partsDialog" />
  </iCard>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';
import { iCard, icon, iTabsList, iButton, iPagination } from "rise";
import { partsTableTitle } from "./data.js";
import tableList from '@/components/ws3/commonTable';
import { pageMixins } from '@/utils/pageMixins';
import searchPartDialog from "./searchPartDialog.vue";
import { getCarModelPartsList } from "@/api/partsrfq/vpAnalysis/vpAnalyseCreate";

export default {
  // import引入的组件需要注入到对象中才能使用
  components: { iCard, icon, tableList, iTabsList, iButton, iPagination, searchPartDialog },
  mixins: [pageMixins],
  data() {
    // 这里存放数据
    return {
      partsDialog: false,
      tableListData: [],
      tableTitle: partsTableTitle,
      tableLoading: false,
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
    async getTableList() {
      this.tableLoading = true;
      try {
        const req = {

        };
        const res = await getCarModelPartsList(req);
        if (res.result) {
          this.tableListData = res.data;
        }
        this.tableLoading = false;
      } catch {
        this.tableListData = [];
        this.tableLoading = false;
      }
    }
  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.getTableList()
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
