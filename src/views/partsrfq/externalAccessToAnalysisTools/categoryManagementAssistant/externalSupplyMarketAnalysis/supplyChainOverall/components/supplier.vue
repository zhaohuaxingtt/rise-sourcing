<!--
 * @version: 1.0
 * @Author: zbin
 * @Date: 2021-08-06 12:45:45
 * @LastEditors: zbin
 * @Descripttion: your project
-->
<template>
  <iCard>
    <el-row type="flex" justify="space-between" align="middle">
      <el-col :span="4">
        <div class="title margin-bottom20">
          {{language('GONGYINGSHANG','供应商')}}
        </div>
        <img :src="supplier" alt="" width="50px">
      </el-col>
      <el-col :span="20">
        <tableList :height="200" class="margin-top20" :tableData="tableListData" :tableTitle="tableTitle" :tableLoading="tableLoading" :selection='false' :index="false" @handleCurrentChange="handleCurrentChange">
        </tableList>
      </el-col>
    </el-row>

  </iCard>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';
import { iCard, icon } from "rise";
import tableList from '@/components/ws3/commonTable';
import { supplierTableTitle } from "./data.js";
import supplier from "@/assets/images/supplyChainOverall/supplier.png";

export default {
  // import引入的组件需要注入到对象中才能使用
  components: { iCard, icon, tableList },

  data() {
    // 这里存放数据
    return {
      supplier: supplier,
      tableListData: [
        {
          rfq: '256',
          isShow: true,
          carInfo: '9999',
          wire: true,
        },
        {
          rfq: '256',
          isShow: true,
          carInfo: '9999',
          tip: true,
          wire: false
        },
      ],
      tableTitle: supplierTableTitle,
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
// @import url(); 引入公共css类
.title {
  font-size: 1.125rem;
  font-weight: bold;
}
</style>
