<!--
 * @Author: Luoshuang
 * @Date: 2021-06-23 15:37:22
 * @LastEditors: Luoshuang
 * @LastEditTime: 2021-06-30 15:00:02
 * @Description: 定点信息
 * @FilePath: \front-web\src\views\financialTargetPrice\targetPriceDetail\components\designateInfo.vue
-->

<template>
  <iCard title="定点信息" collapse class="margin-top20 designateInfo">
    <!------------------------------------------------------------------------>
    <!--                  搜索条件                                          --->
    <!------------------------------------------------------------------------>
    <iSearch :hiddenRight="true" class="designateSearch">
      <el-form>
        <el-form-item v-for="(item, index) in searchList" :key="index" :label="item.label">
          <iSelect v-if="item.type === 'select'" :filterable="item.filterable" v-model="searchParams[item.value]">
            <el-option value="" :label="$t('all')"></el-option>
            <el-option
              :value="item.code"
              :label="item.name"
              v-for="(item) in selectOptions[item.selectOption]"
              :key="item.code"
            ></el-option>
          </iSelect> 
          <iDatePicker v-else-if="item.type === 'dateRange'" type="daterange" v-model="searchParams[item.value]"></iDatePicker>
          <iInput v-else-if="item.type === 'input'" v-model="searchParams[item.value]"></iInput> 
          
        </el-form-item>
        <el-form-item class="searchBtns">
          <iButton @click="getTableList">确认</iButton>
          <iButton @click="reset">重置</iButton>
        </el-form-item>
      </el-form>
    </iSearch>
    <!------------------------------------------------------------------------>
    <!--                  表格                                              --->
    <!------------------------------------------------------------------------>
    <tableList :activeItems='"spnrNum"' selection indexKey :tableData="tableData" :tableTitle="tableTitle" :tableLoading="tableLoading" @handleSelectionChange="handleSelectionChange" @openPage="openPage"></tableList>
    <!------------------------------------------------------------------------>
    <!--                  表格分页                                          --->
    <!------------------------------------------------------------------------>
    <iPagination v-update @size-change="handleSizeChange($event, getTableList)" @current-change="handleCurrentChange($event, getTableList)" background :page-sizes="page.pageSizes"
      :page-size="page.pageSize"
      :layout="page.layout"
      :current-page="page.currPage"
      :total="page.totalCount"
    />
  </iCard>
</template>

<script>
import {iCard,iPagination,iButton,iInput,iSelect,iSearch,iDatePicker, iMessage} from 'rise'
import { designateSearchList, designateTableList } from '../data'
import tableList from '../../components/tableList'
import { pageMixins } from "@/utils/pageMixins"
import { getNomiRecords } from "@/api/financialTargetPrice/index"
import { getDictByCode } from '@/api/dictionary'
import { dictkey } from "@/api/partsprocure/editordetail"
export default {
  mixins: [pageMixins],
  components: {iCard,iPagination,iButton,tableList,iInput,iSelect,iSearch,iDatePicker},
  data() {
    return {
      tableTitle: designateTableList,
      tableData: [],
      tableLoading: false,
      searchList: designateSearchList,
      searchParams: {},
      selectOptions: {}
    }
  },
  props: {
    partProjId: {type:String}
  },
  watch: {
    partProjId:{
      handler(val) {
        if(val) {
          this.getTableList()
        }
      },
      immediate: true
     }
  },
  created() {
    this.getProcureGroup()
    this.getDicts()
  },
  methods: {
    reset() {
      this.searchParams = {}
    },
    getDicts() {
      getDictByCode('PRICE_STATE').then(res => {
        if(res?.result) {
          this.selectOptions = {
            ...this.selectOptions,
            PRICE_STATE: res.data[0]?.subDictResultVo || []
          }
        }
      })
    },
    /**
     * @Description: 获取下拉框
     * @Author: Luoshuang
     * @param {*}
     * @return {*}
     */    
    getProcureGroup() {
      dictkey().then((res) => {
        if (res.data) {
          this.selectOptions = {
            ...this.selectOptions,
            ...res.data
          }
        }
      });
    },
    getTableList() {
      this.tableLoading = true
      const params = {
        ...this.searchParams,
        current: this.page.currPage,
        size: this.page.pageSize,
        partProjId: this.partProjId
      }
      getNomiRecords(params).then(res => {
        if(res?.result) {
          this.page = {
            ...this.page,
            totalCount: Number(res.total),
            currPage: Number(res.pageNum),
            pageSize: Number(res.pageSize)
          }
          this.tableData = res.data
        } else {
          this.tableData = []
          iMessage.error(this.$i18n.locale === 'zh' ? res.desZh : res.desEn)
        }
      }).finally(() => {
        this.tableLoading = false
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.designateInfo {
  ::v-deep .iSearch-content .serch .el-form-item{
    &:nth-child(6n) {
      margin-right: 0;
    }
  }
  .designateSearch {
    box-shadow: unset;
    border-bottom: 1px solid rgba(27, 29, 33, 0.08);
    margin-bottom: 20px;
    ::v-deep .cardBody {
      padding-top: 0;
      padding-right: 0;
      padding-left: 0;
    }
    ::v-deep .el-form {
      position: relative;
      overflow: hidden;
      .el-form-item {
        margin-right: 4.125rem;
      }
      .searchBtns {
        position: absolute;
        right: 0;
        bottom: 0;
        margin-right: 0;
        text-align: right;
      }
    }
  }
  
}
</style>