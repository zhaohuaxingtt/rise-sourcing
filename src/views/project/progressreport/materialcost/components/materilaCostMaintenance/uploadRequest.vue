<template>
  <iDialog
    :title="$t('下载上传模板')"
    :visible.sync="uploadRequestVisible.dialogVisible"
    @close="clearRefresh"
    width="22%"
    class="addDialog"
  >
    <span>{{$t("LK_QINGXUANZHECHEXINGXIANGMU")}}</span>
    <iSelect v-model="carBro" filterable
            style="width:100%;margin-top:10px;"
            :placeholder="$t('LK_QINGXUANZE')">
        <el-option v-for="(item,index) in modelProject" :key="index" :value="item.purchaserId" :label="item.name"></el-option>
    </iSelect>

    <div slot="footer"
        class="dialog-footer">
        <iButton @click="saveLinie">{{$t('LK_QUEREN')}}</iButton>
        <iButton @click="clearRefresh">{{$t('LK_QUXIAO')}}</iButton>
    </div>
  </iDialog>
</template>

<script>
import { iDialog,iSelect,iButton } from "rise";
export default {
    components:{
        iDialog,
        iSelect,
        iButton,
    },
    props:{
        uploadRequestVisible:{
            type:Object,
            default:{},
        }
    },
    data(){
        return{
            carBro:"",
            modelProject:[

            ]
        }
    },
    methods:{
        saveLinie(){

        },
        clearRefresh(){
            this.$emit("clearuploadRequestVisible")
        },
    }
}
</script>

<style lang="scss" scoped>
.dialog-footer{
    display: block;
    width: 100%;
    margin-top: 15px;
    margin-bottom: 15px;
    text-align: right;
}
</style>