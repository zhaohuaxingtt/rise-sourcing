<!--
 * @version: 1.0
 * @Author: zbin
 * @Date: 2021-06-18 11:34:43
 * @LastEditors: zbin
 * @Descripttion:供应商信息
-->
<template>
  <div>
    <div class="info">{{$t('TPZS.GYSXX')}}</div>
    <tableList class="margin-top20" :tableData="tableListData" :tableTitle="tableTitle" :tableLoading="tableLoading" :selection='false' :index="true" @handleSelectionChange="handleSelectionChange" >
      <template #isSelectMbdl="scope">
        <span>{{scope.row.isSelectMbdl?$t('nominationLanguage.Yes'):$t('nominationLanguage.No')}}</span>
      </template>
    </tableList>
  </div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';
import { iFormItem, iText, iFormGroup, iLabel, icon } from "rise";
import tableList from '@/components/ws3/commonTable';
import { supplierTableTitle } from "./data";
import { getRfqSupplierRate } from "@/api/partsrfq/negotiateBasicInfor/negotiateBasicInfor.js";

export default {
  // import引入的组件需要注入到对象中才能使用
  components: { iFormItem, iText, iFormGroup, iLabel, icon, tableList },
  data() {
    // 这里存放数据
    return {
      tableListData: [],
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
    async getTableList() {
      this.tableLoading = true;
      try {
        const res = await getRfqSupplierRate(this.$route.query.id);
        if (res.result) {
          this.tableListData = res.data;
        }
        this.tableLoading = false;
      } catch {
        this.tableListData = [];
        this.tableLoading = false;
      }
    },
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
<style lang='scss' >
// @import url(); 引入公共css类
.info {
  font-weight: Bold;
}
</style>
