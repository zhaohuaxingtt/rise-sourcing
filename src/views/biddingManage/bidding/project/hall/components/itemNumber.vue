<template>
  <div>
    <theTable
      v-for="(item, i) in ruleForm.supplierProductMap"
      :key="item.id"
      :tableListData="item"
      :columns="ruleForm.isTax === '01' ? itemNumber : itemNumbers"
      :tableLoading="tableLoading"
      :title="i"
      :form="ruleForm"
    >
    </theTable>
  </div>
</template>

<script>
import theTable from "./theTable.vue";
import { getItemRanking } from "@/api/bidding/bidding";
import { itemNumber, itemNumbers } from "./data";
export default {
  components: {
    theTable,
  },
  props: {
    value: {
      type: Object,
      default: () => ({}),
    },
  },
  watch: {
    value: {
      immediate: true,
      handler(val) {
        this.ruleForm = { ...val };
      },
    },
  },
  data() {
    return {
      id: 0,
      ruleForm: {},
      itemNumber,
      itemNumbers,
    };
  },
  computed: {},
  async created() {
    this.id = this.$route.params.id;
  },
  mounted() {
    this.handleSearchReset();
  },
  methods: {
    handleSearchReset() {
      let param = this.id;
      this.query(param);
    },
    async query(e) {
      const res = await getItemRanking({
        id: e,
      });
      this.ruleForm = { ...res };
    },
  },
};
</script>

<style lang="scss" scoped>
.inquiry {
  &__header {
    &-title {
      display: flex;
      justify-content: space-between;
      font-size: 28px;
      font-weight: bold;
      .el-button--default {
        min-width: 130px;
        margin-bottom: 10px;
      }
    }
  }
  &__navtab {
    margin-bottom: 15px;
    &-item {
      .el-button {
        margin-left: 2px;
        background-color: #fcfdfd;
        color: #ccc;
      }
      .el-button.active {
        color: #1763f7;
        box-shadow: 0 0 0.1875rem rgb(0 38 98 / 15%);
        border-color: transparent;
      }
    }
  }
}
.card {
  margin-bottom: 30px;
}

::v-deep .el-table {
  .el-form-item {
    margin-top: 0;
    margin-bottom: 0;
  }
}

::v-deep .el-form-item {
  .el-input.is-disabled {
    .el-input__inner {
      text-align: center;
    }
  }
  .el-select .el-input.is-disabled {
    .el-input__suffix {
      display: none;
    }
  }
}

::v-deep .cardHeader {
  position: relative;

  .collapse {
    pointer-events: none;
  }
}
.icon-success {
  color: green;
  font-size: 1.8rem;
  position: absolute;
  left: 120px;
  top: 35px;
  z-index: 10;
}
</style>
