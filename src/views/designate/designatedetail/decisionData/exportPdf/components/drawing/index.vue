<!--
 * @Author: wentliao
 * @Date: 2022-01-06 22:44:18
 * @Description: 
-->
<template>
<div ref="drawing">
  <div ref="tabTitle" style="padding:1px">
    <slot name="tabTitle"></slot>
  </div>
  <div ref="rsPdfCard">
    <iCard class="drawing rsPdfCard" title="Drawing">
      <div class="content">
        <div v-if="files.length">
          <div class="wrapper" v-for="(file, $index) in files" :key="$index">
            <div class="file img-row">
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
    </iCard>
    <div class="page-logo" ref="logo">
      <img src="../../../../../../../assets/images/logo.png" alt="" :height="46*0.6+'px'" :width="126*0.6+'px'">
      <div>
        <p class="pageNum"></p>
      </div>
      <div>
        <p>{{ userName }}</p>
        <p>{{ new Date().getTime() | dateFilter('YYYY-MM-DD')}}</p>
      </div>
    </div>
  </div>
  
  <div class="pdf-item">
    <template v-for="(files,i) in filesList">
      <div :key="i" class="pageCard-main rsPdfCard">
        <div style="padding:1px">
          <slot name="tabTitle"></slot>
        </div>
        <iCard class="drawing" title="Drawing">
          <div class="content" :style="{'height': cntentHeight + 'px'}">
            <div v-if="files.length">
              <div class="wrapper" v-for="(file, $index) in files" :key="$index">
                <div class="file">
                  <img class="img" :src="file.filePath" :alt="file.fileName" :style="{'height':file.height}"/>
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
              <p class="pageNum"></p>
            </div>
            <div>
              <p>{{ userName }}</p>
              <p>{{ new Date().getTime() | dateFilter('YYYY-MM-DD')}}</p>
            </div>
          </div>
        </iCard>
      </div>
    </template>
  </div>
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
    // hasTitle(){
    //   return this.$slots.tabTitle && 116 || 0
    // }
  },
  components: {iCard},
  data() {
    return {
      files: [],
      cntentHeight:0,
      filesList:[]
    }
  },
  created() {
    this.getdDecisiondataList()
  },
  methods: {
    getHeight(){
      if(!this.$refs.drawing) return
      this.width = this.$refs.drawing.offsetWidth
      this.hasTitle = this.$refs.tabTitle.offsetHeight
      let headerHeight = this.$refs.rsPdfCard.getElementsByClassName('cardHeader')[0].offsetHeight // Title 区域高度
      let pageLogo = this.$refs.logo.offsetHeight     // logo 区域高度
      this.cntentHeight = (this.width / 841.89) * 595.28 - headerHeight - pageLogo - this.hasTitle // 内容区域对应的高度
      let rowList = this.$refs.drawing.getElementsByClassName('img-row')
      let heightSum = 0
      let filesList = []
      let arr = []
      let list = []
      rowList.forEach((item,i)=>{
        const img = item.getElementsByClassName('img')[0];
        if(!img.complete)
        list.push(
          this.$store.dispatch('sourcing/pushImgList',img)
          // img.onload = () => r(item)
          // img.onerror = () =>  r(item)
        )
      })
      Promise.all(list).then(res=>{
        console.log('drawing');
        rowList.forEach((item,i)=>{
          this.files[i].height = item.offsetHeight +'px'
          heightSum+=item.offsetHeight
          if(heightSum<this.cntentHeight){
            arr.push(this.files[i])
          }else{
            filesList.push(JSON.parse(JSON.stringify(arr)))
            heightSum=item.offsetHeight
            arr = [this.files[i]]
          }
        })
        filesList.push(JSON.parse(JSON.stringify(arr)))
        this.filesList = filesList
      }).catch(err=>{
        console.log(err);
      })
    },
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
          let a = 'qwe'
          a.toUpperCase()
          
          this.files = Array.isArray(res.data) ? res.data.filter(item=> ['.jpg', '.jpeg', '.png', '.bmp', '.webp'].some(type => String(item.fileName).toLowerCase().endsWith(type))) : []
          this.$nextTick(()=>{
            this.getHeight()
          })
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
      // border: 1px solid rgb(201, 216, 219); /*no*/
      // box-shadow: 0 0 1px rgb(0 38 98 / 15%); /*no*/
      border-radius: 5px; /*no*/
      min-height: 300px; /*no*/

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
  
  .img {
    max-width: 60%;
    padding-bottom: 20px;
  }
}
</style>
