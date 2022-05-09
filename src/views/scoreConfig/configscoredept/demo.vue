<!--
 * @Author: your name
 * @Date: 2021-06-17 13:44:35
 * @LastEditTime: 2022-03-23 16:37:08
 * @LastEditors: YoHo
 * @Description: In User Settings Edit
 * @FilePath: \front-sourcing\src\views\configscoredept\index.vue
-->
<template>
  <iPage class="configscoredept">
    <div class="header clearFloat">
      <iNavMvp :list="list" :lang="true" :lev="1" routerPage></iNavMvp>
      <div class="control">
        <!-- <iLoger
          :config="{
            module_obj_ae: '评分部门', 
            menuName_obj_ae: ''
          }"
          isPage
          credentials
          class="margin-left20"/> -->
        <span class="margin-left20">
          <icon symbol name="icondatabaseweixuanzhong" class="font24"></icon>
        </span>
      </div>
    </div>
    <iSearch
      class="margin-top25"
      icon
      @sure="sure"
      @reset="reset"
      :resetKey="PARTSIGN_RESETBUTTON"
      :searchKey="PARTSIGN_CONFIRMBUTTON"
    >
      <el-form>
        <el-form-item :label="language('CONFIGSCOREDEPT_PINGFENLEIXING', '评分类型')">
          <iDicoptions v-model="form.rateTag" optionKey="score_dept"/>
        </el-form-item>
        <el-form-item :label="language('CONFIGSCOREDEPT_PINGFENGU', '评分股')">
          <iInput v-model="form.deptNum" :placeholder="language('LK_QINGSHURU','请输入')" />
        </el-form-item>
        <el-form-item :label="language('CONFIGSCOREDEPT_PINGFENREN', '评分人')">
          <iInput v-model="form.userName" :placeholder="language('LK_QINGSHURU','请输入')" />
        </el-form-item>
      </el-form>
    </iSearch>
    <iCard class="margin-top20">
      <template v-slot:header-control>
        <iButton @click="edit">{{ language("BIANJI", "编辑") }}</iButton>
        <iButton @click="add">{{language("TIANJIA", "添加")}}</iButton>
        <iButton @click="deleteItem" :loading="btnLoading.deleteItem">{{ language('SHANCHU', '删除') }}</iButton>
        <buttonTableSetting @click="edittableHeader"></buttonTableSetting>
      </template>
      <div class="body">
        <tableList
          permissionKey="SCORECONFIG_CONFIGSCOREDEPT_DEMO"
          class="table"
          ref="tableList"
          index
          :tableData="tableListData"
          :tableTitle="tableTitle"
          :tableLoading="loading"
          height="100%"
          @handleSelectionChange="handleSelectionChange"
        >
          <!-- 评分人 -->
          <template #raterList="scope">
            <span>{{Array.isArray(scope.row.raterList) ? scope.row.raterList.map((item)=>item.userName).join('、') : ''}}</span>
          </template>
          <!-- 是否需要审批 -->
          <template #isCheck="scope">
            <span>{{scope.row.isCheck == '0' ? language('nominationLanguage.No','否'):language('nominationLanguage.Yes','是')}}</span>
          </template>
          <!-- 上会复核审批人 -->
          <template #willReviewApproverList="scope">
            <span>{{ Array.isArray(scope.row.willReviewApproverList) ? scope.row.willReviewApproverList.map((item)=>item.userName).join('、') :''}}</span>
          </template>
          <!-- 会外流转定点审批人 -->
          <template #flowApproverList="scope">
            <span>{{Array.isArray(scope.row.flowApproverList) ? scope.row.flowApproverList.map((item)=>item.userName).join('、') : ''}}</span>
          </template>
          <!-- 协调人 --> 
          <template #coordinatorList="scope">
            <span>{{Array.isArray(scope.row.coordinatorList) ? scope.row.coordinatorList.map((item)=>item.userName).join('、') :''}}</span>
          </template>
        </tableList>
      </div>
    </iCard>
    <addDialog :dialogVisible="addDialogVisible" @changeVisible="changeVisible" :openType="dialogopenType" :multipleSelection="multipleSelection" @getList="getListSysRateDepart"/>
  </iPage>
</template>

<script>
import { iPage, icon, iSearch, iSelect, iCard, iButton, iInput, iMessage, iNavMvp,iPagination } from "rise"
// import iLoger from 'rise/web/components/iLoger'
import tableList from "@/components/iTableSort"
import addDialog from "./components/addDialog"
import { queryForm, tableTitle } from "./components/data"
import { cloneDeep } from "lodash" 
import { getListSysRateDepart,departsDelete} from "@/api/scoreConfig/configscoredept"
import { TAB } from '../data'
import iDicoptions from 'rise/web/components/iDicoptions' 
import buttonTableSetting from '@/components/buttonTableSetting'
export default {
  components: {
    iPage,
    icon,
    iSearch,
    iCard,
    iButton,
    iInput,
    // iLoger,
    tableList,
    addDialog,
    iNavMvp,
    iDicoptions,
    buttonTableSetting
  },
  data() {
    return {
      list: TAB,
      form: cloneDeep(queryForm),
      loading: false,
      tableTitle: cloneDeep(tableTitle),
      tableListData: [],
      tableListDataCache: [],
      multipleSelection: [],
      saveLoading: false,
      currentRow: null,
      addDialogVisible: false,
      dialogopenType:'add',
      btnLoading:{
        deleteItem:false,
      }
    }
  },
  created() {
    this.getListSysRateDepart()
  },
  methods: {
    handleResetSetting({data, done} = data) {
      console.log('handleResetSetting', data)
      done(data)
    },
    handleSaveSetting({data, done} = data) {
      console.log('handleSaveSetting', data)
      done(data)
    },
    edittableHeader() {
      this.$refs.tableList.settingVisible = true
    },
    getListSysRateDepart() {
      this.loading = true

      const form = {}
      Object.keys(this.form).forEach(key => form[key] = this.form[key] || undefined)

      getListSysRateDepart(form)
      .then(res => {
        if (res.code == 200) {
          this.tableListData = Array.isArray(res.data) ? res.data : []
          this.multipleSelection = []
        } else {
          iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn)
        }

        this.loading = false
      })
      .catch(() => this.loading = false)
    },
    handleSelectionChange(list) {
      this.multipleSelection = list
    },
    // 查询
    async sure() {

      this.getListSysRateDepart()
    },
    // 重置
    async reset() {

      this.form = cloneDeep(queryForm)
      this.getListSysRateDepart()
    },
    changeVisible(type,show){
        this[type] = !!show;
    },
    // 新增
    add(){
      this.dialogopenType = 'add';
      this.changeVisible('addDialogVisible',true);
    },
    // 编辑
    edit(){
      if(this.multipleSelection.length == 1){
        this.dialogopenType = 'edit';
        this.changeVisible('addDialogVisible',true);
      }else{
        this.$message.warning(this.language('CONFIGSCOREDEPT_QINGJINGOUXUANYITIAOSHUJUHOUBIANJI','请仅勾选一条数据后编辑'));
      }
    },
    // 删除
    async deleteItem(){
      const {multipleSelection} = this;
      if(!multipleSelection.length){
        this.$message.warning(this.language('createparts.QingXuanZeZhiShaoYiTiaoShuJu','请选择至少一条数据'));
      }else{
        await this.$confirm(
          this.language('submitSure','您确定要执行提交操作吗？'),
          this.language('LK_SHANCHU','删除'),
        ).then(()=>{
          this.btnLoading.deleteItem = true;
          const ids = (multipleSelection.map((item)=>item.id));
          departsDelete(ids).then((res)=>{
            this.btnLoading.deleteItem = false;
            if(res.code ==200){
              this.$message.success(this.language('LK_CAOZUOCHENGGONG','操作成功'));
              this.getListSysRateDepart();
            }else{
              this.$message.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn);
            }
          })
          
        }).catch(()=>{ this.btnLoading.deleteItem = false });
      }
    },
  }
}
</script>

<style lang="scss" scoped>
.configscoredept {
  .header {
    position: relative;
    margin-bottom: 40px;
    .title {
      font-size: 20px;
      font-weight: bold;
      color: #000;
      height: 28px;
      line-height: 28px;
    }

    .control {
      position: absolute;
      top: 50%;
      right: 0;
      // 影响到了日志弹窗，暂时注释掉，后面用其他属性代替
      // transform: translate(0, -50%);
      display: flex;
      align-items: center;
      height: 30px;
    }
  }

  .card {
    padding-bottom: 40px;
    .body {
      height: calc(100vh - 445px);
      min-height: 430px;
    }
  }

  .deptScoreTypeSelect {
    width: 230px;
  }

  .deptNumSelect {
    width: 330px;

    ::v-deep input {
      cursor: pointer;
    }

    ::v-deep .el-input__suffix {
      right: 0;
    }
  }

  ::v-deep .el-input__suffix {
    .inputSearchIcon {
      display: inline-block;
      width: 30px;
      font-size: 16px;
      height: 100%;

      .icon {
        height: 100% !important;
      }
    }
  }

  .isAuditSelect {
    width: 120px;
  }
}
</style>