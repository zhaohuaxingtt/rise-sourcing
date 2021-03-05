<template>
  <i-card>
    <div class="margin-bottom20 clearFloat">
      <span class="font18 font-weight">会议其它信息</span>
    </div>
    <iFormGroup :row="2" inline icon>
      <iFormItem label="会议时间：" name="test">
        <iInput placeholder="2021-01-08"></iInput>
      </iFormItem>
      <iFormItem label="会议地点：" name="test">
        <iInput placeholder="上汽⼤众园区303室"></iInput>
      </iFormItem>
    </iFormGroup>
    <iFormGroup :row="1" inline icon>
      <iFormItem label="备注：" name="test">
        <iInput  type="textarea" :rows="4" resize="none" placeholder="例如：⻔禁申请步骤，其他备注信息等"></iInput>
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
  methods: {
    add() {
    }
  }
}
</script>

<style scoped>

</style>