<template>
<div class="table-content">
  <template v-for="(data,key) in list">
    <row-item :data="data" :list="list" :header="header" :key="key"></row-item>
    <!-- <div class="row-item">
      <div class="first-column-item">
        <template v-if="data.children">
          <i class="el-icon-remove-outline icon" v-if="data.showChlid" @click="change(data)"></i>
          <i class="el-icon-circle-plus-outline icon" v-else  @click="change(data)"></i>
        </template>
        {{data.name}}
      </div>
      <div class="column-item" :key="index" v-for="(item,index) in list">
        <template v-if="(data.rang||[]).includes(item)">
          <template v-if="point">
            <i class="el-icon-caret-top point" :style="{width:(data.rang.indexOf(item)==data.rang.length-1)&&data.width||'100%'}" :class="data.status&&'point-hui'"></i>
            <i class="el-icon-caret-top point" :style="{width:(data.rang.indexOf(item)==data.rang.length-1)&&data.width||'100%'}" :class="data.status==1?'point-green':data.status==2?'point-yellow':''"></i>
          </template>
          <template v-else>
            <div class="progress-box">
              <div class="progress" :style="{width:(data.rang.indexOf(item)==data.rang.length-1)&&data.width||'100%'}" :class="data.status&&'hui'"></div>
              <div class="progress" :style="{width:(data.rang.indexOf(item)==data.rang.length-1)&&data.width||'100%'}" :class="data.status==1?'green':data.status==2?'yellow':''"></div>
            </div>
          </template>
        </template>
      </div>
    </div> -->
    <template v-if="data.showChlid">
      <template v-for="(child,key) in data.children">
        <row-item :data="child" :list="list" :key="key" :header="header"></row-item>
        <!-- <div class="first-column-item">
          <template v-if="child.children">
            <i class="el-icon-remove-outline icon" v-if="child.showChlid" @click="change(child)"></i>
            <i class="el-icon-circle-plus-outline icon" v-else  @click="change(child)"></i>
          </template>
          <span v-else class="icon"></span>
          {{child.name}}
        </div>
        <div class="column-item" :key="index" v-for="(item,index) in list">
          <template v-if="(child.rang||[]).includes(item)">
            <template v-if="child.point">
              <i class="el-icon-caret-top point" :style="{width:(child.rang.indexOf(item)==child.rang.length-1)&&child.width||'100%'}" :class="child.status&&'point-hui'"></i>
              <i class="el-icon-caret-top point" :style="{width:(child.rang.indexOf(item)==child.rang.length-1)&&child.width||'100%'}" :class="child.status==1?'point-green':child.status==2?'point-yellow':''"></i>
            </template>
            <template v-else>
              <div class="progress-box">
                <div class="progress" :style="{width:(child.rang.indexOf(item)==child.rang.length-1)&&child.width||'100%'}" :class="child.status&&'hui'"></div>
                <div class="progress" :style="{width:(child.rang.indexOf(item)==child.rang.length-1)&&child.width||'100%'}" :class="child.status==1?'green':child.status==2?'yellow':''"></div>
              </div>
            </template>
          </template>
        </div> -->
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
      color: #1660f1;
    }
  }
}
</style>