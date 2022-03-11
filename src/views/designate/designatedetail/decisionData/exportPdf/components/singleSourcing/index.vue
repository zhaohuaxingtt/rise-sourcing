<template>
  <iCard class="singleSourcing" title="生产采购单一供应商说明 Single Sourcing for Production Purchasing">
    <div class="content">
      <iFormGroup class="info" inline row="1">
        <iFormItem label="项⽬名称 Project:">
          <iText>{{ projectName }}</iText>
        </iFormItem>
        <iFormItem label="定点申请单号 Project No.:">
          <iText>{{ nominateId }}</iText>
        </iFormItem>
      </iFormGroup>
      <tableList
        :selection="false"
        :tableTitle="tableTitle"
        :tableData="tableListData">
      </tableList>
    </div>
  </iCard>
</template>

<script>
import { iCard, iFormGroup, iFormItem, iText } from "rise"
import tableList from "@/views/partsign/editordetail/components/tableList"
import { tableTitle } from "@/views/designate/designatedetail/decisionData/singleSourcing/data"
import { getSingleSourcing } from "@/api/designate/decisiondata/singleSourcing"

export default {
  components: { iCard, iFormGroup, iFormItem, iText, tableList },
  data() {
    return {
      projectName: "",
      nominateId: "",
      tableTitle: _.cloneDeep(tableTitle),
      tableListData: []
    }
  },
  created() {
    this.nominateId = this.$route.query.desinateId

    this.tableTitle = this.tableTitle.map(item => ({
      ...item,
      renderHeader: h => h("div", [
        h("p", item.name),
        h("p", item.enName)
      ])
    }))

    this.getSingleSourcing()
  },
  methods: {
    getSingleSourcing:function () {
      getSingleSourcing({
        nominateId: this.$route.query.desinateId,
        current: 1,
        size: 999999,
      })
      .then(res => {
        if (res.code == 200) {
          if (res.data.resultPage) {
            const result = res.data.resultPage
            this.tableListData = Array.isArray(result.data) ? result.data : []
          }
          
          if (Array.isArray(res.data.cartypeProjectZhList)) {
            this.projectName = res.data.cartypeProjectZhList.join()
          }
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.singleSourcing {
  .info {
    ::v-deep .el-form-item__label {
      width: 280px; /*no*/
    }
  }
}
</style>
