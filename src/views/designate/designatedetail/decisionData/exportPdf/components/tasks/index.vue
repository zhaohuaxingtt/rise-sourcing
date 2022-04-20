<template>
  <div class="tasks pageCard-main rsPdfCard" ref="tasks">
    <slot name="tabTitle"></slot>
    <iCard title="Background & Objective" class="bo">
      <div class="content" ref="bo">
        <div v-html="content"></div>
      </div>
    </iCard>
    <iCard title="Tasks" class="task">
      <tableList
          :style="{'height': cntentHeight + 'px'}"
          :selection="false"
          :tableTitle="tableTitle"
          :tableData="tableListData">
        <template #isFinishFlag="scope">
          <span>{{ getTaskStatusDesc(scope.row.isFinishFlag) }}</span>
        </template>
        <template #show="scope">
          <icon v-if="!scope.row.isPresent" class="iconyincang" name="iconyincang"/>
          <icon v-else class="iconxianshi" name="iconxianshi"/>
        </template>
      </tableList>
      <div class="page-logo">
        <img src="../../../../../../../assets/images/logo.png" alt="" :height="46*0.6+'px'" :width="126*0.6+'px'">
        <div>
          <p>{{'page '+(index+1)+' of '+ (prototypeTableList.length+tableList.length)}}</p>
        </div>
        <div>
          <p>{{ userName }}</p>
          <p>{{ new Date().getTime() | dateFilter('YYYY-MM-DD')}}</p>
        </div>
      </div>
    </iCard>
  </div>
</template>

<script>
import {iCard, icon} from "rise"
import tableList from "@/views/partsign/editordetail/components/tableList"
import {getBackgroundAndObjectiveInfo, getNominateTaskList} from "@/api/designate/decisiondata/tasks"
import {getTaskStatusDesc, tasksTitle} from "@/views/designate/designatedetail/tasks/components/data"
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
    hasTitle(){
      return this.$slots.tabTitle && 116 || 0
    }
  },
  components: {iCard, icon, tableList},
  data() {
    return {
      content: "",
      tableTitle: _.cloneDeep(tasksTitle),
      tableListData: [],
      cntentHeight:0
    }
  },
  created() {
    this.tableTitle.push({
      props: 'show',
      name: 'Hide/Unhide'
    })

    this.getBackgroundAndObjectiveInfo()
    this.getNominateTaskList()
  },
  mounted(){
  this.width = this.$refs.tasks.clientWidth
  let boHeight = this.$refs.bo.clientHeight + 84
  let headerHeight = 84 // Title 区域高度
  let pageLogo = 52     // logo 区域高度
  this.cntentHeight = (this.width / 841.89) * 595.28 - headerHeight - pageLogo - boHeight - this.hasTitle // 内容区域对应的高度
},
  methods: {
    getBackgroundAndObjectiveInfo: function () {
      getBackgroundAndObjectiveInfo({
        nominateId: this.$route.query.desinateId
      })
          .then(res => {
            if (res.code == 200) {
              this.content = res.data.content || ""
            }
          })
    },
    getNominateTaskList: function () {
      getNominateTaskList({
        nominateId: this.$route.query.desinateId,
        current: 1,
        size: 999999,
        isPreview: false
      }).then(res => {
        if (res.code == 200) {
          this.tableListData = Array.isArray(res.data) ? res.data : []
        }
      })
    },
    // 取任务状态
    getTaskStatusDesc,
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
.tasks {
  .bo {
    .content {
      border: 1px solid rgb(201, 216, 219); /*no*/
      // box-shadow: 0 0 1px rgb(0 38 98 / 15%); /*no*/
      border-radius: 5px; /*no*/
      padding: 5px 10px; /*no*/
      min-height: 120px; /*no*/
    }
  }

  .task {
    margin-top: 20px; /*no*/

    .iconyincang {
      fill: rgb(35, 24, 21);
      opacity: 0.503;
    }

    .iconxianshi {
      color: rgb(22, 96, 241);
    }
  }
  .page-logo{
    display: flex;
    justify-content: space-between;
    padding: 10px;
    align-items: center;
    border-top: 1px solid #666;
  }
}
</style>
