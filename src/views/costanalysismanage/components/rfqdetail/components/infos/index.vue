<!--
 * @Author: your name
 * @Date: 2021-05-27 17:37:00
 * @LastEditTime: 2021-06-07 10:48:30
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\views\costanalysismanage\components\rfqdetail\components\infos\index.vue
-->
<template>
  <iCard collapse :title="$t('LK_JICHUXINXI')" class="infos margin-top20" v-loading="loading">
    <iFormGroup row="4">
      <iFormItem
        v-for="(item, index) in infos"
        label-width="110px"
        :key="index"
        :row="item.row"
        :label="$t(item.key)"
      >
        <iText>{{ infoData[item.props] }}</iText>
      </iFormItem>
    </iFormGroup>
  </iCard>
</template>

<script>
import { iCard, iFormGroup, iFormItem, iText, iMessage } from "rise"
import { infos } from "../data"
import { getRfqDataList } from "@/api/partsrfq/home"

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
    this.getRfqDataList()
  },
  methods: {
    getRfqDataList() {
      this.loading = true

      getRfqDataList({
        rfqMangerInfosPackage: {
          userId: this.userInfo.id,
          rfqId: this.rfqId
        }
      })
      .then(res => {
        if (res.code == 200) {
          if (Array.isArray(res.data.getRfqInfoVO.rfqVOList) && res.data.getRfqInfoVO.rfqVOList[0]) {
            this.infoData = res.data.getRfqInfoVO.rfqVOList[0]
          }
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