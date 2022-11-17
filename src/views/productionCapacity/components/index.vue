<!--
 * @Date: 2022-08-18 11:10:25
 * @LastEditors: caopeng
 * @LastEditTime: 2022-08-19 15:19:53
 * @FilePath: \front-order\src\views\ws2\productionCapacity\Bom\page\index.vue
-->
<template>
    <iPage class="partsprocureEditordetail">
      <!-- 表格内容模块 -->
      <iCard style="margin-top: 20px">
        <div class="margin-bottom20 displayFlex">
          <div class="floatright">
            <iButton v-permission="PURCHASEORDER_ORDER_DISTRIBUTION_SHANGCHUAN" @click="importFile">
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
        <tableList :tableData="tableListData" border :tableTitle="tableTitle" :tableLoading="tableLoading" openPageProps="partsCode" :openPageGetRowData="true"  @openPage="handleOpenPage">
          <template #item="scope">
            <div class="link" @click="openPreDetail(scope.row)">{{ scope.row.item }}</div>
          </template>
        </tableList>
      </iCard>
    </iPage>
  </template>
  
  <script>
    // import { exportTemp, findPriceList,importFile } from '@/api/ws2/productionCapacity/whosale'

  import { pageMixins } from '@/utils/pageMixins'
  import tableList from './commonTable'
  import { tableTitledistribution } from './data'
  import { iPage,iMessage, iMessageBox, iPagination, iCard, iSearch, iButton, iInput, iSelect, iDatePicker, iDialog, iMultiLineInput } from 'rise'
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
    },
    data() {
      return {
        tabsList: tabsList,
        tableLoading:false,
        supplierCodeOrName: '', // 供应商名称or供应商SAP号
        tableListData: [],
        costBookId: 0,
        tableTitle:tableTitledistribution,
      }
    },
    async created() {
  
    },
    methods: {
      async importFile(content) {
        const formData = new FormData();
        formData.append("uploadFile", content.file);
          const res = await importFile(formData)
          console.log(res.result)
          if (res.result=='200') {
            this.getTableList()
            iMessage.success(this.$t('LK_CAOZUOCHENGGONG'))
          } else {
            iMessage.error(this.$i18n.locale == 'zh' ? res.desZh : res.desEn)
          }
      },
      getTableList() {
        this.tableLoading = true
        const parms = {
          partCostBookId:this.costBookDic.id,
          partNum:this.$route.query.partsNum,
          type:'3',
          tmSupplierId:this.costBookDic.tmSupplierId
        }
        findPriceList(parms).then((res) => {
          if (res.cdoe == '200') {
            this.tableLoading = false
            this.tableData = res.data
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
  .link {
    color: #1763f7;
    cursor: pointer;
  }

  </style>
  