<!--
 * @Autor: Hao,Jiang
 * @Date: 2021-09-30 11:39:01
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-10-15 14:50:56
 * @Description: 零件列表 AEKO 
-->
<template>
  <div class="aekoPartslist" v-permission.auto="AEKO_PARTLIST_CSFAEKOPARTLIST_PAGE|CSF&AEKO审批分配人零件清单">
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

    <iCard class="margin-top20" :title="language('LK_AEKO_PARTSLIST','零件清单')" v-permission.auto="AEKO_PARTLIST_CSFAEKOPARTLIST_TABLE|表格">
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
        <template #newMsgSheet="scope">
          <a href="javascript:;" @click="toMsgSheet(scope.row)">查看</a>
        </template>
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
import Vuex from 'vuex'
import {
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
import { aekoCSFsearchList as searchList, aekoCSFtableTitle as tableTitle } from './data';
import tableList from "@/views/partsign/editordetail/components/tableList"
import { pageMixins } from "@/utils/pageMixins";import {
    searchCartypeProject,
    getSearchCartype,
    searchLinie,
    searchCommodity,
} from '@/api/aeko/manage'
import {
  getPartAuditPage,
} from '@/api/aeko/describe'
import { getTabelData } from "@/api/partsign/home"
import { needTranslate } from "@/views/partsign/home/components/data";
import local from "@/utils/localstorage";

export default {
    name:'partslist',
    mixins: [pageMixins],
    components:{
      iNavMvp,
      iSearch,
      aekoSelect,
      iSelect,
      iInput,
      iPagination,
      tableList,
      iCard,
    },
    computed: {
		...Vuex.mapState({
      userInfo: state => state.permission.userInfo,
    })
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

      console.log(this.aekoType,'aekoType');

      this.getSearchList();

      this.getList();
    },
    methods:{
      openPartSignPage(val) {
        local.set(
          "tpPartInfoVO",
          JSON.stringify(this.translateDataForDetail(val))
        );
        this.$router.push({
          path: "/sourceinquirypoint/sourcing/partsign/editordetail",
        });
      },
      //在跳转到详情界面之前，需要将数据格式化为中文。
      translateDataForDetail(v) {
        needTranslate.forEach((element) => {
          if (v[element.name]) {
            try {
              const options = element.option ? (this.fromGroup[element.option] || []) : []
              const result = options.find((i) => i.code == v[element.name]);
              v[element.name] = result ? result.name : "";
            } catch (error) {
              v[element.name] = "";
            }
          }
        });
        return v;
      },
      async toMsgSheet(row) {
        console.log('零件信息', row)
        try {
          const tPrams = {
            partNum: row.originPartNum,
            pageSize: 10,
            currPage: 1,
            userId: this.userInfo.id,
            "tpPrincepalName": "",
            "attachmentStatus": "",
            "dept": "",
            "tpId": "",
            "partDosageStatus": "",
            "partNameZh": "",
            "projectCarType": "",
            "status": "",
            "tpInfoType": "",
          }
          const tpInfo = await getTabelData(tPrams)
          const result = (tpInfo && tpInfo.code === '200' && tpInfo.data && tpInfo.data.tpRecordsSenarioResult) || {}
          if ( result.totalCount && result.tpRecordList && result.tpRecordList[0] && result.tpRecordList[0].tpPartInfoVO) {
            const tpInfoData = Object.assign(result.tpRecordList[0].tpPartInfoVO, {
              tpDisabled: true
            })
            console.log('新件信息单', tpInfoData)
            this.openPartSignPage(tpInfoData)
          } else {
            iMessage.error(this.language('WEIZHAODAOXINJIANXINXIDAN', '未找到新件信息单'))
          }
        } catch(e) {
          console.log(e)
          iMessage.error(this.language('WEIZHAODAOXINJIANXINXIDAN', '未找到新件信息单'))
        }
        
        // this.$router.push({name: 'partsign', query: {partNum: row.partNum1}})
      },
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
          //  特指asf aeko审批人的零件清单
           searchType: '0',
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

        // 专业采购员
        searchLinie().then((res)=>{
          const {code,data} = res;
          if(code ==200 ){
              data.map((item)=>{
                  item.desc = this.$i18n.locale === "zh" ? item.nameZh : item.nameEn;
                  item.code = item.id;
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