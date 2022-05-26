<template>
  <div class="tasks rsPdfCard" ref="tasks">
    <div ref="tabTitle" style="padding:1px">
      <slot name="tabTitle"></slot>
    </div>
    <div ref="rsPdfCard">
      <iCard title="Background & Objective" class="bo">
        <div class="content" ref="bo">
          <div v-html="content"></div>
        </div>
      </iCard>
      <iCard title="Tasks" class="task margin-top20">
        <tableList
          :selection="false"
          :tableTitle="tableTitle"
          :tableData="tableListData"
          row-class-name="table-row"
        >
          <template #isFinishFlag="scope">
            <span>{{ getTaskStatusDesc(scope.row.isFinishFlag) }}</span>
          </template>
          <template #show="scope">
            <icon
              v-if="!scope.row.isPresent"
              class="iconyincang"
              name="iconyincang"
            />
            <icon v-else class="iconxianshi" name="iconxianshi" />
          </template>
        </tableList>
      </iCard>
    </div>
    <div class="page-logo" ref="logo">
      <img
        src="../../../../../../../assets/images/logo.png"
        alt=""
        :height="46 * 0.6 + 'px'"
        :width="126 * 0.6 + 'px'"
      />
      <div>
        <p class="pageNum"></p>
      </div>
      <div>
        <p>{{ userName }}</p>
        <p>{{ new Date().getTime() | dateFilter("YYYY-MM-DD") }}</p>
      </div>
    </div>
    <div class="pdf-item">
      <template v-for="(content,i) in contentList">
        <div :key="i" class="tasks pageCard-main rsPdfCard">
          <div style="padding:1px">
            <slot name="tabTitle"></slot>
          </div>
          <iCard title="Background & Objective" class="bo">
            <div class="content"  :style="{ height: cntentHeight + 'px' }">
              <div v-html="content"></div>
            </div>
            <div class="page-logo">
              <img
                src="../../../../../../../assets/images/logo.png"
                alt=""
                :height="46 * 0.6 + 'px'"
                :width="126 * 0.6 + 'px'"
              />
              <div>
                <p class="pageNum"></p>
              </div>
              <div>
                <p>{{ userName }}</p>
                <p>{{ new Date().getTime() | dateFilter("YYYY-MM-DD") }}</p>
              </div>
            </div>
          </iCard>
        </div>
      </template>
      <template v-for="(tableData, i) in tableList">
        <div class="tasks pageCard-main rsPdfCard" :key="i">
          <div style="padding:1px">
            <slot name="tabTitle"></slot>
          </div>
          <iCard title="Tasks" class="task">
            <div :style="{ height: cntentHeight + 'px' }">
              <tableList
                :selection="false"
                :tableTitle="tableTitle"
                :tableData="tableData"
              >
                <template #isFinishFlag="scope">
                  <span>{{ getTaskStatusDesc(scope.row.isFinishFlag) }}</span>
                </template>
                <template #show="scope">
                  <icon
                    v-if="!scope.row.isPresent"
                    class="iconyincang"
                    name="iconyincang"
                  />
                  <icon v-else class="iconxianshi" name="iconxianshi" />
                </template>
              </tableList>
            </div>
            <div class="page-logo">
              <img
                src="../../../../../../../assets/images/logo.png"
                alt=""
                :height="46 * 0.6 + 'px'"
                :width="126 * 0.6 + 'px'"
              />
              <div>
                <p class="pageNum"></p>
              </div>
              <div>
                <p>{{ userName }}</p>
                <p>{{ new Date().getTime() | dateFilter("YYYY-MM-DD") }}</p>
              </div>
            </div>
          </iCard>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import { iCard, icon } from "rise";
import tableList from "@/views/partsign/editordetail/components/tableList";
import {
  getBackgroundAndObjectiveInfo,
  getNominateTaskList,
} from "@/api/designate/decisiondata/tasks";
import {
  getTaskStatusDesc,
  tasksTitle,
} from "@/views/designate/designatedetail/tasks/components/data";
import filters from "@/utils/filters";

export default {
  mixins: [filters],
  props: {
    tableList: { type: Array, default: () => [] },
    prototypeTableList: { type: Array, default: () => [] },
  },
  computed: {
    userName() {
      return this.$i18n.locale === "zh"
        ? this.$store.state.permission.userInfo.nameZh
        : this.$store.state.permission.userInfo.nameEn;
    },
  },
  components: { iCard, icon, tableList },
  data() {
    return {
      content: "",
      tableTitle: tasksTitle,
      tableListData: [],
      cntentHeight: 0,
      tableList: [],
      contentList:[]
    };
  },
  created() {
    // this.tableTitle.push({
    //   props: "show",
    //   name: "Hide/Unhide",
    // });
    this.tableTitle.unshift({ props: 'index', name: '序号', key: 'LK_XUHAO', width: 80 })
    this.getBackgroundAndObjectiveInfo();
    this.getNominateTaskList();
  },
  methods: {
    getHeight() {
      if (!this.$refs.tasks) return;
      let pList = this.$refs.bo.getElementsByTagName('p');
      let imgList = []
      for (let i = 0; i < pList.length; i++) {
        const element = pList[i];
        if(element.outerHTML.includes('img')){
          const img = element.getElementsByTagName('img')[0]
          if(!img.complete)
          imgList.push(this.$store.dispatch('sourcing/pushImgList',img))
        }
      }
      Promise.all(imgList).then(()=>{
        console.log('tasks');
        this.width = this.$refs.tasks?.offsetWidth;
        let hasTitle = this.$refs.tabTitle.offsetHeight
        let headerHeight = this.$refs.rsPdfCard.getElementsByClassName('cardHeader')[0].offsetHeight // Title 区域高度
        let pageLogo = this.$refs.logo.offsetHeight     // logo 区域高度
        let tableHeader = this.$refs.rsPdfCard.getElementsByClassName('el-table__header-wrapper')[0].offsetHeight
        this.cntentHeight =
          (this.width / 841.89) * 595.28 -
          headerHeight -
          pageLogo -
          hasTitle; // 内容区域对应的高度
        let rowList = this.$refs.tasks.getElementsByClassName("table-row");
        let heightSum = 0;
        let tableList = [];
        let arr = [];
        rowList.forEach((item, i) => {
          heightSum += item.offsetHeight;
          if (heightSum < this.cntentHeight - tableHeader) {
            arr.push(this.tableListData[i]);
          } else {
            tableList.push(JSON.parse(JSON.stringify(arr)));
            heightSum = item.offsetHeight;
            arr = [this.tableListData[i]];
          }
        });
        tableList.push(JSON.parse(JSON.stringify(arr)));
        this.tableList = tableList;
        
        let pHeightSum = 20
        let contentList = []
        let itemContent = ''
        pList.forEach(p=>{
          pHeightSum += p.offsetHeight
          if(pHeightSum < this.cntentHeight){
            itemContent+=p.outerHTML
          }else{
            contentList.push(itemContent)
            itemContent = p.outerHTML
            pHeightSum = p.offsetHeight
          }
        })
        contentList.push(itemContent)
        this.contentList = contentList
      })
    },
    getBackgroundAndObjectiveInfo: function () {
      getBackgroundAndObjectiveInfo({
        nominateId: this.$route.query.desinateId,
      }).then((res) => {
        if (res.code == 200) {
          this.content = res.data?.content || "";
        }
      });
    },
    getNominateTaskList: function () {
      getNominateTaskList({
        nominateId: this.$route.query.desinateId,
        current: 1,
        size: 999999,
        isPreview: true,
      }).then((res) => {
        if (res.code == 200) {
          this.tableListData = Array.isArray(res.data) ? res.data.map((item,i)=>{
            item.index = i+1
            return item
          }) : [];
          this.$nextTick(() => {
            this.getHeight();
          });
        }
      });
    },
    // 取任务状态
    getTaskStatusDesc,
  },
};
</script>

<style lang="scss" scoped>
.rsPdfCard {
  box-shadow: none;
  & + .rsCard {
    margin-top: 20px; /*no*/
  }
  ::v-deep .cardHeader {
    padding: 30px 0px;
  }
  ::v-deep .cardBody {
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
    .iconyincang {
      fill: rgb(35, 24, 21);
      opacity: 0.503;
    }

    .iconxianshi {
      color: rgb(22, 96, 241);
    }
  }
}
.page-logo {
  display: flex;
  justify-content: space-between;
  padding: 10px;
  align-items: center;
  border-top: 1px solid #666;
}
</style>
