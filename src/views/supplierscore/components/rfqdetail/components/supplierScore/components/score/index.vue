<!--
 * @Author: your name
 * @Date: 2021-06-22 16:16:26
 * @LastEditTime: 2021-07-27 17:44:43
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\views\supplierscore\components\rfqdetail\components\supplierScore\components\score\index.vue
-->
<template>
  <iCard class="score" :title="language('LK_GONGYINGSHANGPINGFEN', '供应商评分')">
    <template #header-control>
      <div v-if="!editStatus">
        <iButton @click="forwardDialogVisible = true">{{ language("LK_ZHUANPAI", "转派") }}</iButton>
        <iButton :loading="backLoading" @click="handleBack">{{ language("TUIHUIZHICAIGOUYUAN", "退回至采购员") }}</iButton>
        <iButton @click="editStatus = true">{{ language("BIANJI", "编辑") }}</iButton>
        <iButton :loading="submitLoading" @click="handleSubmit">{{ language("LK_TIJIAO", "提交") }}</iButton>
        <iButton :loading="approveLoading" @click="handleApprove">{{ language("PIZHUN", "批准") }}</iButton>
        <iButton @click="handleReject">{{ language("JUJUE", "拒绝") }}</iButton>
      </div>
      <div v-else>
        <iButton @click="handleCloseEdit">{{ language("JIESHUBIANJI", "结束编辑") }}</iButton>
        <iButton :loading="saveLoading" @click="handleSave">{{ language("BAOCUN", "保存") }}</iButton>
      </div>
    </template>
    <div class="body">
      <el-table
        v-loading="loading"
        :data="tableListData"
        :empty-text="language('ZANWUSHUJU', '暂无数据')">
        <el-table-column type="index" align="center" label="#"></el-table-column>
        <el-table-column align="center" v-for="(item, $index) in tableTitle" :key="$index" :label="language(item.key, item.name)" :show-overflow-tooltip="true">
          <template v-if="item.props === 'sapCode'" v-slot="scope">
            <span>{{ scope.row.sapCode || scope.row.svwCode || scope.row.svwTempCode }}</span>
          </template>
          <template v-else-if="item.props === 'partScore'" v-slot="scope">
            <span class="link-underline" @click="viewPartScore(scope.row)">{{ language("CHAKAN", "查看") }}</span>
          </template>
          <template v-else v-slot="scope">
            <span>{{ scope.row[item.props] }}</span>
          </template>
        </el-table-column>
        <template>
          <el-table-column align="center" :label="rateTag">
            <el-table-column align="center" v-for="item in deptScoreTableTitle" :key="item.props" :label="language(item.key, item.name)">
              <template v-if="item.props === 'rate'" #header="scope">
                <span>{{ scope.column.label }}<i class="required">*</i></span>
              </template>
              <template v-if="item.props === 'rate'" v-slot="scope">
                <div v-if="editStatus">
                  <iInput v-if="afterSaleLeaderIds.every(id => id != userInfo.id)" v-model="scope.row.rate" />
                  <iSelect v-else v-model="scope.row.rate">
                    <el-option value="合格" :label="language('HEGE', '合格')" />
                    <el-option value="不合格" :label="language('BUHEGE', '不合格')" />
                  </iSelect>
                </div>
                <span v-else>{{ scope.row.rate }}</span>
              </template>
              <template v-else-if="item.props === 'externalFee' || item.props === 'addFee'" v-slot="scope">
                <iInput v-if="editStatus" v-model="scope.row[item.props]" />
                <span v-else>{{ scope.row[item.props] }}</span>
              </template>
              <template v-else-if="item.props === 'confirmCycle'" v-slot="scope">
                <iInput v-if="editStatus" v-model="scope.row.confirmCycle" />
                <span v-else>{{ scope.row.confirmCycle }}</span>
              </template>
              <template v-else-if="item.props === 'remark'" v-slot="scope">
                <span v-if="scope.row.memo" class="link-underline" @click="editRemark(scope.row)">{{ language("CHAKAN", "查看") }}</span>
                <span v-else class="link-underline" @click="editRemark(scope.row)">{{ language("BIANJI", "编辑") }}</span>
              </template>
              <template v-else v-slot="scope">
                <span>{{ scope.row[item.props] }}</span>
              </template>
            </el-table-column>
          </el-table-column>
        </template>
      </el-table>
    </div>
    <forwardDialog ref="forwardDialog" :visible.sync="forwardDialogVisible" @confirm="confirmForward" />
    <rejectDialog ref="rejectDialog" :visible.sync="rejectDialogVisible" @confirm="confirmReject" />
    <remarkDialog ref="remarkDialog" :visible.sync="remarkDialogVisible" :data="currentRow.memo" @confirm="confirmRemark" @cancel="currentRow = {}" />
  </iCard>
</template>

<script>
import { iCard, iButton, iInput, iSelect, iMessage, iMessageBox } from "rise"
import forwardDialog from "@/views/supplierscore/components/forwardDialog"
import rejectDialog from "./components/rejectDialog"
import remarkDialog from "@/views/supplierscore/components/remarkDialog"
import { pageMixins } from "@/utils/pageMixins"
import { scoreTableTitle as tableTitle, deptScoreTableTitle } from "../data"
import { cloneDeep, isEqual } from "lodash"
import { getRfqBdlRatingsByCurrentDept, forward, backRfqBdlRatings, submitRfqBdlRatings, approveRfqBdlRatings, rejectRfqBdlRatings, updateRfqBdlRatings, updateRfqBdlRatingMemo } from "@/api/supplierscore"
import { afterSaleLeaderIds } from "@/views/supplierscore/components/data"

export default {
  components: {
    iCard,
    iButton,
    iInput,
    iSelect,
    forwardDialog,
    rejectDialog,
    remarkDialog,
  },
  mixins: [ pageMixins ],
  props: {
    rfqId: {
      type: String,
      require: true
    }
  },
  computed: {
    // eslint-disable-next-line no-undef
    ...Vuex.mapState({
      userInfo: state => state.permission.userInfo,
    })
  },
  created() {
    if (this.afterSaleLeaderIds.some(id => id == this.userInfo.id)) {
      this.deptScoreTableTitle = this.deptScoreTableTitle.filter(item => item.props === "rate" || item.props === "remark" || item.props === "rateStatus")
    }
  },
  data() {
    return {
      editStatus: false,
      loading: false,
      tableTitle: tableTitle,
      deptScoreTableTitle,
      tableListData: [],
      tableListDataCache: [],
      multipleSelection: [],
      rateTag: "",
      remarkDialogVisible: false,
      forwardDialogVisible: false,
      currentRow: {},
      backLoading: false,
      submitLoading: false,
      approveLoading: false,
      rejectDialogVisible: false,
      saveLoading: false,
      afterSaleLeaderIds,
    }
  },
  methods: {
    getRfqBdlRatingsByCurrentDept() {
      this.loading = true
      getRfqBdlRatingsByCurrentDept({
        rfqId: this.rfqId
      })
      .then(res => {
        this.tableListData = []

        if (res.code == 200) {
          this.tableListData = Array.isArray(res.data) ? res.data : []
          this.tableListDataCache = cloneDeep(this.tableListData)
          this.rateTag = this.tableListData[0] && this.tableListData[0].rateTag ? this.tableListData[0].rateTag.desc : ""
        } else {
          iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn)
        }
        
        this.loading = false
      })
      .catch(() => {
        this.loading = false
        this.partRatingList = []
        this.tableListData = []
      })
    },
    handleSelectionChange(list) {
      this.multipleSelection = list
    },
    // 确认转派
    confirmForward(userInfo) {
      this.$refs.forwardDialog.updateConfirmLoading(true)

      forward({
        raterId: userInfo.id,
        rater: userInfo.nameZh,
        rfqIds: [ this.rfqId ]
      })
      .then(res => {
        const message = this.$i18n.locale === "zh" ? res.desZh : res.desEn

        if (res.code == 200) {
          iMessage.success(message)
          this.forwardDialogVisible = false
          this.getRfqBdlRatingsByCurrentDept()
        } else {
          iMessage.error(message)
        }

        this.$refs.forwardDialog.updateConfirmLoading(false)
      })
      .catch(() => this.$refs.forwardDialog.updateConfirmLoading(false))
    },
    // 退回至采购员
    handleBack() {
      this.backLoading = true

      backRfqBdlRatings({
        rfqId: this.rfqId
      })
      .then(res => {
        const message = this.$i18n.locale === "zh" ? res.desZh : res.desEn

        if (res.code == 200) {
          iMessage.success(message)
          // this.$emit("updateRfq")
          this.getRfqBdlRatingsByCurrentDept()
        } else {
          iMessage.error(message)
        }

        this.backLoading = false
      })
      .catch(() => this.backLoading = false)
    },
    // 提交
    handleSubmit() {
      this.submitLoading = true

      submitRfqBdlRatings({
        rfqId: this.rfqId
      })
      .then(res => {
        const message = this.$i18n.locale === "zh" ? res.desZh : res.desEn

        if (res.code == 200) {
          iMessage.success(message)
          // this.$emit("updateRfq")
          this.getRfqBdlRatingsByCurrentDept()
        } else {
          iMessage.error(message)
        }

        this.submitLoading = false
      })
      .catch(() => this.submitLoading = false)
    },
    // 批准
    handleApprove() {
      this.approveLoading = true

      approveRfqBdlRatings({
        rfqId: this.rfqId
      })
      .then(res => {
        const message = this.$i18n.locale === "zh" ? res.desZh : res.desEn

        if (res.code == 200) {
          iMessage.success(message)
          // this.$emit("updateRfq")
          this.getRfqBdlRatingsByCurrentDept()
        } else {
          iMessage.error(message)
        }

        this.approveLoading = false
      })
      .catch(() => this.approveLoading = false)
    },
    // 拒绝
    handleReject() {
      this.rejectDialogVisible = true
    },
    // 确认拒绝
    confirmReject(reason) {
      this.$refs.rejectDialog.updateConfirmLoading(true)

      rejectRfqBdlRatings({
        rfqId: this.rfqId,
        reason
      })
      .then(res => {
        const message = this.$i18n.locale === "zh" ? res.desZh : res.desEn

        if (res.code == 200) {
          iMessage.success(message)
          this.rejectDialogVisible = false
          // this.$emit("updateRfq")
          this.getRfqBdlRatingsByCurrentDept()
        } else {
          iMessage.error(message)
        }

        this.$refs.rejectDialog.updateConfirmLoading(false)
      })
      .catch(() => this.$refs.rejectDialog.updateConfirmLoading(false))
    },
    // 结束编辑
    handleCloseEdit() {
      if (!isEqual(this.tableListData, this.tableListDataCache)) {
        iMessageBox(
          this.language("DISCARDCHANGE", "内容已经发生变化，是否确定要放弃修改？"), 
          this.language("TISHI", "提示"),  
          { 
            confirmButtonText: this.language("QUEREN", "确认")
          }
        )
        .then(() => {
          this.editStatus = false
          this.tableListData = cloneDeep(this.tableListDataCache)
        })
        .catch(() => {})
      } else {
        this.editStatus = false
      }
    },
    // 保存
    handleSave() {
      if (isEqual(this.tableListData, this.tableListDataCache)) {
        return iMessageBox(
          this.language("NOCHANGEDONTSAVE", "没有发现更改，不需要保存。"), 
          this.language("TISHI", "提示"), 
          { 
            showCancelButton: false, 
            confirmButtonText: this.language("QUEREN", "确认") 
          }
        )
      }

      if (this.tableListData.some(item => !item.rate && item.rate !== 0)) {
        return iMessage.warn(this.language("PINGFENLIEWEIBITIANXIANG", "评分列为必填项"))
      }

      this.saveLoading = true

      updateRfqBdlRatings(
        this.tableListData.map(item => ({
          addFee: item.addFee,
          confirmCycle: item.confirmCycle,
          externalFee: item.externalFee,
          id: item.id,
          rate: item.rate,
          rfqId: this.rfqId
        }))
      )
      .then(res => {
        const message = this.$i18n.locale === "zh" ? res.desZh : res.desEn

        if (res.code == 200) {
          iMessage.success(message)
          // this.$emit("updateRfq")
          this.getRfqBdlRatingsByCurrentDept()
        } else {
          iMessage.error(message)
        }

        this.saveLoading = false
      })
      .catch(() => this.saveLoading = false)
    },
    // 查看零件评分
    viewPartScore(row) {
      const route = this.$router.resolve({
        path: "/supplierscore/partscore",
        query: {
          rfqId: row.rfqId,
          supplierId: row.supplierId
        }
      })
      window.open(route.href, "_blank")
    },
    // 编辑/查看 备注
    editRemark(row) {
      this.currentRow = row
      this.remarkDialogVisible = true
    },
    // 确认备注
    confirmRemark(remark) {
      this.$refs.remarkDialog.updateConfirmLoading(true)

      updateRfqBdlRatingMemo({
        id: this.currentRow.id,
        memo: remark
      })
      .then(res => {
        const message = this.$i18n.locale === "zh" ? res.desZh : res.desEn

        if (res.code == 200) {
          iMessage.success(message)
          this.$set(this.currentRow, "memo", remark)
          this.remarkDialogVisible = false
          this.currentRow = {}
          // this.getRfqBdlRatingsByCurrentDept() 测试数据是否正确更新用
        } else {
          iMessage.error(message)
        }

        this.$refs.remarkDialog.updateConfirmLoading(false)
      })
      .catch(() => this.$refs.remarkDialog.updateConfirmLoading(false))
    },
  }
}
</script>

<style lang="scss" scoped>
.score {
  .required {
    color: #E30D0D;
    font-style: normal;
    margin-left: 2px;
    font-size: 14px;
  }
}
</style>