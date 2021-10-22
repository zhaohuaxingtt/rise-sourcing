<!--
 * @Autor: Hao,Jiang
 * @Date: 2021-09-23 15:32:13
 * @LastEditors: Hao,Jiang
 * @LastEditTime: 2021-10-22 15:46:50
 * @Description: 
-->
<template>
  <div class="aeko-assign" v-permission.auto="AEKO_APPROVE_APPROVELIST_PAGE|Aeko审批分配列表">
    <!-- 搜索 -->
    <search @search="getFetchData" ref="search"/>
    <!-- 表格 -->
    <iCard class="aeko-assign-table">
      <div class="editControl">
        <iButton
            class="floatright margin-bottom20"
            v-permission.auto="AEKO_APPROVE_APPROVELIST_PAGE_ASSIGN|分配"
            @click="assign"
        >
          {{ language('LK_FENPAI', '分派') }}
        </iButton>
      </div>
      <tablelist
          height="400"
          index
          :selection="true"
          :tableData="tableListData"
          :tableTitle="tableTitle"
          :tableLoading="tableLoading"
          :lang="true"
          :selectable="(row, index) => {return row.unresigned}"
          v-loading="tableLoading"
          v-permission.auto="AEKO_APPROVE_APPROVELIST_TABLE|表格"
          @handleSelectionChange="handleSelectionChange"
      >
        <template #isTop="scope">
          <div>
            <span class="icon"><icon v-if="scope.row.isTop" symbol class="icon" name="iconAEKO_TOP"/></span>
          </div>
        </template>
        <template #aekoNum="scope">
          <div style="text-align:left">
            <a class="link-underline" href="javascript:;" @click="toDetailUrl(scope.row)">
              {{ scope.row.aekoNum }}
            </a>
          </div>
        </template>
        <template #describe="scope">
          <a class="link-underline" href="javascript:;" @click="toDescUrl(scope.row)">
            {{ language('CHAKAN', '查看') }}
          </a>
        </template>
        <template #assignsheet="scope">
          <a class="link-underline" href="javascript:;" @click="toAssignSheetUrl(scope.row)">
            {{ language('CHAKAN', '查看') }}
          </a>
        </template>
        <template #chiefName="scope">
          <iSelect
              v-if="!scope.row.chiefName"
              v-model="scope.row.chiefNames"
              @focus="getcheifUserList(scope.row)"
              :placeholder="language('LK_QINGXUANZE','请选择')"
              multiple
              filterable
              clearable
          >
            <el-option
                :value="items.code"
                :label="items.value"
                v-for="(items, index) in buyerSelectOPtions || []"
                :key="index"
            ></el-option>
          </iSelect>
          <span v-else>{{ scope.row.chiefName }}</span>
        </template>
      </tablelist>
      <div class="pagination">
        <iPagination v-update
                     class="pagination"
                     @size-change="handleSizeChange($event, getFetchData)"
                     @current-change="handleCurrentChange($event, getFetchData)"
                     background
                     :current-page="page.currPage"
                     :page-sizes="page.pageSizes"
                     :page-size="page.pageSize"
                     :layout="page.layout"
                     :total="page.totalCount"/>
      </div>
    </iCard>
  </div>
</template>
<script>
import search from '../components/search'
import {tableTitle} from '../components/data'
import tablelist from 'rise/web/components/iFile/tableList';
import {iCard, iSelect, iButton, iPagination, icon, iMessage} from 'rise'
import {pageMixins} from '@/utils/pageMixins'
import {user as configUser} from '@/config'
import {
  getApproveDistributionPage,
  approveDistributionSave,
  getRoleUserList,
  getChiefUserList,
  queryApprovalStatus
} from '@/api/aeko/approve'

export default {
  mixins: [pageMixins],
  components: {
    iCard,
    iSelect,
    iButton,
    iPagination,
    icon,
    search,
    tablelist
  },
  data() {
    return {
      tableTitle,
      tableListData: [],
      tableSelecteData: [],
      tableLoading: false,
      // linies
      buyerNames: [],
      // 对应股长
      buyerSelectOPtions: []
    }
  },
  mounted() {
    this.getFetchData()
    this.getQQCGGZ()
  },
  methods: {
    /**
     * @description: 跳转审批单
     * @param {*} row
     * @return {*}
     */
    toAssignSheetUrl(row) {
      queryApprovalStatus(row.id).then(res => {
        if (res.code == 200) {
          let taskIds = res.data.map((item) => item.taskId)
          let taskId = taskIds.join(',');
          let transmitObj = {
            option: 2,
            aekoApprovalDetails: {
              aekoNum: row.aekoNum,
              requirementAekoId: row.requirementAekoId,
              aekoAuditType: row.auditType,
              workFlowDTOS: res.data,
              aekoManageId: row.aekoManageId
            }
          }
          let routeData = this.$router.resolve({
            path: `/aeko/AEKOApprovalDetails`,
            query: {
              requirementAekoId: row.requirementAekoId,
              aekoManageId: row.aekoManageId,
              linieId: this.$store.state.permission.userInfo.id,
              taskId: taskId,
              transmitObj: window.btoa(unescape(encodeURIComponent(JSON.stringify(transmitObj))))
            }
          })
          window.open(routeData.href, '_blank')
        }
      })


    },
    /**
     * @description: 跳转aeko详情
     * @param {*} row
     * @return {*}
     */
    toDetailUrl(row) {
      const routeData = this.$router.resolve({
        name: 'aekodetail', query: {
          from: 'manage',
          requirementAekoId: row.requirementAekoId
        }
      })
      window.open(routeData.href, '_blank')
    },
    /**
     * @description: 跳转描述
     * @param {*} row
     * @return {*}
     */
    toDescUrl(row) {
      const routeData = this.$router.resolve({
        name: 'aekoDescribe', query: {
          requirementAekoId: row.requirementAekoId,
          aekoCode: row.aekoNum,
          from: 'approve'
        }
      })
      window.open(routeData.href, '_blank')
    },
    /**
     * @description: 选择
     * @param {*} val
     * @return {*}
     */
    handleSelectionChange(val) {
      this.tableSelecteData = val
    },
    /**
     * @description: 搜索
     * @param {*}
     * @return {*}
     */
    onSearch() {
      this.page.currPage = 1
      this.getFetchData()
    },
    /**
     * @description: 获取数据列表
     * @param {*}
     * @return {*}
     */
    getFetchData() {
      console.log(this.$refs.search.form)
      const form = this.$refs.search.form || {}
      const parmas = Object.assign({
        current: this.page.currPage,
        size: this.page.pageSize
      }, form)
      this.tableLoading = true
      getApproveDistributionPage(parmas).then(res => {
        if (res.code === '200') {
          const tableListData = (res.data || []).map(o => {
            o.unresigned = !o.chiefName
            return o
          })
          this.tableListData = tableListData
          this.page.totalCount = res.total
        } else {
          this.tableListData = []
          iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn);
        }
        this.tableLoading = false
      }).catch(e => {
        this.tableLoading = false
        this.tableListData = []
        iMessage.error(this.$i18n.locale === "zh" ? e.desZh : e.desEn);
      }).finally(() => {
        this.tableLoading = false
      })
    },
    /**
     * @description: 获取前期采购股长列表
     * @param {*}
     * @return {*}
     */
    getQQCGGZ() {
      // 前期采购股长
      getRoleUserList({roleCode: configUser.QQCGGZ}).then((res) => {
        const {code, data} = res;
        if (code === '200') {
          this.buyerNames = data.map((item) => {
            return {
              value: this.$i18n.locale === "zh" ? item.nameZh : item.nameEn,
              code: item.id,
              lowerCaseLabel: typeof item.nameEn === "string" ? item.nameEn.toLowerCase() : item.nameEn
            }
          });
        } else {
          iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn);
        }
      })
    },
    /**
     * @description: 获取前期采购股长列表
     * @param {*} row: 行数据
     * @param {*} type: 1 根据前期采购股长角色获取所有的前期采购股长
     * @param {*} type: 2 根据审批类型查找对应的前期采购股长
     * @return {*}
     */
    getcheifUserList(row = {}) {
      // 前期采购股长
      const params = {
        id: row.id,
        auditType: row.auditType
      }
      this.buyerSelectOPtions = []
      getChiefUserList(params).then((res) => {
        const {code, data} = res;
        if (code === '200') {
          this.buyerSelectOPtions = data.map((item) => {
            return {
              value: this.$i18n.locale === "zh" ? item.nameZh : item.nameEn,
              code: item.id,
              lowerCaseLabel: typeof item.nameEn === "string" ? item.nameEn.toLowerCase() : item.nameEn
            }
          });
        } else {
          iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn);
        }
      })
    },
    /**
     * @description: 分派
     * @param {*}
     * @return {*}
     */
    assign() {
      const selectedData = this.tableSelecteData.filter(o => o.unresigned)
      if (!selectedData.length) return iMessage.warn(this.language("QINGXUANZEZHISHAOYITIAOSHUJU", "请选择至少一条数据"))
      // 标记是否选择csf股长
      let state = true
      selectedData.forEach(item => {
        if (state && !(item.chiefNames && item.chiefNames.length)) {
          state = false
        }
      })
      if (!state) return iMessage.warn(this.language("QINGXUANZHECSFGUZHANG", "请选择CSF股长"))
      console.log(selectedData)
      let parmas = selectedData.map(o => {
        const choseChiefs = o.chiefNames || []
        const chiefName = choseChiefs.map(chiefId => {
          const cName = this.buyerSelectOPtions.find(buyer => buyer.code === chiefId) || {}
          return {
            id: o.id || '',
            postId: o.postId || '',
            auditType: o.auditType || '',
            chiefId,
            aekoManageId: o.aekoManageId || '',
            chiefName: cName.value || '',
          }
        })
        return chiefName
      })
      parmas = Array.from(new Set(parmas.flat(Infinity)))
      console.log(parmas)
      this.$confirm(this.language('NINQUEDINGYAOZHIXINGFENPAI', '您确定要执行分派吗')).then(confirmInfo => {
        if (confirmInfo === 'confirm') {
          approveDistributionSave(parmas).then(res => {
            if (res.code === '200') {
              iMessage.success(this.language('LK_CAOZUOCHENGGONG', '操作成功'))
              this.getFetchData()
            } else {
              iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn);
            }
          }).catch(e => {
            iMessage.error(this.$i18n.locale === "zh" ? e.desZh : e.desEn);
          })
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.aeko-assign {
  .aeko-assign-table {
    .cardBody {
      padding: 10px;
    }
  }
}

.icon {
  svg {
    font-size: 28px;
  }
}
</style>
