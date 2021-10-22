<!--待审批--->
<template>
  <div>
    <!--搜索区--->
    <i-search class="margin-bottom20" @sure="queryPendingAKEOForm" @reset="restQueryForm" :resetKey="QUEREN"
              :searchKey="REST">
      <el-form :model="queryAkeoForm" ref="AKEOQueryFormRef">
        <!-- AEKO号 -->
        <el-form-item :label="language('LK_AEKOHAO', 'AEKO号')" prop='aekoNum'>
          <i-input
              v-model.trim="queryAkeoForm.aekoNum"
              :placeholder="language('LK_QINGSHURU','请输入')"
              clearable
          ></i-input>
        </el-form-item>
        <!-- 零件号 -->
        <el-form-item :label="language('LINGJIAHAO', '零件号')" prop='partNum'>
          <i-input
              v-model.trim="queryAkeoForm.partNum"
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
            <el-form-item prop="minCost">
              <i-input
                  v-model.trim="queryAkeoForm.minCost"
                  @input="queryAkeoForm.minCost=queryAkeoForm.minCost.replace(/^(\-)*(\d+)\.(\d{4}).*$/, '$1$2.$3')"
                  :placeholder="language('LK_QINGSHURU','请输入')"
                  clearable
              ></i-input>
            </el-form-item>
            <span class="splitLine"></span>
            <el-form-item prop="maxCost">
              <i-input
                  v-model.trim="queryAkeoForm.maxCost"
                  @input="queryAkeoForm.maxCost=queryAkeoForm.maxCost.replace(/^(\-)*(\d+)\.(\d{4}).*$/, '$1$2.$3')"
                  :placeholder="language('LK_QINGSHURU','请输入')"
                  clearable
              ></i-input>
            </el-form-item>
          </div>
        </el-form-item>
      </el-form>
    </i-search>

    <!--表格展示区--->
    <i-card>
      <span class="font18 font-weight">{{ language('LK_AEKOSHENPI', 'AEKO审批') }}</span>
      <div class="editControl floatright margin-bottom20">
        <i-button @click="batchApproval"> 批量批准</i-button>
        <i-button @click="approval"> {{ language('SHENPI', '审批') }}</i-button>
        <i-button @click="transfer" v-if="transferButtonDisplay"> {{ language('LK_ZHUANPAI', '转派') }}</i-button>

      </div>
      <!--表格展示区-->
      <tablelist
          height="400"
          index
          :selection="true"
          :tableData="pendingList"
          :tableTitle="pendingHeader"
          :lang="true"
          v-loading="tableLoading"
          @handleSelectionChange="handleSelectionChange"
      >
        <template #isTop="scope">
          <div>
            <span class="icon"><icon v-if="scope.row.isTop" symbol class="icon" name="iconAEKO_TOP"/></span>
          </div>
        </template>
        <!--aekoNum-->
        <template #aekoNum="scope">
          <div style="text-align:left">
            <a class="link-underline" @click="lookDetails(scope.row)">
              {{ scope.row.aekoNum }}
            </a>
          </div>
        </template>
        <!--审批类型-->
        <template #auditTypeName="scope">
          <div style="text-align:left">
            <span>{{ scope.row.auditTypeName }}</span>
          </div>
        </template>
        <!--描述-->
        <template #describe="scope">
          <a class="link-underline" @click="lookAEKODesc(scope.row)">
            {{ language('CHAKAN', '查看') }}
          </a>
        </template>
        <!---更改零件名称描述-->
        <template #assignsheet="scope">
          <span>{{ scope.row.changePartName }}</span>
        </template>
        <!--涉及车型和车型项目-->
        <template #carType="scope">
          <span>{{ scope.row.carType }}</span>
        </template>
        <!--主要供应商-->
        <template #supplier="scope">
          <span>{{ scope.row.supplierNameZh }}</span>
        </template>

        <!--增加材料成本-->
        <template #EP1="scope">
          <span>{{ scope.row.materialIncrease }}</span>
          <el-tooltip v-if="scope.row.auditType!=3" effect="light" popper-class="custom-card-tooltip"
                      placement="top">
            <div slot="content" v-html="queryRowMaterialIncreaseTipContent(scope.row)"></div>
            <div class="oneLine">{{ queryRowMaterialIncreaseTipContent(scope.row) }}</div>
            <i class="el-icon-warning-outline bule"></i>
          </el-tooltip>
        </template>
        <!--增加投资税-->
        <template #EP2="scope">
          <span>{{ scope.row.investmentIncrease }}</span>
          <el-tooltip v-if="scope.row.auditType!=3" effect="light" popper-class="custom-card-tooltip"
                      placement="top">
            <div slot="content" v-html="queryRowInvestmentIncreaseTipContent(scope.row)"></div>
            <div class="oneLine">{{ queryRowInvestmentIncreaseTipContent(scope.row) }}</div>
            <i class="el-icon-warning-outline bule"></i>
          </el-tooltip>
        </template>
        <!--其他费用-->
        <template #EP3="scope">
          <span>{{ scope.row.otherCost }}</span>
          <el-tooltip v-if="scope.row.auditType!=3" effect="light" popper-class="custom-card-tooltip"
                      placement="top">
            <div slot="content" v-html="queryRowotherCostTipContent(scope.row)"></div>
            <div class="oneLine">{{ queryRowotherCostTipContent(scope.row) }}</div>
            <i class="el-icon-warning-outline bule"></i>
          </el-tooltip>
        </template>
        <!--科室-->
        <template #DepartmentName="scope">
          <span>{{ scope.row.departmentName }}</span>
        </template>
        <!--采购员-->
        <template #buyerName="scope">
          <span>{{ scope.row.buyerName }}</span>
        </template>
        <!--审批附件-->
        <template #attach="scope">
          <a class="link-underline" @click="openApprovalAttachment(scope.row)">
            {{ language('CHAKAN', '查看') }}
          </a>
        </template>
        <!--AEKO截止日期-->
        <template #date="scope">
          <span>{{ scope.row.deadLine|formatDate }}</span>
        </template>
        <!--创建时间-->
        <template #createDate="scope">
          <span>{{ scope.row.createDate|formatDate }}</span>
        </template>
      </tablelist>
      <div class="pagination">
        <iPagination v-update class="pagination"
                     @size-change="handleSizeChange($event, loadPendingAKEOList)"
                     @current-change="handleCurrentChange($event, loadPendingAKEOList)"
                     background
                     :current-page="page.currPage"
                     :page-sizes="page.pageSizes"
                     :page-size="page.pageSize"
                     :layout="page.layout"
                     :total="page.totalCount"/>
      </div>
    </i-card>

    <AEKOTransferDialog v-model="transferDialogVal" @confirmTransfer="confirmTransfer"/>
  </div>
</template>

<script>
import {iSearch, iInput, iCard, iButton, iSelect, iPagination, icon, iMessage} from "rise"
import {tableCsfTitle as pendingHeader} from '../components/data'
import tablelist from 'rise/web/components/iFile/tableList';
import {pageMixins} from '@/utils/pageMixins'
import {pendingApprovalList, aekoAudit, transferAEKO} from "@/api/aeko/approve";
import {searchLinie} from "@/api/aeko/manage";
import {user as configUser} from '@/config'
import AEKOTransferDialog from "./components/AEKOTransferDialog";
import {getAekoDetail} from "@/api/aeko/detail";
import * as dateUtils from "@/utils/date";

export default {
  name: "AKEOPendingPage",
  mixins: [pageMixins],
  components: {
    AEKOTransferDialog,
    iSearch,
    iInput,
    iCard,
    iButton,
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
    }
  },
  computed: {
    transferButtonDisplay: function () {
      let user = this.$store.state.permission.userInfo
      let roles = user.roleList
      if (null != roles && roles.length > 0) {
        let btnShow = false
        for (let i = 0; i < roles.length; i++) {
          let item = roles[i]
          if (item.code == 'QQCGGZ') {
            btnShow = true
            break
          }
        }
        return btnShow
      }
      return false
    }
  },
  data() {
    return {
      //查询表单
      queryAkeoForm: {
        aekoNum: '',//aeko号
        maxCost: '',//成本变化上限
        minCost: '',//成本变化下限
        current: 1,//当前页
        size: 10,//分页大小
        buyerName: '',//专业采购员
        supplierName: '',//供应商简称
        partNum: '',//零件号
        buyerId: '',//
      },
      //返回数据
      pendingList: [],
      //列表数据表头
      pendingHeader: pendingHeader,
      tableLoading: false,
      //选中回调数据集合
      selectPendingList: [],
      loading: false,
      buyerUsers: [],//专业采购员
      options: [],
      transferDialogVal: false

    }

  },
  created() {
    this.loadPendingAKEOList()
    this.queryAllLin()
  },
  methods: {
    //aeko/describe?requirementAekoId=10535&aekoCode=VA1EH8
    checkMinCost() {
      let value = this.queryAkeoForm.minCost

      if (!isNaN(Number(value))){
        if (value.indexOf('.') > -1 && value.toString().split('.')[1].length > 4) {
        this.$message.error(this.language('LK_QINGSHURUZHENGQUESHUZHIXIAODIANHOUBAONIUSIWEIXIAOSHU','请输入正确的数值，小数点后保留四位数字'))
        return false
      }
      if (this.queryAkeoForm.maxCost != null && this.queryAkeoForm.maxCost != '') {
        if (Number(value) > Number(this.queryAkeoForm.maxCost)) {
          this.$message.error(this.language('LK_ZUIXIAOZHIBUNENGDAYUZUIDAZHI','最小值不能大于最大值'));
          return false
        }
      }
      return true
      }else{
        this.$message.error(this.language('LK_QINGSHURUZHENGQUESHUZHI', '请输入正确数值'));
        return false
      }
    },
    checkMaxCost() {
      let value = this.queryAkeoForm.maxCost
     if (!isNaN(Number(value))) {
        if (value.indexOf('.') > -1 && value.toString().split('.')[1].length > 4) {
          this.$message.error(this.language('LK_QINGSHURUZHENGQUESHUZHIXIAODIANHOUBAONIUSIWEIXIAOSHU','请输入正确的数值，小数点后保留四位数字'))
          return false
        }
        if (!isNaN(this.queryAkeoForm.minCost)) {
          if (Number(value) < Number(this.queryAkeoForm.maxCost)) {
            this.$message.error(this.language('LK_ZUIDAZHIBUNENGXIAOYUZUIXIAOZHI','最大值不能小于最小值'));
            return false
          }
        }
        return true
      }else{
        this.$message.error(this.language('LK_QINGSHURUZHENGQUESHUZHI', '请输入正确数值'));
        return false
      }
    },
    //加载数据
    loadPendingAKEOList() {
      this.tableLoading = true
      this.queryAkeoForm.current = this.page.currPage
      this.queryAkeoForm.size = this.page.pageSize
      pendingApprovalList(this.queryAkeoForm).then(res => {
        this.tableLoading = false
        if (res.code == 200) {
          this.pendingList = res.data
          this.page.totalCount = res.total
        }
      })
    },
    //查询
    queryPendingAKEOForm() {
      if (this.checkMinCost() && this.checkMaxCost()) {
        this.page.currPage = 1
        this.queryAkeoForm.size = this.page.pageSize
        this.loadPendingAKEOList()
      }
    },
    //重置查询表单
    restQueryForm() {
      this.$refs.AKEOQueryFormRef.resetFields()
      this.loadPendingAKEOList()
    },
    //远程搜索专业采购员
    remoteMethod(query) {
      if (query !== '') {
        this.loading = true;
        setTimeout(() => {
          this.loading = false;
          this.options = this.buyerUsers.filter(item => {
            return item.label.toLowerCase()
                .indexOf(query.toLowerCase()) > -1;
          });
        }, 200);
      } else {
        this.options = [];
      }
    },

    queryAllLin() {
      const {buyerName = [], userInfo = {}} = this;
      if (buyerName.length) {
        buyerName.map((item) => {
          item.label = this.$i18n.locale === "zh" ? item.nameZh : item.nameEn;
          item.value = item.id;
        })
        this.buyerUsers = buyerName;
      } else {
        const {deptDTO = {}} = userInfo;
        const deptId = deptDTO.id;
        searchLinie({tagId: configUser.LINLIE, deptId,}).then((res) => {
          const {code, data} = res;
          if (code == 200) {
            data.map((item) => {
              item.label = this.$i18n.locale === "zh" ? item.nameZh : item.nameEn;
              item.value = item.id;
            })
            this.buyerUsers = data;
          } else {
            this.$message.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn);
          }
        })
      }
    },
    //查看描述
    lookAEKODesc(row) {
      let routeData = this.$router.resolve({
        path: `/aeko/describe?requirementAekoId=${row.requirementAekoId}&aekoCode=${row.aekoNum}`,
      })
      window.open(routeData.href, '_blank')
    },
    //转派
    transfer() {
      //this.$message.error('您已完成当前AEKO行的审批，不可进行转派')
      if (this.selectPendingList.length === 0 || this.selectPendingList.length > 1) {
        return this.$message.error(this.$t('LK_NINDANGQIANHAIWEIXUANZE'))
      }
      this.transferDialogVal = true
    },
    confirmTransfer(selBuyerId) {
      let selectPendingItem = this.selectPendingList[0]
      if (null != selectPendingItem) {
        let transfers = []
        selectPendingItem.workFlowDTOS.forEach(item => {
          transfers.push({
            targetUserId: selBuyerId,
            aekoCode: selectPendingItem.aekoNum,
            taskId: item.taskId,
            userId: this.$store.state.permission.userInfo.id
          })
        })
        this.tableLoading = true
        transferAEKO(transfers).then(res => {
          this.tableLoading = false
          if (res.code == 200) {
            this.loadPendingAKEOList()
          } else {
            this.$message.error(res.desZh)
          }
        })
      }


    },
    //增加材料成本Tip
    queryRowMaterialIncreaseTipContent(row) {
      let costsWithLinie = this.assemblyTipData(row.aekoCoverCostVOList)
      if (costsWithLinie != null && costsWithLinie.length > 0) {
        let strTip = ''
        costsWithLinie.forEach(item => {
          let materialIncreaseMoney = 0
          item.data.forEach(item1 => {
            materialIncreaseMoney += Number(item1.materialIncrease)
          })
          strTip += `${item.linieDeptNum}-${item.linieName}:RMB ${materialIncreaseMoney} \n `
        })
        return strTip.split("\n").join("<br/>")
      }
      return ''
    },
    //查询增加投资费Tip
    queryRowInvestmentIncreaseTipContent(row) {
      let costsWithLinie = this.assemblyTipData(row.aekoCoverCostVOList)
      if (costsWithLinie != null && costsWithLinie.length > 0) {
        let strTip = ''
        costsWithLinie.forEach(item => {
          let investmentIncreaseCostMoney = 0
          item.data.forEach(item1 => {
            investmentIncreaseCostMoney += Number(item1.investmentIncrease)
          })
          strTip += `${item.linieDeptNum}-${item.linieName}:RMB ${investmentIncreaseCostMoney}\n`
        })
        return strTip.split("\n").join("<br/>")
      }
      return ''
    },
    //其他费用Tip
    queryRowotherCostTipContent(row) {
      let costsWithLinie = this.assemblyTipData(row.aekoCoverCostVOList)
      if (costsWithLinie != null && costsWithLinie.length > 0) {
        let strTip = ''
        costsWithLinie.forEach(item => {
          let otherCostMoney = 0
          item.data.forEach(item1 => {
            otherCostMoney += Number(item1.otherCost)
          })
          strTip += `${item.linieDeptNum}-${item.linieName}:RMB ${otherCostMoney}\n`
        })
        return strTip.split("\n").join("<br/>")
      }
      return ''
    },

    assemblyTipData(sourceData) {
      let map = {}
      let dest = []
      if (null != sourceData && sourceData.length > 0) {
        for (let i = 0; i < sourceData.length; i++) {
          let ai = sourceData[i];
          if (!map[ai.linieName]) {
            dest.push({
              linieDeptNum: ai.linieDeptNum,
              linieName: ai.linieName,
              data: [ai]
            });
            map[ai.linieName] = ai;
          } else {
            for (let j = 0; j < dest.length; j++) {
              let dj = dest[j];
              if (dj.linieName == ai.linieName) {
                dj.data.push(ai);
                break;
              }
            }
          }
        }
        return dest
      }
      return []
    },

    //批量批准
    batchApproval() {
      if (this.selectPendingList.length <= 0) {
        return this.$message.warning('请选择需要审批的数据')
      }
      this.$confirm('当选勾选AEKO将会全部批准,请确认', '批准', {
        confirmButtonText: '确认',
        cancelButtonText: '返回',
      }).then(() => {
        let reqArrays = []
        this.selectPendingList.forEach(item => {
          item.workFlowDTOS.forEach(workItem => {
            reqArrays.push({
              aekoCode: item.aekoNum,
              aekoAuditType: item.auditType,
              approvalResult: 1,
              comment: '',
              workFlowDTO: workItem
            })
          })
        })
        aekoAudit(reqArrays).then(res => {
          if (res.code == 200) {
            if (res.data.failCount > 0) {
              this.$message.error(`您已成功审批${res.data.successCount}个采购员的表态，失败${res.data.failCount}个采购员的表态，请重试`)
            } else {
              this.$message.success(`您已成功审批${res.data.successCount}个采购员的表态，失败${res.data.failCount}个采购员的表态!`)
            }
            this.loadPendingAKEOList()
          } else {
            this.$message.error(res.desZh)

          }
        })

      }).catch(() => {

      });
    },
    //审批
    approval() {

      this.$message.warning('期待下个版本吧')
    },
    //选中回调
    handleSelectionChange(val) {
      this.selectPendingList = val
    },
    //打开审批附件
    openApprovalAttachment(row) {
      let reqP = {requirementAekoId: row.requirementAekoId}
      getAekoDetail(reqP).then(res => {
        if (res.code == 200) {
          let taskIds = row.workFlowDTOS.map((item) => item.taskId)
          let taskId = taskIds.join(',');
          let transmitObj = {
            option: 1,
            aekoApprovalDetails: {
              aekoNum: row.aekoNum,
              requirementAekoId: row.requirementAekoId,
              aekoAuditType: row.auditType,
              workFlowDTOS: row.workFlowDTOS,
              aekoManageId: res.data.aekoManageId
            }
          }
          let routeData = this.$router.resolve({
            path: `/aeko/AEKOApprovalDetails/explainattach`,
            query: {
              requirementAekoId: row.requirementAekoId,
              aekoManageId: res.data.aekoManageId,
              linieId: this.$store.state.permission.userInfo.id,
              taskId: taskId,
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
    //跳转到详情
    lookDetails(row) {
      let reqP = {requirementAekoId: row.requirementAekoId}
      getAekoDetail(reqP).then(res => {
        if (res.code == 200) {
          let taskIds = row.workFlowDTOS.map((item) => item.taskId)
          let taskId = taskIds.join(',');
          let transmitObj = {
            option: 1,
            aekoApprovalDetails: {
              aekoNum: row.aekoNum,
              requirementAekoId: row.requirementAekoId,
              aekoAuditType: row.auditType,
              workFlowDTOS: row.workFlowDTOS,
              aekoManageId: res.data.aekoManageId
            }
          }
          let routeData = this.$router.resolve({
            path: `/aeko/AEKOApprovalDetails`,
            query: {
              requirementAekoId: row.requirementAekoId,
              aekoManageId: res.data.aekoManageId,
              linieId: this.$store.state.permission.userInfo.id,
              taskId: taskId,
              transmitObj: window.btoa(unescape(encodeURIComponent(JSON.stringify(transmitObj))))
            }

          })
          window.open(routeData.href, '_blank')
        } else {
          this.$message.error(res.desZh)
        }
      })


    }
  }

}
</script>

<style scoped lang="scss">
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
    font-size: 28px;
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

.oneLine {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>
