<template>
  <div>
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
              :placeholder="$t('partsprocure.PLEENTER')"
              v-model="form['search.tmCartypeProId']"
              filterable
              clearable
          >
            <el-option
                :value="item.id"
                :label="item.carTypeProjectName"
                v-for="(item, index) in carTypeList"
                :key="index"
            ></el-option>
          </iSelect>
        </el-form-item>
        <el-form-item :label="$t('LK_LINGJIANHAO')">
          <iInput v-model="form['search.partsNum']" :placeholder="$t('LK_RFQPLEASEENTERQUERY')">
            <i slot="suffix" class="el-input__icon el-icon-search" @click="getTableListFn"></i>
          </iInput>
        </el-form-item>
        <el-form-item :label="$t('LK_RFQHAO')">
          <iInput v-model="form['search.rfqId']" :placeholder="$t('LK_RFQPLEASEENTERQUERY')">
            <i slot="suffix" class="el-input__icon el-icon-search" @click="getTableListFn"></i>
          </iInput>
        </el-form-item>
        <el-form-item :label="$t('LK_CAILIAOZU')">
          <iInput v-model="form['search.categoryName']" :placeholder="$t('LK_RFQPLEASEENTERQUERY')">
            <i slot="suffix" class="el-input__icon el-icon-search" @click="getTableListFn"></i>
          </iInput>
        </el-form-item>
        <el-form-item :label="$t('LK_YUSUANZHUANGTAI')">
          <iSelect
              :placeholder="$t('partsprocure.PLEENTER')"
              v-model="form['search.approvalStatus']"
              filterable
              clearable
          >
            <el-option
                :value="item.code"
                :label="item.zhMsg"
                v-for="(item, index) in approvalStatusList"
                :key="index"
            ></el-option>
          </iSelect>
        </el-form-item>
        <el-form-item :label="$t('LK_SHENQINGREN')">
          <iSelect
              :placeholder="$t('partsprocure.PLEENTER')"
              v-model="form['search.applyUserId']"
              filterable
              clearable
          >
            <el-option
                :value="item.linieID"
                :label="item.linieName"
                v-for="(item, index) in applyUserIdList"
                :key="index"
            ></el-option>
          </iSelect>
        </el-form-item>
        <el-form-item :label="$t('LK_SHENQINGSHIJIANQIZHI')">
          <el-date-picker
              v-model="form['search.timeStarEnd']"
              class="budgetApprovalDate"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item>
      </el-form>


    </iSearch>
    <iCard>
      <div class="icardHeader">
        <div></div>
        <div>
          <iButton @click="exportFile">{{ $t('LK_PIZHUAN') }}</iButton>
          <iButton @click="rejectShow = true">{{ $t('LK_JUJUE') }}</iButton>
          <iButton @click="transferShow = true">{{ $t('LK_ZHUANPAI') }}</iButton>
        </div>
      </div>
      <iTableList
          :height="tableHeight - 560"
          :tableData="tableListData"
          :tableTitle="tableTitle"
          :tableLoading="tableLoading"
          @handleSelectionChange="handleSelectionChange"
      >
        <template #rfqId="scope">
          <div class="linkStyle"><span @click="clickRfqId(scope.row.rfqId)">{{ scope.row.rfqId }}</span></div>
        </template>
        <template #approvalComments="scope">
          <div class="linkStyle"><span @click="clickRfqId(scope.row.rfqId)">{{ scope.row.approvalComments }}</span>
          </div>
        </template>
        <template #budgetLeftoverAmount="scope">
          <div class="linkStyle"><span @click="clickRfqId(scope.row.rfqId)">{{ scope.row.budgetLeftoverAmount }}</span>
          </div>
        </template>
        <template #budgetApplyAmount="scope">
          <div class="linkStyle"><span @click="clickBudgetApplyAmountShow(scope.row.budgetApplyAmount)">{{ scope.row.budgetApplyAmount }}</span>
          </div>
        </template>
        <template #approvalStatus="scope">
          <div class="linkStyle">
            <span @click="clickRfqId(scope.row.rfqId)">{{
                scope.row.approvalStatus === '1' ? '待审批' : (scope.row.approvalStatus === '2') ? '已通过' : '已拒绝'
              }}</span>
          </div>
        </template>
      </iTableList>
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
    <RFQ
        v-model="RFQShow"
        :RFQName="RFQName"
    ></RFQ>
    <budgetApplyAmount
        v-model="budgetApplyAmountShow"
        :RFQName="RFQName"
    ></budgetApplyAmount>
    <reject
        v-model="rejectShow"
        :RFQName="RFQName"
    ></reject>
    <transfer
        v-model="transferShow"
        :RFQName="RFQName"
    ></transfer>
  </div>
</template>

<script>
import {iCard, iSearch, iSelect, iPagination, iButton, iInput, iMessage} from 'rise';
import {excelExport} from '@/utils/filedowLoad'
import Moment from 'moment'
import {
  pageApproval,
  carCombo,
  statusCombo,
  userCombo,
} from "@/api/ws2/budgetApproval";
import {
  iTableList
} from "@/components"
import {form, budgetApprovalData} from "./components/data";
import RFQ from './components/RFQ'
import budgetApplyAmount from './components/budgetApplyAmount'
import reject from './components/reject'
import transfer from './components/transfer'
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
    RFQ,
    budgetApplyAmount,
    reject,
    transfer,
  },
  data() {
    return {
      leftModel: 'mouldInvestment',
      rightModel: 1,
      form: form,
      loadingiSearch: false,
      tableLoading: false,
      RFQShow: false,
      budgetApplyAmountShow: false,
      rejectShow: false,
      transferShow: false,
      carTypeList: [],
      approvalStatusList: [],
      applyUserIdList: [],
      tableListData: [],
      multipleSelection: [],
      tableTitle: budgetApprovalData,
    }
  },
  created() {
    this.getModelProtitesPullDown()
  },
  methods: {
    clickRfqId(val) {
      this.RFQShow = true
      this.RFQName = val
    },
    clickBudgetApplyAmountShow(val) {
      this.budgetApplyAmountShow = true
      this.RFQName = val
    },
    async getModelProtitesPullDown() {
      for (let i in this.form) {
        this.form[i] = "";
      }
      this.loadingiSearch = true
      await Promise.all([carCombo(), statusCombo(), userCombo()]).then((res) => {
        const result0 = this.$i18n.locale === 'zh' ? res[0].desZh : res[0].desEn
        const result1 = this.$i18n.locale === 'zh' ? res[1].desZh : res[1].desEn
        const result2 = this.$i18n.locale === 'zh' ? res[2].desZh : res[2].desEn
        if (res[0].data) {
          this.carTypeList = res[0].data;
        } else {
          iMessage.error(result0);
        }
        if (res[1].data) {
          this.approvalStatusList = res[1].data;
        } else {
          iMessage.error(result1);
        }
        if (res[2].data) {
          this.applyUserIdList = res[2].data;
        } else {
          iMessage.error(result2);
        }
        this.getTableListFn()
        this.loadingiSearch = false
      }).catch(() => {
        this.loadingiSearch = false
      });

    },
    getTableListFn() {
      this.tableLoading = true;
      let timeStarEnd = this.form['search.timeStarEnd']
      let params = {
        current: this.page.currPage,
        size: this.page.pageSize,
        tmCartypeProId: form['search.tmCartypeProId'],
        partsNum: form['search.partsNum'],
        rfqId: form['search.rfqId'],
        categoryName: form['search.categoryName'],
        approvalStatus: form['search.approvalStatus'],
        applyUserId: form['search.applyUserId'],
        startTime: timeStarEnd ? Moment(timeStarEnd[0]).format('YYYY-MM-DD') : '',
        endTime: timeStarEnd ? Moment(timeStarEnd[1]).format('YYYY-MM-DD') : '',
      }
      pageApproval(params)
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
.linkStyle {
  span {
    color: #1663F6;
    border-bottom: 1px solid #1663F6;
    cursor: pointer;
  }
}

.icardHeader {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.budgetApprovalDate::v-deep.el-range-editor.el-input__inner {
  width: 489px;

  .el-range-input {
    width: 50%;
  }
}
</style>