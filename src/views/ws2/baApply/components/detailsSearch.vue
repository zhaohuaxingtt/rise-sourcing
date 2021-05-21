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
        <el-form-item :label="$t('LK_CHEXINXIANGMU')" v-if="isModelItem">
          <iSelect
              :placeholder="$t('partsprocure.CHOOSE')"
              v-model="form['search.cartypeProjectZh']"
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

        <el-form-item :label="$t('LK_MOULDBUDGETSTATUS')">
          <iSelect
              :placeholder="$t('partsprocure.CHOOSE')"
              v-model="form['search.']"
              filterable
              ref=""
          >
            <!-- <el-option
                :value="item.id"
                :label="item.cartypeNname"
                v-for="(item, index) in fromGroup"
                :key="index"
            ></el-option> -->
          </iSelect>
        </el-form-item>

        <el-form-item :label="$t('LK_CAIGOUGONGCHANG')">
          <iSelect
              :placeholder="$t('partsprocure.CHOOSE')"
              v-model="form['search.']"
              filterable
              ref=""
          >
            <!-- <el-option
                :value="item.id"
                :label="item.cartypeNname"
                v-for="(item, index) in fromGroup"
                :key="index"
            ></el-option> -->
          </iSelect>
        </el-form-item>

        <el-form-item :label="$t('LK_APPLYDATESTARTANDEND')">
          <el-date-picker
            v-model="form['search.']"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item>
        
      </el-form>
    </iSearch>
  </div>
</template>

<script>
import { detailsForm } from "./data";
import { getCartypePulldown, saveCustomCart } from "@/api/ws2/budgetManagement/edit";
import {
  iButton,
  iCard,
  iMessage,
  iSearch,
  iInput,
  iSelect,
} from "rise";

export default {
  components: {
    iButton,
    iCard,
    iMessage,
    iSearch,
    iInput,
    iSelect,
  },
  props: {
    isModelItem: {type: Boolean}, //  是否显示车型项目
  },
  data(){
    return {
      loadingiSearch: false,
      form: detailsForm,
      addCarTypeProject: '',
      iDialogAddCarTypeProject: false,
      fromGroup: [],
    }
  },

  created(){
    this.getComponentsData();
    this.isModelItem && this.getCartypePulldown();  //  获取车型项目
  },

  methods: {

    reset(){
      this.$emit('reset', this.form);
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
        }else{
          iMessage.error(result0);
        }

        this.loadingiSearch = false;
    },

    getComponentsData(){

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