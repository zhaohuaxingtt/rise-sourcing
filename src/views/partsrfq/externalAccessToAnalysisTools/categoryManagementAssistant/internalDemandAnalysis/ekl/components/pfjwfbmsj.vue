<template>
    <div id='powerBi'></div>
</template>

<script>
  import * as pbi from 'powerbi-client';

  export default {
    props:['username'],
    data() {
      return {
        formData: {
          cleintId: '66e3fa4b-152e-4bfb-8a9d-18b820459df1',
          tenantId: '8716a3b9-b827-484b-92ad-ed90aaf4d707',
          clientSecret: '6cpyeTY~dAmL-Uub2X8Om30Mm2EUk-d.TS',
          workspaceId: process.env.NODE_ENV !== 'production' ? '876776a9-f959-442e-a011-b4bade0dd862' : 'c272ae69-a6b4-4407-bd0e-f67953de36ce',
          reportId: process.env.NODE_ENV !== 'production' ? 'f8d1c804-6583-4574-ba06-1f591aa58cd4' : 'f7e92b62-fbd2-4039-be19-95a63b2a298f',
          datasets: process.env.NODE_ENV !== 'production' ? ['addf20a8-7f65-445c-a737-0f636f428e76'] : ['0571b1ad-b958-4057-aff9-7b9239c811d6'],
          username: this.$store.state.permission.userInfo.id,
          roles: ['cs_permission'],
        },
      }
    },
    mounted() {
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