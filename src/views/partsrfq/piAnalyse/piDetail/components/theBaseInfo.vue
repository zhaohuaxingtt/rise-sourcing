<template>
  <iFormGroup row="4" inline>
    <iFormItem v-for="item of baseInfo" :key="item.name">
      <iLabel :label="language(item.key, item.name)" slot="label"/>
      <iText>{{ dataInfo[item.props] }}</iText>
    </iFormItem>
  </iFormGroup>
</template>

<script>
import {iFormGroup, iFormItem, iLabel, iText} from 'rise';
import {baseInfo} from './data';

export default {
  components: {
    iFormGroup,
    iFormItem,
    iLabel,
    iText,
  },
  props: {
    dataInfo: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  data() {
    return {
      baseInfo,
    };
  },
};
</script>

<style scoped>

</style>
