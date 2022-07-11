<template>
    <div id='powerBi'></div>
</template>

<script>
    // import * as pbi from 'powerbi-client';

    export default {
        props:['username'],
        data() {
            return {
                formData: {
                    cleintId: '66e3fa4b-152e-4bfb-8a9d-18b820459df1',
                    tenantId: '8716a3b9-b827-484b-92ad-ed90aaf4d707',
                    clientSecret: '6cpyeTY~dAmL-Uub2X8Om30Mm2EUk-d.TS',
                    workspaceId: process.env.NODE_ENV !== 'production' ? '876776a9-f959-442e-a011-b4bade0dd862' : 'c272ae69-a6b4-4407-bd0e-f67953de36ce',
                    reportId: process.env.NODE_ENV !== 'production' ? '35cd4f44-1616-4f62-ab72-7d5b8a35528d' : '37fcffc8-96c7-46d7-8db6-9fb07c9f47d6',
                    datasets: process.env.NODE_ENV !== 'production' ? ['16e08bc4-f04d-4171-9d73-a997a4565ea7'] : ['38d3176e-14c6-4a77-a9d7-0091d6702f9c'],
                    username: this.$store.state.permission.userInfo.id,
                    roles: ['dept_permission'],
                },
            };
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
