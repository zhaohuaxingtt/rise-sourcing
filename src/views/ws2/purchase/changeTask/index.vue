<template>
  <div v-permission="PURCHASE_MOULDINVESTMENTBUYER_LIST">
    <iSearch
        class="margin-bottom20 giSearch"
        style="margin-top: 20px"
        @sure="sure"
        @reset="reset"
        :icon="false"
        :resetKey="PARTSPROCURE_RESET"
        :searchKey="LK_CHAXUN"
        v-loading="loadingiSearch"
    >
      <el-form>
        <el-form-item :label="language('LK_LINGJIANHAO', '零件号')">
          <iInput v-model.trim="partsNum" :placeholder="language('LK_QINGSHURU', '请输入')" clearable></iInput>
        </el-form-item>
        <el-form-item :label="language('TPZS.GONGYINGSHANG', '供应商')">
          <iInput v-model="supplier" :placeholder="language('LK_QINGSHURU', '请输入')" clearable></iInput>
        </el-form-item>
        <el-form-item :label="language('LK_BMDANLIUSHUIHAO', 'BM单流水号')">
          <iInput v-model="bmSerial" :placeholder="language('LK_QINGSHURU', '请输入')" clearable></iInput>
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
        <el-form-item :label="language('LK_BMDANHAO', 'BM单号')">
          <iInput v-model="bmSerial" :placeholder="language('LK_QINGSHURU', '请输入')" clearable></iInput>
        </el-form-item>
      </el-form>
    </iSearch>
    <iCard v-loading="tableLoading">
      <div class="icardHeader">
        <el-switch
            v-model="onleySelf"
            @change="sure"
            inactive-text="仅看自己">
        </el-switch>
        <div>
          <iButton @click="handleHandover">{{ language('LK_ZHUANPAI', '转派') }}</iButton>
          <iButton @click="handVerifyLineShow" v-loading="handVerifyLineShowLoading">{{ language('LK_XINZENGBIANGENG', '新增变更') }}</iButton>
        </div>
      </div>
      <!--      570-->
      <iTableList
          :tableData="tableListData"
          :tableTitle="tableTitle"
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
        <template #moldInvestmentAmount="scope">
          <div v-if="Number(scope.row.isShowMoldInvestmentAmount) === 1">{{getTousandNum(Number(scope.row.moldInvestmentAmount).toFixed(2))}}</div>
          <div v-else>-</div>
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
<!--    <verifyLine v-model="verifyLineShow" :handoverParams="handoverParams" @handoverClose="conditionConfirmTskList"></verifyLine>-->
  </div>
</template>

<script>
import {iCard, iSearch, iSelect, iPagination, iButton, iInput, iMessage, icon} from 'rise';
import {iTableList} from "@/components";
import {changeTaskTitle} from "../components/data"
import handover from "../components/handover"
// import verifyLine from "../components/verifyLine"
import {
  getDepartmentsCombo,
  carCombo,
  moldInvestmentStatusCombo,
  conditionConfirmTskList,
  sendSupplier,
  verifyIsSelfOrders,
  liniePullDownByDept,
  verifyLine,
} from "@/api/ws2/purchase/investmentList";
import {pageMixins} from "@/utils/pageMixins";
import {Switch, Popover} from "element-ui"
import {
  getModelProtitesPullDown,
  proDeptPullDown
} from "@/api/ws2/budgetManagement/investmentList";
import {getCartypePulldown, saveCustomCart} from "@/api/ws2/budgetManagement/edit";
import {cloneDeep} from "lodash";
import {getTousandNum} from "@/utils/tool";

export default {
  mixins: [pageMixins],
  components: {
    iCard,
    iSearch,
    iSelect,
    iTableList,
    iPagination,
    iButton,
    iInput,
    handover,
    Popover,
    icon,
    // verifyLine,
  },
  data() {
    return {
      loadingiSearch: false,
      tableLoading: false,
      onleySelf: true,
      handoverShow: false,
      verifyLineShow: false,
      handVerifyLineShowLoading: false,
      tableTitle: changeTaskTitle,
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
    let status = this.$route.query.status
    if(status){
      this.moldInvestmentStatus = status.split(',')
    }
    this.getAllSelect()
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
          this.moldInvestmentStatusList = res[2].data;
          this.moldInvestmentStatus = this.moldInvestmentStatusList.filter(a => a.code !== '7').map(b => b.code)

        } else {
          iMessage.error(result2);
        }
        if (res[3].data) {
          this.linieList = res[3].data;
        } else {
          iMessage.error(result3);
        }
        this.conditionConfirmTskList()
        this.loadingiSearch = false
      }).catch(() => {
        this.loadingiSearch = false
      });

    },
    conditionConfirmTskList(){
      this.tableLoading = true
      conditionConfirmTskList({
        current: this.page.currPage,
        size: this.page.pageSize,
        bmSerial: this.bmSerial,
        deptId: this.department.join(),
        isOneself: this.onleySelf ? 1 : 2,
        linieName: this.linieName.join(),
        moldInvestmentStatus: this.moldInvestmentStatus.join(),
        partsNum: this.partsNum,
        supplierFuzzyName: this.supplier,
        tmCartypeProId: this.carTypeProject.join(),
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
    toBmInfo(row){
      //  如当前用户没有查看“模具投资金额”的权限，点击流水号后提示“对不起，您所在的岗位没有该材料组权限”
      let url = this.$router.resolve({
        path: '/purchase/investmentList/bmInfo',
        query: {
          bmSerial: row.bmSerial,
          id: row.id
        }
      })
      if(Number(row.isShowMoldInvestmentAmount) === 1){
        window.open(url.href, '_blank');
      } else {
        verifyLine({linie: row.linieId}).then((res) => {
          if(res){
            window.open(url.href, '_blank');
          } else {
            iMessage.warn(this.$t('LK_DUIBUQIMEIYOUQUANXIAN'));
          }
          // this.handoverSelfLoading = false
        }).catch(() => {
          iMessage.warn(this.$t('LK_DUIBUQIMEIYOUQUANXIAN'));
          // this.handoverSelfLoading = false
        });
      }
    },
    handVerifyLineShow(row){
      if(!this.multipleSelection || this.multipleSelection.length === 0){
        iMessage.warn(this.language('LK_BAAPPLYTISP1', '请先勾选'))
        return
      }
      this.handVerifyLineShowLoading = true
      verifyIsSelfOrders(this.multipleSelection.map(item => item.id)).then((res) => {
        const result = this.$i18n.locale === 'zh' ? res.desZh : res.desEn
        iMessage.warn(result)
        this.handVerifyLineShowLoading = false
      }).catch(() => {
        this.handVerifyLineShowLoading = false
      });
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