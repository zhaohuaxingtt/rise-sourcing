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
            <iInput v-model.trim="partsNum" :placeholder="language('LK_QINGSHURU', '请输入')" clearable></iInput>
          </el-form-item>
          <el-form-item :label="language('LK_XINDEAEKOHAO', 'AEKO号')">
            <iInput v-model="partsNum" :placeholder="language('LK_QINGSHURU', '请输入')" clearable></iInput>
          </el-form-item>
          <el-form-item :label="language('LK_BMDANHAO', 'BM单号')">
            <iInput v-model="partsNum" :placeholder="language('LK_QINGSHURU', '请输入')" clearable></iInput>
          </el-form-item>
          <el-form-item :label="language('LK_SAPDINGDANHAO', 'SAP订单号')">
            <iInput v-model="partsNum" :placeholder="language('LK_QINGSHURU', '请输入')" clearable></iInput>
          </el-form-item>
          <el-form-item :label="language('LK_RUZHANGDANHAO', '入账单号')">
            <iInput v-model="partsNum" :placeholder="language('LK_QINGSHURU', '请输入')" clearable></iInput>
          </el-form-item>
          <el-form-item :label="language('LK_CHEXINGXIANGMU', '车型项目')">
            <iSelect
                class="multipleSelect"
                :placeholder="language('LK_QINGXUANZHE', '请选择')"
                filterable
                clearable
                collapse-tags
                multiple
                v-model="carTypeProject"
            >
              <el-option
                  :value="item.id"
                  :label="item.carTypeProjectName"
                  v-for="(item, index) in carTypeProjectList"
                  :key="index"
              ></el-option>
            </iSelect>
          </el-form-item>
          <el-form-item :label="language('TPZS.GONGYINGSHANG', '供应商')">
            <iInput v-model="supplier" :placeholder="language('LK_QINGSHURU', '请输入')" clearable></iInput>
          </el-form-item>
          <el-form-item :label="language('LK_KESHI', '科室')">
            <iSelect
                class="multipleSelect"
                :placeholder="language('LK_QINGXUANZHE', '请选择')"
                filterable
                clearable
                collapse-tags
                multiple
                v-model="department"
            >
              <el-option
                  :value="item.deptId"
                  :label="item.commodity"
                  v-for="(item, index) in departmentsList"
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
                v-model="linieName"
            >
              <el-option
                  :value="item.linieID"
                  :label="item.linieName"
                  v-for="(item, index) in linieList"
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
                v-model="moldInvestmentStatus"
            >
              <el-option
                  :value="item.code"
                  :label="item.zhMsg"
                  v-for="(item, index) in moldInvestmentStatusList"
                  :key="index"
              ></el-option>
            </iSelect>
          </el-form-item>
        </el-form>
      </iSearch>
      <div v-loading="tableLoading">
        <iButton class="add" @click="addList">{{ language('LK_FAQIBIANGENG', '发起变更') }}</iButton>
        <iTableList
            :height="tableHeight - 420"
            :tableData="tableListData"
            :tableTitle="tableTitle"
            :activeItems="'partNum'"
            @handleSelectionChange="handleSelectionChange"
        >
<!--          <template #linie="scope">-->
<!--            <div>{{ $i18n.locale == 'zh' ? scope.row.linie : (Math.random() > 0.5 ? 'Cui zhiwei' : 'Mu zengzhi') }}</div>-->
<!--          </template>-->
        </iTableList>
        <div class="unitStyle">{{ $t('货币：人民币  |  单位：元  |  不含税 ') }}</div>

        <iPagination
            v-update
            @size-change="handleSizeChange($event, findAddColumnInvestmentBuild)"
            @current-change="handleCurrentChange($event, findAddColumnInvestmentBuild)"
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
  getModelProtitesPullDown,
  investmentSave,
  proDeptPullDown
} from "@/api/ws2/budgetManagement/investmentList";

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
      DeptPullDown: [],
      zhEnNo: '',
      materialName: '',
      mouldAttr: '',
      professionalDepartments: '',
    }
  },
  mounted() {
    this.getSelected()
    this.findAddColumnInvestmentBuild()
  },
  methods: {
    getSelected() {
      this.iSearchLoading = true
      Promise.all([getModelProtitesPullDown(), proDeptPullDown()]).then((res) => {
        const result0 = this.$i18n.locale === 'zh' ? res[0].desZh : res[0].desEn
        const result1 = this.$i18n.locale === 'zh' ? res[1].desZh : res[1].desEn
        if (Number(res[0].code) === 0) {
          this.modelProtitesList = res[0].data
        } else {
          iMessage.error(result0);
        }
        if (Number(res[1].code) === 0) {
          this.DeptPullDown = res[1].data
        } else {
          iMessage.error(result1);
        }
        this.iSearchLoading = false
      })
    },
    handleSelectionChange(list) {
      this.multipleSelection = list.map(item => {
        item.cartypeProId = this.carTypeProId
        return item
      })
    },
    addList() {
      if (this.multipleSelection.length == 0) {
        return iMessage.warn(
            this.$t(
                "请先勾选"
            )
        );
      }
      this.tableLoading = true
      let promiseName = this.isInvestmentList ? investmentSave : saveList
      promiseName(this.multipleSelection.map(item => {
        item.sourceStatus = this.sourceStatus
        item.listVerisonId = this.version
        return item
      })).then((res) => {
        const result = this.$i18n.locale === 'zh' ? res.desZh : res.desEn
        if (Number(res.code) === 0) {
          this.$emit('input', false)
          this.$emit('updateTable')
        }
        this.tableLoading = false
        return iMessage.success(result)
      }).catch(err => {
        this.tableLoading = false
      })
    },
    findAddColumnInvestmentBuild() {
      this.tableLoading = true
      if (!this.sourceStatus) {
        this.tableLoading = true
        return
      }
      let parmars = {
        carTypeProId: this.carTypeProId,
        sourceStatus: this.sourceStatus,
        commodity: this.professionalDepartments,
        materialName: this.zhEnNo,
        partNum: this.materialName,
        modelType: this.mouldAttr,
        listVerisonId: this.version,
        sourcePage: this.sourcePage,
        current: this.page.currPage,
        size: this.page.pageSize
      }
      findAddColumnInvestmentBuild(parmars).then((res) => {
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
      this.findAddColumnInvestmentBuild()
    },
    reset() {
      this.zhEnNo = ''
      this.materialName = ''
      this.mouldAttr = ''
      this.professionalDepartments = ''
    }
  },
  watch: {
    value(val) {
      if (val) {
        this.zhEnNo = ''
        this.materialName = ''
        this.mouldAttr = ''
        this.professionalDepartments = ''
        this.findAddColumnInvestmentBuild()
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

