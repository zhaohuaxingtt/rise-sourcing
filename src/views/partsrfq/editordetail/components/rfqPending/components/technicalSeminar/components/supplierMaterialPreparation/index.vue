<template>
  <i-card>
    <div class="margin-bottom20 clearFloat">
      <span class="font18 font-weight">供应商材料准备</span>
      <div class="floatright">
        <iButton @click="add">添加</iButton>
      </div>
    </div>
    <iFormGroup :row="3" inline icon class="label-zero">
      <iFormItem label=" " name="test">
        <iInput type="textarea" :rows="4" resize="none" placeholder="请输入"></iInput>
      </iFormItem>
      <iFormItem label=" " name="test">
        <iInput type="textarea" :rows="4" resize="none" placeholder="请输入"></iInput>
      </iFormItem>
      <iFormItem label=" " name="test">
        <iInput type="textarea" :rows="4" resize="none" placeholder="请输入"></iInput>
      </iFormItem>
    </iFormGroup>
  </i-card>
</template>

<script>
import {iCard, iButton, iFormGroup, iFormItem, iInput} from '@/components'

export default {
  components: {
    iCard,
    iButton,
    iFormGroup,
    iFormItem,
    iInput
  },
  methods: {
    add() {
    }
  }
}
</script>

<style  lang="scss">
.label-zero .el-form-item__label{
  width: 0!important;
}
</style>