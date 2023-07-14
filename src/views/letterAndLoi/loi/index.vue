<!--
 * @Author: wentliao
 * @Date: 2021-12-23 15:53:12
 * @Description: LOI首页
-->
<template>
  <iPage class="letterAndLoi" v-permission.auto="LK_LETTERANDLOI_PAGE|定点信/LOI页面">
    <headerNav />
    <div class="page-content">
      <loiList/>
    </div>
  </iPage>
</template>

<script>
import { iPage } from 'rise';
import headerNav from "@/components/headerNav"
import loiList from './list';

export default {
    name:'letterAndLoi',
    components:{
      iPage,
      headerNav,
      loiList
    },
}
</script>

<style lang="scss" scoped>
.letterAndLoi{
  position: relative;
  height: 100%;
  display: flex;
  flex-flow: column;
  .page-content{
    flex: 1;
    overflow: auto;
    ::v-deep .loiList{
      height: 100%;
      display: flex;
      flex-flow: column;
      .table-card {
        flex: 1;
        overflow: hidden;
        min-height: 350px;
        .card-body-box {
            height: 100%;
            .table-box {
                height: calc(100% - 105px);
            }
        }
      }
    }
  }
}
</style>