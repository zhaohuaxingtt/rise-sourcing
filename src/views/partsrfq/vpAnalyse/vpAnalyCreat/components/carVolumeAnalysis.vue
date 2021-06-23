<!--
 * @version: 1.0
 * @Author: zbin
 * @Date: 2021-06-21 16:12:47
 * @LastEditors: zbin
 * @Descripttion: your project
-->
<template>
  <iCard style="height:870px" :title="$t('TPZS.CXJHCLYXSLJCLFX')">
    <template slot="header-control">
      <div class="header">
        <div class="flex-between-center-center margin-right40">
          <div class="circle"></div>
          <div class="legend margin-left3">{{$t('TPZS.JHCL')}}</div>
        </div>
        <div class="flex-between-center-center">
          <icon style="font-size:10px" name='iconshenpiliu-yishenpi-mourenshenpi' symbol></icon>
          <div class="legend margin-left3">{{$t('TPZS.SJCL')}}</div>
        </div>
      </div>
    </template>
    <tableList class="margin-top20" :tableData="tableListData" :tableTitle="tableTitle" :tableLoading="tableLoading" :selection='false' :index="false" @handleSelectionChange="handleSelectionChange">
      <template #yield="scope">
        <div>
          <el-row>
            <el-col v-for="(item,index) in scope.row.yield" :key="index" class="flex" :span="20">
              <div :class="'per-'+index" :style="'width:'+ item.vale1+'%;'"></div>
              <div>{{item.vale1}}</div>
            </el-col>
            <el-col :span="2"></el-col>
          </el-row>
        </div>
      </template>
      <template #isSetTradeUnion="scope">
        <el-progress color="#92B8FF" :stroke-width="10" :percentage="scope.row.isSetTradeUnion"></el-progress>
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

export default {
  // import引入的组件需要注入到对象中才能使用
  components: { iCard, icon, tableList },
  data() {
    // 这里存放数据
    return {
      tableListData: [
        {
          developerNumber: '车型1',
          productionNumber: 21,
          yield: [
            {
              vale1: '60',
              vale2: 312
            }, {
              vale1: 11
            }
          ],
          isSetTradeUnion: '12'
        },
        {
          developerNumber: '车型1',
          productionNumber: 21,
          yield: [
            {
              vale1: 12,
              vale2: 312
            }, {
              vale1: 11
            }
          ],
          isSetTradeUnion: 12
        },
      ],
      tableTitle: tableTitle,
      tableLoading: false,
    }
  },
  // 监听属性 类似于data概念
  computed: {},
  // 监控data中的数据变化
  watch: {},
  // 方法集合
  methods: {
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
.legend {
  font-size: 12px !important;
  font-weight: bold;
}
.table-title {
  display: flex;
  justify-content: space-between;
}
.chart {
  width: 100%;
  height: 60rem;
}
::v-deep td:nth-child(2) {
  border-left: solid 1px #cdd4e2;
  .cell {
    padding-left: 0;
    .flex {
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
::v-deep td:nth-child(3) {
  color: #c00000 !important;
}
::v-deep td:nth-child(4) {
  .el-progress__text {
    color: #0059ff !important;
    font-weight: Bold;
    font-size: 14px;
  }
}
// @import url(); 引入公共css类
</style>
