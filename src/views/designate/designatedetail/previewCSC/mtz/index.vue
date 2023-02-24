<!--
 * @Description: 
 * @Author: tyra liu
 * @Date: 2021-11-08 14:11:06
 * @LastEditTime: 2021-11-11 09:48:53
 * @LastEditors:  
-->
<template>
  <div class="mtz">
    <iframe 
    :src="mtzDetail"
    frameborder='no'
    width="100%"
    height="700px"
    ></iframe>
  </div>
</template>
<script>
import { nominateAppSDetail } from '@/api/designate'
export default {
  data() {
    return{
      nomiData:{},
      mtzDetail:''
    }
  },
  created() {
    this.nominateAppSDetail()
  },
  methods: {
    nominateAppSDetail() {
      if(this.$route.query.desinateId){
        nominateAppSDetail({
          nominateAppId: this.$route.query.desinateId
        })
        .then(res => {
          this.nomiData =res.data
          let mtzAppId = this.nomiData.mtzApplyId||''
          this.mtzDetail = `${ process.env.VUE_APP_PORTAL_URL }mtz/annualGeneralBudget/locationChange/MtzLocationPoint/signPreviewBefore?mtzAppId=${mtzAppId}`
        })
      } 
    },
  }
}
</script>
<style>
</style>