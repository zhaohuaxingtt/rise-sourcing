<template>
  <div v-permission="TOOLING_BUDGET_BUDGETAPPROVAL">
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
                :value="item.userID"
                :label="item.userName"
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
              start-placeholder="YYYY-MM-DD"
              end-placeholder="YYYY-MM-DD">
          </el-date-picker>
        </el-form-item>
      </el-form>
    </iSearch>
    <iCard>
      <div class="icardHeader">
        <div></div>
        <div>
          <iButton @click="approvalBtn" v-loading="saveLoading">{{ $t('LK_PIZHUAN') }}</iButton>
          <iButton @click="rejectShowBtn">{{ $t('LK_JUJUE') }}</iButton>
          <iButton @click="transferBtn">{{ $t('LK_ZHUANPAI') }}</iButton>
        </div>
      </div>
<!--      570-->
      <iTableList
          :tableData="tableListData"
          :tableTitle="tableTitle"
          :tableLoading="tableLoading"
          @handleSelectionChange="handleSelectionChange"
      >
        <template #rfqId="scope">
          <div class="linkStyle"><span @click="clickRfqId(scope.row.rfqId)">{{ scope.row.rfqId }}</span></div>
        </template>
        <template #categoryBudget="scope">
          <div class="linkStyle"><span @click="clickCategoryBudget(scope.row)">{{ scope.row.categoryBudget }}</span>
          </div>
        </template>
        <template #budgetApplyAmount="scope">
          <div class="linkStyle" :class="(Number(scope.row.budgetApplyAmount) > Number(scope.row.budgetLeftoverAmount)) && 'red'"><span
              @click="clickBudgetApplyAmountShow(scope.row.id)">{{ getTousandNum(scope.row.budgetApplyAmount) }}</span>
          </div>
        </template>
        <template #budgetLeftoverAmount="scope">
          <div>{{ getTousandNum(scope.row.budgetLeftoverAmount) }}</div>
        </template>
        <template #approvalStatus="scope">
          <div>
            <span>{{
                scope.row.approvalStatus === '1' ? '待审批' : (scope.row.approvalStatus === '2') ? '已通过' : '已拒绝'
              }}</span>
          </div>
        </template>
      </iTableList>
      <div style="color: #999999;font-size: 14px;text-align: right;margin: 10px 0;">{{ $t('货币：人民币  |  单位：元  |  不含税 ') }}</div>
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
        :RFQID="RFQID"
    ></RFQ>
    <budgetApplyAmount
        v-model="budgetApplyAmountShow"
        :RFQID="RFQID"
    ></budgetApplyAmount>
    <reject
        v-model="rejectShow"
        :multipleSelection="multipleSelection"
        @refresh="getTableListFn"
    ></reject>
    <transfer
        v-model="transferShow"
        :applyUserIdList="applyUserIdList"
        :multipleSelection="multipleSelection"
        @refresh="getTableListFn"
    ></transfer>
    <alertDialog
        v-model="alertShow"
        :redMultipleSelection="redMultipleSelection"
        :multipleSelection="multipleSelectionIds"
        @refresh="getTableListFn"
    ></alertDialog>
    <referenceCarProject
        v-model="referenceCarProjectShow"
        :title="参考车型项目"
        :referenceCarProjectParams="referenceCarProjectParams"
        :isApply="false"
        @refresh="getTableListFn"
    ></referenceCarProject>
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
  applyUserCombo, ratify,
} from "@/api/ws2/budgetApproval";
import {
  iTableList
} from '@/components'
import {form, budgetApprovalData} from "./components/data";
import RFQ from './components/RFQ'
import budgetApplyAmount from './components/budgetApplyAmount'
import reject from './components/reject'
import transfer from './components/transfer'
import alertDialog from './components/alert'
import referenceCarProject from '../budgetManagement/components/referenceCarProject'
import {pageMixins} from "@/utils/pageMixins";
import {tableHeight} from "@/utils/tableHeight";
import {getTousandNum} from "@/utils/tool";
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
    alertDialog,
    referenceCarProject
  },
  data() {
    return {
      leftModel: 'mouldInvestment',
      rightModel: 1,
      form: form,
      saveLoading: false,
      loadingiSearch: false,
      tableLoading: false,
      RFQShow: false,
      budgetApplyAmountShow: false,
      rejectShow: false,
      transferShow: false,
      alertShow: false,
      referenceCarProjectShow: false,
      carTypeList: [],
      approvalStatusList: [],
      applyUserIdList: [],
      tableListData: [],
      multipleSelection: [],
      multipleSelectionIds: [],
      redMultipleSelection: [],
      referenceCarProjectParams: {},
      tableTitle: budgetApprovalData,
      getTousandNum: getTousandNum
    }
  },
  created() {
    this.getModelProtitesPullDown()
  },
  methods: {
    clickRfqId(val) {
      this.RFQShow = true
      this.RFQID = val
    },
    clickCategoryBudget(row) {
      this.referenceCarProjectShow = true
      this.referenceCarProjectParams = {
        carTypeProId: '',
        categoryId: row.categoryId,
        sourceProjectId: row.tmCartypeProId
      }
    },
    clickBudgetApplyAmountShow(val) {
      this.budgetApplyAmountShow = true
      this.RFQID = val
    },
    async getModelProtitesPullDown() {
      for (let i in this.form) {
        this.form[i] = "";
      }
      this.loadingiSearch = true
      await Promise.all([carCombo(), statusCombo(), applyUserCombo()]).then((res) => {
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
              if(res.data.length > 0 && res.data[0].isHideColumn == 2){
                this.tableTitle = this.tableTitle.filter(item => item.props != 'categoryBudget' && item.props != 'budgetLeftoverAmount')
              }
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
      this.multipleSelectionIds = list.map(item => item.id)
    },
    approvalBtn() {
      if (this.multipleSelection.length == 0) {
        iMessage.warn('请先勾选')
        return
      }
      if (this.multipleSelection.some(item => item.approvalStatus == 2)){
        iMessage.warn('请勾选未审批的项目')
        return
      }
      if(this.multipleSelection.some(item => item.budgetApplyAmount > item.budgetLeftoverAmount)){
        let redMultipleSelection = []
        this.multipleSelection.map(item => {
          if(item.budgetApplyAmount > item.budgetLeftoverAmount){
            redMultipleSelection.push(item)
          }
        })
        this.redMultipleSelection = redMultipleSelection
        this.alertShow = true
        // this.iDialogLoading = true
      } else {
        this.saveLoading = true
        ratify({ids: this.multipleSelectionIds}).then((res) => {
          const result = this.$i18n.locale === 'zh' ? res.desZh : res.desEn
          if (Number(res.code) === 0) {
            iMessage.success(result);
            this.getTableListFn()
          } else {
            iMessage.error(result);
          }
          this.saveLoading = false
        }).catch(() => {
          this.saveLoading = false
        });
      }
    },
    transferBtn() {
      if (this.multipleSelection.length == 0) {
        iMessage.warn('请先勾选')
      } else if (this.multipleSelection.length >= 0) {
        this.transferShow = true
      }
    },
    rejectShowBtn() {
      if(this.multipleSelection.some(item => item.approvalStatus == 3)){
        iMessage.warn('选项中已有被拒绝的项')
        return
      }
      if (this.multipleSelection.length == 0) {
        iMessage.warn('请先勾选')
        return
      }
      this.rejectShow = true
    }
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
  &.red{
    span{
      color: #E30D0D;
      border-bottom: 1px solid #E30D0D;
    }
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