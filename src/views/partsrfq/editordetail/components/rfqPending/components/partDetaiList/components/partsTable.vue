<!--
 * @Author: your name
 * @Date: 2021-03-26 18:37:44
 * @LastEditTime: 2021-09-14 14:03:42
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\views\partsrfq\editordetail\components\rfqPending\components\partDetaiList\components\partsTable.vue
-->
<template>
  <div class="notPushRfq">
    <tableList
        :tableData="tableListData"
        :tableTitle="tableTitle"
        :tableLoading="tableLoading"
        @handleSelectionChange="handleSelectionChange"
        @openPage="openPage"
    >
      <template #fsnrGsnrNum="scope">
        <span v-if="scope.row.partProjectType === partProjTypes.PEIJIAN" class="openLinkText cursor " @click="$emit('gotoAccessoryDetail', scope.row)"> {{ scope.row.fsnrGsnrNum }}</span>
        <span v-else class="openLinkText cursor " @click="$emit('openPage', scope.row)">{{ scope.row.fsnrGsnrNum }}</span>
      </template>
    </tableList>
    <iPagination
        v-update
        @size-change="handleSizeChange($event, getTableList)"
        @current-change="handleCurrentChange($event, getTableList)"
        background
        :page-sizes="page.pageSizes"
        :page-size="page.pageSize"
        :layout="page.layout"
        :current-page="page.currPage"
        :total="page.totalCount"
    ></iPagination>
  </div>
</template>

<script>
import {
  iPagination,
} from 'rise';
import {
  tableTitle,
  form
} from "@/views/partsprocure/home/components/data";
import tableList from "@/views/partsign/home/components/tableList";
import {
  pageMixins
} from "@/utils/pageMixins";
import { getTabelData} from "@/api/partsprocure/home";
import {partProjTypes} from '@/config'

export default {
  mixins: [pageMixins],
  components: {
    tableList,
    iPagination
  },
  props: {
    rfqId: {
      type: String
    },
    queryForm: {
      type: Object
    }
  },
  data() {
    return {
      tableLoading: false,
      tableListData: [],
      parmarsNotHasRfq: JSON.parse(JSON.stringify(form)),
      // handleSelectArr: [],
      tableTitle,
      partProjTypes
    }
  },
  created() {
    // this.getTableList()
    const {query={}} = this.$route;
    const {businessKey} = query;

    // 当类型为AEKO时 表头需要隐藏部分
    if(businessKey == partProjTypes.AEKOLINGJIAN){
      this.tableTitle = tableTitle.filter((item)=>item.isAekoShow);
    }
  },
  methods: {
    //获取表格数据
    getTableList() {
        this.tableLoading = true
        this.parmarsNotHasRfq['size'] = this.page.pageSize
        this.parmarsNotHasRfq['current'] = this.page.currPage
        this.parmarsNotHasRfq['status'] = '11'
        this.parmarsNotHasRfq['buyerId'] = this.queryForm.buyerId
        this.parmarsNotHasRfq['linieId'] = this.queryForm.linieId
        this.parmarsNotHasRfq['partProjectType'] = this.queryForm.partProjectType
        
        getTabelData(this.parmarsNotHasRfq).then(res => {
          this.tableLoading = false
          this.page.currPage = res.pageNum
          this.page.pageSize = res.pageSize
          this.page.totalCount = res.total
          this.tableListData = res.data.map(r=>{return {...r,...{purchaseProjectId:r.id}}}) || []
        }).catch(() => this.tableLoading = false)
    },
    // 待选零件
    handleSelectionChange(e) {
      this.$emit('targetHand', e)
      // this.handleSelectArr = e;
    },
    // 跳转详情
    openPage(item) {
      this.$router.push({
        path: "/sourceinquirypoint/sourcing/partsprocure/editordetail",
        query: {
          item: JSON.stringify(item),
        },
      });
    },
  }
}
</script>

<style lang="scss" scoped>
.notPushRfq {
  width: 100%;
}
.openLinkText{
  color:$color-blue;
}
</style>
