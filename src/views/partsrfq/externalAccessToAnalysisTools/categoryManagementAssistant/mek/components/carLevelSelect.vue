<style scoped>

</style>
<template>
    <el-checkbox-group v-model="checkedOptions"
                        class="checkList"
                        @change="changedCheckOptions">
    <el-checkbox v-for="(i, index) in carLevelOptions"
                    :key="index"
                    :label="i"></el-checkbox>
    </el-checkbox-group>
</template>

<script>
export default {
  name: "CarLevelSelect",
  props: {
      motorId: "",
      carLevelOptions: Array,
      orgChecked: Array
  },
  watch: {
      orgChecked: {
          handler(val) {
            this.checkedOptions = val;
          },
          immediate: true,
          deep: true
      }
  },
  data() {
      return {
          checkedOptions: []
      }
  },
  methods: {
      changedCheckOptions() {
          this.$emit('option-changed', this.motorId, this.checkedOptions);
      }
  }
}
</script>