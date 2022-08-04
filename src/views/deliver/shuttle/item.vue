<template>
<div class="table-content">
  <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
  <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
    <template v-for="(data,key) in list">
      <div :key="key" class="table-row">
        <el-checkbox label=""></el-checkbox>
        <div v-for="child in header" :key="child.props">
          <i class="el-icon-remove-outline icon" v-if="data.showChlid" @click="change(data)"></i>
        <i class="el-icon-circle-plus-outline icon" v-else  @click="change(data)"></i>
        {{data[child.props]}}</div>
      </div>
      <!-- <row-item :data="data" :list="list" :header="header" :key="key"></row-item> -->
      <template v-if="data.showChlid">
        <template v-for="(child,index) in data.children">
          <div :key="index">
            <el-checkbox v-for="city in cities" label="" :key="city">{{city}}</el-checkbox>
            <template>
              <span v-for="child in header" :key="child.props">{{data[child.props]}}</span>
            </template>
            <!-- <row-item :data="child" :list="list" :key="index" :header="header"></row-item> -->
          </div>
        </template>
      </template>
    </template>
  </el-checkbox-group>
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
    },
    data() {
      return {
        checkedCities: [],
        isIndeterminate:"",
        checkAll:'',
        cities:['上海', '北京', '广州', '深圳']
      }
    },
    methods:{
      change(data){
        data.showChlid = !data.showChlid
      },
      handleCheckAllChange(){

      },
      handleCheckedCitiesChange(){

      }
    }
  }
</script>

<style lang="scss" scoped>
.table-row{
  width: 100%;
  display: flex;
  flex-flow: row;
  font-size: 16px;
  align-items: center;
}
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
      color: #1660f1;
    }
  }
}
</style>