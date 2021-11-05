<!--
 * @version: 1.0
 * @Author: zbin
 * @Date: 2021-06-18 10:24:09
 * @LastEditors: zbin
 * @Descripttion: 项目概览
-->
<template>
  <iCard :title="$t('TPZS.XMGL')+'RFQ'+$route.query.id" :defalutCollVal='false' collapse>
    <projectInfor />
    <el-divider></el-divider>
    <partInforTable />
    <supplierTable class="margin-top20" />
  </iCard>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';
import { iCard, iFormItem, iText, iFormGroup, iLabel, icon } from "rise";
import projectInfor from "./projectInfor.vue";
import partInforTable from "./partInforTable.vue";
import supplierTable from "./supplierTable.vue";
export default {
  // import引入的组件需要注入到对象中才能使用
  components: { iCard, iFormItem, iText, iFormGroup, iLabel, icon, projectInfor, partInforTable, supplierTable },
  data() {
    // 这里存放数据
    return {

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
<style lang='scss' >
// @import url(); 引入公共css类
.info {
  font-weight: Bold;
  font-size: 1rem;
}
.el-divider--horizontal {
  margin: 20px 0;
}
</style>
