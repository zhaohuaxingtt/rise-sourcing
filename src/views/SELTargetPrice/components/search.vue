<template>
  <iSearch>
    <el-form>
      <el-form-item v-for="item in searchData" :key="item.prop">
        <i-select
          v-if="type == 'select'"
          v-model="searchForm[item.prop]"
          collapse-tags
          :multiple="item.multiple"
          :filterable="item.filterable"
          :clearable="item.clearable"
        >
          <el-option
            v-for="child in searchOptions[item.optionProp]"
            :key="child.value"
            :value="child.value"
            :label="$getLabel(child.label, child.labelEn)"
          ></el-option>
        </i-select>
        <i-date-picker v-if="type == 'daterange'"></i-date-picker>
      </el-form-item>
    </el-form>
  </iSearch>
</template>

<script>
import { iSelect, iDatePicker, iInput, iSearch, iMultiLineInput } from "rise";
export default {
  components: {
    iSelect,
    iDatePicker,
    iInput,
    iSearch,
    iMultiLineInput,
  },
};
</script>

<style lang="scss" scoped>
</style>