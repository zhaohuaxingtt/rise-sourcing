<!--
 * @Author: wentliao
 * @Date: 2021-05-26 10:45:22
 * @Description: 特殊定点-配附件--附件需求导入列表
-->
<template>
    <iPage class="importFiles">
        <el-tabs v-model="tab" class="tab">
            <el-tab-pane :label="$t('LK_XUNYUANZHIHANG')" name="source">
                 <div class="margin-bottom33">
                    <iNavMvp right routerPage lev="2" :list="navList" @message="clickMessage" />
                </div>
                <!-- 内容区 -->
                <iCard>
                  <div class="margin-bottom20 clearFloat">
                    <div class="floatright">
                      <span class="margin-right10">
                          <Upload 
                              hideTip
                              :buttonText="$t('LK_DAORU')"
                              accept=" .xls,.xlsx"
                              :request="uploadImportFile"
                              :onHttpUploaded="onHttpUploaded"
                              @on-success="onDraingUploadsucess"
                          />
                      </span>
                      <iButton  @click="downloadTemplate" > {{$t('LK_FUJIANMUBANXIAZAI')}} </iButton>
                    </div>
                  </div>
                  <!-- 表格区域 -->
                  <tableList
                      class="table"
                      index
                      :tableData="tableListData"
                      :tableTitle="tableTitle"
                      :tableLoading="loading"
                      @handleSelectionChange="handleSelectionChange"
                  >
                      <template #code="scope">
                        <span @click="goFilesList(scope.row.code)" class="link-underline" >{{scope.row.code}}</span>
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
            </el-tab-pane>
        </el-tabs>
    </iPage>
</template>

<script>
import {
  iPage,
  iNavMvp,
  iCard,
  iButton,
  iPagination,
} from "rise";
import Upload from '@/components/Upload'
import { navList } from "@/views/partsign/home/components/data";
import { pageMixins } from "@/utils/pageMixins";
import tableList from "@/views/partsign/editordetail/components/tableList";
import { tableTitle } from "./data";

import {
  getAffixList,
  uploadImportFile,
  downloadImportFile,
} from '@/api/designateFiles/importFiles'
import { iMessage } from 'rise';
import { clickMessage } from "@/views/partsign/home/components/data"

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
    },
    data(){
        return{
            tab:'source',
            loading: false,
            tableTitle:tableTitle,
            selectItems:[],
            uploadImportFile:uploadImportFile,
            tableListData:[],
        }
    },
    created(){
      this.getList();
      this.updateNavList
    },
    computed: {
      ...mapState(["navList"]),
      ...mapActions(["updateNavList"])
    },
    methods:{
      // 跳转附件清单页
      goFilesList(id){
        const router =  this.$router.resolve({path: `/sourcing/importfiles/detaillist?id=${id}`})
        window.open(router.href,'_blank');
        // this.$router.push({
        //   path:'/sourcing/importfiles/detaillist',
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
}
</style>