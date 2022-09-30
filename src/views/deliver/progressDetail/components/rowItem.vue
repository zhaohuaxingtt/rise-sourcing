<template>
  <div class="row-item">
    <div class="first-column-item">
      <template v-if="data.childList">
        <i class="el-icon-remove-outline icon" v-if="data.showChlid" @click="change(data)"></i>
        <i class="el-icon-circle-plus-outline icon" v-else  @click="change(data)"></i>
      </template>
      <el-tooltip
        :content="data.num + ' ' + data.nodeName"
        placement="top" effect="light"
        :disabled="strWidth(data.num + ' ' + data.nodeName) <= boxWidth('font-hidden')"
        >
        <span id="font-hidden" @click="change(data)">{{data.num}} {{data.nodeName}}</span>
      </el-tooltip>
    </div>
    <div class="column-item" :key="index" v-for="(item,index) in header">
      <template>
        <template v-if="(data.pointRangTop||[]).includes(item)">
          <i v-if="!data.planStartTime && data.planEndTime" class="el-icon-caret-top point point-hui" :style="{width:(data.pointRangTop.indexOf(item)!=-1)&&data.pointWidthTop||'100%'}"></i>
        </template>
        <template v-else-if="(data.barRangTop||[]).includes(item)">
          <div v-if="data.actualStartTime && data.actualEndTime && data.barRangTop[data.barRangTop.length-1].indexOf(item) != -1" class="progress hui" :style="{width:data.barRangTopRight}"></div>
          <div v-else-if="data.actualStartTime && data.actualEndTime && data.barRangTop[0].indexOf(item) != -1" class="progress hui" :style="{marginLeft:data.barWidthTopLeft,width:data.barWidthTopLeftWidth}"></div>
          <div v-else-if="data.actualStartTime && data.actualEndTime" class="progress hui" style="width:100%"></div>
        </template>
        <div v-else :style="{height:data.pointRangTop?'50%':'15px'}"></div>
      </template>
      <template v-if="(data.pointRangBottom||[]).includes(item)">
        <i v-if="!data.actualStartTime && data.actualEndTime" class="el-icon-caret-top point point-green" :style="{width:(data.pointRangBottom.indexOf(item)!=-1)&&data.pointWidthBottom||'100%'}"></i>
      </template>
      <template v-else-if="(data.barRangBottom||[]).includes(item)">
        <div v-if="data.actualStartTime && data.actualEndTime && data.barRangBottom[data.barRangBottom.length-1].indexOf(item) != -1" class="progress green" :style="{width:data.barWidthBottomRight}"></div>
        <div v-else-if="data.actualStartTime && data.actualEndTime && data.barRangBottom[0].indexOf(item) != -1" class="progress green" :style="{marginLeft:data.barWidthBottomLeft,width:data.barWidthBottomLeftWidth}"></div>
        <div v-else-if="data.actualStartTime && data.actualEndTime" class="progress green" style="width:100%"></div>
      </template>
    </div>
  </div>
</template>

<script>
  export default {
    props:{
      header:{ type: Array, default: ()=>[]},
      list:{ type: Array, default: ()=>[]},
      data:{ type: Object, default:()=>({})}
    },
    methods:{
      change(data){
        data.showChlid = !data.showChlid
        this.$emit("refresh")
      }
    },
    computed:{
      strWidth() {
        return function (string) {
          const dom = document.createElement('span')
          dom.style.display = 'inline-block'
          dom.style.fontSize = '1rem'
          dom.textContent = string
          document.body.appendChild(dom)
          const width = dom.clientWidth
          document.body.removeChild(dom)
          return width
        }
      },
      //字符串所在元素宽度
      boxWidth() {
        return function (dom) {
          return document.getElementById(dom)?.offsetWidth ?? 0
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
#font-hidden{
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
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
    display: flex;
    align-items: center;
    .icon{
      color: #1660f1;
    }
    span{
      flex:1;
    }
  }
}
</style>