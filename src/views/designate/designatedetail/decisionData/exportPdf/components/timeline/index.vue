<template>
  <div class="timeline" ref="timeline">
    <iCard class="timelineCard rsPdfCard table-row" v-for="(data, $index) in dataGroup" :key="$index" :title="data.materialGroupName">
      <div class="content">
        <div>
          <div v-for="(node, $nodeIndex) in (Array.isArray(data.nomiTimeAxisGroup) ? data.nomiTimeAxisGroup : [])"
               :key="$nodeIndex">
            <groupStep
                v-if="node.isVisible"
                :stepList="stepList"
                :groupNode="node.nomiTimeAxisLine"
                :symbol="false"
                :key="`groupNode_${ $nodeIndex }`">
              <template slot="myStep">
                <todayIcon size="40"/>
                <p>Today</p>
              </template>
            </groupStep>
          </div>
        </div>
        <div>
          <div class="supplierWrapper"
               v-for="(supplier, $supplierIndex) in (Array.isArray(data.nomiTimeAxisSupplierResultVOList) ? data.nomiTimeAxisSupplierResultVOList : [])"
               :key="$supplierIndex">
            <div class="title">
              <div class="name">{{ supplier.supplierName }}</div>
              <div class="step">
                <supplierStep :symbol="false" :supplierData="supplier.nomiTimeAxisSuppliers"/>
              </div>
            </div>
            <div class="supplierContent">
              <ul class="supplier-item-list">
                <li class="flex-between-center"
                    v-for="(exp, $expIndex) in (Array.isArray(supplier.nomiTimeAxisSupplierExps) ? supplier.nomiTimeAxisSupplierExps : [])"
                    :key="$expIndex">
                  <span class="supplier-item-name">{{ exp.durationName }}</span>
                  <div class="supplier-item-line">
                    <supplierLine :allList="supplier.nomiTimeAxisSupplierExps" :supplierIndex="$expIndex"
                                  :cardIndex="$index"/>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
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
      <template v-for="(dataGroup,i) in tableList">
        <div class="pageCard-main rsPdfCard" :key="i">
          <slot name="tabTitle"></slot>
          <div :style="{'height': cntentHeight + 'px'}">
          <iCard class="timelineCard" v-for="(data, $index) in dataGroup" :key="$index" :title="data.materialGroupName">
            <div class="content">
              <div>
                <div v-for="(node, $nodeIndex) in (Array.isArray(data.nomiTimeAxisGroup) ? data.nomiTimeAxisGroup : [])"
                    :key="$nodeIndex">
                  <groupStep
                      v-if="node.isVisible"
                      :stepList="stepList"
                      :groupNode="node.nomiTimeAxisLine"
                      :symbol="false"
                      :key="`groupNode_${ $nodeIndex }`">
                    <template slot="myStep">
                      <todayIcon size="40"/>
                      <p>Today</p>
                    </template>
                  </groupStep>
                </div>
              </div>
              <div>
                <div class="supplierWrapper"
                    v-for="(supplier, $supplierIndex) in (Array.isArray(data.nomiTimeAxisSupplierResultVOList) ? data.nomiTimeAxisSupplierResultVOList : [])"
                    :key="$supplierIndex">
                  <div class="title">
                    <div class="name">{{ supplier.supplierName }}</div>
                    <div class="step">
                      <supplierStep :symbol="false" :supplierData="supplier.nomiTimeAxisSuppliers"/>
                    </div>
                  </div>
                  <div class="supplierContent">
                    <ul class="supplier-item-list">
                      <li class="flex-between-center"
                          v-for="(exp, $expIndex) in (Array.isArray(supplier.nomiTimeAxisSupplierExps) ? supplier.nomiTimeAxisSupplierExps : [])"
                          :key="$expIndex">
                        <span class="supplier-item-name">{{ exp.durationName }}</span>
                        <div class="supplier-item-line">
                          <supplierLine :allList="supplier.nomiTimeAxisSupplierExps" :supplierIndex="$expIndex"
                                        :cardIndex="$index"/>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </iCard>
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
      </template>
    </div>
  </div>
</template>

<script>
import {iCard, icon} from "rise"
import groupStep from "@/views/designate/designatedetail/decisionData/timeLine/components/groupStep"
import supplierStep from "@/views/designate/designatedetail/decisionData/timeLine/components/supplierStep"
import supplierLine from "@/views/designate/designatedetail/decisionData/timeLine/components/supplierLine"
import todayIcon from "@/views/designate/designatedetail/decisionData/timeLine/components/todayIcon"
import {getTimeaxis} from "@/api/designate/decisiondata/timeLine"
import {stepList} from "@/views/designate/designatedetail/decisionData/timeLine/components/data"
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
  components: {iCard, icon, groupStep, supplierStep, supplierLine, todayIcon},
  data() {
    return {
      dataGroup: [],
      stepList,
      cntentHeight:0,
      tableList:[]
    }
  },
  created() {
    this.getTimeaxis()
  },
  methods: {
    getHeight(){
      if(!this.$refs.timeline) return
      this.width = this.$refs.timeline.offsetWidth
      this.hasTitle = this.$refs.tabTitle.offsetHeight
      let pageLogo = this.$refs.logo.offsetHeight     // logo 区域高度
      this.cntentHeight = (this.width / 841.89) * 595.28 - pageLogo - this.hasTitle // 内容区域对应的高度
      let rowList = this.$refs.timeline.getElementsByClassName('table-row')
      let heightSum = 0
      let tableList = []
      let arr = []
      rowList.forEach((item,i)=>{
        heightSum+=item.offsetHeight
        if(heightSum<this.cntentHeight){
          arr.push(this.dataGroup[i])
        }else{
          tableList.push(JSON.parse(JSON.stringify(arr)))
          heightSum=item.offsetHeight
          arr = [this.dataGroup[i]]
        }
      })
      tableList.push(JSON.parse(JSON.stringify(arr)))
      this.tableList = tableList
      return
    },
    getTimeaxis: function () {
      getTimeaxis(this.$route.query.desinateId).then(res => {
        if (res.code == 200) {
          this.dataGroup = Array.isArray(res.data) ? res.data : []
          this.$nextTick(()=>{
            this.getHeight()
          })
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
.timeline {
  .timelineCard {
    & + & {
      margin-top: 20px; /*no*/
    }
  }

  .step-icon-today {
    color: rgb(112, 112, 112);
  }

  .supplierWrapper {
    border: 1px solid rgb(201, 216, 219); /*no*/
    // box-shadow: 0 0 1px rgb(0 38 98 / 15%); /*no*/
    border-radius: 5px; /*no*/
    margin-top: 30px; /*no*/
    padding: 20px 30px; /*no*/

    & + & {
      margin-top: 20px; /*no*/
    }

    .title {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .name {
        font-size: 18px;
        color: #131523;
        font-weight: bold;
      }
    }
  }

  .supplierContent {
    .supplier-item-list {
      width: 100%;
      overflow: hidden;

      li {
        padding: 25px 0; /*no*/
        align-items: center;

        .supplier-item-name {
          font-size: 16px; /*no*/
          color: #0D2451;
        }

        .supplier-item-line {
          width: 900px; /*no*/
        }

        &:not(:last-child) {
          border-bottom: 1px solid rgba($color: #707070, $alpha: 0.18);
        }
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
}
</style>
