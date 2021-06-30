<!--
 * @version: 1.0
 * @Author: zbin
 * @Date: 2021-06-23 10:37:51
 * @LastEditors: zbin
 * @Descripttion: your project
-->
<template>
  <div>
    <div class="flex-between-center-center">
      <span>{{$t('TPZS.SSJG')}}</span>
      <iButton @click="add">{{$t('LK_TIANJIA')}}</iButton>
    </div>
    <tableList class="margin-top24" :tableData="tableListData" :tableTitle="tableTitle" :tableLoading="tableLoading" :selection='true' :index="true" @handleSelectionChange="handleSelectionChange" />
  </div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';
import { iButton } from "rise";
import tableList from '@/components/ws3/commonTable';
import { partsDialogTableTitle } from "./data";
import { searchCarParts } from "@/api/partsrfq/vpAnalysis/vpAnalyseCreate/index.js";
import { iMessage } from '../../../../../components';
import resultMessageMixin from "@/utils/resultMessageMixin.js";


export default {
  // import引入的组件需要注入到对象中才能使用
  mixins: [resultMessageMixin],
  components: { tableList, iButton },
  props: {
    carType: { type: String, default: '' }
  },
  data() {
    // 这里存放数据
    return {
      tableListData: [],
      tableTitle: partsDialogTableTitle,
      tableLoading: false,
      carType: '',
      selectTableData: [],
    }
  },
  // 监听属性 类似于data概念
  computed: {},
  // 监控data中的数据变化
  watch: {
    carType: {
      handler(data) {
        this.carType = data
      },
      deep: true,
      immediate: true
    }
  },
  // 方法集合
  methods: {
    async getTableList(data) {
      this.tableLoading = true;
      try {
        const req = {
          carType: this.carType,
          userId: this.$store.state.permission.userInfo.id,
          ...data
        };
        const res = await searchCarParts(req);
        if (res.result) {
          this.tableListData = res.data;
        }
        this.tableLoading = false;
      } catch {
        this.tableListData = [];
        this.tableLoading = false;
      }
    },
    handleSelectionChange(data) {
      this.selectTableData = data
    },
    async add() {
      if (this.selectTableData.length === 0) {
        iMessage.warn(this.$t('TPZS.QXZYTSJ'))
        return false
      }
      this.$emit('clearDiolog')
      this.$listeners.add('selected', this.selectTableData)
    },
  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.getTableList()
  },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {

  },
}
</script>
<style lang='scss' scoped>
// @import url(); 引入公共css类
.flex-between-center-center > span {
  font-size: 16px;
  font-weight: Bold;
  color: #000000;
}
</style>
