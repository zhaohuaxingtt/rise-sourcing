<!--已审批--->
<template>
  <div>
    <!--搜索区--->
    <i-search class="margin-bottom20" @sure="queryApprovedAKEOForm" @reset="restQueryForm" :resetKey="QUEREN"
              :searchKey="REST">
      <el-form :model="queryAkeoForm" ref="AKEOQueryFormRef">
        <!-- AEKO号 -->
        <el-form-item :label="language('LK_AEKOHAO', 'AEKO号')" prop='aekoCode'>
          <i-input
              v-model="queryAkeoForm.aekoCode"
              :placeholder="language('LK_QINGSHURU','请输入')"
              clearable
          ></i-input>
        </el-form-item>
        <!-- 零件号 -->
        <el-form-item :label="language('LINGJIAHAO', '零件号')" prop='partNum'>
          <i-input
              v-model="queryAkeoForm.partNum"
              :placeholder="language('LK_QINGSHURU','请输入')"
              clearable
          ></i-input>
        </el-form-item>
        <!-- 供应商简称 -->
        <el-form-item :label="language('GONGYINGSHANGJIANCHENG','供应商简称')" prop='supplierName'>
          <i-input
              v-model="queryAkeoForm.supplierName"
              :placeholder="language('LK_QINGSHURU','请输入')"
              clearable
          ></i-input>
        </el-form-item>
        <!-- 专业采购员 -->
        <el-form-item :label="language('ZHUANYECAIGOUYUAN','专业采购员')" prop='linieName'>
          <i-input
              v-model="queryAkeoForm.linieName"
              :placeholder="language('LK_QINGSHURU','请输入')"
              clearable
          ></i-input>
        </el-form-item>
        <!-- 成本变化Δ值 -->
        <el-form-item :label="language('LK_CHENGBENBIANHUAZHI','成本变化Δ值')">
          <div class="intervalCss">
            <el-form-item prop="costChangeMin">
              <i-input
                  v-model="queryAkeoForm.costChangeMin"
                  :placeholder="language('LK_QINGSHURU','请输入')"
                  clearable
              ></i-input>
            </el-form-item>
            <span class="splitLine"></span>
            <el-form-item prop="costChangeMax">
              <i-input
                  v-model="queryAkeoForm.costChangeMax"
                  :placeholder="language('LK_QINGSHURU','请输入')"
                  clearable
              ></i-input>
            </el-form-item>
          </div>
        </el-form-item>

        <el-form-item :label="language('LK_SHENPIZHUANGTAI','审批状态')" prop='auditStatus'>
          <i-select v-model="queryAkeoForm.auditStatus" multiple placeholder="请选择" >
            <el-option
                v-for="item in auditStatusList"
                :key="item.value"
                :label="item.name"
                :value="item.value">
            </el-option>
          </i-select>
        </el-form-item>
      </el-form>
    </i-search>
    <!--表格展示区--->
    <i-card>
      <span class="font18 font-weight">{{ language('LK_AEKOSHENPI', 'AEKO审批') }}</span>
      <!--表格展示区-->
      <tablelist
          height="400"
          index
          :selection="true"
          :tableData="approvedList"
          :tableTitle="approvedHeader"
          :tableLoading="tableLoading"
          :lang="true"
          v-loading="tableLoading"
          @handleSelectionChange="handleSelectionChange"
      >
        <template #isTop="scope">
          <div>
            <span class="icon"><icon v-if="scope.row.isTop" symbol class="icon" name="iconAEKO_TOP"/></span>
          </div>
        </template>
        <template #aekoNum="scope">
          <div style="text-align:left">
            <a class="link-underline" href="javascript:;">
              {{ scope.row.aekoNum }}
            </a>
          </div>
        </template>
        <template #describe="">
          <a class="link-underline" href="javascript:;">
            {{ language('CHAKAN', '查看') }}
          </a>
        </template>
        <template #assignsheet="">
          <a class="link-underline" href="javascript:;">
            {{ language('CHAKAN', '查看') }}
          </a>
        </template>

      </tablelist>
      <div class="pagination">
        <iPagination v-update class="pagination"
                     @size-change="handleSizeChange($event, loadApprovedList)"
                     @current-change="handleCurrentChange($event, loadApprovedList)"
                     background
                     :current-page="page.currPage"
                     :page-sizes="page.pageSizes"
                     :page-size="page.pageSize"
                     :layout="page.layout"
                     :total="page.totalCount"/>
      </div>
    </i-card>

  </div>
</template>

<script>
import {iSearch, iInput, iCard, iPagination, icon, iSelect} from "rise"
import {tableCsfTitle as approvedHeader} from '../components/data'
import tablelist from 'rise/web/components/iFile/tableList';
import {pageMixins} from '@/utils/pageMixins'
import {queryApproved} from "@/api/aeko/approve";

export default {
  name: "AKEOApprovedPage",
  mixins: [pageMixins],
  components: {
    iSearch,
    iInput,
    iCard,
    tablelist,
    iPagination,
    icon,
    iSelect
  },
  data() {
    return {
      //查询表单
      queryAkeoForm: {
        aekoCode: '',//aeko号
        auditStatus: null,//审批状态
        costChangeMax: '',//成本变化上限
        costChangeMin: '',//成本变化下限
        current: 1,//当前页
        size: 10,//分页大小
        linieName: '',//专业采购员
        supplierName: '',//供应商简称
        partNum: '',//零件号
      },
      //返回数据
      approvedList: [],
      //列表数据表头
      approvedHeader: approvedHeader,
      tableLoading: false,
      //选中回调数据集合
      selectApprovedList: [],
      auditStatusList: [{value: 1, name: '同意'}, {value: 2, name: '拒绝'}, {value: 3, name: '补充材料'}],

    }
  },
  created() {
    this.loadApprovedList()
  },
  methods: {
    //加载数据
    loadApprovedList() {
      this.tableLoading = true
      this.queryAkeoForm.current = this.page.currPage
      this.queryAkeoForm.size = this.page.pageSize
      queryApproved(this.queryAkeoForm).then(res => {
        this.tableLoading = false
        if (res.code == 200) {
          this.approvedList = res.data.records
          this.page.totalCount = res.data.total
        } else {
          this.$message.error(res.desZh)
        }
      })
      /*  this.approvedList = [
          {
            aekoNum: '12313',
            isTop: true,
            describe: '23444',
          }
        ]*/
    },
    //查询
    queryApprovedAKEOForm() {
      this.queryAkeoForm.current = 1
      this.queryAkeoForm.size = this.page.pageSize
      this.loadApprovedList()

    },
    //重置查询表单
    restQueryForm() {
      this.$refs.AKEOQueryFormRef.resetFields()
      this.queryAkeoForm.current = 1
      this.queryAkeoForm.size = this.page.pageSize
      this.loadApprovedList()
    },

    //选中回调
    handleSelectionChange(val) {
      this.selectApprovedList = val
      this.queryAkeoForm.current = 1
      this.queryAkeoForm.size = this.page.pageSize
      this.loadApprovedList()
    },
  }
}
</script>

<style lang="scss" scoped>
::v-deep.intervalCss {
  display: inline-flex;
  align-items: center;
  width: 100%;
  vertical-align: top;

  .el-form-item {
    margin: 0 !important;
    padding: 0 !important;
  }
}

.icon {
  svg {
    font-size: 28px;
  }
}

.splitLine {
  margin-left: 5px;
  margin-right: 5px;
  width: 8px;
  height: 0;
  border: 1px solid #000000;
  opacity: 1;
}
</style>