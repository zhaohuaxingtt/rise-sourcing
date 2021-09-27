<!--
 * @Author: wentliao
 * @Date: 2021-07-28 16:51:12
 * @Description: 封面表态---编辑页
-->
<template>
  <iCard class="aeko-editCover">
    <template v-if="!disabled" v-slot:header-control>
      <!-- 封面状态为已提交时不展示保存和提交按钮 -->
      <template v-if="!isSubmit">
        <iButton  :loading="btnLoading" @click="save()">{{language('LK_BAOCUN','保存')}}</iButton>
        <!-- 保存之后才能提交以及封面状态是待表态 -->
        <iButton  :loading="btnLoading" v-if="basicInfo.aekoCoverId && basicInfo.coverStatus == 'TOBE_STATED'" @click="save('submit')">{{language('LK_TIJIAO','提交')}}</iButton>
      </template>
      <!-- 封面状态为已提交时可展示 -->
      <iButton disabled  v-if="isSubmit" :loading="btnLoading" @click="cancelCover">
        {{language('LK_AEKO_CHEHUI','撤回')}}
         <el-tooltip 
            :content="`${language('LK_AEKO_COVER_TIPS_FENGMIANBIAOTAIHENEIRONGBIAOTAIJIANGYIBINGCHEHUI','审批前，可对已提交的的单据进行撤回。封面表态和内容表态将被一并撤回。')}`"
            placement="top">
            <i class="el-icon-warning-outline font18 tipsIcon"></i>
          </el-tooltip>
      </iButton>
      <iButton v-if="!isSubmit"  :loading="btnLoading" @click="getDetail">{{language('LK_ZHONGZHI','重置')}}</iButton>
    </template>
      <!-- 可编辑头 -->
      <iFormGroup row='4'>
        <iFormItem 
          v-for="(item, index) in basicTitle" :key="index" 
          :required="item.required" :label="language(item.labelKey, item.label)+':'" 
          v-permission.dynamic.auto="item.editPermissionKey" 
        >
          <template v-if="item.editable && isEdit">
            <template v-if="item.type === 'input'">
              <!-- 新⾸批送样周期(周数)处理正整数 -->
              <iInput  v-if="item.props == 'sendCycle'" :disabled="disabled || isSubmit"  @input="handleNumber($event,basicInfo,'sendCycle')" v-model="basicInfo[item.props]"  />
              <iInput v-else :disabled="disabled || isSubmit" v-model="basicInfo[item.props]"  />
            </template>
            <iSelect v-else-if="item.type === 'select'" v-model="basicInfo[item.props]" :disabled="disabled || isSubmit" >
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
        :disabled="disabled || isSubmit"
        v-permission.auto="AEKO_DETAIL_TAB_FENGMIAN_INPUT_TIPS|封面表态备注框_编辑"
      />
      <div class="margin-top50" v-permission.auto="AEKO_DETAIL_TAB_FENGMIAN_TABLE_LINIE_LINE|封面表态费用表单_编辑">
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
          <div class="table-materialIncrease" style="width:120px">
            <iInput :disabled="disabled || isSubmit" v-model="scope.row['materialIncrease']" @input="handleNumber($event,scope.row,'materialIncrease')" style="width:100px"/>
            <span class="icon-tips" v-if="scope.row.isShowTips">
              <el-tooltip v-if="scope.row['expressionList'].length > 1" placement="top" effect="light" >
                <div slot="content">
                  <p class="font-weight margin-bottom5" style="text-align:center">{{scope.row['expressionList'][0] || ''}}</p>
                  <p class="font16" style="color:#747F9D;text-align:center">{{scope.row['expressionList'][1] || ''}}</p>
                </div>
                <i class="el-icon-warning-outline font18 tipsIcon"></i>
              </el-tooltip>


               <i v-else class="el-icon-warning-outline font18 tipsIcon grey"></i>
            </span>
          </div>
            
        </template>
        <!-- 增加投资费⽤(不含税) -->
        <template #investmentIncrease="scope">
          <iInput :disabled="disabled || isSubmit" v-model="scope.row['investmentIncrease']" @input="handleNumber($event,scope.row,'investmentIncrease')" style="width:100px" />
        </template>
        <!-- 其他费⽤(不含税) -->
        <template #otherCost="scope">
          <iInput :disabled="disabled || isSubmit" v-model="scope.row['otherCost']" @input="handleNumber($event,scope.row,'otherCost')" style="width:100px"/>
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
  coverCancel,
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

      // 封面状态为已提交时不可编辑只可撤销
      isSubmit(){
        const { basicInfo={} } = this;
        return basicInfo.coverStatus == 'SUBMITED';
      }
      
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
              item.investmentIncrease = this.fixNumber(item.investmentIncrease,0) || 0;
              item.otherCost = this.fixNumber(item.otherCost,0) || 0;

              
              item.isShowTips = item.materialIncrease == item.calMaterialIncrease;
              // 提示计算公式的字符串拆分一下
              item.expressionList = item.expression ? item.expression.split('<br/>') : [];

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

      // 撤回
      async cancelCover(){
        const {basicInfo} = this;
        const {aekoCoverId} = basicInfo;
        this.btnLoading = true;
        await coverCancel({aekoCoverId}).then((res)=>{
          this.btnLoading = false;
          if(res.code == 200){
            iMessage.success(this.language('LK_CAOZUOCHENGGONG','操作成功'));
            this.getDetail();
          }else{
            iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn)
          }
        }).catch((err)=>{
          this.btnLoading = false;
        })
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
  .table-materialIncrease{
    position: relative;
    margin: 0 auto;
    .icon-tips{
      position: absolute;
      right: -15px;
      top: 6px;
      .tipsIcon{
         transform: rotate(180deg);
         color: #1660f1;
         &.grey{
           color: grey;
         }
      }
    }

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