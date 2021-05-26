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
            v-model="form['cartypeProjectId']"
            filterable
            @change="changeCarTypeProject"
            ref="carTypeProjectRef"
        >
          <div class="addCarTypeProject">
            <iInput v-model="addCarTypeProject" placeholder="请输入自定义名称"></iInput>
            <iButton @click="handleAddCarTypeProject" v-loading="iDialogAddCarTypeProject">{{ $t('LK_QUEREN') }}</iButton>
          </div>
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
            v-model="form['cartypeProjectId']"
            filterable
            @change="changeCarTypeProject"
            ref="carTypeProjectRef"
        >
          <el-option
              :value="item.id"
              :label="item.cartypeNname"
              v-for="(item, index) in baStatusList"
              :key="index"
          ></el-option>
        </iSelect>
      </el-form-item>

      <!-- BA单号 -->
      <el-form-item :label="$t('LK_BAODDNUMBERS')">
        <iSelect
            :placeholder="$t('LK_ALL')"
            v-model="form['cartypeProjectId']"
            filterable
            @change="changeCarTypeProject"
            ref="carTypeProjectRef"
        >
          <el-option
              :value="item.id"
              :label="item.cartypeNname"
              v-for="(item, index) in baNumbersList"
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

      <!-- 申请人 -->
      <el-form-item :label="$t('LK_SHENQINGREN')">
        <iSelect
            :placeholder="$t('LK_ALL')"
            v-model="form['cartypeProjectId']"
            filterable
            @change="changeCarTypeProject"
            ref="carTypeProjectRef"
        >
          <el-option
              :value="item.id"
              :label="item.cartypeNname"
              v-for="(item, index) in applicantList"
              :key="index"
          ></el-option>
        </iSelect>
      </el-form-item>

      <!-- 采购工厂 -->
      <el-form-item :label="$t('LK_CAIGOUGONGCHANG')">
        <iSelect
            :placeholder="$t('partsprocure.CHOOSE')"
            v-model="form['cartypeProjectId']"
            filterable
            @change="changeCarTypeProject"
            ref="carTypeProjectRef"
        >
          <el-option
              :value="item.id"
              :label="item.cartypeNname"
              v-for="(item, index) in applicantList"
              :key="index"
          ></el-option>
        </iSelect>
      </el-form-item>

      <!-- BA账户类型 -->
      <el-form-item :label="$t('LK_BAACCOUNTTYPE')">
        <iSelect
            :placeholder="$t('partsprocure.CHOOSE')"
            v-model="form['cartypeProjectId']"
            filterable
            @change="changeCarTypeProject"
            ref="carTypeProjectRef"
        >
          <el-option
              :value="item.id"
              :label="item.cartypeNname"
              v-for="(item, index) in applicantList"
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
import { getCartypePulldown, saveCustomCart } from "@/api/ws2/budgetManagement/edit";
import {
  iSearch,
  iMessage,
  iSelect,
  iInput,
  iButton
} from "rise";
export default {
  components: {
    iSearch, iMessage,
    iSelect, iInput, iButton,
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
      pickerDate: '',
    }
  },

  created(){
    this.getPageSearchData();
  },

  methods: {

    dateChange(date){
      this.form['startDate'] = date ? date[0] : '';
      this.form['endDate'] = date ? date[1] : '';
    },

    reset(){

    },

    sure(){

    },

    getPageSearchData(){
      this.loadingiSearch = true;
      Promise.all([getCartypePulldown()]).then(res => {
        const result0 = this.$i18n.locale === 'zh' ? res[0].desZh : res[0].desEn;

        if(res[0].data){
          this.fromGroup = res[0].data;
        }else{
          iMessage.error(result0);
        }

        this.loadingiSearch = false;
      }).catch(err => {
        this.loadingiSearch = false;
      })
    },

    handleAddCarTypeProject(){
      if (!this.addCarTypeProject) {
        return iMessage.warn('请先输入车型名称');
      }
      if (this.fromGroup.some(item => item.cartypeNname == ('自定义-' + this.addCarTypeProject))){
        return iMessage.warn('已有车型名称，请重新输入');
      }

      this.iDialogAddCarTypeProject = true;
      saveCustomCart({cartypeProjectName: this.addCarTypeProject}).then(res => {
        const result = this.$i18n.locale === 'zh' ? res.desZh : res.desEn;
        if (~~res.code === 0){
          iMessage.success(result);
          this.addCarTypeProject = '';
          this.$refs.carTypeProjectRef.blur();
        }else{
          iMessage.error(result);
        }
        this.iDialogAddCarTypeProject = false;
      }).catch(err => {
        this.iDialogAddCarTypeProject = false;
      })

    },

    changeCarTypeProject(){
      
    },
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