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
                    <span v-if="isEdit && groupNode[item.key] && groupNode[item.key].isEditable" class="step-tips-edit">
                        <span class="step-tips-block">{{groupNode[item.key] ? (groupNode[item.key].nodeWeek ? (getNodeYear(groupNode[item.key].nodeDate) +'KW'+groupNode[item.key].nodeWeek) : '-') : '-'}}</span>
                        <iDatePicker 
                            class="step-tips-picker"
                            v-model="groupNode[item.key].nodeDate" 
                            format="yyyy-MM-dd" 
                            value-format="timestamp"
                            :clearable="false"
                            @change="changeDate(groupNode[item.key])"
                            
                        />
                    </span>
                    <span v-else>{{groupNode[item.key] ? (groupNode[item.key].nodeWeek ? (getNodeYear(groupNode[item.key].nodeDate) + 'KW'+groupNode[item.key].nodeWeek) : '-') : '-'}}</span>
                </p>
                <!-- 插入的icon显示位 -->
                <div v-if="($slots['myStep'] || myStep) && groupNode[item.key] && groupNode[item.key]['isTodayAfter'] && ((index+1)!=stepList.length)" class="myStep">
                    <slot name="myStep">{{ myStep }}</slot>
                </div>
          </li>
      </ul>
  </div>
</template>

<script>
import {
  icon,
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
        },
        groupNode:{
             type:Object,
             default:()=>{
                return {}
			}
        },
        isEdit:{
            type:Boolean,
            default:false,
        }
    },
    created(){
        console.log(this.groupNode,'groupNode');
    },
    data(){
        return{
           isTodayAfterIndex:0,
        }
    },
    methods:{
        // 重置一下数据
        resetListData(){

        },

        // 改变日期
        changeDate(item){
            const {nodeDate} = item;
            console.log(nodeDate);
            item.nodeWeek = window.moment(nodeDate).weeks();
        },

        // 获取年份显示
        getNodeYear(nodeDate){
            if(!nodeDate) return '';
            const date = Number(nodeDate);
            const nodeYear = window.moment(date).year();
            if(nodeYear){
                return nodeYear+'-'
            }else{
                return ''
            }
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
                            border: 1px solid rgba(0,38,98,.15);
                            padding: 5px 0;
                            .step-tips-block{
                                display: inline-block;
                                width: 100px;
                                height: 28px;
                                line-height: 28px;
                                text-align: center;
                                box-shadow: 0 0 1px rgba(0,38,98,.15);
                                border-color: 5F6F8F;
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
                        top: 2px;
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