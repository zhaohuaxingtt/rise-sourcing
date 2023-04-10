<template>
  <div class="preview">
    <div id="preview-content">
      <iTabsList v-if="showMtz" type="card" v-model="tab" class="preview-tabs">
        <el-tab-pane lazy v-for="(tab, $tabIndex) in tabs" :key="$tabIndex" :label="language(tab.key, tab.label)" :name="tab.name">
          <component :ref="tab.name" :is="component" v-for="(component, $componentIndex) in tab.components" :class="$componentIndex !== 0 ? 'margin-top20' : ''" :key="$componentIndex" :mtzAppId="mtzAppId" :mtzData="mtzData" />
        </el-tab-pane>
      </iTabsList>
      <div v-else>
        <iTabsList type="card" v-model="activeName" class="preview-tabs">
            <template v-for="(tab, $tabIndex) in tabList">
              <el-tab-pane v-if="tab.id==0||tab.id==1||(tab.id==2&&isCS)" lazy :key="$tabIndex" :label="language(tab.key, tab.label)" :name="tab.id">
              </el-tab-pane>
            </template>
        </iTabsList>
        <div style="width:100%">
          <nomi v-if="activeName==0" :mtzData="mtzData" />
          <BDL type="approval" v-if="activeName==1"></BDL>
          <Attachment type="approval" v-if="activeName==2"> </Attachment>
        </div>
      </div>
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
  computed:{
    isCS(){
      return this.$store.state.permission.userInfo.deptDTO.deptNum.slice(0,2)=='CS'
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
.no-padding {
  padding: 0;
  .isPreview {
    min-height: 100%;
  }
}
.page {
  position: relative;
}

::v-deep .pdf-item {
  width: 100%;
  height: 0;
  overflow: hidden;
  .rsPdfCard {
    box-shadow: none;
    & + .rsCard {
      margin-top: 20px; /*no*/
    }
    .cardHeader {
      padding: 30px 0px;
    }
    .cardBody {
      padding: 0px;
    }
  }
}
::v-deep .pageCard-main {
  overflow: hidden;
  margin-top: 20px;
}
</style>
<style lang="scss" scoped>
.preview {
  width: 100%;
  height: 100%;
  overflow-y: auto;
  position: relative;
  background: #fff;
}
#preview-content {
  height: 100%;
  overflow: auto;
  ::v-deep * {
    font-family: 'Arial', 'Helvetica', 'sans-serif';
    letter-spacing:0;
    &::-webkit-scrollbar {
      width: 8px;
      height: 8px;
    }
    &::-webkit-scrollbar-thumb {
      min-height: 8px;
      min-width: 8px;
    }
    &::-webkit-scrollbar-track {
      width: 8px;
    }
  }
  .tab-nav{
    height: 54px;
  }
  .nomination-content {
    height: calc(100% - 54px);
    .page-content{
      height: 100%;
      overflow: auto;
      display: flex;
      flex-flow: column;
    }
  }
  ::v-deep .decision-header.preview-header {
    padding: 0;
    background-color: transparent;
  }
  
  ::v-deep.el-tabs__nav-scroll {
    overflow: hidden !important;
  }
::v-deep .el-tabs--card {
    .el-tabs__header {
      margin-bottom: 15px;
    }
    .el-tabs__nav-wrap {
      height: unset;
    }
  &.preview-tabs {
    background: transparent;
    .el-tabs__item {
      min-width: unset;
      border-top: 1px solid #d9d9d9;
      border-bottom: 1px solid #d9d9d9;
      border-left: 1px solid #d9d9d9;
      font-size: 18px;
      &.is-active {
        color: #fff;
        background: #364d6e;
      }
      &:nth-child(1) {
        border-radius: 0;
      }
      &:last-child {
        border-radius: 0;
        border-right: 1px solid #d9d9d9;
      }
    }
  }
}
  ::v-deep .el-table {
    border-radius: 0;
    font-size: 18px;
    th.gutter:last-of-type{
      background: #fff;
      border: 0;
    }
    .el-table__header {
      th {
        border-color: #d9d9d9;
        .cell {
          color: #fff;
          line-height: 20px;
        }
      }
    }
    .el-table__body-wrapper, .el-table__fixed-body-wrapper{
      tr:nth-child(even) {
        background-color: #FFFFFF;
      }
      
      tr:last-of-type {
        td{
          border-bottom: 1px solid #d9d9d9;
        }
      }

      td {
        border-color: #d9d9d9;
        border-top: 1px solid #d9d9d9;
        .cell {
          line-height: 20px;
        }
      }
    }
    tr {
      border-top: 1px solid #d9d9d9;
      .link{
        color: #364d6e;
        text-decoration: underline;
      }
    }
  }
  ::v-deep .i-pagination {
    margin-bottom: 5px;
    height: 35px;
    margin-top: 10px;
    .pagination {
      margin-top: 0;
      .el-pager li:not(.disabled).active {
        background-color: #364d6e;
      }
    }
  }
}
</style>