<template>
   <iDialog
    :visible.sync="tipsVislble"
     @close="changeVisible"
      width='50%'
   >
   
   </iDialog>
</template>
<script>
import {iDialog} from "rise"
export default {
  props:{
    tipsVislble:{
      type:Boolean,
      default:false
    }
  },
  components:{iDialog},
  methods:{
    changeVisible() {
      this.$emit('tipsChangeVisble',false)
    },
  }
}
</script>
<style scoped lang="scss">

</style>