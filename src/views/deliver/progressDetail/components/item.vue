<template>
  <div class="table-content">
    <div style="width:100%;height:50px;"></div>
    <template v-for="data in list">
      <row-item :data="data" :list="list" :header="header" @refresh="refresh" :key="data.num"></row-item>
      <template v-if="data.showChlid">
        <!-- 层级数据渲染 -->
        <template v-for="child in data.childList">
          <row-item :data="child" :list="list" :key="child.num" @refresh="refresh" :header="header"></row-item>
        </template>
      </template>
    </template>
  </div>
</template>

<script>
import rowItem from "./rowItem.vue";
  export default {
    components:{rowItem},
    name:'item',
    props:{
      header:{ type: Array, default: ()=>[]},
      list:{ type: Array, default: ()=>[]},
      point:{ type: Boolean, default: true},
    },
    methods:{
      change(data){
        data.showChlid = !data.showChlid
      },
      refresh(){
        this.$emit("refresh")
      }
    }
  }
</script>

<style lang="scss" scoped>
.table-content{
  ::v-deep .row-item{
    background-color: transparent;
      &:nth-child(even) {
        background-color: #f7faff;
      }
  }
}
.row-item{
  height: 50px;
  line-height: 50px;
  width: 100%;
  display: flex;
  flex-flow: row;
  font-size: 16px;
  font-weight: bold;
  .icon{
    width: 20px;
    text-align: center;
    display: inline-block;
  }
  .column-item{
    flex: 1;
    width: 100%;
    display: flex;
    flex-flow: column;
    text-align: right;
    border-right: 1px #ccc solid;
    .progress-box{
      padding: 10px 0;
    }
    .progress{
      width: 100%;
      height: 15px;
    }
    .point{
      height: 50%;
      font-size: 25px;
      line-height: 25px;
    }
    .green{
      background: #92d050;
    }
    .yellow{
      background: #ffc000;
    }
    .hui{
      background: #d9d9d9;
    }
    .point-green{
      color: #92d050;
    }
    .point-yellow{
      color: #ffc000;
    }
    .point-hui{
      color: #d9d9d9;
    }
  }
  .first-column-item{
    flex: none;
    width: 200px;
    border-right: 1px #ccc solid;
    .icon{
      color: #67C23A;
    }
  }
}
</style>