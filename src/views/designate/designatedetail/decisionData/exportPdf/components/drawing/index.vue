<!--
 * @Author: wentliao
 * @Date: 2022-01-06 22:44:18
 * @Description: 
-->
<template>
  <iCard class="drawing" title="Drawing">
    <div class="content">
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
  </iCard>
</template>

<script>
import {iCard} from "rise"
import {getdDecisiondataList} from "@/api/designate/decisiondata/attach"

export default {
  components: {iCard},
  data() {
    return {
      files: []
    }
  },
  created() {
    this.getdDecisiondataList()
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
}
</style>
