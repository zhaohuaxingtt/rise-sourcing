<!--
 * @Author: moxuan
 * @LastEditors: Please set LastEditors
 * @Description: TIA总览
-->
<template>
  <iSearch @reset="handleSearchReset" @sure="getTableList" :icon="true">
    <el-form>
      <el-form-item :label="$t(item.nameLanguage)" v-for="item of tableSearch" :key="item.props">
        <iInput
            v-if="item.type === 'input'"
            :placeholder="$t(item.placeholderLanguage)"
            v-model="form[item.props]"
        />
        <iText
            v-else-if="item.type ==='text'"
        >
          {{ form[item.props] }}
        </iText>
      </el-form-item>
    </el-form>
  </iSearch>
</template>

<script>
import {iSearch, iInput, iText} from 'rise';
import {tableSearch} from './data';

export default {
  components: {
    iSearch,
    iInput,
    iText,
  },
  data() {
    return {
      form: {
        a: '',
        b: '',
        c: '',
        d: '',
      },
      tableSearch,
    };
  },
  methods: {
    handleSearchReset() {
      this.form = {};
      this.getTableList();
    },
    getTableList() {
      this.$emit('getTableList', this.form);
    },
  },
};
</script>

<style scoped lang="scss">
::v-deep .el-form-item__label {
  margin-bottom: 16px !important;
}
</style>
