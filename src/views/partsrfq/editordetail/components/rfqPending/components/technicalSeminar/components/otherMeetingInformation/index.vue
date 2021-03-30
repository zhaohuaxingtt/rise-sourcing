<template>
  <i-card v-permission="PARTSRFQ_EDITORDETAIL_RFQPENDING_TECHNICALSEMINAR_OTHERMEETINGINFORMATION_OTHER">
    <div class="margin-bottom20 clearFloat">
      <span class="font18 font-weight">{{ $t('LK_HUIYIQITAXINXI') }}</span>
    </div>
    <iFormGroup :row="2" inline icon>
      <iFormItem :label="$t('LK_HUIYISHIJIAN')+':'" name="test">
        <el-date-picker type="date" placeholder="2021-01-08" v-model="form.meetingDate" v-permission="PARTSRFQ_EDITORDETAIL_RFQPENDING_TECHNICALSEMINAR_OTHERMEETINGINFORMATION_TIME"></el-date-picker>
      </iFormItem>
      <iFormItem :label="$t('LK_HUIYIDIDIAN')+':'" name="test">
        <iInput placeholder="上汽⼤众园区303室" v-model="form.meetingLocation" v-permission="PARTSRFQ_EDITORDETAIL_RFQPENDING_TECHNICALSEMINAR_OTHERMEETINGINFORMATION_LOCATION"></iInput>
      </iFormItem>
    </iFormGroup>
    <iFormGroup :row="1" inline icon>
      <iFormItem :label="$t('LK_BEIZHU')+':'" name="test">
        <iInput type="textarea" :rows="4" resize="none" placeholder="例如：⻔禁申请步骤，其他备注信息等" v-model="form.memo" v-permission="PARTSRFQ_EDITORDETAIL_RFQPENDING_TECHNICALSEMINAR_OTHERMEETINGINFORMATION_REMARKS"></iInput>
      </iFormItem>
    </iFormGroup>
  </i-card>
</template>

<script>
import {iCard, iFormGroup, iFormItem, iInput} from '@/components'

export default {
  components: {
    iCard,
    iFormGroup,
    iFormItem,
    iInput
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