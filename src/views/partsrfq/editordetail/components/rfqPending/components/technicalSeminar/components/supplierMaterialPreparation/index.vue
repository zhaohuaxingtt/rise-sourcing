<template>
  <i-card>
    <div class="margin-bottom20 clearFloat">
      <span class="font18 font-weight">供应商材料准备</span>
      <div class="floatright">
        <iButton @click="add">添加</iButton>
      </div>
    </div>
    <iFormGroup :row="3" inline icon class="label-zero" v-model="dynamicForm" v-if="showStatus">
      <template v-for="(item,index) of dynamicForm.baseInfo">
        <iFormItem label=" " :name="index" :key="index">
          <iInput type="textarea" :rows="4" resize="none" placeholder="请输入" v-model="item.value" maxlength="100"></iInput>
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
      if (this.dynamicForm.baseInfo.length < 9) {
        this.dynamicForm.baseInfo.push(...inputTemplate)
        this.showStatus = false
        this.$nextTick(() => {
          this.showStatus = true
        })
      } else {
        iMessage.warn('已添加到上限')
        return false
      }
    }
  }
}
</script>

<style lang="scss">
.label-zero .el-form-item__label {
  width: 0 !important;
}
</style>