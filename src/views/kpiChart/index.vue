<template>
  <iPage>
      <publicHeaderMenu></publicHeaderMenu>
  </iPage>
</template>

<script>
import publicHeaderMenu from './commonHeardNav/headerNav'
import {iButton,iPage,iCard,iInput,iSelect,iTableCustom} from 'rise'
export default {
    components:{
        publicHeaderMenu,
        iPage
    }
}
</script>

<style lang="scss" scoped>

</style>