<template>
  <iCard tabCard>
    <iFormGroup row="4" inline>
      <iFormItem>
        <iLabel :label="$t('TPZS.GONGYINGSHANG')" slot="label"/>
        <iSelect>
          <el-option :value="1" :label="1"></el-option>
        </iSelect>
      </iFormItem>
      <iFormItem>
        <iLabel :label="$t('TPZS.CHEXINGXIANGMU')" slot="label"/>
        <iText></iText>
      </iFormItem>
      <iFormItem>
        <iLabel :label="$t('TPZS.CHEXING')" slot="label"/>
        <iText></iText>
      </iFormItem>
      <iFormItem>
        <iLabel :label="$t('TPZS.GONGCHANG')" slot="label"/>
        <iText></iText>
      </iFormItem>
    </iFormGroup>
  </iCard>
</template>

<script>
import {iCard, iFormGroup, iFormItem, iLabel, iText, iSelect} from 'rise';

export default {
  components: {
    iCard,
    iFormGroup,
    iFormItem,
    iLabel,
    iText,
    iSelect
  },
  data() {
    return {};
  },
};
</script>

<style scoped>

</style>
