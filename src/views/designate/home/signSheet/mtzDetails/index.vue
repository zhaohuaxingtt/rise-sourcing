<!--
 * @Author: youyuan
 * @Date: 2021-11-06 17:50:24
 * @LastEditTime: 2021-11-08 19:27:05
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \front-web\src\views\designate\home\signSheet\components\mtzDetails\index.vue
-->
<template>
  <iPage>
    <div>
      <iCard class="margin-top20">
        <el-form :inline="true" :model="infoForm" label-position="left">
          <el-form-item 
          style="width: 300px;margin-right:68px;"
          :label="language('QIANZIDANHAO', '签字单号')">
            <iInput
            v-model="infoForm.signCode"
            :disabled="true"/>
          </el-form-item>
          <el-form-item 
          style="width: 300px; margin-right:68px;"
          :label="language('ZHUANGTAI', '状态')">
            <iInput
            v-model="infoForm.statusDesc"
            :disabled="true"/>
          </el-form-item>
          <el-form-item 
          style="width: 500px;margin-right:68px;"
          :label="language('CAOGAO', '草稿')">
            <iInput
            style="width: 300px;"
            v-model="infoForm.description"
            :placeholder="language('QINGSHURUMIAOSHU','请输入描述')"/>
          </el-form-item>
        </el-form>
      </iCard>
      <iCard class="margin-top20">
        <div slot="header" class="headBox">
          <p class="headTitle">{{language('XIANGQINGLIEBIAO', '详情列表')}}</p>
          <span class="buttonBox">
            <iButton @click="handleClickChoose">{{language('XUANZE', '选择')}}</iButton>
            <iButton @click="handleClickMove">{{language('YICHU', '移除')}}</iButton>
          </span>
        </div>
        <tableList
          class="margin-top20"
          :tableData="tableListData"
          :tableTitle="tableTitle"
          :tableLoading="loading"
          :index="true"
          @handleSelectionChange="handleSelectionChange">
        </tableList>
        <iPagination
        v-update
        @size-change="handleSizeChange($event, getTableData)"
        @current-change="handleCurrentChange($event, getTableData)"
        background
        :page-sizes="page.pageSizes"
        :page-size="page.pageSize"
        :layout="page.layout"
        :current-page="page.currPage"
        :total="page.totalCount"/>
      </iCard>
      <detail v-model="detailParams.visible" :key="detailParams.key"/>
    </div>
  </iPage>
</template>

<script>
import { iCard, iButton, iInput, iPage, iMessage } from 'rise'
import tableList from '@/components/ws3/commonTable';
import { tableTitle } from './components/data'
import detail from './components/detail'
import { getMTZSignPage, getsignSheetDetails, removeSignsheetItems } from '@/api/designate/nomination/signsheet'
import { pageMixins } from "@/utils/pageMixins";
export default {
  mixins: [pageMixins],
  components: {
    iCard,
    iButton,
    iInput,
    iPage,
    tableList,
    detail
  },
  data () {
    return {
      infoForm: {},
      tableListData: [],
      tableTitle,
      loading: false,
      detailParams: {
        key: 0,
        visible: false,
        data: []
      },
      selection: []
    }
  },
  created() {
    this.getTableData()
    this.getsignSheetDetails()
  },
  methods: {
    // 获取table数据
    getTableData() {
      this.loading = true
      getMTZSignPage({
        pageNo: this.page.currPage,
        pageSize: this.page.pageSize,
        signId: this.$route.query.id
      }).then(res => {
        this.loading = false
        if (res && res.code == 200) {
          this.page.totalCount = res.total
          this.tableListData = res.data
        } else iMessage.error(res.desZh)
      })
    },
    // 获取MTZ签字单详情 
    getsignSheetDetails() {
      getsignSheetDetails({
        signId: this.$route.query.id
      }).then(res => {
        if (res && res.code == 200) {
          this.infoForm = res.data
        } else iMessage.error(res.desZh)
      })
    },
    // 点击选择
    handleClickChoose() {
      this.detailParams = {
        ...this.detailParams,
        key: Math.random(),
        visible: true
      }
    },
    // 点击移除
    handleClickMove() {
      if(this.selection && this.selection.length == 0) {
        return iMessage.warn(this.language('QZSXZYTSJ', '请至少选中一条数据'))
      }
      removeSignsheetItems({
        signId: this.$route.query.id
      }).then(res => {

      })
    },
    // 选中数据
    handleSelectionChange(val) {
      this.selection = val
    }

  }
}
</script>

<style lang='scss' scoped>
.headBox {
  position: relative;
  justify-content: space-between;
  width: 100%;
  .headTitle {
    display: inline-block;
    font-weight: bold;
    font-family: Arial;
    color: #000000;
    opacity: 1;
  }
  .buttonBox {
    position: absolute;
    right: 0;
  }
}
 
</style>
