<!--
 * @Author: wentliao
 * @Date: 2021-09-28 10:30:31
 * @Description: 零件清单列表
-->
<template>
  <iPage class="aekoPartslist">
    <h2 class="title">
      {{language('LK_AEKOHAO_MANAGE','AEKO号')}}：{{aekoCode}}
    </h2>
    <iNavMvp :list="describeTab" lang  :lev="2" routerPage right></iNavMvp>
    <div class="contain margin-top20">
      <!-- 搜索区域 -->
      <iSearch @sure="sure" @reset="reset">
        <el-form>
          <el-form-item 
          v-for="(item,index) in SearchList" 
          :key="'SearchList_parts_aeko'+index" 
          :label="language(item.labelKey,item.label)"
          v-permission.dynamic.auto="item.permissionKey"
          >
          <template  v-if="item.type === 'select'" >
              <aeko-select 
                v-if="item.isNewSelect"
                :searchParams="searchParams" 
                :ParamKey="item.props" 
                :allOptionsData="selectOptions[item.selectOption]" 
                :multiple="item.multiple"
                :clearable="item.clearable" 
              />
              <iSelect
                v-else
                class="multipleSelect" 
                collapse-tags 
                :multiple="item.multiple" 
                :filterable="item.filterable" 
                :clearable="item.clearable" 
                v-model="searchParams[item.props]" 
                :placeholder="item.filterable ? language('LK_QINGSHURU','请输入') : language('partsprocure.CHOOSE','请选择')"
                reserve-keyword
                @change="handleMultipleChange($event, item.props,item.multiple)"
                :filter-method="(val)=>{dataFilter(val,item.selectOption)}"
                >
                <el-option v-if="!item.noShowAll" value="" :label="language('all','全部')"></el-option>
                <el-option
                  v-for="(item,index) in selectOptions[item.selectOption] || []"
                  :key="item.selectOption+'_'+index"
                  :label="item.desc"
                  :value="item.code"
                  >
                </el-option>  
              </iSelect> 
            </template>
            <iInput :placeholder="language('LK_QINGSHURU','请输入')" v-else v-model.trim="searchParams[item.props]"></iInput> 
          </el-form-item>
        </el-form>
      </iSearch>
    </div>

    <iCard class="margin-top20" :title="language('LK_AEKO_PARTSLIST','零件清单')">
      <div>
        <tableList
          class="table"
          index
          :selection="false"
          :lang="true"
          :tableData="tableListData"
          :tableTitle="tableTitle"
          :tableLoading="loading"
        >
        </tableList>
        <!-- 分页 -->
        <iPagination
          v-update
          @size-change="handleSizeChange($event, getList)"
          @current-change="handleCurrentChange($event, getList)"
          background
          :current-page="page.currPage"
          :page-sizes="page.pageSizes"
          :page-size="page.pageSize"
          :layout="page.layout"
          :total="page.totalCount"
        />
      </div>
    </iCard>

  </iPage>
</template>

<script>
import {
  iPage,
  iNavMvp,
  iSearch,
  iSelect,
  iInput,
  iPagination,
  iCard,
  iMessage,
} from 'rise'
import aekoSelect from '../components/aekoSelect'
import { describeTab } from '../data'
import { searchList,tableTitle } from './data';
import tableList from "@/views/partsign/editordetail/components/tableList"
import { pageMixins } from "@/utils/pageMixins";import {
    searchCartypeProject,
    getSearchCartype,
} from '@/api/aeko/manage'
export default {
    name:'partslist',
    mixins: [pageMixins],
    components:{
      iPage,
      iNavMvp,
      iSearch,
      aekoSelect,
      iSelect,
      iInput,
      iPagination,
      tableList,
      iCard,
    },
    data(){
      return{
        describeTab:describeTab,
        aekoCode:'',
        SearchList:searchList,
        searchParams:{},
        selectOptions:{
          'linieDeptNumList':[],
          'cartypeCode':[],
          'cartype':[],
          'buyerName':[],
        },
        loading:false,
        tableTitle:tableTitle,
        tableListData:[],

      }
    },
    created(){
      const {query} = this.$route;
      const { requirementAekoId ='',aekoCode,} = query;
      this.aekoCode = aekoCode;


      this.getSearchList();
    },
    methods:{
      sure(){

      },
      reset(){

      },
      // 获取列表
      getList(){

      },
      // 获取搜索框下拉数据
      getSearchList(){
        // 车型项目
        searchCartypeProject().then((res)=>{
              const {code,data} = res;
            if(code ==200 ){
                data.map((item)=>{
                    item.desc = item.name;
                    item.lowerCaseLabel = typeof item.name === "string" ? item.name.toLowerCase() : item.name
                })
                this.selectOptions.cartypeCode = data;
            }else{
                iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn);
            }
        })

        // 车型
        getSearchCartype().then((res)=>{
            const {code,data} = res;
            if(code ==200){
                data.map((item)=>{
                    item.desc = item.name;
                    item.lowerCaseLabel = typeof item.name === "string" ? item.name.toLowerCase() : item.name
                })
                this.selectOptions.cartype = data.filter((item)=>item.name) || [];
            }else{
                iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn);
            }
            })
      }

    },
}
</script>

<style lang="scss" scoped>
  .aekoPartslist{

  }
</style>