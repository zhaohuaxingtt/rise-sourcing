<!--
 * @Author: wentliao
 * @Date: 2021-06-18 13:49:45
 * @Description: 定点信列表页
-->
<template>
  <div class="letterList">
    <!-- 搜索区域 -->
    <iSearch @sure="sure" @reset="reset">
        <el-form>
            <el-form-item v-for="(item,index) in letterListSearch" :key="'letterListSearch_'+index" :label="language(item.labelKey,item.label)" v-permission.dynamic.auto="`${item.permissionKey}|定点信-${item.label}`">
                <iSelect clearable v-update v-if="item.type === 'select'" v-model="searchParams[item.props]" :placeholder="language('partsprocure.CHOOSE','请选择')">
                  <el-option value="" :label="language('all','全部')"></el-option>
                  <el-option
                    v-for="item in selectOptions[item.selectOption] || []"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>  
                </iSelect> 
                <iDatePicker clearable class="datePicker" :placeholder="language('partsprocure.CHOOSE','请选择')" v-else-if="item.type === 'datePicker'" type="daterange"  value-format="yyyy-MM-dd" v-model="searchParams[item.props]"></iDatePicker>
                <iMultiLineInput v-else-if="item.type === 'multiLineInput'" v-model="searchParams[item.props]" :title="language(item.labelKey,item.label)" />
                <iInput clearable :maxlength="item.maxlength" :placeholder="language('LK_QINGSHURU','请输入')" v-else v-model="searchParams[item.props]" @input="item.inputType ? handleInput($event, item, searchParams) : ''"></iInput> 
            </el-form-item>
        </el-form>
    </iSearch>
    <iCard class="contain margin-top7">
        <div class="margin-bottom20 clearFloat">

        <span class="font18 font-weight">{{ language( 'DINGDIANXIN', '定点信' ) }}</span>
        <div class="floatright">
            <iButton v-permission.auto="LK_LETTER_LIST_QUERENBINGTIJIAO|定点信-确认并提交" :loading="btnLoading.submit" @click="submit">{{language('LK_QUERENBINGTIJIAO','确认并提交')}}</iButton>
            <iButton v-permission.auto="LK_LETTER_LIST_LINIEQUEREN|定点信-LINIE确认" :loading="btnLoading.lineSure" @click="lineSure">{{language('LK_LINIEQUEREN','LINIE确认')}}</iButton>
            <iButton v-permission.auto="LK_LETTER_LIST_LINIETUIHUI|定点信-LINIE退回" :loading="btnLoading.lineBack" @click="lineBack">{{language('LK_LINIETUIHUI','LINIE退回')}}</iButton>
            <iButton v-permission.auto="LK_LETTER_LIST_CHEHUI|定点信-撤回" :loading="btnLoading.back" @click="back">{{language("CHEHUI", "撤回")}}</iButton>
            <iButton v-permission.auto="LK_LETTER_LIST_ZHUANPAI|定点信-转派" @click="turnSend">{{language('partsprocure.PARTSPROCURETRANSFER','转派')}} </iButton> 
            <iButton v-permission.auto="LK_LETTER_LIST_GUANBI|定点信-关闭" @click="closeLetter">{{language('LK_GUANBI','关闭')}} </iButton>
            <iButton v-permission.auto="LK_LETTER_LIST_JIHUO|定点信-激活" :loading="btnLoading.activate" @click="activate">{{language('LK_LETTER_JIHUO','激活')}} </iButton>
            <iButton v-permission.auto="LK_LETTER_LIST_DAOCHU|定点信-导出" @click="downloadFiles">{{language('LK_DAOCHU','导出')}} </iButton>
            <buttonTableSetting @click="edittableHeader"></buttonTableSetting>
        </div>
        </div>
        <!-- 表单区域 -->
        <tableList
            permissionKey="LETTERANDLOI_LETTER_LIST"
            class="table"
            :lang="true"
            :tableData="tableListData"
            :tableTitle="tableTitle"
            :tableLoading="loading"
            @handleSelectionChange="handleSelectionChange"
            v-permission.auto="LK_LETTER_LIST_TABLE|定点信-表格"
            ref="tableList"
        >
            <!-- 定点申请单号 -->
            <template #nominateAppId="scope">
                <!-- <span class="flexRow"> -->
                    <span class="openLinkText cursor " @click="goToDesignate(scope.row)"> {{ scope.row.nominateAppId }}</span>
                        <!-- <span  v-if="scope.row.nominateAppId" class="icon-gray  cursor "  @click="goToDesignate(scope.row)"> -->
                        <!-- <icon symbol class="show" name="icontiaozhuananniu" />
                        <icon symbol class="active" name="icontiaozhuanxuanzhongzhuangtai" /> -->
                    <!-- </span> -->
                <!-- </span>   -->
            </template>
            <!-- 定点信编号 -->
            <template #letterNum="scope">
                <!-- <span class="flexRow"> -->
                    <span class="openLinkText cursor " @click="goToDetail(scope.row)"> {{  scope.row.letterNum }}</span>
                        <!-- <span  v-if=" scope.row.letterNum" class="icon-gray  cursor "  @click="goToDetail(scope.row)">
                        <icon symbol class="show" name="icontiaozhuananniu" />
                        <icon symbol class="active" name="icontiaozhuanxuanzhongzhuangtai" /> -->
                    <!-- </span> -->
                <!-- </span>   -->
            </template>
            <!-- RFQ编号 -->
            <!-- 后端未处理 直接返回的零件列表 自己取第一个 -->
            <template #parts="scope">
                <span>{{getRfqId(scope.row)}}</span>
            </template>
            <template #svwCode="scope">
                <span>{{ scope.row.svwCode || scope.row.svwTempCode }}</span>
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
    <turnSendDialog :dialogVisible="turnSendVisible" @changeVisible="changeVisible" @getList="getList" :selectItems="selectItems"/>
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
    icon,
    iMultiLineInput
} from 'rise';
import {
    letterListSearch,
    letterListTitle,
} from '../../data';
import { pageMixins } from "@/utils/pageMixins";
// import tableList from "@/views/partsign/editordetail/components/tableList"
import tableList from "@/components/iTableSort";
import { tableSortMixins } from "@/components/iTableSort/tableSortMixins";
import turnSendDialog from './components/turnSendDialog'
import closeLetterDialog from './components/closeLetterDialog'
import {
    getLetterList,
    fsConfirm,
    liniefirm,
    fsRecall,
    liniereturn,
    fsActivate,
    letterExport,
} from '@/api/letterAndLoi/letter'
import { getDictByCode } from '@/api/dictionary'
import { numberProcessor } from '@/utils' 
import {setPretreatmentParams} from '@/utils/tool'
import buttonTableSetting from '@/components/buttonTableSetting'
export default {
    name:'letterList',
    mixins: [pageMixins,tableSortMixins],
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
        icon,
        iMultiLineInput,
        buttonTableSetting
    },
    data(){
        return{
            letterListSearch:letterListSearch,
            searchParams:{
                showSelf: true,
                status:'',
            },
            selectOptions:{
                status:[],
                showSelf:[
                    {label:'是',key:'nominationLanguage.Yes',value: true},
                    {label:'否',key:'nominationLanguage.No',value: false},
                ],
            },
            loading:false,
            tableListData:[],
            tableTitle:letterListTitle,
            selectItems:[],
            turnSendVisible:false, // 转派弹窗
            closeLetterVisible:false, // 关闭定点信弹窗
            btnLoading:{
                submit:false,
                lineSure:false,
                lineBack:false,
                back:false,
                activate:false,
            },
        }
    },
    created(){
        // 获取寻源概览过来的预置参数
        setPretreatmentParams(this, this.searchParams, this.$route.query)
        this.getSelectOptions();
        this.getList();
    },
    methods:{
         getYearMonth(date){
             date = (date + '').split(/[ ]+/);
            return date[0];
            },
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
            if(searchParams.status){
                data.status = searchParams.status.split(',')
            }else{
                data.status = []
            }
            await getLetterList({
                ...searchParams,
                ...data,
                }).then((res)=>{
                this.loading = false;
                res.data.records.forEach(val=> {
                    val.nominateDate = this.getYearMonth(val.nominateDate) === 'undefined' ? '' : this.getYearMonth(val.nominateDate)
                })
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
                showSelf: true,
                status:'',
            };
            this.page.currPage = 1;
            this.getList();
        },

        sure(){
            this.page.currPage = 1;
            this.getList(); 
        },
        
        handleSelectionChange(val) {
            this.selectItems = val;
        },
        
        // 跳转定点申请详情页
        goToDesignate(row){
            console.log(row);
            const { nominateAppId, nominateProcessType } = row;
            const routeData = this.$router.resolve({
            path: '/designate/rfqdetail',
            query: {
                desinateId: nominateAppId, 
                designateType: nominateProcessType
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
                this.btnLoading.submit = true;
                await fsConfirm({nominateLetterIds}).then((res)=>{
                    this.btnLoading.submit = false;
                    if(res.code == 200){
                        iMessage.success(this.language('LK_CAOZUOCHENGGONG','操作成功'));
                        this.getList();
                    }else{
                        iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn);
                    }
                }).catch((err)=>{
                    this.btnLoading.submit = false;
                });
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
                this.btnLoading.lineSure = true;
                await liniefirm({nominateLetterIds}).then((res)=>{
                    this.btnLoading.lineSure = false;
                    if(res.code == 200){
                        iMessage.success(this.language('LK_CAOZUOCHENGGONG','操作成功'));
                        this.getList();
                    }else{
                         iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn);
                    }
                }).catch((err)=>{
                    this.btnLoading.lineSure = false;
                });
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
                this.btnLoading.lineBack = true;
                await liniereturn({nominateLetterIds}).then((res)=>{
                    this.btnLoading.lineBack = false;
                    if(res.code==200){
                        iMessage.success(this.language('LK_CAOZUOCHENGGONG','操作成功'));
                        this.getList();
                    }else{
                         iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn)
                    }
                }).catch((err)=>{
                    this.btnLoading.lineBack = false;
                })
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
                this.btnLoading.back = true;
                await fsRecall({nominateLetterIds}).then((res)=>{
                    this.btnLoading.back = false;
                    if(res.code == 200){
                        iMessage.success(this.language('LK_CAOZUOCHENGGONG','操作成功'));
                        this.getList();
                    }else{
                        iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn);
                    }
                }).catch((err)=>{
                    this.btnLoading.back = false;
                });
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
                this.btnLoading.activate = true;
                await fsActivate({nominateLetterIds}).then((res)=>{
                    this.btnLoading.activate = false;
                    if(res.code==200){
                        iMessage.success(this.language('LK_CAOZUOCHENGGONG','操作成功'));
                        this.getList();
                    }else{
                        iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn);
                    }
                }).catch((e)=>{
                    this.btnLoading.activate = false;
                });
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
            path: '/sourceinquirypoint/sourcing/partsletter/letterdetail',
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

        handleInput(value, item, obj) {
            switch(item.inputType) {
                case "int":
                    this.$set(obj, item.props, numberProcessor(value, 0))
                    break
                default:
            }
        }
    }
}
</script>

<style lang="scss" scoped>
    .letterList{
        .datePicker {
            width: 100% !important;
        }
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
        .openLinkText{
            color:$color-blue;
        }
        .icon-gray{
            cursor: pointer;
            .active{
                display: none;
            }
            .show{
                display: block;
            }
        }
        .flexRow{
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .icon-gray:hover{
            cursor: pointer;
            .show{
                display: none;
            }
            .active{
                display: block;
            }
        }
    }
</style>