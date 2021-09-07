<!--
 * @Author: yz
 * @Date: 2021-04-21 17:24:15
-->
<template>
  <iDialog :title="$t(title)" :visible.sync="value" width="95%" top="5vh" @close='clearDiolog' z-index="1000" class="iDialogAdd">
    <div slot="title" class="title">
      <div class="text">{{ $t(title) }}</div>
    </div>
    <div class="changeContent">
      <iSearch
          :icon="false"
          :resetKey="PARTSPROCURE_RESET"
          :searchKey="PARTSPROCURE_CONFIRM"
          @sure="sure"
          @reset="reset"
          v-loading="iSearchLoading"
      >
        <el-form>
          <el-form-item :label="language('LK_LINGJIANHAO', '零件号')">
            <iInput v-model.trim="behalfPartsNum" :placeholder="language('LK_QINGSHURU', '请输入')" clearable></iInput>
          </el-form-item>
          <el-form-item :label="language('LK_XINDEAEKOHAO', 'AEKO号')">
            <iInput v-model="aekoNum" :placeholder="language('LK_QINGSHURU', '请输入')" clearable></iInput>
          </el-form-item>
          <el-form-item :label="language('LK_BMDANHAO', 'BM单号')">
            <iInput v-model="bmNum" :placeholder="language('LK_QINGSHURU', '请输入')" clearable></iInput>
          </el-form-item>
          <el-form-item :label="language('LK_SAPDINGDANHAO', 'SAP订单号')">
            <iInput v-model="sapOrder" :placeholder="language('LK_QINGSHURU', '请输入')" clearable></iInput>
          </el-form-item>
          <el-form-item :label="language('LK_RUZHANGDANHAO', '入账单号')">
            <iInput v-model="enterAccountNum" :placeholder="language('LK_QINGSHURU', '请输入')" clearable></iInput>
          </el-form-item>
          <el-form-item :label="language('LK_CHEXINGXIANGMU', '车型项目')">
            <iSelect
                class="multipleSelect"
                :placeholder="language('LK_QINGXUANZHE', '请选择')"
                filterable
                clearable
                collapse-tags
                multiple
                v-model="tmCartypeProId"
            >
              <el-option
                  :value="item.tmCartypeProId"
                  :label="item.tmCartypeProName"
                  v-for="(item, index) in CarTypePullDown"
                  :key="index"
              ></el-option>
            </iSelect>
          </el-form-item>
          <el-form-item :label="language('TPZS.GONGYINGSHANG', '供应商')">
            <iInput v-model="designatedSupplierId" :placeholder="language('LK_QINGSHURU', '请输入')" clearable></iInput>
          </el-form-item>
          <el-form-item :label="language('LK_KESHI', '科室')">
            <iSelect
                class="multipleSelect"
                :placeholder="language('LK_QINGXUANZHE', '请选择')"
                filterable
                clearable
                collapse-tags
                multiple
                v-model="deptId"
            >
              <el-option
                  :value="item.deptId"
                  :label="item.deptName"
                  v-for="(item, index) in DeptPullDown"
                  :key="index"
              ></el-option>
            </iSelect>
          </el-form-item>
          <el-form-item label="Linie">
            <iSelect
                class="multipleSelect"
                :placeholder="language('LK_QINGXUANZHE', '请选择')"
                filterable
                clearable
                collapse-tags
                multiple
                v-model="linieId"
            >
              <el-option
                  :value="item.linieId"
                  :label="item.linieName"
                  v-for="(item, index) in LiniePullDown"
                  :key="index"
              ></el-option>
            </iSelect>
          </el-form-item>
          <el-form-item :label="language('LK_MUJUTOUZIQINGDANZHUANGTAI', '模具投资清单状态')">
            <iSelect
                class="multipleSelect"
                :placeholder="language('LK_QINGXUANZHE', '请选择')"
                filterable
                clearable
                collapse-tags
                multiple
                v-model="moldInvestmentStatuses"
            >
              <el-option
                  :value="item.bmStatus"
                  :label="item.bmStatusName"
                  v-for="(item, index) in MoldInvestmentListStatusPullDown"
                  :key="index"
              ></el-option>
            </iSelect>
          </el-form-item>
        </el-form>
      </iSearch>
      <div v-loading="tableLoading">
        <iButton class="add" @click="initiateChange">{{ language('LK_FAQIBIANGENG', '发起变更') }}</iButton>
        <iTableList
            :tableData="tableListData"
            :tableTitle="tableTitle"
            :activeItems="'partNum'"
            @handleSelectionChange="handleSelectionChange"
        >
          <template #moldInvestmentAmount="scope">
            <div v-if="scope.row.isPremission">{{ getTousandNum(Number(scope.row.moldInvestmentAmount).toFixed(2)) }}</div>
            <div v-else>-</div>
          </template>
          <template #supplierShortNameZh="scope">
            <div v-if="scope.row.supplierShortNameZh">{{ scope.row.supplierCode + '-' + scope.row.supplierShortNameZh}}</div>
            <div v-else></div>
          </template>
        </iTableList>
        <div class="unitStyle">{{ $t('货币：人民币  |  单位：元  |  不含税 ') }}</div>

        <iPagination
            v-update
            @size-change="handleSizeChange($event, findBmNewChangePageList)"
            @current-change="handleCurrentChange($event, findBmNewChangePageList)"
            background
            :current-page="page.currPage"
            :page-sizes="page.pageSizes"
            :page-size="page.pageSize"
            :layout="page.layout"
            :total="page.totalCount"
        />
      </div>
    </div>
  </iDialog>
</template>
<script>
import {
  iButton,
  iDialog,
  iMessage,
  iSearch,
  iPagination,
  iInput,
  iSelect
} from 'rise'
import {
  iTableList
} from '@/components'
import {newChangeTitle, form} from "../components/data";
import {pageMixins} from "@/utils/pageMixins";
import {tableHeight} from "@/utils/tableHeight";
import {
  findAddColumnInvestmentBuild,
  saveList
} from "@/api/ws2/budgetManagement/edit";
import {
  bmNewChangeCarTypePullDown,
  bmViewDeptPullDown,
  bmViewLiniePullDown,
  bmViewMoldInvestmentListStatusPullDown,
  findBmNewChangePageList,
  addBmChangeList
} from "@/api/ws2/purchase/changeTask";
import {getTousandNum} from "@/utils/tool";

export default {
  mixins: [pageMixins, tableHeight],
  components: {
    iButton,
    iDialog,
    iSearch,
    iTableList,
    iPagination,
    iInput,
    iSelect,
  },
  props: {
    title: {type: String, default: 'LK_XUANZEBMXINZENGBIANGENG'},
    carTypeProId: {type: String, default: ''},
    sourceStatus: {type: String, default: ''},
    value: {type: Boolean},
    isInvestmentList: {type: Boolean, default: false},
    version: {type: String, default: ''},
    sourcePage: {type: String, default: ''},
  },
  data() {
    return {
      form: form,
      tableListData: [],
      tableTitle: newChangeTitle,
      tableLoading: false,
      iSearchLoading: false,
      multipleSelection: [],
      modelProtitesList: [],
      CarTypePullDown: [],
      DeptPullDown: [],
      LiniePullDown: [],
      MoldInvestmentListStatusPullDown: [],
      zhEnNo: '',
      materialName: '',
      mouldAttr: '',
      professionalDepartments: '',

      behalfPartsNum: '',
      aekoNum: '',
      bmNum: '',
      sapOrder: '',
      enterAccountNum: '',
      tmCartypeProId: [],
      designatedSupplierId: '',
      deptId: [],
      linieId: [],
      moldInvestmentStatuses: [],
      getTousandNum: getTousandNum
    }
  },
  mounted() {
    this.getSelected()
    this.findBmNewChangePageList()
  },
  methods: {
    getSelected() {
      this.iSearchLoading = true
      Promise.all([bmNewChangeCarTypePullDown(), bmViewDeptPullDown(), bmViewLiniePullDown(), bmViewMoldInvestmentListStatusPullDown()]).then((res) => {
        const result0 = this.$i18n.locale === 'zh' ? res[0].desZh : res[0].desEn
        const result1 = this.$i18n.locale === 'zh' ? res[1].desZh : res[1].desEn
        const result2 = this.$i18n.locale === 'zh' ? res[2].desZh : res[2].desEn
        const result3 = this.$i18n.locale === 'zh' ? res[3].desZh : res[3].desEn
        if (Number(res[0].code) === 0) {
          this.CarTypePullDown = res[0].data
        } else {
          iMessage.error(result0);
        }
        if (Number(res[1].code) === 0) {
          this.DeptPullDown = res[1].data
        } else {
          iMessage.error(result1);
        }
        if (Number(res[2].code) === 0) {
          this.LiniePullDown = res[2].data
        } else {
          iMessage.error(result2);
        }
        if (Number(res[3].code) === 0) {
          this.MoldInvestmentListStatusPullDown = res[3].data
        } else {
          iMessage.error(result3);
        }
        this.iSearchLoading = false
      })
    },
    handleSelectionChange(list) {
      this.multipleSelection = list.map(item => ({id: item.id, isPremission: item.isPremission}))
    },
    initiateChange() {
      if (this.multipleSelection.length == 0) {
        return iMessage.warn(
            this.language('LK_BAAPPLYTISP1', '请先勾选')
        );
      }
      this.tableLoading = true
      addBmChangeList(this.multipleSelection).then((res) => {
        const result = this.$i18n.locale === 'zh' ? res.desZh : res.desEn
        if (Number(res.code) === 0) {
          if(res.data.isPermission){
            this.findBmNewChangePageList()
            iMessage.success(result)
          } else {
            // iMessage.error(res.data.bmSerial.join(',') + this.language('LK_CHUYUBIANGENGLIUCHENGZHONG', '处于变更流程中，不可重复发起变更'))
            iMessage.error(result)
          }
        } else {
          // this.findBmNewChangePageList()
          iMessage.error(result)
        }
        this.tableLoading = false
      }).catch(err => {
        this.tableLoading = false
      })
    },
    findBmNewChangePageList() {
      this.tableLoading = true
      let parmars = {
        behalfPartsNum: this.behalfPartsNum,
        aekoNum: this.aekoNum,
        bmNum: this.bmNum,
        sapOrder: this.sapOrder,
        enterAccountNum: this.enterAccountNum,
        tmCartypeProId: this.tmCartypeProId,
        designatedSupplierId: this.designatedSupplierId,
        deptId: this.deptId,
        linieId: this.linieId,
        moldInvestmentStatuses: this.moldInvestmentStatuses,
        current: this.page.currPage,
        size: this.page.pageSize
      }
      findBmNewChangePageList(parmars).then((res) => {
        const result = this.$i18n.locale === 'zh' ? res.desZh : res.desEn
        if (Number(res.code) === 0) {
          this.page.currPage = res.pageNum;
          this.page.pageSize = res.pageSize;
          this.page.totalCount = res.total;
          this.tableListData = res.data;
        } else {
          iMessage.error(result);
        }
        this.tableLoading = false
      });
    },
    clearDiolog() {
      this.$emit('input', false)
    },
    sure() {
      this.findBmNewChangePageList()
    },
    reset() {
      this.behalfPartsNum = ''
      this.aekoNum = ''
      this.bmNum = ''
      this.sapOrder = ''
      this.enterAccountNum = ''
      this.tmCartypeProId = []
      this.designatedSupplierId = ''
      this.deptId = []
      this.linieId = []
      this.moldInvestmentStatuses = []
      this.findBmNewChangePageList()
    }
  },
  watch: {
    value(val) {
      if (val) {
        this.behalfPartsNum = ''
        this.aekoNum = ''
        this.bmNum = ''
        this.sapOrder = ''
        this.enterAccountNum = ''
        this.tmCartypeProId = []
        this.designatedSupplierId = ''
        this.deptId = []
        this.linieId = [this.$store.state.permission.userInfo.id + '']
        this.moldInvestmentStatuses = []
        this.findBmNewChangePageList()
      }
    }
  }
}
</script>
<style lang='scss' scoped>
.iDialogAdd.el-dialog__wrapper {
  overflow: hidden;
  ::v-deep .el-dialog{
    height: 90%;
    overflow-y: auto;
  }
}

.title {
  position: relative;
  display: inline-block;

  .text {
    font-size: 18px;
    font-weight: bold;
    line-height: 25px;
  }

  .star {
    position: absolute;
    right: -15px;
    top: 0;
    font-size: 30px;
    color: red;
  }
}

.changeContent {
  padding-bottom: 30px;

  ::v-deep .card {
    box-shadow: none;
    border-radius: 0;
    background: none;

    .cardBody {
      margin-top: 0;
      padding-top: 0;
      padding-left: 0;
      padding-right: 0;
    }

    .iSearch-content {
      border-bottom: 1px solid #E3E3E3;
      padding-bottom: 20px;
    }
  }

  .add {
    float: right;
    margin-bottom: 10px;
  }
}
</style>

