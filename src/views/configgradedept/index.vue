<!--
 * @Author: your name
 * @Date: 2021-06-17 13:44:35
 * @LastEditTime: 2021-06-17 14:06:46
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\views\configgradedept\index.vue
-->
<template>
  <iPage class="configgradedept">
    <div class="header clearFloat">
      <div class="title">配置评分部门</div>
      <div class="control">
        <logButton class="margin-left20" />
        <span class="margin-left20">
          <icon symbol name="icondatabaseweixuanzhong" class="font24"></icon>
        </span>
      </div>
    </div>
    <iSearch
      class="margin-top65"
      @sure="sure"
      @reset="reset"
      :resetKey="PARTSIGN_RESETBUTTON"
      :searchKey="PARTSIGN_CONFIRMBUTTON"
    >
      <el-form>
        
      </el-form>
    </iSearch>
    <iCard></iCard>
  </iPage>
</template>

<script>
import { iPage, icon, iSearch, iCard } from "rise"
import logButton from "@/views/partsign/editordetail/components/logButton"

export default {
  components: {
    iPage,
    icon,
    iSearch,
    iCard,
    logButton
  }
}
</script>

<style lang="scss" scoped>
.configgradedept {
  .header {
    position: relative;

    .title {
      font-size: 20px;
      font-weight: bold;
      color: #000;
      height: 28px;
      line-height: 28px;
    }

    .control {
      position: absolute;
      top: 50%;
      right: 0;
      transform: translate(0, -50%);
      display: flex;
      align-items: center;
      height: 30px;
    }
  }
}
</style>