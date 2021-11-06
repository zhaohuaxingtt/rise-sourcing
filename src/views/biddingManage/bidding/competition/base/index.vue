<template>
  <div>
    <hsBidding />
  </div>
</template>

<script>
import hsBidding from "./components/hsBidding.vue";

export default {
  components: {
    hsBidding,
  },
  data() {
    return {};
  },
  methods: {},
};
</script>
<style lang="scss" scoped>
.form-itme {
  display: flex;
  .form-item-left {
    font-size: 1.5rem;
    font-weight: bold;
  }
  .form-item-right {
    width: 8rem;
    height: 2rem;
    font-size: 1rem;
    box-shadow: 0 2px 4px rgb(0 0 0 / 12%), 0 0 6px rgb(0 0 0 / 4%);
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #1763f7;
    font-weight: bold;
    margin-left: 3rem;
  }
}
</style>
