<!--
 * @Author: your name
 * @Date: 2021-05-27 12:32:54
 * @LastEditTime: 2021-05-27 13:49:18
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\views\costanalysismanage\components\home\index.vue
-->
<template>
  <div class="home">
    <div class="control">
      <logButton class="margin-left20" />
      <span class="margin-left20">
        <icon symbol name="icondatabaseweixuanzhong" class="font24"></icon>
      </span>
    </div>
  </div>
</template>

<script>
import { icon } from "rise"
import logButton from "@/views/partsign/editordetail/components/logButton"

export default {
  components: { 
    icon, 
    logButton
  },
}
</script>

<style lang="scss" scoped>
.home {
  .control {
    position: absolute;
    top: 30px;
    right: 40px;
    display: flex;
    align-items: center;
    height: 30px;
  }
}
</style>