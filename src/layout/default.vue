<template>
  <iLayout />
  <!-- <iLayout :menus="menus" /> -->
</template>

<script>
import iLayout from 'rise/web/layout/index.vue'
import menus from '@/constants/menus'
export default {
  name: 'Layout',
  components: { iLayout },
  data() {
    return { menus }
  }
}
</script>

<style lang="scss" scoped></style>
