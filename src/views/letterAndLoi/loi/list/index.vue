<!--
 * @Author: wentliao
 * @Date: 2021-06-18 13:49:45
 * @Description: LOI列表页
-->
<template>
  <div class="loiList">
    <!-- 搜索区域 -->
    <iSearch @sure="sure" @reset="reset">
        <el-form>
            <el-form-item v-for="(item,index) in letterListSearch" :key="'letterListSearch_'+index" :label="language(item.labelKey,item.label)" v-permission.dynamic.auto="`${item.permissionKey}|LOI-${item.label}`">
                <iSelect clearable v-update v-if="item.type === 'select'" v-model="searchParams[item.props]" :placeholder="language('partsprocure.CHOOSE','请选择')">
                  <el-option v-if="item.props!='show'" value="" :label="language('all','全部')"></el-option>
                  <el-option
                    v-for="item in selectOptions[item.selectOption] || []"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>  
                </iSelect> 
                <iDatePicker clearable class="datePicker" :placeholder="language('partsprocure.CHOOSE','请选择')" v-else-if="item.type === 'datePicker'" type="daterange"  value-format="yyyy-MM-dd" v-model="searchParams[item.props]"></iDatePicker>
                <iMultiLineInput v-else-if="item.type === 'multiLineInput'" v-model="searchParams[item.props]" :title="language(item.labelKey,item.label)" />
                <iInput clearable :placeholder="language('partsprocure.CHOOSE','请选择')" v-else v-model="searchParams[item.props]" @input="item.inputType ? handleInput($event, item, searchParams) : ''"></iInput> 
            </el-form-item>
        </el-form>
    </iSearch>
    <iCard class="contain margin-top7" >
        <!-- <template v-slot:header-control> -->
        <div class="margin-bottom20 clearFloat">
         <span class="font18 font-weight">{{language('LK_LOI_YUDINGDIANTONGZHISHULOI','预定点通知书(LOI)')}}</span>
            <div class="floatright">
                <iButton v-permission.auto="LK_LOI_LIST_JIHUO_LOI_ZHUANPAI|定点信LOI-转派" @click="turnSend">{{language('partsprocure.PARTSPROCURETRANSFER','转派')}} </iButton> 
                <iButton v-permission.auto="LK_LOI_LIST_QUERENBINGTIJIAO|LOI-确认并提交"  :loading="btnLoading.submit" @click="submit">{{language('LK_QUERENBINGTIJIAO','确认并提交')}}</iButton>
                <iButton v-permission.auto="LK_LOI_LIST_LINIEQUEREN|LOI-LINIE确认" :loading="btnLoading.lineSure" @click="lineSure">{{language('LK_LINIEQUEREN','LINIE确认')}}</iButton>
                <iButton v-permission.auto="LK_LOI_LIST_LINIETUIHUI|LOI-LINIE退回" :loading="btnLoading.lineBack" @click="lineBack">{{language('LK_LINIETUIHUI','LINIE退回')}}</iButton>
                <iButton v-permission.auto="LK_LOI_LIST_CHEHUI|LOI-撤回" :loading="btnLoading.back" @click="back">{{language('partsprocure.CheHui','撤回')}}</iButton>
                <iButton v-permission.auto="LK_LOI_LIST_GUANBI|LOI-关闭"  @click="closeLoi">{{language('LK_GUANBI','关闭')}} </iButton>
                <iButton v-permission.auto="LK_LOI_LIST_JIHUO|LOI-激活" :loading="btnLoading.activate" @click="activate">{{language('LK_LETTER_JIHUO','激活')}} </iButton>
                <iButton v-permission.auto="LK_LOI_LIST_EDITREMARK|LOI-编辑备注" @click="editRemark">{{language('LK_BIANJIBEIZHU','编辑备注')}} </iButton>
                <buttonTableSetting @click="edittableHeader"></buttonTableSetting>
            </div> 
        </div>
        <!-- </template> -->
        <!-- 表单区域 -->
        <tableList
            permissionKey="LETTERANDLOI_LOI_LIST"
            class="table"
            :lang="true"
            :tableData="tableListData"
            :tableTitle="tableTitle"
            :tableLoading="loading"
            @handleSelectionChange="handleSelectionChange"
            v-permission.auto="LK_LOI_LIST_TABLE|LOI-表格"
            ref="tableList"
        >
            <!-- 定点申请单号 -->
            <template #nominateAppId="scope">
                <!-- <span class="flexRow"> -->
                    <span class="openLinkText cursor"   @click="goToDesignate(scope.row)" >{{ scope.row.nominateAppId }}</span>
                    <span v-if=" scope.row.loiNum" class="icon-gray  cursor " @click="goToDesignate(scope.row)">
                        <!-- <icon symbol class="show" name="icontiaozhuananniu" />
                        <icon symbol class="active" name="icontiaozhuanxuanzhongzhuangtai" /> -->
                    <!-- </span> -->
                </span>  
            </template>
            <!-- LOI编号 -->
            <template #loiNum="scope">
                    <!-- <span class="flexRow"> -->
                        <span class="openLinkText cursor"   @click="goToDetail(scope.row)">{{ scope.row.loiNum }}</span>
                        <!-- <span v-if=" scope.row.loiNum" class="icon-gray  cursor "  @click="goToDetail(scope.row)">
                            <icon symbol class="show" name="icontiaozhuananniu" />
                            <icon symbol class="active" name="icontiaozhuanxuanzhongzhuangtai" />
                        </span> -->
                    <!-- </span>   -->
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
    <closeLoiDialog v-if="closeLoiVisible" :dialogVisible="closeLoiVisible" @changeVisible="changeVisible" @getList="getList" :selectItems="selectItems"/>
    <!-- 编辑备注弹窗 -->
    <remarkDialog  v-if="remarkVisible" :dialogVisible="remarkVisible" @changeVisible="changeVisible" @getList="getList" :selectItems="selectItems"/> 
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
    loiListSearch,
    loiListTitle,
} from '../../data';
import { pageMixins } from "@/utils/pageMixins";
// import tableList from "@/views/partsign/editordetail/components/tableList"
import tableList from "@/components/iTableSort";
import { tableSortMixins } from "@/components/iTableSort/tableSortMixins";
import closeLoiDialog from './components/closeLoiDialog'
import turnSendDialog from '../../letter/list/components/turnSendDialog'
import remarkDialog from './components/remarkDialog'
import {
    getloiList,
    confirmSubmitLio,
    liniefirm,
    linieBackLio,
    recallLio,
    activationLoi,
} from '@/api/letterAndLoi/loi'
import { getDictByCode } from '@/api/dictionary'
import { numberProcessor } from '@/utils' 
import {setPretreatmentParams} from '@/utils/tool'
import buttonTableSetting from '@/components/buttonTableSetting'
export default {
    name:'loiList',
     mixins: [pageMixins,tableSortMixins],
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
        icon,
        iMultiLineInput,
        buttonTableSetting,
        turnSendDialog
    },
    data(){
        return{
            turnSendVisible:false,
            letterListSearch:loiListSearch,
            searchParams:{
                showSelf: true,
                loiStatus:'',
            },
            selectOptions:{
                status:[],
                isShowMe:[
                    {label:this.language('nominationLanguage.Yes','是'),value: true},
                    {label:this.language('nominationLanguage.No','否'),value: false},
                ],
            },
            loading:false,
            tableListData:[],
            tableTitle:loiListTitle,
            selectItems:[],
            closeLoiVisible:false,
            remarkVisible:false,
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
        // 获取列表
        async getList(){
            console.log(this.searchParams);
             this.loading = true;
            const {searchParams,page} = this;
            // 若有定点起止时间将其拆分成两个字段
            const {nominateDate=[],showSelf=true} = searchParams;
            const data = {
                current:page.currPage,
                size:page.pageSize
            };
            if(nominateDate.length){
                data['startDate'] = nominateDate[0];
                data['endDate'] = nominateDate[1];
            }
            await getloiList({
                ...searchParams,
                ...data,
                showSelf
                }).then((res)=>{
                 this.loading = false;
                const {code,data=[],total} = res;
                if(code==200){
                   this.tableListData = data;
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
            await this.getDictionary('status','NOMINATION_LOI_STATUS');
        },

        // 重置
        reset(){
            this.searchParams = {
                show: true,
                loiStatus:'',
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
        goToDesignate(row) {
            const routeData = this.$router.resolve({
            path: '/designate/rfqdetail',
            query: {
                desinateId: row.nominateAppId, 
                designateType: row.nominateProcessType
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
                const ids = (selectItems.map((item)=>item.id));
                this.btnLoading.submit = true;
                await confirmSubmitLio({ids}).then((res)=>{
                    this.btnLoading.submit = false;
                    if(res.code == 200){
                        iMessage.success(this.language('LK_CAOZUOCHENGGONG','操作成功'));
                        this.getList();
                    }else{
                        iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn);
                    }
                }).catch((err)=>{
                    this.btnLoading.submit = false;
                })
            }else{
                console.log(isNext,'CANCEL');
            }
            
        },

        // LINE确认
        async lineSure(){
            const isNext  = await this.isSelectItem();
            if(isNext){
                const {selectItems} = this;
                const ids = (selectItems.map((item)=>item.id));
                this.btnLoading.lineSure = true;
                // iMessage.warn('定点信【定点信编号】不是【Linie确认中】状态，Linie不能操作！');
                await liniefirm({ids}).then((res)=>{
                    this.btnLoading.lineSure = false;
                    if(res.code == 200){
                        iMessage.success(this.language('LK_CAOZUOCHENGGONG','操作成功'));
                        this.getList();
                    }else{
                         iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn);
                    }
                }).catch((err)=>{
                    this.btnLoading.lineSure = false;
                })
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
                const ids = (selectItems.map((item)=>item.id));
                this.btnLoading.lineBack = true;
                await linieBackLio({ids}).then((res)=>{
                this.btnLoading.lineBack = false;
                    if(res.code == 200){
                        iMessage.success(this.language('LK_CAOZUOCHENGGONG','操作成功'));
                        this.getList();
                    }else{
                         iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn);
                    }
                }).catch((err)=>{
                    this.btnLoading.lineBack = false;
                })
            }else{
                console.log(isNext,'CANCEL');
            }
        },

        // 撤回
        async back(){
            const isNext  = await this.isSelectItem();
            if(isNext){
                const {selectItems} = this;
                const ids = (selectItems.map((item)=>item.id));
                this.btnLoading.back = true;
                await recallLio({ids}).then((res)=>{
                    this.btnLoading.back = false;
                    if(res.code == 200){
                        iMessage.success(this.language('LK_CAOZUOCHENGGONG','操作成功'));
                        this.getList();
                    }else{
                         iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn);
                    }
                }).catch((err)=>{
                    this.btnLoading.back = false;
                })
            }else{
                console.log(isNext,'CANCEL');
            }
        },
        
        // 关闭LOI
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
                const {selectItems} = this;
                const ids = (selectItems.map((item)=>item.id));
                this.btnLoading.activate = true;
                await activationLoi({ids}).then((res)=>{
                    this.btnLoading.activate = false;
                    if(res.code == 200){
                        iMessage.success(this.language('LK_CAOZUOCHENGGONG','操作成功'));
                        this.getList();
                    }else{
                         iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn);
                    }
                }).catch((err)=>{
                    this.btnLoading.activate = false;
                })
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
        goToDetail(row){
            const { id } = row; 
             const routeData = this.$router.resolve({
            path: '/sourceinquirypoint/sourcing/partsletter/loidetail',
            query: {id,}
            })
            window.open(routeData.href, '_blank')
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
    .openLinkText{
     color:$color-blue;
    }
    .loiList{
        .datePicker {
            width: 100% !important;
        }
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
</style>