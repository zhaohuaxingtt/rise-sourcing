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
        <iLoger 
          :config="{ module_obj_ae: 'KM评分', bizId_obj_ae: 'rfqId', queryParams: ['bizId_obj_ae'] }" 
          isPage 
          isUser
          credentials
          class="margin-left20" />
        <span class="margin-left20">
          <icon symbol name="icondatabaseweixuanzhong" class="font24"></icon>
        </span>
      </div>
    </div>
    <infos class="margin-top20" :rfqId="rfqId" />
    <partList class="margin-top7" :rfqId="rfqId" />
    <reportList class="margin-top7" />
  </iPage>
</template>

<script>
import { iPage, icon } from "rise"
import iLoger from "rise/web/components/iLoger"
import infos from "./components/infos"
import partList from "./components/partList"
import reportList from "./components/reportList"

export default {
  components: {
    iPage,
    icon,
    iLoger,
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
  display: flex;
  flex-flow: column;
  height: 100%;
  ::v-deep .table-card {
    flex: 1;
    overflow: hidden;
    min-height: 500px;
    display: flex;
    flex-flow: column;
    .card-body-box {
      flex: 1;
      overflow: hidden;
      .cardBody {
        display: flex;
        flex-flow: column;
      }
      .table-box {
        flex: 1;
        overflow: hidden;
      }
    }
  }
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .title {
      font-size: 20px;
      font-weight: bold;
      color: #000;
      height: 28px;
      line-height: 28px;
      flex: 1;
    }

    .control {
      display: flex;
      align-items: center;
      height: 30px;
    }
  }
}
</style>