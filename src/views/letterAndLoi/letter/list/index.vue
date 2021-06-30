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
            <el-form-item v-for="(item,index) in letterListSearch" :key="'letterListSearch_'+index" :label="language(item.labelKey,item.name)">
                <iSelect v-update v-if="item.type === 'select'" v-model="searchParams[item.props]" :placeholder="language('partsprocure.CHOOSE','请选择')">
                  <el-option v-if="item.props!='showSelf'" value="" :label="language('all','全部')"></el-option>
                  <el-option
                    v-for="item in selectOptions[item.selectOption] || []"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>  
                </iSelect> 
                <iDatePicker style="width:185px" :placeholder="language('partsprocure.CHOOSE','请选择')" v-else-if="item.type === 'datePicker'" type="daterange"  value-format="yyyy-MM-dd" v-model="searchParams[item.props]"></iDatePicker>
                <iInput :placeholder="language('LK_QINGSHURU','请输入')" v-else v-model="searchParams[item.props]"></iInput> 
            </el-form-item>
        </el-form>
    </iSearch>
    <iCard class="contain margin-top20">
        <template v-slot:header-control>
            <iButton @click="submit">{{language('LK_QUERENBINGTIJIAO','确认并提交')}}</iButton>
            <iButton @click="lineSure">{{language('LK_LINEQUEREN','LINIE确认')}}</iButton>
            <iButton @click="lineBack">{{language('LK_LINETUIHUI','LINIE退回')}}</iButton>
            <iButton @click="back">{{language('partsprocure.CheHui','撤回')}}</iButton>
            <iButton @click="turnSend">{{language('partsprocure.PARTSPROCURETRANSFER','转派')}} </iButton> 
            <iButton @click="closeLetter">{{language('LK_GUANBI','关闭')}} </iButton>
            <iButton @click="activate">{{language('LK_JIHUO','激活')}} </iButton>
            <iButton @click="downloadFiles">{{language('LK_DAOCHU','导出')}} </iButton>
        </template>
        <!-- 表单区域 -->
        <tableList
            class="table"
            index
            :lang="true"
            :tableData="tableListData"
            :tableTitle="tableTitle"
            :tableLoading="loading"
            @handleSelectionChange="handleSelectionChange"
        >
            <!-- 定点申请单号 -->
            <template #nominateAppId="scope">
                <a class="trigger" href="javascript:;" @click="goToDesignate(scope.row)">
                    <span class="link" >{{ scope.row.nominateAppId }}</span>
                </a>
            </template>
            <!-- 定点信编号 -->
            <template #letterNum="scope">
                <a class="trigger" href="javascript:;" @click="goToDetail(scope.row)">
                    <span class="link" >{{ scope.row.letterNum }}</span>
                </a>
            </template>
            <!-- RFQ编号 -->
            <!-- 后端未处理 直接返回的零件列表 自己取第一个 -->
            <template #parts="scope">
                <span>{{getRfqId(scope.row)}}</span>
            </template>
            <!-- 定点信状态 -->
            <template #status="scope">
                <span >{{ scope.row.status && scope.row.status.desc }}</span>
            </template>
            <!-- 是否签署协议 -->
            <template #isSignAgreement="scope">
                <span>{{scope.row.isSignAgreement ? language('nominationLanguage.Yes','是') :language('nominationLanguage.No','否')}}</span>
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

    <!-- 转派弹窗 -->
    <turnSendDialog v-if="turnSendVisible" :dialogVisible="turnSendVisible" @changeVisible="changeVisible" @getList="getList" :selectItems="selectItems"/>
    <!-- 关闭定点信弹窗 -->
    <closeLetterDialog v-if="closeLetterVisible" :dialogVisible="closeLetterVisible" @changeVisible="changeVisible" @getList="getList" :selectItems="selectItems"/>
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
    letterListSearch,
    letterListTitle,
} from '../../data';
import { pageMixins } from "@/utils/pageMixins";
import tableList from "@/views/partsign/editordetail/components/tableList"
import turnSendDialog from './components/turnSendDialog'
import closeLetterDialog from './components/closeLetterDialog'
import {
    getLetterList,
    fsConfirm,
    liniefirm,
    fsRecall,
    liniereturn,
    fsActivate,
    downloadLetterFile,
    letterExport,
} from '@/api/letterAndLoi/letter'
import { getDictByCode } from '@/api/dictionary'
export default {
    name:'letterList',
    mixins: [pageMixins],
    components:{
        iSearch,
        iInput,
        iSelect,
        iDatePicker,
        tableList,
        iPagination,
        iButton,
        turnSendDialog,
        closeLetterDialog,
        iCard,
    },
    data(){
        return{
            letterListSearch:letterListSearch,
            searchParams:{
                showSelf:'YES',
                status:'',
            },
            selectOptions:{
                status:[],
                showSelf:[
                    {label:'是',key:'nominationLanguage.Yes',value:'YES'},
                    {label:'否',key:'nominationLanguage.No',value:'NO'},
                ],
            },
            loading:false,
            tableListData:[
                // {nominateAppId:'50912471',letterNum:'NL21-10180',nominateLetterId:'1',rfqId:'51120086',supplierNum:'068',supplierSapNum:'10047',supplierName:'博世汽⻋技术服务(中国)有限公司',statusDesc:'前期处理中',supplierResult:'供应商反馈',fsName:'⾼真',linieName:'王颖',isSignAgreement:'已签署',nominateDate:'2021-04-23'},
                // {nominateAppId:'50912472',letterNum:'NL21-10181',nominateLetterId:'2',rfqId:'51120086',supplierNum:'068',supplierSapNum:'10047',supplierName:'博世汽⻋技术服务(中国)有限公司',statusDesc:'前期处理中',supplierResult:'供应商反馈',fsName:'⾼真',linieName:'王颖',isSignAgreement:'已签署',nominateDate:'2021-04-23'}
            ],
            tableTitle:letterListTitle,
            selectItems:[],
            turnSendVisible:false, // 转派弹窗
            closeLetterVisible:false, // 关闭定点信弹窗
        }
    },
    created(){
        this.getSelectOptions();
        this.getList();
    },
    methods:{
        // 获取列表
        async getList(){
            this.loading = true;
            const {searchParams,page} = this;
            // 若有定点起止时间将其拆分成两个字段
            const {nominateDate=[]} = searchParams;
            const data = {
                current:page.currPage,
                size:page.pageSize
            };
            if(nominateDate.length){
                data['nominateDateStart'] = nominateDate[0];
                data['nominateDateEnd'] = nominateDate[1];
            }
            await getLetterList({...searchParams,...data}).then((res)=>{
                this.loading = false;
                const {code,data={}} = res;
                if(code==200){
                   const {records=[],total} = data;
                   this.tableListData = records;
                   this.page.totalCount = total;
                }else{
                    iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn)
                }
            }).catch((err)=>{
                this.loading = false;
            })
            
        },

        // 调取数据字典获取下拉
        async getDictionary(optionName, optionType) {
            await getDictByCode(optionType).then(res => {
                if(res?.result) {
                this.selectOptions[optionName] = res.data[0].subDictResultVo.map(item => {
                    return { value: item.code, label: this.$i18n.locale === "zh" ? item.name : item.nameEn }
                })
                }
            })
        },

        async getSelectOptions(){
            // 定点信状态
            await this.getDictionary('status','NOMINATION_LETTER_STATUS');
            console.log(this.selectOptions);
        },

        // 重置
        reset(){
            this.searchParams = {
                showSelf:'YES',
                status:'',
            }
        },
        
        handleSelectionChange(val) {
            this.selectItems = val;
        },
        
        // 跳转定点申请详情页
        goToDesignate(row){
            console.log(row);
            const { nominateAppId,nominateProcessType={} } = row;
            const routeData = this.$router.resolve({
            path: '/designate/rfqdetail',
            query: {
                desinateId: nominateAppId, 
                designateType: (nominateProcessType && nominateProcessType.code) || ''
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
                iMessage.warn(this.language('createparts.QingXuanZeZhiShaoYiTiaoShuJu','请选择至少一条数据'));
                return false;
            }else{
                if(type){
                    return true;
                }else{
                 const confirmInfo = await this.$confirm(this.language('submitSure','您确定要执行提交操作吗？'));
                 return confirmInfo == 'confirm';
                }
                
            }
            
        },

        // 确认并提交
         async submit(){
            const isNext  = await this.isSelectItem();
            if(isNext){
                const {selectItems} = this;
                const nominateLetterIds = (selectItems.map((item)=>item.nominateLetterId)).join();
                await fsConfirm({nominateLetterIds}).then((res)=>{
                    if(res.code == 200){
                        iMessage.success(this.language('LK_CAOZUOCHENGGONG','操作成功'));
                        this.getList();
                    }else{
                        iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn);
                    }
                }).catch((err)=>{});
            }else{
                console.log(isNext,'CANCEL');
            }
            
        },

        // LINE确认
        async lineSure(){
            const isNext  = await this.isSelectItem();
            if(isNext){
                // iMessage.warn('定点信【定点信编号】不是【Linie确认中】状态，Linie不能操作！');
                const {selectItems} = this;
                const nominateLetterIds = (selectItems.map((item)=>item.nominateLetterId)).join();
                await liniefirm({nominateLetterIds}).then((res)=>{
                    if(res.code == 200){
                        iMessage.success(this.language('LK_CAOZUOCHENGGONG','操作成功'));
                        this.getList();
                    }else{
                         iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn);
                    }
                }).catch((err)=>{});
                console.log(isNext,'OK');
            }else{
                console.log(isNext,'CANCEL');
            }
        },
        // LINE退回
        async lineBack(){
            const isNext  = await this.isSelectItem();
            if(isNext){
                // iMessage.warn('定点信【定点信编号】不是【Linie确认中】状态，Linie不能操作！');
                const {selectItems} = this;
                const nominateLetterIds = (selectItems.map((item)=>item.nominateLetterId)).join();
                await liniereturn({nominateLetterIds}).then((res)=>{
                    if(res.code==200){
                        iMessage.success(this.language('LK_CAOZUOCHENGGONG','操作成功'));
                        this.getList();
                    }else{
                         iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn)
                    }
                }).catch((err)=>{})
                console.log(isNext,'OK');
            }else{
                console.log(isNext,'CANCEL');
            }
        },

        // 撤回
        async back(){
            const isNext  = await this.isSelectItem();
            if(isNext){
                const {selectItems} = this;
                const nominateLetterIds = (selectItems.map((item)=>item.nominateLetterId)).join();
                await fsRecall({nominateLetterIds}).then((res)=>{
                    if(res.code == 200){
                        iMessage.success(this.language('LK_CAOZUOCHENGGONG','操作成功'));
                        this.getList();
                    }else{
                        iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn);
                    }
                }).catch((err)=>{});
                console.log(isNext,'OK');
            }else{
                console.log(isNext,'CANCEL');
            }
        },

        // 转派
        async turnSend(){
            const isNext  = await this.isSelectItem(true);
            if(isNext){
                this.changeVisible('turnSendVisible',true);
                console.log(isNext,'OK');
            }else{
                console.log(isNext,'CANCEL');
            }
        },

        // 关闭定点信
        async closeLetter(){
            const isNext  = await this.isSelectItem(true);
            if(isNext){
                this.changeVisible('closeLetterVisible',true);
                console.log(isNext,'OK');
            }else{
                console.log(isNext,'CANCEL');
            }
        },

        // 激活
        async activate(){ 
            const isNext  = await this.isSelectItem();
            if(isNext){
                const {selectItems} = this;
                const nominateLetterIds = (selectItems.map((item)=>item.nominateLetterId)).join();
                await fsActivate({nominateLetterIds}).then((res)=>{
                    if(res.code==200){
                        iMessage.success(this.language('LK_CAOZUOCHENGGONG','操作成功'));
                        this.getList();
                    }else{
                        iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn);
                    }
                }).catch((e)=>{
                    iMessage.error(this.$i18n.locale === "zh" ? e.desZh : e.desEn)
                });
                console.log(isNext,'OK');
            }else{
                console.log(isNext,'CANCEL');
            }
        },
        // 导出定点信
        async downloadFiles(){
            const isNext  = await this.isSelectItem();
            if(isNext){
                const {selectItems} = this;
                const nominateLetterIds = selectItems.map((item)=>item.nominateLetterId);
                await letterExport({nominateLetterIds});
                console.log(isNext,'OK');
            }else{
                console.log(isNext,'CANCEL');
            }
        },

        // 跳转至定点信详情页
        goToDetail(row){
            const { nominateLetterId } = row;
            const routeData = this.$router.resolve({
            path: '/sourcing/partsletter/letterdetail',
            query: {id:nominateLetterId}
            })
            window.open(routeData.href, '_blank')
        },

        // RFQ编号获取处理一下
        getRfqId(row){
            if(row && row.parts && row.parts.length){
                const parts = row.parts[0] || {};
                return parts.rfqId || ''
            }else{
                return ''
            }
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
            .btn-list{
                text-align: right;
            }
        }
    }
</style>