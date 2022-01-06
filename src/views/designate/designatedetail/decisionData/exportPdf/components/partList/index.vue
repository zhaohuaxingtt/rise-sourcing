<template>
  <iCard class="partList" title="Part List">
    <tableList
      :selection="false"
      :tableTitle="tableTitle"
      :tableData="tableListData">
      <template #mtz="scope">
        <span>{{ mtzFormat(scope.row.mtz) }}</span>
      </template>
      <template #ebrCalculatedValue="scope">
        <span>{{ percent(scope.row.ebrCalculatedValue) }}</span>
      </template>
      <template #ebrConfirmValue="scope">
        <span>{{ percent(scope.row.ebrConfirmValue) }}</span>
      </template>
    </tableList>
  </iCard>
</template>

<script>
import { iCard } from "rise"
import tableList from "@/views/partsign/editordetail/components/tableList"
import { tableTitle } from "@/views/designate/designatedetail/decisionData/partList/data"
import { getPartList } from "@/api/designate/designatedetail/decisionData/partlist"

export default {
  components: { 
    iCard, 
    tableList
  },
  data() {
    return {
      tableTitle,
      tableListData: []
    }
  },
  created() {
    this.tableTitle = _.cloneDeep(tableTitle)
    this.$set(this.tableTitle[9], "minWidth", "90")
    this.$set(this.tableTitle[10], "minWidth", "90")
  
    this.getPartList()
  },
  methods: {
    getPartList() {
      getPartList({
        nominateId: this.$route.query.desinateId,
        current: 1,
        size: 999999
      })
      .then(res => {
        if (res.code == 200 && res.data) {
          this.tableListData = Array.isArray(res.data.records) ? res.data.records : []
        }
      })
    },
    mtzFormat(status) {
      return status ? this.language("SHI", "是") : this.language("FOU", "否")
    },
    percent(val) {
      return math.multiply(math.bignumber(val || 0), 100).toString() + "%"
    }
  }
}
</script>

<style lang="scss" scoped>
.partList {

}
</style>