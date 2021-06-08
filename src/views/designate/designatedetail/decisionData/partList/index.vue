<!--
 * @Author: wentliao
 * @Date: 2021-05-21 15:30:02
 * @Description: 决策资料-PartList
-->
<template>
 <div class="decision-data-partList">
    <iCard>
       <div class="decision-data-partList-content">
          <h1 class="flex-between-center margin-bottom20 font18">
              <span>Part List</span>
              <div v-if="isPreview!='1'">
                  <iButton>{{$t('LK_TIAOZHUANZHILINGJIANQINGDANTIANJIA')}}</iButton>
                  <iButton :loading="saveLoading" @click="save">{{$t('LK_BAOCUN')}}</iButton>
              </div>
          </h1>
          <!-- table区域 -->
          <el-table
           :empty-text="$t('LK_ZANWUSHUJU')"
           :data="tableListData"
            v-loading="loading"
          >
           <template v-for="(item,index) in tableTitle" >
               <el-table-column
                  align="center"
                  :key="'tableListData'+index"
                  :prop="item.props"
                  :label="item.name">
                  <template slot-scope="scope">
                     <!-- 系统计算EBR值 -->
                     <span v-if="item.props === 'ebrCalculatedValue'">{{scope.row.ebrCalculatedValue || 0}}</span>
                     <!-- 手工输入EBR值 -->
                     <span v-else-if="item.props === 'ebrConfirmValue'">
                        <span v-if="isPreview=='1'">{{scope.row.ebrConfirmValue || 0}}</span>
                        <iInput v-else v-model="scope.row.ebrConfirmValue" @input="handleInputLimit($event, scope.row)" />
                     </span>
                     <span v-else>{{scope.row[item.props] || '-'}}</span>
                  </template>
                  
               </el-table-column>
            </template>
         </el-table>
          <iPagination
            class="margin-bottom20"
            @size-change="handleSizeChange($event, getListData)"
            @current-change="handleCurrentChange($event, getListData)"
            background
            :page-sizes="page.pageSizes"
            :page-size="page.pageSize"
            :layout="page.layout"
            :current-page="page.currPage"
            :total="page.totalCount" v-update
          />
       </div>
    </iCard>
 </div>
</template>

<script>
import {
  iCard,
  iButton,
  iPagination,
  iInput,
  iMessage,
} from "rise";
import {pageMixins} from '@/utils/pageMixins'
import { 
   getPartList,
   partUpdate,
 } from '@/api/designate/designatedetail/decisionData/partlist'
import { numberProcessor } from "@/utils"
export default {
  mixins:[pageMixins],
     components:{
        iCard,
        iButton,
        iPagination,
        iInput,
        iMessage,
    },
    created(){
       this.getListData();
    },
    data(){
       return{
          loading: false,
          saveLoading:false,
          tableListData:[],
          tableTitle:[
             {props:'fsNum',name:'FS No.',key:'FSNo'},
             {props:'partNum',name:'PART NO.',key:'PARTNO'},
             {props:'partNameZh',name:'Part Name',key:'PartName'},
             {props:'materialGroup',name:'Material Group',key:'MaterialGroup'},
             {props:'procureFactory',name:'Factory',key:'Factory'},
             {props:'project',name:'PROJECT',key:'PROJECT'},
             {props:'sopDate',name:'SOP',key:'SOP'},
             {props:'ebrCalculatedValue',name:'EBR%',key:'EBR%'},
             {props:'ebrConfirmValue',name:'EBR% (input)',key:'EBR% (input)'},
             {props:'lifeTime',name:'Volume (lifetime)',key:'Volume (lifetime)'},
             {props:'paVolume',name:'Volume (p.a.)',key:'Volume (p.a.)'},
          ]
       }
    },
    computed:{
        isPreview(){
            return this.$store.getters.isPreview;
        }
    },
    methods:{
       // 获取列表
       async getListData(){
         const { query } = this.$route;
         const {id ='1'} = query;
          this.loading = true;
         const {pageSize,currPage} = this.page;
          const data = {
             nominateId:id,
             size:pageSize,
             current:currPage
             
          };
          await getPartList(data).then((res)=>{
            this.loading = false;
             const {code,data} = res;
             if(code === '200' && data){
                const { records=[],total } = data;
                this.tableListData = records;
                this.page.totalCount = total;
             }
          }).catch((err)=>{
            this.loading = true;
          })
       },
       // 输入框 手工输入EBR值 数字的限制
       handleInputLimit(val, row){
          this.$set(row, "ebrConfirmValue", numberProcessor(val, 2))
       },
      // 保存
      async save(){
         this.saveLoading = true;
         const data = {
            partPrjList:[  
               ...this.tableListData
            ]
         }
         await partUpdate(data).then((res)=>{
            this.saveLoading = false;
            if (res.code == 200) {
               iMessage.success(this.$i18n.locale === "zh" ? res.desZh : res.desEn)
            } else {
               iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn)
            }
            this.getListData();
         }).catch((err)=>{
             this.saveLoading = false;
         })
      },
    },
}
</script>

<style lang="scss" scoped>
   .decision-data-partList{
      
   }
</style>