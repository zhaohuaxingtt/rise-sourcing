<!--
 * @Author: wentliao
 * @Date: 2022-01-06 22:44:18
 * @Description: 
-->
<template>
<div class="pageCard-main rsPdfCard" ref="drawing">
  <slot name="tabTitle"></slot>
  <iCard class="drawing" title="Drawing">
    <div class="content" :style="{'height': cntentHeight + 'px'}">
      <div v-if="files.length">
        <div class="wrapper" v-for="(file, $index) in files" :key="$index">
          <div class="file">
            <img class="img" :src="file.filePath" :alt="file.fileName"/>
          </div>
        </div>
      </div>
      <div v-else>
        <div class="blank">
          <span>{{ language("ZANWUSHUJU", "暂无数据") }}</span>
        </div>
      </div>
    </div>
    <div class="page-logo">
      <img src="../../../../../../../assets/images/logo.png" alt="" :height="46*0.6+'px'" :width="126*0.6+'px'">
      <div>
        <p>{{'page '+(index+1)+' of '+ (prototypeTableList.length+tableList.length)}}</p>
      </div>
      <div>
        <p>{{ userName }}</p>
        <p>{{ new Date().getTime() | dateFilter('YYYY-MM-DD')}}</p>
      </div>
    </div>
  </iCard>
</div>
</template>

<script>
import {iCard} from "rise"
import {getdDecisiondataList} from "@/api/designate/decisiondata/attach"
import filters from "@/utils/filters"
export default {
  mixins:[filters],
  props:{
    tableList: { type: Array, default: () => [] },
    prototypeTableList: { type: Array, default: () => [] },
  },
  computed:{
    userName(){
      return this.$i18n.locale === 'zh' ? this.$store.state.permission.userInfo.nameZh : this.$store.state.permission.userInfo.nameEn
    },
    hasTitle(){
      return this.$slots.tabTitle && 116 || 0
    }
  },
  components: {iCard},
  data() {
    return {
      files: [],
      cntentHeight:0
    }
  },
  created() {
    this.getdDecisiondataList()
  },
  mounted(){
    this.width = this.$refs.drawing.clientWidth
    let headerHeight = 84 // Title 区域高度
    let pageLogo = 52     // logo 区域高度
    this.cntentHeight = (this.width / 841.89) * 595.28 - headerHeight - pageLogo - this.hasTitle // 内容区域对应的高度
    console.log(this.cntentHeight);
  },
  methods: {
    getdDecisiondataList: function () {
      getdDecisiondataList({
        nomiAppId: this.$route.query.desinateId,
        sortColumn: "sort",
        isAsc: true,
        fileType: "101",
        pageNo: 1,
        pageSize: 999999
      }).then(res => {
        if (res.code == 200) {
          this.files = Array.isArray(res.data) ? res.data : []
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.rsPdfCard{
  box-shadow: none;
  & + .rsCard {
    margin-top: 20px; /*no*/
  }
  ::v-deep .cardHeader{
    padding: 30px 0px;
  }
  ::v-deep .cardBody{
    padding: 0px;
  }
}
.drawing {
  .content {
    .wrapper {
      margin-bottom: 20px; /*no*/

      &:last-of-type {
        margin-bottom: 0;
      }
    }

    .file {
      display: flex;
      align-items: center;
      justify-content: center;
      border: 1px solid rgb(201, 216, 219); /*no*/
      // box-shadow: 0 0 1px rgb(0 38 98 / 15%); /*no*/
      border-radius: 5px; /*no*/
      min-height: 300px; /*no*/

      .img {
        max-width: 60%;
      }
    }

    .blank {
      height: 200px; /*no*/
      border: 1px solid rgb(201, 216, 219); /*no*/
      // box-shadow: 0 0 1px rgb(0 38 98 / 15%); /*no*/
      border-radius: 5px; /*no*/
      font-size: 18px; /*no*/
      color: rgb(112, 112, 112);
      text-align: center;
      line-height: 200px; /*no*/
    }
  }
  .page-logo{
    display: flex;
    justify-content: space-between;
    padding: 10px;
    align-items: center;
    border-top: 1px solid #666;
  }
}
</style>
