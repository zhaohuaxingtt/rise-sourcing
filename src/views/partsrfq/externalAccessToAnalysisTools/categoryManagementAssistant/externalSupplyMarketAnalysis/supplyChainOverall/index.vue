<!--
 * @version: 1.0
 * @Author: zbin
 * @Date: 2021-10-21 17:22:40
 * @LastEditors: zbin
 * @Descripttion: your project
-->
<template>
  <div class=''>
    <iframe :src="url" id="flowForm" frameborder="no" border="0" marginwidth="0" marginheight="0" scrolling="no" allowtransparency="yes" />
  </div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';

export default {
  // import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    // 这里存放数据
    return {
      url: ''
    }
  },
  // 监听属性 类似于data概念
  computed: {},
  // 监控data中的数据变化
  watch: {
    "$store.state.rfq.categoryCode": {
      handler(val) {
        this.url=window.location.origin+'/portal/#/supplier/NTier/NTierMap?categoryCode='+val
      }
    }
  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.url=window.location.origin + '/portal/#/supplier/NTier/NTierMap?categoryCode='+this.$store.state.rfq.categoryCode
  },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {

  },
  // 方法集合
  methods: {

  },
}
</script>
<style lang='scss' scoped>
// @import url(); 引入公共css类
#flowForm {
  width: 100%;
  min-height: 60rem;
}
</style>
