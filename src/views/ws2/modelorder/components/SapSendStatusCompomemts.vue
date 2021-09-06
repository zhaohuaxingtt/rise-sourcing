<!--SAP发送状态-->
<template>
  <div>
     <span
         v-if="+row['sapSendStatus'] !== 2"
         :class="+row['sapSendStatus'] === 2 ? 'g-red' : ''"
     >{{
         sapSendStatus.find((i) => +i.value === +row["sapSendStatus"]).name
       }}</span
     >
    <el-tooltip
        v-if="+row['sapSendStatus'] === 2"
        class="item"
        effect="light"
        placement="bottom"
    >
         <div  slot="content" style="width: 200px">{{ row['sapSendRemark'] != null ? row['sapSendRemark'] : $t('LK_YUANYINBUXIANG')}}</div>
            <span class="g-red">
              <icon class="el-icon-warning-outline" color="red"/>
              {{
                sapSendStatus.find(
                    (i) => +i.value === +row["sapSendStatus"]
                ).name
              }}</span
            >
    </el-tooltip>
  </div>

</template>

<script>
export default {
  name: "SapSendStatusCompomemts",
  props:{
    row: {type: Object, require: true},
  },
  data(){
    return {
      sapSendStatus : [
        { name: "未发送", value: "0" },
        { name: "已发送", value: "1" },
        { name: "发送失败", value: "2" },
        { name: "手工", value: "6" },
      ]
    }
  }
}
</script>

<style scoped>
.g-red {
  cursor: pointer;
  color: #cc4949;
//display: none;
  align-items: center;
  margin-left: 10px;
  justify-content: center;
}
</style>