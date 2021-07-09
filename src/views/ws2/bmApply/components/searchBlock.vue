<template>
  <iSearch
    class="search-block"
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
            :placeholder="$t('LK_ALL')"
            v-model="form['tmCartypeProId']"
            filterable
            clearable
        >
          <el-option
              :value="item.tmCartypeProId"
              :label="item.tmCartypeProName"
              v-for="(item, index) in fromGroup"
              :key="index"
          ></el-option>
        </iSelect>
      </el-form-item>

      <!-- BM单状态 -->
      <el-form-item :label="$t('LK_BMDANZHUANGTAI')">
        <iSelect
            :placeholder="$t('LK_ALL')"
            v-model="form['bmStatus']"
            filterable
            clearable
        >
          <el-option
              :value="item.bmStatus"
              :label="item.bmStatusName"
              v-for="(item, index) in bmStatusList"
              :key="index"
          ></el-option>
        </iSelect>
      </el-form-item>

      <!-- Aeko类型 -->
      <el-form-item :label="$t('LK_AEKOLEIXING')">
        <iSelect
            :placeholder="$t('LK_ALL')"
            v-model="form['akeoType']"
            filterable
            clearable
        >
          <el-option
              :value="item.akeoType"
              :label="item.akeoTypeName"
              v-for="(item, index) in aekoTypeList"
              :key="index"
          ></el-option>
        </iSelect>
      </el-form-item>

      <!-- 专业科室 -->
      <el-form-item :label="$t('LK_ZHUANYEKESHI')">
        <iSelect
            :placeholder="$t('LK_ALL')"
            v-model="form['deptId']"
            filterable
            clearable
        >
          <el-option
              :value="item.deptId"
              :label="item.deptName"
              v-for="(item, index) in departmentList"
              :key="index"
          ></el-option>
        </iSelect>
      </el-form-item>

      <!-- 零件号 -->
      <el-form-item :label="$t('LK_SPAREPARTSNUMBER')">
        <iInput :placeholder="$t('LK_QINGSHURU')" v-model="form['behalfPartsNum']" ></iInput>
      </el-form-item>

       <!-- 申请日期起止 -->
      <!-- <el-form-item :label="$t('LK_APPLYDATESTARTANDEND')">
        <el-date-picker
          class="budgetApprovalDate"
          @change="dateChange"
          type="daterange"
          v-model="pickerDate"
          range-separator="至"
          start-placeholder="YYYY-MM-DD"
          end-placeholder="YYYY-MM-DD">
        </el-date-picker>
      </el-form-item> -->

      <!-- 开始时间 -->
      <el-form-item :label="$t('LK_SHENQINGSHIJIANQI')">
        <el-date-picker
          v-model="form['startDate']"
          type="date"
          placeholder="YYYY-MM-DD">
        </el-date-picker>
      </el-form-item>

      <!-- 结束时间 -->
      <el-form-item :label="$t('LK_SHENQINGSHIJIANZHI')">
        <el-date-picker
          v-model="form['endDate']"
          type="date"
          placeholder="YYYY-MM-DD">
        </el-date-picker>
      </el-form-item>


      <!-- Linie -->
      <el-form-item label="Linie">
        <iSelect
            :placeholder="$t('LK_QINGXUANZE')"
            v-model="form['linieId']"
            filterable
            clearable
        >
          <el-option
              :value="item.linieId"
              :label="item.linieName"
              v-for="(item, index) in linieList"
              :key="index"
          ></el-option>
        </iSelect>
      </el-form-item>

      <!-- BM单号 -->
      <el-form-item :label="$t('LK_BMDANHAO')">
        <iInput :placeholder="$t('LK_QINGSHURU')" v-model="form['bmNum']" ></iInput>
      </el-form-item>
    </el-form>
  </iSearch>
</template>

<script>
import { bmApplyForm } from "./data";
import { deptPullDown, bmCarTypePullDown, liniePullDown, bmAekoTypePullDown, bmStatusPullDown } from "@/api/ws2/bmApply";
import {
  iSearch,
  iMessage,
  iSelect,
  iInput,
  iButton
} from "rise";
import Moment from 'moment';
import _ from 'lodash';

export default {
  components: {
    iSearch, iSelect, iInput
  },
  data(){
    return {
      loadingiSearch: false,
      fromGroup: [],  //  车型项目
      bmStatusList: [], //  bm单状态
      aekoTypeList: [], //  aeko类型
      departmentList: [], //  专业科室
      linieList: [],  //  linie
      form: _.cloneDeep(bmApplyForm), 
      pickerDate: '',
    }
  },

  created(){

    this.getSerchData();
    
  },

  methods: {

    getSerchData(){
      this.loadingiSearch = true;

      //  车型项目、专业科室、linle、Aeko类型、BM单状态
      Promise.all([bmCarTypePullDown(), deptPullDown(), liniePullDown(), bmAekoTypePullDown(), bmStatusPullDown()]).then(res => {
        const result0 = this.$i18n.locale === 'zh' ? res[0].desZh : res[0].desEn;
        const result1 = this.$i18n.locale === 'zh' ? res[1].desZh : res[1].desEn;
        const result2 = this.$i18n.locale === 'zh' ? res[2].desZh : res[2].desEn;
        const result3 = this.$i18n.locale === 'zh' ? res[3].desZh : res[3].desEn;
        const result4 = this.$i18n.locale === 'zh' ? res[4].desZh : res[4].desEn;

        if(res[0].data){
          this.fromGroup = res[0].data;
          this.fromGroup.unshift({tmCartypeProId: '', tmCartypeProName: '全部'});
        }else{
          iMessage.error(result0);
        }

        if(res[1].data){
          this.departmentList = res[1].data;
          this.departmentList.unshift({deptId: '', deptName: '全部'})
        }else{
          iMessage.error(result1);
        }

        if(res[2].data){
          this.linieList = res[2].data;
        }else{
          iMessage.error(result2);
        }

        if(res[3].data){
          this.aekoTypeList = res[3].data;
          this.aekoTypeList.unshift({akeoType: '', akeoTypeName: '全部'})
        }else{
          iMessage.error(result3);
        }

        if(res[4].data){
          this.bmStatusList = res[4].data;
          this.bmStatusList.unshift({bmStatus: '', bmStatusName: '全部'})
        }else{
          iMessage.error(result4);
        }

        this.loadingiSearch = false;
      }).catch(err => {
        this.loadingiSearch = false;
      })
    },

    // dateChange(date){
    //   this.form['startDate'] = date ? Moment(date[0]).format('YYYY-MM-DD') : '';
    //   this.form['endDate'] = date ? Moment(date[1]).format('YYYY-MM-DD') : '';
    // },

    sure(){
      this.$emit('sure', this.form);
    },

    reset(){
      this.form = _.cloneDeep(bmApplyForm);
      this.$emit('sure', bmApplyForm);
    },
  }
}
</script>

<style lang="scss" scoped>
.budgetApprovalDate::v-deep.el-range-editor.el-input__inner {
  width: 489px;

  .el-range-input {
    width: 50%;
  }
}
.search-block{
  margin-bottom: 20px;

  // & .el-form-item:nth-last-child(3){
  //   width: 30.6rem !important;
  // }

  ::v-deep .el-range-separator{
    width: 20px !important;
  }
}
</style>