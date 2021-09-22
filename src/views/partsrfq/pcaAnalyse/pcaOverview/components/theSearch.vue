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
        <iSelect v-else-if="item.type ==='select'"
                 :multiple="false"
                 remote
                 reserve-keyword
                 :remote-method="handleKeyword"
                 :loading="keyLoading"
                 :placeholder="$t(item.placeholderLanguage)"
                 filterable
                 v-model="form.createBy">
          <el-option v-for="item in formGroup.keywordList" :key="item.id" :label="item.nameZh" :value="item.id">
          </el-option>
        </iSelect>
      </el-form-item>
    </el-form>
  </iSearch>
</template>

<script>
import {iSearch, iInput, iText, iSelect} from 'rise';
import {tableSearch, externalTableSearch} from './data';
import {getSapUserPageList} from '../../../../../api/usercenter'
import _ from 'lodash'

export default {
  components: {
    iSearch,
    iSelect,
    iInput,
    iText,
  },
  data() {
    return {
      form: {
        category: this.$store.state.rfq.materialGroup,
        partNum: this.$store.state.rfq.spareParts,
        rfq: this.$store.state.rfq.rfqId,
        createBy: '',
      },
      keyLoading: false,
      formGroup: {
        keywordList: []
      }
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
      if (this.$route.path.indexOf('externalNegotiationAssistant') > 0) {
        this.form = {
          category: '',
          partNum: '',
          rfq: '',
          createBy: '',
        };
      } else {
        this.form = {
          category: '',
          partNum: '',
          rfq: this.$store.state.rfq.rfqId,
          createBy: '',
        };
      }
      this.getTableList();
    },
    getTableList() {
      const copyForm = _.cloneDeep(this.form)
      copyForm.createBy = copyForm.createBy.toString()
      this.$emit('getTableList', copyForm);
    },
    async handleKeyword(val) {
      const pms = {
        nameZh: val
      }
      this.keyLoading = true
      try {
        const res = await getSapUserPageList(pms)
        if (res.result) {
          this.formGroup.keywordList = res.data
        }
        this.keyLoading = false
      } catch (error) {
        this.formGroup.keywordList = []
        this.keyLoading = false
      }
    },
  },
};
</script>

<style scoped lang="scss">
::v-deep .el-form-item__label {
  margin-bottom: 16px !important;
}
</style>
