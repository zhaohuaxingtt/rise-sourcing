<!--
 * @Author: wentliao
 * @Date: 2022-01-06 22:44:18
 * @Description: 
-->
<template>
  <div ref="partList">
    <div ref="tabTitle" style="padding:1px">
      <slot name="tabTitle"></slot>
    </div>
    <div ref="rsPdfCard">
      <iCard class="partList rsPdfCard" title="Part List">
        <tableList
            showName
            :selection="false"
            row-class-name="table-row"
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
      <div class="page-logo" ref="logo">
        <img src="../../../../../../../assets/images/logo.png" alt="" :height="46*0.6+'px'" :width="126*0.6+'px'">
        <div>
          <p class="pageNum"></p>
        </div>
        <div>
          <p>{{ userName }}</p>
          <p>{{ new Date().getTime() | dateFilter('YYYY-MM-DD')}}</p>
        </div>
      </div>
    </div>
    <div class="pdf-item">
      <template v-for="(tableData,index) in tableList">
      <div :key="index" class="pageCard-main rsPdfCard">
        <slot name="tabTitle"></slot>
        <iCard class="partList pageCard rsPdfCard" title="Part List">
          <div :style="{'height': cntentHeight + 'px'}">
            <tableList
                showName
                :selection="false"
                :tableTitle="tableTitle"
                :tableData="tableData">
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
          </div>
          <div class="page-logo">
            <img src="../../../../../../../assets/images/logo.png" alt="" :height="46*0.6+'px'" :width="126*0.6+'px'">
            <div>
              <p class="pageNum"></p>
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
    // hasTitle(){
    //   return this.$slots.tabTitle && 116 || 0
    // },
  },
  components: {
    iCard,
    tableList
  },
  data() {
    return {
      tableTitle,
      tableListData: [],
      tableList:[]
    }
  },
  created() {
    this.tableTitle = _.cloneDeep(tableTitle)
    this.$set(this.tableTitle[9], "minWidth", "90")
    this.$set(this.tableTitle[10], "minWidth", "90")
    this.tableTitle.unshift({ props: 'index', name: '序号', key: '', width: 80 })

    this.getPartList()
  },
  methods: {
    getHeight(){
      if(!this.$refs.partList) return
      this.width = this.$refs.partList.clientWidth
      this.hasTitle = this.$refs.tabTitle.clientHeight
      let headerHeight = this.$refs.rsPdfCard.getElementsByClassName('cardHeader')[0].clientHeight // Title 区域高度
      let pageLogo = this.$refs.logo.clientHeight     // logo 区域高度
      let tableHeader = this.$refs.rsPdfCard.getElementsByClassName('el-table__header-wrapper')[0].clientHeight
      this.cntentHeight = (this.width / 841.89) * 595.28 - headerHeight - pageLogo - this.hasTitle // 内容区域对应的高度
      let rowList = this.$refs.partList.getElementsByClassName('table-row')
      let heightSum = 0
      let tableList = []
      let arr = []
      rowList.forEach((item,i)=>{
        heightSum+=item.offsetHeight
        if(heightSum<this.cntentHeight - tableHeader){
          arr.push(this.tableListData[i])
        }else{
          tableList.push(JSON.parse(JSON.stringify(arr)))
          heightSum=item.offsetHeight
          arr = [this.tableListData[i]]
        }
      })
      tableList.push(JSON.parse(JSON.stringify(arr)))
      this.tableList = tableList
      return
    },
    getPartList: function () {
      getPartList({
        nominateId: this.$route.query.desinateId,
        current: 1,
        size: 999999
      })
          .then(res => {
            if (res.code == 200 && res.data) {
              this.tableListData = Array.isArray(res.data.records) ? res.data.records : []
              this.tableListData = JSON.parse(JSON.stringify(this.tableListData)).map((item,i)=>{
                item.index = 1+i
                return item
              })
              this.$nextTick(()=>{
                this.getHeight()
              })
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
</style>
