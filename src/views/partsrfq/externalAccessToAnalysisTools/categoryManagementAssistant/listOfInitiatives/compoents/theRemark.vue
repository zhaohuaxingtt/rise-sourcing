<template>
  <div>
    <el-popover
        placement="top-start"
        width="400"
        trigger="hover"
        :content="children.context">
      <div
          :class="{'remark': !exportStatus, 'remarkExport': exportStatus}"
          v-if="children.context && !editStatus"
          slot="reference">
        <div :class="{'textBox': !exportStatus, 'textBoxExport': exportStatus}">{{ children.context }}</div>
      </div>
    </el-popover>
  </div>
</template>

<script>
export default {
  props: {
    children: {
      type: Object,
      default: () => {
        return {};
      },
    },
    editStatus: {
      type: Boolean,
      default: false,
    },
    exportStatus: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style scoped lang="scss">
.remark {
  margin-top: 10px;
  height: 55px;
  background: #F8F8FA;
  border-radius: 5px;

  .textBox {
    display: -webkit-box; //必须结合的属性 ，将对象作为弹性伸缩盒子模型显示 。
    text-overflow: ellipsis; //可以用来多行文本的情况下，用省略号“…”隐藏超出范围的文本 。
    overflow: hidden;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    word-wrap: break-word; //中文换行
    word-break: break-all; //英文换行
    height: 42px;
    font-size: 14px;
    line-height: 16px;
    color: #8C98AC;
    padding: 10px 24px;
  }
}

.remarkExport {
  margin-top: 10px;
  background: #F8F8FA;
  border-radius: 5px;

  .textBoxExport {
    word-wrap: break-word; //中文换行
    word-break: break-all; //英文换行
    font-size: 14px;
    line-height: 16px;
    color: #8C98AC;
    padding: 10px 24px;
  }
}
</style>
