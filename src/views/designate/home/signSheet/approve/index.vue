<template>
  <iPage>
    <iTabsList type="card" v-model="tab">
      <el-tab-pane
        v-for="tab in tabs"
        :key="tab.name"
        :label="language(tab.key,tab.name)"
        :name="tab.name"
      >
        <div class="margin-top20">
          <component :ref="tab.key" :is="tab.component" />
        </div>
      </el-tab-pane>
    </iTabsList>
  </iPage>
</template>

<script>
import { iPage, iTabsList } from "rise";
import approved from "./approved";
import pending from "./pending";
export default {
  components: {
    iPage,
    iTabsList,
    approved,
    pending,
  },
  data() {
    return {
      tab: "待审批",
      tabs: [
        {
          name: "待审批",
          component: "pending",
          key:'LK_DAISHENPI'
        },
        {
          name: "已审批",
          component: "approved",
          key:'LK_YISHENPI'
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
</style>