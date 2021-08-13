<template>
  <div
      v-if="notHaveChildren(currentChildren) && editStatus"
      class="checkBoxStyle"
      :class="{'checkBoxStyleActive':  treeDataSelect[categoryChildren.name].includes(currentChildren.name)}"
      @click="handleSelect({props:categoryChildren, value:currentChildren})"
  >
    <div class="pitchOn"></div>
  </div>
</template>

<script>
export default {
  props: {
    treeDataSelect: {
      type: Object,
      default: () => {
        return {};
      },
    },
    currentChildren: {
      type: Object,
      default: () => {
        return {};
      },
    },
    categoryChildren: {
      type: Object,
      default: () => {
        return {};
      },
    },
    editStatus: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    notHaveChildren(item) {
      return item.children === null;
    },
    handleSelect({props, value}) {
      const res = {
        props,
        value,
      };
      this.$emit('handleSelect', res);
    },
  },
};
</script>

<style scoped lang="scss">
.checkBoxStyle {
  position: relative;
  width: 20px;
  height: 20px;
  margin-top: 2px;
  margin-right: 15px;
  border: 1px solid #1763F7;
  border-radius: 5px;
  cursor: pointer;

  .pitchOn {
    position: absolute;
    left: 50%;
    top: 40%;
    width: 6px;
    height: 13px;
    border-bottom: 2px solid #FFFFFF;
    border-right: 2px solid #FFFFFF;
    transform: translate(-50%, -50%) rotate(45deg);
  }
}

.checkBoxStyleActive {
  background: #1763F7;
}
</style>
