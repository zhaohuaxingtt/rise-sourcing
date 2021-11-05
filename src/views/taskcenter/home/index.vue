<template>
  <iPage id="taskCenterHome" class="home" v-loading="loading">
    <div id="header" class="header">
      <div class="margin-bottom20 clearFloat">
        <span class="font18 font-weight">{{language('LK_RENWUZHONGXIN','任务中心')}}</span>
        <div class="floatright">
          <!-- <logButton @click="log" /> -->
          <span class="margin-left20">
            <icon symbol name="icondatabaseweixuanzhong" class="font18"></icon>
          </span>
        </div>
      </div>
      <tabs v-model="type" @tab-click="handleTypeChange">
        <tabPane :label="language('all','全部')" name="all" />
        <tabPane :label="taskTypeFloatMap[taskType].name || taskType" :name="taskType" v-for="(task, taskType) in taskGroup" :key="taskType" />
      </tabs>
      <iSearch class="search margin-top10" icon>
        <el-form>
          <el-form-item :label="language('LK_CHANGJIANGMINGCHNEG','场景名称/任务名称')">
            <iInput v-model="search" class="input" :placeholder="language('LK_RFQPLEASEENTERQUERY','请输入查询')">
              <icon slot="suffix" name="iconshaixuankuangsousuo" />
            </iInput>
          </el-form-item>
        </el-form>
      </iSearch>
    </div>
    <div class="scrollBox">
      <div id="scroll" class="scroll" @scroll="scrollGet($event)">
        <div class="content padding-top20" :id="`dom_${ taskType }`" v-for="(task, taskType) in taskGroup" :key="taskType">
          <div class="chunk">
            <div class="title font-weight" :class="{ current: type == taskType }">{{ taskTypeFloatMap[taskType].name || taskType }}</div>
            <div class="row clearFloat margin-top20">
              <div class="col" v-for="(item, $index) in task" :key="$index">
                <card :data="item" :tag="taskTypeFloatMap[taskType].name || taskType" :title="taskTypeFloatMap[item.taskTypeCode].name" @click="jump" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </iPage>
</template>

<script>
import { iPage, icon, iSearch, iInput } from 'rise'
import card from './components/card'
import tabs from './components/tabs'
import tabPane from './components/tabPane'
import { getCountInfo } from '@/api/taskcenter/home'
import { getDictByCode } from '@/api/dictionary';

export default {
  components: { iPage, icon, iSearch, iInput, card, tabs, tabPane },
  data() {
    return {
      loading: false,
      type: 'all',
      search: '',
      taskTypeList: [],
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
      },
      taskTypeFloatMap: {},
      taskTypeTree: [],
      taskGroup: {}
    }
  },
  computed: {
    // eslint-disable-next-line no-undef
    ...Vuex.mapState({
      userInfo: state => state.permission.userInfo,
    })
  },
  created() {
    this.getData()
  },
  mounted() {
    this.initScroll()

    const basePdr = parseFloat(this.getStyle(this.scrollDom, 'padding-right'))
    window.addEventListener('resize', () => {
      this.initScroll()
      this.scrollDom.style.paddingRight = `${ basePdr - (this.scrollDom.offsetWidth - this.scrollDom.clientWidth) }px`
    })

    this.scrollDom.style.paddingRight = `${ basePdr - (this.scrollDom.offsetWidth - this.scrollDom.clientWidth) }px`
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

      this.contentDomList = Object.keys(this.taskGroup).map(key => this.scrollDom.querySelector(`#dom_${ key }`))
    },
    handleTypeChange(val) {
      const dom = this.scrollDom.querySelector(`#dom_${ val }`)
      this.block = true
        
      if (val === 'all') {
        this.scrollDom.scrollTo({
          top: 0,
          behavior: 'smooth'
        })
      } else {
        dom && this.scrollDom.scrollTo({ top: dom.offsetTop, behavior: 'smooth' })
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
          this.type = dom.id.replace(/dom_/, '')
          break;
        }
      }
    },
    async getData() {
      try {
        this.loading = true
        const dictRes = await getDictByCode('12')
        const dict = dictRes.data
        this.taskTypeFloatMap = {}
        if (dict && dict[0] && Array.isArray(dict[0].subDictResultVo)) {
          dict[0].subDictResultVo.forEach(item => {
            this.taskTypeFloatMap[item.code] = { name: item.name }

            if (Array.isArray(item.subDictResultVo)) {
              item.subDictResultVo.forEach(child => {
                this.taskTypeFloatMap[child.code] = { name: child.name, parent: { code: item.code, name: item.name } }
              })
            }
          })
        }

        const listRes = await getCountInfo({ userNum: this.userInfo.id })
        const list = listRes.data
        this.taskGroup = {}
        list.forEach(task => {
          if (this.taskTypeFloatMap[task.taskTypeCode]) {
            const parent = this.taskTypeFloatMap[task.taskTypeCode].parent
            if (parent) {
              if (!Reflect.has(this.taskGroup, parent.code + '')) {
                this.$set(this.taskGroup, parent.code + '', [])
              }

              this.taskGroup[parent.code].push(task)
            }
          }
        })

        this.$nextTick(() => this.initScroll())
      } catch(e) {
        console.error(e)
      } finally {
        this.loading = false
      }
    },
    // log() {
    //   window.open(`/#/log?recordId=`, '_blank')
    // }
    jump() {
      this.$router.push({ path: '/sourceinquirypoint/sourcing/partsign' })
    }
  }
}
</script>

<style lang="scss" scoped>
.home {
  overflow: hidden;

  ::v-deep .el-loading-mask {
    z-index: 2;
  }

  .header {
    position: relative;
    z-index: 1;
  }

  .scrollBox {
    position: relative;
    left: 0;
    width: calc(100% + 40px);

    .scroll {
      position: absolute;
      overflow-x: hidden;
      overflow-y: auto;
      padding-right: 40px;
      left: 0;
      right: 0;
      font-size: 16px;
    }
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
    position: relative;

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