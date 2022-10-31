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
    <!-- 
      colorTypePlan   计划颜色
      colorTypeSJ     实际颜色 
    -->
    <div class="column-item" :key="index" v-for="(item,index) in header">
      <!-- 计划 -->
      <template>
        <!-- 计划点 -->
        <template v-if="(data.pointRangTop||[]).includes(item)">
          <el-tooltip
            :content="'计划结束时间：'+data.planEndTime"
            placement="top" effect="light"
            >
            <i v-if="!data.planStartTime && data.planEndTime" class="el-icon-caret-top point point-hui" :style="{width:(data.pointRangTop.indexOf(item)!=-1)&&data.pointWidthTop||'100%',color:data.colorTypePlan}"></i>
          </el-tooltip>
        </template>
        <!-- 计划线 -->
        <template v-else-if="(data.barRangTop||[]).includes(item)">
          <!-- 同月份 -->
          <template v-if="data.barRangTop[data.barRangTop.length-1] == data.barRangTop[0]">
            <el-tooltip
              placement="top" effect="light"
              >
              <div slot="content">
                <span>计划开始时间：{{data.planStartTime}}</span><br/>
                <span>计划结束时间：{{data.planEndTime}}</span>
              </div>
              
              <div style="height:15px!important;" class="progress hui" :style="{width:data.barRangTopWidth,marginLeft:data.barRangTopMarginLeft,backgroundColor:data.colorTypePlan}"></div>
            </el-tooltip>
          </template>
          <!-- 不同月份 -->
          <template v-else>
            <el-tooltip
              v-if="data.barRangTop[data.barRangTop.length-1].indexOf(item) != -1"
              placement="top" effect="light"
              >
              <div slot="content">
                <span>计划开始时间：{{data.planStartTime}}</span><br/>
                <span>计划结束时间：{{data.planEndTime}}</span>
              </div>
              
              <div style="height:15px!important;" class="progress hui" :style="{width:data.barRangTopRight,backgroundColor:data.colorTypePlan}"></div>
            </el-tooltip>

            <el-tooltip
              v-else-if="data.barRangTop[0].indexOf(item) != -1"
              placement="top" effect="light"
              >
              <div slot="content">
                <span>计划开始时间：{{data.planStartTime}}</span><br/>
                <span>计划结束时间：{{data.planEndTime}}</span>
              </div>
              
              <div style="height:15px!important;" class="progress hui" :style="{marginLeft:data.barWidthTopLeft,width:data.barWidthTopLeftWidth,backgroundColor:data.colorTypePlan}"></div>
            </el-tooltip>
            
            <div v-else class="progress hui" style="height:15px!important;" :style="{width:'100%;',backgroundColor:data.colorTypePlan}"></div>
          </template>
        </template>
        <div v-else :style="{height:data.pointRangTop?'50%':'15px'}"></div>
      </template>
      <!-- 实际 -->
      <template>
        <!-- 实际点 -->
        <template v-if="(data.pointRangBottom||[]).includes(item)">
          <el-tooltip
            :content="'实际结束时间：'+data.actualEndTime"
            placement="top" effect="light"
            >
            <i @click="ttttt(data)" v-if="!data.actualStartTime && data.actualEndTime" class="el-icon-caret-top point point-green" :style="{width:(data.pointRangBottom.indexOf(item)!=-1)&&data.pointWidthBottom||'100%',color:data.colorTypeSJ}"></i>
          </el-tooltip>
        </template>
        <!-- 实际线 -->
        <template v-else-if="(data.barRangBottom||[]).includes(item)">
          <!-- 同月份 -->
          <template v-if="data.barRangBottom[data.barRangBottom.length-1] == data.barRangBottom[0]">
            <el-tooltip
              :content="'实际结束时间：'+data.actualEndTime"
              placement="top" effect="light"
              >
              <div slot="content">
                <span>实际开始时间：{{data.actualStartTime}}</span><br/>
                <span>实际结束时间：{{data.actualEndTime}}</span>
              </div>

              <div style="height:15px!important;" class="progress green" :style="{width:data.barRangBottomWidth,marginLeft:data.barRangBottomMarginLeft,backgroundColor:data.colorTypeSJ}"></div>
            </el-tooltip>
          </template>
          <!-- 不同月份 -->
          <template v-else>
            <el-tooltip
              v-if="data.barRangBottom[data.barRangBottom.length-1].indexOf(item) != -1" 
              :content="'实际结束时间：'+data.actualEndTime"
              placement="top" effect="light"
              >
              <div slot="content">
                <span>实际开始时间：{{data.actualStartTime}}</span><br/>
                <span>实际结束时间：{{data.actualEndTime}}</span>
              </div>

              <div style="height:15px!important;" class="progress green" :style="{width:data.barWidthBottomRight,backgroundColor:data.colorTypeSJ}"></div>
            </el-tooltip>

            <el-tooltip 
              v-else-if="data.barRangBottom[0].indexOf(item) != -1" 
              :content="'实际结束时间：'+data.actualEndTime"
              placement="top" effect="light"
              >
              <div slot="content">
                <span>实际开始时间：{{data.actualStartTime}}</span><br/>
                <span>实际结束时间：{{data.actualEndTime}}</span>
              </div>

              <div style="height:15px!important;" class="progress green" :style="{marginLeft:data.barWidthBottomLeft,width:data.barWidthBottomLeftWidth,backgroundColor:data.colorTypeSJ}"></div>
            </el-tooltip>

            <div v-else class="progress green" style="height:15px!important;" :style="{width:'100%',backgroundColor:data.colorTypeSJ}"></div>
          </template>
        </template>
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
      ttttt(val){
        console.log(val);
      },
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