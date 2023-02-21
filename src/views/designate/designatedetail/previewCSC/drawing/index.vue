<!--
 * @Author: 余继鹏 917955345@qq.com
 * @Date: 2023-02-08 15:45:59
 * @LastEditors: 余继鹏 917955345@qq.com
 * @LastEditTime: 2023-02-21 09:57:06
 * @FilePath: \front-web\src\views\designate\designatedetail\previewCSC\attachment\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="designate-attachment" v-loading="loading">
    <div class="el-card left-list" :class="{ show: collapseValue }" @click="collapse" @mouseleave="collapse($event,true)">
      <div class="collapse-transition margin-right5" v-show="!collapseValue">
        <div @click.stop="">
          <template v-for="(item, i) in allData">
            <ul class="file-ul" :key="i">
              <!-- <li class="group-name">{{ item.label }}</li> -->
              <li
                class="file-name cursor"
                :class="{ 'is-active': file.id == active && i == index }"
                v-for="file in item.fileList"
                :key="file.id"
                @click="changeSrc(index, file)"
              >
                {{ file.fileName }}
              </li>
            </ul>
            <el-divider :key="i"></el-divider>
          </template>
        </div>
      </div>
      <i class="btn"
        ><icon
          symbol
          name="iconsanjiantou"
          class="collapse"
          :class="{ rotate: !collapseValue }"
        ></icon
      ></i>
    </div>
    <div class="right-preview">
      <img class="preview" v-if="['PNG','JPG','JIF'].includes(detail.type)" :src="detail.filePath || detail.fileUrl"/>
      <iframe class="preview" v-else :src="detail.filePath || detail.fileUrl" frameborder="0"></iframe>
    </div>
  </div>
</template>
<script>
import { icon } from "rise";
import { nominateAppSDetail } from "@/api/designate";
import { getMtzAttachmentPageList } from "@/api/designate/designatedetail/attachment";
import {
  getdDecisiondataList,
} from "@/api/designate/decisiondata/attach";

export default {
  data() {
    return {
      collapseValue: true,
      nomiAppId: this.$route.query.desinateId || "",
      active: "",
      index: "",
      allData: [
        {
          label: "Attachment",
          fileList: [],
        },
      ],
      detail:{},
      loading:false
    };
  },
  components: {
    icon,
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      this.loading = true;
      Promise.all([
        this.getFetchDataListAttch(),
        // this.getFetchDataListSheet(),
        // this.nominateAppSDetail(),
      ]).then(() => {
        this.changeSrc(0, this.allData[0].fileList[0]);
        this.loading = false;
      });
    },
    // MTZ
    nominateAppSDetail() {
      return new Promise((r) => {
        if (this.$route.query.desinateId) {
          nominateAppSDetail({
            nominateAppId: this.$route.query.desinateId,
          }).then((res) => {
            this.mtzAppId = res.data.mtzApplyId || "";
            if (this.mtzAppId !== "") {
              let data = {
                mtzAppId: this.mtzAppId,
                pageNo: 1,
                pageSize: 999,
              };
              getMtzAttachmentPageList(data).then((res) => {
                this.allData[2].fileList = res.data;
              });
            }
            r(true);
          });
        }
        r(true);
      });
    },
    // sheet
    getFetchDataListSheet() {
      return new Promise((r) => {
        const params = {
          nomiAppId: this.nomiAppId,
          sortColumn: "sort",
          isAsc: true,
          fileType: "103",
          pageNo: 1,
          pageSize: 999,
        };
        getdDecisiondataList(params)
          .then((res) => {
            if (res?.code == "200") {
              this.allData[1].fileList = res.data.records;
            } else {
              iMessage.error(
                this.$i18n.locale === "zh" ? res.desZh : res.desEn
              );
            }
          })
          .finally(() => {
            r(true);
          });
      });
    },
    // attch
    async getFetchDataListAttch() {
      return new Promise((r) => {
        const params = {
          nomiAppId: this.nomiAppId,
          sortColumn: "sort",
          isAsc: true,
          fileType: "101",
          pageNo: 1,
          pageSize: 999,
        };
        getdDecisiondataList(params)
          .then((res) => {
            if (res?.code == "200") {
              this.allData[0].fileList = res.data;
            } else {
              iMessage.error(
                this.$i18n.locale === "zh" ? res.desZh : res.desEn
              );
            }
          })
          .finally(() => {
            r(true);
          });
      });
    },
    collapse(ev,val='') {
      if(val!==''){
        this.collapseValue = val;
      }else{
        this.collapseValue = !this.collapseValue;
      }
    },
    changeSrc(index, item) {
      let fileObj = JSON.parse(JSON.stringify(item))
      let arr = item.fileName.split('.')
      fileObj.type = arr[arr.length-1].toUpperCase()
      this.detail = fileObj
      this.index = index;
      this.active = item.id;
    },
  },
};
</script>
<style lang='scss' scope>
.designate-attachment {
  height: calc(100% - 20px);
  position: relative;
  display: flex;
  .left-list {
    height: calc(100% - 20px);
    max-width: 500px;
    position: absolute;
    display: flex;
    flex-flow: row;
    align-items: center;
    padding: 20px 10px;
    .collapse-transition {
      width: calc(100% - 35px);
      height: 100%;

      .file-ul {
        &:last-of-type {
          margin-bottom: 0;
        }
        .group-name {
          font-size: 16px;
          font-weight: 700;
          color: #222;
          margin: 20px 0;
        }
        .file-name {
          padding-left: 10px;
          font-size: 16px;
          margin-bottom: 10px;
          overflow-wrap: break-word
        }
        .is-active {
          color: #1763f7;
        }
      }
    }
    .btn {
      width: 30px;
    }

    .collapse {
      font-size: 30px;
      color: #d3d3db;
    }
    .rotate {
      transform: rotate(180deg);
    }
  }
  .right-preview {
    flex: 1;
    font-size: 0;
    padding-left: 70px;
    height: 100%;
    .preview {
      width: 100%;
      height: 100%;
      object-fit: none;
    }
  }
}
</style>
