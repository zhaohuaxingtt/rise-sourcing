<!--
 * @Author: 舒杰
 * @Date: 2021-08-02 10:13:24
 * @LastEditTime: 2021-12-28 19:40:36
 * @LastEditors: Please set LastEditors
 * @Description: 技术路线
 * @FilePath: \front-sourcing\src\views\partsrfq\externalAccessToAnalysisTools\categoryManagementAssistant\internalDemandAnalysis\technology\index.vue
-->
<template>
  <iCard class="margin-top20">
    <div class="margin-bottom20 clearFloat">
      <span class="font18 font-weight">{{ language("JISHULUXIAN","技术路线") }}</span>
      <div class="floatright">
        <iButton @click="down"
                 :disabled="downType" v-permission="CATEGORY_ASSISTANT_JISHULUXIAN_MOBANXIAZAI">{{ language("MUBANXIAZAI", "模版下载") }}</iButton>
        <el-upload class="upload"
                   :show-file-list="false"
                    v-permission="CATEGORY_ASSISTANT_JISHULUXIAN_SHANGCHUAN"
                   name="multipartFile"
                   with-credentials
                   :on-success="handleAvatarSuccess"
                   :http-request="myUpload"
                   :disabled="uploadButtonLoading"
                   accept=".pdf">
          <iButton :loading="uploadButtonLoading">{{ language("SHUANGCHUAN", "上传") }}</iButton>
        </el-upload>
        <iButton @click="deleted" v-permission="CATEGORY_ASSISTANT_JISHULUXIAN_SHANCHU">{{ language("SHANCHU", "删除") }}</iButton>
        <iButton @click="back">{{ language("FANHUI", "返回") }}</iButton>
      </div>
    </div>
    <!-- <template slot="header-control"> -->
    <!-- </template> -->
    <tableList :tableData="tableListData"
               :tableTitle="tableTitle"
               :tableLoading="tableLoading"
               index
               @handleSelectionChange="handleSelectionChange">
      <template #fileName="scope">
        <span class="link-underline"
              @click="openPdf(scope.row.fileUrl)">{{ scope.row.fileName }}</span>
      </template>
    </tableList>
    <iPagination v-update
                 @size-change="handleSizeChange($event, getTableList)"
                 @current-change="handleCurrentChange($event, getTableList)"
                 background
                 :page-sizes="page.pageSizes"
                 :page-size="page.pageSize"
                 :layout="page.layout"
                 :current-page='page.currPage'
                 :total="page.totalCount" />
  </iCard>
</template>

<script>
import { iCard, iPagination, iButton, iMessage, iMessageBox } from 'rise';
import tableList from '@/views/partsrfq/externalAccessToAnalysisTools/components/tableList.vue';
import { specialToolsTitle } from './data';
import { pageMixins } from '@/utils/pageMixins';
import { technologyFile, technologyAdd, technologyDelete, template } from "@/api/categoryManagementAssistant/internalDemandAnalysis/technology";
import { downloadFileUd, downloadUdFile } from '@/api/file';
import { uploadFile, uploadFileNew } from '@/api/file/upload';
import resultMessageMixin from '@/utils/resultMessageMixin';
export default {
  mixins: [pageMixins, resultMessageMixin],
  components: {
    iCard, tableList, iPagination, iButton,
  },
  props: {
    searchCriteria: {
      type: Object,
      default: () => { }
    }
  },
  data () {
    return {
      tableListData: [],
      tableTitle: specialToolsTitle,
      tableLoading: false,
      selectData: [],
      uploadButtonLoading: false,
      categoryCode: "",
      downType: false,
      loading: false,
    }
  },
  created () {
    this.categoryCode = this.$store.state.rfq.categoryCode
    this.getTableList()
  },
  watch: {
    "$store.state.rfq.categoryCode" () {
      this.categoryCode = this.$store.state.rfq.categoryCode
      this.getTableList()
    }
  },
  methods: {
    handleSelectionChange (list) {
      this.selectData = list
    },
    getTableList () {
      this.tableLoading = true
      let data = {
        categoryCode: this.categoryCode,
        pageNo: this.page.currPage,
        pageSize: this.page.pageSize
      }
      technologyFile(data).then(res => {
        if (res.data) {
          this.page.currPage = res.pageNum;
          this.page.totalCount = res.total;
          this.tableLoading = false
          this.tableListData = res.data
        }
      })
    },
    //删除
    deleted () {

      if (this.selectData.length > 0) {
        iMessageBox(this.language('QRSCXZWJ', '确认删除选中文件?'), this.language('TISHI', '提示')).then(() => {
          let idList = this.selectData.map(res => {
            return res.id
          })
          technologyDelete({ idList: idList }).then(res => {
            this.resultMessage(res, () => {
              this.getTableList()
            })
          })
        }).catch(() => {
        })
      } else {
        iMessage.error(this.language('QINGZHISHAOGOUXUANYITIAOSHANCHUSHUJU', '请至少勾选一条删除数据'))
      }
    },
    openPdf (url) {
      window.open(url)
    },
    //上传
    async myUpload (content) {
      // console.log(content)
      var loading = this.$loading({
        lock: true,
      });
      const formData = new FormData();
      formData.append('file', content.file);
      formData.append('applicationName', content.file.name);
      const res = await uploadFileNew(formData);
      if (res.code == "200" && res.result) {
        iMessage.success(this.language("SHANGCHUANCHENGGONG", "上传成功！"))
        loading.close()
        const result = await technologyAdd({
          fileName: res.data.name,
          fileUrl: res.data.path,
          categoryCode: this.categoryCode
        })
        this.resultMessage(result, () => {
          this.getTableList()
        })
      } else {
        iMessage.error(this.language("SHANGCHUANSHIBAI", "上传失败！"))
      }
    },
    // 模板下载
    down () {
      this.downType = true;
      template().then(res => {
        downloadUdFile(res.data)
        setTimeout(() => {
          this.downType = false;
        }, 1000);
      })
      // if (this.selectData.length==0) {
      // 	iMessage.error(this.$t('TPZS.CANNOTSELECT'))
      // 	return
      // }
      // let fileName=[]
      // this.selectData.map(item=>{
      // 	fileName.push(item.fileName)
      // })
      // const req = {
      // 	applicationName: 'rise',
      // 	fileList: [fileName],
      // }
      // downloadFile(req)
    },
    // 返回
    back () {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="scss">
.upload {
  display: inline-block;
  margin: 0 15px;
}
</style>
