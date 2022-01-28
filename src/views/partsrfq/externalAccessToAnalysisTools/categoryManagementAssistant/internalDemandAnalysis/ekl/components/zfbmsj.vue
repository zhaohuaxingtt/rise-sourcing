<template>
    <div id='powerBi'></div>
</template>

<script>
  import * as pbi from 'powerbi-client';

  export default {
    data() {
      return {
        formData: {
          cleintId: '66e3fa4b-152e-4bfb-8a9d-18b820459df1',
          tenantId: '8716a3b9-b827-484b-92ad-ed90aaf4d707',
          clientSecret: '6cpyeTY~dAmL-Uub2X8Om30Mm2EUk-d.TS',
          workspaceId: process.env.NODE_ENV !== 'production' ? '876776a9-f959-442e-a011-b4bade0dd862' : 'c272ae69-a6b4-4407-bd0e-f67953de36ce',
          reportId: process.env.NODE_ENV !== 'production' ? 'bcf59da6-3518-4db7-bffc-cf5d434d34ae' : '9b62a0e4-8ef9-425f-a862-e0c9325a63ba',
          datasets: [],
          username: '',
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