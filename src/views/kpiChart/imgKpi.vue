<template>
  <div>
      <iPage>
           <iCard>
               <div class="imgkpi-head">
               <el-form>
                <el-form-item
                  class="SearchOption"
                >
                  <i-select
                    :placeholder="$t('staffManagement.SELECT_PLACEHOLDER')"
                  >
                    <el-option
                      label="item.nameZh"
                      value="item.id"
                    >
                    </el-option>
                  </i-select>
                </el-form-item>
               </el-form>
               <div>
                   <iButton>新增</iButton>
                   <iButton>确认</iButton>
               </div>
               </div>
           </iCard>
           
          <kpiStructure style="margin-top:20px">
              <div class="imgkpi-head">
               <el-form label-position="left" label-width="60px">
                <el-form-item
                label="版本："
                class="SearchOption"
                >
                  <i-select
                    :placeholder="$t('staffManagement.SELECT_PLACEHOLDER')"
                  >
                    <el-option
                      label="item.nameZh"
                      value="item.id"
                    >
                    </el-option>
                  </i-select>
                </el-form-item>
               </el-form>
               <div>
                   <iButton>删除</iButton>
                   <iButton>下载</iButton>
                   <iButton>保存</iButton>
               </div>
            </div>
          </kpiStructure>
      </iPage>
  </div>
</template>

<script>
import {iButton,iPage,iCard,iInput,iSelect} from 'rise'
import kpiStructure from './components/kpiStructure'
export default {
    components:{
        iButton,
        iPage,
        kpiStructure,
        iCard,
        iInput,
        iSelect
    },
    data(){
        return {
            formData:{
                deptId:''
            }
        }
    }
}
</script>

<style lang="scss" scoped>
    .imgkpi-head{
        display: flex;
        justify-content: space-between;
    }
</style>