<template>
  <iFormGroup row="4" inline>
    <iFormItem>
      <!--        供应商-->
      <iLabel :label="$t('TPZS.GONGYINGSHANG')" slot="label"/>
      <iSelect v-model="dataInfo.supplierId" @change="handleSupplierChange" :disabled="disabledSupplier">
        <el-option
            :key="item.supplierId"
            :value="item.supplierId"
            :label="item.supplierName"
            v-for="item of dataInfo.supplierList"
        />
      </iSelect>
    </iFormItem>
    <iFormItem>
      <!--        车型项目-->
      <iLabel :label="$t('TPZS.CHEXINGXIANGMU')" slot="label"/>
      <iText>{{ dataInfo.carTypeProj }}</iText>
    </iFormItem>
    <iFormItem>
      <!--        车型-->
      <iLabel :label="$t('TPZS.CHEXING')" slot="label"/>
      <iText>{{ dataInfo.carType }}</iText>
    </iFormItem>
    <iFormItem>
      <!--        工厂-->
      <iLabel :label="$t('TPZS.GONGCHANG')" slot="label"/>
      <iText>{{ dataInfo.factory }}</iText>
    </iFormItem>
  </iFormGroup>
</template>

<script>
import { iFormGroup, iFormItem, iLabel, iText, iSelect } from 'rise'

export default {
  components: {
    iFormGroup,
    iFormItem,
    iLabel,
    iText,
    iSelect,
  },
  props: {
    dataInfo: {
      type: Object,
      default: () => {
        return {}
      },
    },
    disabledSupplier: {
      type: Boolean,
      default: false,
    },
  },
  data () {
    return {}
  },
  methods: {
    handleSupplierChange (val) {
      this.$emit('handleSupplierChange', val)
    },
  },
}
</script>

<style scoped>

</style>
