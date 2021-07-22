<!--
 * @version: 1.0
 * @Author: zbin
 * @Date: 2021-06-22 13:30:56
 * @LastEditors: zbin
 * @Descripttion: your project
-->
<template>
  <!--深入评级-->
  <iDialog :title="$t('TPZS.JRZXFXGJ')" :visible.sync="value" width="381px" @close="clearDiolog">
    <el-form>
      <el-form-item :label="$t('partsignLanguage.QingShuRu')">
        <iSelect :multiple="false" remote reserve-keyword :remote-method="handleKeyword" :loading="keyLoading" filterable :placeholder="$t('TPZS.CLZRFQLJH')" v-model="form.keyword">
          <el-option v-for="(item,index) in formGroup.keywordList" :key="index" :label="item.categoryCode+'|'+item.categoryName+'|'+item.id+'|'+item.rfqName+'|'+item.partNum" :value="item.id">
          </el-option>
        </iSelect>
        <div class="icon-search">
          <icon name='iconshaixuankuangsousuo' symbol></icon>
        </div>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <iButton @click="handleSubmit">{{ $t('LK_QUEREN') }}</iButton>
    </div>
  </iDialog>
</template>

<script>
import { iDialog, iSelect, iButton, iInput, icon } from 'rise';
import { pageRfqBaseInfo } from "@/api/partsrfq/specialAnalysisTool/specialAnalysisTool.js";

export default {
  components: {
    iDialog,
    iSelect,
    iButton,
    iInput, icon
  },
  props: {
    value: { type: Boolean },
    loading: { type: Boolean, default: false },
  },
  data() {
    return {
      keyLoading: false,
      form: {
        keyword: ''
      },
      formGroup: {
        keywordList: []
      }
    };
  },
  created() {
  },
  methods: {
    async handleKeyword(val) {
      const pms = {
        keyword: val
      }
      this.keyLoading = true
      try {
        const res = await pageRfqBaseInfo(pms)
        if (res.result) {
          this.formGroup.keywordList = res.data
        }
        this.keyLoading = false
      } catch (error) {
        this.formGroup.keywordList = []
        this.keyLoading = false
      }
    },
    clearDiolog() {
      this.$emit('input', false);
    },
    handleSubmit() {
      this.$emit('getDataList', this.form.keyword)
    }
  },
  watch: {
    value() {
      this.form = {};
    },
  },
};
</script>

<style scoped lang="scss">
.icon-search {
  position: absolute;
  height: 100%;
  right: 1rem;
  top: 40px;
  font-size: 20px;
  text-align: center;
  color: #aaaaaa;
  -webkit-transition: all 0.3s;
  transition: all 0.3s;
  cursor: pointer;
}
</style>
