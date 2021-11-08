<!--
 * @Author: wentliao
 * @Date: 2021-10-26 13:53:39
 * @Description: AEKO查看
-->
<template>
    <iPage class="aeko-check-list">
        <div class="flex-between-center-center">
          <iNavMvp :lev="1" :list="leftTab" :lang="true" routerPage left class="margin-bottom10" />
          <div>
            <iNavMvp :list="navList" lang  :lev="2" routerPage right class="margin-bottom10"/>
          </div>
          
        </div>
        
        
        <!-- 搜索区域 -->
        <iSearch @sure="sure" @reset="reset">
          <el-form>
              <el-form-item 
              v-for="(item,index) in SearchList" 
              :key="'SearchList_aeko'+index" 
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
                    reserve-keyword
                    :multiple="item.multiple" 
                    :filterable="item.filterable" 
                    :clearable="item.clearable" 
                    v-model="searchParams[item.props]" 
                    :placeholder="item.filterable ? language('LK_QINGSHURU','请输入') : language('partsprocure.CHOOSE','请选择')"
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
                <iDatePicker style="width:185px" :placeholder="language('partsprocure.CHOOSE','请选择')" v-else-if="item.type === 'datePicker'" type="daterange"  value-format="yyyy-MM-dd" v-model="searchParams[item.props]"></iDatePicker>
                <iInput :placeholder="language('LK_QINGSHURU','请输入')" v-else v-model.trim="searchParams[item.props]"></iInput> 
              </el-form-item>
          </el-form>
        </iSearch>
        <iCard class="margin-top20">
            <!-- 表单区域 -->
            <div v-permission.auto="AEKO_CHECKLIST_TABLE|AEKO查看TABLE" >
                <tableList
                class="table"
                index
                :selection="false"
                :lang="true"
                :tableData="tableListData"
                :tableTitle="tableTitle"
                :tableLoading="loading"
                @handleSelectionChange="handleSelectionChange"
                >
                  <!-- AEKO号 -->
                  <template #aekoCode="scope">
                    <div class="table-item-aeko">
                        <icon v-if="scope.row.isTop==1" class="margin-right5 font24 top-icon" symbol name="iconAEKO_TOP"></icon>
                        <span class="link" ><a @click="goToDetail(scope.row)">{{scope.row.aekoCode}} </a></span>
                        <a v-if="scope.row.fileCount && scope.row.fileCount > 0" class="file-icon" @click="checkFiles(scope.row)"><icon class="margin-left5" symbol name="iconshenpi-fujian" ></icon></a>
                    </div>
                  </template>
                  <!-- 描述 -->
                  <template #describe="scope">
                    <span class="link" @click="checkDescribe(scope.row)">{{language('LK_CHAKAN','查看')}}</span>
                  </template>
                  <!-- 审批单 -->
                  <template #assignsheet="scope">
                    <span class="link" @click="checkAssignsheet(scope.row)">{{language('LK_CHAKAN','查看')}}</span>
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

        <!-- 附件列表查看 -->
      <filesListDialog v-if="filesVisible" :dialogVisible="filesVisible" @changeVisible="changeVisible" :itemFile="itemFileData" @getTableList="getList" :fromPage="'check'"/>
    </iPage>
</template>

<script>
import {
    iPage,
    iNavMvp,
    iSearch,
    iSelect,
    iDatePicker,
    iInput,
    iPagination,
    iCard,
    iMessage,
    icon,
} from 'rise';
import { SearchList,tableTitle } from './data';
import { TAB,getLeftTab } from '../data';
import aekoSelect from '../components/aekoSelect'
import tableList from "@/views/partsign/editordetail/components/tableList"
import { pageMixins } from "@/utils/pageMixins";
import filesListDialog from '../manage/components/filesListDialog'
import {
  searchAekoStatus,
  searchBrand,
  searchCoverStatus,
  searchCartypeProject,
  searchCommodity,
  searchLinie,
  getSearchCartype,
} from '@/api/aeko/manage'
import {
  getCheckList,
} from '@/api/aeko/check';
import {user as configUser } from '@/config'
import { debounce } from "lodash";
import { lookDetails } from '../approve/approveList/lib'
import logButton from "@/components/logButton"

export default {
    name:'aekoCheck',
    mixins: [pageMixins],
    components:{
        iPage,
        iNavMvp,
        iSearch,
        aekoSelect,
        iSelect,
        iDatePicker,
        iInput,
        tableList,
        iPagination,
        iCard,
        icon,
        filesListDialog,
    },
    computed: {
        //eslint-disable-next-line no-undef
        ...Vuex.mapState({
            userInfo: state => state.permission.userInfo,
            permission: state => state.permission
        }),
    },
    created(){
        this.getSearchList();
        this.getList();
        this.leftTab = getLeftTab(2);
        // 表头是否展示内容表态 AEKO_CHECKLIST_TABLE_TITLE_NEIRONGZHUANGTAI
        const isShow = !!this.permission.whiteBtnList["AEKO_CHECKLIST_TABLE_TITLE_NEIRONGZHUANGTAI"];
        this.tableTitle = !isShow ? tableTitle.filter((item)=>item.props!=='contentStatusDesc') : tableTitle;
    },
    data(){
      return{
        navList:TAB,
        leftTab:[],
        SearchList:SearchList || [],
        searchParams:{
          brand:'',
          buyerName:'',
          linieDeptNumList:[''],
          carTypeCodeList:[''],
          cartypeCode:[''],
          coverStatusList:[''],
          aekoStatusList:[''],
        },
        selectOptions:{
            linieDeptNumList:[],
            cartypeCode:[],
            carTypeCodeList:[],
            buyerName:[],
            aekoStatusList:[],
            coverStatusList:[],
            brand:[]
        },
        selectOptionsCopy:{
            linieDeptNumList:[],
            cartypeCode:[],
            carTypeCodeList:[],
            buyerName:[],
            aekoStatusList:[],
            coverStatusList:[],
            brand:[]
        },
        tableListData:[],
        tableTitle:tableTitle,
        loading:false,
        selectItems:[],
        filesVisible:false,
        itemFileData:{},
        debouncer: null,
      }
    },
    methods:{
        sure(){
          this.page.currPage = 1;
          this.getList();
        },
        reset(){
          this.searchParams = {
            brand:'',
            buyerName:'',
            linieDeptNumList:[''],
            carTypeCodeList:[''],
            cartypeCode:[''],
            coverStatusList:[''],
            aekoStatusList:[''],
          };
          this.sure();
        },
        async getList(){
          const { page,searchParams } = this;
          const {aekoCode,partNum,linieDeptNumList,cartypeCode,carTypeCodeList,buyerName,aekoStatusList,coverStatusList,frozenDate=[],brand} = searchParams;
          // 车型和车型项目合并到一个参数里面传给后端查询
          let cartypeArr = [
            ...(cartypeCode.length && cartypeCode[0]=='' ? [] : cartypeCode),
            ...(carTypeCodeList.length && carTypeCodeList[0]=='' ? [] : carTypeCodeList),
          ];
          
          const data = {
              current:page.currPage,
              size:page.pageSize,
              aekoCode,
              partNum,
              buyerName,
              brand,
              linieDeptNumList:linieDeptNumList.length && linieDeptNumList[0]=='' ? undefined : linieDeptNumList,
              aekoStatusList:aekoStatusList.length && aekoStatusList[0]=='' ? undefined : aekoStatusList,
              coverStatusList:coverStatusList.length && coverStatusList[0]=='' ? undefined : coverStatusList,
              carTypeCodeList:cartypeArr,
              frozenDate,
          };
          // 若有冻结起止时间将其拆分成两个字段
          if(frozenDate && frozenDate.length){
              data['frozenDateStart'] = frozenDate[0]+' 00:00:00';
              data['frozenDateEnd'] = frozenDate[1]+' 00:00:00';
          }
          this.loading = true;
          getCheckList(data).then((res)=>{
            this.loading = false;
            const{code,data} =res;
            if(code == 200){
              const {records=[],total} = data;
              this.tableListData = records;
              this.page.totalCount = total;
            }else{
              iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn);
            }

          }).catch(()=>this.loading = false)
        },
        // 获取搜索框下拉数据
        getSearchList(){
          // aeko状态
          searchAekoStatus().then((res)=>{
            const {code,data=[]} = res;
            if(code ==200 && data){
              this.selectOptions.aekoStatusList = data;
              this.selectOptionsCopy.aekoStatusList = data;
            }else{
              iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn);
            }
          })
          //品牌
          searchBrand().then((res)=>{
            const {code,data=[]} = res;
            if(code ==200 && data){
              data.map((item)=>{
                item.desc = item.code;
              })
              this.selectOptions.brand = data;
              this.selectOptionsCopy.brand = data;
            }else{
              iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn);
            }
          })
          // 封面状态
          searchCoverStatus().then((res)=>{
            const {code,data=[]} = res;
            if(code ==200 && data){
              this.selectOptions.coverStatusList = data;
              this.selectOptionsCopy.coverStatusList = data;
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
              this.selectOptions.cartypeCode = data.filter((item)=>item.name) || [];
              this.selectOptionsCopy.cartypeCode = data.filter((item)=>item.name) || [];
            }else{
              iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn);
            }
          })

          // 车型项目
          searchCartypeProject().then((res)=>{
            const {code,data} = res;
            if(code ==200 ){
              data.map((item)=>{
                item.desc = item.name;
                item.lowerCaseLabel = typeof item.name === "string" ? item.name.toLowerCase() : item.name
              })
              this.selectOptions.carTypeCodeList = data;
              this.selectOptionsCopy.carTypeCodeList = data;
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
                item.code = item.id;
              })
              this.selectOptions.linieDeptNumList = data;
              this.selectOptionsCopy.linieDeptNumList = data;
            }else{
              iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn);
            }
          })

          // LINIE
          searchLinie({tagId:configUser.LINLIE}).then((res)=>{
            const {code,data} = res;
            if(code ==200 ){
              data.map((item)=>{
                item.desc = this.$i18n.locale === "zh" ? item.nameZh : item.nameEn;
                item.code = this.$i18n.locale === "zh" ? item.nameZh : item.nameEn;
                item.lowerCaseLabel =  typeof item.nameEn === "string" ? item.nameEn.toLowerCase() : item.nameEn
              })
              this.selectOptions.buyerName = data;
              this.selectOptionsCopy.buyerName = data;
            }else{
              iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn);
            }
          })

        },
        handleSelectionChange(val){
            this.selectItems = val;
        },
        // 多选处理
        handleMultipleChange(value, key,multiple) {
            // 单选不处理
            if(!multiple) {
                if(!value){
                const {selectOptionsCopy={}} = this;
                this.$set(this.selectOptions,key,selectOptionsCopy[key]);
                return;
                }else{
                this.$set(this.searchParams,key,value);
                return;
                }
            }

            if (!value[value.length - 1]) {
                this.$set(this.searchParams, key, [""])
            } else {
                this.$set(this.searchParams, key, this.searchParams[key].filter(item => item || item === 0))
            }
        },
        // 模糊搜索处理
      dataFilter(val,props){
        if (this.debouncer && typeof this.debouncer.cancel === "function") this.debouncer.cancel();

        if(props == 'buyerName'){
          this.searchParams.buyerName = val;
        }
        
        // 去除前后空格
        const trimVal = val.trim();
        const { selectOptionsCopy={}} = this;
          this.debouncer = debounce(() => {
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
            
          },400);
        this.debouncer()
      },
      // 查看描述
      checkDescribe(row){
        const { requirementAekoId,aekoCode } = row;
        const routeData = this.$router.resolve({
          path: '/aeko/describe',
          query: {
            requirementAekoId,
            aekoCode,
          },
        })
        window.open(routeData.href, '_blank')
      },
      // 跳转详情页
      goToDetail(row){
        const { requirementAekoId } = row;
        const routeData = this.$router.resolve({
          path: '/aeko/aekodetail',
          query: {
            from:'check',
            requirementAekoId,
          },
        })
        window.open(routeData.href, '_blank')
      },
      // 跳转到审批单
      checkAssignsheet(row){
        lookDetails(this, row, true,null,true)
      },

      // 查看附件列表
      async checkFiles(row){
        this.itemFileData = row;
        this.changeVisible('filesVisible',true);
      },
      changeVisible(type,visible){
          this[type] = visible;
      },
    }
}
</script>

<style lang="scss" scoped>
    .aeko-check-list{
        .table-item-aeko{
            position: relative;
            .link{
                display: block;
                padding-left: 30px;
                padding-right: 8px;
                margin-right: 8px;
                box-sizing: border-box;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                cursor: auto;
                a{
                cursor: pointer;
                }
            }
            .top-icon{
                position: absolute;
                left: 0;
                top:1px;
            }
            .file-icon{
                position: absolute;
                right:0;
                top: 0;
            }
        }
    ::v-deep .el-select__tags-text{
      display: inline-block;
      max-width: 70px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    ::v-deep .el-select .el-tag__close.el-icon-close{
      top: -4px;
    }
    }
</style>