<template>
<div ref="single">
  <iCard class="singleSourcing rsPdfCard" title="生产采购单一供应商说明 Single Sourcing for Production Purchasing">
    <div class="content" ref="rsPdfCard">
      <div ref="form">
        <iFormGroup class="info" inline row="1">
          <iFormItem label="项⽬名称 Project:">
            <iText>{{ projectName }}</iText>
          </iFormItem>
          <iFormItem label="定点申请单号 Project No.:">
            <iText>{{ nominateId }}</iText>
          </iFormItem>
        </iFormGroup>
      </div>
      <tableList
        :selection="false"
        :tableTitle="tableTitle"
        row-class-name="table-row"
        :tableData="tableListData">
        <template #singleReason="scope">
          <div>
            <p>{{ scope.row.singleReason }}</p>
            <p>{{ scope.row.singleReasonEng }}</p>
          </div>
        </template>
      </tableList>
    </div>
  </iCard>
  <div class="pdf-item">
    <div ref="tabTitle" style="padding:1px">
      <slot name="tabTitle"></slot>
    </div>
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
    <template v-for="(tableData,i) in tableList">
      <div :key="i" class="pageCard-main rsPdfCard">
        <div style="padding:1px">
          <slot name="tabTitle"></slot>
        </div>
        <iCard class="singleSourcing" title="生产采购单一供应商说明 Single Sourcing for Production Purchasing">
          <div class="content">
            <div ref="form">
              <iFormGroup class="info" inline row="1">
                <iFormItem label="项⽬名称 Project:">
                  <iText>{{ projectName }}</iText>
                </iFormItem>
                <iFormItem label="定点申请单号 Project No.:">
                  <iText>{{ nominateId }}</iText>
                </iFormItem>
              </iFormGroup>
            </div>
            <div :style="{'height': cntentHeight + 'px'}">
              <tableList
                :selection="false"
                :tableTitle="tableTitle"
                :tableData="tableListData">
                <template #singleReason="scope">
                  <div>
                    <p>{{ scope.row.singleReason }}</p>
                    <p>{{ scope.row.singleReasonEng }}</p>
                  </div>
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
          </div>
        </iCard>
      </div>
    </template>
  </div>
</div>
</template>

<script>
import { iCard, iFormGroup, iFormItem, iText } from "rise"
import tableList from "@/views/partsign/editordetail/components/tableList"
import { tableTitle } from "@/views/designate/designatedetail/decisionData/singleSourcing/data"
import { getSingleSourcing } from "@/api/designate/decisiondata/singleSourcing"
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
    // }
  },
  components: { iCard, iFormGroup, iFormItem, iText, tableList },
  data() {
    return {
      projectName: "",
      nominateId: "",
      tableTitle: _.cloneDeep(tableTitle),
      tableListData: [],
      cntentHeight:0,
      tableList:[]
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
    getHeight(){
      if(!this.$refs.single) return
      this.width = this.$refs.single.offsetWidth
      let formHeight = this.$refs.form.offsetHeight
      this.hasTitle = this.$refs.tabTitle.offsetHeight
      let headerHeight = this.$refs.single.getElementsByClassName('cardHeader')[0].offsetHeight // Title 区域高度
      let pageLogo = this.$refs.logo.offsetHeight     // logo 区域高度
      let tableHeader = this.$refs.rsPdfCard.getElementsByClassName('el-table__header-wrapper')[0].offsetHeight
      // let headerHeight = 84 // Title 区域高度
      // let pageLogo = 52     // logo 区域高度
      // let tableHeader = 64  // 表头高度
      this.cntentHeight = (this.width / 841.89) * 595.28 - headerHeight - pageLogo - formHeight - this.hasTitle // 内容区域对应的高度
      let rowList = this.$refs.single.getElementsByClassName('table-row')
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
            this.$nextTick(()=>{
              this.getHeight()
            })
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
.singleSourcing {
  .info {
    ::v-deep .el-form-item__label {
      width: 280px; /*no*/
    }
  }
}
  .page-logo{
    display: flex;
    justify-content: space-between;
    padding: 10px;
    align-items: center;
    border-top: 1px solid #666;
  }
</style>
