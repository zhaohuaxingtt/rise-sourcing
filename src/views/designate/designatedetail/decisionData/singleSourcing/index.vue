<!--
 * @Author: wentliao
 * @Date: 2021-05-24 10:16:04
 * @Description: 决策资料-SingleSourcing
-->
<template>
    <iCard title="⽣产采购单⼀供应商说明 Single Sourcing for Production Purchasing" v-permission.auto="SOURCING_NOMINATION_ATTATCH_SINGLESOURCING|决策资料-SingleSourcing">
        <template slot="header-control">
             <iButton @click="gotoSupplier" v-if="!fix">{{language('TIAOZHUANGONGYINGSHANGWEIHU','跳转供应商维护')}}</iButton>
        </template>
        <div class="decision-data-singleSourcing-content">
            <div class="margin-top30 margin-bottom30">
                <iFormGroup inline row="2">
                    <iFormItem label-width="130px"  label="项⽬名称 Project:">
                        <iText tooltip style="width:250px">{{projectName}}</iText>
                    </iFormItem>
                        <iFormItem label-width="180px"  label="定点申请单号 Project No.:">
                        <iText style="width:250px">{{nominateId}}</iText>
                    </iFormItem>
                </iFormGroup>
            </div>
            <!-- 表单部分 -->
            <div class="singleSourcing-table">
                <tableList
                    :selection="false"
                    class="table"
                    index
                    :tableData="tableListData"
                    :tableTitle="tableTitle"
                    :tableLoading="loading"
                >
                    <template #suppliersName="scope">
                        <div>
                            <span class="factoryDesc margin-right5">{{scope.row.suppliersName }}</span>
                            <el-tooltip effect="light" :content="`${language('LK_FRMPINGJI','FRM评级')}：${scope.row.frmRate}`" v-if="scope.row.isFRMRate === 1 && !isPreview">
                            <span>
                                <icon symbol name="iconzhongyaoxinxitishi" />
                            </span>
                            </el-tooltip>
                            <br>
                            <span >{{scope.row.suppliersNameEn }}</span>
                        </div>
                    </template>
                    <!-- 零件名称 -->
                    <template #partNameCh="scope">
                        <span>{{scope.row.partNameCh}}</span>
                        <br/>
                        <span>{{scope.row.partNameEn}}</span>
                    </template>
                    <template #sapCode="scope">
                        <span>{{ scope.row.sapCode || scope.row.svwCode || scope.row.svwTempCode }}</span>
                    </template>
                </tableList>
                <iPagination
                    class="margin-bottom20"
                    @size-change="handleSizeChange($event, getDetail)"
                    @current-change="handleCurrentChange($event, getDetail)"
                    background
                    :page-sizes="page.pageSizes"
                    :page-size="page.pageSize"
                    :layout="page.layout"
                    :current-page="page.currPage"
                    :total="page.totalCount" v-update
                />
            </div>
        </div>
    </iCard>
</template>

<script>
import {
  iCard,
  iPagination,
  iFormGroup,
  iFormItem,
  iText,
  iMessage,
  icon,
  iButton,
} from "rise";
import {pageMixins} from '@/utils/pageMixins'
// import tableList from "@/views/partsign/editordetail/components/tableList"

import tableList from '../../components/tableList'
import {
    getSingleSourcing,
} from '@/api/designate/decisiondata/singleSourcing'
export default {
    mixins:[pageMixins],
     components:{
        iCard,
        iPagination,
        iFormGroup,
        iFormItem,
        iText,
        tableList,
        icon,
        iButton,
    },
    name:'SingleSourcing',
    data(){
        return{
            loading: false,
            tableListData:[],
            tableTitle:[
                {name:'FS号',enName:'FS No',props:'fsnrGsnrNum'},
                {name:'零件号',enName:'Part No.',props:'partNum'},
                {name:'零件名称',enName:'Part Name',props:'partNameCh'},
                {name:'供应商名称',enName:'Supplier Name',props:'suppliersName'},
                {name:'供应商号',enName:'Supplier No.',props:'sapCode'},
                {name:'原因',enName:'Reason',props:'singleReason'},
                {name:'原因部⻔',enName:'Caused by',props:'department'},
            ],
            projectName:'',
            nominateId:'',
            fix: false
        }
    },
    created(){
        this.getDetail();
        this.fix = this.$route.query.fix === "1"
    },
    computed:{
        isPreview(){
            return this.$store.getters.isPreview;
        }
    },
    methods:{
        // 获取详情
        async getDetail(){
            this.loading =  true;
            const { query } = this.$route;
            const {desinateId="" } = query;
            const { page } = this;
            const params = {
                nominateId:desinateId,
                current:page.currPage,
                size:page.pageSize,
            };
            await getSingleSourcing(params).then((res)=>{
                const {code,data={}} =res;
                if(code == '200'){
                    const {resultPage={},nominateId='',cartypeProjectZhList=[]} = data;
                    const {total} = resultPage;
                    this.tableListData = resultPage.data || [];
                    this.page.totalCount = total;
                    this.nominateId = nominateId;
                    this.projectName = cartypeProjectZhList ? cartypeProjectZhList.join() : '';
                }else{
                    iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn)
                }
                this.loading =  false;

            }).catch((e)=>{
                    e && iMessage.error(this.$i18n.locale === "zh" ? e.desZh : e.desEn)
                    this.loading =  false; 
                });
        },

        
      // 跳转至跳转供应商维护
      gotoSupplier(){
         const { query } = this.$route;
         console.log(query);
         const router =  this.$router.resolve({
            path: '/designate/supplier',
            query:{
               ...query,
               route:'force'
            }
         })
         window.open(router.href,'_blank');
      }
    }

}
</script>

<style lang="scss" scoped>
.decision-data-singleSourcing-content{
    .singleSourcing-table{
        ::v-deep .el-table .cell{
            white-space:pre-line;
        }
    }
}

</style>