<template>
    <iPage class="partsprocureEditordetail">
        <iNavMvp
        :lang="true"
        :list="tabRouterList"
        class="margin-bottom20"
        routerPage
        :lev="1"
      />
      <iSearch @sure="sure" @reset="handleSearchReset">
      <el-form>
        <el-form-item :label="$t('PART_NO')">
          <i-input :placeholder="$t('partsprocure.PLEENTER')" class="margin-bottom20" v-model="formData.partNum"> </i-input>
        </el-form-item>
        <el-form-item :label="$t('LK_LINGJIANMINGCHENG')">
          <i-input :placeholder="$t('partsprocure.PLEENTER')" class="margin-bottom20" v-model="formData.partName"> </i-input>
        </el-form-item>
        <el-form-item :label="'Bezug'">
          <i-input :placeholder="$t('partsprocure.PLEENTER')" class="margin-bottom20" v-model="formData.bezug"> </i-input>
        </el-form-item>
        <el-form-item :label="$t('SANJIANGONGYINGSHANG')">
          <i-input :placeholder="$t('partsprocure.PLEENTER')" class="margin-bottom20" v-model="formData.supplierName"> </i-input>
        </el-form-item>
        <el-form-item :label="$t('LK_CAIGOUGONGCHANGCODE')">
          <i-input :placeholder="$t('partsprocure.PLEENTER')" class="margin-bottom20" v-model="formData.purchaseFactory"> </i-input>
        </el-form-item>
        <el-form-item :label="$t('LK_CHUANGJIANSHIJIAN')">
            <iDatePicker :placeholder="$t('partsprocure.CHOOSE')" v-model="formData.createDateBegin" type="date" :picker-options="pickerOptionsEnd" value-format="yyyy-MM-dd 23:59:59" class="margin-bottom20"></iDatePicker>
        </el-form-item>
        <el-form-item :label="$t('JIAGEKAISHIRIQI')">
            <iDatePicker :placeholder="$t('partsprocure.CHOOSE')" v-model="formData.startDateBegin" type="date" :picker-options="pickerOptionsEnd" value-format="yyyy-MM-dd 23:59:59" class="margin-bottom20"></iDatePicker>
        </el-form-item>
      </el-form>
    </iSearch>
      <iCard class="table-card margin-top20">
        <div class="displayFlex">
          <div style="margin-bottom: 20px" class="floatright">
            <iButton v-permission="PURCHASEORDER_ORDER_DISTRIBUTION_SHANGCHUAN" >
              <el-upload
              action="1"
              accept=".xls, .xlsx"
              :on-success="handleFileSuccess"
              :before-upload="beforeAvatarUpload"
              :show-file-list="false"
              :http-request="importFile"
              >{{ $t('LK_SHANGCHUANWENJIAN') }}</el-upload
            ></iButton>
            <iButton v-permission="PURCHASEORDER_ORDER_DISTRIBUTION_XIAZAI" @click="exportMoban">{{ $t('partsprocure.MBXZ') }}</iButton>
          </div>
        </div>
        <tableList class="table-box" height="100%" :tableData="tableListData" border :tableTitle="tableTitle" :tableLoading="tableLoading" openPageProps="partsCode" :openPageGetRowData="true"  @openPage="handleOpenPage">
          <template #factoryName="scope">
           <span>{{scope.row.factoryName}}-{{scope.row.procureFactory}}</span>
          </template>
        </tableList>
        <iPagination v-update  @size-change="handleSizeChange($event, getTableList)" @current-change="handleCurrentChange($event, getTableList)" background :page-sizes="page.pageSizes" :page-size="page.pageSize" :layout="page.layout" :current-page="page.currPage" :total="page.totalCount" />
      </iCard>
    </iPage>
</template>
  
  <script>
  import { exportTemp, pageWhosalePrice,importFile } from '@/api/ws2/productionCapacity/whosale'
  import { pageMixins } from '@/utils/pageMixins'
  import tableList from './components/commonTable'
  import { tableTitledistribution,tabRouterList } from './components/data'
  import { iPage,iMessage, iMessageBox, iPagination, iCard, iSearch, iButton, iInput, iSelect, iDatePicker, iDialog, iMultiLineInput,iNavMvp} from 'rise'
  export default {
    mixins: [pageMixins],
  
    components: {
      iDialog,
      iCard,
      iPagination,
      iSearch,
      iButton,
      iInput,
      iSelect,
      iDatePicker,
      tableList,
      iMultiLineInput,
      iPage,
      iNavMvp
    },
    data() {
      return {
        formData:{},
        tabRouterList,
        tableLoading:false,
        supplierCodeOrName: '', // 供应商名称or供应商SAP号
        tableListData: [],
        costBookId: 0,
        tableTitle:tableTitledistribution,
      }
    },
    async created() {
      this.getTableList()
    },
    methods: {
      sure(){
        this.page.currPage = 1
      this.page.pageSize = 10
        this.getTableList()
      },
      handleSearchReset() {
      this.formData = {}
      this.page.currPage = 1
      this.page.pageSize = 10
      this.getTableList()
    },
      async importFile(content) {
        const formData = new FormData();
        formData.append("file", content.file);
          const res = await importFile(formData)
          console.log(res.result)
          if (res.code=='200') {
            this.getTableList()
            iMessage.success(this.$t('LK_CAOZUOCHENGGONG'))
          } else {
            iMessage.error(this.$i18n.locale == 'zh' ? res.desZh : res.desEn)
          }
      },
      getTableList() {
        this.tableLoading = true
        const parms = {
          current: this.page.currPage,
          size: this.page.pageSize,
        ...this.formData,
        }
        pageWhosalePrice(parms).then((res) => {
          console.log(res)
          if (res.code == '200') {
            this.tableLoading = false
            this.tableListData = res.data.data
            this.page.totalCount = res.data.total

          } else {
            this.tableLoading = false
          }
        })
      },
      exportMoban(){
        exportTemp().then(res=>{
  
        })
      },
  
    },
  }
  </script>
  
<style lang="scss" scoped>
.partsprocureEditordetail{
  display: flex;
  flex-flow: column;
  height: 100%;
  .table-card {
    flex: 1;
    overflow: hidden;
    min-height: 400px;
    display: flex;
    flex-flow: column;
    ::v-deep .card-body-box {
      flex: 1;
      overflow: hidden;
      .cardBody {
        display: flex;
        flex-flow: column;
      }
      .table-box {
        flex: 1;
        overflow: hidden;
      }
    }
  }
}
  .link {
    color: #1763f7;
    cursor: pointer;
  }

  </style>
  