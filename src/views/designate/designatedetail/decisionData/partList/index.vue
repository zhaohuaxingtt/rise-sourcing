<!--
 * @Author: wentliao
 * @Date: 2021-05-21 15:30:02
 * @Description: 决策资料-PartList
-->
<template>
 <div class="decision-data-partList" v-permission.auto="SOURCING_NOMINATION_ATTATCH_PARTLIST|决策资料-PartList">
    <iCard>
       <div class="decision-data-partList-content">
          <h1 class="flex-between-center margin-bottom20 font18">
              <span>Part List</span>
              <div v-if="isPreview!='1' && !nominationDisabled && !rsDisabled">
                  <iButton @click="goToRfq" v-permission.auto="SOURCING_NOMINATION_ATTATCH_PARTLIST_TOPARTLIST|跳转至零件清单添加">{{language('LK_PARTLIST_TIAOZHUANZHILINGJIANQINGDANTIAOJIAN','跳转至零件清单添加')}}</iButton>
                  <iButton :loading="saveLoading" @click="save" v-permission.auto="SOURCING_NOMINATION_ATTATCH_PARTLIST_SAVE|保存">{{language('LK_BAOCUN','保存')}}</iButton>
              </div>
          </h1>
          <!-- table区域 -->
          <el-table
           :empty-text="language('LK_ZANWUSHUJU','暂无数据')"
           :data="tableListData"
            v-loading="loading"
            v-permission.auto="SOURCING_NOMINATION_ATTATCH_PARTLIST_TABLE|表格"
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
                        <span v-if="isPreview=='1' || nominationDisabled || rsDisabled">{{scope.row.ebrConfirmValue || 0}}</span>
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
             {props:'fsNum',name:'FS NO.',key:'FSNo'},
             {props:'partNum',name:'Part NO.',key:'PARTNO'},
             {props:'partNameZh',name:'Part Name',key:'PartName'},
             {props:'mtz',name:'MTZ',key:'MTZ'},
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
      // eslint-disable-next-line no-undef
      ...Vuex.mapState({
         nominationDisabled: state => state.nomination.nominationDisabled,
         rsDisabled: state => state.nomination.rsDisabled,
      }),
      isPreview(){
         return this.$store.getters.isPreview;
      }
    },
    methods:{
       // 获取列表
       async getListData(){
         const { query } = this.$route;
         const {desinateId =''} = query;
          this.loading = true;
         const {pageSize,currPage} = this.page;
          const data = {
             nominateId:desinateId,
             size:pageSize,
             current:currPage
             
          };
          await getPartList(data).then((res)=>{
            this.loading = false;
             const {code,data} = res;
             if(code === '200' && data){
                const { records=[],total } = data;
                records.forEach(val => val.mtz === true ? val.mtz = 'MTZ' : val.mtz  = '');
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

      // 跳转至零件清单添加
      goToRfq(){
         const { query } = this.$route;
         console.log(query);
         const router =  this.$router.resolve({
            path: '/designate/rfqdetail',
            query:{
               ...query,
               route:'force'
            }
         })
         window.open(router.href,'_blank');
      }
    },
}
</script>

<style lang="scss" scoped>
   .decision-data-partList{
      
   }
</style>