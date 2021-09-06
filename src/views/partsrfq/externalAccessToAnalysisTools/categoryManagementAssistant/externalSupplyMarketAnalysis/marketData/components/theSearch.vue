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
            clearable
            filterable
            :style="{width: item.width ? item.width + 'px' : 'auto'}"
        >
          <el-option :value="item2" :label="item2" v-for="item2 of item.options" :key="item2"></el-option>
        </iSelect>
      </template>
      <template v-else-if="item.type === 'dateMonth'">
        <el-date-picker
            v-model='form[item.props]'
            value-format='yyyy-MM'
            range-separator="~"
            type="monthrange"
            style="width: 200px"
        ></el-date-picker>
      </template>
      <template v-else-if="item.type === 'input'">
        <iInput v-model="form[item.props]" :placeholder="item.placeholder"/>
      </template>
      <template v-else-if="item.type === 'selectCustom'">
        <iSelectCustom
            v-model="form[item.props]"
            :data="item.options"
            :multiple="true"
            label="name"
            sortVal="name"
            value="name"
            :search-method="(value) =>handleSelectSearch(value,item.props)"
            @change="(value) =>handleSelectCustomChange(value,item.props)"
        />
      </template>
      <template v-else-if="item.type === 'selectCascader'">
        <el-cascader
            v-model="form[item.props]"
            :options="item.options"
            :props="item.cascaderProps"
            collapse-tags
            filterable
            clearable
            style="width: 220px"
        />
      </template>
    </div>
  </div>
</template>

<script>
import {iSelect, iInput, iSelectCustom} from 'rise';

export default {
  components: {
    iSelect,
    iInput,
    iSelectCustom
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
      showSelectCustom: true,
    };
  },
  methods: {
    handleSelectSearch(value, props) {
      this.$emit('handleSelectSearch', {value, props});
    },
    handleSelectCustomChange(value, props) {
      this.$emit('handleSelectCustomChange', {value, props});
    },
  },
};
</script>

<style scoped lang="scss">
.el-input {
  width: 100%;
  height: $input-height;

  ::v-deep .el-input__inner {
    @include input_inner;
  }
}

.searchBox {
  margin-top: 30px;
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

::v-deep .el-range-separator {
  line-height: 1.5rem;
}
</style>
