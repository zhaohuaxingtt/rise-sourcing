<!--
 * @Author: wentliao
 * @Date: 2022-01-06 22:44:18
 * @Description: 
-->
<template>
  <div ref="partList">
    <template>
      <div class="pageCard-main rsPdfCard">
        <slot name="tabTitle"></slot>
        <iCard class="partList pageCard rsPdfCard" title="Part List">
          <tableList
              :style="{'height': cntentHeight + 'px'}"
              showName
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
          <div class="page-logo">
            <img src="../../../../../../../assets/images/logo.png" alt="" :height="46*0.6+'px'" :width="126*0.6+'px'">
            <div>
              <p>{{'page '+(index+1)+' of '+ (prototypeTableList.length+tableList.length)}}</p>
            </div>
            <div>
              <p>{{ userName }}</p>
              <p>{{ new Date().getTime() | dateFilter('YYYY-MM-DD')}}</p>
            </div>
          </div>
        </iCard>
      </div>
    </template>
  </div>
</template>

<script>
import {iCard} from "rise"
import tableList from "@/views/partsign/editordetail/components/tableList"
import {tableTitle} from "@/views/designate/designatedetail/decisionData/partList/data"
import {getPartList} from "@/api/designate/designatedetail/decisionData/partlist"
import filters from "@/utils/filters"

export default {
  mixins:[filters],
  props:{
    tableList: { type: Array, default: () => [] },
    prototypeTableList: { type: Array, default: () => [] },
  },
  computed:{
    userName(){
      return this.$i18n.locale === 'zh' ? this.$store.state.permission.userInfo.nameZh : this.$store.state.permission.userInfo.nameEn
    },
    hasTitle(){
      return this.$slots.tabTitle && 116 || 0
    }
  },
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
  mounted(){
    this.width = this.$refs.partList.clientWidth
    let headerHeight = 84 // Title 区域高度
    let pageLogo = 52     // logo 区域高度
    this.cntentHeight = (this.width / 841.89) * 595.28 - headerHeight - pageLogo - this.hasTitle; // 内容区域对应的高度
    console.log(this.cntentHeight);
  },
  methods: {
    getPartList: function () {
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
    mtzFormat: function (status) {
      return status ? this.language("SHI", "是") : this.language("FOU", "否")
    },
    percent: function (val) {
      return math.multiply(math.bignumber(val || 0), 100).toString() + "%"
    }
  }
}
</script>

<style lang="scss" scoped>
.rsPdfCard{
  box-shadow: none;
  & + .rsCard {
    margin-top: 20px; /*no*/
  }
  ::v-deep .cardHeader{
    padding: 30px 0px;
  }
  ::v-deep .cardBody{
    padding: 0px;
  }
}
.partList {
  .page-logo{
    display: flex;
    justify-content: space-between;
    padding: 10px;
    align-items: center;
    border-top: 1px solid #666;
  }
}
</style>
