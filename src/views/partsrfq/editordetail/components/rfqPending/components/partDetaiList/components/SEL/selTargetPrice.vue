<!--
 * @Author: YoHo
 * @Date: 2021-12-31 15:11:17
 * @LastEditTime: 2022-12-29 18:04:08
 * @LastEditors: 余继鹏 917955345@qq.com
 * @Description: 
-->
<template>
  <iCard v-if="hasData" collapse :title="language('SEL目标价', 'SEL目标价')" :defalutCollVal="status == '已完成' || !todo">
    <template slot="subInfo">
      <div
        v-if="todo"
        :class="{
          danger: status == '未申请',
          warning: status == '未完成',
          success: status == '已完成',
        }"
        class="tishi"
      >
        <icon symbol :name="iconName[status]" class="tishi-icon"></icon>
        <span class="status">{{ status }}</span>
      </div>
      <el-popover
          v-else
          placement="right"
          trigger="hover"
          :content="$t('请与FOP确认该零件有SEL预算')"
        >
          <icon
            slot="reference"
            symbol
            name="iconzhongyaoxinxitishi"
            class="tishi-icon"
          ></icon>
        </el-popover>
    </template>
    <template slot="header-control">
      <div class="button-box">
        <template v-if="!todo">
          <iButton v-if="isPosition" @click="changeData" v-permission.auto="PARTSRFQ_PARTDETAILLIST_SELTARGETPRICE_XIUGAIFENTANLIANG|SEL目标价-修改分摊量">{{ language('修改分摊量','修改分摊量') }}</iButton>
          <iButton v-if="isPosition" @click="showDialog" v-permission.auto="PARTSRFQ_PARTDETAILLIST_SELTARGETPRICE_CHAKANSHENQINGJILU|SEL目标价-查看申请记录">{{ language('CHAKAN','查看') + language('申请记录','申请记录') }}</iButton>
          <iButton @click="exportExcel" v-permission.auto="PARTSRFQ_PARTDETAILLIST_SELTARGETPRICE_DAOCHU|SEL目标价-导出">{{ language("LK_DAOCHU", "导出") }}</iButton>
        </template>
        <template v-else>
          <iButton v-if="!disabled" @click="applySEL" v-permission.auto="PARTSRFQ_EDITORDETAIL_APPLYSELTARGETPRICE|申请SEL目标价">{{
            language("LK_SHENQINGMUBIAOJIA", "申请SEL目标价")
          }}</iButton>
        </template>
      </div>
    </template>
    <div>
      <tablelist
        :tableData="tableListData"
        :tableTitle="tableTitle"
        :tableLoading="tableLoading"
        @handleSelectionChange="handleSelectionChange"
        :hide-open-page="true"
        :index="true"
        :lang="true"
      >
        <template #status="scope">
          <span>{{ getStatus(scope.row.status) }}</span>
        </template>
        <!-- 目标价·分摊 -->
        <template #shareTargetPrice="scope">
          <span>{{ scope.row.shareTargetPrice | thousandsFilter(2)}}</span>
        </template>
        <!-- 目标价·一次性 -->
        <template #targetPrice="scope">
          <span>{{ scope.row.targetPrice | thousandsFilter(2)}}</span>
        </template>
        <!-- 预计A价分摊 -->
        <template #estimateShareAPrice="scope">
          <span>{{ scope.row.estimateShareAPrice | thousandsFilter }}</span>
        </template>
      </tablelist>
      <iPagination
        v-update
        @size-change="handleSizeChange($event, getTableList)"
        @current-change="handleCurrentChange($event, getTableList)"
        background
        :page-sizes="page.pageSizes"
        :page-size="page.pageSize"
        :layout="page.layout"
        :current-page="page.currPage"
        :total="page.totalCount"
      />
    </div>
    <applyDialog :visible.sync="visible" :options="options" :rfqId="$route.query.id" />
    <changeDialog :visible.sync="changeVisible" :options="options" :data="selectTableData" @getTableList="getTableList" />
  </iCard>
</template>

<script>
import { iCard, iButton, iPagination, iMessage, icon } from "rise";
import tablelist from "pages/partsrfq/components/tablelist";
import applyDialog from "./applyDialog";
import changeDialog from "./changeDialog";
import { pageMixins } from "@/utils/pageMixins";
import { iconName, SELTargetPriceTitle as tableTitle } from "./data";
import { getSelTargetPriceTask, exportSelTargetPriceTask } from "@/api/SELTargetPrice";
import { selectDictByKeys } from "@/api/dictionary";
import filters from '@/utils/filters'
export default {
  components: {
    iCard,
    iButton,
    iPagination,
    tablelist,
    icon,
    applyDialog,
    changeDialog
  },
  mixins: [pageMixins,filters],
  props: {
    todo: Boolean,
  },
  data() {
    return {
      hasData:false,
      iconName,
      visible: false,
      changeVisible:false,
      tableListData: [],
      tableLoading: false,
      selectTableData: [],
      options:{},
      tableTitle,
    };
  },
  inject:["isPos", "getDisabled"],
  computed:{
    status(){
      return this.$store.state.rfq.todoObj['cfPriceStatusDesc'].status
    },
    isPosition() {
      return this.isPos()
    },
    disabled() {
      return this.getDisabled()
    }
  },
  created() {
    if(!this.todo){
      this.selectDictByKeys()
      this.getTableList();
    }
  },
  methods: {
    selectDictByKeys() {
      selectDictByKeys([
        { keys: "sel_target_price_status" },
      ]).then((res) => {
        if (res.data) {
          this.$set(
            this.options,
            "sel_target_price_status",
            res.data["sel_target_price_status"]
          );
        }
      });
    },
    getStatus(status) {
      return (
        this.options.sel_target_price_status?.find((item) => item.code == status)
          ?.name || status
      );
    },
    // 修改分摊量
    changeData(){
      if (this.selectTableData.length == 0)
        return iMessage.warn(
          this.language(
            "LK_QINGXUANZEZHISHAOYITIAOSHUJU",
            "请选择至少一条数据"
          )
        );
      this.changeVisible = true;
    },
    showDialog() {
      this.visible = true;
    },
    // 申请SEL目标价
    applySEL(){
      if (this.selectTableData.length == 0) {
        return iMessage.warn(
          this.language(
            "抱歉，您当前还未选择需要申请SEL目标价的采购项目！",
            "抱歉，您当前还未选择需要申请SEL目标价的采购项目！"
          )
        );
      }
      let msg = ''
      this.selectTableData.forEach(item=>{
        if(['已冻结','已定点'].includes(item.statusDesc)){
          msg+=item.fsnrGsnrNum
        }
      })
      if(msg){
        return iMessage.error(
          msg + '采购项目状态为已冻结/已定点，不可申请SEL目标价'
        );
      }
      console.log('调用接口');
    },
    async getTableList() {
      const id = this.$route.query.id;
      this.hasData = false
      if (id) {
        this.tableLoading = true;
        try {
          const res = await getSelTargetPriceTask({
            rfqId: id,
            current: this.page.currPage,
            size: this.page.pageSize,
          });
          this.tableListData = Array.isArray(res.data) ? res.data : [];
          this.page.totalCount = res.total || 0;
          this.tableLoading = false;
          if(res.total) this.hasData = true
        } finally {
          this.tableLoading = false;
        }
      }
    },
    exportExcel() {
      exportSelTargetPriceTask({
            rfqId: this.$route.query.id,
            current: this.page.currPage,
            size: this.page.pageSize,
          }).then(res=>{
            console.log(res);
          })
    },
    //修改表格改动列
    handleSelectionChange(val) {
      this.selectTableData = val;
    },
  },
};
</script>

<style scoped>
</style>