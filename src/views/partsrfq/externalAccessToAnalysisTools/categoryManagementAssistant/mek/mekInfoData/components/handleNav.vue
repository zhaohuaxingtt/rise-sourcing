<!--
 * @version: 1.0
 * @Author: zbin
 * @Date: 2021-08-05 16:22:39
 * @LastEditors: zbin
 * @Descripttion: your project
-->
<template>
  <div class='flex-between-center-center'>
    <div class="title">
      {{language('MEKJCSJK','MEK基础数据库')}}
    </div>
    <div class="flex-between-center-center">
      <iButton @click="handleBack">{{language('FANHUI','返回')}}</iButton>
      <slot class="margin-left20" name="extralButton"></slot>
      <logButton class="logButton" />
      <icon class="margin-left20" name="icondatabaseweixuanzhong" symbol></icon>
    </div>
  </div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';
import { iButton, icon } from "rise";
import logButton from '@/components/logButton'
export default {
  // import引入的组件需要注入到对象中才能使用
  components: { iButton, logButton, icon },
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
    handleBack() {
      this.$router.go(-1)
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
.icon {
  font-size: 1.5rem;
}
.title {
  font-size: 22px;
  font-weight: bold;
  color: #000;
}
</style>
