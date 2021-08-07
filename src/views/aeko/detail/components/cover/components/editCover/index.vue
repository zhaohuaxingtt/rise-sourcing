<!--
 * @Author: wentliao
 * @Date: 2021-07-28 16:51:12
 * @Description: 封面表态---编辑页
-->
<template>
  <iCard class="aeko-editCover">
    <template v-slot:header-control>
    <iButton>{{language('LK_BAOCUN','保存')}}</iButton>
    <iButton>{{language('LK_TIJIAO','提交')}}</iButton>
    <iButton>{{language('LK_AEKO_CHEHUI','撤回')}}</iButton>
    <iButton :loading="btnLoading" @click="getDetail">{{language('LK_ZHONGZHI','重置')}}</iButton>
    </template>
      <!-- 可编辑头 -->
      <iFormGroup row="4">
        <iFormItem v-for="(item, index) in basicTitle" :key="index" :required="item.required" :label="language(item.labelKey, item.label)+':'" >
          <template v-if="item.editable && isEdit">
            <iInput v-if="item.type === 'input'" v-model="basicInfo[item.props]"  />
            <iSelect v-else-if="item.type === 'select'" v-model="basicInfo[item.props]" >
              <el-option
                :value="item.value"
                :label="item.label"
                v-for="(item) in selectOptions[item.selectOption]"
                :key="item.value"
              ></el-option>
            </iSelect>
          </template>
          <iText v-else>{{basicInfo[item.props]}}</iText>
        </iFormItem>
      </iFormGroup>
      <p class="margin-bottom10 remark-label">{{language('LK_BEIZHU','备注')}}:</p>
      <iInput
        type="textarea"
        rows="10" 
        resize="none"
        v-model="basicInfo.remark"
      />
      <div class="margin-top50">
        <!-- 表格区域 -->
        <tableList
          index
          :lang="true"
          :selection="false"
          :tableData="tableData"
          :tableTitle="tableTitle"
          :tableLoading="tableLoading"
          :headerClass="headerClass"
        >
        <!-- 增加材料成本(RMB/⻋) -->
        <template #materialIncrease="scoped">
          <iInput v-model="scoped.row['materialIncrease']" style="width:100px"/>
          <!-- <el-tooltip placement="top" effect="light">
            <div slot="content">
              <p class="font-weight margin-bottom5" style="text-align:center">100=5*1*1*2+5*1*1*2 +10*2*2*2</p>
              <span style="color:#747F9D">成本变化=Σ 单个零件变化金额 *装车率*每车用量*供应份额</span>
            </div>
            <icon class="margin-left8" symbol name="iconzengjiacailiaochengben_lan"></icon>
          </el-tooltip>

          <icon class="margin-left8" symbol name="iconzengjiacailiaochengben_hui"></icon> -->
            
        </template>
        <!-- 增加投资费⽤(不含税) -->
        <template #investmentIncrease="scoped">
          <iInput v-model="scoped.row['investmentIncrease']" style="width:100px" />
        </template>
        <!-- 其他费⽤(不含税) -->
        <template #otherCost="scoped">
          <iInput v-model="scoped.row['otherCost']" style="width:100px"/>
        </template>
        </tableList>
        <!-- 分页 -->
        <!-- <iPagination
        v-update
        @size-change="handleSizeChange($event, getList)"
        @current-change="handleCurrentChange($event, getList)"
        background
        :current-page="page.currPage"
        :page-sizes="page.pageSizes"
        :page-size="page.pageSize"
        :layout="page.layout"
        :total="page.totalCount"
        /> -->
        <p class="bottom-tips margin-top20">Top-Aeko / Top-MP：|ΔGesamt Materialkosten| ≥35 RMB oder Invest≥10,000,000 RMB; Top-AeA: ΔGesamt Materialkosten ≥35 RMB oder Invest≥10,000,000 RMB</p>
      </div>
      
  </iCard>
</template>

<script>
import {
  iCard,
  iButton,
  iFormGroup,
  iFormItem,
  iInput,
  iSelect,
  iText,
  // iPagination,
  icon,
  iMessage,
} from 'rise';
import { previewBaicFrom,coverTableTitleCost } from '../../data'
import tableList from "../tableList"
import { pageMixins } from "@/utils/pageMixins";
import {
  getLinieCoverDetail,
  getFsUser,
} from '@/api/aeko/detail/cover.js'
export default {
    name:'editCover',
    mixins: [pageMixins],
    components:{
      iCard,
      iButton,
      iFormGroup,
      iFormItem,
      iInput,
      iSelect,
      iText,
      tableList,
      // iPagination,
      icon,
    },
    data(){
      return{
        isEdit:true,
        basicTitle:previewBaicFrom,
        basicInfo:{},
        selectOptions:{
          isReference:[
            {label:'是', value:1},
            {label:'否', value:0},
          ],
          isTop:[
            {label:'是', value:1},
            {label:'否', value:0},
          ],
          isEffectpro:[
            {label:'是', value:1},
            {label:'否', value:0},
          ],
          fsList:[],
        },
        tableData:[],
        tableTitle:coverTableTitleCost,
        tableLoading:false,
        btnLoading:false,

      }
    },
    created(){
      this.getDetail();
      this.getSearchUserList();
    },
    methods:{
      // 获取详情
      async getDetail(){
        this.tableLoading = true;
        const {query} = this.$route;
        const { requirementAekoId =''} = query;
        await getLinieCoverDetail({requirementAekoId}).then((res)=>{
          this.tableLoading = false;
          const { code,data={} } = res;
          if(code == 200){
            const {isTop={},isReference={},coverStatus={},isEffectpro={},fsId='',coverCostsWithCarType=[]} = data;
            this.basicInfo = {
              ...data,
              isTop:isTop.code || '',
              isReference:isReference.code || '',
              isEffectpro:isEffectpro.code || '',
              coverStatus:coverStatus.desc || '-',
              fsName:fsId
            };
            this.tableData = coverCostsWithCarType;
          }else{
              iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn)
          }
        }).catch((err)=>{
          this.tableLoading = false;
        })
      },
      // 获取前期采购员下拉列表
      async getSearchUserList(){
        await getFsUser().then((res)=>{
          const {code,data=[]} = res;
          if(code == 200){
            data.map((item)=>{
              item.label = item.nameZh;
              item.value = item.id;
            });
            this.selectOptions['fsList'] = data;
          }else{
              iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn)
          }
        })
      },
      // 给表头添加*
      headerClass(row){
        const { columnIndex } = row; 
        const list = [2,3,4];
        if(list.includes(columnIndex)){
          return 'label-require'
        }
      }
    }
}
</script>

<style lang="scss" scoped>
.aeko-editCover{
  .remark-label::before{
    content: "*";
    color: #f56c6c;
    margin-right: 4px;
    display: inline-block;
  }
  .bottom-tips{
    color: #8C96A7;
  }
  ::v-deep.el-form-item.is-required:not(.is-no-asterisk)>.el-form-item__label:before {
		content: "*";
    color: #f56c6c;
    margin-right: 4px;
    display: inline-block;
	}
  ::v-deep.el-table table th.label-require div::after{
    content: "*";
    color: #f56c6c;
    margin-right: 4px;
  }
}

</style>