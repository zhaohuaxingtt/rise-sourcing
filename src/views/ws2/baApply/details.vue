<template>
  <iPage class="partsprocureHome">
    <DetailsSearch @reset="handleReset" @sure="handleSure" :isModelItem="true" />

    <iCard>
      
    </iCard>
  </iPage>
</template>

<script>
import {iPage, iMessage, iDialog, iButton} from "rise";
import DetailsSearch from "./components/detailsSearch";

export default {
  components: {
    iPage,
    iMessage,
    iDialog,
    iButton,
    DetailsSearch
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