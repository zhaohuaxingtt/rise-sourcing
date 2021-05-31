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
                <p class="step-tips">
                    <span v-if="item.isEdit" class="step-tips-edit">
                        <span class="step-tips-block">{{item.tips}}</span>
                        <!-- <iInput
                            class="step-tips-input" 
                            v-model="item.tips"
                        /> -->
                        <iDatePicker class="step-tips-picker"/>
                    </span>
                    <span v-else>{{item.tips}}</span>
                </p>

                
                <!-- 插入的icon显示位 -->
                <div v-if="($slots['myStep'] || myStep) && stepIndex==index" class="myStep">
                    <slot name="myStep">{{ myStep }}</slot>
                </div>
          </li>
      </ul>
  </div>
</template>

<script>
import {
  icon,
  iInput,
  iDatePicker,
} from "rise";
export default {
    name:'groupStep',
    components:{
        icon,
        iDatePicker,
    },
    props:{
        stepIndex:{
            type:Number,
            default:0,
        },
        stepList:{
            type:Array,
            default:()=>[]
        }
    },
    data(){
        return{
           
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
                       .step-tips-edit{
                            position: relative;
                            .step-tips-block{
                                display: inline-block;
                                width: 100px;
                                height: 28px;
                                line-height: 28px;
                                text-align: center;
                                box-shadow: 0 0 1px rgba(0,38,98,.15);
                                border-color: transparent;
                                border-radius: 4px;
                            }
                            .step-tips-input{
                                width: 100px;
                            }
                            .step-tips-picker{
                                position: absolute;
                                left: 0;
                                top: 0;
                                opacity: 0;
                            }
                       }
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
                       width: calc(100% - 44px - 30px);
                       position: absolute;
                        right: 15px;
                        top: 7px;
                        text-align: center;
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