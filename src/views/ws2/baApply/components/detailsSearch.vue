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
        <el-form-item :label="$t('LK_CHEXINXIANGMU')" v-if="isModelItem">
        <!-- <el-form-item :label="$t('LK_CHEXINXIANGMU')"> -->
          <iSelect
              :placeholder="$t('partsprocure.CHOOSE')"
              v-model="form['tmCartypeProId']"
              filterable
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
        
      </el-form>
    </iSearch>
  </div>
</template>

<script>
import { detailsForm } from "./data";
import { getCartypePulldown, saveCustomCart } from "@/api/ws2/budgetManagement/edit";
import { getPurchaseFactoryPullDown, getBudgetStatusPullDown, getBaAccountType } from "@/api/ws2/baApply";
import {
  iButton,
  iMessage,
  iSearch,
  iInput,
  iSelect,
} from "rise";

export default {
  components: {
    iSearch,
    iSelect,
  },
  props: {
    // isModelItem: {type: Boolean}, //  是否显示车型项目
  },
  data(){
    return {
      loadingiSearch: false,
      form: detailsForm,
      addCarTypeProject: '',
      iDialogAddCarTypeProject: false,
      fromGroup: [],
      factoryList: [],
      budgetStatus: [],
      pickerDate: '',
      isModelItem: true,
    }
  },

  created(){
    this.form['tmCartypeProId'] = this.$route.query.id || '';
    this.getComponentsData();
    this.$emit('sure', this.form);
  },

  methods: {

    dateChange(date){
      this.form['startDate'] = date ? date[0] : '';
      this.form['endDate'] = date ? date[1] : '';
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
      Promise.all([getPurchaseFactoryPullDown(), getBudgetStatusPullDown(), getBaAccountType(), getCartypePulldown()]).then(res => {
        const result0 = this.$i18n.locale === 'zh' ? res[0].desZh : res[0].desEn;
        const result1 = this.$i18n.locale === 'zh' ? res[1].desZh : res[1].desEn;
        const result2 = this.$i18n.locale === 'zh' ? res[2].desZh : res[2].desEn;
        const result3 = this.$i18n.locale === 'zh' ? res[3].desZh : res[3].desEn;
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
          this.isModelItem = !res[2].data.baAcountType === 2;
          this.$store.commit('SET_baAcountType', res[2].data.baAcountType || '');
        }else{
          iMessage.error(result2);
        }

        if(res[3].data){
          this.fromGroup = res[3].data;
        }else{
          iMessage.error(result3);
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
.giSearch{

  ::v-deep .el-form-item {
    width: auto !important;
  }

  ::v-deep .el-range-separator{
    width: 20px !important;
  }

}
</style>