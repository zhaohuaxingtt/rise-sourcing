<!--
 * @version: 1.0
 * @Author: zbin
 * @Date: 2021-06-21 16:12:47
 * @LastEditors: zbin
 * @Descripttion: your project
-->
<template>
  <iCard style="min-height:870px" :title="$t('TPZS.CXJHCLYXSLJCLFX')">
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
    <div class="circle">{{middleListData.length}}</div>
    <div class="itab">
      <iTabsList v-model="activityTabIndex" @tab-click="handleTabClick" type="card" slot="components" class='margin-top20'>
        <!-------------------------已选零件-  ----------------------------------------->
        <el-tab-pane lazy name="unSelect" :label="$t('TPZS.QLLJ')">
          <tableList :tableData="tablePageData" :tableTitle="tableTitle" :tableLoading="tableLoading" :selection='true' @handleSelectionChange="handleSelectionChange" />
          <iPagination :pager-count='3' v-update @size-change="handleSizeChange($event)" @current-change="handleCurrentChange($event)" background :page-sizes="page.pageSizes" :page-size="pageData.pageSize" :layout="page.layout" :current-page='pageData.currPage' :total="pageData.totalCount" />
        </el-tab-pane>
        <el-tab-pane lazy name="selected" :label="$t('TPZS.YXLJ')">
          <tableList ref="tableList" :tableData="tablePageData" :tableTitle="tableTitle" :tableLoading="tableLoading" :selection='true' @handleSelectionChange="handleSelectionChange" />
          <iPagination :pager-count='3' v-update @size-change="handleSizeChange($event)" @current-change="handleCurrentChange($event)" background :page-sizes="page.pageSizes" :page-size="pageData.pageSize" :layout="page.layout" :current-page='pageData.currPage' :total="pageData.totalCount" />
        </el-tab-pane>
      </iTabsList>
    </div>
    <searchPartDialog @add="add" :carType="carType" v-model="partsDialog" />
  </iCard>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';
import { iCard, icon, iTabsList, iButton, iPagination, iMessage } from "rise";
import { partsTableTitle } from "./data.js";
import tableList from '@/components/ws3/commonTable';
import { pageMixins } from '@/utils/pageMixins';
import resultMessageMixin from '@/utils/resultMessageMixin.js';
import searchPartDialog from "./searchPartDialog.vue";
import { getPartsList, saveCarParts } from "@/api/partsrfq/vpAnalysis/vpAnalyseCreate/index.js";

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
      activityTabIndex: 'unSelect',
      carType: '',
      //分页数据
      pageData: {
        currPage: 1,
        pageSize: 10,
        totalCount: 0
      },
      //分页表格
      tablePageData: [],
      // 中间
      middleListData: []
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
      if (data) {
        this.carType = data.carType
      }
      this.activityTabIndex='unSelect'
      this.tableLoading = true;
      try {
        const req = {
          carType: this.carType,
          userId: this.$store.state.permission.userInfo.id
        };
        const res = await getPartsList(req);
        if (res.result) {
          this.tableListData = res.data;
          this.pageData.totalCount = res.data.length
          this.setPageTableData()
        }
        this.tableLoading = false;
      } catch {
        this.tableListData = [];
        this.tableLoading = false;
      }
    },
    // 根据分页数据获取指定范围的数据
    setPageTableData() {
      this.tablePageData = []
      const beginIndex = (this.pageData.currPage - 1) * this.pageData.pageSize
      const endIndex = (this.pageData.currPage * this.pageData.pageSize) - 1
      // console.log('beginIndex', beginIndex);
      // console.log('endIndex', endIndex);
      this.tableListData.forEach((item, index) => {
        if (index >= beginIndex && index <= endIndex) this.tablePageData.push(item)
      })
      // console.log('tablePageData', this.tablePageData);
    },
    // 每页数量发生改变
    handleSizeChange(val) {
      this.$set(this.pageData, 'pageSize', val)
      this.$set(this.pageData, 'currPage', 1)
      this.setPageTableData()
    },
    // 当前页发生改变
    handleCurrentChange(val) {
      this.$set(this.pageData, 'currPage', val)
      this.setPageTableData()
    },
    handleTabClick(target) {
      this.activityTabIndex = target.name
      if (target.name === 'selected') {
        var partsIds = []

        this.selectTableData.forEach(item => {
          this.middleListData.forEach(item => {
            partsIds.push(item.partsId)
          })
          if (!partsIds.includes(item.partsId)) {
            if (this.middleListData.length < 100) {
              this.middleListData.push(item)
            } else {
              iMessage.warn(this.$t('TPZS.YXLJZDZNTJYBT'))
            }
          }
        })
        this.tableListData = this.middleListData
        this.pageData = {
          currPage: 1,
          pageSize: 10,
          totalCount: this.tableListData.length
        }
        // this.$refs.tableList.$refs.dataTable.toggleAllSelection()
        this.setPageTableData()
      } else {
        this.getTableList()
      }
    },
    add(val, data) {
      this.selectTableData = data
      this.handleTabClick({ name: val })
    },
    handleSelectionChange(data) {
      this.selectTableData = data
    },
    handleAffirm() {
      if (this.selectTableData.length === 0) {
        iMessage.warn(this.$t('TPZS.QXZYTSJ'))
        return false
      }
      this.handleTabClick({ name: 'selected' })
    },
    async handleAnalyse() {
      if (!this.middleListData.length) {
        iMessage.warn(this.$t('TPZS.BQYXLJMYSJQZQLLJZTJZYXLJ'))
        return false
      }
      this.tableLoading = true
      const res = await saveCarParts(this.middleListData)
      this.resultMessage(res, () => {
        this.tableLoading = false
        this.$router.push({ path: '/sourcing/partsrfq/vpAnalyseDetail', query: { type: 'add', batchNumber: res.data } })
      }, () => {
        this.tableLoading = false
      })
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
