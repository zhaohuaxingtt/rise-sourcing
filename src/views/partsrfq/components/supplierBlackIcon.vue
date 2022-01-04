<!--
 * @Author: wentliao
 * @Date: 2021-12-29 10:54:46
 * @Description: 供应商黑名单icon展示
-->
<template>
  <span class="supplierBlackIcon margin-left5">
      <span class="contain">
          <!-- 黑名单状态 -->
        <el-tooltip effect="light" :content="blackTooltip" :disabled="blackTooltip==''">
            <i class="blackIcon"></i>
        </el-tooltip>
        <!-- 任务状态 -->
        <el-tooltip effect="light" :content="taskTooltip" :disabled="taskTooltip==''">
            <i class="statusIcon margin-left3"></i>
        </el-tooltip>
      </span>
  </span>
</template>

<script>
export default {
    name:'supplierBlackIcon',
    props:{
        blackTooltip:{
            type:String,
            default:'',
        },
        taskTooltip:{
            type:String,
            default:'',
        },
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
                margin-bottom: -2px;
            }
            .statusIcon{
                width: 1.1rem;
                height: 1.1rem;
                background-size: 1.1rem 1.1rem;
                background-image: url("~@/assets/images/md-query_builder.svg");
                margin-bottom: -3px;
            }  
        }
        
    }
</style>