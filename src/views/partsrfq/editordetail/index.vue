<!--
 * @Author: your name
 * @Date: 2021-02-25 10:09:50
 * @LastEditTime: 2021-02-25 10:10:24
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \rise\src\views\partsrfq\editordetail\index.vue
-->
<template>
  <iPage>
    <!-- rfq详情操作按钮 -->
    <div class="pageTitle flex-between-center-center">
      <div class="flex nav-box">
        <span>新建RFQ</span>
        <iNav-mvp @change="changeNav" :list="navList" class="ml30"></iNav-mvp>
      </div>
      <div class="btnList">
        <iButton @click="save">保存</iButton>
        <iButton @click="newRfq">新建RFQ轮次</iButton>
        <iButton @click="sendInquiry">发出询价</iButton>
        <iButton @click="endInquiry">结束本轮询价</iButton>
        <iButton @click="transferNegotiation">转谈判</iButton>
        <iButton @click="createAFixedPointApplication">创建定点申请</iButton>
        <iButton @click="log">日志</iButton>
        <span>
					<icon name="icondatabaseweixuanzhong"></icon>
				</span>
      </div>
    </div>
    <rfqPending v-if="navActivtyValue === 1 || navActivtyValue === ''"></rfqPending>
    <rfq-detail-info v-if="navActivtyValue === 2"></rfq-detail-info>
  </iPage>
</template>
<script>
import {iNavMvp, iButton, iPage, icon} from "@/components";
import rfqPending from './components/rfqPending'
import rfqDetailInfo from './components/rfqDetailInfo'

export default {
  components: {
    iNavMvp,
    iButton,
    iPage,
    icon,
    rfqPending,
    rfqDetailInfo
  },
  data() {
    return {
      navActivtyValue: '',
      navList: [
        {
          value: 1,
          name: "待办事项",
        },
        {
          value: 2,
          name: "详情信息",
        },
        {
          value: 3,
          name: "谈判助手",
        }
      ]
    }
  },
  methods: {
    changeNav(item, index) {
      this.navActivtyValue = item.value
    },
    save() {

    },
    newRfq() {},
    sendInquiry() {},
    endInquiry() {},
    transferNegotiation() {},
    createAFixedPointApplication() {

    },
    log() {}
  }
}
</script>
<style lang='scss' scoped>
.pageTitle {
  .nav-box {
    > span {
      font-size: 20px;
      font-weight: bold;
    }

    .ml30 {
      margin-left: 30px;
    }
  }

  .btnList {
    > span {
      font-size: 20px;
      margin-left: 30px;
    }
  }
}
</style>