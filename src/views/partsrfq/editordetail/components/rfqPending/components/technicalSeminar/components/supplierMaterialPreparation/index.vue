<template>
  <i-card v-permission="PARTSRFQ_EDITORDETAIL_RFQPENDING_TECHNICALSEMINAR_INDEXPAGE">
    <div class="margin-bottom20 clearFloat">
      <span class="font18 font-weight">{{ $t('LK_GONGYINGSHANGCAILIAOZHUNBEI') }}</span>
      <div class="floatright">
        <iButton @click="add" v-permission="PARTSRFQ_EDITORDETAIL_RFQPENDING_TECHNICALSEMINAR_ADD">{{$t('LK_TIANJIA')}}</iButton>
      </div>
    </div>
    <iFormGroup :row="3" inline icon class="label-zero" v-model="dynamicForm" v-if="showStatus"
                v-permission="PARTSRFQ_EDITORDETAIL_RFQPENDING_TECHNICALSEMINAR_DESTEXT">
      <template v-for="(item,index) of dynamicForm.baseInfo">
        <iFormItem label=" " :name="index" :key="index" class="form-item-style">
          <iInput type="textarea" :rows="4" resize="none" :placeholder="$t(item.placeholderkey)" v-model="item.value"
                  maxlength="100" show-word-limit></iInput>
          <div @click="deleteItems(index+ 1)"
               v-if="(index+1)%3 === 0">
            <icon symbol name="iconguanbixiaoxiliebiaokapiannei" class="delete-icon">
            </icon>
          </div>
        </iFormItem>
      </template>
    </iFormGroup>
  </i-card>
</template>

<script>
import {iCard, iButton, iFormGroup, iFormItem, iInput, iMessage, icon} from '@/components'

export default {
  components: {
    iCard,
    iButton,
    iFormGroup,
    iFormItem,
    iInput,
    icon
  },
  data() {
    return {
      showStatus: true,
      dynamicForm: {
        baseInfo: [
          {value: '', placeholder: '供应商公司介绍', placeholderkey: 'LK_GONGYINGSHANGGONGSIJIESHAO'},
          {value: '', placeholder: '供应商产品概要', placeholderkey: 'LK_GONGYINGSHANGCHANPINGAIYAO'},
          {value: '', placeholder: '供应商timeline', placeholderkey: 'LK_GONGYINGSHANGTIMELINE'},
        ]
      }
    }
  },
  methods: {
    add() {
      const inputTemplate = [
        {value: '', placeholder: '供应商公司介绍',placeholderkey: 'LK_GONGYINGSHANGGONGSIJIESHAO'},
        {value: '', placeholder: '供应商产品概要',placeholderkey: 'LK_GONGYINGSHANGCHANPINGAIYAO'},
        {value: '', placeholder: '供应商timeline',placeholderkey: 'LK_GONGYINGSHANGTIMELINE'},
      ]
      if (this.dynamicForm.baseInfo.length < 12) {
        this.dynamicForm.baseInfo.push(...inputTemplate)
        this.showStatus = false
        this.$nextTick(() => {
          this.showStatus = true
        })
      } else {
        iMessage.warn(this.$t('LK_YITIANJIADAOSHANGXIAN'))
        return false
      }
    },
    deleteItems(index) {
      if (this.dynamicForm.baseInfo.length === 3) {
        iMessage.warn(this.$t('Can not delete, at least keep one!'))
      } else {
        this.dynamicForm.baseInfo.splice(index - 3, 3)
      }
    }
  }
}
</script>

<style lang="scss">
.label-zero .el-form-item__label {
  width: 0 !important;
}

.form-item-style {
  position: relative;
}

.delete-icon {
  position: absolute;
  right: -30px;
  top: 30px;
  color: #DFE7FA;
  cursor: pointer;
  font-size: 20px;
  z-index: 999;
}
</style>
