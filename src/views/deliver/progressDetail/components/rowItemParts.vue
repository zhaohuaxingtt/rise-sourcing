<template>
  <div class="row-item">
    <div class="row-wrap">
        <!-- <span class="row-name">{{data.edition}}</span> -->
        <span class="row-name"></span>
        <div class="cound-wh">
            <el-tooltip class="item flex1" effect="light" :content="data.name" placement="top">
                <span class="font-nowrap">{{data.name}}</span>
            </el-tooltip>
            <div class="cound" :class="data.circular==1?'black':'green'"></div>
        </div>
    </div>
    <div id="column-item" :class="item.complete?'row-complete':''" :key="index" v-for="(item,index) in data.nodeList">
      <div class="row-content">
        <span class="content-top">{{item.name}}</span>
        <div id="row-line"></div>
        <div id="row-line" :class="item.complete?'green row-line-05':''"></div>

        <!-- 1 为绿色 2为黄色 3位红色 4位黑色 5为灰色 -->
        <el-tooltip effect="light" :content="'实际完成时间：'+item.name" placement="right" v-if="item.status == 2||item.status == 3||item.status == 4">
            <div class="row-img1 hui" v-if="item.type==1" :class="item.status==1?'green':item.status==2?'yellow':item.status==3?'red':item.status==4?'black':''"></div><!-- 圆 -->
            <i v-if="item.type==2" class="row-img2 el-icon-caret-top point-hui" :class="item.status==1?'point-green':item.status==2?'point-yellow':item.status==3?'point-red':item.status==4?'point-black':''"></i><!-- 三角形 -->
        </el-tooltip>
        <template v-else>
            <div class="row-img1 hui" v-if="item.type==1" :class="item.status==1?'green':item.status==2?'yellow':item.status==3?'red':item.status==4?'black':''"></div><!-- 圆 -->
            <i v-if="item.type==2" class="row-img2 el-icon-caret-top point-hui" :class="item.status==1?'point-green':item.status==2?'point-yellow':item.status==3?'point-red':item.status==4?'point-black':''"></i><!-- 三角形 -->
        </template>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    components:{
    },
    props:{
      header:{ type: Array, default: ()=>[]},
      list:{ type: Array, default: ()=>[]},
      data:{ type: Object, default:()=>({})}
    },
    methods:{
      change(data){
        data.showChlid = !data.showChlid
      }
    }
  }
</script>

<style lang="scss" scoped>

.row-item{
  height: 80px;
  display: inline-flex;
  flex-flow: row;
  font-size: 16px;
  font-weight: bold;
  .icon{
    width: 20px;
    text-align: center;
    display: inline-block;
  }
  #column-item{
    width: 150px!important;
    display: flex;
    flex-flow: column;
    text-align: right;
    // border-right: 1px #ccc solid;
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
    
  }
  .first-column-item{
    display: flex;
    flex: none;
    width: 200px;
    // border-right: 1px #ccc solid;
    .icon{
      color: #1660f1;
    }
  }
}
.green{
    background: #00C06F!important;
}
.black{
    background: black!important;
}
.yellow{
    background: #ffc000!important;
}
.red{
    background: red!important;
}
.hui{
    background: #d9d9d9;
}
.point-green{
    color: #00C06F!important;
}
.point-black{
    color: black!important;
}
.point-yellow{
    color: #ffc000!important;
}
.point-red{
    color: red!important;
}
.point-hui{
    color: #d9d9d9;
}
.row-name{
    height:20px;
    display: block;
    margin-bottom:11px;
    margin-top:15px;
}
.font-nowrap{
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.name-edition{
    display: block;
    margin-bottom:5px;
}
.row-wrap{
    width: 180px;
    padding-right:20px;
    z-index: 1000;
    background: #fff;
}
.cound{
    width:20px;
    height:20px;
    border-radius: 50%;
}
.cound-wh{
    display: flex;
    justify-content: space-between;
}

.row-content{
    // background:red;
    width: 100%;
    height:100%;
    text-align: center;
    position: relative;

    #row-line{
        width: 100%;
        height: 2px;
        background: #CED4E1;
        position: absolute;
        top: 70%;
        left: 0;
    }
}
.row-img1{
    position: absolute;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    top: 70%;
    left: 50%;
    margin-left: -10px;
    margin-top: -10px;
    z-index: 1000;
}
.row-img2{
    position: absolute;
    top: 53%;
    left: 41%;
    font-size: 47px;
    margin-left: -10px;
    margin-top: -10px;
    z-index: 1000;
}
.flex1{
    flex:1;
}
.content-top{
    display: inline-block;
    margin-top:15px;
    font-size:13.5px;
}
.row-complete:last-child{
    .row-line-05{
        width: 150%!important;
    }
}
.row-line-05{
    left:-50%!important;
}
</style>