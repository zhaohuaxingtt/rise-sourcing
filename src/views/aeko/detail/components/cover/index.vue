<!--
 * @Author: wentliao
 * @Date: 2021-07-28 16:44:09
 * @Description: 封面表态
-->
<template>
    <div>
        <editCover :aekoInfo="aekoInfo" v-if="isLinie" @getBbasicInfo="getBbasicInfo"/>
        <previewCover @getBbasicInfo="getBbasicInfo" v-else/>
    </div>
</template>

<script>
import previewCover from './components/previewCover'
import editCover from './components/editCover'
import { roleMixins } from "@/utils/roleMixins";
import { setLogModule } from "@/utils";
export default {
    name:'aekoDetailCover',
    mixins: [roleMixins],
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
    created(){
        setLogModule('AEKO封面表态')
        const roleList = this.roleList;
        this.isAekoManager = roleList.includes('AEKOGLY'); // AKEO管理员
        this.isCommodityCoordinator = roleList.includes('AEKOXTY'); // Aeko科室协调员
        this.isLinie = roleList.includes('LINIE') || roleList.includes('ZYCGY'); // 专业采购员

        // 判断下多角色情况 若多角色时就判断url的跳转来源
        const {query} = this.$route;
        const {from=''} = query;
        const roleArr = [this.isAekoManager,this.isCommodityCoordinator,this.isLinie].filter((item)=>item == true);
        if(roleArr.length > 1){
            if(from == 'manage'){
                this.isLinie = false;
            }else if(from == 'stance'){
                this.isAekoManager = false;
                this.isCommodityCoordinator = false;
            }
        }

        // 若是从AEKO查看进入该页面则只可查看不能编辑
        if(from == 'check'){
            this.isLinie = false;
        }
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