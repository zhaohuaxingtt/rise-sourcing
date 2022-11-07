<template>
  <div class="generateInvestmentList" v-permission="TOOLING_BUDGET_BUILD">
    <iSearch
        class="margin-bottom20 giSearch"
        style="margin-top: 20px"
        @sure="sure"
        @reset="reset"
        :icon="false"
        :resetKey="PARTSPROCURE_RESET"
        :searchKey="PARTSPROCURE_CONFIRM"
        v-loading="loadingiSearch"
    >
      <el-form>

        <!-- 车型项目 -->
        <el-form-item :label="$t('LK_CHEXINXIANGMU')" v-if="!isShow">
        <!-- <el-form-item :label="$t('LK_CHEXINXIANGMU')"> -->
          <iSelect
              :placeholder="$t('partsprocure.CHOOSE')"
              v-model="form['tmCartypeProId']"
              filterable
              clearable
              @change="changeCarTypeProject"
              ref="carTypeProjectRef"
          >
            <el-option
                :value="item.id"
                :label="item.cartypeNname"
                v-for="(item, index) in fromGroup"
                :key="index"
            ></el-option>
          </iSelect>
        </el-form-item>

        <!-- 模具预算状态 -->
        <el-form-item :label="$t('LK_MOULDBUDGETSTATUS')">
          <iSelect
              :placeholder="$t('partsprocure.CHOOSE')"
              v-model="form['moldStatus']"
              filterable
              ref=""
              clearable
          >
            <el-option
                :value="item.moldStatus"
                :label="item.mouldStatusName"
                v-for="(item, index) in budgetStatus"
                :key="index"
            ></el-option>
          </iSelect>
        </el-form-item>

        <!-- 采购工厂列表 -->
        <el-form-item :label="$t('LK_CAIGOUGONGCHANG')">
          <iSelect
              :placeholder="$t('partsprocure.CHOOSE')"
              v-model="form['locationFactoryId']"
              filterable
              ref=""
              clearable
          >
            <el-option
                :value="item.locationFactoryId"
                :label="item.locationFactoryName"
                v-for="(item, index) in factoryList"
                :key="index"
            ></el-option>
          </iSelect>
        </el-form-item>

        <!-- 申请日期起止 -->
        <el-form-item :label="$t('LK_APPLYDATESTARTANDEND')">
          <el-date-picker
            @change="dateChange"
            type="daterange"
            v-model="pickerDate"
            range-separator="至"
            start-placeholder="YYYY-MM-DD"
            end-placeholder="YYYY-MM-DD">
          </el-date-picker>
        </el-form-item>

        <!-- 专业科室 -->
        <el-form-item :label="$t('LK_ZHUANYEKESHI')">
          <iSelect
              :placeholder="$t('partsprocure.CHOOSE')"
              v-model="form['deptId']"
              filterable
              ref=""
              clearable
          >
            <el-option
                :value="item.deptId"
                :label="item.deptName"
                v-for="(item, index) in deptList"
                :key="index"
            ></el-option>
          </iSelect>
        </el-form-item>

        <!-- 零件号 -->
        <el-form-item :label="$t('LK_SPAREPARTSNUMBER')">
          <!-- <input-custom 
              v-model="form['partNum']"
              style="width:100%"
              :editPlaceholder="language('QINGSHURU','请输入')"
              :placeholder="language('QINGSHURU','请输入')"> </input-custom> -->
          <iInput v-model="form['partNum']"></iInput>
        </el-form-item>

        <!-- 供应商 -->
        <el-form-item :label="$t('GONGYINGSHANG')">
          <iSelect
              :placeholder="$t('partsprocure.CHOOSE')"
              v-model="form['supplierId']"
              filterable
              ref=""
              clearable
          >
            <el-option
                :value="item.supplierId"
                :label="item.supplierName"
                v-for="(item, index) in supperlierList"
                :key="index"
            ></el-option>
          </iSelect>
          <!-- <iInput v-model="form['locationFactoryId']"></iInput> -->
        </el-form-item>

        <!-- 定点来源类型 -->
        <el-form-item :label="$t('定点来源类型')">
          <iSelect
              :placeholder="$t('partsprocure.CHOOSE')"
              v-model="form['sourceType']"
              filterable
              ref=""
              clearable
          >
            <el-option
                :value="item.value"
                :label="item.label"
                v-for="(item, index) in sourceType"
                :key="index"
            ></el-option>
          </iSelect>
        </el-form-item>
        
      </el-form>
    </iSearch>
  </div>
</template>

<script>
import { detailsForm } from "./data";
import inputCustom from '@/components/inputCustom'
import { getCartypePulldown, saveCustomCart } from "@/api/ws2/budgetManagement/edit";
import { 
  getPurchaseFactoryPullDown,
  getBudgetStatusPullDown,
  getBaCarPullDown,
  getDeptList,
  getSupplierList,
} from "@/api/ws2/baApply";
import Moment from 'moment';
import {
  iButton,
  iMessage,
  iSearch,
  iInput,
  iSelect,
} from "rise";
import { cloneDeep } from 'lodash';
import store from '@/store';

export default {
  components: {
    iSearch,
    iSelect,
    iInput,
    inputCustom,
  },
  props: {
  },
  computed: {
    isShow: function(){
      const codes = ['SOURCINGTZGLY', 'KCNTZGLY'];  //  JV和扩产能code
      const roleList = store.state.permission.roleList;
      return roleList.some(item => codes.includes(item));
    },
  },
  data(){
    return {
      loadingiSearch: false,
      form:  cloneDeep(detailsForm),
      addCarTypeProject: '',
      iDialogAddCarTypeProject: false,
      fromGroup: [],
      factoryList:[],
      budgetStatus: [],
      pickerDate: '',
      sourceType:[
        {
          value:1,
          label:"定点"
        },{
          value:2,
          label:"AEKO增值"
        },{
          value:3,
          label:"AEKO减值"
        },
      ],
      deptList:[],
      supperlierList:[],
    }
  },

  created(){
    this.form['tmCartypeProId'] = this.$route.query.id || '';
    this.getComponentsData();
    this.$emit('sure', this.form);
  },

  methods: {

    dateChange(date){
      // this.form['startDate'] = date ? date[0] : '';
      // this.form['endDate'] = date ? date[1] : '';
      this.form['startDate'] = date ? Moment(date[0]).format('YYYY-MM-DD') : '';
      this.form['endDate'] = date ? Moment(date[1]).format('YYYY-MM-DD') : '';
    },

    reset(){
      for(let item in this.form){
        this.form[item] = '';
      }
      this.pickerDate = '';
      this.$emit('sure', this.form);
    },

    //  查询
    sure(){
      this.$emit('sure', this.form);
    },

    getComponentsData(){
      this.loadingiSearch = true;
      //  采购工厂列表、模具预算状态、AccountType、车型项目
      Promise.all([getPurchaseFactoryPullDown(), getBudgetStatusPullDown(), getBaCarPullDown(),getDeptList(),getSupplierList()]).then(res => {
        const result0 = this.$i18n.locale === 'zh' ? res[0].desZh : res[0].desEn;
        const result1 = this.$i18n.locale === 'zh' ? res[1].desZh : res[1].desEn;
        const result2 = this.$i18n.locale === 'zh' ? res[2].desZh : res[2].desEn;
        const result3 = this.$i18n.locale === 'zh' ? res[2].desZh : res[2].desEn;
        const result4 = this.$i18n.locale === 'zh' ? res[2].desZh : res[2].desEn;
        if(res[0].data){
          this.factoryList = res[0].data;
        }else{
          iMessage.error(result0);
        }

        if(res[1].data){
          this.budgetStatus = res[1].data;
        }else{
          iMessage.error(result1);
        }

        if(res[2].data){
          this.fromGroup = res[2].data;
        }else{
          iMessage.error(result2);
        }

        if(res[3].data){
          this.deptList = res[3].data;
        }else{
          iMessage.error(result3);
        }

        if(res[4].data){
          this.supperlierList = res[4].data;
        }else{
          iMessage.error(result4);
        }
        this.loadingiSearch = false;
      }).catch(err => {
        this.loadingiSearch = false;
      })
    },

    changeCarTypeProject(){
      this.$emit('sure', this.form);
    }
  }
}
</script>

<style lang="scss" scoped>

.el-form{
  display: flex;
  flex-wrap: wrap;
}
.giSearch{

  ::v-deep .el-form-item {
    // width: auto !important;
  }

  ::v-deep .el-range-separator{
    width: 20px !important;
  }
  
  ::v-deep .el-date-editor {
    width:110%;
  }
  // ::v-deep .el-range__close-icon{
  //   display: none;
  // }
}
</style>