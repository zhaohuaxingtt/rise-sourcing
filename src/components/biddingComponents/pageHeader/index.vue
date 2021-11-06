<template>
  <div class="page-header">
    <span class="font18 font-weight">
      <slot name="default"></slot>
    </span>
    <slot name="actions"></slot>
    <!-- <div class="types">
      <el-badge :value="todoTotal" :hidden="todoTotal === 0">
        <el-link
          :type="taskType === 0 ? 'primary' : ''"
          @click="toggleTaskType(0)"
        >
          {{ $t('APPROVAL.APPROVAL_TODO') }}
        </el-link>
      </el-badge>

      <el-divider class="divider" direction="vertical" />
      <el-link
        :type="taskType === 1 ? 'primary' : ''"
        @click="toggleTaskType(1)"
      >
        {{ $t('APPROVAL.APPROVED') }}
      </el-link>
    </div> -->
  </div>
</template>

<script>
export default {
  name: 'pageHeader',
}
</script>

<style lang="scss" scoped>
.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
