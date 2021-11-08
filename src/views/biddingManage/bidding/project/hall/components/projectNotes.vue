<template>
  <iCard>
    <iTableCustom
      ref="tableDataForm"
      :data="tableListDateSub"
      :columns="projectNotes"
      :loading="tableLoading"
    >
    </iTableCustom>
    <iPagination
      v-update
      @current-change="handleCurrentChange($event)"
      background
      :page-sizes="page.pageSizes"
      :page-size="page.pageSize"
      prev-text="上一页"
      next-text="下一页"
      layout="prev,pager,next,jumper"
      :current-page="page.currPage"
      :total="page.total"
    />
  </iCard>
</template>

<script>
import { iCard, iPagination } from "rise";
import iTableCustom from "@/components/iTableCustom";
import { projectNotes} from "./data";
import { getProjectRemarks } from "@/api/bidding/bidding";
import { pageMixins } from "@/utils/pageMixins";

export default {
  mixins: [pageMixins],
  components: {
    iCard,
    iPagination,

    iTableCustom,
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
        this.ruleForm = val;
      },
    },
  },
  data() {
    return {
      id: 0,
      ruleForm: {},
      selectedTableData: [],
     projectNotes,
      projectNotesList: [],
      pageSize:10,
      pageNum:1,
    };
  },
  computed: {
    tableListDateSub(){
      return this.projectNotesList?.slice((this.pageNum-1)*this.pageSize,(this.pageNum-1)*this.pageSize+this.pageSize);
    }
  },
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
    handleCurrentChange(e) {
      this.page.currPage = e;
      this.pageNum=e;
    },
    async query(e) {
      const res = await getProjectRemarks({
        id: e,
      });
      this.projectNotesList = res;
      this.page.total = res?.length;
      this.page.currPage = 1;
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
