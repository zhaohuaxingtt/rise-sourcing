<template>
  <iDialog
    :title="$t('LK_TISHI')"
    :visible.sync="delDialogVisible.dialogVisible"
    @close="clearRefresh"
    width="22%"
    class="addDialog"
  >
    <span>{{$t("是否确认删除选中的记录")}}</span>
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
        delDialogVisible:{
            type:Object,
            default:{},
        }
    },
    data(){
        return{
        }
    },
    methods:{
        saveLinie(){
            this.$emit("submit")
        },
        clearRefresh(){
            this.$emit("clearDel")
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