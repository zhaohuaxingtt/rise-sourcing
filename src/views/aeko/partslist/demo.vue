<!--
 * @Author: wentliao
 * @Date: 2021-09-28 10:30:31
 * @Description: 零件清单列表
-->
<template>
  <div  class="aekoPartslist">
    <h2 class="title">
      {{language('LK_AEKOHAO_MANAGE','AEKO号')}}：{{aekoCode}}
    </h2>
    <iNavMvp :list="describeTab" lang  :lev="2" :query="$route.query || {}" routerPage right></iNavMvp>
    <div class="contain margin-top20">
      <!-- 搜索区域 -->
      <iSearch @sure="sure" @reset="reset">
        <el-form>
          <el-form-item 
          v-show="!item.showCode || (item.showCode && (item.showCode).includes(aekoType))"
          v-for="(item,index) in SearchList" 
          :key="'SearchList_parts_aeko'+index" 
          :label="language(item.labelKey,item.label)"
          >
          <template  v-if="item.type === 'select'" >
              <iSelect
                class="multipleSelect"
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

  </div>
</template>

<script>
const searchList = [
    {props:'buyerId',label:'专业采购员',type:'select',labelKey:'LK_AEKO_PARTS_ZHUANYECAIGOUYUAN',selectOption:'buyerId',permissionKey:'AEKO_PARTSLIST_SELECT_ZHUANYECAIGOUYUAN|专业采购员',noShowAll:false,filterable:true,clearable:true,isNewSelect: false,searchKey: 'pinyin'},
    {props:'partNum',label:'零件号',type:'input',labelKey:'LK_LINGJIANHAO',permissionKey:'AEKO_PARTSLIST_INPUT_PARTNUM|零件号'},
    {props:'cartypeCode',label:'⻋型项⽬',type:'select',labelKey:'LK_AEKOCHEXINGXIANGMU',isNewSelect:false,permissionKey:'AEKO_PARTSLIST_SELECT_CARTYPECODE|⻋型项⽬',showCode:['AEKO','MP'],selectOption:'cartypeCode',filterable:true,noShowAll:true,clearable:true,multiple:true, searchKey: 'pinyin'},
    {props:'cartype',label:'车型',type:'select',isNewSelect:false,labelKey:'LK_AEKO_CHEXING',permissionKey:'AEKO__PARTSLIST_SELECT_CARTYPE|车型',selectOption:'cartype',showCode:['AEA'],multiple:true,filterable:true,clearable:true,noShowAll:true, searchKey: 'pinyin'},
    {props:'linieDeptNumList',label:'科室',type:'select',labelKey:'LK_AEKOKESHI',permissionKey:'AEKO_PARTSLIST_SELECT_LINIEDEPtNUM|科室',selectOption:'linieDeptNumList',filterable:true,clearable:true,multiple:true,isNewSelect: false,searchKey: 'pinyin'},
  ]
import {
  iNavMvp,
  iSearch,
  iInput,
  iPagination,
  iCard,
  iMessage,
} from 'rise'
import { describeTab } from '../data'
import {tableTitle } from './data';
import tableList from "@/views/partsign/editordetail/components/tableList"
import iSelect from '@/components/iSelect'
import { pageMixins } from "@/utils/pageMixins";
import {
    searchCartypeProject,
    getSearchCartype,
    searchLinie,
    searchCommodity,
} from '@/api/aeko/manage'
import {
  getPartAuditPage,
} from '@/api/aeko/describe'
export default {
    name:'partslist',
    mixins: [pageMixins],
    components:{
      iNavMvp,
      iSearch,
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
        aekoType:'',
        SearchList:searchList,
        searchParams:{
          cartypeCode:[''],
          cartype:[''],
          buyerId:'',
          partNum:'',
          linieDeptNumList:['']
        },
        selectOptionsCopy: {},
        selectOptions:{
          'linieDeptNumList':[],
          'cartypeCode':[],
          'cartype':[],
          'buyerId':[],
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
      this.aekoType = this.aekoTypeByAekocode(aekoCode);

      this.getSearchList();

      this.getList();
    },
    methods:{
      sure(){
        this.page.currPage = 1
        this.getList()
      },
      reset(){
        this.searchParams={
          cartypeCode:[''],
          cartype:[''],
          buyerName:'',
          partNum:'',
          linieDeptNumList:['']
        };
        this.sure();
      },
      // 获取列表
      async getList(){
        const {query} = this.$route;
        const {page,searchParams,aekoType} = this;
        const {linieDeptNumList=[],partNum,buyerId} = searchParams;
        const { requirementAekoId ='',} = query;
         this.loading = true;

         let carTypeCodeList=[];
          // 车型和车型项目同一个code参数 单独处理下
          if(aekoType){
                if(aekoType == 'AEA'){  // 车型
                    carTypeCodeList = searchParams.cartype;
                }else if(['AEKO','MP'].includes(aekoType)){ // 车型项目
                    carTypeCodeList = searchParams.cartypeCode;
                }
            }

         const data = {
           requirementAekoId,
            current:page.currPage,
            size:page.pageSize,
            buyerId,
            partNum,
            carTypeCodeList:(carTypeCodeList.length == 1 && carTypeCodeList[0] === '') ? [] : carTypeCodeList,
            linieDeptNumList:(linieDeptNumList.length == 1 && linieDeptNumList[0] === '') ? [] : linieDeptNumList,
         };
         await getPartAuditPage(data).then((res)=>{
           this.loading = false;
            const {code,data} = res;
            if(code == 200){
                const { records=[],total } = data;
                records.map((item,index)=>{
                    item.lineIndex = index+1;
                })
                this.tableListData =  records;
                this.page.totalCount = total;
            }else{
                iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn)
            }
         }).catch(()=>this.loading = false);
      },
      // 获取搜索框下拉数据
      getSearchList(){
        // 车型项目
        searchCartypeProject().then((res)=>{
          const {code,data} = res;
          if(code ==200 ){
              data.map((item)=>{
                  item.desc = item.name;
                  item.pinyin = String(item.name).spell().toLowerCase()
                  // item.lowerCaseLabel = typeof item.name === "string" ? item.name.toLowerCase() : item.name
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
                  item.pinyin = String(item.name).spell().toLowerCase()
              })
              this.selectOptions.cartype = data.filter((item)=>item.name) || [];
          }else{
              iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn);
          }
        })

        // 专业采购员
        searchLinie().then((res)=>{
          const {code,data} = res;
          if(code ==200 ){
              data.map((item)=>{
                  item.desc = this.$i18n.locale === "zh" ? item.nameZh : item.nameEn;
                  item.code = String(item.id);
                  item.pinyin = String(this.$i18n.locale === "zh" ? item.nameZh : item.nameEn).spell().toLowerCase()
              })
              this.selectOptions.buyerId = data;
          }else{
              iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn);
          }
        })

        // 科室
        searchCommodity().then((res)=>{
            const {code,data} = res;
            if(code ==200 ){
                data.map((item)=>{
                    item.desc = item.deptNum;
                    item.code = item.deptNum;
                    item.pinyin = String(item.deptNum).spell().toLowerCase()
                })
                this.selectOptions.linieDeptNumList = data;
                this.selectOptionsCopy.linieDeptNumList = data;
            }else{
                iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn);
            }
        })
      },

      // 根据AEKO号判断AEKO类型
      aekoTypeByAekocode(aekoCode){
        if(/^[a-z|A-Z]{2}.*/.test(aekoCode)){
          return 'AEKO'
        }else if(/^[a-z|A-Z]{1}[0-9]{1}.*/.test(aekoCode)){
          return 'AEA'
        }else if(/^[0-9]{2}.*/.test(aekoCode)){
          return 'MP'
        }else{
          return '-'
        }
      },

      // 模糊搜索处理
      dataFilter(val,props){
        // 去除前后空格
        const trimVal = val.trim();
        const { selectOptionsCopy={}} = this;
        if(trimVal){
            // 人名要特殊处理 --- 可搜索英文去除大小写
          if(props == 'buyerName'){
            const list = selectOptionsCopy[props].filter((item) => {
              if (!!~item.nameZh.indexOf(trimVal) || (item.nameEn && !!~item.nameEn.toUpperCase().indexOf(trimVal.toUpperCase()))) {
                return true
              }
            })
            this.selectOptions[props] = list;
          }else{
            const list = selectOptionsCopy[props].filter((item) => {
              if(~item.desc.indexOf(trimVal) || !!~item.desc.toUpperCase().indexOf(trimVal.toUpperCase())){
                  return true;
              } 
            })
             this.selectOptions[props] = list;
          }
        }else{
          this.selectOptions[props] = selectOptionsCopy[props];
        }
      },

        // 多选处理
        handleMultipleChange(value, key,multiple) {
          // 单选不处理
          if(!multiple) return;

          if (!value[value.length - 1]) {
              this.$set(this.searchParams, key, [""])
          } else {
              this.$set(this.searchParams, key, this.searchParams[key].filter(item => item || item === 0))
          }
        },

    },
}
</script>

<style lang="scss" scoped>
  .aekoPartslist{

  }
</style>