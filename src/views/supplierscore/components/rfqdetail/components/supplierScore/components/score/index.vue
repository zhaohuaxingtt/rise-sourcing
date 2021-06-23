<!--
 * @Author: your name
 * @Date: 2021-06-22 16:16:26
 * @LastEditTime: 2021-06-23 16:13:56
 * @LastEditors: ldh
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\views\supplierscore\components\rfqdetail\components\supplierScore\components\score\index.vue
-->
<template>
  <iCard class="score" :title="$t('供应商评分')">
    <template #header-control>
      <div v-if="!editStatus">
        <iButton >{{ $t("转派") }}</iButton> 
        <iButton >{{ $t("退回至采购员") }}</iButton> 
        <iButton @click="editStatus = true">{{ $t("编辑") }}</iButton>
        <iButton >{{ $t("提交") }}</iButton>
        <iButton >{{ $t("批准") }}</iButton>
        <iButton >{{ $t("拒绝") }}</iButton>
      </div>
      <div v-else>
        <iButton @click="editStatus = false">{{ $t("结束编辑") }}</iButton>
        <iButton >{{ $t("保存 ") }}</iButton>
      </div>
    </template>
    <div class="body">
      <el-table
        v-loading="loading"
        :data="tableListData"
        :empty-text="$t('LK_ZANWUSHUJU')">
        <el-table-column type="selection" align="center"></el-table-column>
        <el-table-column type="index" align="center" label="#"></el-table-column>
        <el-table-column align="center" :label="$t('SVW号')" prop="svwCode" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column align="center" :label="$t('供应商名')" prop="shortNameZh" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column align="center" :label="$t('供应商生产场地')" prop="companyAddress" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column align="center" :label="$t('零件评分')" prop="partScore" :show-overflow-tooltip="true"></el-table-column>
      </el-table>
      <iPagination 
        v-update
        class="margin-top30"
        @size-change="handleSizeChange($event, getList)"
        @current-change="handleCurrentChange($event, getList)"
        background
        :current-page="page.currPage"
        :page-sizes="page.pageSizes"
        :page-size="page.pageSize"
        :layout="page.layout"
        :total="page.totalCount" />
    </div>
  </iCard>
</template>

<script>
import { iCard, iButton, iInput, iPagination, iMessage } from "rise"
import { pageMixins } from "@/utils/pageMixins"
import { scoreTableTitle as tableTitle } from "../data"
import { cloneDeep } from "lodash"

export default {
  components: {
    iCard,
    iButton,
    iInput,
    iPagination
  },
  mixins: [ pageMixins ],
  data() {
    return {
      editStatus: false,
      loading: false,
      tableTitle: cloneDeep(tableTitle),
      tableListData: [{a: 1, b: 2}],
      multipleSelection: []
    }
  },
  methods: {
    getList() {
      const getList = function() {}

      this.loading = true
      getList()
      .then(res => {
        if (res.code == 200) {
          // this.tableListData = Array.isArray(res.data) ? res.data : []
          this.page.totalCount = res.total || 0
        } else {
          iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn)
        }
        
        this.loading = false
      })
      .catch(() => this.loading = false)
    },
    handleSelectionChange(list) {
      this.multipleSelection = list
    },
  }
}
</script>

<style lang="scss" scoped>
.score {}
</style>