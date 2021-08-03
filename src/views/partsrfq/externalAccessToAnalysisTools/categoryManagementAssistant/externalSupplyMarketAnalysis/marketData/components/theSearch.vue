<template>
  <div class="searchBox">
    <div v-for="(item,index) of list" :key="index" class="itemBox">
      <span class="label">{{ language(item.labelLanguageKey, item.label) }}：</span>
      <template v-if="item.type === 'select'">
        <iSelect
            v-model="form[item.props]"
            :placeholder="item.placeholder"
            :multiple="item.multiple"
            collapse-tags
            clearable>
          <el-option :value="item" :label="item" v-for="item of item.options" :key="item"></el-option>
        </iSelect>
      </template>
      <template v-else-if="item.type === 'dateMonth'">
        <iDatePicker
            v-model='form[item.props]'
            value-format='yyyy-MM'
            type="monthrange"
            style="width: 200px"
        ></iDatePicker>
      </template>
      <template v-else-if="item.type === 'input'">
        <iInput v-model="form[item.props]" :placeholder="item.placeholder"/>
      </template>
    </div>
  </div>
</template>

<script>
import {iSelect, iDatePicker, iInput} from 'rise';

export default {
  components: {
    iSelect,
    iDatePicker,
    iInput,
  },
  props: {
    list: {
      type: Array,
      default: () => {
        return [
          {labelLanguageKey: '', label: '类别', type: 'select', props: 'a', placeholderLanguageKey: '', placeholder: ''},
        ];
      },
    },
  },
  data() {
    return {
      form: {},
    };
  }
};
</script>

<style scoped lang="scss">
.searchBox {
  margin-top: 30px;
  margin-bottom: 20px;
  display: flex;
  align-items: center;

  .itemBox {
    display: flex;
    align-items: center;
    margin-right: 20px;

    .label {
      white-space: nowrap;
      font-size: 16px;
      font-weight: 400;
      line-height: 18px;
      color: #000000;
      //letter-spacing: 20px;
    }
  }
}
</style>
