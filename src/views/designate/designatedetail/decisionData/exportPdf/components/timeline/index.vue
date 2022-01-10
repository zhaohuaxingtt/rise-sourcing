<template>
  <div class="timeline">
    <iCard class="timelineCard" v-for="(data, $index) in dataGroup" :key="$index" :title="data.materialGroupName">
      <div class="content">
        <div>
          <div v-for="(node, $nodeIndex) in (Array.isArray(data.nomiTimeAxisGroup) ? data.nomiTimeAxisGroup : [])" :key="$nodeIndex">
            <groupStep 
              v-if="node.isVisible"
              :stepList="stepList"
              :groupNode="node.nomiTimeAxisLine"
              :symbol="false"
              :key="`groupNode_${ $nodeIndex }`">
              <template slot="myStep">
                <todayIcon size="40" />
                <p>Today</p>
              </template>
            </groupStep>
          </div>
        </div>
        <div>
          <div class="supplierWrapper" v-for="(supplier, $supplierIndex) in (Array.isArray(data.nomiTimeAxisSupplierResultVOList) ? data.nomiTimeAxisSupplierResultVOList : [])" :key="$supplierIndex">
            <div class="title">
              <div class="name">{{ supplier.supplierName }}</div>
              <div class="step">
                <supplierStep :symbol="false" :supplierData="supplier.nomiTimeAxisSuppliers" />
              </div>
            </div>
            <div class="supplierContent">
              <ul class="supplier-item-list">
                <li class="flex-between-center" v-for="(exp, $expIndex) in (Array.isArray(supplier.nomiTimeAxisSupplierExps) ? supplier.nomiTimeAxisSupplierExps : [])" :key="$expIndex">
                  <span class="supplier-item-name">{{ exp.durationName }}</span>
                  <div class="supplier-item-line">
                    <supplierLine :allList="supplier.nomiTimeAxisSupplierExps" :supplierIndex="$expIndex" :cardIndex="$index" />
                  </div>
                </li>
            </ul>
            </div>
          </div>
        </div>
      </div>
    </iCard>
  </div>
</template>

<script>
import { iCard, icon } from "rise"
import groupStep from "@/views/designate/designatedetail/decisionData/timeLine/components/groupStep"
import supplierStep from "@/views/designate/designatedetail/decisionData/timeLine/components/supplierStep"
import supplierLine from "@/views/designate/designatedetail/decisionData/timeLine/components/supplierLine"
import todayIcon from "@/views/designate/designatedetail/decisionData/timeLine/components/todayIcon"
import { getTimeaxis } from "@/api/designate/decisiondata/timeLine"
import { stepList } from "@/views/designate/designatedetail/decisionData/timeLine/components/data"

export default {
  components: { iCard, icon, groupStep, supplierStep, supplierLine, todayIcon },
  data() {
    return {
      dataGroup: [],
      stepList
    }
  },
  created() {
    this.getTimeaxis()
  },
  methods: {
    getTimeaxis() {
      getTimeaxis(this.$route.query.desinateId)
      .then(res => {
        if (res.code == 200) {
          this.dataGroup = Array.isArray(res.data) ? res.data : []
          console.log(res.data)
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
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
    box-shadow: 0 0 1px rgb(0 38 98 / 15%); /*no*/
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
    .supplier-item-list{
      width: 100%;
      overflow: hidden;

      li {
        padding: 25px 0; /*no*/
        align-items: center;

        .supplier-item-name{
          font-size: 16px; /*no*/
          color: #0D2451;
        }
        .supplier-item-line {
          width: 900px; /*no*/
        }
        &:not(:last-child){
            border-bottom: 1px solid rgba($color: #707070, $alpha: 0.18);
        }
      }
    }
  }
}
</style>