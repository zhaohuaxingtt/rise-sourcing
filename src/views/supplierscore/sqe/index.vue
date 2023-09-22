<template>
  <iPage class="sqeScore">
    <div class="header">
      <headerNav class="headerNav" type="scoremanage"></headerNav>
    </div>
    <router-view></router-view>
  </iPage>
</template>
  
<script>
import { iPage, icon } from "rise";
import headerNav from "@/components/headerNav";
export default {
  components: {
    iPage,
    icon,
    headerNav
  }
};
</script>
  
<style lang="scss" scoped>
.sqeScore {
  display: flex;
  flex-flow: column;
  height: 100%;
  .header {
    width: 100%;
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .headerNav {
      width: 100%;
    }
    .title {
      font-size: 20px;
      font-weight: bold;
      color: #000;
      height: 28px;
      line-height: 28px;
    }
    .right-control {
      display: flex;
      align-items: center;
    }
    .control {
      display: flex;
      align-items: center;
      height: 30px;
    }
  }
}
</style>