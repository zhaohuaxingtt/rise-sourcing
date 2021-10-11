<!--待审批--->
<template>
 <div>
   <!--搜索区--->
   <i-search class="margin-bottom20" @sure="queryPendingAKEOForm" @reset="restQueryForm" :resetKey="QUEREN" :searchKey="REST">
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
     </el-form>
   </i-search>

   <!--表格展示区--->
   <i-card>
    <span class="font18 font-weight">{{ language( 'LK_AEKOSHENPI', 'AEKO审批' ) }}</span>
     <div class="editControl floatright margin-bottom20">
       <i-button @click="batchApproval"> {{ language('LK_PILIANGSHENPI', '批量审批') }}</i-button>
       <i-button @click="approval"> {{ language('SHENPI', '审批') }}</i-button>
     </div>
     <!--表格展示区-->
     <tablelist
         height="400"
         index
         :selection="true"
         :tableData="pendingList"
         :tableTitle="pendingHeader"
         :tableLoading="tableLoading"
         :lang="true"
         v-loading="tableLoading"
         @handleSelectionChange="handleSelectionChange"
     >
       <template #isTop="scope">
         <div >
           <span class="icon"><icon v-if="scope.row.isTop" symbol class="icon" name="iconAEKO_TOP" /></span>
         </div>
       </template>
       <template #aekoNum="scope">
         <div style="text-align:left">
           <a class="link-underline" href="javascript:;">
             {{scope.row.aekoNum}}
           </a>
         </div>
       </template>
       <template #describe="">
         <a class="link-underline" href="javascript:;">
           {{language('CHAKAN', '查看')}}
         </a>
       </template>
       <template #assignsheet="">
         <span>变速箱</span>
       </template>
       <!--涉及车型和车型项目-->
       <template #money="">
         <span>Polo</span>
       </template>
       <!--主要供应商-->
       <template #assignsheet="">>
         <span>上汽大众</span>
       </template>

       <!--增加材料成本-->
       <template #assignsheet="">
         <span>100 </span>
         <el-tooltip  effect="light" popper-class="custom-card-tooltip" content="Top Center 提示文字" placement="top">
           <i class="el-icon-info bule"></i>
         </el-tooltip>

       </template>
     </tablelist>
     <div class="pagination">
       <iPagination v-update class="pagination"
                    @size-change="handleSizeChange($event, loadPendingAKEOList)"
                    @current-change="handleCurrentChange($event, loadPendingAKEOList)"
                    background
                    :current-page="page.currPage"
                    :page-sizes="page.pageSizes"
                    :page-size="page.pageSize"
                    :layout="page.layout"
                    :total="page.totalCount" />
     </div>
   </i-card>

 </div>
</template>

<script>
import {iSearch, iInput,iCard,iButton,iPagination,icon} from "rise"
import {tableCsfTitle as pendingHeader} from '../components/data'
import tablelist from 'rise/web/components/iFile/tableList';
import { pageMixins } from '@/utils/pageMixins'

export default {
  name: "AKEOPendingPage",
  mixins: [pageMixins],
  components:{
    iSearch,
    iInput,
    iCard,
    iButton,
    tablelist,
    iPagination,
    icon
  },
  data(){
    return {
      //查询表单
      queryAkeoForm:{
        aekoCode: '',//aeko号
        costChangeMax: '',//成本变化上限
        costChangeMin: '',//成本变化下限
        current: 1,//当前页
        size: 10,//分页大小
        linieName: '',//专业采购员
        supplierName: '',//供应商简称
        partNum: '',//零件号
      },
      //返回数据
      pendingList:[],
      //列表数据表头
      pendingHeader:pendingHeader,
      tableLoading:false,
      //选中回调数据集合
      selectPendingList:[],
    }

  },
  created() {
    this.loadPendingAKEOList()
  },
  methods:{
    //加载数据
    loadPendingAKEOList(){
      this.queryAkeoForm.current = this.page.currPage
      this.queryAkeoForm.size = this.page.pageSize

      this.pendingList = [
        {
          aekoNum: '12313',
          isTop: true,
          describe: '23444',
          money:1222,
        }
      ]
    },
    //查询
    queryPendingAKEOForm(){
      this.queryAkeoForm.current = 1
      this.queryAkeoForm.size = this.page.pageSize
      this.loadPendingAKEOList()
    },
    //重置查询表单
    restQueryForm(){
      this.$refs.AKEOQueryFormRef.resetFields()


    },
    //批量审批
    batchApproval(){

    },
    //审批
    approval(){

    },
    //选中回调
    handleSelectionChange(val){
      this.selectPendingList=val
    },

  }
}
</script>

<style scoped lang="scss">
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
.splitLine{
  margin-left: 5px;
  margin-right: 5px;
  width: 8px;
  height: 0;
  border: 1px solid #000000;
  opacity: 1;
}
</style>
