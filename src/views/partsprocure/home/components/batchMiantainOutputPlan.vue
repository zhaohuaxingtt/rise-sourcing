<!--
 * @Description: 
 * @Author: tyra liu
 * @Date: 2021-10-15 11:20:31
 * @LastEditTime: 2021-10-28 22:21:22
 * @LastEditors:  
-->
<template>
  <div class="batchMaintain">
    <iButton @click="openBatchMiantainOutputPlan">{{ language("PILIANGWEIHUCHANLIANGJIHUA", "批量维护产量计划") }}</iButton>
    <openBatch :dialogVisible ="batchdialogVisible" @changeVisible="batchchangeVisible" :openPlanItemsIds="planItemsIds"></openBatch>
  </div>
</template>

<script>
import {iButton, iMessage} from "rise"
import openBatch from './openBatch'
export default {
   components:{iButton, openBatch},
   props: {
     planItems: {
       type: Array,
       default:()=>[]
     }
   },
   data() {
       return {
          batchdialogVisible:false ,
          planItemsIds: []
       }
   },
   methods:{  
      openBatchMiantainOutputPlan() {
        if( this.planItems.length == 0 ) {
          return iMessage.warn(
            this.language(
              "LK_NINDANGQIANHAIWEIXUANZENINXUYAOSHENGPILIANGWEIHUDEXIANGMU",
              '抱歉，您当前还未选择您需要批量维护产量计划的项目！'
            )
          )
        } else {
          let planItemsIds = this.planItems.map((res) => res.purchaseProjectId)
          this.planItemsIds = planItemsIds
          this.batchdialogVisible = true
        }
       },
			batchchangeVisible(data) {
				this.batchdialogVisible = data
			}
   }
}
</script>

<style lang="scss" scoped>
    .batchMaintain{
        display: inline-block;
        padding-right: 10px;
    }
</style>