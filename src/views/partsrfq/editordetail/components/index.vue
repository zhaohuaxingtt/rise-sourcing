<!--
 * @Author: YoHo
 * @Date: 2022-01-04 09:40:10
 * @LastEditTime: 2022-01-07 18:11:38
 * @LastEditors: YoHo
 * @Description: 
-->
<template>
  <div>
    <iDialog
      :visible.sync="tipsVislble"
      width="50%"
      title="RFQ任务提示"
      append-to-body
      class="dunsTipsDiogog"
    >
      <div class="text">
        当前RFQ有一下任务未完成，请及时处理
        <template v-for="item in todoList">
          <p class="info" :key="item.name" v-if="item.status!='已完成'">
            <icon symbol :name="iconName[item.status]" /> {{ item.name }}
          </p>
        </template>
        <div class="footer">
          <iButton @click="close">跳过</iButton>
          <iButton @click="goto('4')">前往任务列表</iButton>
        </div>
      </div>
    </iDialog>
  </div>
</template>

<script>
import { iDialog, icon, iButton } from "rise";
import { iconName } from "@/views/partsrfq/editordetail/components/rfqPending/components/partDetaiList/data";
export default {
  components: {
    iDialog,
    icon,
    iButton
  },
  props:{
    todoObj:{
      type: Object,
      default:()=>{return {}}
    },
    tipsVislble:{
      type: Boolean,
      default: false,
    }
  },
  computed:{
    todoList(){
      let list = []
      Object.keys(this.todoObj).forEach(k=>{
        this.todoObj[k].status!='已完成'
        list.push(this.todoObj[k])
      })
      return list
    }
  },
  data() {
    return {
      iconName
    }
  },
  methods:{
    close(){
      this.$emit("update:tipsVislble", false)
    },
    goto(index){
      this.$emit('changeActivityTabIndex',index)
    }
  }
};
</script>

<style lang="scss" scoped>
.text{
    font-weight: bold;
  .info{
    font-size: 14px;
    margin: 8px 0;
    text-indent: 20px;
  }
}
.footer{
  text-align: right;
  padding-bottom: 20px;
}
</style>