<!--
* @author:shujie
* @Date: 2021-2-25 11:42:11
 * @LastEditors: Please set LastEditors
* @Description: 待办事项-零件清单
 -->
<template>
  <iCard>
    <div class="header flex-align-center">
      <iButton>删除</iButton>
      <iButton>新申请财务目标价</iButton>
      <iButton>再新申请财务目标价</iButton>
    </div>
    <!--  -->
  </iCard>
</template>

<script>
import { iButton, iCard } from "@/components";

export default {
  components: {
    iButton,
    iCard,
  },
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.header {
  justify-content: flex-end;
}
</style>
