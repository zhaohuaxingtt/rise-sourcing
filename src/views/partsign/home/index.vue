<!--
 * @Author: yuszhou
 * @Date: 2021-02-24 09:17:57
 * @LastEditTime: 2021-03-17 18:56:58
 * @LastEditors: Please set LastEditors
 * @Description: 零件签收列表界面.
 * @FilePath: \rise\src\views\partsign\index.vue
-->
<template>
  <iPage>
    <div class="margin-bottom20">
      <iNav-mvp @change="change" right></iNav-mvp>
    </div>
    <!------------------------------------------------------------------------>
    <!--                  search 搜索模块                                   --->
    <!------------------------------------------------------------------------>
    <iSearch class="margin-bottom20">
      <el-form>
        <el-form-item label="零件号">
						<iInput v-model="form.partNum" placeholder='请输入零件号'></iInput>
				</el-form-item>
        <el-form-item label="零件名（中）">
						<iInput v-model="form.partNameZh" placeholder='请输入零件名（中）'></iInput>
				</el-form-item>
        <el-form-item label="设计科室">
						<iInput v-model="form.dept" placeholder='请填写设计科室'></iInput>
				</el-form-item>
        <el-form-item label="工程师">
							<iInput placeholder='请填写工程师'></iInput>
				</el-form-item>
        <el-form-item label="车型项目">
							<iSelect v-model="form.projectCarType" placeholder='请选择车型项目'>
                <el-option :value="items.value" :label="items.label" v-for="(items,index) in fromGroup.projectCarType" :key="index"></el-option>
              </iSelect>
				</el-form-item>
        <el-form-item label="信息单分类">
							<iSelect v-model="form.tpInfoType" placeholder='请选择信息分类'>
                <el-option :value="items.value" :label="items.label" v-for="(items,index) in fromGroup.tpInfoType" :key="index"></el-option>
              </iSelect>
				</el-form-item>
        <el-form-item label="信息单状态">
						<iSelect v-model="form.status" placeholder='请选择信息单状态'>
               <el-option :value="items.value" :label="items.label" v-for="(items,index) in fromGroup.status" :key="index"></el-option>
            </iSelect>
				</el-form-item>
        <el-form-item label="信息单流水号">
						<iInput v-model="form.id" placeholder='请填写信息单流水号'></iInput>
				</el-form-item>
        <el-form-item label="询价资料状态">
						<iSelect v-model="form.attachmentStatus" placeholder='请选择询价资料状态'>
              <el-option :value="items.value" :label="items.label" v-for="(items,index) in fromGroup.attachmentStatus" :key="index"></el-option>
            </iSelect>
				</el-form-item>
        <el-form-item label="每车用量状态">
						<iSelect v-model="form.partDosageStatus" placeholder='请选择没车用量状态'>
              <el-option :value="items.value" :label="items.label" v-for="(items,index) in fromGroup.partDosageStatus" :key="index"></el-option>
            </iSelect>
				</el-form-item>
      </el-form>
    </iSearch>
    <iCard>
      <!------------------------------------------------------------------------>
      <!--                  table模块，向外入参表格数据，表头                    --->
      <!------------------------------------------------------------------------>
      <div class="margin-bottom20 clearFloat">
        <span class="font18 font-weight">新件信息单签收</span>
        <div class="floatright">
          <iButton @click="save">签收</iButton>
          <iButton @click="openDiologBack">退回</iButton>
          <iButton @click="openDiologChangeItems">转派</iButton>
        </div>
      </div>
      <tablelist
        :tableData="tableListData"
        :tableTitle="tableTitle"
        :tableLoading="tableLoading"
        @handleSelectionChange="handleSelectionChange"
        @openPage='openPage'
      ></tablelist>
      <!------------------------------------------------------------------------>
      <!--                  表格分页                                          --->
      <!------------------------------------------------------------------------>
      <iPagination
        @size-change="handleSizeChange($event, getTableList)"
        @current-change="handleCurrentChange($event, getTableList)"
        background
        :page-sizes="page.pageSizes"
        :page-size="page.pageSize"
        :layout="page.layout"
        :current-page='page.currPage'
        :total="page.totalCount"
      />
    </iCard>
    <!------------------------------------------------------------------------>
    <!--                  转派弹出框                                        --->
    <!------------------------------------------------------------------------>
    <changeItems
      v-model="diologChangeItems"
      @sure="sureChangeItems"
    ></changeItems>
    <!------------------------------------------------------------------------>
    <!--                  退回弹出框                                         --->
    <!------------------------------------------------------------------------>
    <backItems v-model="diologBack" @sure="sureBackmark"></backItems>
  </iPage>
</template>
<script>
import { iPage, iButton, iCard, iMessage ,iPagination,iSearch,iInput,iSelect} from "@/components";
import tablelist from "./components/tableList";
import { tableTitle,form,fromGroup } from "./components/data";
import { getTabelData,getPageGroup,qstuihui } from "@/api/partsign/home";
import { pageMixins } from "@/utils/pageMixins";
import backItems from "./components/backItems";
import changeItems from "./components/changeItems";
import { iNavMvp } from "@/components";
export default {
  components: { iPage, tablelist, iButton, iCard, backItems, changeItems ,iNavMvp,iPagination,iSearch,iInput,iSelect},
  mixins: [pageMixins],
  data() {
    return {
      tableListData: [],
      tableTitle: tableTitle,
      tableLoading: false,
      selectTableData: [],
      diologChangeItems: false,
      diologBack: false,
      backmark: "",
      inquiryBuyer: "",
      inquiryBuyerList: [],
      form:form,
      fromGroup:fromGroup
    };
  },
  created() {
    this.getPageGroup();
    this.getTableList();
  },
  methods: {
    openPage(){
      this.$router.push({
        path:'/partsign/editordetail'
      })
    },
    //获取上方group信息
    getPageGroup(){
      getPageGroup(this.form.userId).then(res=>{
        this.fromGroup = res.data
      })
    },
    //获取表格数据
    getTableList() {
      this.tableLoading = true;
      getTabelData({...this.form,...this.pageParmars()}).then((res) => {
        this.tableLoading = false;
        this.page.currPage = res.data.currPage
        this.page.pageSize = res.data.pageSize
        this.page.totalCount = res.data.totalCount
        this.tableListData = res.data.list;
      }).catch(err=>{
        this.tableLoading = false;
        this.tableListData = []
      });
    },
    //修改表格改动列
    handleSelectionChange(val) {
      this.selectTableData = val;
    },
    //签收
    save() {
      if (this.selectTableData.length == 0)
        return iMessage.warn("抱歉，您当前还未选择您需要签收的信息单！");
      console.log(this.selectTableData);
    },
    //退回
    openDiologBack() {
      if (this.selectTableData.length == 0)
        return iMessage.warn("抱歉，您当前还未选择您需要退回的信息单！");
      this.diologBack = true;
    },
    //转派
    openDiologChangeItems() {
      if (this.selectTableData.length == 0)
        return iMessage.warn("抱歉，您当前还未选择您需要转派的信息单！");
      this.diologChangeItems = true;
    },
    sureBackmark(val) {
      console.log("your message:", val);
      this.diologBack = false;
      this.getTableList();
    },
    sureChangeItems(val) {
      console.log("your select data is", JSON.parse(val));
      this.diologChangeItems = false;
      this.getTableList();
    },
  },
};
</script>
<style lang="scss" scoped></style>
