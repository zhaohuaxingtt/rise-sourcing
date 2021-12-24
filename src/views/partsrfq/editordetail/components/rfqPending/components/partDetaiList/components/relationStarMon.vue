<template>
  <iDialog
   :visible.sync="startVisible"
  >
    <div>
     
    </div>
  </iDialog>
</template>
<script>
  export default {
    props:{
      startVisible: {
        type:Boolean
      }
    }
  }
</script>
<style scoped>

</style>
