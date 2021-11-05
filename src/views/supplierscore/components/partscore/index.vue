<!--
 * @Author: your name
 * @Date: 2021-06-24 10:38:09
 * @LastEditTime: 2021-07-27 19:16:27
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\views\supplierscore\components\partscore\index.vue
-->
<template>
  <iPage class="partscore">
    <div class="header clearFloat">
      <div class="title">{{ language("LK_LINGJIANPINGFEN", "零件评分") }}</div>
      <div class="control">
        <div v-if="editStatus">
          <iButton @click="handleCloseEdit">{{ language("JIESHUBIANJI", "结束编辑") }}</iButton>
          <iButton :loading="saveLoading" @click="handleSave">{{ language("BAOCUN", "保存") }}</iButton>
        </div>
        <div v-else>
          <iButton @click="editStatus = true">{{ language("JINRUBIANJI", "进入编辑") }}</iButton>
        </div>
        <logButton class="margin-left20" />
        <span class="margin-left20">
          <icon symbol name="icondatabaseweixuanzhong" class="font24"></icon>
        </span>
      </div>
    </div>
    <iCard class="margin-top30">
      <div class="body">
        <el-table
          height="100%"
          v-loading="loading"
          :data="tableListData"
          :empty-text="language('ZANWUSHUJU', '暂无数据')">
          <el-table-column type="index" align="center" label="#"></el-table-column>
          <el-table-column align="center" v-for="(item, $index) in tableTitle" :key="$index" :label="language(item.key, item.name)" :prop="item.props" :show-overflow-tooltip="true"></el-table-column>
          <template>
            <el-table-column align="center" :label="rateTag">
              <el-table-column align="center" v-for="item in deptScoreTableTitle" :key="item.props" :label="language(item.key, item.name)">
                <template v-if="item.props === 'grade'" #header="scope">
                  <span>{{ scope.column.label }}<i class="required">*</i></span>
                </template>
                <template v-if="item.props === 'grade'" v-slot="scope">
                  <div v-if="editStatus">
                    <iInput v-if="afterSaleLeaderIds.every(id => id != userInfo.id)" v-model="scope.row.grade" />
                    <iSelect v-else v-model="scope.row.grade">
                      <el-option value="合格" :label="language('HEGE', '合格')" />
                      <el-option value="不合格" :label="language('BUHEGE', '不合格')" />
                    </iSelect>
                  </div>
                  <span v-else>{{ scope.row.grade }}</span>
                </template>
                <template v-else-if="item.props === 'externaFee' || item.props === 'addFee'" v-slot="scope">
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
      <remarkDialog ref="remarkDialog" :visible.sync="remarkDialogVisible" :data="currentRow.memo" @confirm="confirmRemark" @cancel="currentRow = {}" />
    </iCard>
  </iPage>
</template>

<script>
import { iPage, iButton, icon, iCard, iInput, iSelect, iMessage, iMessageBox } from "rise"
import logButton from "@/components/logButton"
import remarkDialog from "@/views/supplierscore/components/remarkDialog"
import { tableTitle, deptScoreTableTitle } from "./components/data"
import { cloneDeep, isEqual } from "lodash"
import { getRfqPartRatingsByCurrentDept, updateRfqPartRatings, updateRfqPartRatingMemo } from "@/api/supplierscore"
import { afterSaleLeaderIds } from "@/views/supplierscore/components/data"

export default {
  components: {
    iPage,
    iButton,
    icon,
    iCard,
    iInput,
    iSelect,
    logButton,
    remarkDialog
  },
  data() {
    return {
      rfqId: "",
      supplierId: "",
      editStatus: false,
      saveLoading: false,
      loading: false,
      tableTitle,
      deptScoreTableTitle,
      tableListData: [],
      tableListDataCache: [],
      rateTag: "",
      remarkDialogVisible: false,
      currentRow: {},
      afterSaleLeaderIds,
    }
  },
  computed: {
    // eslint-disable-next-line no-undef
    ...Vuex.mapState({
      userInfo: state => state.permission.userInfo,
    })
  },
  created() {
    this.rfqId = this.$route.query.rfqId
    this.supplierId = this.$route.query.supplierId
    this.getRfqPartRatingsByCurrentDept()

    if (this.afterSaleLeaderIds.some(id => id == this.userInfo.id)) {
      this.deptScoreTableTitle = this.deptScoreTableTitle.filter(item => item.props === "grade" || item.props === "remark")
    }
  },
  methods: {
    getRfqPartRatingsByCurrentDept() {
      this.loading = true

      getRfqPartRatingsByCurrentDept({
        rfqId: this.rfqId,
        supplierId: this.supplierId
      })
      .then(res => {
        if (res.code == 200) {
          this.tableListData = Array.isArray(res.data) ? res.data : []
          this.tableListDataCache = cloneDeep(this.tableListData)
          this.rateTag = this.tableListData[0] && this.tableListData[0].rateTag ? this.tableListData[0].rateTag.desc : ""
        } else {
          iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn)
        }

        this.loading = false
      })
      .catch(() => this.loading = false)
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

      if (this.tableListData.some(item => !item.grade && item.grade !== 0)) {
        return iMessage.warn(this.language("PINGFENLIEWEIBITIANXIANG", "评分列为必填项"))
      }

      this.saveLoading = true

      updateRfqPartRatings(
        this.tableListData.map(item => ({
          addFee: item.addFee,
          confirmCycle: item.confirmCycle,
          externalFee: item.externaFee,
          id: item.id,
          rate: item.grade
        }))
      )
      .then(res => {
        const message = this.$i18n.locale === "zh" ? res.desZh : res.desEn

        if (res.code == 200) {
          iMessage.success(message)
          this.getRfqPartRatingsByCurrentDept()
        } else {
          iMessage.error(message)
        }

        this.saveLoading = false
      })
      .catch(() => this.saveLoading = false)
    },
    // 编辑/查看 备注
    editRemark(row) {
      this.currentRow = row
      this.remarkDialogVisible = true
    },
    // 确认备注
    confirmRemark(remark) {
      this.$refs.remarkDialog.updateConfirmLoading(true)

      updateRfqPartRatingMemo({
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
          // this.getRfqPartRatingsByCurrentDept() 测试数据是否正确更新用
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
.partscore {
  .header {
    position: relative;

    .title {
      font-size: 20px;
      font-weight: bold;
      color: #000;
      height: 28px;
      line-height: 28px;
    }

    .control {
      position: absolute;
      top: 50%;
      right: 0;
      transform: translate(0, -50%);
      display: flex;
      align-items: center;
      height: 30px;
    }
  }

  .body {
    height: calc(100vh - 240px);
  }

  .required {
    color: #E30D0D;
    font-style: normal;
    margin-left: 2px;
    font-size: 14px;
  }
}
</style>