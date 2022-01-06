<!--
 * @Author: wentliao
 * @Date: 2021-12-30 14:28:32
 * @Description: 质量评分规则
-->
<template>
  <iPage class="qualityscorerules">
      <div class="header clearFloat">
        <iNavMvp :list="list" :lang="true" :lev="1" routerPage></iNavMvp>
        <div class="control">
            <!-- <iLoger
            :config="{
                module_obj_ae: '评分部门', 
                menuName_obj_ae: ''
            }"
            isPage
            credentials
            class="margin-left20"/> -->
            <span class="margin-left20">
            <icon symbol name="icondatabaseweixuanzhong" class="font24"></icon>
            </span>
        </div>
      </div>
    <iSearch
      class="margin-top25"
      icon
      @sure="sure"
      @reset="reset"
      :resetKey="PARTSIGN_RESETBUTTON"
      :searchKey="PARTSIGN_CONFIRMBUTTON"
    >
        <el-form>
            <el-form-item :label="language('QUALITYSCORERULES_PINGFENGU', '评分股')" >
                <iInput v-model="searchForm.deptNum" :placeholder="language('LK_QINGSHURU','请输入')"/>
            </el-form-item>
            <el-form-item :label="language('UALITYSCORERULES_PINGFENREN', '评分人')">
                <iInput v-model="searchForm.userName" :placeholder="language('LK_QINGSHURU','请输入')"/>
            </el-form-item>
        </el-form>
    </iSearch>
    <iCard class="margin-top20">
        <template v-slot:header-control>
            <iButton @click="changeVisible('addRulesDialogVisible',true)">{{language("TIANJIA", "添加")}}</iButton>
            <iButton>{{ language('SHANCHU', '删除') }}</iButton>
        </template>
        <tableList
          class="table"
          index
          :lang="true"
          :tableData="tableListData"
          :tableTitle="tableTitle"
          :tableLoading="loading"
          height="100%"
          @handleSelectionChange="handleSelectionChange"
        ></tableList>
    </iCard>

    <!-- 新增弹窗 -->
    <addRulesDialog :dialogVisible="addRulesDialogVisible" @changeVisible="changeVisible"/>
  </iPage>
</template>

<script>

import {
    iPage,
    iNavMvp,
    icon,
    iSearch,
    iInput,
    iCard,
    iButton,
} from 'rise'
import { TAB } from '../data'
import tableList from "@/views/partsign/editordetail/components/tableList"
import { tableTitle } from "./components/data"
import addRulesDialog from './components/addRulesDialog'
import { getAllMqRules } from "@/api/scoreConfig/qualityscorerules"
export default {
    name:'qualityscorerules',
    components:{
        iPage,
        iNavMvp,
        icon,
        iSearch,
        iInput,
        tableList,
        iCard,
        iButton,
        addRulesDialog,
    },
    data(){
        return{
            list: TAB,
            tableListData:[],
            tableTitle:tableTitle || [],
            addRulesDialogVisible:false,
            searchForm:{
                deptNum:'',
                userName:'',
            }
        }
    },
    created(){
        this.getList();
    },
    methods:{
        changeVisible(type,show){
            this[type] = !!show;
        },
        // 获取列表
        async getList(){
            this.loading = true;
            await getAllMqRules(this.searchForm).then((res)=>{
                this.loading = false;
                if(res.code == '200'){
                    this.tableListData = res.data['ruleNodeList'] || [];
                }else{
                    this.$message.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn)
                }
            }).catch(()=>{
                this.loading = false;
            })
        },
    }
}
</script>

<style lang="scss" scoped>
    .qualityscorerules{
    .header {
        position: relative;
        margin-bottom: 40px;
        .title {
        font-size: 20px;
        font-weight: bold;
        color: #000;
        height: 28px;
        line-height: 28px;
        }

        .control {
        position: absolute;
        top: 50%;
        right: 0;
        // 影响到了日志弹窗，暂时注释掉，后面用其他属性代替
        // transform: translate(0, -50%);
        display: flex;
        align-items: center;
        height: 30px;
        }
    }
    }
</style>