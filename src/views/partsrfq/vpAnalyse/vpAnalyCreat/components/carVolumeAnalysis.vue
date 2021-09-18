<!--
 * @version: 1.0
 * @Author: zbin
 * @Date: 2021-06-21 16:12:47
 * @LastEditors: zbin
 * @Descripttion: your project
-->
<template>
  <iCard style="height:870px" :title="$t('TPZS.CXJHCLYXSLJCLFX')+ `（截止${currentTime}）`">
    <template slot="header-control">
      <div class="header">
        <div class="flex-between-center-center margin-right40">
          <div class="circle"></div>
          <div class="legend margin-left3">{{$t('TPZS.JHCL')}}</div>
        </div>
        <div class="flex-between-center-center">
          <div style="background-color:#5993FF" class="circle"></div>
          <div class="legend margin-left3">{{$t('TPZS.SJCL')}}</div>
        </div>
      </div>
    </template>
    <tableList :height="750" class="margin-top20" :tableData="tableListData" :tableTitle="tableTitle" :tableLoading="tableLoading" :selection='false' :index="false" @handleCurrentChange="handleCurrentChange">
      <template #actualProEndLastMonth="scope">
        <div class="flex">
          <div class="per-0" :style="'width:'+scope.row.planTotalProValue+'%'">
          </div>
          <div>
            {{scope.row.planTotalPro}}
          </div>
        </div>
        <div class="flex">
          <div class="per-1" :style="'width:'+scope.row.actualProEndLastMonthValue+'%'"></div>
          <div>
            {{scope.row.actualProEndLastMonth}}
          </div>
        </div>
      </template>
      <template #increaseRate="scope">
        <span class="red" v-if="scope.row.increaseRate>=0">{{'+'+scope.row.increaseRate+'%'}}</span>
        <span class="green" v-else>{{scope.row.increaseRate+'%'}}</span>
      </template>
      <template #lifeCycle="scope">
        <el-row type="flex" justify="space-between" align="middle">
          <el-col>
            <el-progress :show-text="false" :percentage="parseInt(scope.row.lifeCycle)"></el-progress>
          </el-col>
          <el-col>
            <span class="el-progress__text">{{parseInt(scope.row.lifeCycle)+'%'}}</span>
          </el-col>
        </el-row>
      </template>
    </tableList>
  </iCard>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';
import { iCard, icon } from "rise";
import { tableTitle } from "./data.js";
import tableList from '@/components/ws3/commonTable';
import { getCarModelProjectList } from "@/api/partsrfq/vpAnalysis/vpAnalyseCreate";


export default {
  // import引入的组件需要注入到对象中才能使用
  components: { iCard, icon, tableList },
  data() {
    // 这里存放数据
    return {
      tableListData: [],
      tableTitle: tableTitle,
      tableLoading: false,
      currentTime: window.moment(new Date()).subtract(1, 'months').startOf('month').format('YYYY-MM')
    }
  },
  // 监听属性 类似于data概念
  computed: {},
  // 监控data中的数据变化
  watch: {},
  // 方法集合
  methods: {
    async getTableList() {
      this.tableLoading = true;
      try {
        const req = {
          rfqId: this.$store.state.rfq.rfqId,
          userId: this.$store.state.permission.userInfo.id
        };
        const res = await getCarModelProjectList(req);
        if (res.result) {
          this.tableListData = res.data;
          this.handleCurrentChange(res.data[0])
          var sum = 0
          // 求和-》百分比
          this.tableListData.forEach((item) => {
            sum = sum + item.actualProEndLastMonth
            sum = sum + item.planTotalPro
          })
          this.tableListData.map((item) => {
            item.increaseRate = parseFloat(item.increaseRate).toFixed(2)//保留2位小数
            item.actualProEndLastMonthValue = item.actualProEndLastMonth / sum * 100//计算百分比
            item.planTotalProValue = item.planTotalPro / sum * 100
            item.actualProEndLastMonth = String(item.actualProEndLastMonth).replace(/\B(?=(\d{3})+(?!\d))/g, ',')//千位符
            return item.planTotalPro = String(item.planTotalPro).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
          })
        }
        this.tableLoading = false;
      } catch {
        this.tableListData = [];
        this.tableLoading = false;
      }
    },
    handleCurrentChange(data) {
      this.$emit('handleCurrentChange', data)
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
.header {
  display: flex;
  justify-content: space-between;
  .circle {
    width: 12.5px;
    height: 12.5px;
    border-radius: 10px;
    background-color: #dde8fb;
  }
  .flex {
    align-items: baseline;
    margin-right: 40px;
  }
}
.green {
  font-size: 14px;
  color: #70ad47;
}
.red {
  font-size: 14px;
  color: #c00000;
}
.legend {
  font-size: 12px !important;
  font-weight: bold;
}
::v-deep .el-table tr {
  background-color: #fff;
}
::v-deep td:nth-child(2) {
  font-size: 14px;
  border-left: solid 1px #cdd4e2;
  .cell {
    padding-left: 0;
    .flex {
      white-space: nowrap;
      align-items: center;
    }
    .per-0 {
      background-color: #dde8fb;
      // margin-bottom: 5px;
      margin-right: 5px;
      height: 20px;
      border-top-right-radius: 5px;
      border-bottom-right-radius: 5px;
    }
    .per-1 {
      background-color: #5993ff;
      margin-right: 5px;
      height: 20px;
      border-top-right-radius: 5px;
      border-bottom-right-radius: 5px;
    }
  }
}
.el-progress__text {
  color: #0059ff !important;
  font-size: 14px;
}
// @import url(); 引入公共css类
</style>
