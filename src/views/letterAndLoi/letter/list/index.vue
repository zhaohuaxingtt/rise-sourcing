<!--
 * @Author: wentliao
 * @Date: 2021-06-18 13:49:45
 * @Description: 定点信列表页
-->
<template>
  <div class="letterList">
    <!-- 搜索区域 -->
    <iSearch @sure="getList" @reset="reset">
        <el-form>
            <el-form-item v-for="(item,index) in letterListSearch" :key="'letterListSearch_'+index" :label="$t(item.labelKey)">
                <iSelect v-update v-if="item.type === 'select'" v-model="searchParams[item.props]" :placeholder="$t('partsprocure.CHOOSE')">
                  <el-option v-if="item.props!='key13'" value="" :label="$t('all')"></el-option>
                  <el-option
                    v-for="item in selectOptions[item.selectOption] || []"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>  
                </iSelect> 
                <iDatePicker style="width:185px" :placeholder="$t('partsprocure.CHOOSE')" v-else-if="item.type === 'datePicker'" type="daterange"  value-format="" v-model="searchParams[item.props]"></iDatePicker>
                <iInput :placeholder="$t('partsprocure.CHOOSE')" v-else v-model="searchParams[item.props]"></iInput> 
            </el-form-item>
        </el-form>
    </iSearch>
    <div class="contain">
        <!-- 操作区域 -->
        <!-- 表单区域 -->
        <tableList
            class="table"
            index
            :tableData="tableListData"
            :tableTitle="tableTitle"
            :tableLoading="loading"
            @handleSelectionChange="handleSelectionChange"
        >

        </tableList>

    </div>

  </div>
</template>

<script>
import {
    iSearch,
    iInput,
    iSelect,
    iDatePicker,
} from 'rise';
import {
    letterListSearch,
    letterListTitle,
} from '../../data';
import tableList from "@/views/partsign/editordetail/components/tableList"
export default {
    name:'letterList',
    components:{
        iSearch,
        iInput,
        iSelect,
        iDatePicker,
        tableList,
    },
    data(){
        return{
            letterListSearch:letterListSearch,
            searchParams:{
                key13:'true',
                key7:'',
            },
            selectOptions:{
                status:[],
                isShowMe:[
                    {label:this.$t('nominationLanguage.Yes'),value:'true'},
                    {label:this.$t('nominationLanguage.No'),value:'false'},
                ],
            },
            loading:false,
            tableListData:[],
            tableTitle:letterListTitle,
            selectItems:[],
        }
    },
    methods:{
        // 获取列表
        getList(){
            console.log(this.searchParams);
        },

        // 重置
        reset(){

        },
        
        handleSelectionChange(val) {
            this.selectItems = val;
        },
    }
}
</script>

<style lang="scss" scoped>
    .letterList{
        ::v-deep .el-date-editor .el-range__close-icon{
            display: block;
            width: 10px;
        }
        .contain{
            background: #fff;
            margin-top: 20px;
            padding: 20px;
        }
    }
</style>