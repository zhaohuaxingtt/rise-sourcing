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
        <img :src="region" alt="" width="50px">
      </el-col>
      <el-col :span="20">
        <div class="title">{{language('DIQU','地区')}}</div>
        <span>{{provinceZh}}</span>
      </el-col>
    </el-row>

  </iCard>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';
import { iCard, } from "rise";
import region from "@/assets/images/supplyChainOverall/region.png";
export default {
  // import引入的组件需要注入到对象中才能使用
  components: { iCard, },
  props: {
    object: { type: Object, default: {} },
    provinceZh: { type: String, default: '' }
  },
  data() {
    // 这里存放数据
    return {
      region: region,
      province: ''
    }
  },
  // 监听属性 类似于data概念
  computed: {},
  // 监控data中的数据变化
  watch: {
    object: {
      deep: true,
      handler(data) {
        this.province = data.province
      }
    }
  },
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
  font-size: 18px;
  font-weight: bold;
}
</style>
