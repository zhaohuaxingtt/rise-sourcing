<template>
  <el-form-item :label="label" class="date-range-box">
    <el-row gutter="5">
      <el-col :span="11">
        <iDatePicker
          value-format="yyyy-MM-dd"
          type="date"
          v-model="startDate"
          :picker-options='pickerOptionsStart'
          @change="changeStartDate"
        />
      </el-col>
      <el-col
        :span="2"
        class="middle"
      >至</el-col>
      <el-col :span="11" style="padding-right: 0;">
        <iDatePicker
          value-format="yyyy-MM-dd"
          type="date"
          v-model="endDate"
          @change="changeEndDate"
          :picker-options='pickerOptionsEnd'
        />
      </el-col>
    </el-row>
  </el-form-item>
</template>

<script>
import { iDatePicker } from "rise";
export default {
  components: {
    iDatePicker,
  },
  props: {
    startDateProps: { type: String },
    endDateProps: { type: String },
    label: { type: String, default: "时间范围选择" },
    pickerOptionsStartProps: {
      type: Object,
      default: ()=>{
        return {
          disabledDate: false,
        }
      }
    },
    pickerOptionsEndProps: {
      type: Object,
      default: ()=>{
        return {
          disabledDate: false,
        }
      }
    },
    pickerOptionsEndFun: {
      type: Number,
      default: () => {
        return 999999999999999999999;
      }
    }
  },
  data() {
    return {
      startDate: "",
      endDate: "",
      pickerOptionsStart: this.pickerOptionsStartProps,
      pickerOptionsEnd: this.pickerOptionsEndProps,
    };
  },
  mounted() {
    this.initDate();
  },
  methods: {
    initDate() {
      this.startDate = this.startDateProps;
      this.endDate = this.endDateProps;
    },
    changeStartDate(e) {
      var date = new Date(e);
      let time = date.valueOf();
      if (this.endDate) {
        let timeEnd = new Date(this.endDate).valueOf();
        if (time >= timeEnd) {
          this.endDate = "";
          this.$emit("change-end", this.endDate);
        }
      }
      this.$emit("change-start", this.startDate);
      this.pickerOptionsEnd = {
        disabledDate: (a) => {
          let newDate = a.valueOf();
          return newDate < date - (24 * 60 * 60 * 1000) || newDate > this.pickerOptionsEndFun;
        }
      };
    },
    changeEndDate(e) {
      var date = new Date(e);
      let time = date.valueOf();
      if (this.startDate) {
        let timeStart = new Date(this.startDate).valueOf();
        if (time < timeStart) {
          this.endDate = "";
        }
      }
      this.$emit("change-end", this.endDate);
    },
  },
  watch: {
    
  },
};
</script>

<style scoped lang="scss">
.date-range-box {
  width: 538px !important;

  .el-row {
    width: 538px !important;
    display: inline-block;
  }

  .middle {
    height: 35px;
    line-height: 35px;
    text-align: center;
    background: #F8F8FA;
  }
}
</style>
