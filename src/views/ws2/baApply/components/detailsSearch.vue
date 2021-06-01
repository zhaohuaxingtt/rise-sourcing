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
          <iSelect
              :placeholder="$t('partsprocure.CHOOSE')"
              v-model="form['tmCartypeProId']"
              filterable
              @change="changeCarTypeProject"
              ref="carTypeProjectRef"
          >
            <!-- <div class="addCarTypeProject">
              <iInput v-model="addCarTypeProject" placeholder="请输入自定义名称"></iInput>
              <iButton @click="handleAddCarTypeProject" v-loading="iDialogAddCarTypeProject">{{ $t('LK_QUEREN') }}</iButton>
            </div> -->
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
    iButton,
    iSearch,
    iInput,
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
    this.getComponentsData();
    this.isModelItem && this.getCartypePulldown();  //  获取车型项目
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

    //  获取车型项目
    async getCartypePulldown(){
      const res = await getCartypePulldown();
      const result0 = this.$i18n.locale === 'zh' ? res.desZh : res.desEn;

        if(res.data){
          this.fromGroup = res.data;
          this.form['tmCartypeProId'] = this.$route.params.id;
        }else{
          iMessage.error(result0);
        }

        this.loadingiSearch = false;
    },

    getComponentsData(){
      this.loadingiSearch = true;
      //  采购工厂列表、模具预算状态
      Promise.all([getPurchaseFactoryPullDown(), getBudgetStatusPullDown(), getBaAccountType()]).then(res => {
        const result0 = this.$i18n.locale === 'zh' ? res[0].desZh : res[0].desEn;
        const result1 = this.$i18n.locale === 'zh' ? res[1].desZh : res[1].desEn;
        const result2 = this.$i18n.locale === 'zh' ? res[2].desZh : res[2].desEn;
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
        this.loadingiSearch = false;
      }).catch(err => {
        this.loadingiSearch = false;
      })
    },

    // handleAddCarTypeProject(){
    //   if (!this.addCarTypeProject) {
    //     return iMessage.warn('请先输入车型名称');
    //   }
    //   if (this.fromGroup.some(item => item.cartypeNname == ('自定义-' + this.addCarTypeProject))){
    //     return iMessage.warn('已有车型名称，请重新输入');
    //   }

    //   this.iDialogAddCarTypeProject = true;
    //   saveCustomCart({cartypeProjectName: this.addCarTypeProject}).then(res => {
    //     const result = this.$i18n.locale === 'zh' ? res.desZh : res.desEn;
    //     if (~~res.code === 0){
    //       iMessage.success(result);
    //       this.addCarTypeProject = '';
    //       this.$refs.carTypeProjectRef.blur();
    //     }else{
    //       iMessage.error(result);
    //     }
    //     this.iDialogAddCarTypeProject = false;
    //   }).catch(err => {
    //     this.iDialogAddCarTypeProject = false;
    //   })
    // },

    changeCarTypeProject(){
      this.$emit('sure', this.form);
    }
  }
}
</script>

<style lang="scss" scoped>
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