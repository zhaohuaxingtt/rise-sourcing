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
                    reportId: process.env.NODE_ENV !== 'production' ? '125f7e44-e9d2-43a6-9619-bd4add6ebb60' : '6a395915-fad7-4519-8840-bb05bd2c25e3',
                    datasets: process.env.NODE_ENV !== 'production' ? ['2d7f4900-070c-46c7-a850-9a768c49deae'] : ['18ba9d81-d4a4-4397-9b13-00b93d4aa036'],
                    username: process.env.NODE_ENV !== 'production' ? this.username : '',
                    roles: process.env.NODE_ENV !== 'production' ? ['dept_permission'] : [],
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