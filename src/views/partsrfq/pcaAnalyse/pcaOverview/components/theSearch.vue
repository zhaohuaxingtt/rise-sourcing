<!--
 * @Author: moxuan
 * @LastEditors: Please set LastEditors
 * @Description: PCA总览
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
import {tableSearch, externalTableSearch} from './data';

export default {
  components: {
    iSearch,
    iInput,
    iText,
  },
  data() {
    return {
      form: {
        category: '',
        partNum: '',
        rfq: this.$route.query.id ? this.$route.query.id : '',
        createBy: '',
      },
    };
  },
  computed: {
    tableSearch() {
      if (this.$route.path.indexOf('externalNegotiationAssistant') > 0) {
        return externalTableSearch;
      } else {
        return tableSearch;
      }
    },
  },
  methods: {
    handleSearchReset() {
      this.form = {
        category: '',
        partNum: '',
        rfq: this.$route.query.id ? this.$route.query.id : '',
        createBy: '',
      };
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
