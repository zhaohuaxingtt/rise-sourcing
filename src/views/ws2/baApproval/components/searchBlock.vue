<template>
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
      <el-form-item :label="$t('LK_CHEXINXIANGMU')">
        <iSelect
            :placeholder="$t('partsprocure.PLEENTER')"
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

      <!-- BA单状态 -->
      <el-form-item :label="$t('LK_BADANSTATUS')">
        <iSelect
            :placeholder="$t('LK_ALL')"
            v-model="form['baStatus']"
            filterable
            @change="changeCarTypeProject"
            ref="carTypeProjectRef"
        >
          <el-option
              :value="item.baStatusId"
              :label="item.baStatus"
              v-for="(item, index) in baStatusList"
              :key="index"
          ></el-option>
        </iSelect>
      </el-form-item>

      <!-- BA单号 -->
      <el-form-item :label="$t('LK_BAODDNUMBERS')">
        <iInput :placeholder="$t('LK_ALL')" v-model="form['sixBa']" ></iInput>
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

      <!-- 申请人 -->
      <el-form-item :label="$t('LK_SHENQINGREN')">
        <iSelect
            :placeholder="$t('LK_ALL')"
            v-model="form['applyUserId']"
            filterable
            @change="changeCarTypeProject"
            ref="carTypeProjectRef"
        >
          <el-option
              :value="item.applyUserId"
              :label="item.applyUserName"
              v-for="(item, index) in applicantList"
              :key="index"
          ></el-option>
        </iSelect>
      </el-form-item>

      <!-- 采购工厂 -->
      <el-form-item :label="$t('LK_CAIGOUGONGCHANG')">
        <iSelect
            :placeholder="$t('partsprocure.CHOOSE')"
            v-model="form['localFactoryId']"
            filterable
            @change="changeCarTypeProject"
            ref="carTypeProjectRef"
        >
          <el-option
              :value="item.localFactoryId"
              :label="item.localFactoryName"
              v-for="(item, index) in factoryList"
              :key="index"
          ></el-option>
        </iSelect>
      </el-form-item>

      <!-- BA账户类型 -->
      <el-form-item :label="$t('LK_BAACCOUNTTYPE')">
        <iSelect
            :placeholder="$t('partsprocure.CHOOSE')"
            v-model="form['baAccountType']"
            filterable
            @change="changeCarTypeProject"
            ref="carTypeProjectRef"
        >
          <el-option
              :value="item.baAccountId"
              :label="item.baAccountName"
              v-for="(item, index) in accountTypeList"
              :key="index"
          ></el-option>
        </iSelect>
      </el-form-item>
      
    </el-form>
    <div class="searchSure"></div>
  </iSearch>
</template>

<script>
import { allBAApplySearch } from "./data";
import { getBaPullDown, getApplyUserPullDown, getLocalFactoryPullDown } from "@/api/ws2/baApproval";
import { getCartypePulldown, saveCustomCart } from "@/api/ws2/budgetManagement/edit";
import { getBaAccountTypePullDown } from "@/api/ws2/baApply";
import Moment from 'moment';
import {
  iSearch,
  iMessage,
  iSelect,
  iInput,
  iButton
} from "rise";
export default {
  components: {
    iSearch,
    iSelect, iInput, 
  },

  data(){
    return {
      addCarTypeProject: '',
      loadingiSearch: false,
      form: allBAApplySearch,
      fromGroup: [],
      baStatusList: [],
      baNumbersList: [],
      applicantList: [],
      accountTypeList: [],
      factoryList: [],
      pickerDate: '',
    }
  },

  created(){
    this.getPageSearchData();
  },

  methods: {

    dateChange(date){
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

    sure(){
      this.$emit('sure', this.form);
    },

    getPageSearchData(){
      this.loadingiSearch = true;

      //  车型项目、BA状态、申请人、采购工厂、BA账户类型
      Promise.all(
        [getCartypePulldown(),getBaPullDown(),getApplyUserPullDown(),getLocalFactoryPullDown(),getBaAccountTypePullDown()]
      ).then(res => {
        const result0 = this.$i18n.locale === 'zh' ? res[0].desZh : res[0].desEn;
        const result1 = this.$i18n.locale === 'zh' ? res[1].desZh : res[1].desEn;
        const result2 = this.$i18n.locale === 'zh' ? res[2].desZh : res[2].desEn;
        const result3 = this.$i18n.locale === 'zh' ? res[3].desZh : res[3].desEn;
        const result4 = this.$i18n.locale === 'zh' ? res[4].desZh : res[4].desEn;

        if(res[0].data){
          this.fromGroup = res[0].data;
        }else{
          iMessage.error(result0);
        }

        if(res[1].data){
          this.baStatusList = res[1].data;
        }else{
          iMessage.error(result1);
        }

        if(res[2].data){
          this.applicantList = res[2].data;
        }else{
          iMessage.error(result2);
        }

        if(res[3].data){
          this.factoryList = res[3].data;
        }else{
          iMessage.error(result3);
        }

        if(res[4].data){
          this.accountTypeList = res[4].data;
        }else{
          iMessage.error(result4);
        }

        this.loadingiSearch = false;
      }).catch(err => {
        this.loadingiSearch = false;
      })
    },

    changeCarTypeProject(){
      
    },
  }
}
</script>

<style lang="scss" scoped>
.giSearch{

  & .el-form-item:nth-child(4){
    height: 53px !important;
  }

  ::v-deep .el-form-item {
    width: auto !important;
  }

  ::v-deep .el-range-separator{
    width: 20px !important;
  }

}
.addCarTypeProject {
  margin-bottom: 5px;
  padding: 0 10px;

  ::v-deep .el-input {
    width: calc(100% - 110px);
  }

  ::v-deep .el-button {
    width: 100px;
    margin-left: 10px;
  }
}
</style>