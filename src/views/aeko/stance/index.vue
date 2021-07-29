<!--
 * @Author: wentliao
 * @Date: 2021-07-28 16:10:40
 * @Description: aeko表态
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
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>  
                  </iSelect> 
                  <iDatePicker style="width:185px" :placeholder="language('partsprocure.CHOOSE','请选择')" v-else-if="item.type === 'datePicker'" type="daterange"  value-format="yyyy-MM-dd" v-model="searchParams[item.props]"></iDatePicker>
                  <iInput :placeholder="language('LK_QINGSHURU','请输入')" v-else v-model="searchParams[item.props]"></iInput> 
              </el-form-item>
          </el-form>
      </iSearch>
      <iCard class="contain margin-top20" :title="language('LK_AEKOBIAOTAI','AEKO表态')">
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
      <template #a="scope">
        <icon class="margin-right5" symbol name="iconAEKO_TOP"></icon>
        <span class="link" @click="goToDetail(scope.row)">{{scope.row.a}}-6666</span>
        <a @click="checkFiles(scope.row)"><icon class="margin-left5" symbol name="iconshenpi-fujian" ></icon></a>
        
      </template>

      <!-- 日志 -->
      <template #b="scope">
        <span class="link" @click="checkLog(scope.row)">{{language('LK_CHAKAN','查看')}}</span>
      </template>

      <!-- 描述 -->
      <template #c="scope">
        <span class="link" @click="checkDescribe(scope.row)">{{language('LK_CHAKAN','查看')}}</span>
      </template>

       <!-- 审批单 -->
       <template #i="scoped">
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
      </iCard>

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
  iPagination,
  icon,
  iMessage,
} from 'rise';
import { searchList,tableTitle } from './data';
import { pageMixins } from "@/utils/pageMixins";
import { TAB } from '../data';
import tableList from "@/views/partsign/editordetail/components/tableList"
import filesListDialog from '../manage/components/filesListDialog'
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
    },
    data(){
      return{
        navList:TAB,
        SearchList:searchList,
        selectItems:[],
        searchParams:{},
        selectOptions:{
          'f':[
            {label:'品牌1',value:'1'},
            {label:'品牌2',value:'2'},
          ],
          'g':[
            {label:'已导入',value:'1'},
            {label:'已分配',value:'2'},
            {label:'已冻结',value:'3'},
            {label:'已通过',value:'4'},
            {label:'已撤销',value:'5'},
          ],
          'h':[
            {label:'待表态',value:'1'},
            {label:'已提交',value:'2'},
            {label:'待审批',value:'3'},
            {label:'Commodity K3通过',value:'4'},
            {label:'Commodity 科室通过',value:'5'},
          ]
        },
        tableListData:[
          {'a':'AE19221','b':'1',c:'2','d':'3','e':'4','f':'5','g':'6','h':'7','i':'8','j':'9','k':'10'},
          {'a':'AE19222','b':'1',c:'2','d':'3','e':'4','f':'5','g':'6','h':'7','i':'8','j':'9','k':'10'},
          {'a':'AE19223','b':'1',c:'2','d':'3','e':'4','f':'5','g':'6','h':'7','i':'8','j':'9','k':'10'},
        ],
        tableTitle:tableTitle,
        loading:false,
        filesVisible:false,
        uploadUrl: process.env.VUE_APP_SOURCING_MH,
        btnLoading:{
          uploadFiles:false,
        }
      }
    },
    methods:{
      // 重置
      reset(){
        this.searchParams = {};
      },

      handleSelectionChange(val) {
          this.selectItems = val;
      },
      
      // 获取列表数据
      getList(){

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
            this.$refs['aekoUpload'].$refs['upload-inner'].handleClick()
            console.log('是')
          }).catch(()=>{
            console.log('否')
          })
        }else{
          this.$refs['aekoUpload'].$refs['upload-inner'].handleClick()
        }
        
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
  }
</style>