<template>
  <div class="generateInvestmentList" v-permission="TOOLING_BUDGET_BUILD">
    <iSearch
        class="margin-bottom20 giSearch"
        style="margin-top: 20px"
        @sure="sure"
        @reset="reset"
        :icon="false"
        :resetKey="PARTSPROCURE_RESET"
        :searchKey="PARTSPROCURE_CONFIRM"
        v-loading="loadingiSearch"
    >
      <el-form>
        <el-form-item :label="$t('LK_CHEXINXIANGMU')">
          <iSelect
              :placeholder="$t('partsprocure.PLEENTER')"
              v-model="form['cartypeProjectId']"
              filterable
              @change="changeCarTypeProject"
              ref="carTypeProjectRef"
          >
            <div class="addCarTypeProject">
              <iInput v-model="addCarTypeProject" placeholder="请输入自定义名称"></iInput>
              <iButton @click="handleAddCarTypeProject" v-loading="iDialogAddCarTypeProject">{{ $t('LK_QUEREN') }}</iButton>
            </div>
            <el-option
                :value="item.id"
                :label="item.cartypeNname"
                v-for="(item, index) in fromGroup"
                :key="index"
            ></el-option>
          </iSelect>
        </el-form-item>
        
      </el-form>
      <div class="searchSure">
        <!-- <iButton @click="saveAddCarType" :disabled="carTypeProjectObj.isBudget == 3" v-loading="addCarTypeLoading">{{ $t('LK_QUEREN') }}</iButton> -->
      </div>
    </iSearch>

    <iCard>
      <iTableList
          :height="tableHeight - 440"
          :tableData="tableListData"
          :tableTitle="tableTitle"
          :tableLoading="tableLoading"
          @handleSelectionChange="handleSelectionChange"
          :activeItems="'partNum'"
      >
        <template #carTypeProjectName="scope">
          <a class="table-a" href="javascript: ;" @click="jumpDetails(scope)">{{scope.row.carTypeProjectName}}</a>
        </template>
      </iTableList>
      <iPagination
            v-update
            @size-change="handleSizeChange($event, findCarTypeList)"
            @current-change="handleCurrentChange($event, findCarTypeList)"
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
import { indexFrom, indexTableHead } from "./components/data";
import { getCartypePulldown, saveCustomCart } from "@/api/ws2/budgetManagement/edit";
import { findCarTypeList } from "@/api/ws2/baApply";
import { tableHeight } from "@/utils/tableHeight";
import { pageMixins } from "@/utils/pageMixins";
import {
  iTableList
} from "@/components"

import {
  iButton,
  iCard,
  iMessage,
  iSearch,
  iInput,
  iSelect,
  iPagination
} from "rise";

export default {
  mixins: [tableHeight, pageMixins],
  components: {
    iButton,
    iCard,
    iSearch,
    iInput,
    iSelect,
    iTableList,
    iPagination,
  },
  data(){
    return {
      loadingiSearch: false,
      addCarTypeProject: '',
      form: indexFrom,
      iDialogAddCarTypeProject: false,
      fromGroup: [],
      tableListData: [],
      tableTitle: indexTableHead,
      tableLoading: false,
      selectTableData: [],
      page: {
        currPage: 1,
        pageSize: 10,
      }
    }
  },

  created(){
    this.getPageData();
    this.findCarTypeList();
  },

  methods: {

    findCarTypeList(){
      this.tableLoading = true;
      const param = {
        ...this.form,
        current: this.page.currPage,
        size: this.page.pageSize
      }
      findCarTypeList(param).then(res => {
        const result = this.$i18n.locale === 'zh' ? res.desZh : res.desEn;
        if(res.data){
          this.tableListData = res.data;
          this.page.currPage = ~~res.pageNum;
          this.page.pageSize = ~~res.pageSize;
          this.page.totalCount = ~~res.total;
        }else{
          iMessage.error(result);
        }
        this.tableLoading = false;
      }).catch(err => {
        this.tableLoading = false;
      })
    },

    //  跳转详情
    jumpDetails(scope){
      this.$router.push({name: 'toolingModelDetails', params: {id: scope.row.tmCartypeProId}})
    },

    handleSelectionChange(val) {
      this.selectTableData = val;
    },

    handleAddCarTypeProject(){
      if (!this.addCarTypeProject) {
        return iMessage.warn('请先输入车型名称');
      }
      if (this.fromGroup.some(item => item.cartypeNname == ('自定义-' + this.addCarTypeProject))){
        return iMessage.warn('已有车型名称，请重新输入');
      }

      this.iDialogAddCarTypeProject = true;
      saveCustomCart({cartypeProjectName: this.addCarTypeProject}).then(res => {
        const result = this.$i18n.locale === 'zh' ? res.desZh : res.desEn;
        if (~~res.code === 0){
          iMessage.success(result);
          this.addCarTypeProject = '';
          this.$refs.carTypeProjectRef.blur();
        }else{
          iMessage.error(result);
        }
        this.iDialogAddCarTypeProject = false;
      }).catch(err => {
        this.iDialogAddCarTypeProject = false;
      })

    },

    getPageData(){
      this.loadingiSearch = true;
      Promise.all([getCartypePulldown()]).then(res => {
        const result0 = this.$i18n.locale === 'zh' ? res[0].desZh : res[0].desEn;

        if(res[0].data){
          this.fromGroup = res[0].data;
        }else{
          iMessage.error(result0);
        }

        this.loadingiSearch = false;
      }).catch(err => {
        this.loadingiSearch = false;
      })
    },

    sure(){
      console.log('form', this.form);
      this.findCarTypeList();
    },

    reset(){
      this.form['cartypeProjectId'] = '';
      this.page.currPage = 1;
      this.page.pageSize = 10;
      this.findCarTypeList();
    },


    changeCarTypeProject(){
      this.findCarTypeList();
    },
  }
}
</script>

<style lang="scss" scoped>
.table-a{
  color: #1663F6;
  text-decoration: underline;
  font-family: Arial;
  font-style: italic;
}
.addCarTypeProject {
  margin-bottom: 5px;
  padding: 0 10px;

  ::v-deep .el-input {
    width: calc(100% - 110px);
  }

  ::v-deep .el-button {
    width: 100px;
    margin-left: 10px;
  }
}
</style>