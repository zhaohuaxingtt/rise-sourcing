<template>
  <iPage class="partsprocureHome">
    <DetailsSearch @reset="handleReset" @sure="handleSure" :isModelItem="true" />

    <iCard>
      <DetailsTable />
    </iCard>
  </iPage>
</template>

<script>
import {iPage, iMessage, iDialog, iButton, iCard} from "rise";
import DetailsSearch from "./components/detailsSearch";
import DetailsTable from "./components/detailsTable";

export default {
  components: {
    iPage,
    iMessage,
    iDialog,
    iButton,
    DetailsSearch,
    DetailsTable,
    iCard
  },

  methods: {

    //  查询
    handleSure(form){
      console.log('handleSure', form);
    },

    //  重置
    handleReset(form){
      console.log('handleReset', form);
    }
  }
}
</script>

<style>

</style>