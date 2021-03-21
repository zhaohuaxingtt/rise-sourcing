<!--
 * @Author: moxuan
 * @Date: 2021-03-04 17:24:15
 * @LastEditTime: 2021-03-04 17:24:15
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
-->
<template>
  <iDialog :title="dataInfo.fsGsNum" :visible.sync="value" width="90%" @close='clearDiolog'>
    <div class="changeContent">
<!--      <div class="clearFloat">
        <div class="floatright title-button-box">
          <iButton @click="edit">{{ editStatus ? '保存' : '编辑' }}</iButton>
        </div>
      </div>-->
      <div>
        <div class="form-title">物流标准</div>
        <iFormGroup :row="4" inline icon>
          <iFormItem label="供货方式：" name="test">
            <iInput v-if="editStatus"></iInput>
            <i-text v-else>{{dataInfo.supplyType}}</i-text>
          </iFormItem>
          <iFormItem label="负责人：" name="test">
            <iInput v-if="editStatus"></iInput>
            <i-text v-else>{{dataInfo.direcorId}}</i-text>
          </iFormItem>
        </iFormGroup>
      </div>
      <div>
        <div class="form-title">参考包装</div>
        <iFormGroup :row="4" inline icon>
          <iFormItem label="参考包装长（mm）" name="test">
            <iInput v-if="editStatus"></iInput>
            <i-text v-else>{{dataInfo.referencePackageLength}}</i-text>
          </iFormItem>
          <iFormItem label="参考包装宽（mm）" name="test">
            <iInput v-if="editStatus"></iInput>
            <i-text v-else>{{dataInfo.referencePackageWidth}}</i-text>
          </iFormItem>
          <iFormItem label="参考包装⾼（mm）" name="test">
            <iInput v-if="editStatus"></iInput>
            <i-text v-else>{{dataInfo.referencePackageHeight}}</i-text>
          </iFormItem>
          <iFormItem label="装箱数" name="test">
            <iInput v-if="editStatus"></iInput>
            <i-text v-else>{{dataInfo.packingCount}}</i-text>
          </iFormItem>
        </iFormGroup>
        <iFormGroup :row="4" inline icon>
          <iFormItem label="参考车型" name="test">
            <iInput v-if="editStatus"></iInput>
            <i-text v-else>{{dataInfo.referenceCarType}}</i-text>
          </iFormItem>
          <iFormItem label="参考零件号" name="test">
            <iInput v-if="editStatus"></iInput>
            <i-text v-else>{{dataInfo.referencePartNum}}</i-text>
          </iFormItem>
          <iFormItem label="参考零件名" name="test">
            <iInput v-if="editStatus"></iInput>
            <i-text v-else>{{dataInfo.referencePartName}}</i-text>
          </iFormItem>
          <iFormItem label="参考包装器具类型" name="test">
            <iInput v-if="editStatus"></iInput>
            <i-text v-else>{{dataInfo.referenceAppliancesType}}</i-text>
          </iFormItem>
        </iFormGroup>
        <iFormGroup :row="4" inline icon>
          <iFormItem label="毛重（KG）" name="test">
            <iInput v-if="editStatus"></iInput>
            <i-text v-else>{{dataInfo.grossWeight}}</i-text>
          </iFormItem>
          <iFormItem label="参考包装单价（元）" name="test">
            <iInput v-if="editStatus"></iInput>
            <i-text v-else>{{dataInfo.referencePerPackagePrice}}</i-text>
          </iFormItem>
        </iFormGroup>
      </div>
      <div>
        <div class="form-title">SAIC VOLKSWAGEN库存_⼩时</div>
        <iFormGroup :row="2" inline icon>
          <iFormItem label="SAIC VOLKSWAGEN库存_小时" name="test">
            <iInput v-if="editStatus"></iInput>
            <i-text v-else>{{dataInfo.stockHours}}</i-text>
          </iFormItem>
          <iFormItem label="SAIC VOLKSWAGEN空箱操作_小时" name="test">
            <iInput v-if="editStatus"></iInput>
            <i-text v-else>{{dataInfo.emptycaseHours}}</i-text>
          </iFormItem>
        </iFormGroup>
      </div>
    </div>
  </iDialog>
</template>
<script>
import {iMessage, iDialog, iFormGroup, iFormItem, iInput, iText} from '@/components'


export default {
  components: { iDialog, iFormGroup, iFormItem, iInput, iText},
  props: {
    value: {type: Boolean},
    repeatClick: Boolean,
    dataInfo: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {
      editStatus: false
    }
  },
  methods: {
    sureChangeItems() {
      if (this.selectTableData.length == '') return iMessage.warn('抱歉！您当前还未选择！')
      this.$emit('sure', JSON.parse(this.selectTableData))
    },
    edit() {
      this.editStatus = !this.editStatus
    },
    clearDiolog() {
      this.$emit('input', false)
    }
  }
}
</script>
<style lang='scss' scoped>
.changeContent {
  padding: 0 10px 20px 10px;

  .form-title {
    height: 25px;
    font-size: 18px;
    font-weight: 600;
    line-height: 25px;
    color: #000000;
    margin-bottom: 17px;
  }

  .title-button-box {
    margin-top: -60px;
    margin-right: 30px;
  }
}
</style>

