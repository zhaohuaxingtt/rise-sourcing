<!--
 * @version: 1.0
 * @Author: zbin
 * @Date: 2021-06-22 11:05:40
 * @LastEditors: Please set LastEditors
 * @Descripttion: your project
-->
<template>
  <iPage class=''>
        <!-- //source2是外部 -->
    <gather :source="'2'" />
  </iPage>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';
import { iPage } from "rise";
import gather from "./gather.vue";
export default {
  // import引入的组件需要注入到对象中才能使用
  components: { iPage, gather },
  data () {
    // 这里存放数据
    return {
      disabled: true
    }
  },
  provide: function () {
    return {
      // getBaseInfo: this.getBaseInfo, //当前是一个请求
      // getbaseInfoData: this.getbaseInfoData,  //直接reture当前请求完的数据
      getDisabled: this.getDisabled,
      // registerFn: this.registerFn
    }
  },
  // 监听属性 类似于data概念
  computed: {},
  // 监控data中的数据变化
  watch: {},
  // 方法集合
  methods: {
    getDisabled () {
      return this.disabled
    }
  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created () {

  },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted () {

  },
}
</script>
<style lang='scss' scoped>
// @import url(); 引入公共css类
</style>
