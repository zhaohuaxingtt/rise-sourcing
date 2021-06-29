<!--
 * @Author: Haojiang
 * @Date: 2021-06-24 17:53:08
 * @LastEditTime: 2021-06-29 14:08:09
 * @LastEditors: Please set LastEditors
 * @Description: m签字单新增、详情
 * @FilePath: /front-web/src/views/designate/home/signSheet/newSignSheet.vue
-->
<template>
  <iPage class="designateHome">
    
      <div class="margin-bottom20 clearFloat">
        <span class="font18 font-weight">
          {{ mode === 'add' ? language("XINJIANQIANZIDAN",'新建签字单') : language("QIANZIDAN",'签字单') }}</span
        >
        <div class="floatright">
          <span v-if="mode === 'add'">
            <iButton>
              {{ language("BAOCUN",'保存') }}
            </iButton>
            <iButton>
              {{ language("LK_TIJIAO",'提交') }}
            </iButton>
            <iButton>
              {{ language("YICHU",'移除') }}
            </iButton>
            <iButton>
              {{ language("FANHUI",'返回') }}
            </iButton>
          </span>
          <span v-else>
            <iButton @click="multiEditControl = true">
              {{ language("LK_BIANJI",'返回') }}
            </iButton>
          </span>
          
        </div>
      </div>
      <iCard>
        <el-form class="signsheet-filter" :inline="true">
          <el-row gutter="20">
            <el-col span="6">
              <!-- 签字单号 -->
              <el-form-item :label="`${language('QIANZIDANHAO','签字单号')}:`">
                <iInput
                  v-model="form.signId"
                  :disabled="true"
                  :placeholder="language('LK_QINGSHURU','请输入')"
                ></iInput>
              </el-form-item>
            </el-col>
            <el-col span="6">
              <!-- 状态 -->
              <el-form-item :label="`${language('ZHUANGTAI','状态')}:`">
                <iInput
                  v-model="form.status"
                  :disabled="true"
                  :placeholder="language('LK_QINGSHURU','请输入')"
                ></iInput>
              </el-form-item>
            </el-col>
            <el-col span="12">
              <!-- 描述 -->
              <el-form-item :label="`${language('MIAOSHU','描述')}:`" class="desc">
                <iInput
                  v-model="form.desc"
                  :placeholder="language('LK_QINGSHURU','请输入')"
                ></iInput>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>

        <!-- 表格 -->
        <tablelist
        :tableData="tableListData"
        :tableTitle="tableTitle"
        :tableLoading="tableLoading"
        @handleSelectionChange="handleSelectionChange"
      >
      <!-- 定点单号 -->
      <template #nominateName="scope">
        <a
          href="javascript:;"
          @click="viewNominationDetail(scope.row)">
          {{scope.row.nominateName}}
        </a>
      </template>
      <!-- 定点类型 -->
      <template #nominateProcessType="scope">
        <span>{{(scope.row.nominateProcessType && scope.row.nominateProcessType.desc) || ''}}</span>
      </template>
      <!-- 定点类型 -->
      <template #applicationStatus="scope">
        <span>{{(scope.row.applicationStatus && scope.row.applicationStatus.desc) || ''}}</span>
      </template>

      <!-- re冻结日期 -->
      <template #rsFreezeDate="scope">
        <span>{{scope.row.rsFreezeDate | dateFilter("YYYY-MM-DD")}}</span>
      </template>
      
      <!-- 一致性校验 -->
      <!-- <template #isPriceConsistent="scope">
        <span>{{scope.row.isPriceConsistent ? '通过' : '不通过'}}</span>
      </template> -->

      <!-- 定点日期 -->
      <template #nominateDate="scope">
        <span>{{scope.row.nominateDate | dateFilter("YYYY-MM-DD")}}</span>
      </template>

      <template #freezeDate="scope">
        <span>{{scope.row.freezeDate | dateFilter("YYYY-MM-DD")}}</span>
      </template>
      <template #selStatus="scope">
        <div>
          <a href="javascript:;" class="selStatus-link" @click="confirmSelSheet(false)" v-if="scope.row.selStatus === '已确认'">{{scope.row.selStatus}}</a>
          <a href="javascript:;" class="selStatus-link" @click="confirmSelSheet(true)" v-else-if="scope.row.selStatus === '未确认'">{{scope.row.selStatus}}</a>
          <span v-else>{{scope.row.selStatus}}</span>
        </div>
      </template>
      
      </tablelist>
      <iPagination
        v-update
        @size-change="handleSizeChange($event, getFetchData)"
        @current-change="handleCurrentChange($event, getFetchData)"
        background
        :page-sizes="page.pageSizes"
        :page-size="page.pageSize"
        :layout="page.layout"
        :current-page="page.currPage"
        :total="page.totalCount"
      />
      </iCard>

      <iCard class="margin-top20">
        <!-- 引入定点申请综合管理页面 -->
        <designateSign :mode="'sign'" @choose="handleChoose" />
      </iCard>
  </iPage>
</template>
<script>
import {detailsTableTitle as tableTitle, } from './components/data'
import { pageMixins } from '@/utils/pageMixins'
import filters from "@/utils/filters"
import tablelist from "@/views/designate/supplier/components/tableList";
import designateSign from "@/views/designate/home/designateSign/index";

import {
  iPage,
  iCard,
  iInput,
  iButton,
  iPagination,
  iMessage
} from "rise";

export default {
  mixins: [ filters, pageMixins ],
  data() {
    return {
      mode: this.$route.query.mode || '',
      form: {
        signId: '',
        status: '草稿'
      },
      tableTitle,
      tableListData: [],
      tableLoading: false
    }
  },
  components: {
    iPage,
    iCard,
    iInput,
    iButton,
    iPagination,
    tablelist,
    designateSign
  },
  created() {
    const {query = {}} = this.$route
    this.form.signId = query.signId
  },
  methods: {
    handleChoose(data) {
      this.tableListData = data
    }
  }

}
</script>
<style lang="scss" scoped>
.signsheet-filter {
  .el-form-item {
    ::v-deep .el-form-item__label {
      padding-right: 30px;
    }
    
  }
  .desc {
    width: 100%;
    ::v-deep .el-form-item__content {
      width: 90%;
    }
  }
}
</style>