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
        >
          <el-option
              :value="item.id"
              :label="item.cartypeNname"
              v-for="(item, index) in fromGroup"
              :key="index"
          ></el-option>
        </iSelect>
      </el-form-item>

      <!-- BM单状态 -->
      <el-form-item :label="$t('LK_BMDANZHUANGTAI')">
        <iSelect
            :placeholder="$t('LK_ALL')"
            v-model="form['tmCartypeProId']"
            filterable
        >
          <el-option
              :value="item.id"
              :label="item.cartypeNname"
              v-for="(item, index) in bmStatusList"
              :key="index"
          ></el-option>
        </iSelect>
      </el-form-item>

      <!-- Aeko类型 -->
      <el-form-item :label="$t('LK_AEKOLEIXING')">
        <iSelect
            :placeholder="$t('LK_ALL')"
            v-model="form['tmCartypeProId']"
            filterable
        >
          <el-option
              :value="item.id"
              :label="item.cartypeNname"
              v-for="(item, index) in aekoTypeList"
              :key="index"
          ></el-option>
        </iSelect>
      </el-form-item>

      <!-- 专业科室 -->
      <el-form-item :label="$t('LK_ZHUANYEKESHI')">
        <iSelect
            :placeholder="$t('LK_ALL')"
            v-model="form['tmCartypeProId']"
            filterable
        >
          <el-option
              :value="item.id"
              :label="item.cartypeNname"
              v-for="(item, index) in departmentList"
              :key="index"
          ></el-option>
        </iSelect>
      </el-form-item>

      <!-- 零件号 -->
      <el-form-item :label="$t('LK_SPAREPARTSNUMBER')">
        <iInput :placeholder="$t('LK_QINGSHURU')" v-model="form['tmCartypeProId']" ></iInput>
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

      <!-- Linie -->
      <el-form-item label="Linie">
        <iSelect
            :placeholder="$t('LK_ALL')"
            v-model="form['tmCartypeProId']"
            filterable
        >
          <el-option
              :value="item.id"
              :label="item.cartypeNname"
              v-for="(item, index) in linieList"
              :key="index"
          ></el-option>
        </iSelect>
      </el-form-item>
    </el-form>
  </iSearch>
</template>

<script>
import { bmApplyForm } from "./data";
import {
  iSearch,
  iMessage,
  iSelect,
  iInput,
  iButton
} from "rise";
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
      form: bmApplyForm,
    }
  },

  methods: {
    sure(){

    },

    reset(){

    },
  }
}
</script>

<style lang="scss" scoped>
.search-block{
  margin-bottom: 20px;

  ::v-deep .el-form-item {
    width: auto !important;
  }

  ::v-deep .el-range-separator{
    width: 20px !important;
  }
}
</style>