<!--
 * @Author: wentliao
 * @Date: 2021-07-28 10:57:42
 * @Description: 零件清单
-->

<template>
  <div class="aeko-partsList">
    <!-- 搜索区域 -->
    <iSearch @sure="sure" @reset="reset" class="search-form">
        <el-form>
            <!-- AEKO类型为AeA显示车型，为aeko/mp显示车型项目 -->
            <el-form-item
            v-show="!item.showCode || (item.showCode && item.showCode == aekoInfo.aekoType)"
            v-for="(item,index) in SearchList" :key="'Search_aeko_partsList'+index" 
            :label="language(item.labelKey,item.label)"
            v-permission.dynamic="item.permissionKey"
            >
                <iSelect 
                    v-if="item.type === 'select'" 
                    class="multipleSelect" 
                    collapse-tags 
                    :disabled="item.disabled" 
                    :multiple="item.multiple" 
                    :clearable="item.clearable" 
                    :filterable="item.filterable"  
                    v-model="searchParams[item.props]" 
                    :placeholder="item.filterable ? language('LK_QINGSHURU','请输入') : language('partsprocure.CHOOSE','请选择')"  
                    @change="handleMultipleChange($event, item.props,item.multiple)"
                    :filter-method="(val)=>{dataFilter(val,item.selectOption)}"
                >
                    <el-option  v-if="!item.noShowAll" value="" :label="language('all','全部')"></el-option>
                    <el-option
                        v-for="(item,index) in selectOptions[item.selectOption] || []"
                        :key="index"
                        :label="item.desc"
                        :value="item.code">
                    </el-option>
                </iSelect> 
                <iInput :placeholder="item.disabled ? '' : language('LK_QINGSHURU','请输入')" v-else :disabled="item.disabled" v-model.trim="searchParams[item.props]"></iInput> 
            </el-form-item>
        </el-form>
    </iSearch>
      <iCard :title="language('LK_AEKO_PARTSLIST','零件清单')" class="margin-top20">
        <!-- 按钮区域 -->
        <template v-slot:header-control>
            <div>
                <iButton v-permission="AEKO_DETAIL_TAB_LINGJIANQINGDAN_BUTTON_FENPAIKESHI" @click="assign(null ,'commodity')">{{language('LK_AEKO_FENPAIKESHI','分派科室')}} </iButton>
                <iButton v-permission="AEKO_DETAIL_TAB_LINGJIANQINGDAN_BUTTON_FENPAICAIGOUYUAN" @click="assign(null ,'linie')">{{language('FENPAICAIGOUYUAN','分派采购员')}} </iButton>
                <iButton v-permission="AEKO_DETAIL_TAB_LINGJIANQINGDAN_BUTTON_XINZENGLINGJIAN">{{language('LK_AEKO_XINZENGLINGJIAN','新增零件')}} </iButton>
                <iButton  v-permission="AEKO_DETAIL_TAB_LINGJIANQINGDAN_BUTTON_SHANCHULINGJIAN" :loading="btnLoading.deleteParts" @click="deleteParts">{{language('LK_AEKO_SHANCHULINGJIAN','删除零件')}} </iButton>
                <iButton v-permission="AEKO_DETAIL_TAB_LINGJIANQINGDAN_BUTTON_KESHITUIHUI" @click="back">{{language('LK_AEKO_KESHITUIHUI','科室退回')}} </iButton>
            </div>
        </template>
        <!-- 表单区域 -->
            <tableList
                class="table"
                index
                :lang="true"
                 v-permissionArr="['AEKO_AEKODETAIL_PARTLIST_TABLE','AEKO_DETAIL_TAB_LINGJIANQINGDAN_TABLE']"
                :selection="isAekoManager || isCommodityCoordinator"
                :tableData="tableListData"
                :tableTitle="tableTitle"
                :tableLoading="loading"
                @handleSelectionChange="handleSelectionChange"
            >
            <!-- 科室 -->
            <!-- 实际分配科室有就显示实际科室，否则就显示预设科室  表示科室是预设的 -->
            <template #linieDeptName="scoped">
                <span :class="!scoped.row.linieDeptNum ? 'isPreset' : '' ">{{scoped.row.linieDeptName || scoped.row.refferenceSmt}}</span>
            </template>
            <!-- linie -->
            <template #buyerName="scoped">
                <span :class="!scoped.row.buyerId ? 'isPreset' : '' ">
                    <!-- {{scoped.row.buyerName || scoped.row.refferenceByuerName}} -->
                    {{isShowLine(scoped.row)}}
                </span>
            </template>
            <!-- 操作 -->
            <template #operate="scoped">
                <span v-if="!scoped.row.linieDeptNum && isAekoManager" class="link-underline" @click="assign(scoped.row,'commodity')">{{language('LK_AEKO_FENPAIKESHI','分派科室')}}</span>
                <!-- 1.未分配过 2.分配过 分配人未操作过 【buyerId表示已有分配人,oldPartNumPreset不为空标识操作过】-->
                <!-- v-if="(!scoped.row.buyerId || ( scoped.row.buyerId && !oldPartNumPreset)) && isCommodityCoordinator"  -->
                <span 
                    v-if="isCommodityCoordinator && !scoped.row.isOperate" 
                    class="link-underline" 
                    @click="assign(scoped.row,'linie')"
                >
                    {{language('LK_AEKO_FENPAICAIGOUYUAN_LINE','分派采购员')}}
                </span>
            </template>

            </tableList>
            <!-- 提示 -->
            <p class="table-tips">N：Neu 新增； U：Ungueltig 取消； F：Freigabe 供应商认可，沿⽤； A：Aenderung 修改； I：Information 信息； M：Montagetext 安装信息</p>
            <!-- 分页 -->
            <iPagination
            v-update
            @size-change="handleSizeChange($event, init)"
            @current-change="handleCurrentChange($event, init)"
            background
            :current-page="page.currPage"
            :page-sizes="page.pageSizes"
            :page-size="page.pageSize"
            :layout="page.layout"
            :total="page.totalCount"
            />

      </iCard>
      <!-- 分配科室 -->
      <assignDialog v-if="assignVisible" :assignType="assignType" :dialogVisible="assignVisible" @changeVisible="changeVisible" @getList="getList" :selectItems="selectItems" :singleAssign="singleAssign" :requirementAekoId="aekoInfo.requirementAekoId" :linieDeptNum="selectOptions.linieDeptNumList" :buyerName="selectOptions.buyerName"/>
      <!-- 退回原因 -->
      <departBackDialog  v-if="departBackVisible" :dialogVisible="departBackVisible" @changeVisible="changeVisible" @getList="getList" :selectItems="selectItems" />
  </div>
</template>

<script>
import {
    iSearch,
    iCard,
    iSelect,
    iInput,
    iButton,
    iPagination,
    iMessage,
} from 'rise';
import { SearchList, linieSearchList , tableTitle, linieQueryForm, linieTableTitle,commodityTableTitle } from './data';
import tableList from "@/views/partsign/editordetail/components/tableList"
import { pageMixins } from "@/utils/pageMixins";
import assignDialog from './components/assignDialog'
import departBackDialog from './components/departBackDialog'
import { getAekoContentPart } from "@/api/aeko/detail"
import {
    getPartPage,
    deletePart,
} from '@/api/aeko/detail/partsList.js'
import {
    searchBrand,
    searchCartypeProject,
    searchLinie,
    getSearchCartype,
    searchCommodity,
} from '@/api/aeko/manage'
import { cloneDeep } from "lodash"
import {user as configUser } from '@/config'
export default {
    name:'partsList',
    mixins: [pageMixins],
    components:{
        iSearch,
        iCard,
        iSelect,
        iInput,
        iButton,
        tableList,
        iPagination,
        assignDialog,
        departBackDialog,
    },
    computed: {
        //eslint-disable-next-line no-undef
        ...Vuex.mapState({
            userInfo: state => state.permission.userInfo,
            permission: state => state.permission
        }),
    },
    props:{
        aekoInfo:{
            type:Object,
            default:()=>{},
        }
    },
   
    created() {
        this.isAekoManager = !!this.permission.whiteBtnList["AEKO_DETAIL_TAB_LINGJIANQINGDAN_BUTTON_FENPAIKESHI"]
        this.isCommodityCoordinator = !!this.permission.whiteBtnList["AEKO_DETAIL_TAB_LINGJIANQINGDAN_BUTTON_KESHITUIHUI"]
        this.isLinie = !!this.permission.whiteBtnList["AEKO_AEKODETAIL_PARTLIST_TABLE"]

        this.getSearchList();

        if (this.isLinie) {
            this.SearchList = linieSearchList
            this.tableTitle = linieTableTitle
            this.searchParams = cloneDeep(linieQueryForm)
            this.searchParams.linieDeptNum = this.userInfo.deptDTO.nameZh
            this.searchParams.buyerName = this.userInfo.nameZh
        } else if (this.isCommodityCoordinator) {
            this.SearchList = SearchList
            this.tableTitle = commodityTableTitle;
        } else if (this.isAekoManager) {
            this.SearchList = SearchList
            this.tableTitle = tableTitle;
        } else {
            this.SearchList = []
            this.tableTitle = []
        }

    },
    data(){
        return{
            SearchList:[],
            searchParams:{
                brand:'',
                cartypeCode:[''],
                cartype:[''],
                linieDeptNumList:[''],
            },
            selectOptions:{
                cartypeCode:[],
                buyerName:[],
                cartype:[],
                linieDeptNumList:[],
            },
            selectOptionsCopy:{
                cartypeCode:[],
                buyerName:[],
                cartype:[],
                linieDeptNumList:[],
            },
            selectItems:[],
            loading:false,
            tableListData:[ ],
            tableTitle: [],
            assignVisible:false,
            singleAssign:[],
            assignType: "",
            btnLoading:{
                deleteParts:false,
            },
            departBackVisible:false,
            isAekoManager: false,
            isCommodityCoordinator: false,
            isLinie: false
        }
    },
    methods:{
        sure() {
            // 判断零件号查询至少大于等于9位或为空的情况下才允许查询
            if(this.searchParams.partNum && this.searchParams.partNum.trim().length < 9){
                this.loading = false;
                return iMessage.warn(this.language('LK_AEKO_LINGJIANHAOZHISHAOSHURU9WEI','查询零件号不足,请补充至9位或以上'));
            }

            this.page.currPage = 1
            this.init()
        },
        reset() {
            this.page.currPage = 1

            if (this.isLinie) {
                this.searchParams = cloneDeep(linieQueryForm)
                this.searchParams.linieDeptNum = this.userInfo.deptDTO.nameZh
                this.searchParams.buyerName = this.userInfo.nameZh
            } else {
                this.searchParams = {
                     brand:'',
                    cartypeCode:[''],
                    cartype:[''],
                    linieDeptNumList:[''],
                };
            }

            this.init()
        },

        handleSelectionChange(val) {
          this.selectItems = val;
        },
        changeVisible(type,visible){
          this[type] = visible;
          this.singleAssign= [];
        },
        // 获取列表
        async getList(){
            this.loading = true;
            const {query} = this.$route;
            const { requirementAekoId ='',} = query;
            const { page,searchParams,aekoInfo={} } = this;
            const {linieDeptNumList=[],brand,partNum,partNameZh,buyerName} = searchParams;
            let carTypeCodeList=[];
            // 车型和车型项目同一个code参数 单独处理下
            if(aekoInfo && aekoInfo.aekoType ){
                if(aekoInfo.aekoType == 'AeA'){  // 车型
                    carTypeCodeList = searchParams.cartype;
                }else if(aekoInfo.aekoType == 'Aeko'){ // 车型项目
                    carTypeCodeList = searchParams.cartypeCode;
                }
            }

            // 多选为全部时单独处理
            if(carTypeCodeList.length == 1 && carTypeCodeList[0] === ''){
                carTypeCodeList=[];
            }
            
            const data = {
                requirementAekoId, 
                current:page.currPage,
                size:page.pageSize,
                carTypeCodeList,
                brand,
                partNum,
                partNameZh,
                buyerName,
                linieDeptNumList:(linieDeptNumList.length == 1 && searchParams.linieDeptNumList[0] === '') ? [] : linieDeptNumList,
            }
            getPartPage(data).then((res)=>{
                this.loading = false;
                const {code,data} = res;
                if(code == 200){
                    const { records=[],total } = data;
                    records.map((item,index)=>{
                        item.lineIndex = index+1;
                    })
                    this.tableListData =  records;
                    this.page.totalCount = total;
                }else{
                    iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn)
                }
            }).catch((err)=>{
                this.loading = false;
            })
        },
        // 获取搜索框下拉数据
        getSearchList(){
            // 车型项目
            searchCartypeProject().then((res)=>{
                 const {code,data} = res;
                if(code ==200 ){
                    data.map((item)=>{
                        item.desc = item.name;
                    })
                    this.selectOptions.cartypeCode = data;
                    this.selectOptionsCopy.cartypeCode = data;
                }else{
                    iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn);
                }
            })
            //品牌
            searchBrand().then((res)=>{
                const {code,data=[]} = res;
                if(code ==200 && data){
                    data.map((item)=>{
                        item.desc = this.$i18n.locale === "zh" ? item.name : item.nameEn;
                    })
                    this.selectOptions.brand = data;
                    this.selectOptionsCopy.brand = data;
                }else{
                    iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn);
                }
            })

            // LINIE
            searchLinie({tagId:configUser.LINLIE}).then((res)=>{
                const {code,data} = res;
                if(code ==200 ){
                    data.map((item)=>{
                        item.desc = this.$i18n.locale === "zh" ? item.nameZh : item.nameEn;
                        item.code = this.$i18n.locale === "zh" ? item.nameZh : item.nameEn;
                    })
                    this.selectOptions.buyerName = data;
                    this.selectOptionsCopy.buyerName = data;
                }else{
                    iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn);
                }
            })
            // 科室
            searchCommodity().then((res)=>{
                const {code,data} = res;
                if(code ==200 ){
                    data.map((item)=>{
                        item.desc = this.$i18n.locale === "zh" ? item.nameZh : item.nameEn;
                        item.code = item.id;
                    })
                    this.selectOptions.linieDeptNumList = data;
                    this.selectOptionsCopy.linieDeptNumList = data;
                }else{
                    iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn);
                }
            })

            // 车型
            getSearchCartype().then((res)=>{
            const {code,data} = res;
            if(code ==200){
                data.map((item)=>{
                item.desc = item.name;
                item.code = item.name;
                })
                this.selectOptions.cartype = data.filter((item)=>item.name) || [];
                this.selectOptionsCopy.cartype = data.filter((item)=>item.name) || [];
            }else{
                iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn);
            }
            })

        },
        // 删除零件
        deleteParts(){
          const {selectItems} = this;
          if(!selectItems.length){
              iMessage.warn(this.language('createparts.QingXuanZeZhiShaoYiTiaoShuJu','请选择至少一条数据'));
          }else{
            this.$confirm(
            this.language('LK_TIPS_SHIFOUSHANCHUGAILINGJIAN','是否删除该零件？'),
            this.language('LK_AEKO_SHANCHULINGJIAN','删除零件'),
            {
                confirmButtonText: this.language('nominationLanguage.Yes','是'),
                cancelButtonText: this.language('nominationLanguage.No','否'),
            }
            ).then(()=>{
                this.btnLoading.deleteParts = true;
                const aekoPartIdList = selectItems.map((item)=>item.aekoPartId);
                const data = {
                    aekoPartIdList,
                    requirementAekoId: this.aekoInfo.requirementAekoId,
                }
                deletePart(data).then((res)=>{
                    this.btnLoading.deleteParts = false;
                    const {code} = res;
                    if(code == 200){
                        iMessage.success(this.language('LK_CAOZUOCHENGGONG','操作成功'));
                        this.getList();
                    }else{
                        iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn)
                    }
                }).catch((err)=>{
                    this.btnLoading.deleteParts = false;
                })
                console.log('是')
            }).catch(()=>{
                console.log('否') 
            })
          }
        },
        // 分配科室/采购员
        assign(row=null, type){
            console.log(row);
            const {selectItems} = this;

            this.assignType = type

            console.log(selectItems,'selectItemsselectItemsselectItems');

            // 判断是否是单一分派
            if(row){
                this.singleAssign = [row];
                this.assignVisible = true;
            }else{
                if(!selectItems.length){
                    return iMessage.warn(this.language('createparts.QingXuanZeZhiShaoYiTiaoShuJu','请选择至少一条数据'));
                }else{
                    // 判断是否是单一分派
                    if(selectItems.length == 1){
                        // 判断所选项是否已分派
                        if(type == 'commodity'){  // 科室分派
                            const arr = selectItems.filter((item)=>item.linieDeptNum);
                            if(arr.length){
                                const tips = arr[0].lineIndex + this.language('LK_AEKO_HANGYIFENPAIKESHIWUFAJINXINGCHONGXINFENPAI','行已分派科室，无法进行重新分派')
                                return iMessage.warn(tips);
                            }else{
                                this.assignVisible = true;
                            }
                        }else{ // 采购员分派 
                            const arr = selectItems.filter((item)=>item.isOperate);
                            if(arr.length){
                                const tips = arr[0].lineIndex + this.language('LK_AEKO_HANGLINGJIANYIBIAOTAILINIEWUFAXIUGAI','行零件已表态,linie无法修改');
                                return iMessage.warn(tips);
                            }else{
                                this.assignVisible = true;
                            } 
                        }
                        this.singleAssign = selectItems;
                    }else{ // 批量分派
                        if(type == 'commodity'){  // 科室分派
                            const arr = selectItems.filter((item)=>item.linieDeptNum);
                            if(arr.length){
                                const arrIndex = arr.map((item)=>item.lineIndex);
                                const tips = arrIndex.toString() + this.language('LK_AEKO_HANGYIFENPAIKESHIWUFAJINXINGCHONGXINFENPAI','行已分派科室，无法进行重新分派');
                                iMessage.warn(tips);
                            }else{
                                this.assignVisible = true;
                            }
                        }else{ // 采购员分派
                            const arr = selectItems.filter((item)=>item.isOperate);
                            if(arr.length){
                                const arrIndex = arr.map((item)=>item.lineIndex);
                                const tips = arrIndex.toString() + this.language('LK_AEKO_HANGYIFENPAICAIGOUYUANQINGQUERENSHIFOUCHONGXINFENPAI','行已分派采购员，请确认是否重新分派');
                                iMessage.warn(tips);
                            }else{
                                this.assignVisible = true;
                            }
                        }

                    }
                    
                }
            }
        },
        init() {
            if (this.isLinie) this.getAekoContentPart()
            else this.getList()
        },
        // linie 获取列表
        getAekoContentPart() {
            this.loading = true

            getAekoContentPart({
                ...this.searchParams,
                cartypeCode: Array.isArray(this.searchParams.cartypeCode) ? (this.searchParams.cartypeCode.length === 1 && this.searchParams.cartypeCode[0] === "" ? null : this.searchParams.cartypeCode) : null,
                requirementAekoId: this.aekoInfo.requirementAekoId,
                buyerName: undefined,
                linieDeptNum: undefined,
                current: this.page.currPage,
                size: this.page.pageSize
            })
            .then(res => {
                if (res.code == 200) {
                    const records =  Array.isArray(res.data) ? res.data : [];
                    records.map((item,index)=>{
                        item.lineIndex = index+1;
                    })
                    this.tableListData = records;
                    this.page.totalCount = res.total || 0
                } else {
                    iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn)
                }

                this.loading = false
            })
            .catch(() => this.loading = false)
        },
        // 多选处理
        handleMultipleChange(value, key,multiple) {
            // 单选不处理
            if(!multiple) return;

            if (!value[value.length - 1]) {
                this.$set(this.searchParams, key, [""])
            } else {
                this.$set(this.searchParams, key, this.searchParams[key].filter(item => item || item === 0))
            }
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

        // 科室退回
        async back(){
            const isNext  = await this.isSelectItem(true);
            if(isNext) this.changeVisible('departBackVisible',true);
        },

        // 是否展示linie
        isShowLine(row){
            const {buyerName,refferenceByuerName,refferenceSmtNum,linieDeptNum} = row;
            // 若已分派采购员就直接展示
            if(buyerName){
                return buyerName
            }else{
                // 若没有分派采购员 已分派科室与实际分派科室不一致时不展示linie
            if(linieDeptNum && (linieDeptNum != refferenceSmtNum)){
                return ''
            }else{
                return refferenceByuerName
            }
            }
            
            
        },


      // 模糊搜索处理
      dataFilter(val,props){
        // 去除前后空格
        const trimVal = val.trim();
        const { selectOptionsCopy={}} = this;
        if(trimVal){
            // 人名要特殊处理 --- 可搜索英文去除大小写
          if(props == 'buyerName'){
            const list = selectOptionsCopy[props].filter((item) => {
              if (!!~item.nameZh.indexOf(trimVal) || (item.nameEn && !!~item.nameEn.toUpperCase().indexOf(trimVal.toUpperCase()))) {
                return true
              }
            })
            this.selectOptions[props] = list;
          }else{
            const list = selectOptionsCopy[props].filter((item) => {
              if(~item.desc.indexOf(trimVal) || !!~item.desc.toUpperCase().indexOf(trimVal.toUpperCase())){
                  return true;
              } 
            })
             this.selectOptions[props] = list;
          }
        }else{
          this.selectOptions[props] = selectOptionsCopy[props];
        }
      }
    }
}
</script>

<style lang="scss" scoped>
    .aeko-partsList{
        .search-form{
            ::v-deep .el-date-editor .el-range__close-icon{
                display: block;
                width: 10px;
            }
        }
        .table-tips{
            color: #747F9D;
            margin-top: 10px;
        }
        .isPreset{
            color: rgba($color: #5C6577, $alpha: .5);
        }
        .multipleSelect {
            ::v-deep .el-tag {
                position: relative;

                &:last-of-type {
                    padding-right: 5px;
                }

                &:first-of-type {
                    padding-right: 10px;
                }

                .el-select__tags-text {
                    display: inline-block;
                    max-width: 80px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }

                .el-tag__close {
                    top: -25%;
                }
            }
            ::v-deep .el-input__inner{
                height: 35px !important;
            }
        }
    }
</style>