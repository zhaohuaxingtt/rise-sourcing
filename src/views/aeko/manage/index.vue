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
              <el-form-item v-for="(item,index) in SearchList" :key="'SearchList_aeko'+index" :label="language(item.labelKey,item.label)">
                  <iSelect collapse-tags  v-update v-if="item.type === 'select'" :multiple="item.multiple" v-model="searchParams[item.props]" :placeholder="language('partsprocure.CHOOSE','请选择')">
                    <el-option v-if="!item.multiple" value="" :label="language('all','全部')"></el-option>
                    <el-option
                      v-for="item in selectOptions[item.selectOption] || []"
                      :key="item.code"
                      :label="item.desc"
                      :value="item.code">
                    </el-option>  
                  </iSelect> 
                  <iDatePicker style="width:185px" :placeholder="language('partsprocure.CHOOSE','请选择')" v-else-if="item.type === 'datePicker'" type="daterange"  value-format="yyyy-MM-dd" v-model="searchParams[item.props]"></iDatePicker>
                  <iInput :placeholder="language('LK_QINGSHURU','请输入')" v-else v-model="searchParams[item.props]"></iInput> 
              </el-form-item>
          </el-form>
      </iSearch>
      <iCard class="contain margin-top20" :title="language('LK_AEKOGUANLI','AEKO管理')">
      <!-- 按钮区域 -->
      <template v-slot:header-control>
          <iButton>{{language('LK_YUQIBIBAOBIAO','逾期BI报表')}} </iButton>
          <iButton>{{language('LK_AEKOHUIYITONGGUO','会议通过')}} </iButton>
          <iButton>{{language('LK_XIAZAIMOBAN','下载模板')}} </iButton>
          <iButton >{{language('LK_DAORUAEKO','导⼊AEKO')}} </iButton>
          <iButton>{{language('LK_SHANCHUAEKO','删除AEKO')}} </iButton>
          <iButton @click="revoke">{{language('LK_CHEXIAOAEKO','撤销AEKO')}} </iButton>
          
          <span class=" margin-left10 margin-right10">
             <Upload 
                  hideTip
                  style="display:none;"
                  ref="aekoUpload"
                  :uploadRef="'aekoUpload'"
                  :buttonText="language('LK_SHANGCHUANWENJIAN','上传文件')"
                  @on-success="fileSuccess"
              />
            <!-- <el-upload
              :action="uploadUrl + '/rs/uploadNomiRsDoc'"
              accept='.doc,.docx,.xls,.xlsx,.ppt,.pptx,.jpg,.jpeg,.png,.pdf,.tif,.pptx,.zip'
              style="display:none;"
              ref="aekoUpload"
              :show-file-list='false'
              :on-progress='()=>{btnLoading.uploadFiles=true}'
              :on-error='()=>{btnLoading.uploadFiles=false;iMessage.error(language("SHANGCHUANSHIBAI","上传失败！"))}'
              :on-success='fileSuccess'
            >
            </el-upload> -->
            <iButton class="margin-left10" :loading="btnLoading.uploadFiles" @click="importFiles">{{language('LK_DAORUFUJIAN','导⼊附件')}} </iButton>
          </span>
          <iButton>{{language('LK_AEKODAOCHU','导出')}} </iButton>
      </template>
      <!-- 表单区域 -->
      <tableList
        class="table"
        index
        :lang="true"
        :tableData="tableListData"
        :tableTitle="tableTitle"
        :tableLoading="loading"
        @handleSelectionChange="handleSelectionChange"
      >
      <!-- AEKO号 -->
      <template #aekoCode="scope">
        
        <div class="table-item-aeko">
          <icon v-if="scope.row.isTop && scope.row.isTop.code==1" class="margin-right5 font24 top-icon" symbol name="iconAEKO_TOP"></icon>
          <span class="link" @click="goToDetail(scope.row)">{{scope.row.aekoCode}} </span>
          <a class="file-icon" @click="checkFiles(scope.row)"><icon class="margin-left5" symbol name="iconshenpi-fujian" ></icon></a>
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

      <!-- aeko状态 -->
      <template #aekoStatus="scoped">
        <span>{{scoped.row.aekoStatus && scoped.row.aekoStatus.desc}}</span>
      </template>

      <!-- 封面状态 -->
      <template #coverStatus="scoped">
        <span>{{scoped.row.coverStatus && scoped.row.coverStatus.desc}}</span>
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
      </iCard>

      <!-- 核销原因弹窗 -->
      <revokeDialog v-if="revokeVisible" :dialogVisible="revokeVisible" @changeVisible="changeVisible" @getList="getList" :selectItems="selectItems" />
      <!-- 附件列表查看 -->
      <filesListDialog v-if="filesVisible" :dialogVisible="filesVisible" @changeVisible="changeVisible"/>
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
import { TAB } from '../data';
import tableList from "@/views/partsign/editordetail/components/tableList"
import revokeDialog from './components/revokeDialog'
import filesListDialog from './components/filesListDialog'
import Upload from '@/components/Upload'
import {
  getManageList,
  searchAekoStatus,
  searchBrand,
  searchCoverStatus,
  uploadFiles,
} from '@/api/aeko/manage'
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
    },
    data(){
      return{
        navList:TAB,
        SearchList:searchList,
        selectItems:[],
        searchParams:{
          brand:'',
          aekoStatusList:[],
          coverStatusList:[],
        },
        selectOptions:{
          'brand':[],
          'aekoStatusList':[],
          'coverStatusList':[]
        },
        tableListData:[
          // {'aekoCode':'AE19221','aekoStatus':'已导⼊','coverStatus':'待表态','tcmResult':'T-go','createDate':'2021-03-01','deadLine':'2021-03-16','frozenDate':'2021-02-01'},
        ],
        tableTitle:tableTitle,
        loading:false,
        revokeVisible:false,
        filesVisible:false,
        uploadUrl: process.env.VUE_APP_SOURCING_MH,
        btnLoading:{
          uploadFiles:false,
        }
      }
    },
    created(){
      this.getList();
      this.getSearchList();
    },
    methods:{
      // 重置
      reset(){
        this.searchParams = {
          brand:'',
          aekoStatusList:[],
          coverStatusList:[],
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
        // 若有冻结起止时间将其拆分成两个字段
        const {frozenDate=[]} = searchParams;
        const data = {
            current:page.currPage,
            size:page.pageSize
        };
        if(frozenDate.length){
            data['frozenDateStart'] = frozenDate[0]+' 00:00:00';
            data['frozenDateEnd'] = frozenDate[1]+' 00:00:00';
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
      async getSearchList(){
        const selectOptions = {
          aekoStatusList:[],
          brand:[],
          coverStatus:[],
        };
        // aeko状态
        await searchAekoStatus().then((res)=>{
          const {code,data=[]} = res;
          if(code ==200 && data){
            selectOptions.aekoStatusList = data;
          }else{
            iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn);
          }
        })
         //品牌
        await searchBrand().then((res)=>{
          const {code,data=[]} = res;
          if(code ==200 && data){
            selectOptions.brand = data;
          }else{
            iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn);
          }
        })
        // 封面状态
        await searchCoverStatus().then((res)=>{
          const {code,data=[]} = res;
          if(code ==200 && data){
            selectOptions.coverStatusList = data;
          }else{
            iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn);
          }
        })

        this.selectOptions = selectOptions;
        // Promise.all([searchAekoStatus(),searchBrand(),searchCoverStatus()]).then((res)=>{
        //   this.selectOptions={
        //     'aekoStatus':res[0].data || [], // aeko状态
        //     'brand':res[1].data || [], //品牌
        //     'coverStatus':res[2].data || [], //封面状态
        //   }
        //   console.log(res,'getSearchList')
        // }).catch((err)=>{
        //   console.log(err);
        // })
      },

      // 跳转详情页
      goToDetail(row){
        const routeData = this.$router.resolve({
          path: '/aeko/aekodetail',
          query: {
            id:1,
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
        const routeData = this.$router.resolve({
          path: '/aeko/describe',
          query: {
            id:'1'
          },
        })
        window.open(routeData.href, '_blank')
      },

      changeVisible(type,visible){
          this[type] = visible;
      },

      // 判断是否勾选项
      async isSelectItem(type=false){
          const {selectItems} = this;
          if(!selectItems.length){
              iMessage.warn(this.language('createparts.QingXuanZeZhiShaoYiTiaoShuJu','请选择至少一条数据'));
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
      
      // 撤销
     async revoke(){
        const isNext  = await this.isSelectItem(true);
        if(!isNext) return;
        // 一次只能撤销一个AEKO
        const {selectItems} = this;
        if(selectItems.length > 1) return iMessage.warn(this.language('LK_AEKO_YICIZHINENGCHEXIAOYIGEAEKO','一次只能撤销一个AEKO，请修改！'));
        console.log(isNext,'isNext');
        this.changeVisible('revokeVisible',true);
      },

      // 查看附件列表
      async checkFiles(row){
        this.changeVisible('filesVisible',true);
      },

      // 导入AEKO附件
      async importFiles(){
        const isNext  = await this.isSelectItem(true);
        if(!isNext) return;
        // 多选多个AEKO后弹出提示
        const {selectItems} = this;
        if(selectItems.length > 1){
          await this.$confirm(
          this.language('LK_TIPS_IMPORFILES_AEKO','你选择的附件将被引⽤到多个AEKO中，请确认是否继续上传？'),
          this.language('LK_AEKO_DAORUFUJIAN','导⼊附件'),
          {
            confirmButtonText: this.language('nominationLanguage.Yes','是'),
            cancelButtonText: this.language('nominationLanguage.No','否'),
          }
          ).then(()=>{
            this.$refs['aekoUpload'].$refs['uploadRef'].$refs['upload-inner'].handleClick();
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
        console.log(data,'data');
        const fileData = data.data;
        const { name ,path,size,id} = fileData;
        const { selectItems } =this;
        const fileItem = {
          fileCode:'requirement',
          fileName:name,
          filePath:path,
          fileSize:size,
          fileType:0,
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
        await uploadFiles({fileHistoryDTOS:params}).then((res)=>{
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
      padding-left: 28px;
      .link{
        display: block;
        width: calc( 100% - 28px);
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
  }
</style>
