<!--
 * @Author: wentliao
 * @Date: 2021-07-28 10:57:42
 * @Description: 零件清单
-->

<template>
  <div class="aeko-partsList">
    <!-- 搜索区域 -->
    <iSearch @sure="getList" @reset="reset">
        <el-form>
            <!-- AEKO类型为AeA显示车型，为aeko/mp显示车型项目 -->
            <el-form-item
            v-show="!item.showCode || (item.showCode && item.showCode == (aekoInfo.aekoType && aekoInfo.aekoType.code))"
            v-for="(item,index) in SearchList" :key="'Search_aeko_partsList'+index" 
            :label="language(item.labelKey,item.label)"  
            >
                <iSelect v-update v-if="item.type === 'select'" :multiple="item.multiple" :filterable="item.filterable"  v-model="searchParams[item.props]" :placeholder="language('partsprocure.CHOOSE','请选择')">
                <el-option  value="" :label="language('all','全部')"></el-option>
                <el-option
                    v-for="item in selectOptions[item.selectOption] || []"
                    :key="item.code"
                    :label="item.desc"
                    :value="item.code">
                </el-option>  
                </iSelect> 
                <iInput :placeholder="language('LK_QINGSHURU','请输入')" v-else v-model="searchParams[item.props]"></iInput> 
            </el-form-item>
        </el-form>
    </iSearch>
      <iCard :title="language('LK_AEKO_PARTSLIST','零件清单')" class="margin-top20">
        <!-- 按钮区域 -->
        <template v-slot:header-control>
            <iButton @click="assign(null ,'commodity')">{{language('LK_AEKO_FENPAIKESHI','分派科室')}} </iButton>
            <iButton v-if="isCommodityCoordinator" @click="assign(null ,'linie')">{{language('FENPAICAIGOUYUAN','分派采购员')}} </iButton>
            <iButton>{{language('LK_AEKO_XINZENGLINGJIAN','新增零件')}} </iButton>
            <iButton @click="deleteParts">{{language('LK_AEKO_SHANCHULINGJIAN','删除零件')}} </iButton>
            <iButton disabled>{{language('LK_AEKO_KESHITUIHUI','科室退回')}} </iButton>
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
        <!-- 科室 -->
        <template #linieDeptName="scoped">
            <span class="isPreset">{{scoped.row.linieDeptName}}</span>
        </template>
        <!-- linie -->
        <template #buyerName="scoped">
            <span class="isPreset">{{scoped.row.buyerName}}</span>
        </template>
        <!-- 变更类型 -->
        <template #changeType="scoped">
            <span>{{scoped.row.changeType && scoped.row.changeType.desc}}</span>
        </template>
        <!-- 操作 -->
        <template #operate="scoped">
            <span class="link-underline" @click="assign(scoped.row)">{{language('LK_AEKO_FENPAIKESHI','分派科室')}}</span>
        </template>

        </tableList>
        <!-- 提示 -->
        <p class="table-tips">N：Neu 新增； U：Ungueltig 取消； F：Freigabe 供应商认可，沿⽤； A：Aenderung 修改； I：Information 信息； M：Montagetext 安装信息</p>
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
      <!-- 分配科室 -->
      <assignDialog v-if="assignVisible" :assignType="assignType" :dialogVisible="assignVisible" @changeVisible="changeVisible" @getList="getList" :selectItems="selectItems" :singleAssign="singleAssign"/>
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
import { SearchList , tableTitle, linieQueryForm, linieTableTitle } from './data';
import tableList from "@/views/partsign/editordetail/components/tableList"
import { pageMixins } from "@/utils/pageMixins";
import assignDialog from './components/assignDialog'
import { getAekoContentPart } from "@/api/aeko/detail"
import { getCarTypePro } from '@/api/designate/nomination'
import {
    getPartPage,
    deletePart,
} from '@/api/aeko/detail/partsList.js'
import {
    searchBrand,
} from '@/api/aeko/manage'
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
    },
    computed: {
        // eslint-disable-next-line no-undef
        ...Vuex.mapGetters([
            "isAekoManager", // Aeko管理员
            "isCommodityCoordinator", // 科室协调员
            "isLinie", // 专业采购员
        ]),
    },
    props:{
        aekoInfo:{
            type:Object,
            default:()=>{},
        }
    },
   
    created() {
        this.getSearchList();


        if (this.isLinie) {
            this.tableTitle = linieTableTitle
        } else if (this.isCommodityCoordinator) {
            this.tableTitle = tableTitle;
            this.getList();
        } else if (this.isAekoManager) {
            this.tableTitle = tableTitle;
            this.getList();
        } else {
            this.tableTitle = []
        }
    },
    data(){
        return{
            SearchList:SearchList,
            searchParams:{
                brand:'',
            },
            selectOptions:{},
            selectItems:[],
            loading:false,
            tableListData:[ ],
            tableTitle: [],
            assignVisible:false,
            singleAssign:[],
            assignType: ""
        }
    },
    methods:{
        reset(){
            this.searchParams = {
                brand:'',
            };
            this.getList();
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
            const { page,searchParams,aekoInfo={} } = this;
            const { requirementAekoId ='',} = query;
            const {partNum} = searchParams;
            let cartypeCode='';
            // 车型和车型项目同一个code参数 单独处理下
            if(aekoInfo && aekoInfo.aekoType ){
                if(aekoInfo.aekoType.code == 'AeA'){  // 车型
                    cartypeCode = searchParams.cartype;
                }else if(aekoInfo.aekoType.code == 'aeko/mp'){ // 车型项目
                    cartypeCode = searchParams.cartypeCode;
                }
            }
            // 判断零件号查询至少大于等于9位或为空的情况下才允许查询
            if(partNum && partNum.trim().length < 9){
                this.loading = false;
                return iMessage.warn(this.language('LK_AEKO_LINGJIANHAOZHISHAOSHURU9WEI','查询零件号不足,请补充至9位或以上'));
            }
            const data = {
                requirementAekoId, 
                current:page.currPage,
                size:page.pageSize,
                cartypeCode,
            }
            getPartPage({...searchParams,...data}).then((res)=>{
                this.loading = false;
                const {code,data} = res;
                if(code == 200){
                    const { records=[],total } = data;
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
            getCarTypePro().then((res)=>{
                 const {code,data} = res;
                if(code ==200 ){
                    (data.data).map((item)=>{
                    item.desc = item.name;
                    })
                    this.selectOptions.cartypeCode = data.data;
                }else{
                    iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn);
                }
            })
            //品牌
            searchBrand().then((res)=>{
            const {code,data=[]} = res;
            if(code ==200 && data){
                this.selectOptions.brand = data;
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
                // cosnt aekoPartIdArr = selectItems.map((item)=>item.)
                // deletePart().then((res)=>{

                // })
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
            // 判断是否是单一分派

            this.assignType = type

            if(row){
                this.singleAssign = [row];
                this.assignVisible = true;
            }else{
                if(!selectItems.length){
                    iMessage.warn(this.language('createparts.QingXuanZeZhiShaoYiTiaoShuJu','请选择至少一条数据'));
                }else{
                    // 判断是否是单一分派
                    if(selectItems.length == 1){
                        this.singleAssign = selectItems;
                    }
                    this.assignVisible = true;
                }
            }
        },
        // linie 获取列表
        getAekoContentPart() {
            getAekoContentPart({

            })
            .then(res => {
                if (res.code == 200) {
                    this.tableListData = Array.isArray(res.data) ? res.data : []
                    this.page.totalCount = res.total || 0
                } else {
                    iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn)
                }

                this.loading = false
            })
            .catch(() => this.loading = false)
        }
    }
}
</script>

<style lang="scss" scoped>
    .aeko-partsList{
        .table-tips{
            color: #747F9D;
            margin-top: 10px;
        }
        .isPreset{
            color: rgba($color: #5C6577, $alpha: .5);
        }
    }
</style>