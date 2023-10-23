<template>
  <div class="rsPreview">
    <iTabsList v-if="showMtz" type="card" v-model="tab">
      <el-tab-pane lazy v-for="(tab, $tabIndex) in tabs" :key="$tabIndex" :label="language(tab.key, tab.label)" :name="tab.name">
        <component :ref="tab.name" :is="component" v-for="(component, $componentIndex) in tab.components" :class="$componentIndex !== 0 ? 'margin-top20' : ''" :key="$componentIndex" :mtzAppId="mtzAppId" :mtzData="mtzData" />
      </el-tab-pane>
    </iTabsList>
    <div v-else>
      <iTabsList  type="card" v-model="activeName">
      <el-tab-pane v-if="tab.id==0||tab.id==1||(tab.id==2&&$store.state.permission.userInfo.deptDTO.deptNum.slice(0,2)=='CS')" lazy v-for="(tab, $tabIndex) in tabList" :key="$tabIndex" :label="language(tab.key, tab.label)" :name="tab.id">
        <!-- <component :ref="tab.name" :is="component" v-for="(component, $componentIndex) in tab.components" :class="$componentIndex !== 0 ? 'margin-top20' : ''" :key="$componentIndex" :mtzAppId="mtzAppId" :mtzData="mtzData" /> -->
      </el-tab-pane>
    </iTabsList>
    <nomi v-if="activeName==0" :mtzData="mtzData" />
    <BDL type="approval"  v-if="activeName==1"></BDL>
    <Attachment type="approval" v-if="activeName==2"> </Attachment>
    </div>
  </div>
</template>

<script>
import store from '@/store'
import { iTabsList, iMessage } from "rise"
import nomi from "./index"
import mtz from "./components/signPreviewBefore"
import { nominateAppSDetail } from "@/api/designate"
import { getApproveRsMtzDetail } from "@/api/designate/decisiondata/rs"
import BDL from '../bdl'
import Attachment from '../../attachment'
export default {
  components: { iTabsList, nomi, mtz,Attachment,BDL},
  data() {
    return {
      tabList: [
      {
          name: 'RS',
          key: 'RS',
          id:0,
        },
        {
          name: 'BDL',
          key: 'BDL',
          id:1,

        },
        {
          name: 'Attachment',
          key: 'Attachment',
          id:2,

        },
     
      ],
      index: 0,
      activeName: 0,
      tab: "nomi",
      tabs: [
        {
          key: "LINGJIANDINGDIANSHENQING",
          label: "零件定点申请",
          name: "nomi",
          components: [ "nomi" ]
        },
        {
          key: "MTZDINGDIANSHENQING",
          label: "MTZ定点申请",
          name: "mtz",
          components: [ "mtz" ]
        }
      ],
      mtzAppId: "",
      showMtz: false,
      mtzData: {}
    }
  },
  async created() {
    await this.nominateAppSDetail()
    this.getApproveRsMtzDetail()
  },
  methods: {
    changeTab(i) {
      this.activeName = i
    },
    nominateAppSDetail() {
      return nominateAppSDetail({
        nominateAppId: this.$route.query.desinateId
      })
      .then(res => {
        if (res.code == 200) {
          this.mtzAppId = res.data.mtzApplyId
        } else {
          iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn)
          this.showMtz = false
        }
      })
      .catch(() => this.showMtz = false)
    },
    getApproveRsMtzDetail() {
      if (!this.mtzAppId) return

      return getApproveRsMtzDetail({
        nominateId: this.$route.query.desinateId
      })
      .then(res => {
        if (res.code == 200) {
          if (res.data) {
            this.showMtz = true

            this.mtzData = {
              ruleTableListData: Array.isArray(res.data.ruleList) ? res.data.ruleList : [],
              partTableListData: Array.isArray(res.data.partsList) ? res.data.partsList : []
            }
          } else {
            this.showMtz = false

            this.mtzData = {}
          }
        } else {
          iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn)
        }
      })
      .catch(() => this.showMtz = false)
    }
  }
}
</script>

<style lang="scss" scoped>
    ::v-deep .pdf-item{
      width: 100%;
      height: 0;
      overflow: hidden;
    }

.topBar {
  display: flex;
  padding: 10px 0 20px;

  > div {
    padding: 8px 20px;
    box-shadow: 0 0 1.25rem rgb(0 0 0 / 8%);
    cursor: pointer;
    border: none;
    font-weight: bold;
    text-align: center;
  }
  .active {
    border-right: 1px solid #f5f6f7;
    color: #67C23A;
    background: #fff;
  }
  .dis {
    color: #727272;
    background-color: #f5f6f7;
  }
  .borderleft {
    border-radius: 6px 0 0 6px;
  }
  .borderright {
    border-radius: 0px 6px 06px 0px;
  }
}
</style>