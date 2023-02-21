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
              <div>
                  <!-- <template v-if="isPreview!='1' && !nominationDisabled && !rsDisabled"> -->
                  <template v-if="isPreview!='1'">
                  <iButton @click="goToRfq" v-permission.auto="SOURCING_NOMINATION_ATTATCH_PARTLIST_TOPARTLIST|跳转至零件清单添加">{{language('LK_PARTLIST_TIAOZHUANZHILINGJIANQINGDANTIAOJIAN','跳转至零件清单添加')}}</iButton>
                  <iButton :loading="saveLoading" @click="save" v-permission.auto="SOURCING_NOMINATION_ATTATCH_PARTLIST_SAVE|保存">{{language('LK_BAOCUN','保存')}}</iButton>
                  </template>
                  <buttonTableSetting @click="edittableHeader"></buttonTableSetting>
              </div>
          </h1>
          <!-- table区域 -->
          <tablelist
            permissionKey="DESIGNATE_DESIGNATEDETAIL_DECISIONDATA_PARTLIST"
            ref="tableList"
            showTitleName
            v-permission.auto="SOURCING_NOMINATION_ATTATCH_PARTLIST_TABLE|表格"
            :tableData="tableListData"
            :tableTitle="tableTitle"
            :tableLoading="loading"
          >
            <!-- 系统计算EBR值 -->
            <template #ebrCalculatedValue="scope">
               <span>{{ percent(scope.row.ebrCalculatedValue || 0) }}</span>
            </template>
            <!-- 手工输入EBR值 -->
            <!-- <template #ebrConfirmValue="scope">
               <span v-if="isPreview=='1' || nominationDisabled || rsDisabled">{{ percent(scope.row.ebrConfirmValue || 0) }}</span>
               <iInput v-else v-model="scope.row.ebrConfirmValue" @input="handleInputLimit($event, scope.row)" @focus="handleFocus(scope.row.ebrConfirmValue, scope.row)" @blur="handleBlur(scope.row.ebrConfirmValue, scope.row)"/>
            </template> -->
						<template #ebrConfirmValue="scope">
							<span>{{ scope.row.ebrConfirmValue | toThousands(true) }}</span>
						</template>
						<template #lifeTime="scope">
							<span>{{ scope.row.lifeTime | toThousands(true) }}</span>
						</template>
						<template #paVolume="scope">
							<span>{{ scope.row.paVolume | toThousands(true) }}</span>
						</template>
          </tablelist>
          <!-- <el-table
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
                     系统计算EBR值
                     <span v-if="item.props === 'ebrCalculatedValue'">{{ percent(scope.row.ebrCalculatedValue || 0) }}</span>
                     手工输入EBR值
                     <span v-else-if="item.props === 'ebrConfirmValue'">
                        <span v-if="isPreview=='1' || nominationDisabled || rsDisabled">{{ percent(scope.row.ebrConfirmValue || 0) }}</span>
                        <iInput v-else v-model="scope.row.ebrConfirmValue" @input="handleInputLimit($event, scope.row)" @focus="handleFocus(scope.row.ebrConfirmValue, scope.row)" @blur="handleBlur(scope.row.ebrConfirmValue, scope.row)"/>
                     </span>
                     <span v-else>{{scope.row[item.props] || '-'}}</span>
                  </template>
                  
               </el-table-column>
            </template>
         </el-table> -->
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
import { numberProcessor, toThousands } from "@/utils"
import { tableTitle } from "./data"
import tablelist from "@/components/iTableSort";
import { tableSortMixins } from "@/components/iTableSort/tableSortMixins";
import buttonTableSetting from '@/components/buttonTableSetting'
export default {
  mixins:[pageMixins,tableSortMixins],
     components:{
        iCard,
        iButton,
        iPagination,
        iInput,
        tablelist,
        buttonTableSetting
    },
		filters: {
			toThousands
		},
    created(){
       this.getListData();
    },
    data(){
       return{
          loading: false,
          saveLoading:false,
          tableListData:[],
          tableTitle
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
      },
      isRoutePreview() {
         return this.$route.query.isPreview == 1
      },
      isApproval() {
         return this.$route.query.isApproval === "true"
      }
    },
    methods:{
      // 获取列表
      async getListData(){
         const { query } = this.$route;
         const {desinateId =''} = query;

         const {pageSize,currPage} = this.page;

         const data = {
            nominateId:desinateId,
            size:pageSize,
            current:currPage
         }

         this.loading = true

         await getPartList(data)
         .then(res => {
            const {code,data} = res;
            if(code === '200' && data){
            const { records=[],total } = data;
            records.forEach(val => val.mtz === true ? val.mtz = '是' : val.mtz  = '否');

            this.tableListData = records.map(item => {
               const result = { ...item }
               
               // if (item.ebrConfirmValue) {
               //    result.ebrConfirmValue = (this.isPreview == "1" || this.nominationDisabled || this.rsDisabled) ? item.ebrConfirmValue : this.percent(item.ebrConfirmValue)
               // } else {
               //    result.ebrConfirmValue = ""
               // }

               return result
            })

            this.page.totalCount = total;
            }
         })
         .finally(() => this.loading = false)
      },
      // 输入框 手工输入EBR值 数字的限制
      handleInputLimit(val, row){
         this.$set(row, "ebrConfirmValue", numberProcessor(val, 2))
      },
      handleFocus(val, row) {
         this.$set(row, "ebrConfirmValue", val.replace(/^(.*)%$/, "$1"))
      },
      handleBlur(val, row) {
         if (val) {
            this.$set(row, "ebrConfirmValue", val + "%")
         } else {
            this.$set(row, "ebrConfirmValue", "")
         }
      },
      // 保存
      async save(){
         this.saveLoading = true;
         const data = {
            partPrjList:[  
               ...this.tableListData.map(item => ({
                  ...item,
                  ebrConfirmValue: item.ebrConfirmValue ? math.divide(math.bignumber(item.ebrConfirmValue.replace(/^(.*)%$/, "$1")), 100).toFixed(4) : ""
               }))
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
      },
      percent(val) {
         return math.multiply(math.bignumber(val), 100).toString() + '%'
      }
    },
}
</script>

<style lang="scss" scoped>
   .decision-data-partList{
      
   }
</style>