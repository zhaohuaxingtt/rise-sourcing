<!--
 * @Author: wentliao
 * @Date: 2021-12-30 15:23:00
 * @Description: 新增规则弹窗
-->
<template>
  <iDialog
    :title="language('QUALITYSCORERULES_TIANJIAGUIZE','添加规则')"
    :visible.sync="dialogVisible"
    @close="clearDialog"
    width="50%"
    class="addRulesDialog"
  >
  <ul class="content">
      <li>
          <p>如果满足一下条件:</p>
          <div>
              <iSelect></iSelect>
              <iSelect></iSelect>
              <iSelect></iSelect>
          </div>
      </li>
      <li>
          <p>则预设评分人为:</p>
          <div>
              <iSelect></iSelect>
              <iSelect></iSelect>
          </div>
      </li>
  </ul>
  <span slot="footer" class="dialog-footer">
    <iButton @click="dialogVisible = false">{{language('QUXIAO','取消')}}</iButton>
    <iButton type="primary" @click="dialogVisible = false">{{ language("QUEDING", "确定") }}</iButton>
  </span>
  </iDialog>
</template>

<script>
import {
    iDialog,
    iButton,
    iSelect,
} from 'rise';
export default {
    name:'addRulesDialog',
    components:{
        iDialog,
        iButton,
        iSelect,
    },
    props:{
        dialogVisible:{
            type:Boolean,
            default:false,
        }
    },
    methods:{
        clearDialog(){
            this.$emit('changeVisible','addRulesDialogVisible',false);
        }
    }
}
</script>

<style lang="scss" scoped>
    .addRulesDialog{
        .content{
            li{
                margin-bottom: 20px;
                p{
                    padding: 10px 0;
                }
                >div{
                    display: flex;
                    .el-select{
                        width: 30%;
                        margin-right: 2%;
                    }
                }
                
            }
        }
    }
</style>