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
                    reportId: process.env.NODE_ENV !== 'production' ? 'ed65e96c-5c93-46c8-99d3-63c2c7ac0b08' : 'c940921c-a477-4f64-af67-72eaaad30226',
                    datasets: process.env.NODE_ENV !== 'production' ? ['40d5c619-a61c-4b19-8575-d4da919bce0b']:['41ef7d80-2706-4ba8-b4d6-4a18e6d40477'],
                    username: this.$store.state.permission.userInfo.id,
                    roles: ['dept_permission'],
                },
            }
        },
        mounted() {
            this.$emit('getData',this.formData)
        },

    };
</script>

<style scoped lang="scss">
#powerBi {
    width: 100%;
    height: 100%;
}
</style>