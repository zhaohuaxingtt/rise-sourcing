<template>
  <div>
    <div class="switch-box">
      <div v-permission="PURCHASE_MOULDBOOK_BMVIEW" :class="tableIndex === 1 ? 'onSwitch' : ''" @click="switchTable(1)">BM单视图</div>
      <div v-permission="PURCHASE_MOULDBOOK_MOULDVIEW" :class="tableIndex === 2 ? 'onSwitch' : ''" @click="switchTable(2)">模具视图</div>
    </div>

  
    <template v-if="tableIndex === 1">
      <kee-alive>
        <BmView />
      </kee-alive>
      
    </template>

    <template v-if="tableIndex === 2">
      <kee-alive>
        <MouldView />
      </kee-alive>
    </template>
    

    
    
  </div>
</template>

<script>
import {iPage, iMessage, iDialog, iButton, iNavMvp} from "rise";
import BmView from "./components/bmView";
import MouldView from "./components/mouldView";

export default {
  components: {
    BmView,
    MouldView
  },

  data(){
    return {
      tableIndex: 1,
    }
  },

  methods: {
    switchTable(i){
      this.tableIndex = i;
    }
  }
}
</script>

<style lang="scss" scoped>
.switch-box{
  display: flex;
  width: 224px;
  height: 35px;
  border-radius: 10px;
  overflow: hidden;
  color: #727272;
  font-size: 16px;
  text-align: center;
  line-height: 35px;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.08);
  margin-bottom: 20px;
  margin-top: 20px;

  div{
    flex: 1;
    cursor: pointer;
  }

  .onSwitch{
    background-color: #fff;
    color: #1660F1;
    font-weight: bold;
  }
}
</style>