<!--
 * @version: 1.0
 * @Author: zbin
 * @Date: 2021-06-18 11:34:43
 * @LastEditors: zbin
 * @Descripttion: 定点记录
-->
<template>
  <iCard :title="$t('TPZS.DDJV')" :defalutCollVal='false' collapse>
    <tableList :tableData="tableListData" :tableTitle="tableTitle" :tableLoading="tableLoading" :selection='false' :index="true" @handleSelectionChange="handleSelectionChange" />
  </iCard>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';
import { iFormItem, iText, iFormGroup, iLabel, icon, iCard } from "rise";
import tableList from '@/components/ws3/commonTable';
import { listFixedPointHistory } from "@/api/partsrfq/negotiateBasicInfor/negotiateBasicInfor.js";
import { fixedRecordTableTitle } from "./data";
export default {
  // import引入的组件需要注入到对象中才能使用
  components: { iFormItem, iText, iFormGroup, iLabel, icon, tableList, iCard },
  data() {
    // 这里存放数据
    return {
      tableListData: [],
      tableTitle: fixedRecordTableTitle,
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
        const pms = {
          rfqId: this.$route.query.id
        }
        const res = await listFixedPointHistory(pms);
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
<style lang='scss' >
// @import url(); 引入公共css类
.info {
  font-weight: Bold;
}
</style>
