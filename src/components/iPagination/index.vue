<template>
  <div class="i-pagination clearFloat">
    <p class="page-info" v-if="showPageInfo">显示<span class="item">{{ currentPage }}</span>条到第<span class="item">{{ lastCount }}</span>条记录，共<span class="item">{{ $props.total }}</span>条记录</p>
    <el-pagination class="pagination" ref="pagination" v-bind="$props" v-on="$listeners" :layout="_layout" @current-change="handleCurrentChange" @size-change="handleSizeChange" >
      <slot></slot>
    </el-pagination>
  </div>
</template>

<script>
import { Pagination } from 'element-ui';
export default {
  props: {
    ...Pagination.props,
    showPageInfo: { type: Boolean, default: true },
    prevText: { type: String, default: '上一页' },
    nextText: { type: String, default: '下一页' }
  },
  data() {
    return {
      firstCount: 0,
      lastCount: 0
    }
  },
  watch: {
    total(total) {
      this.$nextTick(() => this.updateCount(this.currentPage, this.pageSize, total))
    }
  },
  mounted() {
    this.updateCount(this.currentPage, this.pageSize, this.total)
  },
  methods: {
    handleCurrentChange(currentPage) {
      this.$emit('update:currentPage', currentPage)
      this.$emit('current-change', currentPage)
      this.$nextTick(() => this.updateCount(currentPage, this.pageSize, this.total))
    },
    handleSizeChange(pageSize) {
      this.$emit('update:pageSize', pageSize)
      this.$emit('size-change', pageSize)

      this.$nextTick(() => this.updateCount(this.currentPage, pageSize, this.total))
    },
    updateCount(currentPage, pageSize, total) {
      this.firstCount = total > 0 ? (currentPage - 1) * pageSize + 1 : 0
      const ideal = currentPage * pageSize
      if (total > 0) {
        if (ideal < total) {
          this.lastCount = ideal
        } else {
          this.lastCount = ideal - (ideal - total)
        }
      } else {
        this.lastCount = 0
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.i-pagination {
  .page-info {
    float: left;
    height: 35px;
    line-height: 35px;
    font-size: 14px;
    font-family: Arial;
    font-weight: 400;
    color: #8C98AC;
    opacity: 1;

    .item {
      padding: 0 2.5px;
    }
  }

  ::v-deep .pagination {
    padding: 0;

    .el-pager {
      .more {
        box-shadow: none!important;
        margin: 0 5px!important;
        padding: 0!important;
        min-width: 1em!important;
        width: 1em!important;
      }

      .el-icon-more::before {
        content: "..."!important;
      }
    }

    .btn-prev,
    .btn-next {
      min-width: 35px;
      height: 35px;
      line-height: 35px;
      background: $color-white;
      border-radius: 5px;

      span {
        height: 35px;
        line-height: 35px;
        padding: 0 18px;
      }

      &:not([disabled]):hover {
        color: #1663F6;
      }
    }

    .el-pager {
      li {
        min-width: 35px;
        height: 35px;
        line-height: 35px;
        border-radius: 5px;
      }

      li.number {
        font-weight: 100;
        font-size: 14px
      }

      li {
        background: $color-white;
      }

      li:not(.disabled).active {
        background: #1663F6;
        color: $color-white;

        &:hover {
          color: $color-white;
        }
      }

      li:not(.disabled):hover {
        color: #1663F6;
      }
    }

    .el-pagination__jump {
      height: 35px;
      line-height: 35px;
      margin-left: 12px;

      .el-input {
        width: 35px;
        height: 35px;
        margin: 0 10px;

        input {
          width: 35px;
          height: 35px;
          line-height: 35px;
          border: 0;
          background: $color-white;
          border-radius: 5px;
          box-shadow: 0px 0px 8px rgba(124, 124, 124, 0.16);
        }
      }
    }

    .el-pagination__sizes {
      height: 35px;

      .el-select {
        .el-input {
          height: 35px;
          margin: 0 10px;

          input {
            height: 35px;
            line-height: 35px;
            border: 0;
            background: $color-white;
            border-radius: 5px;
            box-shadow: 0px 0px 8px rgba(124, 124, 124, 0.16);
          }
        }
      }
    }

    &.is-background {
      .btn-prev,
      .btn-next {
        box-shadow: 0px 0px 8px rgba(124, 124, 124, 0.16);
      }

      .el-pager {
        li {
          box-shadow: 0px 0px 8px rgba(124, 124, 124, 0.16);
        }
      }
    }
  }
}
</style>