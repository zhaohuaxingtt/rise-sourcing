<template>
  <div class="mtz">
    <iframe 
    :src="mtzDetail"
    frameborder='no'
    width="100%" height="700px"
    ></iframe>
  </div>
</template>
<script>
export default {
  data() {
    return{
      mtzDetail:'http://10.122.17.38/portal/#/mtz/detail?id=xxxxxxxxx'
    }
  }
}
</script>
<style>
</style>