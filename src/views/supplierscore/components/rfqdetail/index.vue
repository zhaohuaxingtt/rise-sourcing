<!--
 * @Author: your name
 * @Date: 2021-06-22 10:45:39
 * @LastEditTime: 2021-06-22 16:27:49
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\views\supplierscore\components\rfqdetail\index.vue
-->
<template>
  <iPage class="rfqdetail">
    <div class="header clearFloat">
      <div class="title">{{ $t("costanalysismanage.RfqBianHao") }}: {{ rfqId }}</div>
      <div class="control">
        <logButton class="margin-left20" />
        <span class="margin-left20">
          <icon symbol name="icondatabaseweixuanzhong" class="font24"></icon>
        </span>
      </div>
    </div>
    <infos class="margin-top30" :partInfo="partInfo" />
    <iTabsList class="margin-top20" type="border-card" v-model="currentTab" @tab-click="tabChange">
      <el-tab-pane v-for="(tab, $tabIndex) in tabs" :key="$tabIndex" :label="$t(tab.key)" :name="tab.name">
        <component :ref="tab.name" :is="component" :partInfo="partInfo" v-for="(component, $componentIndex) in tab.components" :class="$componentIndex !== 0 ? 'margin-top20' : ''" :key="$componentIndex" :disabled="disabled" />
      </el-tab-pane>
    </iTabsList>
  </iPage>
</template>

<script>
import { iPage, icon, iTabsList, iMessage } from "rise"
import logButton from "@/components/logButton"
import infos from "./components/infos"
import partList from "./components/partList"
import supplierScore from "./components/supplierScore"

export default {
  components: {
    iPage,
    icon,
    iTabsList,
    logButton,
    infos,
    partList,
    supplierScore
  },
  data() {
    return {
      rfqId: "abc123",
      currentTab: "partList",
      tabs: [
        { label: "零件清单", name: "partList", key: "LK_LINGJIANQINGDAN", components: [ "partList" ] },
        { label: "供应商评分", name: "supplierScore", key: "LK_GONGYINGSHANGPINGFEN", components: [ "supplierScore" ] },
        { label: "询价附件", name: "inquiryAttachment", key: "LK_XUNJIAFUJIAN", components: [ "inquiryAttachment" ] }
      ],
      partInfo: {}
    }
  },
  created() {
    // this.getData()
  },
  methods: {
    getData() {
      const getData = function() {}

      this.loading = true
      getData()
      .then(res => {
        if (res.code == 200) {
          this.partInfo = res.data || {}
          const component = this.$refs[this.currentTab][0]
          if (typeof component.init === "function") component.init()
        } else {
          iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn)
        }

        this.loading = false
      })
      .catch(() => this.loading = false)
    },
    // 页签切换
    tabChange() {
      this.$nextTick(() => {
        const component = this.$refs[this.currentTab][0]
        if (typeof component.init === "function") component.init()
      })
    },
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