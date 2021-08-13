<template>
  <div v-permission="TOOLING_DATABASE_SUMMARY">
    <iSearch
        class="margin-bottom20 giSearch"
        style="margin-top: 20px"
        @sure="getTableListFn"
        @reset="reset"
        :icon="false"
        :resetKey="PARTSPROCURE_RESET"
        :searchKey="PARTSPROCURE_CONFIRM"
        v-loading="loadingiSearch"
    >
      <el-form>
        <el-form-item :label="$t('LK_CHEXINXIANGMU')">
          <iSelect
              class="multipleSelect"
              :placeholder="$t('partsprocure.PLEENTER')"
              v-model="form['search.tmCartypeProId']"
              filterable
              clearable
              collapse-tags
              multiple
          >
            <el-option
                :value="item.id"
                :label="item.cartypeNname"
                v-for="(item, index) in carTypeList"
                :key="index"
            ></el-option>
          </iSelect>
        </el-form-item>
        <el-form-item :label="$t('LK_CAILIAOZU')">
          <iInput v-model="categoryName" :placeholder="$t('LK_RFQPLEASEENTERQUERY')">
            <i slot="suffix" class="el-input__icon el-icon-search" @click="getTableListFn"></i>
          </iInput>
        </el-form-item>
        <el-form-item :label="$t('LK_LINGJIANHAO')">
          <iInput v-model="form['search.partNum']" :placeholder="$t('LK_RFQPLEASEENTERQUERY')">
            <i slot="suffix" class="el-input__icon el-icon-search" @click="getTableListFn"></i>
          </iInput>
        </el-form-item>
<!--        <el-form-item :label="$t('LK_LINGJIANMINGCHENG')">-->
<!--          <iInput v-model="form['search.partNameZh']" :placeholder="$t('LK_RFQPLEASEENTERQUERY')">-->
<!--            <i slot="suffix" class="el-input__icon el-icon-search" @click="getTableListFn"></i>-->
<!--          </iInput>-->
<!--        </el-form-item>-->
      </el-form>


    </iSearch>
    <iCard>
      <div class="icardHeader">
        <div></div>
        <iButton @click="exportFile">{{ $t('LK_DAOCHU') }}</iButton>
      </div>
<!--      550-->
      <iTableList
          :tableData="tableListData"
          :tableTitle="tableTitle"
          :tableLoading="tableLoading"
          @handleSelectionChange="handleSelectionChange"
      >
      </iTableList>
      <div class="unitStyle">{{ $t('货币：人民币  |  单位：元  |  不含税 ') }}</div>
      <iPagination
          v-update
          @size-change="handleSizeChange($event, getTableListFn)"
          @current-change="handleCurrentChange($event, getTableListFn)"
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
import {iCard, iSearch, iSelect, iPagination, iButton, iInput, iMessage} from 'rise';
import { excelExport } from '@/utils/filedowLoad'
import {
  getInvestmentHistoryMaterial
} from "@/api/ws2/dataBase";
import {
  iTableList
} from "@/components"
import {form, summaryData} from "../components/data";
import {pageMixins} from "@/utils/pageMixins";
import {tableHeight} from "@/utils/tableHeight";
import {
  getCartypePulldown,
} from "@/api/ws2/budgetManagement/edit";


export default {
  mixins: [pageMixins, tableHeight],
  components: {
    iCard,
    iSearch,
    iSelect,
    iTableList,
    iPagination,
    iButton,
    iInput,
  },
  props: {
    categoryNameZh: {type: String, default: ''},
  },
  data() {
    return {
      leftModel: 'mouldInvestment',
      rightModel: 1,
      form: form,
      loadingiSearch: false,
      tableLoading: false,
      carTypeList: [],
      tableListData: [],
      multipleSelection: [],
      tableTitle: summaryData,
      categoryName: '',

    }
  },
   created() {
    this.categoryName = this.categoryNameZh
    this.page.pageSizes = [10, 20, 50, 100, 300]
    this.getModelProtitesPullDown()
  },
  methods: {
    async getModelProtitesPullDown() {
      for (let i in this.form) {
        this.form[i] = "";
      }
      this.loadingiSearch = true
      await Promise.all([getCartypePulldown()]).then((res) => {
        const result0 = this.$i18n.locale === 'zh' ? res[0].desZh : res[0].desEn
        if (res[0].data) {
          this.carTypeList = res[0].data;
        } else {
          iMessage.error(result0);
        }
        this.getTableListFn()
        this.loadingiSearch = false
      }).catch(() => {
        this.loadingiSearch = false
      });

    },
    getTableListFn() {
      this.tableLoading = true;
      let params = {
        current: this.page.currPage,
        size: this.page.pageSize,
        tmCartypeProIds: form['search.tmCartypeProId'],
        categoryName: this.categoryName,
        partNum: form['search.partNum'],
        // partNameZh: form['search.partNameZh'],
      }
      getInvestmentHistoryMaterial(params)
          .then((res) => {
            const result = this.$i18n.locale === 'zh' ? res.desZh : res.desEn
            if (Number(res.code) === 0) {
              this.page.currPage = res.pageNum;
              this.page.pageSize = res.pageSize;
              this.page.totalCount = res.total;
              this.tableListData = res.data;
            } else {
              iMessage.error(result)
            }
            this.tableLoading = false;
          }).catch(() => (this.tableLoading = false));
    },
    reset() {
      for (let i in this.form) {
        this.form[i] = "";
      }
      this.form['search.tmCartypeProId'] = []
      this.getTableListFn()
    },
    handleSelectionChange(list) {
      this.multipleSelection = list
    },
    exportFile() {
      if (!this.multipleSelection.length) return iMessage.warn(this.$t('请先选择'))
      excelExport(this.multipleSelection, this.tableTitle, '材料组汇总')
    },
  }
}
</script>

<style scoped lang="scss">
.icardHeader {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}
.multipleSelect{
  ::v-deep .el-tag{
    max-width: calc(100% - 65px);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
</style>