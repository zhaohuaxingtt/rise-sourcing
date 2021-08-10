<!--
 * @Author: wentliao
 * @Date: 2021-07-28 16:44:09
 * @Description: 封面表态
-->
<template>
    <div>
        <editCover :aekoInfo="aekoInfo" v-if="isLinie" @getBbasicInfo="getBbasicInfo"/>
        <previewCover v-else/>
    </div>
</template>

<script>
import previewCover from './components/previewCover'
import editCover from './components/editCover'
export default {
    name:'aekoDetailCover',
    components:{
        previewCover,
        editCover,
    },
    props:{
        aekoInfo:{
            type:Object,
            default:()=>{},
        }
    },
    computed: {
        // eslint-disable-next-line no-undef
        ...Vuex.mapGetters([
            "isAekoManager", // Aeko管理员
            "isCommodityCoordinator", // 科室协调员
            "isLinie", // 专业采购员
        ]),
    },
    methods:{
        getBbasicInfo(){
            this.$emit('getBbasicInfo','cover');
        }
    }
}
</script>

<style>

</style>