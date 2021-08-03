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
            <el-form-item v-for="(item,index) in SearchList" :key="'Search_aeko_partsList'+index" :label="language(item.labelKey,item.label)">
                <iSelect v-update v-if="item.type === 'select'" :multiple="item.multiple" v-model="searchParams[item.props]" :placeholder="language('partsprocure.CHOOSE','请选择')">
                <el-option  value="" :label="language('all','全部')"></el-option>
                <el-option
                    v-for="item in selectOptions[item.selectOption] || []"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
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
import { SearchList , tableTitle, linieTableTitle } from './data';
import tableList from "@/views/partsign/editordetail/components/tableList"
import { pageMixins } from "@/utils/pageMixins";
import assignDialog from './components/assignDialog'
import {
    getPartPage,
} from '@/api/aeko/detail/partsList.js'
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
    created() {

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
            searchParams:{},
            selectOptions:{},
            selectItems:[],
            loading:false,
            tableListData:[
                {'a':1,'b':2,'c':3,'d':4,'e':5,'f':6,'g':7,'h':8,'i':9,'j':10,'k':11},
                {'a':1,'b':2,'c':3,'d':4,'e':5,'f':6,'g':7,'h':8,'i':9,'j':10,'k':11},
            ],
            tableTitle: [],
            assignVisible:false,
            singleAssign:[],
            assignType: ""
        }
    },
    methods:{
        reset(){
            this.searchParams = {};
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
            const { page } = this;
            const { requirementAekoId ='',} = query;
            const data = {
                requirementAekoId, 
                current:page.currPage,
                size:page.pageSize
            }
            getPartPage(data).then((res)=>{
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