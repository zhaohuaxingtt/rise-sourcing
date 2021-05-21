<!--
 * @Author: wentliao
 * @Date: 2021-05-21 15:30:02
 * @Description: 决策资料-PartList
-->
<template>
 <iPage class="decision-data-partList">
    <designateStep v-show="!isPreview" @preview="preview"/>
    <decisionDataHeader v-show="!isPreview" :isPreview="isPreview"/>
    <iCard>
       <div>
         <h2 v-show="isPreview" class="flex-between-center margin-bottm20">
            CSC Nomination Recommendation
            <icon symbol name="guanbixiaoxiliebiaokapiannei" class="closeIcon" @click="preview"></icon>
         </h2>
         <decisionDataHeader v-show="isPreview" :isPreview="isPreview"/>
       </div>
       <div class="decision-data-partList-content">
          <h1 class="flex-between-center margin-bottom20 font18">
              <span>Part List</span>
              <div>
                  <iButton>跳转⾄零件清单添加</iButton>
                  <iButton>保存</iButton>
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
            @size-change="handleSizeChange($event, purchaseFactory)"
            @current-change="handleCurrentChange($event, purchaseFactory)"
            background
            :page-sizes="page.pageSizes"
            :page-size="page.pageSize"
            :layout="page.layout"
            :current-page="page.currPage"
            :total="page.totalCount" v-update
          />
       </div>
    </iCard>
 </iPage>
</template>

<script>
import {
  iPage,
  iCard,
  iButton,
  iPagination,
} from "rise";
import designateStep from '../../components/designateStep'
import decisionDataHeader from '../components/decisionDataHeader'
import {pageMixins} from '@/utils/pageMixins'
export default {
  mixins:[pageMixins],
     components:{
        designateStep,
        iPage,
        decisionDataHeader,
        iCard,
        iButton,
        iPagination,
    },
    data(){
       return{
          isPreview:false,
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
    methods:{
       // 预览
       preview(){
          const {isPreview} = this;
          this.isPreview = !isPreview;
       }
    }
}
</script>

<style lang="scss" scoped>
   .decision-data-partList{
      
   }
</style>