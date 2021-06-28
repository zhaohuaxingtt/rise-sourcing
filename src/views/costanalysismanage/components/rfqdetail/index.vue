<!--
 * @Author: your name
 * @Date: 2021-05-27 17:27:15
 * @LastEditTime: 2021-06-22 17:08:18
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\views\costanalysismanage\components\rfqdetail\index.vue
-->
<template>
  <iPage class="rfqdetail">
    <div class="header clearFloat">
      <div class="title">{{ language("RFQBIANHAO", "RFQ编号") }}: {{ rfqId }}</div>
      <div class="control">
        <logButton class="margin-left20" />
        <span class="margin-left20">
          <icon symbol name="icondatabaseweixuanzhong" class="font24"></icon>
        </span>
      </div>
    </div>
    <infos class="margin-top30" :rfqId="rfqId" />
    <partList class="margin-top20" :rfqId="rfqId" />
    <reportList class="margin-top20" />
  </iPage>
</template>

<script>
import { iPage } from "rise"
import logButton from "@/components/logButton"
import infos from "./components/infos"
import partList from "./components/partList"
import reportList from "./components/reportList"

export default {
  components: {
    iPage,
    logButton,
    infos,
    partList,
    reportList,
  },
  created() {
    this.rfqId = this.$route.query.rfqId
  },
  data() {
    return {
      rfqId: ""
    }
  },
  methods: {
    handleBack() {
      this.$router.go(-1)
    }
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