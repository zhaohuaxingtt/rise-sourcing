<!--
 * @Author: wentliao
 * @Date: 2021-09-22 11:44:05
 * @Description: 解冻弹窗
-->
<template>
  <iDialog
    :visible.sync="dialogVisible"
    @close="clearDialog"
    width="20%"
    class="unfreezeDialog"
  >
    <template slot="title">
        <h2>{{language('LK_AEKO_DIALOG_DONGJIE','解冻')}}</h2>
    </template>
    <div class="unfreezeDialog-contain">
        <p>{{language("XUANZEYAODONGJIEDEZHUANYECAIGOUYUAN", "选择要冻结的专业采购员")}}</p>
         <iSelect 
            v-model="linie" 
            class="margin-top20" 
            style="width:100%"
            multiple
            clearable
            collapse-tags
            :placeholder="language('LK_AEKO_DAIXUANZE','待选择')"
        >
            <el-option
                v-for="item in linieList || []"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option> 
        </iSelect>
    </div>
    <div class="confirmBtn padding-bottom20 padding-top20 text-align-right">
        <iButton @click="unfreeze" :loading="btnLoading">{{language('LK_AEKO_DIALOG_DONGJIE','解冻')}}</iButton>
    </div>
  </iDialog>
</template>

<script>
import {
    iDialog,
    iSelect,
    iButton,
    iMessage,
} from 'rise';
import {
    frozenLinies,
    thawConvers,
} from '@/api/aeko/detail/cover.js'
export default {
    name:'unfreezeDialog',
    components:{
        iDialog,
        iSelect,
        iButton,
    },
    props:{
        dialogVisible:{
            type:Boolean,
            default:false,
        },
        basicInfo:{
            type:Object,
            default:()=>{},
        }
    },
    data(){
        return{
            linieList:[],
            linie:[],
            btnLoading:false,
        }
    },
    created(){
        this.getLinieList();
    },
    methods:{
        // 获取可选择的LINIE
        async getLinieList(){
            const {basicInfo={}} = this;
            const {aekoManageId } = basicInfo;
            console.log(basicInfo,'basicInfobasicInfobasicInfo');
            await frozenLinies({aekoManageId}).then((res)=>{
                const {code,data=[]} = res;
                if(code == 200){
                    data.map((item)=>{
                        item.label =`${item.linieDeptNum }-${item.linieName}`; 
                        item.value = item.aekoCoverId;
                    })
                    this.linieList = data || [];
                }else{
                    iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn)
                }
            })
        },
        // 解冻
        async unfreeze(){
            const {linie=[]} = this;
            if(linie.length < 1) return iMessage.warn(this.language('LK_AEKO_COVER_TIPS_QINGXUANZELINIEHOUTIJIAO','请选择LINIE后提交'));
            this.btnLoading = true;
            await thawConvers(linie).then((res)=>{
                if(res.code == 200){
                    iMessage.success(this.language('LK_CAOZUOCHENGGONG','操作成功'));
                    this.$emit('getList');
                    this.clearDialog();
                }else{
                   iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn) 
                }
            }).catch((err)=>{
                this.btnLoading = false;
            })
        },
        clearDialog(){
            this.$emit('changeVisible','dialogVisible',false);
        },

    }
}
</script>

<style lang="scss" scoped>
    .unfreezeDialog{
        .assignDialog-contain{
        }
        
    }
</style>