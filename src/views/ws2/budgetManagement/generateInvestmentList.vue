<!--
 * @Author: yz
 * @Date: 2021-02-25 09:50:42
 * @Description: 生成投资清单。
-->
<template>
  <div class="generateInvestmentList" v-permission="TOOLING_BUDGET_BUILD">
    <div>
      <!------------------------------------------------------------------------>
      <!--                  search 搜索模块                                   --->
      <!------------------------------------------------------------------------>
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
                v-model="form['search.carTypeProject']"
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
          <el-form-item :label="$t('LK_XIANGMULEIXIN')">
            <iSelect
                :placeholder="$t('partsprocure.PLEENTER')"
                v-model="form['search.projectType']"
                :disabled="carTypeProjectDisabled"
            >
              <el-option
                  :value="item.projectTypeId"
                  :label="item.projectTypeName"
                  v-for="(item, index) in projectTypeList"
                  :key="index"
              >
              </el-option>
            </iSelect>
          </el-form-item>
          <el-form-item :label="$t('LK_DINGDIANLEIXIN')">
            <iSelect
                :placeholder="$t('partsprocure.PLEENTER')"
                v-model="form['search.fixedPointType']"
                :disabled="carTypeProjectDisabled"
            >
              <el-option
                  :value="item.fixedPointId"
                  :label="item.fixedPointName"
                  v-for="(item, index) in fixedPointTypeList"
                  :key="index"
              >
              </el-option>
            </iSelect>
          </el-form-item>
          <el-form-item label="燃料类型">
            <iSelect
                :placeholder="$t('partsprocure.PLEENTER')"
                v-model="form['search.modelCategory']"
                :disabled="carTypeProjectDisabled"
            >
              <el-option
                  :value="item.carTypeId"
                  :label="item.carTypeName"
                  v-for="(item, index) in modelCategoryList"
                  :key="index"
              >
              </el-option>
            </iSelect>
          </el-form-item>
        </el-form>
        <div class="searchSure">
          <iButton @click="saveAddCarType" :disabled="carTypeProjectObj.isBudget == 3" v-loading="addCarTypeLoading">{{ $t('LK_QUEREN') }}</iButton>
<!--          <iButton @click="sure">查询</iButton>-->
<!--          <iButton @click="reset">重置</iButton>-->
        </div>
      </iSearch>
      <iCard>
        <!------------------------------------------------------------------------>
        <!--                  table模块，向外入参表格数据，表头                    --->
        <!------------------------------------------------------------------------>
        <div class="header margin-bottom20">
          <div class="search">
            {{ $t('LK_CAILIAOZUBIANHAOZHONGWENMINGDEWEN') }}:
            <iInput v-model="form['search.materialName']" :placeholder="$t('LK_QINGSHURU')">
              <i slot="suffix" class="el-input__icon el-icon-search" @click="sure"></i>
            </iInput>
            {{ $t('LK_LINJIANLIUWEIHAO') }}:
            <iInput v-model="form['search.partNum']" :placeholder="$t('LK_RFQPLEASEENTERQUERY')" maxlength="6">
              <i slot="suffix" class="el-input__icon el-icon-search" @click="sure"></i>
            </iInput>
          </div>
          <div>
            <iButton @click="addRow" :disabled="(form['search.carTypeProject'] == '') || carTypeProjectObj.isBudget == 3">{{ $t('LK_TIANJIAHANG') }}</iButton>
            <iButton @click="deleteIRow" :disabled="(form['search.carTypeProject'] == '') || carTypeProjectObj.isBudget == 3">{{ $t('LK_SHANCHUHANG') }}</iButton>
            <iButton @click="referenceModelShow = true" :disabled="(form['search.carTypeProject'] == '') || carTypeProjectObj.isBudget == 3">{{ $t('LK_CANKAOCHEXIN') }}</iButton>
            <!--                <iButton @click="saveRow" :disabled="(form['search.carTypeProject'] == '')">保存</iButton>-->
<!--            <iButton @click="investmentList" :disabled="(form['search.carTypeProject'] == '')">下一步</iButton>-->
          </div>
        </div>
<!--        440-->
        <iTableList
            :tableData="tableListData"
            :tableTitle="tableTitle"
            :tableLoading="tableLoading"
            @handleSelectionChange="handleSelectionChange"
            :activeItems="'partNum'"
        >
          <template #newLinieName="scope">
            <Popover
                v-if="scope.row.newLinieName"
                placement="top-start"
                :content="scope.row.linie"
                trigger="hover">
              <div slot="reference">{{ scope.row.newLinieName }}</div>
            </Popover>
            <div v-else>{{ scope.row.linie }}</div>
          </template>
        </iTableList>
        <!------------------------------------------------------------------------>
        <!--                  表格分页                                          --->
        <!------------------------------------------------------------------------>
        <!--            <iPagination-->
        <!--                v-update-->
        <!--                @size-change="handleSizeChange($event, getTableListFn)"-->
        <!--                @current-change="handleCurrentChange($event, getTableListFn)"-->
        <!--                background-->
        <!--                :current-page="page.currPage"-->
        <!--                :page-sizes="page.pageSizes"-->
        <!--                :page-size="page.pageSize"-->
        <!--                :layout="page.layout"-->
        <!--                :total="page.totalCount"-->
        <!--            />-->
      </iCard>
    </div>
    <!------------------------------------------------------------------------>
    <!--            新增行以及c参考车型模态框                                  --->
    <!------------------------------------------------------------------------>
    <addRow
        v-model="addRowShow"
        :carTypeProId="form['search.carTypeProject']"
        :sourceStatus="carTypeProjectObj.sourceStatus"
        @updateTable="getTableListFn"
    ></addRow>
    <referenceModel
        v-model="referenceModelShow"
        :carTypeProId="form['search.carTypeProject']"
        :sourceStatus="carTypeProjectObj.sourceStatus"
        :carType="this.fromGroup"
        @updateTable="getTableListFn"
    ></referenceModel>
  </div>
</template>
<script>
import {
  iButton,
  iCard,
  iMessage,
  iSearch,
  iInput,
  iSelect,
} from "rise";
import {
  iTableList
} from '@/components'
import {pageMixins} from "@/utils/pageMixins";
import {tableHeight} from "@/utils/tableHeight";
import {budgetManagementData, form} from "./components/data";
import addRow from "./components/addRow";
import referenceModel from "./components/referenceModel";
import {
  findInvestmentBuild,
  getCartypePulldown,
  findProjectTypeDetailPulldown,
  findProjectDetailById,
  saveCustomCart,
  deleteList,
  updateBuildInvestment,
  ConfirmCustomerCarTypeSelect,
  saveInvestBuildBottom,
} from "@/api/ws2/budgetManagement/edit";
import filters from "@/utils/filters";
import {Popover} from "element-ui"

export default {
  mixins: [pageMixins, filters, tableHeight],
  props: {

  },
  components: {
    iButton,
    iCard,
    iTableList,
    iSearch,
    iInput,
    iSelect,
    addRow,
    referenceModel,
    Popover
  },
  data() {
    return {
      tableLoading: false,
      addCarTypeLoading: false,
      loadingiSearch: false,

      addRowShow: false,
      referenceModelShow: false,
      carTypeProjectDisabled: false,

      carType: '',
      params: {},
      carTypeProjectObj: {},
      fixedPointTypeList: [],
      modelCategoryList: [],
      projectTypeList: [],
      addCarTypeProject: '',
      iDialogAddCarTypeProject: '',
      tableListData: [],
      tableTitle: budgetManagementData,
      selectTableData: [],
      form: form,
      fromGroup: [],
    };
  },
  created() {
    this.$store.commit('SET_budgetManagement', {
      carTypeProject: '',
      sourceStatus: ''
    });
    this.$store.commit('SET_nextStep', true);
    this.params = this.$route.query
    this.getProcureGroup();
  },
  methods: {
    handleAddCarTypeProject() {
      if (!this.addCarTypeProject) {
        iMessage.warn('请先输入车型名称');
        return
      }
      if (this.fromGroup.some(item => item.cartypeNname == ('自定义-' + this.addCarTypeProject))){
        iMessage.warn('已有车型名称，请重新输入');
        return
      }
      this.iDialogAddCarTypeProject = true
      saveCustomCart({cartypeProjectName: this.addCarTypeProject}).then((res) => {
        const result = this.$i18n.locale === 'zh' ? res.desZh : res.desEn
        if (Number(res.code) === 0) {
          iMessage.success(result);
          this.addCarTypeProject = ''
          this.addAialog = false
          this.params.id = res.data.id
          this.params.sourceStatus = res.data.sourceStatus
          // 隐藏下拉框
          this.$refs.carTypeProjectRef.blur()
          this.getProcureGroup();
        } else {
          iMessage.error(result);
        }
        this.iDialogAddCarTypeProject = false
      }).catch(() => {
        this.iDialogAddCarTypeProject = false
      });
    },
    addRow() {
      this.addRowShow = true
    },
    deleteIRow() {
      if (this.selectTableData.length == 0) {
        iMessage.warn('请先勾选');
        return
      }
      this.tableLoading = true
      deleteList(this.selectTableData.map(item => ({id: item.id, isDelete: 2}))).then((res) => {
        const result = this.$i18n.locale === 'zh' ? res.desZh : res.desEn
        if (Number(res.code) === 0) {
          this.getTableListFn()
          iMessage.success(result);
        } else {
          iMessage.error(result);
          this.tableLoading = false
        }
      }).catch(() => {
        this.tableLoading = false
      });
    },
    saveRow() {
      if (this.selectTableData.length == 0) {
        iMessage.warn('请先勾选');
        return
      }
      if (this.selectTableData.length > 1) {
        iMessage.warn('只能勾选保存一行数据');
        return
      }
      this.tableLoading = true
      updateBuildInvestment(this.selectTableData[0]).then((res) => {
        const result = this.$i18n.locale === 'zh' ? res.desZh : res.desEn
        if (Number(res.code) === 0) {
          this.getTableListFn()
          iMessage.success(result);
        } else {
          iMessage.error(result);
          this.tableLoading = false
        }
      }).catch(() => {
        this.tableLoading = false
      });
    },
    investmentList() {
      if(this.tableListData.length == 0){
        iMessage.warn('请先添加行');
        return
      }
      // this.$emit('toinvestmentList', {id: this.form['search.carTypeProject'], sourceStatus: this.params.sourceStatus, carType: this.carTypeProjectObj.sourceStatus})
      // return
      saveInvestBuildBottom({
        id: this.form['search.carTypeProject'],
        sourceStatus: this.carTypeProjectObj.sourceStatus
      }).then((res) => {
        const result = this.$i18n.locale === 'zh' ? res.desZh : res.desEn
        if (Number(res.code) === 0) {
          iMessage.success(result);
          this.$emit('toinvestmentList', {
            id: this.form['search.carTypeProject'],
            sourceStatus: this.carTypeProjectObj.sourceStatus,
            step: 2
          })
        } else {
          iMessage.error(result);
          this.tableLoading = false
        }
      }).catch(() => {
        this.tableLoading = false
      });
    },
    changeCarTypeProject(val) {
      if (!val || val == 'add') {
        return
      }
      this.loadingiSearch = true
      this.carTypeProjectObj = this.fromGroup.find(item => item.id == val)
      this.$store.commit('SET_budgetManagement', {
        carTypeProject: this.carTypeProjectObj.id,
        sourceStatus: this.carTypeProjectObj.sourceStatus
      });
      this.params.id = this.carTypeProjectObj.id
      this.$store.commit('SET_isBudget', this.carTypeProjectObj.isBudget);
      let sourceStatus = this.carTypeProjectObj.sourceStatus
      this.carTypeProjectDisabled = sourceStatus == '1' ? true : false
      findProjectDetailById({id: val, sourceStatus: sourceStatus}).then((res) => {
        const result = this.$i18n.locale === 'zh' ? res.desZh : res.desEn
        if (res.data) {
          if (sourceStatus == 1) {
            let projectType = this.projectTypeList.find(item => item.projectTypeName == res.data.projectTypeName)
            let fixedPointType = this.projectTypeList.find(item => item.projectTypeName == res.data.projectTypeName)
            let modelCategory = this.projectTypeList.find(item => item.projectTypeName == res.data.projectTypeName)
            this.form['search.projectType'] = res.data.projectTypeName ? (projectType ? projectType.projectTypeId : '') : ''
            this.form['search.fixedPointType'] = res.data.fixedPointName ? (fixedPointType ? fixedPointType.fixedPointId : '') : ''
            this.form['search.modelCategory'] = res.data.carTypeName ? (modelCategory ? modelCategory.carTypeId : '') : ''
          } else if (sourceStatus == 2) {
            this.form['search.projectType'] = res.data.projectTypeId
            this.form['search.fixedPointType'] = res.data.fixedPointId
            this.form['search.modelCategory'] = res.data.carTypeId
          }
          this.sure()
        } else {
          iMessage.error(result);
        }
        this.loadingiSearch = false
      }).catch(() => {
        this.loadingiSearch = false
      });
      // iMessage.success(this.$t("LK_ZHUANPAICHENGGONG"));
      // this.getTableListFn();
    },
    getProcureGroup() {
      this.form['search.carTypeProject'] = ''
      this.form['search.materialName'] = ''
      this.form['search.partNum'] = ''
      this.loadingiSearch = true
      this.$store.commit('SET_budgetManagement', {
        carTypeProject: this.params.id,
        sourceStatus: this.params.sourceStatus
      });
      Promise.all([findProjectTypeDetailPulldown(), getCartypePulldown()]).then((res) => {
        const result0 = this.$i18n.locale === 'zh' ? res[0].desZh : res[0].desEn
        const result1 = this.$i18n.locale === 'zh' ? res[1].desZh : res[1].desEn
        if (res[0].data) {
          this.projectTypeList = res[0].data.projectTypePullDownVOList
          this.fixedPointTypeList = res[0].data.fixedPointPullDownVOList
          this.modelCategoryList = res[0].data.carCategoryPullDownVOList
          this.form['search.projectType'] = ''
          this.form['search.fixedPointType'] = ''
          this.form['search.modelCategory'] = ''
        } else {
          iMessage.error(result0);
        }
        if (res[1].data) {
          this.fromGroup = res[1].data;
          this.changeCarTypeProject(this.params.id)
          if (this.params.id != 'add') {
            this.form['search.carTypeProject'] = this.params.id == '' ? '' : this.params.id
            this.getTableListFn();
          } else {
            this.form['search.carTypeProject'] = ''
          }
        } else {
          iMessage.error(result1);
        }
        this.loadingiSearch = false
      }).catch(() => {
        this.loadingiSearch = false
      });

    },
    //表格选中值集
    handleSelectionChange(val) {
      this.selectTableData = val;
    },
    // 获取零件采购项目相关信息
    getTableListFn() {
      this.tableLoading = true;
      // this.form["search.size"] = this.page.pageSize;
      // this.form["search.current"] = this.page.currPage;
      let params = {
        carTypeProId: this.form['search.carTypeProject'],
        materialName: this.form['search.materialName'],
        partNum: this.form['search.partNum'],
        // current: this.page.currPage,
        // size: this.page.pageSize
      }
      findInvestmentBuild(params)
          .then((res) => {
            const result = this.$i18n.locale === 'zh' ? res.desZh : res.desEn
            if (res) {
              // this.page.currPage = res.pageNum;
              // this.page.pageSize = res.pageSize;
              // this.page.totalCount = res.total;
              this.tableListData = res;
            }
            this.tableLoading = false;
          }).catch(() => (this.tableLoading = false));
    },
    // 查询
    sure() {
      this.getTableListFn();
    },
    // 重置搜索条件
    reset() {
      for (let i in this.form) {
        this.form[i] = "";
      }
      this.getTableListFn();
    },
    saveAddCarType() {
      if(!this.form['search.carTypeProject']){
        iMessage.warn('请先选择车型项目');
        return
      }
      this.addCarTypeLoading = true;
      ConfirmCustomerCarTypeSelect({
        id: this.form['search.carTypeProject'],
        projectTypeId: this.form['search.projectType'],
        fixedPointId: this.form['search.fixedPointType'],
        carTypeId: this.form['search.modelCategory']
      }).then((res) => {
        const result = this.$i18n.locale === 'zh' ? res.desZh : res.desEn
        if (res.data) {
          iMessage.success(result);
          this.getTableListFn();
        } else {
          iMessage.error(result);
        }
        this.addCarTypeLoading = false;
      }).catch(() => {
        this.addCarTypeLoading = false;
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.input-with-select {
  width: 200px;
}

.checkBox {
  position: relative;
  top: 30px;
  left: -70px;
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

.generateInvestmentList {
  position: relative;
  //组件按钮间距
  .giSearch{
    ::v-deep .cardBody .iSearch-content .operation {
      width: auto;
      display: none;
    }
  }

  ::v-deep .serch {
    margin-right: 0;
  }

  .searchSure {
    float: right;
    margin-top: 27px;
  }

  .btnList {
    > span {
      font-size: 20px;
      margin-left: 20px;

      // opacity: 0.5;
      .log {
        font-size: 16px;
        color: #1660f1;
        margin-left: 5px;
      }
    }
  }


  ::v-deep .el-tabs__header {
    position: absolute;
    top: 20px;
    transform: translate(0, 5px);
    z-index: 1;

    .el-tabs__nav-wrap::after {
      background: transparent;
    }

    .el-tabs__active-bar {
      height: 3px;
      background: $color-blue;
      border-radius: 2px;
    }

    .el-tabs__item {
      font-size: 18px;
      color: #000000;
      opacity: 0.42;
      height: 35px;
      line-height: 35px;

      & + & {
        padding: 0 25px;
      }
    }

    .is-active {
      opacity: 1;
      font-weight: bold;
    }
  }

  .header {
    display: flex;
    justify-content: space-between;

    .search {
      ::v-deep .el-input {
        width: 220px;
        margin-right: 30px;
      }
    }
  }

  .tabs {
    display: flex;

    > ul {
      display: flex;
      flex-direction: row;

      > li {
        max-width: 130px;
        color: #000000;
        line-height: 23px;
        font-size: 20px;
        font-weight: 400;
        opacity: 0.42;
        padding-bottom: 5px;
        margin-right: 50px;

        &.active {
          font-weight: bold;
          color: #000000;
          opacity: 1;
          border-bottom: 3px solid #1763F7;
        }
      }
    }

    > ul::after {
      width: 100%;
      height: 2px;
      border-bottom: 2px solid red;
    }
  }

}
</style>
