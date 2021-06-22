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
        <iInput :placeholder="$t('TPZS.CLZRFQLJH')" v-model="form.keyword"></iInput>
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
      form: {
        keyword: ''
      },
    };
  },
  created() {
  },
  methods: {
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
