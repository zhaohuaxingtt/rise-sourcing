<template>
  <iDialog
    :title="$t('格式校验错误')"
    :visible.sync="rulesErrorVisible.dialogVisible"
    @close="clearRefresh"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    width="80%"
  >
    <iButton class="upload_button" @click="upload">{{$t('DAOCHU')}}</iButton>
    <tableList
        :tableData="tableListData" 
        ref="contractForm"
        style="margin-bottom:25px;"
        :tableTitle="tableTitle" 
        :tableLoading="loading" 
        :index="true"
        :selection="false"
        border
        >
    </tableList>
  </iDialog>
</template>

<script>
import { iDialog,iButton } from "rise";
import tableList from "@/components/commonTable";
import { rulesErrorTitle } from "./data.js";
import {
    exportErrorInfo,
} from '@/api/project/projectprogressreport'
export default {
    components:{
        iDialog,
        iButton,
        tableList,
    },
    props:{
        rulesErrorVisible:{
            type:Object,
            default:{},
        },
        errorList:{
            type:Array,
            default:[],
        }
    },
    data(){
        return{
            tableListData:[

            ],
            tableTitle:rulesErrorTitle,
        }
    },
    created(){
        this.tableListData = _.cloneDeep(this.errorList);
    },
    methods:{
        upload(){
            exportErrorInfo({
                list:[
                    ...this.tableListData
                ]
            })
        },
        clearRefresh(){
            this.$emit("close")
        },
    }
}
</script>

<style lang="scss" scoped>
.upload_button{
    position: absolute;
    top:25px;
    right:75px;
}
::v-deep .el-dialog__body{
    padding-bottom:6px!important;
}
</style>