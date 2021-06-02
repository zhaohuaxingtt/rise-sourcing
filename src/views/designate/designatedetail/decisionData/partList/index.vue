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
                  <iButton>{{$t('LK_BAOCUN')}}</iButton>
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
                     :key="'tableListData'+index"
                     :prop="item.key"
                     :label="item.name">
               </el-table-column>>
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
} from "rise";
import {pageMixins} from '@/utils/pageMixins'
import { getPartList } from '@/api/designate/designatedetail/decisionData/partlist'
export default {
  mixins:[pageMixins],
     components:{
        iCard,
        iButton,
        iPagination,
    },
    created(){
       this.getListData();
    },
    data(){
       return{
          loading: false,
          tableListData:[],
          tableTitle:[
             {name:'FS No.',key:'FSNo'},
             {name:'PART NO.',key:'PARTNO'},
             {name:'Part Name',key:'PartName'},
             {name:'Material Group',key:'MaterialGroup'},
             {name:'Factory',key:'Factory'},
             {name:'PROJECT',key:'PROJECT'},
             {name:'SOP',key:'SOP'},
             {name:'EBR%',key:'EBR%'},
             {name:'EBR% (input)',key:'EBR% (input)'},
             {name:'Volume (lifetime)',key:'Volume (lifetime)'},
             {name:'Volume (p.a.)',key:'Volume (p.a.)'},
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
       getListData(){
      const {pageSize,currPage} = this.page;
          const data = {
             nominateId:'1',
             size:pageSize,
             current:currPage
             
          };
          getPartList(data).then((res)=>{
             console.log(res);
          })
       }
    }
}
</script>

<style lang="scss" scoped>
   .decision-data-partList{
      
   }
</style>