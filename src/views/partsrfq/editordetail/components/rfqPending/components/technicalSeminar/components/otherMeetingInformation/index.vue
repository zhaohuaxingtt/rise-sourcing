<!--
 * @Author: your name
 * @Date: 2021-04-12 10:12:39
 * @LastEditTime: 2021-12-02 11:19:35
 * @LastEditors: Luoshuang
 * @Description: In User Settings Edit
 * @FilePath: \front-sourcing\src\views\partsrfq\editordetail\components\rfqPending\components\technicalSeminar\components\otherMeetingInformation\index.vue
-->
<template>
  <i-card v-permission.auto="PARTSRFQ_EDITORDETAIL_RFQPENDING_TECHNICALSEMINAR_OTHERINFO|技术交底会-会议其它信息">
    <div class="margin-bottom20 clearFloat">
      <span class="font18 font-weight">{{ language('LK_HUIYIQITAXINXI','会议其它信息') }}</span>
    </div>
    <iFormGroup :row="2" inline icon>
      <iFormItem :label="language('LK_HUIYISHIJIAN','会议时间')+':'" name="test">
        <iDatePicker :disabled="disabled" type="date" placeholder="2021-01-08" v-model="form.meetingDate" v-permission.auto="PARTSRFQ_EDITORDETAIL_RFQPENDING_TECHNICALSEMINAR_OTHERMEETINGINFORMATION_TIME|技术交底会-会议其它信息-会议时间"></iDatePicker>
      </iFormItem>
      <iFormItem :label="language('LK_HUIYIDIDIAN','会议地点')+':'" name="test">
        <iInput :disabled="disabled" :placeholder="language('LK_SHANGQIDAZHONGYUANQU','上汽⼤众园区303室')" v-model="form.meetingLocation" v-permission.auto="PARTSRFQ_EDITORDETAIL_RFQPENDING_TECHNICALSEMINAR_OTHERMEETINGINFORMATION_LOCATION|技术交底会-会议其它信息-会议地点"></iInput>
      </iFormItem>
    </iFormGroup>
    <iFormGroup :row="1" inline icon>
      <iFormItem :label="language('LK_BEIZHU','备注')+':'" name="test">
        <iInput :disabled="disabled" type="textarea" :rows="4" resize="none" :placeholder="language('LK_LIRUMENJING','例如：⻔禁申请步骤，其他备注信息等')" v-model="form.memo" v-permission.auto="PARTSRFQ_EDITORDETAIL_RFQPENDING_TECHNICALSEMINAR_OTHERMEETINGINFORMATION_REMARKS|技术交底会-会议其它信息-备注"></iInput>
      </iFormItem>
    </iFormGroup>
  </i-card>
</template>

<script>
import {iCard, iFormGroup, iFormItem, iInput, iDatePicker} from 'rise'

export default {
  components: {
    iCard,
    iFormGroup,
    iFormItem,
    iInput,
    iDatePicker
  },
  inject: ["getDisabled"],
  computed: {
    disabled() {
      return this.getDisabled()
    }
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