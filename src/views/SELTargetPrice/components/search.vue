<template>
  <iSearch v-on="$listeners">
    <iFormGroup>
      <iFormItem v-for="item in searchFormData" :key="item.prop" :label="language(item.labelKey, item.label)">
        <i-select
          v-if="item.type == 'select'"
          v-model="searchForm[item.prop]"
          :placeholder="language('QINGXUANZESHURU', '请选择/输入')"
          collapse-tags
          :multiple="item.multiple || false"
          :filterable="item.filterable"
          :clearable="item.clearable"
        >
          <el-option
            :label="language('all', '全部')"
            :value="''"
            v-if="item.showAll"
          ></el-option>
          <el-option
            v-for="child in options[item.selectOption]"
            :key="child.code"
            :value="child.code"
            :label="$getLabel(child.name, child.nameEn)"
          ></el-option>
        </i-select>
        <i-date-picker
          v-else-if="item.type == 'dateRange'"
          v-model="searchForm[item.prop]"
          value-format=""
          type="daterange"
          :default-time="['00:00:00', '23:59:59']"
        ></i-date-picker>

        <iMultiLineInput
          v-else-if="item.type === 'multiLineInput'"
          v-model="searchForm[item.prop]"
          :title="language(item.labelKey, item.label)"
        />
        <iInput
          v-else
          v-model="searchForm[item.prop]"
          :placeholder="language('QINGSHURU', '请输入')"
        ></iInput>
      </iFormItem>
    </iFormGroup>
  </iSearch>
</template>

<script>
import {
  iSelect,
  iDatePicker,
  iInput,
  iSearch,
  iFormGroup,
  iFormItem,
  iMultiLineInput,
} from "rise";
export default {
  components: {
    iSelect,
    iDatePicker,
    iInput,
    iSearch,
    iFormGroup,
    iFormItem,
    iMultiLineInput,
  },
  props: {
    searchFormData: {
      type: Array,
      default: () => []
    },
    searchForm: {
      type: Object,
      default: () => ({})
    },
    options: {
      type: Object,
      default: () => ({})
    }
  }
};
</script>

<style lang="scss" scoped>
::v-deep .el-form-item {
  flex-direction: column;
}
</style>