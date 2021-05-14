<!--
 * @Author: your name
 * @Date: 2021-04-12 10:12:39
 * @LastEditTime: 2021-05-14 10:12:09
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\views\partsrfq\editordetail\components\rfqPending\components\technicalSeminar\components\otherMeetingInformation\index.vue
-->
<template>
  <i-card v-permission="PARTSRFQ_EDITORDETAIL_RFQPENDING_TECHNICALSEMINAR_OTHERMEETINGINFORMATION_OTHER">
    <div class="margin-bottom20 clearFloat">
      <span class="font18 font-weight">{{ $t('LK_HUIYIQITAXINXI') }}</span>
    </div>
    <iFormGroup :row="2" inline icon>
      <iFormItem :label="$t('LK_HUIYISHIJIAN')+':'" name="test">
        <iDatePicker type="date" placeholder="2021-01-08" v-model="form.meetingDate" v-permission="PARTSRFQ_EDITORDETAIL_RFQPENDING_TECHNICALSEMINAR_OTHERMEETINGINFORMATION_TIME"></iDatePicker>
      </iFormItem>
      <iFormItem :label="$t('LK_HUIYIDIDIAN')+':'" name="test">
        <iInput :placeholder="$t('LK_SHANGQIDAZHONGYUANQU')" v-model="form.meetingLocation" v-permission="PARTSRFQ_EDITORDETAIL_RFQPENDING_TECHNICALSEMINAR_OTHERMEETINGINFORMATION_LOCATION"></iInput>
      </iFormItem>
    </iFormGroup>
    <iFormGroup :row="1" inline icon>
      <iFormItem :label="$t('LK_BEIZHU')+':'" name="test">
        <iInput type="textarea" :rows="4" resize="none" :placeholder="$t('LK_LIRUMENJING')" v-model="form.memo" v-permission="PARTSRFQ_EDITORDETAIL_RFQPENDING_TECHNICALSEMINAR_OTHERMEETINGINFORMATION_REMARKS"></iInput>
      </iFormItem>
    </iFormGroup>
  </i-card>
</template>

<script>
import {iCard, iFormGroup, iFormItem, iInput, iDatePicker} from '@/components'

export default {
  components: {
    iCard,
    iFormGroup,
    iFormItem,
    iInput,
    iDatePicker
  },
  data() {
    return {
      form: {
        meetingDate: '',
        meetingLocation: '',
        memo:''
      }
    }
  },
  methods: {
    add() {
    }
  }
}
</script>

<style scoped>

</style>