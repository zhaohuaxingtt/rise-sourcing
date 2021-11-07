<template>
  <div class="block">
    <iCard>
      <div class="table-head">
        <div class="tmCartypePro">
          <div>{{$t('LK_CHEXINXIANGMU')}}</div>
          <iSelect
              :placeholder="$t('partsprocure.PLEENTER')"
              v-model="tmCartypeProId"
              filterable
              @change="changeCarTypeProject"
              ref="carTypeProjectRef"
              clearable
          >
            <el-option
                :value="item.tmCartypeProId"
                :label="item.tmCartypeProName"
                v-for="(item, index) in fromGroup"
                :key="index"
            ></el-option>
          </iSelect>
        </div>
        <div>
          <iButton @click="confirmApply" :loading="confirmApplyLoading">{{ $t('LK_QUERENSHENQING') }}</iButton><!-- 确认申请 -->
          <iButton @click="toVoid" :loading="bmCancelLoading">{{ $t('LK_ZUOFEI') }}</iButton><!-- 作废 -->
          <iButton @click="downloadList">{{ $t('LK_XIAZAIQINGDAN') }}</iButton><!-- 下载清单 -->
        </div>
        
      </div>
      <iTableList
        :tableData="bmTableList"
        :tableTitle="bmTableHead"
        :tableLoading="allTableLoading"
        @handleSelectionChange="handleSelectionChange"
      >
        <!-- BM单流水号 -->
        <template #bmSerial="scope">
          <div class="table-txtStyle" @click="openBMDetail(scope.row)">{{scope.row.bmSerial}}</div>
        </template>

        <!-- RS单号 -->
        <template #rsNum="scope">
          <div @click="openViewPdf(scope.row)" class="table-txtStyle">{{scope.row.rsNum}}</div>
        </template>
      </iTableList>

      <div class="unitExplain">
        <UnitExplain />
      </div>

      <iPagination
          v-update
          @size-change="handleSizeChange($event, getTableData)"
          @current-change="handleCurrentChange($event, getTableData)"
          background
          :current-page="page.currPage"
          :page-sizes="page.pageSizes"
          :page-size="page.pageSize"
          :layout="page.layout"
          :total="page.totalCount"
      />
    </iCard>
  </div>
  
</template>

<script>
import {
  iTableList
} from '@/components';
import {
  iMessage,
  iButton,
  iCard,
  iPagination,
  iDialog,
  iInput,
  iSelect,
} from "rise";
import UnitExplain from "./unitExplain";
import { bmTableHead } from "./data";
import { bmCarTypePullDown, findBmWaitConfirmList, bmCancel, bmConfirm } from "@/api/ws2/bmApply";
import { pageMixins } from "@/utils/pageMixins";
import { excelExport } from '@/utils/filedowLoad';

export default {
  components: {
    iTableList, iCard, iButton, iPagination,
    UnitExplain, iSelect
  },

  props: {
    refresh: {
      type: Boolean,
      default: false
    }
  },

  watch: {
    refresh(){
      this.getTableData();
    }
  },

  mixins: [pageMixins],

  data(){
    return {
      fromGroup: [],
      tmCartypeProId: '',
      allTableLoading: false,
      bmTableHead,
      bmTableList: [],
      selectTableList: [],
      page: {
        currPage: 1,
        pageSize: 10,
      },
      bmCancelLoading: false,
      confirmApplyLoading: false,
    }
  },

  created(){
    this.getTableData();
    this.getCarTypePullDown();
  },

  methods: {

    //  预览RSpdf
    openViewPdf(scope){
      const url = process.env.VUE_APP_TOOLING  + '/baCommodityApply' + '/exportRsFull/' + scope.rsNum;
      window.open(url);
    },

    //  作废
    toVoid(){
      if(!this.selectTableList.length){
        return iMessage.warn(this.$t('LK_QINGXUANZHE'))
      }

      this.bmCancelLoading = true;

      bmCancel({
        ids: this.selectTableList.map(item => item.id)
      }).then(res => {
        const result = this.$i18n.locale === 'zh' ? res.desZh : res.desEn;

        if(res.data){
          iMessage.success(result);
          this.getTableData();
          this.selectTableList = [];
          this.$emit('updateTable');
        }else{
          iMessage.error(result);
        }

        this.bmCancelLoading = false;
      }).catch(err => {
        this.bmCancelLoading = false;
      })
    },

    //  打开详情
    openBMDetail(scope){
      this.$emit('openBMDetail', scope);
    },

    handleSelectionChange(val){
      this.selectTableList = val;
    },

    //  下载清单
    downloadList(){
      if(!this.selectTableList.length){
        return iMessage.warn(this.$t('LK_QINGXUANZHE'))
      }

      excelExport(this.selectTableList, this.bmTableHead, 'BM申请单');
    },

    //  确认申请
    confirmApply(){
      if(!this.selectTableList.length){
        return iMessage.warn(this.$t('LK_QINGXUANZHE'))
      }
      
      this.confirmApplyLoading = true;
      bmConfirm({
        ids: this.selectTableList.map(item => item.id)
      }).then(res => {
        const result = this.$i18n.locale === 'zh' ? res.desZh : res.desEn;

        if(res.data){
          iMessage.success(result);
          this.getTableData();
          this.$emit('updateTable');
        }else{
          iMessage.error(result);
        }

        this.confirmApplyLoading = false;
      }).catch(err => {
        this.confirmApplyLoading = false;
      })
    },

    getCarTypePullDown(){
      bmCarTypePullDown().then(res => {
        const result = this.$i18n.locale === 'zh' ? res.desZh : res.desEn;
        if(res.data){
          this.fromGroup = res.data;
        }else{
          iMessage.error(result);
        }
      })
    },

    getTableData(){
      this.allTableLoading = true;
      const param = {
        current: this.page.currPage,
        size: this.page.pageSize,
        tmCartypeProId: this.tmCartypeProId
      }
      findBmWaitConfirmList(param).then(res => {
        const result = this.$i18n.locale === 'zh' ? res.desZh : res.desEn;
        if(res.data){
          this.bmTableList = res.data;
          this.page.currPage = res.pageNum;
          this.page.pageSize = res.pageSize;
          this.page.totalCount = res.total;
        }else{
          iMessage.error(result);
        }

        this.allTableLoading = false;
      }).catch(err => {
        this.allTableLoading = false;
      })
    },

    changeCarTypeProject(){
      this.getTableData();
    },
  }
}
</script>

<style lang="scss" scoped>
.block{
  .table-txtStyle{
    color: #1663F6;
    text-decoration: underline;
    font-family: Arial;
    cursor: pointer;
  }

  .table-head{
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;

    .tmCartypePro{
      display: flex;
      align-items: center;

      & > div{
        white-space: nowrap;
        margin-right: 10px;
      }
    }
  }

  .unitExplain{
    display: flex;
    justify-content: flex-end;
    margin-top: 10px;
  }
}
</style>