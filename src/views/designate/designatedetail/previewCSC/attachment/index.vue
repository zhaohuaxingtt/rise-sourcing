<!--
 * @Author: 余继鹏 917955345@qq.com
 * @Date: 2023-02-08 15:45:59
 * @LastEditors: 余继鹏 917955345@qq.com
 * @LastEditTime: 2023-02-10 10:34:03
 * @FilePath: \front-web\src\views\designate\designatedetail\previewCSC\attachment\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="designate-attachment">
    <!-- <attachment v-permission.auto="SOURCING_NOMINATION_ATTATCH_ATTACHMENT_ATTACHMENT_FIRSTTABLE|attachment" />
      <rssheet v-permission.auto="SOURCING_NOMINATION_ATTATCH_ATTACHMENT_RSSHEET|rssheet" />
      <mtzAttachment v-permission.auto="SOURCING_NOMINATION_ATTATCH_ATTACHMENT_MTZ|mtzAttachment" /> -->
    <div class="el-card left-list" :class="{ show: collapseValue }">
      <div class="collapse-transition margin-right5" v-show="!collapseValue">
        <template v-for="(item, i) in allData">
          <ul class="file-ul" :key="i">
            <li class="group-name">{{ item.label }}</li>
            <li
              class="file-name cursor"
              :class="{ 'is-active': file.id == active && i == index }"
              v-for="file in item.fileList"
              :key="file.id"
              @click="changeSrc(index, file)"
            >
              {{ file.name }}
            </li>
          </ul>
          <el-divider :key="i"></el-divider>
        </template>
        <!-- <template>
          <p class="file-name link cursor" :class="{'is-active': item.id==active}" @click="changeSrc(item)" :key="item.id"></p>
        </template> -->
      </div>
      <i @click="collapse" class="btn"
        ><icon
          symbol
          name="iconsanjiantou"
          class="collapse"
          :class="{ rotate: !collapseValue }"
        ></icon
      ></i>
    </div>
    <div class="right-preview">
      <iframe class="iframe" :src="src" frameborder="0"></iframe>
    </div>
  </div>
</template>
<script>
import { icon } from "rise";
import attachment from "./components/attachment";
import rssheet from "./components/rssheet";
import mtzAttachment from "./components/mtzAttachment";

export default {
  computed: {
    // 若为备案类型定点申请，则显示线下RS单上传卡片
    showRsSheet() {
      const nominationType = this.$store.getters.nominationType;
      const queryNomiType = this.$route.query.designateType;
      const show = nominationType === "RECORD" && queryNomiType === "RECORD";
      return show;
    },
  },
  data() {
    return {
      sortVisibal: false,
      uploadVisibal: false,
      collapseValue: false,
      src: "",
      active: "",
      index: "",
      allData: [
        {
          label: "Attachment",
          fileList: [
            {
              id: "1",
              name: "TEST.doc",
              src: "http://localhost:8080/fileApi/fileud/getFileByFileId?fileId=1623223560564641793",
            },
            {
              id: "2",
              name: "TEST这是一个测试文件.doc",
              src: "http://localhost:8080/fileApi/fileud/getFileByFileId?fileId=1623198847679336449",
            },
          ],
        },
        {
          label: "RS Sheet",
        },
        {
          label: "MTZ Attachment",
        },
      ],
      fileList: [],
    };
  },
  components: {
    attachment,
    rssheet,
    mtzAttachment,
    icon,
  },
  created() {
    this.changeSrc(0, this.allData[0].fileList[0]);
  },
  methods: {
    collapse() {
      this.collapseValue = !this.collapseValue;
    },
    changeSrc(index, item) {
      this.index = index;
      this.active = item.id;
      this.src = item.src || "";
    },
  },
};
</script>
<style lang='scss' scope>
.designate-attachment {
  height: 100%;
  position: relative;
  display: flex;
  .left-list {
    height: 100%;
    max-width: 500px;
    position: absolute;
    display: flex;
    flex-flow: row;
    align-items: center;
    padding: 20px 10px;
    .collapse-transition {
      width: 100%;
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
          }
          .is-active {
            color: #1763F7;
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
    .iframe {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
