<template>
  <div v-permission="PURCHASE_MOULDINVESTMENTSUPPLIER_LIST">
    <iSearch
        class="margin-bottom20 giSearch"
        style="margin-top: 20px"
        @sure="sure"
        @reset="reset"
        :icon="true"
        :resetKey="PARTSPROCURE_RESET"
        :searchKey="LK_CHAXUN"
        v-loading="loadingiSearch"
    >
      <el-form>
        <el-form-item :label="language('LK_LINGJIANHAO', '零件号')">
          <iInput v-model.trim="partsNum" :placeholder="language('LK_QINGSHURU', '请输入')" clearable></iInput>
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
    <iCard v-loading="tableLoading">
      <!--      570-->
      <iTableList
          :tableData="tableListData"
          :tableTitle="tableTitle"
          :typeIndex="true"
          :selection="false"
          @handleSelectionChange="handleSelectionChange"
      >
        <template #bmSerial="scope">
          <div class="table-link" @click="toBmInfo(scope.row)">{{scope.row.bmSerial}}</div>
        </template>
        <template #akeoType="scope">
          <div>{{
              scope.row.akeoType === '1' ?  '非Aeko' :
                  (scope.row.akeoType === '2' ? 'Aeko增值' :
                          (scope.row.akeoType === '3' ? 'Aeko减值' : '')
                  )
            }}</div>
        </template>
        <template #moldInvestmentStatus="scope">
          <div v-if="scope.row.moldInvestmentStatus !== '6'">{{
              scope.row.moldInvestmentStatus === '1' ?  '已定点待确认' :
                  (scope.row.moldInvestmentStatus === '2' ? '待供应商确认' :
                      (scope.row.moldInvestmentStatus === '3' ? '待采购员确认' :
                          (scope.row.moldInvestmentStatus === '4' ? '变更中' :
                              (scope.row.moldInvestmentStatus === '5' ? '供应商已变更待采购员确认' :
                                  (scope.row.moldInvestmentStatus === '7' ? '模具投资清单已确认' : ''
                                  )
                              )
                          )
                      )
                  )
            }}</div>
          <div v-else class="redStyle">
            <Popover
                class="popover"
                placement="bottom-start"
                :content="language('LK_TUIHUIYUANYIN', '退回原因') + ':' + scope.row.backReason"
                trigger="hover">
              <div slot="reference">
                <span>供应商已退回</span>
                <icon symbol name="iconzhongyaoxinxitishi"></icon>
              </div>
            </Popover>
          </div>
        </template>
      </iTableList>
      <div class="unitStyle">{{ $t('货币：人民币  |  单位：元  |  不含税 ') }}</div>
      <iPagination
          v-update
          @size-change="handleSizeChange($event, conditionConfirmTskList)"
          @current-change="handleCurrentChange($event, conditionConfirmTskList)"
          background
          :current-page="page.currPage"
          :page-sizes="page.pageSizes"
          :page-size="page.pageSize"
          :layout="page.layout"
          :total="page.totalCount"
      />
    </iCard>
    <handover v-model="handoverShow" :handoverParams="handoverParams" @handoverClose="conditionConfirmTskList"></handover>
  </div>
</template>

<script>
import {iCard, iSearch, iSelect, iPagination, iInput, iMessage, icon} from 'rise';
import {iTableList} from "@/components";
import {investmentListTitle} from "../components/data"
import handover from "../components/handover"
import {
  getDepartmentsCombo,
  carCombo,
  moldInvestmentStatusCombo,
  sendSupplier,
  liniePullDownByDept,
} from "@/api/ws2/purchase/investmentList";
import {
  findBmViewPageList,
} from "@/api/ws2/purchaseSupplier/investmentList";
import {pageMixins} from "@/utils/pageMixins";
import {Popover} from "element-ui"
import {getTousandNum} from "@/utils/tool";

export default {
  mixins: [pageMixins],
  components: {
    iCard,
    iSearch,
    iSelect,
    iTableList,
    iPagination,
    iInput,
    handover,
    Popover,
    icon,
  },
  data() {
    return {
      loadingiSearch: false,
      tableLoading: false,
      onleySelf: true,
      handoverShow: false,
      tableTitle: investmentListTitle,
      tableListData: [],
      department: [],
      departmentsList: [],
      linieID: [],
      linieList: [],
      carTypeProject: [],
      carTypeProjectList: [],
      moldInvestmentStatus: [],
      moldInvestmentStatusList: [],
      multipleSelection: [],
      bmSerial: '',
      partsNum: '',
      supplier: '',
      linieName: [],
      handoverParams: {
        bmid: [],
        moldInvestmentStatus: [],
        departmentsList: [],
      },
      getTousandNum: getTousandNum
    }
  },
  created() {
    this.getAllSelect()
    this.conditionConfirmTskList()
  },
  methods: {
    handleSelectionChange(list) {
      this.multipleSelection = list
      this.handoverParams.bmid = list.map(item => item.id)
      this.handoverParams.moldInvestmentStatus = list.map(item => item.moldInvestmentStatus)
    },
    getAllSelect() {
      this.loadingiSearch = true
      Promise.all([getDepartmentsCombo(), carCombo(), moldInvestmentStatusCombo(), liniePullDownByDept()]).then((res) => {
        const result0 = this.$i18n.locale === 'zh' ? res[0].desZh : res[0].desEn
        const result1 = this.$i18n.locale === 'zh' ? res[1].desZh : res[1].desEn
        const result2 = this.$i18n.locale === 'zh' ? res[2].desZh : res[2].desEn
        const result3 = this.$i18n.locale === 'zh' ? res[3].desZh : res[3].desEn
        if (Number(res[0].code) === 0) {
          this.departmentsList = res[0].data
          this.handoverParams.departmentsList = this.departmentsList
        } else {
          iMessage.error(result0);
        }
        if (res[1].data) {
          this.carTypeProjectList = res[1].data;
        } else {
          iMessage.error(result1);
        }
        if (res[2].data) {
          this.moldInvestmentStatusList = res[2].data.filter(item => item.code !== '1')
        } else {
          iMessage.error(result2);
        }
        if (res[3].data) {
          this.linieList = res[3].data;
        } else {
          iMessage.error(result3);
        }
        this.loadingiSearch = false
      }).catch(() => {
        this.loadingiSearch = false
      });

    },
    conditionConfirmTskList(){
      this.tableLoading = true
      findBmViewPageList({
        current: this.page.currPage,
        size: this.page.pageSize,
        linieId: this.linieName,
        moldInvestmentStatus: this.moldInvestmentStatus,
        behalfPartsNum: this.partsNum,
        tmCartypeProId: this.carTypeProject,
      }).then((res) => {
        const result = this.$i18n.locale === 'zh' ? res.desZh : res.desEn
        if (Number(res.code) === 0) {
          this.page.currPage = res.pageNum;
          this.page.pageSize = res.pageSize;
          this.page.totalCount = res.total;
          this.tableListData = res.data
        } else {
          iMessage.error(result);
        }
        this.tableLoading = false
      }).catch(() => {
        this.tableLoading = false
      });
    },
    handleHandover(){
      if(!this.multipleSelection || this.multipleSelection.length === 0){
        iMessage.warn(this.language('LK_BAAPPLYTISP1', '请先勾选'))
        return
      }
      this.handoverShow = true
    },
    sendSupplier(){
      if(!this.multipleSelection || this.multipleSelection.length === 0){
        iMessage.warn(this.language('LK_BAAPPLYTISP1', '请先勾选'))
        return
      }
      this.handoverSelfLoading = true
      sendSupplier(this.multipleSelection.map(item => {
        return {
          bmid: item.id,
        }
      })).then((res) => {
        const result = this.$i18n.locale === 'zh' ? res.desZh : res.desEn
        if (Number(res.code) === 0) {
          this.conditionConfirmTskList()
          iMessage.success(result);
        } else {
          iMessage.error(result);
        }
        this.handoverSelfLoading = false
      }).catch(() => {
        this.handoverSelfLoading = false
      });
    },
    toBmInfo(row){
      //  如当前用户没有查看“模具投资金额”的权限，点击流水号后提示“对不起，您所在的岗位没有该材料组权限”
      let url = this.$router.resolve({
        path: '/purchaseSupplier/investmentList/bmInfo',
        query: {
          bmSerial: row.bmSerial,
          id: row.id
        }
      })
      window.open(url.href, '_blank');
    },
    sure(){
      this.page.currPage = 1
      this.conditionConfirmTskList()
    },
    reset() {
      this.partsNum = ''
      this.supplier = ''
      this.bmSerial = ''
      this.moldInvestmentStatus = []
      this.carTypeProject = []
      this.department = []
      this.linieName = []
      this.conditionConfirmTskList()
    }
  }
}
</script>

<style lang="scss" scoped>
.icardHeader{
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  ::v-deep .el-switch__label.is-active{
    color: #41434A;
  }
}
.table-link{
  color: #1663F6;
  text-decoration: underline;
  font-family: Arial;
  cursor: pointer;
}
.redStyle{
  color: #E30D0D;
  ::v-deep .icon{
    font-size: 16px;
    color: #E30D0D;
  }
}
.multipleSelect {
  ::v-deep .el-tag {
    max-width: calc(100% - 75px);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
.giSearch{
  ::v-deep .el-textarea__inner{
    height: 35px;
  }
}
</style>