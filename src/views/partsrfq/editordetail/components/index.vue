<!--
 * @Author: YoHo
 * @Date: 2022-01-04 09:40:10
 * @LastEditTime: 2022-01-04 10:40:58
 * @LastEditors: YoHo
 * @Description: 
-->
<template>
  <div>
    123
    <iDialog
      :visible.sync="tipsVislble"
      width="50%"
      title="RFQ任务提示"
      append-to-body
      class="dunsTipsDiogog"
    >
      <div>
        当前RFQ有一下任务未完成，请及时处理
        <template v-for="(item, index) in todoList">
          <p :key="index">
            <icon symbol name="iconzhongyaoxinxitishi" /> {{ item.name }}
          </p>
        </template>
        <div class="footer">
          <iButton>跳过</iButton>
          <iButton>前往任务列表</iButton>
        </div>
      </div>
    </iDialog>
  </div>
</template>

<script>
import { iDialog, icon, iButton } from "rise";
export default {
  components: {
    iDialog,
    icon,
    iButton
  },
  data() {
    return {
      tipsVislble: true,
      todoList: [
        {
          name: "财务目标价申请",
        },
        {
          name: "模具目标价申请",
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
.footer{
  text-align: right;
}
</style>