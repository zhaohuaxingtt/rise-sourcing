<template>
  <iCard class="card">
    <div class="card--header">
      <div class="card--header--item">
        {{ language('BIDDING_JINGJIAGAOZHISHU', '竞价告知书') }}
      </div>
      <div class="card--header--item card--header--item--btn">
        <el-checkbox
          :value="readed"
          @change="handleReaded"
        />
        <span class="card--header--item--read">{{ language('BIDDING_WYYDBJSYXTK','我已阅读并接受以下条款') }}</span>
        <iButton @click="handleOK" plain>{{ language('BIDDING_JUJUE', '拒绝') }}</iButton>
        <iButton @click="handleOK('ok')" plain>{{ language('BIDDING_TONGYI', '同意') }}</iButton>
      </div>
    </div>
  </iCard>
</template>
<script>
import { iCard, iButton } from "rise";

export default {
  components: {
    iCard,
    iButton,
  },
  data() {
    return {
      readed: false,
    };
  },
  created() {},
  mounted() {},
  methods: {
    handleCancel() {
      //   this.$emit("update:show", false);
      this.$router.go(-1);
    },
    handleReaded() {
      this.readed = !this.readed;
    },
    handleOK(status) {
      if (this.readed) {
        this.handleCancel();
      } else if (status === "ok") {
        // this.$message.error("请先完成条款阅读并勾选“我已阅读以上条款”");
        this.$message.error(this.language('BIDDING_QXWCTKYDBGXWYYDYSTK','请先完成条款阅读并勾选“我已阅读以上条款”'));
      } else {
        this.handleCancel();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.card {
  width: 100%;
  margin: 1.875rem 2.5rem;
  /* margin-bottom: 30px; */
  .card--header {
    display: flex;
    justify-content: space-between;
    .card--header--item {
      font-size: 12px;
      /* font-weight: bold; */

      .card--header--item--read{
        padding: 0 2.5rem 0 .5rem;
      }
    }
    .card--header--item--btn {
      ::v-deep .el-button--default {
        min-width: 150px;
      }
    }
  }
  .card--body {
    height: 35rem;
    margin-top: 20px;
  }
}
</style>
