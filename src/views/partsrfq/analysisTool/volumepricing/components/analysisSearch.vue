<template>
  <div>
    <iSearch  @reset="handleSearchReset" @sure="getTableList">
      <el-form>
        <el-form-item :label="item.key?$t(item.key):item.name" v-for="(item,index) in searchData" :key="index">
          <iInput class="margin-top6"></iInput>
        </el-form-item>
      </el-form>
    </iSearch>
  </div>
</template>

<script>
import {iSearch, iSelect, iInput} from 'rise'
import {search} from './data'
export default {
  name: 'analysisSearch',
  components: {iSearch, iSelect, iInput},
  data () {
    return {
      searchData: search
    }
  },
  created() {

  },
  methods: {

  }
}
</script>

<style lang='less' scoped>

 
</style>
