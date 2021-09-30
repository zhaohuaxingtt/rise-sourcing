<!--
 * @version: 1.0
 * @Author: zbin
 * @Date: 2021-08-02 09:56:38
 * @LastEditors: zbin
 * @Descripttion: your project
-->
<template>
  <div id="allContainer" class="content">
    <theSearch :saveButtonLoading="saveButtonLoading" @handleSave="handleSave" @getMapList="getMapList" class="search" />
    <theCard :provinceZh="provinceZh" :object="object" class="card-right" />
    <chartMap ref="chartMap" :mapListData="mapListData" />
  </div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';
import chartMap from "./components/map.vue";
import theSearch from "./components/theSearch.vue";
import theCard from "./components/theCard.vue";
import { nTierCard, nTierSave } from "@/api/partsrfq/supplyChainOverall/index.js";
import { downloadPdfMixins } from '@/utils/pdf';
import resultMessageMixin from '@/utils/resultMessageMixin';
import { iCard } from "rise";
export default {
  // import引入的组件需要注入到对象中才能使用
  components: { chartMap, iCard, theSearch, theCard },
  mixins: [resultMessageMixin, downloadPdfMixins],
  data() {
    // 这里存放数据
    return {
      saveButtonLoading: false,
      object: {},
      provinceZh: '',
    }
  },
  // 监听属性 类似于data概念
  computed: {},
  // 监控data中的数据变化
  watch: {},
  // 方法集合
  methods: {
    async handleSave(params, id) {
      this.saveButtonLoading = true;
      const resFile = await this.getDownloadFileAndExportPdf({
        domId: 'allContainer',
        watermark: this.$store.state.permission.userInfo.deptDTO.nameZh + '-' + this.$store.state.permission.userInfo.userNum + '-' + this.$store.state.permission.userInfo.nameZh + "^" + window.moment().format('YYYY-MM-DD HH:mm:ss'),
        pdfName: this.language('PINLEIGUANLIZHUSHOU', '品类管理助手') + '-' + this.language('NJIGONGYINGLIANGUANLI', 'N级供应链管理') + '-' + this.$store.state.rfq.categoryName + '-' + window.moment().format('YYYY-MM-DD') + '|',
      });
      const req = {
        id: id,
        queryCondition: {
          ...params,
        },
        reportFileName: resFile.downloadName,
        categoryCode: this.$store.state.rfq.categoryCode,
        reportUrl: resFile.downloadUrl,
      };
      const res = await nTierSave(req)
      this.resultMessage(res, () => {
        this.saveButtonLoading = false;
      });
    },
    async getMapList(par) {
      const pms = {
        ...par
      }
      this.provinceZh = pms.provinceZh
      const res = await nTierCard(pms)
      this.object = res.data
    }
  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.getMapList()
  },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {

  },
}
</script>
<style lang='scss' scoped>
// @import url(); 引入公共css类
.content {
  position: relative;
}
.search {
  position: absolute;
  z-index: 2;
  width: 100%;
  padding: 20px;
}
.card-right {
  width: 40%;
  position: absolute;
  z-index: 2;
  right: 0;
  top: 7rem;
  padding: 20px;
  height: 87%;
  overflow: auto;
}
</style>
