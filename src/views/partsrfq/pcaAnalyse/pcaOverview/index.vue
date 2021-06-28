<template>
  <div>
    <theSearch @getTableList="getTableList" class="margin-bottom20" name="theSearch"/>
    <theTable ref="theTable" pageType="pageType"/>
  </div>
</template>

<script>
import theSearch from './components/theSearch';
import theTable from './components/theTable';

export default {
  props: {
    pageType: {
      type: String,
      default: ''
    }
  },
  components: {
    theSearch,
    theTable,
  },
  methods: {
    getTableList(req) {
      this.$refs.theTable.getTableList(req);
    },
  },
};
</script>

<style scoped>

</style>
