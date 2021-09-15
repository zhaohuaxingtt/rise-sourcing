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
          <iInput v-model.trim="behalfPartsNum" :placeholder="language('LK_QINGSHURU', '请输入')" clearable></iInput>
        </el-form-item>
        <el-form-item :label="language('TPZS.GONGYINGSHANG', '供应商')">
          <iInput v-model="designatedSupplierId" :placeholder="language('LK_QINGSHURU', '请输入')" clearable></iInput>
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
                :value="item.bmStatus"
                :label="item.bmStatusName"
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
              v-model="tmCartypeProId"
          >
            <el-option
                :value="item.tmCartypeProId"
                :label="item.tmCartypeProName"
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
              v-model="deptId"
          >
            <el-option
                :value="item.deptId"
                :label="item.deptName"
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
              v-model="linieId"
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
          <iInput v-model="bmNum" :placeholder="language('LK_QINGSHURU', '请输入')" clearable></iInput>
        </el-form-item>
        <el-form-item label="变更单状态">
          <iSelect
              class="multipleSelect"
              :placeholder="language('LK_QINGXUANZHE', '请选择')"
              filterable
              clearable
              collapse-tags
              multiple
              v-model="changeStatuId"
          >
            <el-option
                :value="item.changeStatusId"
                :label="item.changeStatus"
                v-for="(item, index) in ChangeStatusPullDown"
                :key="index"
            ></el-option>
          </iSelect>
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
          <iButton @click="newChangeShow = true" v-loading="handVerifyLineShowLoading">{{ language('LK_XINZENGBIANGENG', '新增变更') }}</iButton>
        </div>
      </div>
      <!--      570-->
      <iTableList
          :tableData="tableListData"
          :tableTitle="tableTitle"
          @handleSelectionChange="handleSelectionChange"
      >
        <template #changeNum="scope">
          <div class="table-link" @click="toBmInfo(scope.row)">{{scope.row.changeNum}}</div>
        </template>
        <template #moldInvestmentAmount="scope">
          <div v-if="scope.row.isPremission">{{getTousandNum(Number(scope.row.moldInvestmentAmount).toFixed(2))}}</div>
          <div v-else>-</div>
        </template>
        <template #newMoldInvestmentAmount="scope">
          <div v-if="scope.row.isPremission">{{getTousandNum(Number(scope.row.newMoldInvestmentAmount).toFixed(2))}}</div>
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
    <handover v-model="handoverShow" :handoverParams="handoverParams" @handoverClose="conditionConfirmTskList" :isChangeTask="true"></handover>
    <newChange v-model="newChangeShow"></newChange>
<!--    <verifyLine v-model="verifyLineShow" :handoverParams="handoverParams" @handoverClose="conditionConfirmTskList"></verifyLine>-->
  </div>
</template>

<script>
import {iCard, iSearch, iSelect, iPagination, iButton, iInput, iMessage} from 'rise';
import {iTableList} from "@/components";
import {changeTaskTitle} from "../components/data"
import handover from "../components/handover"
import newChange from "../components/newChange"
import {

  verifyIsSelfOrders,
  verifyLine,
} from "@/api/ws2/purchase/investmentList";
import {pageMixins} from "@/utils/pageMixins";
import {Switch, Popover} from "element-ui"
import {
  bmChangeMoldInvestmentListStatusPullDown,
  bmChangeCarTypePullDown,
  bmChangeDeptPullDown,
  bmChangeLiniePullDownByDept,
  bmChangeStatusPullDown,
  findBmChangePageList
} from "@/api/ws2/purchase/changeTask";
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
    newChange,
    // verifyLine,
  },
  data() {
    return {
      loadingiSearch: false,
      tableLoading: false,
      onleySelf: true,
      handoverShow: false,
      newChangeShow: false,
      verifyLineShow: false,
      handVerifyLineShowLoading: false,
      tableTitle: changeTaskTitle,
      tableListData: [],
      departmentsList: [],
      linieList: [],
      ChangeStatusPullDown: [],
      carTypeProjectList: [],
      moldInvestmentStatus: [],
      changeStatuId: ['1', '2', '3', '5'],
      tmCartypeProId: [],
      deptId: [],
      linieId: [],
      moldInvestmentStatusList: [],
      multipleSelection: [],
      behalfPartsNum: '',
      designatedSupplierId: '',
      bmSerial: '',
      bmNum: '',
      linieName: [],
      handoverParams: {
        bmid: [],
        changeStatus: [],
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
      this.handoverParams.bmid = list.map(item => item.bmId)
      this.handoverParams.changeStatus = list.map(item => item.changeStatus)
    },
    getAllSelect() {
      this.loadingiSearch = true
      Promise.all([bmChangeMoldInvestmentListStatusPullDown(), bmChangeCarTypePullDown(), bmChangeDeptPullDown(), bmChangeLiniePullDownByDept(), bmChangeStatusPullDown()]).then((res) => {
        const result0 = this.$i18n.locale === 'zh' ? res[0].desZh : res[0].desEn
        const result1 = this.$i18n.locale === 'zh' ? res[1].desZh : res[1].desEn
        const result2 = this.$i18n.locale === 'zh' ? res[2].desZh : res[2].desEn
        const result3 = this.$i18n.locale === 'zh' ? res[3].desZh : res[3].desEn
        const result4 = this.$i18n.locale === 'zh' ? res[4].desZh : res[4].desEn
        if (Number(res[0].code) === 0) {
          this.moldInvestmentStatusList = res[0].data.filter(item => (item.bmStatus === '4' || item.bmStatus === '5' || item.bmStatus === '7'))
          // this.moldInvestmentStatus = this.moldInvestmentStatusList.filter(a => a.bmStatus !== '7').map(b => b.bmStatus)
          //
          // this.departmentsList = res[0].data
          // this.handoverParams.departmentsList = this.departmentsList
        } else {
          iMessage.error(result0);
        }
        if (res[1].data) {
          this.carTypeProjectList = res[1].data;
        } else {
          iMessage.error(result1);
        }
        if (res[2].data) {
          this.departmentsList = res[2].data;
          this.handoverParams.departmentsList = cloneDeep(this.departmentsList).map(item => {
            return {
              deptId: item.deptId,
              commodity: item.deptName
            }
          })
        } else {
          iMessage.error(result2);
        }
        if (res[3].data) {
          this.linieList = res[3].data;
        } else {
          iMessage.error(result3);
        }
        if (res[4].data) {
          this.ChangeStatusPullDown = res[4].data;
        } else {
          iMessage.error(result4);
        }
        this.conditionConfirmTskList()
        this.loadingiSearch = false
      }).catch(() => {
        this.loadingiSearch = false
      });

    },
    conditionConfirmTskList(){
      this.tableLoading = true
      findBmChangePageList({
        current: this.page.currPage,
        size: this.page.pageSize,
        behalfPartsNum: this.behalfPartsNum,
        designatedSupplierId: this.designatedSupplierId,
        bmSerial: this.bmSerial,
        moldInvestmentStatus: this.moldInvestmentStatus,
        tmCartypeProId: this.tmCartypeProId,
        deptId: this.deptId,
        linieId: this.linieId,
        bmNum: this.bmNum,
        changeStatuId: this.changeStatuId,
        isOneSelf: this.onleySelf,
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
        path: '/purchase/investmentList/changeTask/bmInfo',
        query: {
          bmId: row.bmId,
          bmChangeId: row.id,
          changeNum: row.changeNum,
        }
      })
      if(Number(row.isPremission)){
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
      this.behalfPartsNum = ''
      this.designatedSupplierId = ''
      this.bmSerial = ''
      this.moldInvestmentStatus = []
      this.tmCartypeProId = []
      this.deptId = []
      this.linieId = []
      this.bmNum = ''
      this.changeStatuId = []
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