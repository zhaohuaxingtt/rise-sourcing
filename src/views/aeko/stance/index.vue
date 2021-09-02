<!--
 * @Author: wentliao
 * @Date: 2021-07-28 16:10:40
 * @Description: aeko表态
-->

<template>
  <iPage class="aeko-stance-list">
    <h2 class="floatleft">{{language('LK_AEKOCAOZUO','AEKO操作')}}</h2>
    <iNavMvp :list="navList" lang  :lev="2" routerPage right></iNavMvp>

    <div class="margin-top20">
    <!-- 搜索区域 -->
      <iSearch @sure="getList" @reset="reset">
          <el-form>
              <el-form-item 
              v-for="(item,index) in SearchList" 
              :key="'SearchList_aeko'+index" 
              :label="language(item.labelKey,item.label)"
              v-permission.dynamic.auto="item.permissionKey"
              >   
                <template v-if="item.type === 'select'" >
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
                      collapse-tags
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
                        :label="item.name"
                        :value="item.code">
                      </el-option>  
                  </iSelect>
                </template>
                   
                  <iDatePicker style="width:185px" :placeholder="language('partsprocure.CHOOSE','请选择')" v-else-if="item.type === 'datePicker'" type="daterange"  value-format="yyyy-MM-dd" v-model="searchParams[item.props]"></iDatePicker>
                  <iInput :placeholder="language('LK_QINGSHURU','请输入')" v-else v-model="searchParams[item.props]"></iInput> 
              </el-form-item>
          </el-form>
      </iSearch>
      <iCard class="contain margin-top20" :title="language('LK_AEKOBIAOTAI','AEKO表态')">
      <!-- 表单区域 -->
      <div v-permission.auto="AEKO_STANCELIST_TABLE|AEKO表态TABLE">
        <tableList
          class="table"
          index
          :lang="true"
          :tableData="tableListData"
          :tableTitle="tableTitle"
          :tableLoading="loading"
          :selection="false"
          @handleSelectionChange="handleSelectionChange"
        >
        <!-- AEKO号  -->
        <template #aekoCode="scope">
          <div class="table-item-aeko">
            <icon  v-if="scope.row.isTop==1" class="margin-right5 font24 top-icon" symbol name="iconAEKO_TOP"></icon>
            <span class="link" @click="goToDetail(scope.row)">{{scope.row.aekoCode}}</span>
            <a v-if="scope.row.fileCount && scope.row.fileCount> 0"  @click="checkFiles(scope.row)" class="file-icon"><icon class="margin-left5" symbol name="iconshenpi-fujian" ></icon></a>
          </div> 
        </template>

        <!-- 日志 -->
        <template #log="scope">
          <span class="link" @click="checkLog(scope.row)">{{language('LK_CHAKAN','查看')}}</span>
        </template>

        <!-- 描述 -->
        <template #describe="scope">
          <span class="link" @click="checkDescribe(scope.row)">{{language('LK_CHAKAN','查看')}}</span>
        </template>

        <!-- AEKO状态 -->
        <template #aekoStatus="scoped">
          <span>{{scoped.row.aekoStatus && scoped.row.aekoStatus.desc}}</span>
        </template>

        <!-- 封面状态 -->
        <template #coverStatus="scoped">
          <span>{{scoped.row.coverStatus && scoped.row.coverStatus.desc}}</span>
        </template>

        <!-- 审批单 -->
        <template #approval="scoped">
            <span class="link">{{language('LK_AEKO_CHAKAN','查看')}}</span>
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
      <filesListDialog v-if="filesVisible" :dialogVisible="filesVisible" @changeVisible="changeVisible" :itemFile="itemFileData" @getTableList="getList"/>
    </div>
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
  iCard,
  iPagination,
  icon,
  iMessage,
} from 'rise';
import { searchList,tableTitle } from './data';
import { pageMixins } from "@/utils/pageMixins";
import { TAB,filterRole } from '../data';
import tableList from "@/views/partsign/editordetail/components/tableList"
import filesListDialog from '../manage/components/filesListDialog'
import {
  getLiniePage,
} from '@/api/aeko/stance'
import {
  searchAekoStatus,
  searchCoverStatus,
  searchCartypeProject,
  getSearchCartype,
} from '@/api/aeko/manage'
import aekoSelect from '../components/aekoSelect'
export default {
    name:'aekoStanceList',
    mixins: [pageMixins],
    components:{
      iPage,
      iNavMvp,
      iSearch,
      iSelect,
      iDatePicker,
      iInput,
      iCard,
      tableList,
      iPagination,
      icon,
      filesListDialog,
      aekoSelect,
    },
    data(){
      return{
        navList:TAB,
        SearchList:searchList,
        selectItems:[],
        searchParams:{
          coverStatusList:['TOBE_STATED'],
          cartypeProjectCodeList:[''],
          cartypeCodeList:[''],
        },
        selectOptions:{
          cartypeProjectCodeList:[],
          aekoStatusList:[],
          coverStatusList:[],
          cartypeCodeList:[],
        },
        selectOptionsCopy:{
          cartypeProjectCodeList:[],
          aekoStatusList:[],
          coverStatusList:[],
          cartypeCodeList:[],
        },
        tableListData:[],
        tableTitle:tableTitle,
        loading:false,
        filesVisible:false,
        btnLoading:{
          uploadFiles:false,
        },
        itemFileData:{},
      }
    },
    computed: {
        //eslint-disable-next-line no-undef
        ...Vuex.mapState({
            userInfo: state => state.permission.userInfo,
            permission: state => state.permission
        }),
    },
    created(){
      this.getList();
      this.getSearchList();
      
      
      this.isAekoManager = !!this.permission.whiteBtnList["AEKO_DETAIL_TAB_LINGJIANQINGDAN_BUTTON_FENPAIKESHI"]
      this.isCommodityCoordinator = !!this.permission.whiteBtnList["AEKO_DETAIL_TAB_LINGJIANQINGDAN_BUTTON_KESHITUIHUI"]
      this.isLinie = !!this.permission.whiteBtnList["AEKO_AEKODETAIL_PARTLIST_TABLE"]

      const { isAekoManager,isCommodityCoordinator,isLinie,$route } = this;
      const role = {
        isAekoManager,
        isCommodityCoordinator,
        isLinie,
      };

      
      const filterList = filterRole(role);
      this.navList = filterList;

      // 判断当前url是否在可显示列表内 若无则显示列表第一个清单
      const {path} = $route;
      const filterPath = filterList.filter((item)=>item.url && item.url == path);
      if(!filterPath.length){
        this.$router.push({
          path:filterList[0].url,
        })
      }


    },
    methods:{
      // 重置
      reset(){
        this.searchParams = {
          coverStatusList:['TOBE_STATED'],
          cartypeProjectCodeList:[''],
          cartypeCodeList:[''],
        };
        this.getList();
      },

      handleSelectionChange(val) {
          this.selectItems = val;
      },
      
      // 获取列表数据
      async getList(){
        this.loading = true;
        const {searchParams,page} = this;
        const { partNum,cartypeProjectCodeList,cartypeCodeList } = searchParams;
        // 若有截至或者分派起止时间将其拆分成两个字段
        const {linieAssignTime=[],deadLine=[]} = searchParams;
        const data = {
            current:page.currPage,
            size:page.pageSize,
            cartypeCodeList:cartypeCodeList.length && cartypeCodeList[0]=='' ? [] : cartypeCodeList,
            cartypeProjectCodeList:cartypeProjectCodeList.length && cartypeProjectCodeList[0]=='' ? [] : cartypeProjectCodeList,
        };
        // 分派日期
        if(linieAssignTime.length){
            data['linieAssignTimeStart'] = linieAssignTime[0];
            data['linieAssignTimeEnd'] = linieAssignTime[1];
        }
        // 截至日期
        if(deadLine.length){
            data['deadLineStart'] = deadLine[0];
            data['deadLineEnd'] = deadLine[1];
        }

        // 判断零件号查询至少大于等于9位或为空的情况下才允许查询
        if(partNum && partNum.trim().length < 9){
          this.loading = false;
          return iMessage.warn(this.language('LK_AEKO_LINGJIANHAOZHISHAOSHURU9WEI','查询零件号不足,请补充至9位或以上'));
        }
        await getLiniePage({...searchParams,...data}).then((res)=>{
          this.loading = false;
          const {code,data={}} = res;
          if(code==200){
              const {records=[],total} = data;
              this.tableListData = records;
              this.page.totalCount = total;
          }else{
              iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn)
          }

        }).catch((err)=>{
          this.loading = false;
        })
      },

       // 获取搜索框下拉数据
      getSearchList(){
        // 车型项目
         searchCartypeProject().then((res)=>{
          const {code,data} = res;
          if(code ==200){
            data.map((item)=>{
              item.desc = item.name;
              item.lowerCaseLabel = typeof item.name === "string" ? item.name.toLowerCase() : item.name
            })
            this.selectOptions.cartypeProjectCodeList = data || [];
            this.selectOptionsCopy.cartypeProjectCodeList = data || [];
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
            this.selectOptions.cartypeCodeList = data.filter((item)=>item.name) || [];
            this.selectOptionsCopy.cartypeCodeList = data.filter((item)=>item.name) || [];
          }else{
            iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn);
          }
        })
        // aeko状态
        searchAekoStatus().then((res)=>{
          const {code,data=[]} = res;
          if(code ==200 && data){
            data.map((item)=>{
              item.name = item.desc;
            });
            this.selectOptions.aekoStatusList = data;
            this.selectOptionsCopy.aekoStatusList = data;
          }else{
            iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn);
          }
        })
        // 封面状态
        searchCoverStatus().then((res)=>{
          const {code,data=[]} = res;
          if(code ==200 && data){
            data.map((item)=>{
              item.name = item.desc;
            });
            this.selectOptions.coverStatusList = data;
            this.selectOptionsCopy.coverStatusList = data;
          }else{
            iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn);
          }
        })
      },

      // 跳转详情页
      goToDetail(row){
        const { requirementAekoId } = row;
        const routeData = this.$router.resolve({
          path: '/aeko/aekodetail',
          query: {
            from:'stance',
            requirementAekoId,
          },
        })
        window.open(routeData.href, '_blank')
      },

      // 查看日志
      checkLog(row){
         iMessage.warn('暂未开通此功能')
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

      changeVisible(type,visible){
          this[type] = visible;
      },
      
      // 查看附件列表
      async checkFiles(row){
        this.itemFileData = row;
        this.changeVisible('filesVisible',true);
      },

      // 模糊搜索处理
      dataFilter(val,props){
        // 去除前后空格
        const trimVal = val.trim();
        const { selectOptionsCopy={}} = this;
        if(trimVal){
          const list = selectOptionsCopy[props].filter((item) => {
            if(~item.desc.indexOf(trimVal) || !!~item.desc.toUpperCase().indexOf(trimVal.toUpperCase())){
                return true;
            } 
          })
            this.selectOptions[props] = list;
        }else{
          this.selectOptions[props] = selectOptionsCopy[props];
        }
      },

      // 多选处理
      handleMultipleChange(value, key,multiple) {
          // 单选不处理
          if(!multiple) {
            if(!value){
              const {selectOptionsCopy={}} = this;
              this.$set(this.selectOptions,key,selectOptionsCopy[key]);
            }else{
              return;
            }
          }
      },

    }
}
</script>

<style lang="scss" scoped>
  .aeko-stance-list{
    ::v-deep .el-date-editor .el-range__close-icon{
        display: block;
        width: 10px;
    }
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
      max-width: 60px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    ::v-deep .el-select .el-tag__close.el-icon-close{
      top: -4px;
    }
    
  }
</style>