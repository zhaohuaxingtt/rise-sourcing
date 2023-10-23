<template>
  <div class="horizontal-panel" :id="panelId">
    <horizontal
      :data="nodeData"
      id="hrizontalNode"
      class="hrizontalNode"
      :size="size"
    />
    <svg
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      class="children-link-line"
      :style="{ width: svgWidth + 'px' }"
    >
      <polyline
        v-for="(item, index) in lines"
        :key="index"
        :points="item.points"
        :stroke-dasharray="item.style === 'solid' ? '0' : '3 2'"
        :style="
          item.style === 'solid'
            ? 'fill: none; stroke: #67C23A; stroke-width: 1'
            : 'fill: none; stroke: #cbcbcb; stroke-width: 1'
        "
      ></polyline>
    </svg>
  </div>
</template>

<script>
import horizontal from './horizontal.vue'
export default {
  name: 'horizontalPanel',
  components: { horizontal },
  props: {
    nodeData: {
      type: Array,
      default: function () {
        return []
      }
    },
    instanceId: {
      type: String,
      default: ''
    },
    lineSpacing: {
      type: Number,
      default: 100
    },
    size: {
      type: String,
      default: 'large'
    },
    useFrom: {
      type: String,
      default: ''
    }
  },
  computed: {
    panelId() {
      return 'hp_' + this.useFrom + '_' + this.instanceId
    }
  },
  data() {
    return {
      lines: [],
      svgWidth: 0
    }
  },
  watch: {
    nodeData() {
      if (this.svgWidth === 0) {
        this.$nextTick(() => {
          this.svgWidth = document.querySelector(
            `#${this.panelId} > #hrizontalNode > .approval-process-content`
          ).clientWidth
          this.drawLine()
        })
      }
    }
  },
  mounted() {
    if (this.svgWidth === 0) {
      this.$nextTick(() => {
        this.svgWidth = document.querySelector(
          `#${this.panelId} > #hrizontalNode > .approval-process-content`
        ).clientWidth
        this.drawLine()
      })
    }
  },
  methods: {
    getLineStyle(status) {
      return ['已提交', '已审批', '审批结束'].includes(status)
        ? 'solid'
        : 'dashed'
    },
    drawLine() {
      const elementIcons = document.querySelectorAll(
        `#${this.panelId} .node-icon`
      )
      const data = []
      const topIndent = 8
      const horizontalSpace = 0 // 线条直接的间隔距离
      for (let i = 0; i < elementIcons.length; i++) {
        const element = elementIcons[i]
        const dataLevel = element.getAttribute('data-level')
        const dataIndex = element.getAttribute('data-index')
        const dataGroup = element.getAttribute('data-group')
        const dataIsEnd = element.getAttribute('data-end')
        const dataStatus = element.getAttribute('data-status')
        data.push({
          left: element.offsetLeft,
          top: element.offsetTop,
          level: dataLevel,
          index: dataIndex,
          group: dataGroup,
          status: dataStatus,
          isEnd: dataIsEnd === '1',
          width: element.clientWidth
        })
      }
      console.log('ddddddddddddddddddd', data)

      const len = data.length
      const lines = []
      for (let i = 0; i < len; i++) {
        const item = data[i]

        const nextItem = i < len - 1 ? data[i + 1] : null
        if (nextItem) {
          const spacingLeft = item.width / 2 + horizontalSpace
          const spacingRight = nextItem.width / 2 - horizontalSpace
          if (!item.group && !item.isEnd) {
            lines.push({
              style: this.getLineStyle(nextItem.status),
              points: `${item.left + spacingLeft},${item.top + topIndent} ${
                nextItem.left + spacingRight
              },${item.top + topIndent}`
            })
          }
        }
        if (item.group) {
          const spacingLeft = item.width / 2 + horizontalSpace
          // const spacingRight = item.width / 2 - 20
          const group = item.group.split('-')
          // const childLevel =  group[group.length - 1]
          const level = group[1]
          const childLevel = (parseInt(level) + 1).toString()
          const childNodes = data.filter(
            (e) => e.index === '0' && e.level === childLevel
          )
          if (childNodes.length === 2) {
            const groupPositions = []
            // 左 -- 中
            groupPositions.push(
              `${item.left + spacingLeft},${item.top + topIndent}`
            )
            groupPositions.push(
              `${item.left + spacingLeft + this.lineSpacing},${
                item.top + topIndent
              }`
            )

            // 中 -- 中上
            groupPositions.push(
              `${item.left + spacingLeft + this.lineSpacing},${
                item.top + topIndent
              }`
            )
            groupPositions.push(
              `${item.left + spacingLeft + this.lineSpacing},${
                childNodes[0].top + topIndent
              }`
            )

            // 中上 -- 右上
            groupPositions.push(
              `${item.left + spacingLeft + this.lineSpacing},${
                childNodes[0].top + topIndent
              }`
            )
            groupPositions.push(
              `${childNodes[0].left + spacingLeft - horizontalSpace * 2},${
                childNodes[0].top + topIndent
              }`
            )

            lines.push({
              style: this.getLineStyle('已提交'),
              points: groupPositions.join(' ')
            })

            const groupPositionDown = []
            // 中 -- 中下
            groupPositionDown.push(
              `${item.left + spacingLeft + this.lineSpacing},${
                item.top + topIndent
              }`
            )
            groupPositionDown.push(
              `${item.left + spacingLeft + this.lineSpacing},${
                childNodes[1].top + topIndent
              }`
            )

            // 中下 -- 右下
            groupPositionDown.push(
              `${item.left + spacingLeft + this.lineSpacing},${
                childNodes[1].top + topIndent
              }`
            )
            groupPositionDown.push(
              `${childNodes[1].left + spacingLeft - horizontalSpace * 2},${
                childNodes[1].top + topIndent
              }`
            )
            console.log('group positions', groupPositions)
            lines.push({
              style: this.getLineStyle('已提交'),
              points: groupPositionDown.join(' ')
            })
          }
        }
      }
      console.log('lines', lines)
      this.lines = lines
    }
  }
}
</script>

<style lang="scss" scoped>
.horizontal-panel {
  position: relative;
  background: #fff;

  .children-link-line {
    top: 0;
    left: 0;
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 9;
  }
}
.hrizontalNode {
  position: relative;
  z-index: 99;
}
</style>
