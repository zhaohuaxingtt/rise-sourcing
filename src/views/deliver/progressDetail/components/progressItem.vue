<template>
  <div class="item">
    <div class="first-column-item"></div>
    <div class="right">
      <iprogress :carProjectId="'50141107'"/>
    </div>
  </div>
</template>

<script>
import iprogress from "../../components/progress";
  export default {
    components:{iprogress}
  }
</script>

<style lang="scss" scoped>
.item{
  width: 100%;
  display: flex;
  .first-column-item{
    flex: none;
    width: 200px;
    border-right: 1px #ccc solid;
  }
  .right{
    padding: 20px 0;
    width: 100%;
    flex: 1;
  }
}
</style>