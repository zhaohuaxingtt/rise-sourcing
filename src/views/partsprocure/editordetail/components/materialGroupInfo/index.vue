<!--
 * @Author: your name
 * @Date: 2021-03-01 10:29:09
 * @LastEditTime: 2021-03-01 15:58:53
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \rise\src\views\partsprocure\editordetail\components\materialGroupInfo\index.vue
-->
<template>
  <div class="material-group-info">
    <el-row v-for="(infoChunk, $chunkIndex) in infoChunks" :key="$chunkIndex" class="row">
      <el-col v-for="(info, $index) in infoChunk" :key="$index" class="col" :span="6">
        <div class="view">
          <div class="label">
            <span>{{ info.label }}：</span>
          </div>
          <div class="detail">
            <span v-if="info.key !== 'e'">{{ info.value }}</span>
          </div>
        </div>
      </el-col>
      <el-col v-if="$chunkIndex === infoChunks.length - 1" class="col" :span="6">
         <iButton @click="setMaterialGroup">设置工艺组</iButton>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { infos } from './data'
import { chunk } from 'lodash'

import { iButton } from '@/components'

export default {
  components: { iButton },
  data() {
    return {
      infoChunks: [],
      setMaterialGroupStatus: false,
      form: {
        e: ''
      }
    }
  },
  created() {
    this.infoChunks = chunk(infos, 4)
  },
  methods: {
    setMaterialGroup() {
      this.setMaterialGroupStatus = true;
    }
  }
}
</script>

<style lang="scss" scoped>
.material-group-info {
  padding: 20px;
  background: #fff;

  .row {
    .col {
      padding: 0 10px;
      margin-bottom: 20px;

      &:first-of-type {
        padding-left: 0;
      }

      &:last-of-type {
        padding-right: 0;
      }
    }
  }

  .view {
    .label {
      display: table-cell;
      width: 200px;
    }

    .detail {
      display: table-cell;
      word-break: break-all;
    }
  }
}
</style>