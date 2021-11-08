<template>
  <iPage>
    <div class="form-itme">
      <div class="form-item-left">{{language('BIDDING_XIANGMULIEBIAO','项目列表')}}</div>
    </div>
    <projectList />
  </iPage>
</template>

<script>
import { iPage } from "rise";
import projectList from "./components/projectList.vue";

export default {
  components: {
    iPage,
    projectList,
  },
  data() {
    return {
      ruleForm: {},
    };
  },
  computed: {},
  methods: {},
};
</script>
<style lang="scss" scoped>
.form-itme {
  display: flex;
  justify-content: space-between;
  .form-item-left {
    font-size: 1.5rem;
    font-weight: bold;
  }
}
</style>
