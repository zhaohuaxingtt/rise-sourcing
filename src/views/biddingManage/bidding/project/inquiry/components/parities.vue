<template>
  <el-form
    :model="ruleForm"
    :rules="rules"
    ref="ruleForm"
    :hideRequiredAsterisk="true"
    :disabled="ruleForm.biddingStatus !== '01'"
  >
    <!-- 汇率 -->
    <div
      class="item"
      v-for="(item, index) in ruleForm.exchangeRates"
      :key="item.id"
    >
      <div class="item-checkbox">
        <el-checkbox @change="handelCheck($event, item)"></el-checkbox>
      </div>
      <div class="item-content1">100</div>
      <div class="item-select">
        <iFormItem
          :prop="'exchangeRates.' + index + '.currency'"
          :rules="{
            required: true,
            message: '不能为空',
            trigger: 'change',
          }"
        >
          <iSelect
            v-model="item.currency"
            @change="handleCurrency($event, item, index)"
          >
            <el-option
              v-for="(item, index) in paritiesList"
              :key="index"
              :value="item.code"
              :label="item.code"
            >
            </el-option>
          </iSelect>
        </iFormItem>
      </div>
      <div class="item-content2">=</div>
      <div class="item-input">
        <iFormItem :prop="'exchangeRates.' + index + '.exchangeRate'">
          <iInput v-model="item.exchangeRate" disabled></iInput>
        </iFormItem>
      </div>
      <div class="item-content3">人民币</div>
    </div>
  </el-form>
</template>

<script>
import { iInput, iFormItem, iSelect } from "rise";
import { getParities } from "@/api/mock/mock";
export default {
  components: {
    iInput,
    iFormItem,
    iSelect,
  },
  props: {
    value: {
      type: Object,
      default: () => ({}),
    },
    paritiesList: {
      type: Array,
      default: () => [],
    },
  },
  watch: {
    value: {
      immediate: true,
      handler(val) {
        this.ruleForm = val;
        console.log(this.ruleForm);
      },
    },
    ruleForm(val) {
      this.$emit("input", val);
    },
  },
  data() {
    return {
      ruleForm: {},
      currency: [],
    };
  },
  computed: {},
  methods: {
    handleCurrency(val, { id }, ind) {
      let data = this.ruleForm.exchangeRates.filter((item, index) => {
        if (item.id == id) {
          if (val === "RMB") {
            this.$set(item, "exchangeRate", 100);
          }
          getParities(val).then((res) => {
            sessionStorage.setItem("currency", [res.data[0]?.currency]);
            this.currency = sessionStorage.getItem("currency");
            this.$set(
              item,
              "exchangeRate",
              (this.currency * 100).toFixed(2).replace(/[.]?0+$/, "")
            );
            if (val === "RMB") {
              this.$set(item, "exchangeRate", 100);
            }
          });
        }
      });
      this.$emit("handle-currencys", val);
    },
    handelCheck(val, { id }) {
      this.$emit("selectDel", { val, id });
    },
  },
};
</script>

<style lang="scss" scoped>
.item ::v-deep {
  display: flex;
  .item-checkbox {
    margin-top: 0.5rem;
  }
  .item-content1 {
    width: 8rem;
    margin-left: 5rem;
    margin-top: 0.5rem;
  }
  .item-select {
    width: 30rem;
  }
  .item-content2 {
    margin: 0 5rem;
    margin-top: 0.5rem;
  }
  .item-input {
    width: 30rem;
  }
  .item-content3 {
    margin-left: 3rem;
    margin-top: 0.5rem;
  }
  .el-input.is-disabled .el-input__inner {
    background-color: #f4f5f6;
    color: #000;
    text-align: center;
  }
}
</style>
