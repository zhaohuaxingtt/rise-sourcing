<template>
  <div class="block">
    <SearchBlock @sure="allSerch" />
      <iCard>
        <div class="table-head">
          <iButton @click="downloadList" v-permission="TOOLING_BUDGET_BMAPPLICATION_ALL_DOWNLOAD">{{ $t('LK_XIAZAIQINGDAN') }}</iButton><!-- 下载清单 -->
          <buttonTableSetting @click="edittableHeader"></buttonTableSetting>
        </div>
        
        <tableList
          max-height="570px"
          ref="tableList"
          permissionKey="allBmListBlock"
          :tableData="allTableList"
          :tableTitle="allTableHead"
          :tableLoading="allTableLoading"
          @handleSelectionChange="handleSelectionChange"
        >
          <!-- BM单流⽔号 -->
          <template #bmSerial="scope">
              <span class="openLinkText cursor " @click="openBMDetail(scope.row)"> {{ scope.row.bmSerial }}</span>
          </template>

          <!-- RS单号 -->
          <template #rsNum="scope">
            <template v-if="scope.row.rsNum == 'AEKO RS单'">
              <div  @click="goRsList(scope.row)" class="table-link" v-if="scope.row.aekoNum!=='0'">{{scope.row.aekoNum}}</div>
            </template>
            <template v-else>
              <div  @click="openViewPdf(scope.row)" class="table-link" v-if="scope.row.rsNum!=='0'">{{scope.row.rsNum}}</div>
            </template>
          </template>
        </tableList>
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
import tableList from "@/components/iTableSort";
import { tableSortMixins } from "@/components/iTableSort/tableSortMixins";
import buttonTableSetting from "@/components/buttonTableSetting";
import _ from 'lodash';
import Moment from 'moment';

export default {
  components: {
    SearchBlock, iTableList, iCard, iButton, iPagination,
    UnitExplain,icon,
    buttonTableSetting,
    tableList
  },

  mixins: [pageMixins, tableSortMixins],

  data(){
    return {
      allTableList: [],
      allTableHead,
      allTableLoading: false,
      selectTableList: [],
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
    goRsList(row){
      const roleList = this.$store.state.permission.userInfo;
      let transmitObj = {
          option: 4,
          aekoApprovalDetails: {
            linieId: row.linieId,
            aekoNum: row.aekoNum,
            requirementAekoId: row.requirementAekoId,
            aekoManageId: row.aekoManageId,
            workFlowDTOS:[]
          }
      }
      let routeData = this.$router.resolve({
        path: `/aeko/AEKOApprovalDetails`,
        query: {
          from:'aekodetail',
          key:"rsAeko",
          requirementAekoId: row.requirementAekoId,
          aekoManageId: row.aekoManageId,
          transmitObj: window.btoa(unescape(encodeURIComponent(JSON.stringify(transmitObj))))
        }
      })
      window.open(routeData.href, '_blank')
    },
    //  预览RSpdf
    openViewPdf(scope){
      if(scope.rsNum == 'AEKO RS单') {
        return
      }
      const roleList = this.$store.state.permission.userInfo.roleList;
      const isFlag = roleList.some(item => ['CWMJKZY','CWMJKZGZ','CWMJKZKZ'].includes(item.code));
      console.log('roleListroleListroleList', roleList, isFlag);
      const url = process.env.VUE_APP_TOOLING  + '/baCommodityApply' + '/exportRsFull/' + scope.rsNum + '?flag=' + !isFlag;
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