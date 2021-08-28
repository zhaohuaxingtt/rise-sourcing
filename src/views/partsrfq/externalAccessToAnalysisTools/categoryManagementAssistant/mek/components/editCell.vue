<!--
 * @Author: your name
 * @Date: 2021-08-06 11:16:19
 * @LastEditTime: 2021-08-27 14:53:10
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\views\partsrfq\externalAccessToAnalysisTools\categoryManagementAssistant\mek\components\editcell.vue
-->
<template>
  <div class="edit-cell">
    <!-- <el-tooltip v-if="!editMode && !showInput"
                :placement="toolTipPlacement"
                :open-delay="toolTipDelay"
                :content="toolTipContent">
     

    </el-tooltip> -->
    <div tabindex="0"
         @keyup.enter="onFieldClick"
         v-if="!editMode && !showInput">
      <slot name="content"></slot>
    </div>
    <component :is="editableComponent"
               v-if="editMode || showInput"
               ref="input"
               @focus="onFieldClick"
               @keyup.enter.native="onInputExit"
               v-on="listeners"
               v-bind="$attrs"
               v-model="model">
      <slot name="edit-component-slot"></slot>
    </component>
  </div>
</template>
<script>
export default {
  name: "editable-cell",
  inheritAttrs: false,
  props: {
    value: {
      type: String,
      default: ""
    },
    toolTipContent: {
      type: String,
      default: "Click to edit"
    },
    toolTipDelay: {
      type: Number,
      default: 500
    },
    toolTipPlacement: {
      type: String,
      default: "top-start"
    },
    showInput: {
      type: Boolean,
      default: false
    },
    editableComponent: {
      type: String,
      default: "el-input"
    },
    closeEvent: {
      type: String,
      default: "blur"
    }
  },
  data () {
    return {
      editMode: false
    };
  },
  mounted () {

  },
  computed: {
    model: {
      get () {
        return this.value;
      },
      set (val) {
        console.log(val)
        this.$emit("input", val);
      }
    },
    listeners () {
      return {
        [this.closeEvent]: this.onInputExit,
        ...this.$listeners
      };
    }
  },
  methods: {
    onFieldClick () {
      this.editMode = true;
      this.$nextTick(() => {
        let inputRef = this.$refs.input;
        if (inputRef) {
          inputRef.focus();
        }
      });
    },
    onInputExit () {
      this.editMode = false;
    },
    onInputChange (val) {
      this.$emit("input", val);
    }
  }
};
</script>
<style>
</style>