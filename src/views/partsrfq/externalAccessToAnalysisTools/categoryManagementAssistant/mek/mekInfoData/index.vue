<!--
 * @version: 1.0
 * @Author: zbin
 * @Date: 2021-08-05 15:40:45
 * @LastEditors: zbin
 * @Descripttion: your project
-->
<template>
  <iPage class=''>
    <handleNav />
    <iCard class="margin-top20">
      <theTable ref="theTable" />
    </iCard>
  </iPage>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';
import handleNav from "./components/handleNav.vue";
import theTable from "./components/theTable.vue";
import { iPage, iCard } from "rise";
export default {
  // import引入的组件需要注入到对象中才能使用
  components: { iPage, iCard, theTable, handleNav },
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
<style lang='scss' scoped>
// @import url(); 引入公共css类
</style>
