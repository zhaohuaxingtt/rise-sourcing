<template>
  <div>
    <theSearch @getTableList="getTableList" class="margin-bottom20" name="theSearch"/>
  </div>
</template>

<script>
import theSearch from './components/theSearch'
export default {
   components: {
     theSearch
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
