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
                    reportId: process.env.NODE_ENV !== 'production' ? '9f8cfa43-184d-46d5-a204-37ec659d13f6' : '27c468ba-77ba-481d-ac69-3488a58f0ee2',
                    datasets: process.env.NODE_ENV !== 'production' ? ['2eddaa0a-da1e-4fd2-ad1e-0c8e28aa3623'] : ['a7c0b0bc-e5be-412e-ab36-3bf1636bbec3'],
                    username: this.$store.state.permission.userInfo.id,
                    roles: [],
                },
            }
        },
        mounted() {
            // let roleList = this.$store.state.permission.userInfo.roleList
            // if(roleList.length == 1 && roleList.some(item =>item.code == 'CGBZ')) {
            //     this.formData.username = '1'
            // }
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