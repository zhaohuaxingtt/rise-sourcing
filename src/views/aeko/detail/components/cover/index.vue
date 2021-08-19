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
        //eslint-disable-next-line no-undef
        ...Vuex.mapState({
            userInfo: state => state.permission.userInfo,
            permission: state => state.permission
        }),
    },
    created(){
        this.isAekoManager = !!this.permission.whiteBtnList["AEKO_DETAIL_TAB_LINGJIANQINGDAN_BUTTON_FENPAIKESHI"] // aeko管理员
        this.isCommodityCoordinator = !!this.permission.whiteBtnList["AEKO_DETAIL_TAB_LINGJIANQINGDAN_BUTTON_KESHITUIHUI"] // 科室协调员
        this.isLinie = !!this.permission.whiteBtnList["AEKO_AEKODETAIL_PARTLIST_TABLE"] // linie

        console.log(this.isCommodityCoordinator,'isCommodityCoordinator');
        console.log(this.isLinie,'isLinie');
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