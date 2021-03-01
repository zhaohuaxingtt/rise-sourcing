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

import { iButton, iSelect } from '@/components'

export default {
  components: { iButton, iSelect },
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