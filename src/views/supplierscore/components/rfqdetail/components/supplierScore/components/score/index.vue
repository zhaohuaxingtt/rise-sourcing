<!--
 * @Author: your name
 * @Date: 2021-06-22 16:16:26
 * @LastEditTime: 2021-06-22 19:59:10
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\views\supplierscore\components\rfqdetail\components\supplierScore\components\score\index.vue
-->
<template>
  <iCard class="score" :title="$t('供应商评分')">
    <template #header-control>
      <div v-if="!editStatus">
        <iButton >{{ $t("退回至采购员") }}</iButton> 
        <iButton @click="editStatus = true">{{ $t("编辑") }}</iButton>
        <iButton >{{ $t("提交") }}</iButton>
      </div>
      <div v-else>
        <iButton @click="editStatus = false">{{ $t("结束编辑") }}</iButton>
        <iButton >{{ $t("保存 ") }}</iButton>
      </div>
    </template>
    <div class="body">
      <tableList
        class="table"
        index
        :tableData="tableListData"
        :tableTitle="tableTitle"
        :tableLoading="loading"
        @handleSelectionChange="handleSelectionChange"
      >
        <template #partScore="scope">
          <span class="link-underline">{{ $t("查看") }}</span>
        </template>
        <template v-for="(group, $index) in tableTitle.filter(item => item.type === 'group')" #[group.props]>
          <el-table-column :key="$index" :label="$t('评分')">
            <template v-slot="scope">
              <iInput v-model="scope.row.rate" />
            </template>
          </el-table-column>
          <el-table-column :key="$index" :label="$t('外部开发费(元)')">
            <template v-slot="scope">
              <iInput v-model="scope.row.externaFee" />
            </template>
          </el-table-column>
          <el-table-column :key="$index" :label="$t('增加的认可费(元)')">
            <template v-slot="scope">
              <iInput v-model="scope.row.addFee" />
            </template>
          </el-table-column>
          <el-table-column :key="$index" :label="$t('认可周期(周)')">
            <template v-slot="scope">
              <iInput v-model="scope.row.confirmCycle" />
            </template>
          </el-table-column>
          <el-table-column :key="$index" :label="$t('备注')">
            <template v-slot="scope">
              <iInput v-model="scope.row.remark" />
            </template>
          </el-table-column>
          <el-table-column :key="$index" :label="$t('评分状态')">
            <template v-slot="scope">
              <iInput v-model="scope.row.rateState" />
            </template>
          </el-table-column>
        </template>
      </tableList>
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
import tableList from "@/views/partsign/editordetail/components/tableList"
import { pageMixins } from "@/utils/pageMixins"
import { scoreTableTitle as tableTitle } from "../data"
import { cloneDeep } from "lodash"

export default {
  components: {
    iCard,
    iButton,
    iInput,
    iPagination,
    tableList
  },
  mixins: [ pageMixins ],
  data() {
    return {
      editStatus: false,
      loading: false,
      tableTitle: cloneDeep(tableTitle),
      tableListData: [{}],
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
          this.tableListData = Array.isArray(res.data) ? res.data : []
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