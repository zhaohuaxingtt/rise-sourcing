<!--
 * @Author: wentliao
 * @Date: 2021-07-28 16:10:40
 * @Description: aeko表态
-->

<template>
  <iPage class="aeko-stance-list">
    <div class="header-nav">
      <iNavMvp :lev="1" :list="leftTab" :lang="true" routerPage left class="margin-bottom10" />
      <!-- <h2>{{language('LK_AEKOCAOZUO','AEKO操作')}}</h2> -->
      <div class="right-nav">
        <iNavMvp :list="navList" lang  :lev="2" routerPage right></iNavMvp>
        <switchPost />
        <!-- <log-button v-permission.auto="AEKO_APPROVAL_DETAILS_PAGE_BTN_LOG|日志" @click="openLog" class="margin-left25"/> -->
        <iLoger ref="log" @close="closeLog" v-permission.auto="AEKO_APPROVAL_DETAILS_PAGE_BTN_LOG|日志"  :config="{module_obj_ae: module, bizId_obj_ae: bizId, queryParams:[]}" :credentials="true" isPage :isUser="true" class="margin-left25" />
        <icon @click.native="gotoDBhistory" symbol name="icondatabaseweixuanzhong"
              class="log-icon margin-left20 cursor myLogIcon"></icon>
      </div>
    </div>

    <div class="margin-top10">
    <!-- 搜索区域 -->
      <iSearch @sure="sure" @reset="reset">
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
                <iMultiLineInput
                  v-else-if="item.type === 'iMultiLineInput'"
                  :placeholder="language('partsprocure.PARTSPROCURE','请输入零件号，多个逗号分隔')"
                  :title="language('partsprocure.PARTSPROCUREPARTNUMBER','零件号')"
                  v-model="searchParams[item.props]"
                ></iMultiLineInput>
                  <iDatePicker style="width:185px" :placeholder="language('partsprocure.CHOOSE','请选择')" v-else-if="item.type === 'datePicker'" type="daterange"  value-format="yyyy-MM-dd" v-model="searchParams[item.props]"></iDatePicker>
                  <iInput :placeholder="language('LK_QINGSHURU','请输入')" v-else v-model="searchParams[item.props]"></iInput> 
              </el-form-item>
          </el-form>
      </iSearch>
      <iCard class="contain margin-top7" :title="language('LK_AEKOBIAOTAI','AEKO表态')">
        <template v-slot:header-control>
          <buttonTableSetting @click="edittableHeader"></buttonTableSetting>
        </template>
      <!-- 表单区域 -->
      <div v-permission.auto="AEKO_STANCELIST_TABLE|AEKO表态TABLE">
        <tableList
          permissionKey="AEKO_STANCE"
          class="table"
          ref="tableList"
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
        <template #aekoStatus="scope">
          <span>{{scope.row.aekoStatus && scope.row.aekoStatus.desc}}</span>
        </template>

        <!-- 封面状态 -->
        <template #coverStatus="scope">
          <span>{{scope.row.coverStatus && scope.row.coverStatus.desc}}</span>
        </template>

        <!-- 审批单 -->
        <template #approval="scope">
            <span class="link" @click="goToApprovalform(scope.row)">{{language('LK_AEKO_CHAKAN','查看')}}</span>
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
    <!-- <iLog :show.sync="showDialog" :bizId="bizId" :module="module" /> -->
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
  iMultiLineInput,
  iButton
} from 'rise';
import { searchList,tableTitle } from './data';
import { pageMixins } from "@/utils/pageMixins";
import switchPost from '@/components/switchPost'
import { TAB,filterRole,getLeftTab } from '../data';
// import tableList from "@/views/partsign/editordetail/components/tableList"
import tableList from "@/components/iTableSort"
import { tableSortMixins } from "@/components/iTableSort/tableSortMixins"
import filesListDialog from '../manage/components/filesListDialog'
import logButton from "../../../components/logButton";
import iLog from '../log'
import iLoger from 'rise/web/components/iLoger'
import {
  getLiniePage,
} from '@/api/aeko/stance'
import {
  searchAekoStatus,
  searchCoverStatus,
  searchCartypeProject,
  getSearchCartype,
  getLogCount,
} from '@/api/aeko/manage'
import aekoSelect from '../components/aekoSelect'
import { roleMixins } from "@/utils/roleMixins";
import { setLogMenu } from "@/utils";
import buttonTableSetting from '@/components/buttonTableSetting'
export default {
    name:'aekoStanceList',
    mixins: [pageMixins,roleMixins,tableSortMixins],
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
      iLog,
      logButton,
      switchPost,
      iMultiLineInput,
      iButton,
      iLoger,
      buttonTableSetting
    },
    data(){
      return{
        navList:TAB,
        leftTab:[],
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
        showDialog: false,
        bizId: '',
        module: 'AEKO表态',
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
      this.sure();
      this.getSearchList();
      const roleList = this.roleList;
      this.isAekoManager = roleList.includes('AEKOGLY'); // AKEO管理员
      this.isCommodityCoordinator = roleList.includes('AEKOXTY'); // Aeko科室协调员
      this.isLinie = roleList.includes('LINIE') || roleList.includes('ZYCGY'); // 专业采购员

      // const { isAekoManager,isCommodityCoordinator,isLinie,$route } = this;
      // const role = {
      //   isAekoManager,
      //   isCommodityCoordinator,
      //   isLinie,
      // };

      
      // const filterList = filterRole(role);
      // this.navList = filterList;

      // 判断当前url是否在可显示列表内 若无则显示列表第一个清单
      // const {path} = $route;
      // const filterPath = filterList.filter((item)=>item.url && item.url == path);
      // if(!filterPath.length){
      //   this.$router.push({
      //     path:filterList[0].url,
      //   })
      // }

      this.leftTab = getLeftTab(1);


    },
    methods:{
      // 查询待办数量
      getLogCount(){
        let params = {
          pageCode:'LINIE',  // LINIE: AEKO表态; ADMIN: AEKO管理; SPR: AEKO审批
          id: this.userInfo.id
        }
        getLogCount(params).then(res=>{
          if(res?.code==200){
            this.navList.forEach(item=>{
              if(item.name=='AEKO表态'){
                item.message = res.data
              }
            })
          }else{
            iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn)
          }
        })
      },
      // 重置
      reset(){
        this.searchParams = {
          coverStatusList:['TOBE_STATED'],
          cartypeProjectCodeList:[''],
          cartypeCodeList:[''],
        };
        this.page.currPage = 1;
        this.getList();
      },

      sure(){
        this.getLogCount();
        this.page.currPage = 1;
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

        // 判断零件号查询至少大于等于3位或为空的情况下才允许查询
        if(partNum && partNum.trim().length < 3){
          this.loading = false;
          return iMessage.warn(this.language('LK_AEKO_LINGJIANHAOZHISHAOSHURU3WEI','查询零件号不足,请补充至3位或以上'));
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

      // 顶部日志查询
      openLog(){
        setLogMenu('')
        this.bizId = ''
        this.showDialog = true
      },
      gotoDBhistory() {},
      // 行内查看日志
      checkLog(row){
        setLogMenu('')
        this.bizId = row.requirementAekoId
        this.showDialog = true
        this.$refs.log.open()
      },

      // 清空bizId,便于触发顶部日志按钮
      closeLog(){
        setLogMenu('')
        this.bizId = ''
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
      // 跳转到审批单预览
    goToApprovalform(row){
      let transmitObj = {
          option: 4,
          aekoApprovalDetails: {
            linieId: this.userInfo.id,
            aekoNum: row.aekoCode,
            requirementAekoId: row.requirementAekoId,
            aekoManageId: row.aekoManageId,
            workFlowDTOS:[]
          }
      }
      let routeData = this.$router.resolve({
        path: `/aeko/AEKOApprovalDetails`,
        query: {
          from:'aekodetail',
          requirementAekoId: row.requirementAekoId,
          aekoManageId: row.aekoManageId,
          transmitObj: window.btoa(unescape(encodeURIComponent(JSON.stringify(transmitObj))))
        }
      })
      window.open(routeData.href, '_blank')
    },

    }
}
</script>

<style lang="scss" scoped>
  .aeko-stance-list{
    .header-nav {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .right-nav{
        display: inline-flex;
        align-items: center;
        
        ::v-deep .myLogIcon {
          width: 21px;
          height: 21px;
        }
      }
    }
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