<!--
 * @version: 1.0
 * @Author: zbin
 * @Date: 2021-08-03 11:00:56
 * @LastEditors: zbin
 * @Descripttion: your project
-->
<template>
  <div class="right" width="4rem">
    <carType v-bind="$attrs" />
    <region v-bind="$attrs" class="margin-top20" />
    <materials v-bind="$attrs" class="margin-top20" />
    <supplier v-if="false" class="margin-top20" />
  </div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';
import carType from "./carType.vue";
import region from "./region.vue";
import supplier from "./supplier.vue";
import part from "./part.vue";
import materials from "./materials.vue";
export default {
  // import引入的组件需要注入到对象中才能使用
  components: { carType, region, supplier, part, materials },
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
<style lang='scss'>
// @import url(); 引入公共css类
.right {
  .icon {
    font-size: 60px;
  }
}
</style>
