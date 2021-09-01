<!--
 * @Author: wentliao
 * @Date: 2021-07-26 16:49:36
 * @Description: aeko操作页--AEKO管理
-->

<template>
  <iPage class="aeko-manage-list">
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
              v-permission.dynamic="item.permissionKey"
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
                <iDatePicker style="width:185px" :placeholder="language('partsprocure.CHOOSE','请选择')" v-else-if="item.type === 'datePicker'" type="daterange"  value-format="yyyy-MM-dd" v-model="searchParams[item.props]"></iDatePicker>
                <iInput :placeholder="language('LK_QINGSHURU','请输入')" v-else v-model.trim="searchParams[item.props]"></iInput> 
              </el-form-item>
          </el-form>
      </iSearch>
      <iCard class="contain margin-top20" :title="language('LK_AEKOGUANLI','AEKO管理')">
      <!-- 按钮区域 -->
      <template v-slot:header-control>
          <iButton v-permission.auto="AEKO_MANAGELIST_BUTTON_YUQIBIBAOBIAO|逾期BI报表">{{language('LK_YUQIBIBAOBIAO','逾期BI报表')}} </iButton>
          <iButton v-permission.auto="AEKO_MANAGELIST_BUTTON_HUIYITONGGUO|会议通过">{{language('LK_AEKOHUIYITONGGUO','会议通过')}} </iButton>
          <iButton v-permission.auto="AEKO_MANAGELIST_BUTTON_XIAZAIMUBAN|下载模板" @click="downloadTemplate">{{language('LK_XIAZAIMOBAN','下载模板')}} </iButton>
          <span v-permission.auto="AEKO_MANAGELIST_BUTTON_DAORUAEKO|导入AEKO" class=" margin-left10 margin-right10">
            <Upload 
                hideTip
                :buttonText="language('LK_DAORUAEKO','导⼊AEKO')"
                :request="importAeko"
                :onHttpUploaded="onHttpUploaded"
                :accept="'.xlsx,.xls'"
            />
          </span>
          <iButton v-permission.auto="AEKO_MANAGELIST_BUTTON_SHANCHUAEKO|删除AEKO" :loading="btnLoading.deleteItem" @click="deleteItem">{{language('LK_SHANCHUAEKO','删除AEKO')}} </iButton>
          <iButton v-permission.auto="AEKO_MANAGELIST_BUTTON_CHEXIAOAEKO|撤销AEKO" @click="revoke">{{language('LK_CHEXIAOAEKO','撤销AEKO')}} </iButton>
          
          <span v-permission.auto="AEKO_MANAGELIST_BUTTON_DAORUFUJIAN|上传文件" class=" margin-left10 margin-right10">
            <Upload 
                hideTip
                style="display:none;"
                ref="aekoUpload"
                :uploadRef="'aekoUpload'"
                :buttonText="language('LK_SHANGCHUANWENJIAN','上传文件')"
                @on-success="fileSuccess"
                :uploadButtonLoading="btnLoading.uploadFiles"
            />
            <iButton class="margin-left10" :loading="btnLoading.uploadFiles" @click="importFiles">{{language('LK_DAORUFUJIAN','导⼊附件')}} </iButton>
          </span>
          <iButton v-permission.auto="AEKO_MANAGELIST_BUTTON_DAOCHU|导出" @click="exportAeko">{{language('LK_AEKODAOCHU','导出')}} </iButton>

          <!-- 暂时添加的按钮 -->
          <template v-if="isAekoManager">
            <iButton :loading="btnLoading.tcm" @click="getTCM">TCM AEKO同步</iButton>
            <iButton :loading="btnLoading.tcmFiles" @click="getTCMFiles">TCM AEKO附件同步</iButton>
          </template>
      </template>
      <!-- 表单区域 -->
      <div v-permission="AEKO_MANAGELIST_TABLE">
        <tableList
          class="table"
          index
          :lang="true"
          :tableData="tableListData"
          :tableTitle="tableTitle"
          :tableLoading="loading"
          :selection="isAekoManager"
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

        <!-- 日志 -->
        <template #log="scope">
          <span class="link" @click="checkLog(scope.row)">{{language('LK_CHAKAN','查看')}}</span>
        </template>

        <!-- 描述 -->
        <template #describe="scope">
          <span class="link" @click="checkDescribe(scope.row)">{{language('LK_CHAKAN','查看')}}</span>
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

      <!-- 核销原因弹窗 -->
      <revokeDialog v-if="revokeVisible" :dialogVisible="revokeVisible" @changeVisible="changeVisible" @getList="getList" :selectItems="selectItems" />
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
  iButton,
  iPagination,
  icon,
  iMessage,
} from 'rise';
import { searchList,tableTitle } from './data';
import { pageMixins } from "@/utils/pageMixins";
import { TAB,filterRole } from '../data';
import tableList from "@/views/partsign/editordetail/components/tableList"
import revokeDialog from './components/revokeDialog'
import filesListDialog from './components/filesListDialog'
import Upload from '@/components/Upload'
import {user as configUser } from '@/config'
import aekoSelect from '../components/aekoSelect'
import {
  getManageList,
  searchAekoStatus,
  searchBrand,
  searchCoverStatus,
  uploadFiles,
  deleteAeko,
  searchCartypeProject,
  importAeko,
  templateDowmload,
  downloadAeko,
  searchCommodity,
  searchLinie,
  synAekoFromTCM,
  synAekoAttachmentFromTCM,
} from '@/api/aeko/manage'
import { debounce } from "lodash";
export default {
    name:'aekoManageList',
    mixins: [pageMixins],
    components:{
      iPage,
      iNavMvp,
      iSearch,
      iSelect,
      iDatePicker,
      iInput,
      iCard,
      iButton,
      tableList,
      iPagination,
      icon,
      revokeDialog,
      filesListDialog,
      Upload,
      aekoSelect
    },
    data(){
      return{
        navList:TAB,
        SearchList:searchList,
        selectItems:[],
        searchParams:{
          brand:'',
          buyerName:'',
          aekoStatusList:[''],
          coverStatusList:[''],
          carTypeCodeList:[''],
          linieDeptNumList:[''],
        },
        selectOptions:{
          'brand':[],
          'aekoStatusList':[],
          'coverStatusList':[],
          'linieDeptNumList':[],
          'carTypeCodeList':[],
          'buyerName':[],
        },
        selectOptionsCopy:{
          'brand':[],
          'aekoStatusList':[],
          'coverStatusList':[],
          'linieDeptNumList':[],
          'carTypeCodeList':[],
          'buyerName':[],
        },
        tableListData:[],
        tableTitle:tableTitle,
        loading:false,
        revokeVisible:false,
        filesVisible:false,
        uploadUrl: process.env.VUE_APP_SOURCING_MH,
        btnLoading:{
          uploadFiles:false,
          importAeko:false,
          deleteItem:false,
          tcmFiles:false,
          tcm:false,
        },
        importAeko:importAeko,
        itemFileData:{},
        debouncer: null
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
      const filterPath = filterList.filter((item)=>item.url == path);
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
          brand:'',
          buyerName:'',
          aekoStatusList:[''],
          coverStatusList:[''],
          carTypeCodeList:[''],
          linieDeptNumList:[''],
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
        const {partNum,carTypeCodeList,linieDeptNumList,aekoStatusList,coverStatusList} = searchParams;
        // 若有冻结起止时间将其拆分成两个字段
        const {frozenDate=[]} = searchParams;
        const data = {
            current:page.currPage,
            size:page.pageSize,
            carTypeCodeList:carTypeCodeList.length && carTypeCodeList[0]=='' ? [] : carTypeCodeList,
            linieDeptNumList:linieDeptNumList.length && linieDeptNumList[0]=='' ? [] : linieDeptNumList,
            aekoStatusList:aekoStatusList.length && aekoStatusList[0]=='' ? [] : aekoStatusList,
            coverStatusList:coverStatusList.length && coverStatusList[0]=='' ? [] : coverStatusList,
        };
        if(frozenDate.length){
            data['frozenDateStart'] = frozenDate[0]+' 00:00:00';
            data['frozenDateEnd'] = frozenDate[1]+' 00:00:00';
        }

        // 判断零件号查询至少大于等于9位或为空的情况下才允许查询
        if(partNum && partNum.trim().length < 9){
          this.loading = false;
          return iMessage.warn(this.language('LK_AEKO_LINGJIANHAOZHISHAOSHURU9WEI','查询零件号不足,请补充至9位或以上'));
        }
        await getManageList({...searchParams,...data}).then((res)=>{
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
              item.desc = this.$i18n.locale === "zh" ? item.name : item.nameEn;
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

      // 跳转详情页
      goToDetail(row){
        const { requirementAekoId } = row;
        const routeData = this.$router.resolve({
          path: '/aeko/aekodetail',
          query: {
            from:'manage',
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

      // 判断是否勾选项
      async isSelectItem(type=false,tips=null){
          const {selectItems} = this;
          tips = tips || this.language('createparts.QingXuanZeZhiShaoYiTiaoShuJu','请选择至少一条数据');
          if(!selectItems.length){
              iMessage.warn(tips);
              return false;
          }else{
              if(type){
                  return true;
              }else{
                const confirmInfo = await this.$confirm(this.language('submitSure','您确定要执行提交操作吗？'));
                return confirmInfo == 'confirm';
              }
          }
      },

      // 判断下勾选项是否包含撤销的数据
      isCancledItem(){
         const {selectItems=[]} = this; 
         // 当前aeko已撤销，不能进行操作
         const tips = this.language('LK_AEKO_GOUXUANXIANGBAOHANYICHEXIAOAEKOWUFACAOZUO','勾选项包含已撤销AEKO,不能进行操作');
         const filterItem = selectItems.filter((item)=>item.aekoStatus == 'CANCELED');
         if(filterItem.length){
           iMessage.warn(tips);
            return false;
         }else{
           return true;
         }
      },
      
      // 撤销
     async revoke(){
        const isNext  = await this.isSelectItem(true);
        if(!isNext) return;
        if(!this.isCancledItem()) return;
        // 一次只能撤销一个AEKO
        const {selectItems} = this;
        if(selectItems.length > 1) return iMessage.warn(this.language('LK_AEKO_YICIZHINENGCHEXIAOYIGEAEKO','一次只能撤销一个AEKO，请修改！'));
        // 选中的aeko非处于”已导入”或”已分配”状态  不能进行撤销操作
        const {aekoStatus=''} = selectItems[0];
        if(aekoStatus != 'IMPORTED' && aekoStatus !='ASSIGNED'){
          return iMessage.warn(this.language('LK_AEKO_DANGQIANAEKOBUNENGJINXINGCAOZUO','当前aeko不能进行撤销操作'));
        }
        this.changeVisible('revokeVisible',true);
      },
      

      // 查看附件列表
      async checkFiles(row){
        this.itemFileData = row;
        this.changeVisible('filesVisible',true);
      },

      // 导入AEKO附件
      async importFiles(){
        const isNext  = await this.isSelectItem(true);
        if(!isNext) return;
        if(!this.isCancledItem()) return;
        // 多选多个AEKO后弹出提示
        const {selectItems} = this;
        if(selectItems.length > 1){
          await this.$confirm(
          this.language('LK_TIPS_IMPORFILES_AEKO','你选择的附件将被引⽤到多个AEKO中，请确认是否继续上传？'),
          this.language('LK_DAORUFUJIAN','导⼊附件'),
          {
            confirmButtonText: this.language('nominationLanguage.Yes','是'),
            cancelButtonText: this.language('nominationLanguage.No','否'),
          }
          ).then(()=>{
            this.$refs['aekoUpload'].$refs['uploadRef'].$refs['upload-inner'].handleClick()
            console.log('是')
          }).catch(()=>{
            console.log('否')
          })
        }else{
          this.$refs['aekoUpload'].$refs['uploadRef'].$refs['upload-inner'].handleClick()
        }
        
      },
      // 导入附件
      async fileSuccess(data){
        this.btnLoading.uploadFiles = true;
        const fileData = data.data;
        const { name ,path,size,id} = fileData;
        const { selectItems } =this;
        const fileItem = {
          fileCode:'requirement',
          fileName:name,
          filePath:path,
          fileSize:size,
          fileType:1000,
          source:0,
          uploadId:id,
        }
        const params=[];
        selectItems.forEach((item)=>{
          item.requirementAekoId && params.push({
            ...fileItem,
            hostId:item.requirementAekoId
          })
        })
        await uploadFiles(params).then((res)=>{
          this.btnLoading.uploadFiles = false;
          if(res.code ==200){
            iMessage.success(this.language('LK_CAOZUOCHENGGONG','操作成功'));
            this.getList();
          }else{
            iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn);
          }
        }).catch((err)=>{
          this.btnLoading.uploadFiles = false;
        })
      },
      
      // 删除aeko
      async deleteItem(){
        const isNext  = await this.isSelectItem(true);
        const {selectItems} = this;
        if(!isNext) return;
        if(!this.isCancledItem()) return;
        await this.$confirm(
          this.language('LK_QINGQUERENSHIFOUSHANCHUAEKO','请确认是否删除该AEKO？'),
          this.language('LK_SHANCHUAEKO','删除AEKO'),
          {
            confirmButtonText: this.language('nominationLanguage.Yes','是'),
            cancelButtonText: this.language('nominationLanguage.No','否'),
          }
          ).then(()=>{
            this.btnLoading.deleteItem = true;
            const requirementAekoIds = (selectItems.map((item)=>item.requirementAekoId)).join();
            deleteAeko({requirementAekoIds}).then((res)=>{
              this.btnLoading.deleteItem = false;
              if(res.code ==200){
                iMessage.success(this.language('LK_CAOZUOCHENGGONG','操作成功'));
                this.getList();
              }else{
                iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn);
              }
            })
          }).catch(()=>{
            this.btnLoading.deleteItem = false;
          })
      },
      
      // 导入AEKO
       async onHttpUploaded(formData,content){
        const newFormData = new FormData()
        newFormData.append('file', content.file)
        await importAeko(newFormData).then((res)=>{
          const {code} = res;
          if(code!=200){
            iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn)
          }else{
            iMessage.success(this.language('LK_CAOZUOCHENGGONG','操作成功'));
            this.getList();
          }
        }).catch((e)=>{
          iMessage.error(this.$i18n.locale === "zh" ? e.desZh : e.desEn)
        });
      },

      // 下载模板
      async downloadTemplate(){
        await templateDowmload({fileName:'VZF666.xls'});
      },
      
      // 导出
      async exportAeko(){
        const tips = this.language('LK_AEKO_QINGXUANZEYAODAOCHUDEHANGXIANGMU','请选择要导出的行项目');
        const isNext  = await this.isSelectItem(true,tips);
        const {selectItems} = this;
        if(!isNext) return;
        const aekoIdList = selectItems.map((item)=>item.requirementAekoId);
          downloadAeko(aekoIdList).then((res)=>{

        })
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

      // 多选处理
      handleMultipleChange(value, key,multiple) {
            console.log(value, key,multiple,'value, key,multiple');
          // 单选不处理
          if(!multiple) {
            if(!value){
              const {selectOptionsCopy={}} = this;
              this.$set(this.selectOptions,key,selectOptionsCopy[key]);
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


      // TCM AEKO同步 
      async getTCM(){
        this.btnLoading.tcm = true;
        await synAekoFromTCM().then((res)=>{
          this.btnLoading.tcm = false;
          if(res.code == 200) {
            iMessage.success(this.language('LK_CAOZUOCHENGGONG','操作成功'));
          }
        }).catch((err)=>{
          this.btnLoading.tcm = false;
        })
      },

       // TCM AEKO附件同步
       async getTCMFiles(){
        this.btnLoading.tcmFiles = true;
        await synAekoAttachmentFromTCM().then((res)=>{
          this.btnLoading.tcmFiles = false;
          if(res.code == 200) {
            iMessage.success(this.language('LK_CAOZUOCHENGGONG','操作成功'));
          }
        }).catch((err)=>{
          this.btnLoading.tcmFiles = false;
        })
       },
    }
}
</script>

<style lang="scss" scoped>
  .aeko-manage-list{
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
