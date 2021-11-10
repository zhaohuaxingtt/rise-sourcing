<!--
 * @Author: your name
 * @Date: 2021-10-09 17:16:19
 * @LastEditTime: 2021-10-25 19:33:01
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: front-portalsrcviewsmtz\annualGeneralBudget\replenishmentManagement\components\mtzReplenishmentOverview\components\comboBox.vue
-->
<template>
  <div>
    <iInput :disabled="disabled"
            :placeholder="placeholder?placeholder:$t('pwCombobox.label.maxInputTip1',{maxNum:maxNum})"
            :size="size"
            v-model="inputVal"
            @keyup.enter.native="keyupEnter"
            @keyup.native.stop="watchComboBoxInputValue('input')">
      <el-select v-if="selectOptions.length>0"
                 v-model="selectVal"
                 slot="prepend"
                 :placeholder="$t('pwCombobox.label.select')"
                 :size="size"
                 style="width:100px;">
        <el-option v-for="(option,index) in selectOptions"
                   :label="option.label"
                   :value="option.value"
                   :disabled="option.disabled"
                   :key="index"></el-option>
      </el-select>
      <i slot="append"
         class="el-icon-edit iButton"
         @click.stop="openComboBoxDialog"
         style="cursor: pointer;"></i>
    </iInput>
    <el-dialog :visible.sync="editDialogVisible"
               :modal="false"
               width="400px">
      <iInput :placeholder="editPlaceholder?editPlaceholder:$t('pwCombobox.label.maxInputTip2')"
              type="textarea"
              size="small"
              :rows="6"
              v-model="textareaValue"
              @keyup.native="watchComboBoxInputValue('textarea')">
      </iInput>
      <br>
      <!-- <span>
        {{$t('pwCombobox.label.total')}}<strong style="color: #abcdef;font-size: 25px;"> {{ currentNum }} </strong>{{$t('pwCombobox.label.item')}}<br>
        {{$t('pwCombobox.label.allowInput')}}<strong style="color: #67c23a;font-size: 25px;"> {{ maxNum }} </strong>{{$t('pwCombobox.label.item')}} <br>
        <span style="color: #fb5555">{{$t('pwCombobox.label.overTip')}}</span>
      </span> -->
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="editDialogVisible = false">{{language('QUXIAO','取消')}}</el-button>
        <el-button @click="clearInputData">{{language('QINGCHU','清除')}}</el-button>
        <el-button type="primary"
                   @click="confirmComboBoxInput">{{language('BAOCUN','保存')}}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { iMessage, iInput } from 'rise'
export default {
  name: "PwCombobox",
  components: {
    iInput
  },
  props: {
    value: {
      type: [Object, Array],
      default: function () {
        if ((this.options && this.options.length > 0) || this.groupCode) {
          return {
            inputValue: [],
            selectValue: this.selectOptions.length > 0 ? this.selectOptions[0].value : null
          };
        } else {
          return [];
        }
      }
    },
    disabled: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String,
      default: null
    },
    editPlaceholder: {
      type: String,
      default: null
    },
    dialogTitle: {
      type: String,
      default: function () {
        return this.$t('pwCombobox.label.title');
      }
    },
    itemLength: {
      type: Number,
      default: 500
    },
    maxNum: {
      type: Number,
      default: 100
    },
    options: {
      type: Array,
      default: function () {
        return [];
      }
    },
    size: {
      type: String,
      default: ''
    },
    groupCode: {
      type: String,
      default: ''
    }
  },
  mounted: function () {
    var vm = this;
    vm.$nextTick(function () {
      var vm = this;
      if (!vm.groupCode && vm.options.length === 0) {
        vm.currentNum = vm.value ? vm.value.length : 0;
      } else {
        vm.currentNum = vm.value && vm.value.inputValue ? vm.value.inputValue.length : 0;
        vm.loadOptions();
      }
    })
  },
  data: function () {
    return {
      inputVal: this.value ? (this.value.inputValue ? this.value.inputValue.join(',') : this.value.join(',')) : '',
      selectVal: this.value && this.value.selectValue ? this.value.selectValue : '',
      oldSelectVal: '',
      textareaValue: null,
      currentNum: 0,
      editDialogVisible: false,
      selectOptions: this.options
    }
  },
  watch: {
    value: function (val) {
      var vm = this;
      if (!vm.groupCode && vm.options.length === 0) {
        vm.inputVal = val ? _.trim(val.join(',')) : '';
      } else {
        vm.inputVal = val ? _.trim(val.inputValue.join(',')) : '';
        vm.selectVal = val ? val.selectValue : (vm.oldSelectVal ? vm.oldSelectVal : (vm.selectOptions.length ? vm.selectOptions[0].value : null));
      }
    },
    editPlaceholder: {
      handler (val) {
        console.log(val, "aaaaa")
      }
    },
    inputVal: function (newVal) {
      if (this.options.length > 0 || this.selectOptions.length > 0) {
        this.oldSelectVal = this.selectVal;
        if (newVal) {
          this.$emit('input', {
            inputValue: newVal ? newVal.split(/[\n,]/g) : [],
            selectValue: this.selectVal
          });
        } else {
          this.$emit('input', null);
        }
      } else {
        this.$emit('input', newVal ? newVal.split(/[\n,]/g) : []);
      }
    },
    textareaValue: function (newVal) {
      var vm = this;
      if (newVal) {
        // 过滤掉空元素
        var valArr = newVal.split(/[\n,]/g).filter(function (item) {
          return item.trim() !== "";
        });
        this.currentNum = valArr ? valArr.length : 0;
      }
    },
    selectVal: function (newVal) {
      if (this.selectOptions.length > 0) {
        if (this.inputVal) {
          this.$emit('input', {
            inputValue: this.inputVal ? this.inputVal.split(/[\n,]/g) : [],
            selectValue: newVal
          });
        } else {
          this.$emit('input', null);
        }
      }
    }
  },
  methods: {
    keyupEnter: function () {
      this.$emit('keyupEnter');
    },
    loadOptions: function () {
      var vm = this;
      if (!vm.groupCode || vm.options.length > 0) {
        return;
      }
      vm.$http.get('pf/dict/findByGroupCodeForSelect?groupCode=' + vm.groupCode).then(function (response) {
        vm.selectOptions = response.data.data;
        if (vm.selectOptions.length > 0) {
          vm.selectVal = vm.selectOptions[0].value;
        }
      });
    },
    openComboBoxDialog: function () {
      console.log(11111)
      var vm = this;
      if (vm.disabled) return;
      vm.textareaValue = vm.inputVal ? _.trim(vm.inputVal.replace(/[,，]/g, '\n')) : null;
      vm.editDialogVisible = true;
    },
    clearInputData: function () {
      this.textareaValue = null;
      this.inputVal = null;
      this.editDialogVisible = false;
    },
    confirmComboBoxInput: function () {
      var vm = this;
      var tempVal = null;
      if (vm.textareaValue) {
        tempVal = _.trim(vm.textareaValue).split(/[\n,]/g).filter(function (item) {
          return item.trim() !== "";
        });
      }
      vm.inputVal = tempVal ? tempVal.join(",") : null;
      vm.editDialogVisible = false;
    },
    watchComboBoxInputValue: function (type) {
      var vm = this;
      if (type === "input") {
        var valArr = vm.inputVal.split(/[,，]/g);
        valArr = valArr.map(function (item) {
          var tempStr = item;
          if (item.length >= vm.itemLength) {
            tempStr = tempStr.substring(0, vm.itemLength);
          }
          return tempStr;
        });
        vm.inputVal = valArr.splice(0, valArr.length).join(",");
        if (valArr.length > vm.maxNum) {
          vm.inputVal = valArr.splice(0, vm.maxNum).join(",");
          iMessage.warn({ message: vm.$t('pwCombobox.label.cutTip') });
        }
      } else {
        var valArr = vm.textareaValue.split(/[\n,]/g);
        valArr = valArr.map(function (item) {
          var tempStr = item;
          if (item.length >= vm.itemLength) {
            tempStr = tempStr.substring(0, vm.itemLength);
          }
          return tempStr;
        });
        vm.textareaValue = valArr.join(",").replace(/[,]/g, '\n');
        var newValArr = valArr.filter(function (item) {
          return item.trim() !== "";
        });
        if (newValArr.length > vm.maxNum) {
          vm.textareaValue = newValArr.splice(0, vm.maxNum).join(",").replace(/[,]/g, '\n');
          iMessage.warn({ message: vm.$t('pwCombobox.label.cutTip') });
        }
      }
    }
  }
}

</script>

<style lang="scss" scoped>
::v-deep .el-input-group__append {
  box-shadow: 0 0 0.1875rem rgb(0 38 98 / 15%);
  border-color: transparent;
}
</style>
