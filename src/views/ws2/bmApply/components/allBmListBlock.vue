<template>
  <div class="block">
    <SearchBlock @sure="allSerch" />
      <iCard>
        <div class="table-head">
          <iButton @click="downloadList">{{ $t('LK_XIAZAIQINGDAN') }}</iButton><!-- 下载清单 -->
        </div>
        <iTableList
          :tableData="allTableList"
          :tableTitle="allTableHead"
          :tableLoading="allTableLoading"
          @handleSelectionChange="handleSelectionChange"
        >
          <!-- BM单流⽔号 -->
          <template #bmSerial="scope">
            <span class="flexRow">
              <span class="openLinkText cursor " @click="openBMDetail(scope.row)"> {{ scope.row.bmSerial }}</span>
              <span v-if="scope.row.bmSerial" class="icon-gray  cursor "  @click="openBMDetail(scope.row)">
                <icon symbol class="show" name="icontiaozhuananniu" />
                <icon symbol class="active" name="icontiaozhuanxuanzhongzhuangtai" />
              </span>
            </span>  
          </template>

          <!-- RS单号 -->
          <template #rsNum="scope">
            <div  @click="openViewPdf(scope.row)" class="table-link">{{scope.row.rsNum}}</div>
          </template>
        </iTableList>

        <div class="unitExplain">
          <UnitExplain />
        </div>

        <iPagination
            v-update
            @size-change="handleSizeChange($event, getPageData)"
            @current-change="handleCurrentChange($event, getPageData)"
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
  icon
} from "rise";
import SearchBlock from "./searchBlock";
import { findAllBmList } from "@/api/ws2/bmApply";
import { allTableHead, bmApplyForm } from "./data";
import { pageMixins } from "@/utils/pageMixins";
import UnitExplain from "./unitExplain";
import { excelExport } from '@/utils/filedowLoad';
import _ from 'lodash';
import Moment from 'moment';

export default {
  components: {
    SearchBlock, iTableList, iCard, iButton, iPagination,
    UnitExplain,icon
  },

  mixins: [pageMixins],

  data(){
    return {
      allTableList: [],
      allTableHead,
      allTableLoading: false,
      selectTableList: [],
      page: {
        currPage: 1,
        pageSize: 10,
      },
      form: _.cloneDeep(bmApplyForm),
    }
  },

  props: {
    refresh: {
      type: Boolean,
      default: false
    }
  },

  watch: {
    refresh(){
      this.getPageData();
    }
  },

  created(){
    this.getPageData();
  },

  methods: {

    //  预览RSpdf
    openViewPdf(scope){
      const url = process.env.VUE_APP_TOOLING  + '/baCommodityApply' + '/exportRsFull/' + scope.rsNum;
      window.open(url);
    },

    //  打开详情
    openBMDetail(scope){
      this.$emit('openBMDetail', scope);
    },

    //  下载清单
    downloadList(){
      if(!this.selectTableList.length){
        return iMessage.warn(this.$t('LK_QINGXUANZHE'))
      }

      excelExport(this.selectTableList, this.allTableHead, 'BM申请单')
    },

    getTableData(){
      this.allSerch(bmApplyForm)
    },

    handleSelectionChange(val){
      this.selectTableList = val;
    },

    getPageData(){
      this.allTableLoading = true;
      const param = {
        ...this.form,
        startDate: this.form.startDate ? Moment(this.form.startDate).format('YYYY-MM-DD') : '',
        endDate: this.form.endDate ? Moment(this.form.endDate).format('YYYY-MM-DD') : '',
        current: this.page.currPage,
        size: this.page.pageSize,
      }

      findAllBmList(param).then(res => {
        const result = this.$i18n.locale === 'zh' ? res.desZh : res.desEn;
        if(res.data){
          this.allTableList = res.data;
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

    allSerch(data){
      this.form = data;
      this.getPageData();
    },
  }
}
</script>

<style lang="scss" scoped>
.block{
  .unitExplain{
    display: flex;
    justify-content: flex-end;
    margin-top: 10px;
  }
  .openLinkText {
    color: $color-blue;
  }
  .table-link{
    color: #1663F6;
    text-decoration: underline;
    font-family: Arial;
    cursor: pointer;
  }

  .table-head{
    display: flex;
    justify-content: flex-end;
    margin-bottom: 20px;
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