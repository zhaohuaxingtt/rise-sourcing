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
          reportId: process.env.NODE_ENV !== 'production' ? 'bcf59da6-3518-4db7-bffc-cf5d434d34ae' : '9b62a0e4-8ef9-425f-a862-e0c9325a63ba',
          datasets: process.env.NODE_ENV !== 'production' ? ['c00c0ef7-778c-41ee-8960-90e504abd70b']:['e758e837-7712-4298-9c3c-f2a9dcebeb84'],
          username: "",
          roles: [],
        },
      };
    },

    mounted() {
      // 部长 部长助理 || 部长助理or采购员 部门视图
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