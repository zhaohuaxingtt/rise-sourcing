<template>
  <iDialog
    :visible.sync="dialogVisible"
    width="85%"
    append-to-body
    @close="onClose"
    :title="language('审批流')"
  >
    <div class="content" v-loading="loading">
      <div
        v-if="panoramas.length > 1"
        class="multiple margin-bottom20 content-item"
      >
        <iCard
          v-for="(item, index) in panoramas"
          :key="index"
          :title="item.stateMsg"
          header-control
          collapse
          class="margin-bottom20"
          style="overflow: auto"
          :defalutCollVal="!item.isEnd"
          @handleCollapse="(val) => handleCollapse(val, item)"
        >
          <div slot="header-control">{{ item.endTime }}</div>
          <div v-if="!item.isEnd || item.ok">
            <processNodeHorizontal
              :detail="detail"
              :panorama="item.panorama"
              :isEnd="item.isEnd"
              :instanceId="item.processInstanceId + index"
            />
          </div>
        </iCard>
      </div>
      <div v-if="panoramas.length === 1" style="overflow: auto">
        <processNodeHorizontal
          :detail="detail"
          :panorama="panoramas[0].panorama"
          :isEnd="panoramas[0].isEnd"
          :instanceId="panoramas[0].processInstanceId"
          use-from="dialog"
        />
      </div>
      <div class="no-data" v-if="loadText">{{ loadText }}</div>
    </div>
  </iDialog>
</template>

<script>
import { iDialog, iCard } from 'rise'
import { queryPanoramaLists } from '@/api/designate/decisiondata/approval'
import processNodeHorizontal from './processNodeHorizontal'
export default {
  name: 'viewFlowDialog',
  components: { iDialog, processNodeHorizontal, iCard },
  props: {
    detail: {
      type: Object,
      default: function () {
        return {}
      }
    },
    visible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      panoramas: [],
      loading: false,
      dialogVisible: false,
      loadText: '加载中'
    }
  },
  watch: {
    visible(val) {
      this.dialogVisible = val

      if (val) this.queryPanoramas()
    }
  },
  created() {
    this.dialogVisible = this.visible
    this.queryPanoramas()
  },
  methods: {
    queryPanoramas() {
      if (this.detail.processInstanceId && this.detail.businessId) {
        this.loading = true
        queryPanoramaLists({
          businessId: this.detail.businessId,
          processInstanceId: this.detail.processInstanceId
        })
          .then((res) => {
            this.panoramas = res.data || []
            if (res.data) {
              this.panoramas = res.data.map((p) => {
                return {
                  ...p,
                  panorama: p.panorama
                }
              })
              this.loadText = res.data.length ? '' : '暂无数据'
            }
          })
          .finally(() => {
            this.loading = false
          })
      } else {
        this.loadText = '暂无数据'
      }
    },
    onClose() {
      this.dialogVisible = false
      this.$emit('update:visible', false)
    },
    handleCollapse(val, item) {
      Vue.set(item, 'ok', true)
    }
  }
}
</script>

<style lang="scss" scoped>
.content {
  min-height: 250px;
  padding-bottom: 20px;
  width: 100%;
  padding: 10px;
}
.no-data {
  display: flex;
  align-items: center;
  justify-content: center;
  color: #666;
  min-height: 250px;
}
.content-item {
  ::v-deep .card .cardHeader .title {
    background: url(~@/assets/images/icon/checked.png) no-repeat;
    background-size: contain;
    padding-left: 40px;
  }
}
</style>
