<!--
 * @Author: wentliao
 * @Date: 2021-12-29 10:54:46
 * @Description: 供应商黑名单icon展示
-->
<template>
  <span class="supplierBlackIcon margin-left5">
      <span class="contain">
          <!-- 黑名单状态 -->
        <el-tooltip v-if="BlackList.length" effect="light" :disabled="blackTooltip==''">
            <div slot="content">
                <template v-for="(item,index) in BlackList">
                    <p :key="index+'_blackTooltip'">
                        <b>{{item.stuffCode}}-{{item.stuffName}}</b>
                        <span style="marginTop:5px;display:block">{{item.measuresDesc}}({{item.startTime}}~{{item.endTime}})</span>
                    </p>
                    <p v-if="index+1 < BlackList.length" :key="index+'_blackTooltip'" style="borderBottom:1px solid #E0E6ED;margin:10px 0"></p>
                </template>
            </div>
            <i class="blackIcon"></i>
        </el-tooltip>
        <!-- 任务状态 -->
        <el-tooltip v-if="isShowStatus" effect="light" :content="language('LK_SUPPLIER_WEIWANCHENGNIANDUGONGYINGSHANGXINXIQUEREN','未完成年度供应商信息确认')" :disabled="taskTooltip==''">
            <i class="statusIcon margin-left3"></i>
        </el-tooltip>
      </span>
  </span>
</template>

<script>
export default {
    name:'supplierBlackIcon',
    props:{
        BlackList:{
            type:Array,
            default:()=>[],
        },
        isShowStatus:{
            type:Boolean,
            default:false,
        }
    },
    data(){
        return{

        }
    },
}
</script>

<style lang="scss" scoped>
    .supplierBlackIcon{
        height: 100%;
        .contain{
          i{
            display: inline-block;
            }
            .blackIcon{
                background-image: url("~@/assets/images/if-not-allowed.svg");
                width: 1rem;
                height: 1rem;
                background-size: 1rem 1rem;
                margin-bottom: -3px;
            }
            .statusIcon{
                width: 1.1rem;
                height: 1.1rem;
                background-size: 1.1rem 1.1rem;
                background-image: url("~@/assets/images/md-query_builder.svg");
                margin-bottom: -4px;
            }  
        }
        
    }
</style>