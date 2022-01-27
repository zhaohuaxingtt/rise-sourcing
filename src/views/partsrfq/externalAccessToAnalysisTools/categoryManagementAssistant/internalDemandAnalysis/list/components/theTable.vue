<template>
  <iCard>
    <div class="margin-bottom20 clearFloat">
      <div class="floatright">
        <!--新增-->
        <iButton
          class="ml10"
          @click="add"
          v-if="isAuth(whiteBtnList, 'ACHIEVEMENTMGT_LIST_NEWADD')"
        >
          {{ language('新增') }}
        </iButton>
        <!--失效-->
        <iButton
          class="ml10"
          @click="invalid"
          v-if="isAuth(whiteBtnList, 'ACHIEVEMENTMGT_LIST_INVALID')"
        >
          {{ language('失效') }}
        </iButton>
        <!--产量管理-->
        <iButton
          class="ml10"
          @click="openOutputManagemen"
          v-if="
            isAuth(whiteBtnList, 'ACHIEVEMENTMGT_LIST_YIEIDMANAGE') && !state
          "
        >
          {{ $t('LK_CLGL') }}
        </iButton>
        <!--业绩金额调整-->
        <iButton
          class="ml10"
          @click="openAmountAdjustment"
          v-if="
            isAuth(whiteBtnList, 'ACHIEVEMENTMGT_AMOUNT_ADJUSTMENT') && !state
          "
        >
          {{ language('LK_YJJETZ','业绩金额调整') }}
        </iButton>
        <!--年度目标管理-->
        <iButton
          class="ml10"
          @click="openTargetManDialog"
          v-if="bzzlorbzorkzzl"
        >
          {{ $t('LK_NDMBGL') }}
        </iButton>
        <!--年度目标管理 配附件-->
        <iButton
          class="ml10"
          @click="openSpareTargetManDialog"
          v-if="
            (isAuth(whiteBtnList, 'ACHIEVEMENTMGT_LIST_TARGETMANAGE') &&
              state) ||
            state
          "
          >{{ $t('LK_NDMBGL') }}
        </iButton>
        <!--基础表模板下载 配附件-->
        <iButton
          class="ml10"
          @click="spareTempDown"
          v-if="
            isAuth(whiteBtnList, 'ACHIEVEMENTMGT_TABLE_TEMPLATE_DOWN') || state
          "
        >
          {{ $t('LK_JCBMBXZ') }}
        </iButton>
      </div>
    </div>
    <tableList
      class="basetable"
      :tableData="tableListData"
      :tableTitle="tableTitle"
      :tableLoading="tableLoading"
      :openPageGetRowData="true"
      :openPageProps="['title', 'operation']"
      @openPage="openPage"
      @handleSelectionChange="handleSelectionChange"
      height="380px"
    >
    </tableList>
    <iPagination
      v-update
      @size-change="handleSizeChange($event, getTableList)"
      @current-change="handleCurrentChange($event, getTableList)"
      background
      :page-sizes="page.pageSizes"
      :page-size="page.pageSize"
      :layout="page.layout"
      :current-page="page.currPage"
      :total="page.totalCount"
    >
    </iPagination>

    <!--新增业绩基础-->
    <newAddDialog
      :yearList="yearList"
      v-model="newAddDialog"
      v-if="newAddDialog"
      @handleSubmit="handleNewAddSubmit"
    />
    <!--创建年度目标-->
    <targetDialog
      v-if="targetDialog"
      :yearList="yearList"
      v-model="targetDialog"
      @handleSubmit="handleTargetSubmit"
    />
    <!--发起确认-->
    <commitDialog
      :id="id"
      v-model="commitDialog"
      v-if="commitDialog"
      @handleSubmit="handleCommitSumit"
    ></commitDialog>
    <!--业绩金额调整-->
    <amountAdjustDialog
      :yearList="yearList"
      v-model="adjusDialog"
      v-if="adjusDialog"
      @handleSubmit="handleAdjustSumit"
    ></amountAdjustDialog>
    <!--配附件 年度目标-->
    <spareTargetDialog
      :yearList="yearList"
      v-model="spareTargetDialog"
      v-if="spareTargetDialog"
      @handleSubmit="handleSpareTargetSubmit"
    >
    </spareTargetDialog>
  </iCard>
</template>

<script>
import { iCard, iButton, iPagination, iMessage } from 'rise'
import tableList from './tableList'
import { pageMixins } from '@/utils/pageMixins'
import resultMessageMixin from './resultMessageMixin'
import { tableTitle } from './data'
import newAddDialog from './newAddDialog'
import targetDialog from './targetDialog'
import commitDialog from './commitDialog'
import amountAdjustDialog from './amountAdjustDialog'
import spareTargetDialog from './spareTargetDialog'
import isAuth from '@/utils/isAuth'
import {
  getAchievementList,
  getYear,
  invalid,
  cartypeOutputList,
  saveTask,
  downloadSptemplate
} from '@/api/achievement'

export default {
  mixins: [pageMixins, resultMessageMixin],
  components: {
    iCard,
    iButton,
    tableList,
    iPagination,
    newAddDialog,
    targetDialog,
    commitDialog,
    amountAdjustDialog,
    spareTargetDialog,
    iMessage
  },
  data() {
    return {
      tableListData: [],
      tableTitle,
      isAuth,
      tableLoading: false,
      selectTableData: [],
      targetDialog: false,
      newAddDialog: false,
      commitDialog: false,
      adjusDialog: false,
      spareTargetDialog: false, // 配附件年度目标管理
      yearList: [],
      id: '',
      whiteBtnList: this.$store.state.permission.whiteBtnList
    }
  },
  computed: {
    state() {
      return this.$store.state.permission.userInfo.roleList.some(
        (item) => item.code == 'PFJYJGLY'
      )
    },
    bzzlorbzorkzzl() {
      return this.$store.state.permission.userInfo.roleList.some(
        (item) =>
          item.code == 'BZZL' ||
          item.code == 'CGBZ' ||
          item.code == 'ZYCGKSXTY' ||
          item.code == 'ZYCGKSXTDY'
      )
    }
  },
  created() {
    this.getTableList()
    this.getYearData()
  },
  methods: {
    // 获取年份数据
    getYearData() {
      getYear()
        .then((res) => {
          if (res.result) {
            this.yearList = res.data
            this.yearList = this.yearList.sort((a, b) => b - a)
          }
        })
        .catch(() => {})
    },
    openPage(val) {
      if (val.value == '刷新') {
        this.$alert(
          '此操作不会立即执行,预计每日可查看执行结果，同时该版本将被覆盖 是否继续刷新?',
          '提示',
          {
            confirmButtonText: '确定',
            callback: (action) => {
              const id = val.id
              const type = val.type
              if (action == 'confirm') {
                saveTask({ id, type }).then((res) => {
                  if (res.result) {
                    return iMessage.success(
                      `${
                        this.$i18n.locale === 'zh'
                          ? '刷新成功'
                          : 'refresh success'
                      }`
                    )
                  }
                })
              }
            }
          }
        )
      } else if (val.value == '发起确认') {
        this.commitDialog = true
        this.id = val.id
      } else if (val.billType == 1) {
        if (val.status == 0 || val.status == 1) {
          return iMessage.error(
            `${
              this.$i18n.locale === 'zh'
                ? '此状态下无法查看业绩基础明细，请重新创建业绩基础'
                : 'unable to view the performance base details in the status of import failure. Please re create the performance base'
            }`
          )
        }
        let { id, year, version, title, status, billType, type } = val
        version = val.modelVersion
        let routeData = this.$router.resolve({
          path: '/achievement/baseData/targetManage',
          query: { id, year, version, title, status, billType, type }
        })
        window.open(routeData.href, '_blank')
      } else if (val.billType == 2) {
        if (val.status == 0 || val.status == 1) {
          return iMessage.error(
            `${
              this.$i18n.locale === 'zh'
                ? '此状态下无法查看业绩追踪明细，请重新创建业绩追踪'
                : 'unable to view the performance base details in the status of import failure. Please re create the performance base'
            }`
          )
        }
        let { id, year, version, title, status, billType, type } = val
        version = val.modelVersion
        let routeData = this.$router.resolve({
          path: '/achievement/baseData/targetManage',
          query: { id, year, version, title, status, billType, type }
        })
        window.open(routeData.href, '_blank')
      }
    },
    handleSelectionChange(val) {
      this.selectTableData = val
    },
    handleSizeChange(e) {
      this.page.pageSize = e
      this.getTableList()
    },
    handleCurrentChange(e) {
      this.page.currPage = e
      this.getTableList()
    },
    async getTableList() {
      this.tableLoading = true
      const searchItem = this.$parent.$children.filter((item) => {
        return item.$attrs.name === 'theSearch'
      })
      const searchForm = searchItem[0].form
      try {
        const req = {
          currentPage: this.page.currPage,
          pageSize: this.page.pageSize,
          ...searchForm
        }
        const res = await getAchievementList(req)
        if (res.result) {
          let year = new Date().getFullYear()
          this.tableListData = res.data.records
          this.tableListData.map((item) => {
            if (item.year >= year - 1 && item.billType == 2) {
              this.$set(item, 'refresh', '刷新')
            }
            if (item.billType == 2 && item.type == 2) {
              this.$set(item, 'title', item.year + '年业绩进度跟踪')
            }
            this.$set(item, '_status', '')
            this.$set(item, '_billType', '')
            this.$set(item, '_type', '')
            this.$set(item, '_source', '')
            if (item.status == 0) {
              item._status = '导入中'
            } else if (item.status == '1') {
              item._status = '导入失败'
            } else if (item.status == '2') {
              item._status = '草稿'
              if (item.billType == 1) this.$set(item, 'operation', '发起确认')
            } else if (item.status == '3') {
              item._status = 100 - item.completionRate + '%' + ' ' + '已完成'
            } else if (item.status == '4') {
              item._status = '已完成'
            } else if (item.status == '11') {
              item._status = '已生效'
            } else if (item.status == '99') {
              item._status = '失效'
            }
            if (item.billType == '1') {
              item._billType = '基础'
            } else if (item.billType == '2') {
              item._billType = '跟踪'
            }
            if (item.type == '1') {
              item._type = '批量件'
            } else if (item.type == '2') {
              item._type = '配附件'
            }
            if (item.source == '1') {
              item._source = '系统'
            } else if (item.source == '2') {
              item._source = '手动'
            }
          })
          this.page = {
            ...this.page,
            currPage: res.data.current,
            pageSize: res.data.size,
            totalCount: res.data.total
          }
        } else {
          this.resultMessage(res)
          this.tableListData = []
        }
        this.tableLoading = false
      } catch {
        this.tableListData = []
        this.tableLoading = false
      }
    },
    // 创建年度目标
    openTargetManDialog() {
      this.targetDialog = true
    },
    // 创建年度目标
    openSpareTargetManDialog() {
      this.spareTargetDialog = true
    },
    // 新增业绩基础
    add() {
      this.newAddDialog = true
    },
    // 失效
    invalid() {
      let id, status, billType,type, obj = {}
      if (this.selectTableData.length == 1) {
        id = this.selectTableData[0].id
        status = this.selectTableData[0].status
        billType = this.selectTableData[0].billType // 1 基础 2 跟踪
        type = this.selectTableData[0].type // 1 批量件 2 配附件
        obj.id = id
        if(billType==1) { // 基础
          obj.identification = 1
        } else if(billType==2 && type==1) {// 批量件跟踪
          obj.identification = 2
        } else if (billType==2 && type==2) { // 配附件跟踪
          obj.identification = 3
        }
      }
      if (id) {
        if (status == 3 || status == 11) {
          this.$confirm(
            '已有用户确认过的业绩基础明细，您是否确认要对该业绩基础表做失效处理?',
            '提示',
            {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }
          )
            .then(() => {
              invalid(obj).then((res) => {
                if (res.result) {
                  this.getTableList()
                  iMessage.success(
                    `${this.$i18n.locale === 'zh' ? res.desZh : res.desEn}`
                  )
                }
              })
            })
            .catch(() => {
              this.$message({
                type: 'info',
                message: '已取消'
              })
            })
        } else {
          invalid(obj).then((res) => {
            if (res.result) {
              this.getTableList()
              iMessage.success(
                `${this.$i18n.locale === 'zh' ? res.desZh : res.desEn}`
              )
            }
          })
        }
      } else {
        return iMessage.error(this.$t('SPR_FRM_XGYSPJ_QXZYTSJTJ'))
      }
    },
    // 产量管理跳转
    openOutputManagemen() {
      this.$router.push('/achievement/baseData/outputManagement')
    },
    handleNewAddSubmit(data) {
      this.newAddDialog = false
      this.getTableList()
    },
    handleTargetSubmit() {
      this.targetDialog = false
    },
    handleCommitSumit() {
      this.commitDialog = false
      this.getTableList()
    },

    // 业绩金额调整
    openAmountAdjustment() {
      this.adjusDialog = true
    },
    handleAdjustSumit() {
      this.adjusDialog = false
    },
    // 附件目标管理确认回调
    handleSpareTargetSubmit() {
      this.spareTargetDialog = false
    },
    // 基础表模板下载
    spareTempDown() {
      downloadSptemplate().then((res) => {})
    }
  }
}
</script>

<style scoped lang="scss">
::v-deep .el-form-item {
  margin-top: 0;
  margin-bottom: 0;
}

::v-deep .cardBody {
  padding: 20px 26px !important;
}
</style>
