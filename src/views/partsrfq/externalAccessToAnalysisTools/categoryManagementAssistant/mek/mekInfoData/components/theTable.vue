<!--
 * @version: 1.0
 * @Author: zbin
 * @Date: 2021-08-05 15:47:10
 * @LastEditors: zbin
 * @Descripttion: your project
-->
<template>
  <div>
    <tableList class="margin-top20" :tableData="tableListData" :tableTitle="tableTitle" :tableLoading="tableLoading" :selection='true' :index="true" @handleCurrentChange="handleCurrentChange">
      <template #isShow="scope">
        <div v-if="scope.row.isShow" @click="handle(scope.row)">
          <icon name="iconxianshi" symbol />
        </div>
        <div v-else>
          <icon name="iconyincang" symbol />
        </div>
      </template>
      <template #wire="scope">
        <div v-if="scope.row.index===0">
          <icon name="iconMEK-xuxian" symbol />
        </div>
      </template>
      <template #tip="scope">
        <div class="flex">
          <span>配置</span>
          <div v-if="scope.row.index!==0">
            <el-popover trigger="hover" placement="top-start">
              <div class="tip-box">
                <div class="tip-title">{{language("GAICHEXINGPEIZHI",'该车型配置:')}}</div>
                <div class="tip-content">Trendline</div>
                <div class="tip-content">Comfortline</div>
                <div class="tip-title">Highline </div>
              </div>
              <icon slot="reference" symbol name="iconxinxitishi" class="font-size16 marin-left5" />
            </el-popover>
          </div>
        </div>
      </template>
    </tableList>
    <iPagination v-update @size-change="handleSizeChange($event, getTableList)" @current-change="handleCurrentChange($event, getTableList)" background :page-sizes="page.pageSizes" :page-size="page.pageSize" :layout="page.layout" :current-page='page.currPage' :total="page.totalCount" />
  </div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';
import { iButton, icon, iSelect, iPagination } from "rise";
import addPartDialog from "./addPartDialog.vue";
import tableList from '@/components/ws3/commonTable';
import { pageMixins } from '@/utils/pageMixins';
import resultMessageMixin from '@/utils/resultMessageMixin.js';
import { tableTitle } from "./data.js";

export default {
  // import引入的组件需要注入到对象中才能使用
  mixins: [pageMixins, resultMessageMixin],
  components: { iButton, icon, iSelect, tableList, iPagination, addPartDialog },
  data() {
    // 这里存放数据
    return {
      tableListData: [
        {
          rfq: '256',
          isShow: true,
          carInfo: '9999',
          wire: true,
        },
        {
          rfq: '256',
          isShow: true,
          carInfo: '9999',
          tip: true,
          wire: false
        },
      ],
      tableTitle: tableTitle,
      tableLoading: false,
    }
  },
  // 监听属性 类似于data概念
  computed: {},
  // 监控data中的数据变化
  watch: {},
  // 方法集合
  methods: {
    handle(item) {
      console.log(item);
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
.tip-title {
  font-size: 14px;
  color: #000;
}
.tip-content {
  font-size: 14px;
  color: #e83638;
}
</style>
