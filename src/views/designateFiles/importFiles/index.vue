<!--
 * @Author: wentliao
 * @Date: 2021-05-26 10:45:22
 * @Description: 特殊定点-配附件--附件需求导入列表
-->
<template>
    <iPage class="importFiles">
        <!-- <el-tabs v-model="tab" class="tab"> -->
            <!-- <el-tab-pane lazy :label="language('LK_XUNYUANZHIHANG','寻源')" name="source"> -->
                 <div class="topMenu">
                    <iNavMvp class="margin-bottom30" :list="navListLeft" lang @change="change" :lev="1" routerPage></iNavMvp>
                    <iNavMvp class="margin-bottom30" right routerPage lev="2" :list="navList" @message="clickMessage" />
                </div>
                <!-- 内容区 -->
                <iCard>
                  <div class="margin-bottom20 clearFloat">
                    <div class="floatright">
                      <span class="margin-right10">
                          <Upload 
                              hideTip
                              :buttonText="language('LK_DAORU','导入')"
                              accept=" .xls,.xlsx"
                              :request="uploadImportFile"
                              :onHttpUploaded="onHttpUploaded"
                              @on-success="onDraingUploadsucess"
                          />
                      </span>
                      <iButton  @click="downloadTemplate" > {{language('LK_FUJIANMUBANXIAZAI','附件模板下载')}} </iButton>
                    </div>
                  </div>
                  <!-- 表格区域 -->
                  <tableList
                      class="table aotoTableHeight"
                      index
                      :lang="true"
                      :tableData="tableListData"
                      :tableTitle="tableTitle"
                      :tableLoading="loading"
                      @handleSelectionChange="handleSelectionChange"
                  >
                      <template #code="scope">
                        <span class="flexRow">
                          <span class="openLinkText cursor " @click="goFilesList(scope.row.code)"> {{scope.row.code}}</span>
                          <span class="icon-gray  cursor  " v-if="scope.row.code"  @click="goFilesList(scope.row.code)">
                              <icon symbol class="show" name="icontiaozhuananniu" />
                              <icon symbol class="active" name="icontiaozhuanxuanzhongzhuangtai" />
                          </span>
                        </span>  
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
            <!-- </el-tab-pane> -->
        <!-- </el-tabs> -->
    </iPage>
</template>

<script>
import {
  iPage,
  iNavMvp,
  iCard,
  iButton,
  iPagination,
  icon
} from "rise";
import Upload from '@/components/Upload'
import { pageMixins } from "@/utils/pageMixins";
import tableList from "@/views/partsign/editordetail/components/tableList";
import { tableTitle } from "./data";

import {
  getAffixList,
  uploadImportFile,
  downloadImportFile,
} from '@/api/designateFiles/importFiles'
import { iMessage } from 'rise';
import { clickMessage} from "@/views/partsign/home/components/data"

// eslint-disable-next-line no-undef
const { mapState, mapActions } = Vuex.createNamespacedHelpers("sourcing")

export default {
    name:'importFiles',
    mixins: [pageMixins],
    components:{
        iPage,
        iNavMvp,
        iCard,
        iButton,
        iPagination,
        Upload,
        tableList,
        icon
    },
    data(){
        return{
            tab:'source',
            loading: false,
            tableTitle:tableTitle,
            selectItems:[],
            uploadImportFile:uploadImportFile,
            tableListData:[]
        }
    },
    created(){
      console.log(this.$route.path);
      this.getList();
      this.updateNavList
    },
    computed: {
      ...mapState(["navList","navListLeft"]),
      ...mapActions(["updateNavList"])
    },
    methods:{
      // 跳转附件清单页
      goFilesList(id){
        const router =  this.$router.resolve({path: `/sourceinquirypoint/sourcing/importfiles/detaillist?id=${id}`})
        window.open(router.href,'_blank');
        // this.$router.push({
        //   path:'/sourceinquirypoint/sourcing/importfiles/detaillist',
        //   query:{
        //     id,
        //   }
        //   })
      },

      // 导入文件
      onDraingUploadsucess(data){
        console.log(data);
        this.getList();
      },
      // 下载模板
      downloadTemplate(){
        downloadImportFile();
      },
      // 获取列表
      getList(){
        this.loading =  true;
        const { page } = this;
        const data = { 
          pageNo:page.currPage,
          pageSize:page.pageSize,
        };
        getAffixList(data).then((res)=>{
          const {code,data} = res; 
          if(code === '200' && data){
              const {records,total} = data;
              this.tableListData = records;
              this.page.totalCount = total;
          }
          this.loading =  false;

        }).catch((err)=>{
          this.loading =  false;
        });
      },

      // 附件导入
      async onHttpUploaded(formData,content){
        const newFormData = new FormData()
        newFormData.append('file', content.file)
        newFormData.append('applicationName', 'rise')
        await uploadImportFile(newFormData).then((res)=>{
          const {code} = res;
          if(code!=200){
            iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn)
          }
        }).catch((e)=>{
          iMessage.error(this.$i18n.locale === "zh" ? e.desZh : e.desEn)
        });
      },

      // 通过待办数跳转
      clickMessage,
    }

}
</script>

<style lang="scss" scoped>
.importFiles {
  .aotoTableHeight{
    ::v-deep .el-table__body-wrapper {
      min-height: 422px !important;  
      overflow: auto !important ;
    }
  }
  .topMenu{
    display: flex;
    justify-content: space-between;
  }
  .openLinkText{
    color:$color-blue;
  }
  position: relative;

  .tab {
    ::v-deep .el-tabs__header {
      position: absolute;
      top: 20px;
      transform: translate(0, 5px);
      z-index: 1;

      .el-tabs__nav-wrap::after {
        background: transparent;
      }

      .el-tabs__active-bar {
        height: 3px;
        background: $color-blue;
        border-radius: 2px;
      }

      .el-tabs__item {
        font-size: 18px;
        color: #000000;
        opacity: 0.42;
        height: 35px;
        line-height: 35px;

        & + & {
          padding: 0 25px;
        }
      }

      .is-active {
        opacity: 1;
        font-weight: bold;
      }
    }
  }
  .icon-gray{
    cursor: pointer;
    .active{
      display: none;
    }
    .show{
      display: block;
    }
  }
  .flexRow{
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .icon-gray:hover{
    cursor: pointer;
    .show{
      display: none;
    }
    .active{
      display: block;
    }
  }
}
</style>