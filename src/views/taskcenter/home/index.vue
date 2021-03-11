<template>
  <iPage id="taskCenterHome" class="home">
    <div id="header">
      <div class="margin-bottom20 clearFloat">
        <span class="font18 font-weight">任务中心</span>
        <div class="floatright">
          <logButton />
          <span class="margin-left20">
            <icon symbol name="icondatabaseweixuanzhong" class="font18"></icon>
          </span>
        </div>
      </div>
      <tabs v-model="type" @tab-click="handleTypeChange">
        <tabPane label="全部" name="all" />
        <tabPane :label="chunk.label" :name="chunk.type" v-for="(chunk, $chunkIndex) in data" :key="$chunkIndex" />
      </tabs>
      <iSearch class="search margin-top10" icon>
        <el-form>
          <el-form-item label="场景名称/任务名称">
            <iInput v-model="search" class="input" placeholder="请输入查询">
              <icon slot="suffix" name="iconshaixuankuangsousuo" />
            </iInput>
          </el-form-item>
        </el-form>
      </iSearch>
    </div>
    <div id="scroll" class="scroll" @scroll="scrollGet($event)">
      <div class="content padding-top20" :id="chunk.type" v-for="(chunk, $chunkIndex) in data" :key="$chunkIndex">
        <div class="chunk">
          <div class="title font-weight" :class="{ current: type === chunk.type }">{{ chunk.label }}</div>
          <div class="row clearFloat margin-top20">
            <div class="col" v-for="(item, $itemIndex) in chunk.list" :key="$itemIndex">
              <card />
            </div>
          </div>
        </div>
      </div>
    </div>
  </iPage>
</template>

<script>
import { iPage, icon, iSearch, iInput } from '@/components'
import card from './components/card'
import tabs from './components/tabs'
import tabPane from './components/tabPane'

export default {
  components: { iPage, icon, iSearch, iInput, card, tabs, tabPane },
  data() {
    return {
      type: 'all',
      search: '',
      data: [
        {
          type: 'xunyuan',
          label: '寻源',
          list: [ {}, {}, {}, {}, {} ]
        },
        {
          type: 'songyang1',
          label: '送样1',
          list: [ {}, {}, {}, {}, {} ]
        }
      ],
      scrollDom: null,
      contentDomList: [],
      block: false,
      timeOut: {
        timer: 0,
        scroll: 0
      }
    }
  },
  created() {
    for(let i = 2; i < 30; i++) {
      this.data.push({
        type: `songyang${ i }`,
        label: `送样${ i }`,
        list: [ {}, {}, {}, {}, {} ]
      })
    }
  },
  mounted() {
    this.initScroll()

    window.addEventListener('resize', () => {
      this.initScroll()
    })
  },
  methods: {
    getStyle(dom, style) {
      return window.getComputedStyle(dom, null)[style]
    },
    initScroll() {
      const taskCenterDom = document.querySelector('#taskCenterHome')
      const taskCenterRect = taskCenterDom.getBoundingClientRect()

      // 获取taskCenter iPage组件高度
      const taskCenterHeight = taskCenterRect ? taskCenterRect.height : 0

      // 获取taskCenter iPage组件paddingTop值
      const taskCenterPaddingTop = parseFloat(this.getStyle(taskCenterDom, 'padding-top'))
      
      // // 获取header高度
      const headerRect = taskCenterDom.querySelector('#header').getBoundingClientRect()
      const headerHeight = headerRect ? headerRect.height : 0

      this.scrollDom = taskCenterDom.querySelector('#scroll')
      this.scrollDom.style.height = `${ taskCenterHeight - taskCenterPaddingTop - headerHeight - 4 }px`

      this.contentDomList = this.data.map(item => this.scrollDom.querySelector(`#${ item.type }`))

      this.scrollDom.style.paddingRight = `${ parseFloat(this.getStyle(this.scrollDom, 'padding-right')) - (this.scrollDom.offsetWidth - this.scrollDom.clientWidth) }px`
    },
    handleTypeChange(val) {
      const dom = this.scrollDom.querySelector(`#${ val }`)
      this.block = true
        
      if (val === 'all') {
        this.scrollDom.scrollTo({
          top: 0,
          behavior: 'smooth'
        })
      } else {
        dom && dom.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'start' })
      }
    },
    scrollGet(e) {
      if (this.block) {
        clearTimeout(this.timeOut.timer)
        const scrollTop = e.target.scrollTop
        this.timeOut.timer = setTimeout(() => {
          if (scrollTop === this.timeOut.scroll) {
            this.block = false
            clearTimeout(this.timeOut.timer)
          }
        }, 50)
        this.timeOut.scroll = e.target.scrollTop
        return
      }

      const scrollTop = e.target.scrollTop
      for (let i = 0, dom; (dom = this.contentDomList[i++]); ) {
        const domRect = dom.getBoundingClientRect()
        if (scrollTop <= (dom.offsetTop + domRect.height - domRect.height * 0.2)) {
          this.type = this.data[i - 1].type
          break;
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.home {
  overflow: hidden;

  .scroll {
    position: absolute;
    overflow-x: hidden;
    overflow-y: scroll;
    padding-right: 40px;
  }

  .row {
    margin-left: -20px;
    margin-right: -20px;

    .col {
      float: left;
      box-sizing: border-box;
      min-width: 25%;
      padding: 0 20px;
      margin-bottom: 30px;
    }
  }

  .search {
    ::v-deep .cardBody {
      padding: 20px 40px;
    }

    .input {
      ::v-deep input {
        width: 220px;
        padding-right: 50px;
      }

      ::v-deep .el-input__suffix {
        right: 20px;

        .el-input__suffix-inner {
          height: 35px;
          line-height: 35px;
        }
      }
    }
  }

  .content {
    .chunk {
      .title {
        font-size: 20px;
      }

      .current {
        color: $color-blue;
      }
    }
  }
}
</style>