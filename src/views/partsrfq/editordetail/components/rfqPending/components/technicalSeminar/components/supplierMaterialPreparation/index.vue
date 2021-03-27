<template>
  <i-card>
    <div class="margin-bottom20 clearFloat">
      <span class="font18 font-weight">供应商材料准备</span>
      <div class="floatright">
        <iButton @click="add" v-permission="PARTSRFQ_EDITORDETAIL_RFQPENDING_TECHNICALSEMINAR_ADD">添加</iButton>
      </div>
    </div>
    <iFormGroup :row="3" inline icon class="label-zero" v-model="dynamicForm" v-if="showStatus" v-permission="PARTSRFQ_EDITORDETAIL_RFQPENDING_TECHNICALSEMINAR_DESTEXT">
      <template v-for="(item,index) of dynamicForm.baseInfo">
        <iFormItem label=" " :name="index" :key="index">
          <iInput type="textarea" :rows="4" resize="none" placeholder="请输入" v-model="item.value" maxlength="100"  show-word-limit></iInput>
        </iFormItem>
      </template>
    </iFormGroup>
  </i-card>
</template>

<script>
import {iCard, iButton, iFormGroup, iFormItem, iInput, iMessage} from '@/components'

export default {
  components: {
    iCard,
    iButton,
    iFormGroup,
    iFormItem,
    iInput
  },
  data() {
    return {
      showStatus: true,
      dynamicForm: {
        baseInfo: [
          {value: ''},
          {value: ''},
          {value: ''},
        ]
      }
    }
  },
  methods: {
    add() {
      const inputTemplate = [
        {value: ''},
        {value: ''},
        {value: ''},
      ]
      this.dynamicForm.baseInfo.push(...inputTemplate)
      this.showStatus = false
      this.$nextTick(() => {
        this.showStatus = true
      })
    }
  }
}
</script>

<style lang="scss">
.label-zero .el-form-item__label {
  width: 0 !important;
}
</style>
