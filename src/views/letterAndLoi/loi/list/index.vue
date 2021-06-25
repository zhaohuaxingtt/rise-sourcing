<!--
 * @Author: wentliao
 * @Date: 2021-06-18 13:49:45
 * @Description: LOI列表页
-->
<template>
  <div class="loiList">
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
                <iDatePicker :placeholder="$t('partsprocure.CHOOSE')" v-else-if="item.type === 'datePicker'" value-format="" v-model="searchParams[item.props]"></iDatePicker>
                <iInput :placeholder="$t('partsprocure.CHOOSE')" v-else v-model="searchParams[item.props]"></iInput> 
            </el-form-item>
        </el-form>
    </iSearch>
    <iCard class="contain margin-top20" title="预定点通知书(LOI)">
        <template v-slot:header-control>
            <iButton @click="submit">{{$t('LK_QUERENBINGTIJIAO')}}</iButton>
            <iButton @click="lineSure">{{$t('LK_LINEQUEREN')}}</iButton>
            <iButton @click="lineBack">{{$t('LK_LINETUIHUI')}}</iButton>
            <iButton @click="back">{{$t('partsprocure.CheHui')}}</iButton>
            <iButton @click="closeLoi">{{$t('LK_GUANBI')}} </iButton>
            <iButton @click="activate">{{$t('LK_JIHUO')}} </iButton>
            <iButton @click="editRemark">{{$t('LK_BIANJIBEIZHU')}} </iButton>
        </template>
        <!-- 表单区域 -->
        <tableList
            class="table"
            index
            :tableData="tableListData"
            :tableTitle="tableTitle"
            :tableLoading="loading"
            @handleSelectionChange="handleSelectionChange"
        >
            <!-- 定点申请单号 -->
            <template #key1="scope">
                <a class="trigger" href="javascript:;" @click="goToDesignate(scope.row)">
                    <span class="link" >{{ scope.row.key1 }}</span>
                </a>
            </template>
            <!-- LOI编号 -->
            <template #key2="scope">
                <a class="trigger" href="javascript:;" @click="goToDetail(scope.row)">
                    <span class="link" >{{ scope.row.key2 }}</span>
                </a>
            </template>
        </tableList>
        <!-- 分页 -->
        <iPagination
            v-update
            @size-change="handleSizeChange($event, getList)"
            @current-change="handleCurrentChange($event, getList)"
            background
            :current-page="page.currPage"
            :page-sizes="page.pageSizes"
            :page-size="page.pageSize"
            :layout="page.layout"
            :total="page.totalCount"
        />

    </iCard>
    
    <!-- 关闭定点信弹窗 -->
    <closeLoiDialog v-if="closeLoiVisible" :dialogVisible="closeLoiVisible" @changeVisible="changeVisible"/>
    <!-- 编辑备注弹窗 -->
    <remarkDialog  v-if="remarkVisible" :dialogVisible="remarkVisible" @changeVisible="changeVisible" /> 
  </div>
</template>

<script>
import {
    iSearch,
    iInput,
    iSelect,
    iDatePicker,
    iPagination,
    iButton,
    iMessage,
    iCard,
} from 'rise';
import {
    loiListSearch,
    loiListTitle,
} from '../../data';
import { pageMixins } from "@/utils/pageMixins";
import tableList from "@/views/partsign/editordetail/components/tableList"
import closeLoiDialog from './components/closeLoiDialog'
import remarkDialog from './components/remarkDialog'
export default {
    name:'loiList',
     mixins: [pageMixins],
    components:{
        iSearch,
        iInput,
        iSelect,
        iDatePicker,
        tableList,
        iPagination,
        iButton,
        iCard,
        closeLoiDialog,
        remarkDialog,
    },
    data(){
        return{
            letterListSearch:loiListSearch,
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
            tableListData:[
                {key1:'50912471',key2:'NL21-10180',key3:'51120086',key4:'068',key5:'10047',key6:'博世汽⻋技术服务(中国)有限公司',key7:'前期处理中',key8:'供应商反馈',key9:'⾼真',key10:'王颖',key11:'备注',}
            ],
            tableTitle:loiListTitle,
            selectItems:[],
            closeLoiVisible:false,
            remarkVisible:false,
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
        
        // 跳转定点申请详情页
        goToDesignate(row){
            const routeData = this.$router.resolve({
            path: '/designate/rfqdetail',
            query: {
                // desinateId: row.id, 
                // designateType: (row.nominateProcessType && row.nominateProcessType.code) || ''
            }
            })
            window.open(routeData.href, '_blank')
        },

        changeVisible(type,visible){
            this[type] = visible;
        },

        // 判断是否勾选项
        async isSelectItem(type=false){
            const {selectItems} = this;
            if(!selectItems.length){
                iMessage.warn(this.$t('createparts.QingXuanZeZhiShaoYiTiaoShuJu'));
                return false;
            }else{
                if(type){
                    return true;
                }else{
                 const confirmInfo = await this.$confirm(this.$t('submitSure'));
                 return confirmInfo == 'confirm';
                }
                
            }
            
        },

        // 确认并提交
         async submit(){
            const isNext  = await this.isSelectItem();
            if(isNext){
                console.log(isNext,'OK');
            }else{
                console.log(isNext,'CANCEL');
            }
            
        },

        // LINE确认
        async lineSure(){
            const isNext  = await this.isSelectItem();
            if(isNext){
                iMessage.warn('定点信【定点信编号】不是【Linie确认中】状态，Linie不能操作！');
                console.log(isNext,'OK');
            }else{
                console.log(isNext,'CANCEL');
            }
        },
        // LINE退回
        async lineBack(){
            const isNext  = await this.isSelectItem();
            if(isNext){
                iMessage.warn('定点信【定点信编号】不是【Linie确认中】状态，Linie不能操作！');
                console.log(isNext,'OK');
            }else{
                console.log(isNext,'CANCEL');
            }
        },

        // 撤回
        async back(){
            const isNext  = await this.isSelectItem();
            if(isNext){
                console.log(isNext,'OK');
            }else{
                console.log(isNext,'CANCEL');
            }
        },
        
        // 关闭定点信
        async closeLoi(){
            const isNext  = await this.isSelectItem(true);
            if(isNext){
                this.changeVisible('closeLoiVisible',true);
                console.log(isNext,'OK');
            }else{
                console.log(isNext,'CANCEL');
            }
        },

        // 激活
        async activate(){
            const isNext  = await this.isSelectItem();
            if(isNext){
                console.log(isNext,'OK');
            }else{
                console.log(isNext,'CANCEL');
            }
        },

        // 编辑备注
        async editRemark(){ 
            const isNext  = await this.isSelectItem(true);
            if(isNext){
                this.changeVisible('remarkVisible', true)
                console.log(isNext,'OK');
            }else{
                console.log(isNext,'CANCEL');
            }
        },

        // 跳转至定点信详情页
        goToDetail(){
             const routeData = this.$router.resolve({
            path: '/sourcing/partsletter/loidetail',
            query: {}
            })
            window.open(routeData.href, '_blank')
        },
    }
}
</script>
<style lang="scss" scoped>
    .loiList{
        ::v-deep .el-date-editor .el-range__close-icon{
            display: block;
            width: 10px;
        }
        .contain{
            // background: #fff;
            .btn-list{
                text-align: right;
            }
        }
    }
</style>