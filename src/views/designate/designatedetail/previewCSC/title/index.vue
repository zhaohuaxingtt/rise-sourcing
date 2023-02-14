<template>
  <div
    class="title"
    ref="reTitle"
    @click="gotoPartList"
    v-permission.auto="SOURCING_NOMINATION_ATTATCH_TITLE | (决策资料 - title)"
  >
    <div class="imgBox">
      <img src="@/assets/images/CSC_bg.png" alt="" />
    </div>
    <div class="content">
      <div class="infos" v-for="item in items" :key="item.label">
        <div class="label">{{ item.label }}:</div>
        <div class="value">{{ data[item.key] }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { iPage, iCard, iFormGroup, iFormItem, iLabel, iText } from "rise";
import { titleData } from "./data";
import { findLayoutTitleInfo } from "@/api/designate/decisiondata/title";
import filters from "@/utils/filters";

export default {
  mixins: [filters],
  props: {
    tableList: { type: Array, default: () => [] },
    prototypeTableList: { type: Array, default: () => [] },
  },
  computed: {
    userName() {
      return this.$i18n.locale === "zh"
        ? this.$store.state.permission.userInfo.nameZh
        : this.$store.state.permission.userInfo.nameEn;
    },
  },
  components: {
    iPage,
    iCard,
    iFormGroup,
    iFormItem,
    iLabel,
    iText,
  },
  data() {
    return {
      items: _.cloneDeep(titleData),
      data: {},
    };
  },
  created() {
    this.findLayoutTitleInfo();
  },
  methods: {
    gotoPartList() {
      const { query } = this.$route;
      this.$router.push({
        path: "/previewCSC/partlist",
        query,
      });
    },
    findLayoutTitleInfo: function () {
      findLayoutTitleInfo({
        nominateId: this.$route.query.desinateId,
      }).then((res) => {
        if (res.code == 200) {
          this.items.forEach((item) => {
            switch (item.key) {
              case "PCA/TIA":
                if (!res.data.isShow) this.$set(item, "hidden", true);
                else {
                  this.$set(item, "hidden", false);
                  this.$set(
                    this.data,
                    item.key,
                    `${res.data.pacStatus}/${res.data.tiaStatus}`
                  );
                }

                break;
              case "projects":
                this.$set(
                  this.data,
                  item.key,
                  Array.isArray(res.data[item.key])
                    ? res.data[item.key].join()
                    : "-"
                );

                break;
              case "singleSourcing":
                if (res.data.singleSourcing) {
                  this.$set(item, "hidden", false);
                  this.$set(this.data, item.key, "Y");
                } else this.$set(item, "hidden", true);

                break;
              default:
                this.$set(this.data, item.key, res.data[item.key]);
            }
          });
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.title {
  height: 100%;
  padding: 0 40px;
  overflow: auto;
  display: flex;
  flex-flow: column;
  background: #fff;
  ::v-deep * {
    font-family: 'Arial', 'Helvetica', 'sans-serif';
    letter-spacing:0
  }
}
.imgBox {
  width: 100%;
  height: 470px;
  img {
    height: 100%;
    width: 100%;
  }
}
.content {
  height: calc(100% - 525px);
  padding: 20px;
  border: 1px solid #ddd;
  flex: 1;
  display: flex;
  justify-content: space-between;
  flex-flow: column;
  margin-top: 20px;
  margin-bottom: 35px;
  .infos {
    display: flex;
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 10px;
    margin-left: 50px;
    .label {
      width: 300px;
    }
    .value {
      flex: 1;
    }
    ::v-deep .el-form-item__label {
      font-size: 18px;
      font-weight: bold;
    }
    ::v-deep .el-form-item__content {
      font-size: 18px;
      font-weight: bold;
    }
    &:last-child {
      margin-bottom: 0;
    }
  }
}
.pdf-item {
  display: none;
}
.rsTitle {
  ::v-deep .cardBody {
    padding-bottom: 0;
  }

  ::v-deep .el-form-item__label {
    width: 200px; /*no*/
  }
}
.page-logo {
  display: flex;
  justify-content: space-between;
  padding: 10px;
  align-items: center;
  border-top: 1px solid #666;
}
</style>
