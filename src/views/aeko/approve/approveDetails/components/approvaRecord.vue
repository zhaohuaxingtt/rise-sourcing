<template>
  <iCard>
    <tableList
      class="margin-top15"
      ref="tableList"
      height="400"
      index
      :selection="false"
      :tableData="tableListData"
      :tableTitle="tableTitle"
      :tableLoading="tableLoading"
      :lang="true"
      v-loading="tableLoading"
    >
      <template #aekoNum="scope">
        <div style="text-align: left">
          <a class="link-underline" href="javascript:;">
            {{ scope.row.aekoNum }}
          </a>
        </div>
      </template>
      <template #endTime="scope">
        <span>{{ scope.row.endTime | formatDate }}</span>
      </template>
      <template #akeoAuditType="scope">
        {{ getAdiType(scope.row.akeoAuditType) }}
      </template>
      <template #startUser="scope">
        <span>{{ scope.row.startUser ? scope.row.startUser.nameZh : "" }}</span>
      </template>
      <template #comment="scope">
        <span>{{ itemCommentContent(scope.row) }}</span>
      </template>
      <template #explainReason="scope">
        <iInput
          v-if="!itemIsCanReply(scope.row, scope.$index)"
          v-model="scope.row.explainReason"
          type="textarea"
          rows="2"
          :placeholder="language('LK_QINGSHURU', '请输入')"
          clearable
        />
        <span v-else-if="itemExplainShow(scope.row)">{{
          itemExplain(scope.row)
        }}</span>
        <span v-else>{{ scope.row.explainReason }}</span>
      </template>
    </tableList>
    <div class="pagination">
      <iPagination
        v-update
        class="pagination"
        @size-change="handleSizeChange($event, getFetchData)"
        @current-change="handleCurrentChange($event, getFetchData)"
        background
        :current-page="page.currPage"
        :page-sizes="page.pageSizes"
        :page-size="page.pageSize"
        :layout="page.layout"
        :total="page.totalCount"
      />
    </div>
  </iCard>
</template>

<script>
import Vuex from "vuex";
import { iCard } from "rise";
import tableList from "@/components/iTableSort";
import {
  approveReCordTableTitle as tableTitle,
} from "../data";
import { pageMixins } from "@/utils/pageMixins";
import {
  findHistoryByAeko,
} from "@/api/aeko/detail/approveRecord";

export default {
    components:{
        iCard,
        tableList
    },
    mixins: [pageMixins],
    data(){
        return{
            tableTitle:tableTitle,
            tableLoading:false,
            tableListData:[],
        }
    },
    created(){
        this.getFetchData();
    },
    props: {
        aekoInfo: {
            type: Object,
            default: () => {},
        },
    },
    computed:{
        ...Vuex.mapState({
            userInfo: (state) => state.permission.userInfo,
        }),
    },
    methods:{
        async getFetchData() {
            this.tableLoading = true;
            await this.getexplainList();
        },
        getexplainList() {
            const parmas = Object.assign({
                applyUserId: String(this.userInfo.id) || "",
                currentUserId: String(this.userInfo.id) || "",
                aekoNo: this.aekoInfo.aekoNo || "",
                hasParentTaskId: true,
                pageNo: this.page.currPage,
                pageSize: this.page.pageSize,
            });
            findHistoryByAeko(parmas).then((res) => {
                this.tableLoading = false;
                if (res?.data) {
                    let resDatas = res.data.records;
                    resDatas = resDatas.filter(
                    (item) =>
                        item.comment != "AutoCompleted" && item.comment != "AutoSkip"
                    );
                    this.tableListData = resDatas.map((item) => {
                    item.disabled = item.activityName != "【补充材料通知】补充材料";
                    return item;
                    });
                }
            });
        },
    }

}
</script>

<style>

</style>