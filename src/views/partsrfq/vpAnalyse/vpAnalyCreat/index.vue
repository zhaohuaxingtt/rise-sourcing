<!--
 * @version: 1.0
 * @Author: zbin
 * @Date: 2021-06-21 15:52:39
 * @LastEditors: zbin
 * @Descripttion: 新建
-->
<template>
  <iPage>
    <div class="header">{{$t('TPZS.VPFX')}}{{!!$store.state.rfq.rfqId?'-'+$store.state.rfq.rfqId:''}}
      <div>
        <iButton @click="handleAnalysis">{{$t('TPZS.VPFXK')}}</iButton>
        <icon class="icon-x" name='icondatabaseweixuanzhong' symbol></icon>
      </div>
    </div>
    <el-row :gutter="16" type="flex" justify="space-between" class="margin-top25">
      <el-col :span="12">
        <carVolumeAnalysis @handleCurrentChange="handleCurrentChange" />
      </el-col>
      <el-col :span="12">
        <partsTable ref="partsTable" />
      </el-col>
    </el-row>
  </iPage>
</template> 

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';
import { iCard, iPage, iButton, icon } from "rise";
import carVolumeAnalysis from "./components/carVolumeAnalysis.vue";
import partsTable from "./components/partsTable.vue";
export default {
  // import引入的组件需要注入到对象中才能使用
  components: { iCard, iPage, iButton, icon, carVolumeAnalysis, partsTable },
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
    handleCurrentChange(data) {
      this.$refs.partsTable.getTableList(data)
    },
    handleAnalysis() {
      if (this.$store.state.rfq.entryStatus) {
        this.$router.push({ path: '/sourceinquirypoint/sourcing/partsrfq/assistant', query: { id: this.$store.state.rfq.rfqId, round: this.$route.query.round, pageType: 'VP', activityTabIndex: 'two' } })
      } else {
        this.$router.push({ path: '/sourcing/partsrfq/externalNegotiationAssistant', query: { pageType: 'VP' } })
      }
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
.header {
  display: flex;
  justify-content: space-between;
  font-size: 20px;
  font-weight: bold;
  .icon-x {
    margin-left: 41px;
    font-size: 1.25rem;
  }
}
</style>
