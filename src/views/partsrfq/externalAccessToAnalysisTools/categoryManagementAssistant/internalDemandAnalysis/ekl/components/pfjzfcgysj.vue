<template>
    <div id='powerBi'></div>
</template>

<script>
  import * as pbi from 'powerbi-client';

  export default {
    props: ['username'],
    data() {
      return {
        formData: {
          cleintId: '66e3fa4b-152e-4bfb-8a9d-18b820459df1',
          tenantId: '8716a3b9-b827-484b-92ad-ed90aaf4d707',
          clientSecret: '6cpyeTY~dAmL-Uub2X8Om30Mm2EUk-d.TS',
          workspaceId: process.env.NODE_ENV !== 'production' ? '876776a9-f959-442e-a011-b4bade0dd862' : 'c272ae69-a6b4-4407-bd0e-f67953de36ce',
          reportId: process.env.NODE_ENV !== 'production' ? '06bfe2a1-4814-4dd6-a9ec-1687aa896d06' : '7e28d312-12ae-42b1-89b9-86933a2dfe81',
          datasets: process.env.NODE_ENV !== 'production' ? ['b331bdd5-e6c6-4a4c-922a-0099058cf3f3'] : ['4d117119-0f4a-4c4c-86cc-3a7d5955171c'],
          username: this.$store.state.permission.userInfo.id,
          roles: ['buy_permission'],
        },
      }
    },

    mounted() {
      // let roleList = this.$store.state.permission.userInfo.roleList
      // if (roleList.some(item => item.code == 'PFJYJGLY')) {
      //   this.formData.username = '0'
      // }
      this.$emit('getData', this.formData)
    },

  };
</script>
<style scoped lang="scss">
#powerBi {
    width: 100%;
    height: 100%;
}
</style>