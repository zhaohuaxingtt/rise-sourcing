<template>
  <iTabsList type="card" v-model="tab">
    <el-tab-pane
      v-for="(tab, $index) in tabs"
      :key="$index"
      :label="tab.name"
      :name="tab.key"
    >
      <div class="margin-top20">
        <component :ref="tab.key" :is="tab.component" />
      </div>
    </el-tab-pane>
  </iTabsList>
</template>

<script>
import { iTabsList } from "rise";
import approved from "./approved";
import pending from "./pending";
export default {
  components: {
    iTabsList,
    approved,
    pending,
  },
  data() {
    return {
      tab: "pending",
      tabs: [
        {
          label: "pending",
          component: "pending",
          key: "pending",
        },
        {
          label: "approved",
          component: "approved",
          key: "approved",
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
</style>