<template>
  <div class="tasks pageCard-main rsPdfCard">
    <slot></slot>
    <iCard title="Background & Objective" class="bo">
      <div class="content">
        <div v-html="content"></div>
      </div>
    </iCard>
    <iCard title="Tasks" class="task">
      <tableList
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
    </iCard>
  </div>
</template>

<script>
import {iCard, icon} from "rise"
import tableList from "@/views/partsign/editordetail/components/tableList"
import {getBackgroundAndObjectiveInfo, getNominateTaskList} from "@/api/designate/decisiondata/tasks"
import {getTaskStatusDesc, tasksTitle} from "@/views/designate/designatedetail/tasks/components/data"

export default {
  components: {iCard, icon, tableList},
  data() {
    return {
      content: "",
      tableTitle: _.cloneDeep(tasksTitle),
      tableListData: []
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
}
</style>
