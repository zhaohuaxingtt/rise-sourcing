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
      @sure="getList"
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
            <iButton @click="deletRule" :loading="btnLoading.deletRule">{{ language('SHANCHU', '删除') }}</iButton>
        </template>
        <div class="body">
            <tableList
            class="table"
            index
            :lang="true"
            :tableData="tableListData"
            :tableTitle="tableTitle"
            :tableLoading="loading"
            height="100%"
            @handleSelectionChange="handleSelectionChange"
            >
            </tableList>
        </div>
        
    </iCard>

    <!-- 新增弹窗 -->
    <addRulesDialog :dialogVisible="addRulesDialogVisible" @changeVisible="changeVisible" @getList="getList" :requestData="requestData"/>
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
import { getAllMqRules,deleteMqRulesByIdList } from "@/api/scoreConfig/qualityscorerules"
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
            },
            requestData:[],
            selectItems:[],
            btnLoading:{
                deletRule:false,
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
                    const tableListData = []
                    res.data.forEach(item => {
                        const Sitem = {
                            ruleName: item.ruleName,
                            ruleId: item.ruleId,
                            ruleDes: item.ruleDes,
                            updateTime:item.updateTime
                        }
                        if (item.ruleNodeList && item.ruleNodeList.length) {
                            item.ruleNodeList.forEach(rule => {
                                Sitem.num = rule.num
                                Sitem.deptName = rule.deptName || (rule.dept && rule.dept.deptName) || ''
                                Sitem.userName = rule.userName || (rule.user && rule.user.userName) || ''
                            })
                        }
                        tableListData.push(Sitem)
                    })
                    this.tableListData = tableListData;
                    this.requestData = res.data || [];
                }else{
                    this.$message.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn)
                }
            }).catch(()=>{
                this.loading = false;
            })
        },

        reset(){
            this.searchForm = {deptNum:'',userName:''};
            this.getList();
        },

        handleSelectionChange(val) {
            this.selectItems = val;
        },

        // 删除
        async deletRule(){
            const {selectItems} = this;
            const tips =  this.language('createparts.QingXuanZeZhiShaoYiTiaoShuJu','请选择至少一条数据');
          if(!selectItems.length){
              this.$message.warning(tips);
              return false;
          }else{
              await this.$confirm(
          this.language('LK_QINGQUERENSHIFOUSHANCHU','请确认是否删除？'),
          this.language('LK_SHANCHU','删除'),
          {
            confirmButtonText: this.language('nominationLanguage.Yes','是'),
            cancelButtonText: this.language('nominationLanguage.No','否'),
          }
          ).then(()=>{
            this.btnLoading.deletRule = true;
            const ids = (selectItems.map((item)=>item.ruleId)).join();
            // deleteMqRulesByIdList({ids}).then((res)=>{
                // this.btnLoading.deletRule = false;
            //   if(res.code ==200){
            //     this.$message.success(this.language('LK_CAOZUOCHENGGONG','操作成功'));
            //     this.getList();
            //   }else{
            //     this.$message.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn);
            //   }
            // })
          }).catch(()=>{
            this.btnLoading.deletRule = false;
          })
          }
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
    .card {
    padding-bottom: 20px;
    .body {
      height: calc(100vh - 445px);
      min-height: 430px;
    }
  }
    }
</style>