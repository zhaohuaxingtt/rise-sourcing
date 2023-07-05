<!--
 * @Author: wentliao
 * @Date: 2021-06-18 10:22:21
 * @Description: 定点信/LOI 列表页
-->
<template>
  <iPage class="letterAndLoi" v-permission.auto="LK_LETTERANDLOI_PAGE|定点信/LOI页面">
    <headerNav />
    <div class="page-content">
      <letterList />
    </div>
  </iPage>
</template>

<script>
import { iPage } from 'rise';
import headerNav from "@/components/headerNav"
import letterList from './letter/list';

export default {
    name:'letterAndLoi',
    components:{
      iPage,
      headerNav,
      letterList
    }
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
    ::v-deep .letterList{
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