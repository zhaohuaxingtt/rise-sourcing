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
          <el-form-item :label="$t('LK_CAILIAOZUBIANHAOZHONGWENMINGDEWEN')">
            <iInput v-model="zhEnNo" :placeholder="$t('LK_QINGSHURU')" @keyup.enter.native="findAddColumnInvestmentBuild">
              <i slot="suffix" class="el-input__icon el-icon-search" @click="sure"></i>
            </iInput>
          </el-form-item>
          <el-form-item :label="$t('LK_LINJIANLIUWEIHAO')">
            <iInput v-model="materialName" :placeholder="$t('LK_QINGSHURU')" maxlength="6" @keyup.enter.native="findAddColumnInvestmentBuild">
              <i slot="suffix" class="el-input__icon el-icon-search" @click="sure"></i>
            </iInput>
          </el-form-item>
          <el-form-item :label="$t('LK_MOJUSHUXIN')">
            <iSelect
                :placeholder="$t('LK_QINGXUANZE')"
                v-model="mouldAttr"
                filterable
                clearable
                @change="sure"
            >
              <el-option
                  :value="item.modelProtitesName"
                  :label="item.modelProtitesName"
                  v-for="(item, index) in modelProtitesList"
                  :key="index"
              ></el-option>
            </iSelect>
            <!--            <iInput v-model="mouldAttr" placeholder="请输入查询" maxlength="5">-->
            <!--              <i slot="suffix" class="el-input__icon el-icon-search" @click="sure"></i>-->
            <!--            </iInput>-->
          </el-form-item>
          <el-form-item :label="$t('LK_ZHUANYEKESHI')">
            <iSelect
                :placeholder="$t('LK_QINGXUANZE')"
                v-model="professionalDepartments"
                filterable
                clearable
                @change="sure"
            >
              <el-option
                  :value="item.commodity"
                  :label="item.commodity"
                  v-for="(item, index) in DeptPullDown"
                  :key="index"
              ></el-option>
            </iSelect>
            <!--            <iInput v-model="form['search.professionalDepartments']" placeholder="请输入查询" maxlength="5">-->
            <!--              <i slot="suffix" class="el-input__icon el-icon-search" @click="sure"></i>-->
            <!--            </iInput>-->
          </el-form-item>
        </el-form>
      </iSearch>
      <div v-loading="tableLoading">
        <iButton class="add" @click="addList">{{ $t('LK_TIANJIA') }}</iButton>
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
import {addListInvestment, form} from "../components/data";
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
    title: {type: String, default: 'LK_TIANJIAHANG'},
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
      tableTitle: addListInvestment,
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

