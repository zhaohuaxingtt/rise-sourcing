<!--
 * @Author: wentliao
 * @Date: 2021-07-27 11:20:07
 * @Description: aeko描述
-->

<template>
  <iPage class="aekoDescribe">
      <h2 class="title">
        {{language('LK_AEKOHAO_MANAGE','AEKO号')}}：AE19221
      </h2>
      <div class="contain margin-top20">
        <el-row :gutter="10">
          <el-col :span="8">
            <iCard :title="language('LK_AEKOFUJIAN','AEKO附件')">
              <aekoFilesList/>
            </iCard>
          </el-col>
          <el-col :span="16">
            <iCard :title="language('LK_AEKOFUJIANMIAOSHU','AEKO描述')">
              描述
            </iCard>
          </el-col>
        </el-row>
      </div>
  </iPage>
</template>

<script>
import {
  iPage,
  iCard,
} from 'rise'
import aekoFilesList from './components/filesList'
export default {
    name:'aekoDescribe',
    components:{
      iPage,
      iCard,
      aekoFilesList,
    },
    data(){
      return{

      }
    },
    methods:{
    }
    
}
</script>

<style lang="scss" scoped>

</style>
