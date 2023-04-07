<!--
 * @Author: 余继鹏 917955345@qq.com
 * @Date: 2023-01-31 17:59:31
 * @LastEditors: 余继鹏 917955345@qq.com
 * @LastEditTime: 2023-04-06 18:26:08
 * @FilePath: \front-web\src\views\designate\designatedetail\previewCSC\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <iPage class="preview-csc no-padding" @click.native="isClick">
    <div
      id="preview-csc"
    >
      <decisionDataHeader class="tab-nav"/>
      <div class="nomination-content" v-loading="loading" id="pdfHide">
        <router-view class="page-content" :isGS="isGS"></router-view>
      </div>
    </div>
  </iPage>
</template>
<script>
import { iPage, iMessage } from "rise";
import decisionDataHeader from "./components/decisionDataHeader";
import { nominateAppSDetail, getNomiPosition } from "@/api/designate";
import { getNominateDisabled } from "rise/web/common";

export default {
  components: {
    decisionDataHeader,
    iPage,
  },
  beforeRouteEnter(to, from, next) {
    // 定点管理预览跳转逻辑
    if (!(from.meta.layoutPath && !to.meta.layoutPath && to.meta.path)) {
      next();
    }
  },
  data() {
    return {
      loading: false,
      isGS: false,
      isPreview: "1",
    };
  },
  created() {
    const { query } = this.$route;
    const { isPreview = "0" } = query;
    this.isPreview = isPreview;
    this.$store.dispatch("setPreviewState", isPreview);
    this.nominateAppSDetail();
    if (this.$route.query.sd == 1) {
      this.getNomiPosition();
    }
  },
  methods: {
    isClick(){
      window.parent.postMessage({type:'click',data:'iframe页面点击'},'*')
    },
    
    getNomiPosition() {
      this.showDecisionLoading = true

      getNomiPosition({
        nomiId: this.$route.query.desinateId || this.$store.getters.nomiAppId
      })
      .then(res => {
        if (res.code == 200) {
          this.showDecision = res.data
        }
      })
      .finally(() => {
        this.showDecisionLoading = false
      })
    },
    nominateAppSDetail() {
      this.loading = true;
      if (this.$route.query.desinateId) {
        nominateAppSDetail({
          nominateAppId: this.$route.query.desinateId,
        })
          .then((res) => {
            if (res.code == 200) {
              this.$store.dispatch(
                "setNominationDisabled",
                getNominateDisabled(
                  {
                    ...res.data,
                    designateType: this.$route.query.designateType,
                  } || {}
                )
              );
              this.$store.dispatch(
                "setRsDisabled",
                res.data.rsStatus === "FROZEN"
              );
              this.$store.dispatch(
                "setApplicationStatus",
                res.data.applicationStatus
              );
              this.$store.dispatch(
                "setNominationType",
                res.data.nominateProcessType
              );
              this.$store.dispatch("setMtzAppid", res.data.mtzApplyId);
              this.$store.dispatch("setNominateData", res.data || {});

              const query = this.$router.history.current.query;
              const path = this.$router.history.current.path;
              const newQuery = JSON.parse(JSON.stringify(query));
              this.isGS = ['1000003'].includes(res.data.partProjType)
              newQuery.designateType = res.data.nominateProcessType;
              this.$router.replace({ path, query: newQuery });
            } else {
              iMessage.error(
                this.$i18n.locale === "zh" ? res.desZh : res.desEn
              );
            }
          })
          .finally(() => (this.loading = false));
      } else {
        this.loading = false;
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.no-padding {
  padding: 0;
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
.preview-csc {
  width: 100%;
  height: 100%;
  overflow-y: auto;
  position: relative;
  background: #fff;
  padding:  0 80px 20px;
}
#preview-csc {
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
  ::v-deep.el-tabs--card {
    .el-tabs__header {
      margin-bottom: 15px;
    }
    .el-tabs__nav-wrap {
      height: unset;
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
      // .gutter {
      //   background: #ffffff !important; //因为我改了我的默认表格背景颜色，所以要跟着改
      // }
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
    .el-table__footer-wrapper{
      tr:nth-child(even) {
        background-color: #FFFFFF;
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

<style>
.font-family {
  font-family: 'Arial', 'Helvetica', 'sans-serif';
}
.bg-yellow {
  background: #fcf9f0;
}
</style>