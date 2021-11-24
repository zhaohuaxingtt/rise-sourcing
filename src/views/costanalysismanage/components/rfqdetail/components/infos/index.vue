<!--
 * @Author: your name
 * @Date: 2021-05-27 17:37:00
 * @LastEditTime: 2021-06-25 14:29:21
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\views\costanalysismanage\components\rfqdetail\components\infos\index.vue
-->
<template>
  <iCard collapse :title="language('JICHUXINXI', '基础信息')" class="infos margin-top20" v-loading="loading">
    <iFormGroup row="4">
      <iFormItem
        v-for="(item, index) in infos"
        label-width="110px"
        :key="index"
        :row="item.row"
        :label="language(item.key, item.name)"
        v-permission.dynamic.auto="item.permissionKey"
      >
        <iText>{{ infoData[item.props] }}</iText>
      </iFormItem>
    </iFormGroup>
  </iCard>
</template>

<script>
import { iCard, iFormGroup, iFormItem, iText, iMessage } from "rise"
import { infos } from "../data"
import { getRfqInfo } from "@/api/costanalysismanage/rfqdetail"

export default {
  components: {
    iCard,
    iFormGroup,
    iFormItem,
    iText
  },
  props: {
    rfqId: {
      type: String,
      require: true
    }
  },
  computed: {
    // eslint-disable-next-line no-undef
    ...Vuex.mapState({
      userInfo: state => state.permission.userInfo,
    })
  },
  data() {
    return {
      loading: false,
      infos,
      infoData: {}
    }
  },
  mounted() {
    this.getRfqInfo()
  },
  methods: {
    getRfqInfo() {
      this.loading = true

      getRfqInfo({
        rfqId: this.rfqId
      })
      .then(res => {
        if (res.code == 200) {
          this.infoData = res.data
          this.infoData.id = this.infoData.id ? this.infoData.id : this.rfqId
        } else {
          iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn)
        }

        this.loading = false
      })
      .catch(() => this.loading = false)
    },
  }
};
</script>

<style lang="scss" scoped>
.infos {
  ::v-deep .el-form-item__content{
    margin-left: 10px!important;
  }

  ::v-deep .cardBody {
    padding-bottom: 5px;
  }
}
</style>