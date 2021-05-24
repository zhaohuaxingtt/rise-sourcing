<!--
 * @Author: wentliao
 * @Date: 2021-05-24 14:14:03
 * @Description: timeline顶部的总步骤条展示
-->
<template>
  <div class="groupStep">
      <ul>
          <li v-for="(item,index) in stepList" :key="'stepList_'+index">
                <icon symbol :name="item.icon" class="step-icon"></icon>
                <p class="step-title">{{item.title}}</p>
                <p class="step-tips">{{item.tips}}</p>

                <!-- 当前setp -->
                <div v-if="index == stepIndex" class="myStep">
                    <icon symbol name="TimeLine-Today" class="step-icon"></icon>
                    <p>Today</p>
                </div>
          </li>
      </ul>
  </div>
</template>

<script>
import {
  icon,
} from "rise";
import { stepList } from './data'
export default {
    name:'groupStep',
    components:{
        icon,
    },
    data(){
        return{
            stepList:stepList,
            stepIndex:2, // 当前step
        }
    }

}
</script>

<style lang="scss" scoped>
    .groupStep{
        ul{
            display: flex;
            justify-content: space-between;
            li{
                position: relative;
               .step-icon{
                   width: 44px;
                   height: 44px;
                   border: 1px solid red;
               }
               p{
                   &.step-title{
                       margin: 14px 0;
                       color: #41434A;
                       font-size: 16px;
                   }
                   &.step-tips{
                       color: #5F6F8F;
                       font-size: 14px;
                   }
               }
               &:not(:last-child){
                   flex-grow: 1;
                &::after{
                    content: "";
                    display: block;
                    width: calc(100% - 44px - 30px);
                    height: 2px;
                    background: #1660F1;
                    position: absolute;
                    right: 15px;
                    top: 22px;
                }
               }

               div{
                   &.myStep{
                       position: absolute;
                        right: calc((100% - 74px)/2 - 7px);
                        top: 7px;
                        text-align: center;
                        .step-icon{
                            width: 30px;
                            height: 30px;
                        }
                        p{
                            font-size: 16px;
                            margin-top: 16px;
                        }
                   }
               }
                
            }
        }
    }
</style>