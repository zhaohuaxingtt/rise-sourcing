<!--
 * @Author: wentliao
 * @Date: 2021-07-28 16:51:12
 * @Description: 封面表态---编辑页
-->
<template>
  <iCard class="aeko-editCover">
    <template v-if="!disabled" v-slot:header-control>
      <iButton  :loading="btnLoading" @click="save()">{{language('LK_BAOCUN','保存')}}</iButton>
      <iButton  :loading="btnLoading" v-if="basicInfo.aekoCoverId" @click="save('submit')">{{language('LK_TIJIAO','提交')}}</iButton>
      <iButton  :loading="btnLoading">{{language('LK_AEKO_CHEHUI','撤回')}}</iButton>
      <iButton  :loading="btnLoading" @click="getDetail">{{language('LK_ZHONGZHI','重置')}}</iButton>
    </template>
      <!-- 可编辑头 -->
      <iFormGroup row='4'>
        <iFormItem 
          v-for="(item, index) in basicTitle" :key="index" 
          :required="item.required" :label="language(item.labelKey, item.label)+':'" 
          v-permission.dynamic="item.editPermissionKey" 
        >
          <template v-if="item.editable && isEdit">
            <template v-if="item.type === 'input'">
              <!-- 新⾸批送样周期(周数)处理正整数 -->
              <iInput  v-if="item.props == 'sendCycle'" :disabled="disabled"  @input="handleNumber($event,basicInfo,'sendCycle')" v-model="basicInfo[item.props]"  />
              <iInput v-else :disabled="disabled" v-model="basicInfo[item.props]"  />
            </template>
            <iSelect v-else-if="item.type === 'select'" v-model="basicInfo[item.props]" :disabled="disabled" >
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
        :disabled="disabled"
        v-permission="AEKO_DETAIL_TAB_FENGMIAN_INPUT_TIPS"
      />
      <div class="margin-top50" v-permission="AEKO_DETAIL_TAB_FENGMIAN_TABLE_LINIE_LINE">
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
        <template #materialIncrease="scope">
          <iInput :disabled="disabled" v-model="scope.row['materialIncrease']" @input="handleNumber($event,scope.row,'materialIncrease')" style="width:100px"/>
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
        <template #investmentIncrease="scope">
          <iInput :disabled="disabled" v-model="scope.row['investmentIncrease']" @input="handleNumber($event,scope.row,'investmentIncrease')" style="width:100px" />
        </template>
        <!-- 其他费⽤(不含税) -->
        <template #otherCost="scope">
          <iInput :disabled="disabled" v-model="scope.row['otherCost']" @input="handleNumber($event,scope.row,'otherCost')" style="width:100px"/>
        </template>
        </tableList>
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
  // icon,
  iMessage,
} from 'rise';
import { previewBaicFrom,coverTableTitleCost } from '../../data'
import tableList from "../tableList"
import { pageMixins } from "@/utils/pageMixins";
import {numberProcessor} from '@/utils';
import { cloneDeep } from "lodash"
import {
  getLinieCoverDetail,
  getFsUser,
  coverSave,
  coverSubmit,
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
      // icon,
    },
    props:{
      aekoInfo:{
        type:Object,
        default:()=>{},
      }
    },
    computed:{
      // adeko状态已冻结或者已撤销 禁用操作按钮
      disabled(){
        const { aekoInfo={} } = this;
        return aekoInfo.aekoStatus == 'FROZEN' || aekoInfo.aekoStatus == 'CANCELED';
      },
      
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
            const {fsId='',coverCostsWithCarType=[]} = data;

            const costData = cloneDeep(coverCostsWithCarType);
            costData.map((item)=>{
              item.investmentIncrease = this.fixNumber(item.investmentIncrease,0);
              item.otherCost = this.fixNumber(item.otherCost,0);
              item.materialIncrease = item.materialIncrease || '';
            })
            
            this.basicInfo = {
              ...data,
              coverCostsWithCarType:costData,
              fsName:fsId
            };

            this.tableData = costData;
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
      },
      
      handleNumber(val, row, props) {
        if(props == 'sendCycle'){
           this.$set(row, props, numberProcessor(val, 0));
        }else{
           this.$set(row, props, numberProcessor(val, 2,true));
        }
       
      },
      // 保存或者提交
      async save(type='save'){
        const {basicInfo,selectOptions} = this;
        const {fsList=[]} = selectOptions;
        const fsName = fsList.filter((item)=>item.value == basicInfo.fsName);
        const {query} = this.$route;
        const { requirementAekoId =''} = query;
        // 指定前期采购员参数需要处理一下
        const data = {
          ...basicInfo,
          coverCosts:basicInfo.coverCostsWithCarType || [],
          fsId:basicInfo.fsName,
          fsName:fsName.length ? fsName[0].label : '',
          requirementAekoId,
        }
        this.btnLoading = true;
        if(type == 'submit'){ // 提交
          const validate =  this.validateData(data);
          if(!validate) {
            this.btnLoading = false;
            return;
          }
          await coverSubmit(data).then((res)=>{
              this.btnLoading = false;
              const {code} = res;
              if(code == 200){
                iMessage.success(this.language('LK_CAOZUOCHENGGONG','操作成功'));
                this.$emit('getBbasicInfo');
                this.getDetail();
              }else{
                iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn)
              }

            }).catch((err)=>{
            this.btnLoading = false;
          })
        }else{ // 保存
          await coverSave(data).then((res)=>{
            this.btnLoading = false;
            const {code} = res;
            if(code == 200){
              iMessage.success(this.language('LK_CAOZUOCHENGGONG','操作成功'));
              this.getDetail();
            }else{
              iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn)
            }

          }).catch((err)=>{
            this.btnLoading = false;
          })
        }
      },

      // 提交时校验一下
      validateData(data){
        const { basicTitle } = this;
        let isValidate = true;
        for(let i=0;i<basicTitle.length;i++){
          const basic = basicTitle[i];
          if(basic['required']){
              if((!data[basic['props']] && basic['type']=='input') || (data[basic['props']]==='' && basic['type']=='select')){
                const tips = this.language(basicTitle[i]['labelKey'],basicTitle[i]['label'])+this.language('LK_AEKO_BUNENGWEIKONG','不能为空');
                iMessage.warn(tips);
                isValidate = false;
                break;
              }
          }
        }
        
          // 备注
          if(isValidate && !data.remark){
            const tips = this.language('LK_BEIZHU','备注')+this.language('LK_AEKO_BUNENGWEIKONG','不能为空');
            iMessage.warn(tips);
            isValidate = false;
          }

          // 表格内输入框
          if(isValidate){
            const {coverCostsWithCarType} = data;
            for(let i=0;i<coverCostsWithCarType.length;i++){
              const cost = coverCostsWithCarType[i] || {};
              if(!cost['investmentIncrease'] || !cost['materialIncrease'] ||!cost['otherCost']){
                const tips = this.language('LK_AEKO_BIAODANNEIFEIYONG','表单内费用') + this.language('LK_AEKO_BUNENGWEIKONG','不能为空');
                iMessage.warn(tips);
                isValidate = false;
                break;
              }
            }
          }
          return isValidate;
      },

      // 费用千分位处理
      fixNumber(str,precision=2){
          if(!str) return '';
          var re=/(?=(?!(\b))(\d{3})+$)/g;
          var fixstr =  str.replace(re,",");
          if(precision == 0){ // 若小数点后两位是 .00 去除小数点后两位
              var last = fixstr.substr(fixstr.length-3,3);
              if(last == '.00') fixstr = fixstr.substr(0,fixstr.length-3);
          }
          return fixstr;
      },
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