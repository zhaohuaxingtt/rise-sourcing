<!--
 * @Author: your name
 * @Date: 2021-05-27 17:27:15
 * @LastEditTime: 2021-05-28 17:11:50
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\views\costanalysismanage\components\rfqdetail\index.vue
-->
<template>
  <iPage class="rfqdetail">
    <div class="header clearFloat">
      <div class="title">{{ $t("costanalysismanage.RfqBianHao") }}: </div>
      <div class="control">
        <iButton @click="back">{{ $t("costanalysismanage.FanHui") }}</iButton>
        <logButton class="margin-left20" />
        <span class="margin-left20">
          <icon symbol name="icondatabaseweixuanzhong" class="font24"></icon>
        </span>
      </div>
    </div>
    <infos class="margin-top30" />
    <partList class="margin-top20" />
    <reportList class="margin-top20" />
  </iPage>
</template>

<script>
import { iPage, iButton } from "rise"
import logButton from "@/views/partsign/editordetail/components/logButton"
import infos from "./components/infos"
import partList from "./components/partList"
import reportList from "./components/reportList"

export default {
  components: {
    iPage,
    iButton,
    logButton,
    infos,
    partList,
    reportList,
  }
}
</script>

<style lang="scss" scoped>
.rfqdetail {
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