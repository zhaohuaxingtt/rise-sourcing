<template>
  <div>
    <iCard>
      <div class="margin-bottom20 clearFloat">
        <iFormGroup inline icon>
          <iFormItem :label="language('LK_CHUANGJIANRIQI','创建日期')" name="test">
            <i-text>2020-12-10</i-text>
          </iFormItem>
          <iFormItem :label="language('LK_DAORUSHIJIAN','导入时间')" name="test">
            <i-text >2020-12-10</i-text>
          </iFormItem>
          <div class="floatright margin-top5">
            <iButton @click="readEffectiveBOM" disabled>{{ language('LK_DUQUYOUXIAODOM','读取有效BOM') }}</iButton>
            <iButton @click="exports">{{language('LK_DAOCHU','导出')}}</iButton>
          </div>
        </iFormGroup>
      </div>
      <tablelist
          :tableData="tableListData"
          :tableTitle="tableTitle"
          :tableLoading="tableLoading"
          :index="true"
          @handleSelectionChange="handleSelectionChange"
          :hide-open-page="true"
      ></tablelist>
      <!------------------------------------------------------------------------>
      <!--                  表格分页                                          --->
      <!------------------------------------------------------------------------>
      <iPagination
          v-update
          @size-change="handleSizeChange($event, getTableList)"
          @current-change="handleCurrentChange($event, getTableList)"
          background
          :page-sizes="page.pageSizes"
          :page-size="page.pageSize"
          :layout="page.layout"
          :current-page='page.currPage'
          :total="page.totalCount"
      />
    </iCard>
  </div>
</template>

<script>
import {iCard, iButton, iPagination, iFormGroup, iFormItem, iText} from 'rise';
import tablelist from 'pages/partsrfq/components/tablelist'
import {tableTitle} from "./components/data";
import {pageMixins} from "@/utils/pageMixins";
import {getRfqDataList} from "@/api/partsrfq/home";


export default {
  components: {
    iCard,
    iButton,
    iPagination,
    iFormGroup,
    iFormItem,
    iText,
    tablelist
  },
  mixins: [pageMixins],
  data() {
    return {
      tableListData: [],
      tableTitle: tableTitle,
      tableLoading: false,
      selectTableData: []
    };
  },
  created() {
    this.getTableList();
  },
  methods: {
    //获取表格数据
    async getTableList() {
      this.tableLoading = true;
      const id = this.$route.query.id
      if (id) {
        const req = {
          otherInfoPackage: {
            findType: '04',
            rfqId: id,
            current: this.page.currPage,
            size: this.page.pageSize,
          }
        }
        try {
          const res = await getRfqDataList(req)
          this.tableListData = res.data;
          this.page.currPage = res.currPage
          this.page.pageSize = res.pageSize
          this.page.totalCount = res.totalCount
          this.tableLoading = false;
        } catch {
          this.tableLoading = false;
        }
      }
    },
    readEffectiveBOM() {
    },
    exports() {
    },
    //修改表格改动列
    handleSelectionChange(val) {
      this.selectTableData = val;
    },
    openPage() {
      this.detailDialog = true
    }
  }
}
</script>

<style scoped>

</style>