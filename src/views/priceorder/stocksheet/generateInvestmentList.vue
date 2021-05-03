<!--
 * @Author: yz
 * @Date: 2021-02-25 09:50:42
 * @Description: 生成投资清单。
-->
<template>
  <div class="generateInvestmentList" v-permission="PARTSPROCURE_INDEXPAGE">
    <div>
      <!------------------------------------------------------------------------>
      <!--                  search 搜索模块                                   --->
      <!------------------------------------------------------------------------>
      <iSearch
          class="margin-bottom20"
          style="margin-top: 20px"
          @sure="sure"
          @reset="reset"
          :icon="false"
          :resetKey="PARTSPROCURE_RESET"
          :searchKey="PARTSPROCURE_CONFIRM"
          v-loading="loadingiSearch"
      >
        <el-form>
          <el-form-item label="车型项目">
            <iSelect
                placeholder="请选择"
                v-model="form['search.carTypeProject']"
                v-permission="PARTSPROCURE_PARTSTATUS"
                filterable
                @change="changeCarTypeProject"
            >
              <div class="addCarTypeProject">
                <iInput v-model="addCarTypeProject" placeholder="请输入车型项目名称"></iInput>
                <iButton @click="handleAddCarTypeProject" v-loading="iDialogAddCarTypeProject">确认</iButton>
              </div>
              <el-option
                  :value="item.id"
                  :label="item.cartypeNname"
                  v-for="(item, index) in fromGroup"
                  :key="index"
              ></el-option>
            </iSelect>
          </el-form-item>
          <el-form-item label="项目类型">
            <iSelect
                placeholder="请选择"
                v-model="form['search.projectType']"
                v-permission="PARTSPROCURE_VEHICLECATEGORIES"
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
          <el-form-item label="定点类型">
            <iSelect
                placeholder="请选择"
                v-model="form['search.fixedPointType']"
                v-permission="PARTSPROCURE_MODELPROJECT"
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
                placeholder="请选择"
                v-model="form['search.modelCategory']"
                v-permission="PARTSPROCURE_PARTITEMTYPE"
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
          <iButton @click="saveAddCarType" v-loading="addCarTypeLoading">确认</iButton>
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
            材料组/中文名/德文名：
            <iInput v-model="form['search.materialName']" placeholder="可输入编号中德文名称">
              <i slot="suffix" class="el-input__icon el-icon-search" @click="sure"></i>
            </iInput>
            零件六位号：
            <iInput v-model="form['search.partNum']" placeholder="请输入查询">
              <i slot="suffix" class="el-input__icon el-icon-search" @click="sure"></i>
            </iInput>
          </div>
          <div>
            <iButton @click="addRow" :disabled="(form['search.carTypeProject'] == '')">添加行</iButton>
            <iButton @click="deleteIRow" :disabled="(form['search.carTypeProject'] == '')">删除行</iButton>
            <iButton @click="referenceModelShow = true" :disabled="(form['search.carTypeProject'] == '')">参考车型</iButton>
            <!--                <iButton @click="saveRow" :disabled="(form['search.carTypeProject'] == '')">保存</iButton>-->
<!--            <iButton @click="investmentList" :disabled="(form['search.carTypeProject'] == '')">下一步</iButton>-->
          </div>
        </div>
        <tablelist
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
        </tablelist>
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
} from "@/components";
// import {
//   iButton
// } from "rise"
import {pageMixins} from "@/utils/pageMixins";
import {budgetManagementData, form} from "./components/data";
import tablelist from "./components/tablelist";
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
} from "@/api/priceorder/stocksheet/edit";
import filters from "@/utils/filters";
import {Popover} from "element-ui"

export default {
  props: {
    params: {
      type: Object, default: () => {
      }
    }
  },
  mixins: [pageMixins, filters],
  components: {
    iButton,
    iCard,
    tablelist,
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
    this.getProcureGroup();
  },
  methods: {
    handleAddCarTypeProject() {
      if (!this.addCarTypeProject) {
        iMessage.warn('请先输入车型名称');
        return
      }
      this.iDialogAddCarTypeProject = true
      saveCustomCart({cartypeProjectName: this.addCarTypeProject}).then((res) => {
        if (Number(res.code) === 0) {
          iMessage.success(res.desZh);
          this.addCarTypeProject = ''
          this.addAialog = false
          this.params.id = res.data.id
          this.params.sourceStatus = res.data.sourceStatus
          this.getProcureGroup();
        } else {
          iMessage.error(res.desZh);
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
        if (Number(res.code) === 0) {
          this.getTableListFn()
          iMessage.success(res.desZh);
        } else {
          iMessage.error(res.desZh);
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
        if (Number(res.code) === 0) {
          this.getTableListFn()
          iMessage.success(res.desZh);
        } else {
          iMessage.error(res.desZh);
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
        if (Number(res.code) === 0) {
          iMessage.success(res.desZh);
          this.$emit('toinvestmentList', {
            id: this.form['search.carTypeProject'],
            sourceStatus: this.carTypeProjectObj.sourceStatus,
            step: 2
          })
        } else {
          iMessage.error(res.desZh);
          this.tableLoading = false
        }
      }).catch(() => {
        this.tableLoading = false
      });
    },
    changeCarTypeProject(val) {
      if (!val) {
        return
      }
      this.loadingiSearch = true
      this.carTypeProjectObj = this.fromGroup.find(item => item.id == val)
      this.$store.commit('SET_budgetManagement', {
        carTypeProject: this.carTypeProjectObj.id,
        sourceStatus: this.carTypeProjectObj.sourceStatus
      });
      let sourceStatus = this.carTypeProjectObj.sourceStatus
      this.carTypeProjectDisabled = sourceStatus == '1' ? true : false
      findProjectDetailById({id: val, sourceStatus: sourceStatus}).then((res) => {
        if (res.data) {
          if (sourceStatus == 1) {
            this.form['search.projectType'] = res.data.projectTypeName ? this.projectTypeList.find(item => item.projectTypeName == res.data.projectTypeName).projectTypeId : ''
            this.form['search.fixedPointType'] = res.data.fixedPointName ? this.fixedPointTypeList.find(item => item.fixedPointName == res.data.fixedPointName).fixedPointId : ''
            this.form['search.modelCategory'] = res.data.carTypeName ? this.modelCategoryList.find(item => item.carTypeName == res.data.carTypeName).carTypeId : ''
          } else if (sourceStatus == 2) {
            this.form['search.projectType'] = res.data.projectTypeId
            this.form['search.fixedPointType'] = res.data.fixedPointId
            this.form['search.modelCategory'] = res.data.carTypeId
          }
          this.sure()
        } else {
          iMessage.error(res.desZh);
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
        if (res[0].data) {
          this.projectTypeList = res[0].data.projectTypePullDownVOList
          this.fixedPointTypeList = res[0].data.fixedPointPullDownVOList
          this.modelCategoryList = res[0].data.carCategoryPullDownVOList
          this.form['search.projectType'] = ''
          this.form['search.fixedPointType'] = ''
          this.form['search.modelCategory'] = ''
        } else {
          iMessage.error(res[0].desZh);
        }
        if (res[1].data) {
          this.fromGroup = res[1].data;
          this.changeCarTypeProject(Number(this.params.id))
          if (this.params.id != 'add') {
            this.form['search.carTypeProject'] = this.params.id == '' ? '' : Number(this.params.id)
            this.getTableListFn();
          } else {
            this.form['search.carTypeProject'] = ''
          }
        } else {
          iMessage.error(res[1].desZh);
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
      this.addCarTypeLoading = true;
      ConfirmCustomerCarTypeSelect({
        id: this.form['search.carTypeProject'],
        projectTypeId: this.form['search.projectType'],
        fixedPointId: this.form['search.fixedPointType'],
        carTypeId: this.form['search.modelCategory']
      }).then((res) => {
        if (res.data) {
          iMessage.success(this.$t("LK_CAOZUOCHENGGONG"));
          this.getTableListFn();
        } else {
          iMessage.error(res.desZh);
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
  ::v-deep .cardBody .iSearch-content .operation {
    width: auto;
    display: none;
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
