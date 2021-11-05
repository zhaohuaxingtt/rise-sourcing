<!--
 * @Author: 舒杰
 * @Date: 2021-06-22 22:28:15
 * @LastEditTime: 2021-08-03 10:45:20
 * @LastEditors: 舒杰
 * @Description: In User Settings Edit
 * @FilePath: \front-sourcing\src\layout\default.vue
-->
<template>
  <!-- <iLayout :menus="menus" /> -->
  <iLayout />
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