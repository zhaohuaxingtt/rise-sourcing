<!--
 * @version: 1.0
 * @Author: zbin
 * @Date: 2021-08-05 10:21:31
 * @LastEditors: zbin
 * @Descripttion: your project
-->
<template>
  <div class="scroll flex">
    <!-- <div class="flex-align-center margin-right50" v-for="(item,index) in mapListData.supplierList" :key="index">
      <template v-for="(plant, plantIndex) in item.plantList">
        <div :style="'background:'+color[index]" class="circle margin-right4" :key="plantIndex"></div>
        <div class="margin-left10" :key="plantIndex">{{plant.name}}</div>
      </template>
    </div> -->
    <div class="flex-align-center margin-right50" v-if="mapListData.purchaseFactoryList && mapListData.purchaseFactoryList.length > 0">
      <icon name="iconshangqidazhong" symbol></icon>
      <div class="margin-left10">{{language("SHANGQIDAZONGGONGCHANGMINGCHEN",'上汽大众工厂')}}</div>
    </div>
    <div class="flex-align-center" v-if="mapListData.supplierList && mapListData.supplierList.length > 0">
      <div :style="'background:'+color[0]" class="circle margin-right4"></div>
      <div class="margin-left10">{{language("GONGYINGSGONGCHANGTUBIAO",'供应商工厂')}}</div>
    </div>
  </div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';

import { icon } from "rise";
export default {
  // import引入的组件需要注入到对象中才能使用
  components: { icon },
  props: {
    mapListData: { type: Array, default: () => { return {} } }
  },
  data() {
    // 这里存放数据
    return {
      color: ['#B9DDFA', '#8BC7F7', '#46B3F3', '#009FEF', '#008CEE', '#0078ED', '#0050EB', '#0641C8', '#0B31A5', '#46647C', '#235A7A', '#005078'],
    }
  },
  // 监听属性 类似于data概念
  computed: {},
  // 监控data中的数据变化
  watch: {
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
.scroll {
  overflow-x: auto;
  overflow-y: hidden;
  width: 60%;
  height: 40px;
  color: #0d2451;
  font-size: 16px;
  white-space: nowrap;
  position: absolute;
  top: 10px;
  z-index: 2;
}
.circle {
  width: 14px;
  height: 14px;
  border-radius: 10px;
  border: 1px solid;
  border: none;
}
</style>
