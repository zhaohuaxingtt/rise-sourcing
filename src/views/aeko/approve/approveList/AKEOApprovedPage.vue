<!--已审批--->
<template>
  <div v-permission.auto="AEKO_APPROVED_PAGE|AEKO已审批页面">
    <!--搜索区--->
    <i-search v-permission.auto="AEKO_APPROVED_PAGE_SEARCHAREA|AEKO已审批页面搜索区" class="margin-bottom20"
              @sure="queryApprovedAKEOForm" @reset="restQueryForm" :resetKey="QUEREN"
              :searchKey="REST">
      <el-form :model="queryAkeoForm" ref="AKEOQueryFormRef">
        <!-- AEKO号 -->
        <el-form-item :label="language('LK_AEKOHAO', 'AEKO号')" prop='aekoCode'>
          <i-input
              v-model.trim="queryAkeoForm.aekoCode"
              :placeholder="language('LK_QINGSHURU','请输入')"
              clearable
          ></i-input>
        </el-form-item>
        <!-- 零件号 -->
        <el-form-item :label="language('LINGJIAHAO', '零件号')" prop='partNum'>
          <i-input
              v-model="queryAkeoForm.partNum"
              :placeholder="language('LK_QINGSHURU','请输入')"
              clearable
          ></i-input>
        </el-form-item>
        <!-- 供应商简称 -->
        <el-form-item :label="language('GONGYINGSHANGJIANCHENG','供应商简称')" prop='supplierName'>
          <i-input
              v-model.trim="queryAkeoForm.supplierName"
              :placeholder="language('LK_QINGSHURU','请输入')"
              clearable
          ></i-input>
        </el-form-item>
        <!-- 专业采购员 -->
        <el-form-item :label="language('ZHUANYECAIGOUYUAN','专业采购员')" prop='buyerId'>
          <i-select
              v-model.trim="queryAkeoForm.buyerId"
              filterable
              remote
              reserve-keyword
              :remote-method="remoteMethod"
              :loading="loading"
              :placeholder="language('LK_QINGSHURU','请输入')"
              clearable
          >
            <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
          </i-select>
        </el-form-item>
        <!-- 成本变化Δ值 -->
        <el-form-item :label="language('LK_CHENGBENBIANHUAZHI','成本变化Δ值')">
          <div class="intervalCss">
            <el-form-item prop="costChangeMin">
              <i-input
                  v-model.trim="queryAkeoForm.costChangeMin"
                  :placeholder="language('LK_QINGSHURU','请输入')"
                  @input="queryAkeoForm.costChangeMin=queryAkeoForm.costChangeMin.replace(/^(\-)*(\d+)\.(\d{4}).*$/, '$1$2.$3')"
                  clearable
              ></i-input>
            </el-form-item>
            <span class="splitLine"></span>
            <el-form-item prop="costChangeMax">
              <i-input
                  v-model.trim="queryAkeoForm.costChangeMax"
                  :placeholder="language('LK_QINGSHURU','请输入')"
                  @input="queryAkeoForm.costChangeMax=queryAkeoForm.costChangeMax.replace(/^(\-)*(\d+)\.(\d{4}).*$/, '$1$2.$3')"
                  clearable
              ></i-input>
            </el-form-item>
          </div>
        </el-form-item>

        <el-form-item :label="language('LK_SHENPIZHUANGTAI','审批状态')" prop='auditStatus'>
          <i-select v-model="queryAkeoForm.auditStatus" multiple placeholder="请选择">
            <el-option
                v-for="item in auditStatusList"
                :key="item.value"
                :label="item.name"
                :value="item.value">
            </el-option>
          </i-select>
        </el-form-item>
      </el-form>
    </i-search>
    <!--表格展示区--->
    <i-card v-permission.auto="AEKO_APPROVED_PAGE_DATA_DISPLAY_AREA|AEKO已审批数据展示区">
      <span class="font18 font-weight">{{ language('LK_AEKOSHENPI', 'AEKO审批') }}</span>
      <!--表格展示区-->
      <tablelist
          height="400"
          class="margin-top20"
          index
          :selection="true"
          :tableData="approvedList"
          :tableTitle="approvedHeader"
          :lang="true"
          v-loading="tableLoading"
      >
        <template #isTop="scope">
          <div>
            <span class="icon"><icon v-if="scope.row.isTop" symbol class="icon" name="iconAEKO_TOP"/></span>
          </div>
        </template>
        <template #aekoNum="scope">
          <div style="text-align:left">
            <a class="link-underline" @click="lookDetails(scope.row)">
              {{ scope.row.aekoCode }}
            </a>
          </div>
        </template>
        <template #auditTypeName="scope">
          <div style="text-align:left">
            <span>{{ scope.row.auditTypeDesc }}</span>
          </div>
        </template>
        <template #describe="scope">
          <a class="link-underline" @click="lookAEKODesc(scope.row)">
            {{ language('CHAKAN', '查看') }}
          </a>
        </template>
        <!---更改零件名称-->
        <template #assignsheet="scope">
          <span>{{ scope.row.partName }}</span>
        </template>
        <!--涉及车型和车型项目-->
        <template #carType="scope">
          <span>{{ scope.row.cartypeNameZh }}</span>
        </template>

        <!--主要供应商-->
        <template #supplier="scope">
          <span>{{ scope.row.mainSupplier }}</span>
        </template>
        <!--增加材料成本-->
        <template #EP1="scope">
          <span>{{ scope.row.materialIncrease|numberToCurrencyNo2 }}</span>
        </template>

        <!--增加投资税-->
        <template #EP2="scope">
          <span>{{ scope.row.investmentIncrease|numberToCurrency }}</span>
        </template>

        <!--其他费用-->
        <template #EP3="scope">
          <span>{{
              scope.row.otherCost|numberToCurrency
            }}</span>
        </template>
        <!--科室-->
        <template #DepartmentName="scope">
          <span>{{ scope.row.linieDeptNum }}</span>
        </template>
        <!--采购员-->
        <template #buyerName="scope">
          <span>{{ scope.row.linieName }}</span>
        </template>
        <!--附件-->
        <template #attach="scope">
          <a class="link-underline" @click="openApprovalAttachment(scope.row)">
            {{ language('CHAKAN', '查看') }}
          </a>
        </template>
        <!--审批状态-->
        <template #auditStatus="scope">
          <span>{{ scope.row.auditStatusDesc }}</span>
        </template>
        <!--AEKO截止日期-->
        <template #date="scope">
          <span>{{ scope.row.deadLine|formatDate }}</span>
        </template>
        <!--创建时间-->
        <template #createDate="scope">
          <span>{{ scope.row.createDate|formatDate }}</span>
        </template>
        <!--创建时间-->
        <template #complatedDate="scope">
          <span>{{ scope.row.complatedDate|formatDate }}</span>
        </template>
      </tablelist>
      <div class="pagination">
        <iPagination v-update class="pagination"
                     @size-change="handleSizeChange($event, loadApprovedList)"
                     @current-change="handleCurrentChange($event, loadApprovedList)"
                     background
                     :current-page="page.currPage"
                     :page-sizes="page.pageSizes"
                     :page-size="page.pageSize"
                     :layout="page.layout"
                     :total="page.totalCount"/>
      </div>
    </i-card>

  </div>
</template>

<script>
import {iSearch, iInput, iCard, iPagination, icon, iSelect, iMessage} from "rise"
import {tableAKEOApprovedTitle as approvedHeader} from '../components/data'
import tablelist from 'rise/web/components/iFile/tableList';
import {pageMixins} from '@/utils/pageMixins'
import {queryApproved} from "@/api/aeko/approve";
import {searchLinie} from "@/api/aeko/manage";
import {user as configUser} from '@/config'
import {getAekoDetail} from "@/api/aeko/detail";
import * as dateUtils from "@/utils/date";
import {numberToCurrencyNo, numberToCurrencyNo2} from '../../../../utils/cutOutNum'

export default {
  name: "AKEOApprovedPage",
  mixins: [pageMixins],
  components: {
    iSearch,
    iInput,
    iCard,
    tablelist,
    iPagination,
    icon,
    iSelect
  },
  filters: {
    formatDate(value) {
      if (value == null || value == '') return ''
      let date = new Date(value);
      return dateUtils.formatDate(date, 'yyyy-MM-dd')
    },
    numberToCurrency(value) {
      if (value == null || value == '') return ''

      return numberToCurrencyNo(value)
    },
    numberToCurrencyNo2(value){
      if (value == null || value == '') return ''

      return numberToCurrencyNo2(value)
    }
  },
  data() {
    return {
      //查询表单
      queryAkeoForm: {
        aekoCode: '',//aeko号
        auditStatus: null,//审批状态
        costChangeMax: '',//成本变化上限
        costChangeMin: '',//成本变化下限
        current: 1,//当前页
        size: 10,//分页大小
        linieName: '',//专业采购员
        supplierName: '',//供应商简称
        partNum: '',//零件号
      },
      //返回数据
      approvedList: [],
      //列表数据表头
      approvedHeader: approvedHeader,
      tableLoading: false,
      //选中回调数据集合
      selectApprovedList: [],
      auditStatusList: [{value: 1, name: '同意'}, {value: 2, name: '拒绝'}, {value: 3, name: '补充材料'}],
      buyerUsers: [],
      options: [],
      loading: false,
    }
  },
  created() {
    this.loadApprovedList()
    this.queryAllLin()
  },
  methods: {
    //转换审批描述
    getAuditTypeDesc(auditType) {
      if (auditType == 1) {
        return '内容表态'
      } else if (auditType == 2) {
        return '封面表态'
      } else {
        return '推荐表态'
      }
    },
    checkMinCost() {
      let value = this.queryAkeoForm.costChangeMin
      if (!isNaN(Number(value))) {
        if (value.indexOf('.') > -1 && value.toString().split('.')[1].length > 4) {
          this.$message.error(this.language('LK_QINGSHURUZHENGQUESHUZHIXIAODIANHOUBAONIUSIWEIXIAOSHU', '请输入正确的数值，小数点后保留四位数字'))
          return false
        }
        if (!isNaN(this.queryAkeoForm.costChangeMax)) {
          if (Number(value) > Number(this.queryAkeoForm.costChangeMax)) {
            this.$message.error(this.language('LK_ZUIXIAOZHIBUNENGDAYUZUIDAZHI', '最小值不能大于最大值'));
            return false
          }
        }
        return true
      } else {
        this.$message.error(this.language('LK_QINGSHURUZHENGQUESHUZHI', '请输入正确数值'));
        return false
      }
    },
    checkMaxCost() {
      let value = this.queryAkeoForm.costChangeMax
      if (!isNaN(Number(value))) {
        if (value.indexOf('.') > -1 && value.toString().split('.')[1].length > 4) {
          this.$message.error(this.language('LK_QINGSHURUZHENGQUESHUZHIXIAODIANHOUBAONIUSIWEIXIAOSHU', '请输入正确的数值，小数点后保留四位数字'))
          return false
        }
        if (!isNaN(this.queryAkeoForm.costChangeMin)) {
          if (Number(value) < Number(this.queryAkeoForm.costChangeMax)) {
            this.$message.error(this.language('LK_ZUIDAZHIBUNENGXIAOYUZUIXIAOZHI', '最大值不能小于最小值'));
            return false
          }
        }
        return true
      } else {
        this.$message.error(this.language('LK_QINGSHURUZHENGQUESHUZHI', '请输入正确数值'));
        return false
      }
    },

    //加载数据
    loadApprovedList() {
      this.tableLoading = true
      this.queryAkeoForm.current = this.page.currPage
      this.queryAkeoForm.size = this.page.pageSize
      queryApproved(this.queryAkeoForm).then(res => {
        this.tableLoading = false
        if (res.code == 200) {
          this.approvedList = res.data.records
          this.page.totalCount = res.data.total
        } else {
          this.$message.error(res.desZh)
        }
      })
    },
    //查询
    queryApprovedAKEOForm() {
      if (this.checkMinCost() && this.checkMaxCost()) {
        this.queryAkeoForm.current = 1
        this.queryAkeoForm.size = this.page.pageSize
        this.queryAkeoForm.partNum = this.queryAkeoForm.partNum.trim()
        this.loadApprovedList()
      }
    },
    //重置查询表单
    restQueryForm() {
      this.$refs.AKEOQueryFormRef.resetFields()
      this.queryAkeoForm.current = 1
      this.queryAkeoForm.size = this.page.pageSize
      this.loadApprovedList()
    },
    queryAllLin() {
      const {buyerName = [], userInfo = {}} = this;
      if (buyerName.length) {
        buyerName.map((item) => {
          item.label = this.$i18n.locale === "zh" ? item.nameZh : item.nameEn;
          item.value = item.id
          item.enName = item.nameEn
          item.zhName = item.nameZh
        })
        this.options = buyerName
        this.buyerUsers = buyerName;
      } else {
        const {deptDTO = {}} = userInfo;
        const deptId = deptDTO.id;
        searchLinie({tagId: configUser.LINLIE, deptId,}).then((res) => {
          const {code, data} = res;
          if (code == 200) {
            data.map((item) => {
              item.label = this.$i18n.locale === "zh" ? item.nameZh : item.nameEn;
              item.value = item.id
              item.enName = item.nameEn
              item.zhName = item.nameZh
            })
            this.options = buyerName
            this.buyerUsers = data;
          } else {
            this.$message.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn);
          }
        })
      }
    },
    //远程搜索专业采购员
    remoteMethod(query) {
      if (query !== '') {
        this.loading = true;
        setTimeout(() => {
          this.loading = false;
          this.options = this.buyerUsers.filter(item => {
            let isZhNameRes = item.zhName && item.zhName.indexOf(query) > -1 ? true : false
            let isEnNameRes = item.enName && item.enName.indexOf(query) > -1 ? true : false
            return isZhNameRes || isEnNameRes
          });
        }, 200);
      } else {
        this.options = this.buyerUsers;
      }
    },

    //跳转到详情
    lookDetails(row) {
      let reqP = {requirementAekoId: row.requirementAekoId}
      getAekoDetail(reqP).then(res => {
        if (res.code == 200) {
          let transmitObj = {
            option: 2,
            aekoApprovalDetails: {
              aekoNum: row.aekoCode,
              requirementAekoId: row.requirementAekoId,
              aekoAuditType: row.auditType,
              approvalResult: row.approvalResult,
              workFlowId: row.workFlowId,
              workFlowDTOS: [{workFlowId: row.workFlowId, taskId: row.taskId}],
              taskId: row.taskId,
              aekoManageId: res.data.aekoManageId
            }
          }
          let routeData = this.$router.resolve({
            path: `/aeko/AEKOApprovalDetails`,
            query: {
              requirementAekoId: row.requirementAekoId,
              aekoManageId: res.data.aekoManageId,
              linieId: this.$store.state.permission.userInfo.id,
              taskId: row.taskId,
              transmitObj: window.btoa(unescape(encodeURIComponent(JSON.stringify(transmitObj))))
            },
          })
          window.open(routeData.href, '_blank')
        } else {
          this.$message.error(res.desZh)
        }
      })
    },
    //查看描述
    lookAEKODesc(row) {
      let routeData = this.$router.resolve({
        path: `/aeko/describe?requirementAekoId=${row.requirementAekoId}&aekoCode=${row.aekoCode}`,
      })
      window.open(routeData.href, '_blank')
    },
    //打开审批附件
    openApprovalAttachment(row) {
      let reqP = {requirementAekoId: row.requirementAekoId}
      getAekoDetail(reqP).then(res => {
        if (res.code == 200) {
          let transmitObj = {
            option: 1,
            aekoApprovalDetails: {
              aekoNum: row.aekoCode,
              requirementAekoId: row.requirementAekoId,
              aekoAuditType: row.auditType,
              workFlowDTOS: [{workFlowId: row.workFlowId, taskId: row.taskId}],
              aekoManageId: res.data.aekoManageId
            }
          }
          let routeData = this.$router.resolve({
            path: `/aeko/AEKOApprovalDetails/explainattach`,
            query: {
              requirementAekoId: row.requirementAekoId,
              aekoManageId: res.data.aekoManageId,
              linieId: this.$store.state.permission.userInfo.id,
              taskId: row.taskId,
              form: 'approve',
              transmitObj: window.btoa(unescape(encodeURIComponent(JSON.stringify(transmitObj)))
              )
            },
          })
          window.open(routeData.href, '_blank')

        } else {
          this.$message.error(res.desZh)
        }
      })
    },

  }
}
</script>

<style lang="scss" scoped>
::v-deep.intervalCss {
  display: inline-flex;
  align-items: center;
  width: 100%;
  vertical-align: top;

  .el-form-item {
    margin: 0 !important;
    padding: 0 !important;
  }
}

.icon {
  svg {
    font-size: 26px;
  }
}

.splitLine {
  margin-left: 5px;
  margin-right: 5px;
  width: 8px;
  height: 0;
  border: 1px solid #000000;
  opacity: 1;
}
</style>