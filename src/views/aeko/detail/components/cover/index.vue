<!--
 * @Author: wentliao
 * @Date: 2021-07-28 16:44:09
 * @Description: 封面表态
-->
<template>
  <div>
    <editCover
      :aekoInfo="aekoInfo"
      :currentTab="currentTab"
      v-if="isLinie"
      @getBbasicInfo="getBbasicInfo"
    />
    <previewCover
      :aekoInfo="aekoInfo"
      :currentTab="currentTab"
      @getBbasicInfo="getBbasicInfo"
      v-else
    />
  </div>
</template>

<script>
import previewCover from "./components/previewCover";
import editCover from "./components/editCover";
import { roleMixins } from "@/utils/roleMixins";
import { setLogMenu } from "@/utils";
export default {
  name: "aekoDetailCover",
  mixins: [roleMixins],
  components: {
    previewCover,
    editCover,
  },
  props: {
    currentTab: { type: String },
    aekoInfo: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      isLinie: "",
    };
  },
  created() {
    const roleList = this.roleList;
    let isAekoManager = roleList.includes("AEKOGLY"); // AKEO管理员
    let isCommodityCoordinator = roleList.includes("AEKOKSXTDY"); // Aeko科室协调员
    this.isLinie = roleList.includes("LINIE") || roleList.includes("ZYCGY"); // 专业采购员

    // 判断下多角色情况 若多角色时就判断url的跳转来源
    const { query } = this.$route;
    const { from = "" } = query;
    from == "manage"
      ? setLogMenu("AEKO管理-详情页-封面表态")
      : setLogMenu("AEKO表态-详情页-封面表态");
    const roleArr = [
      isAekoManager,
      isCommodityCoordinator,
      this.isLinie,
    ].filter((item) => item == true);
    if (roleArr.length > 1) {
      if (from == "manage") {
        this.isLinie = false;
      } else if (from == "stance") {
        isAekoManager = false;
        isCommodityCoordinator = false;
      }
    }

    // 若是从AEKO查看进入该页面则只可查看不能编辑
    if (from == "check") {
      this.isLinie = false;
    }
  },
  methods: {
    getBbasicInfo() {
      this.$emit("getBbasicInfo", "cover");
    },
  },
};
</script>

<style>
</style>