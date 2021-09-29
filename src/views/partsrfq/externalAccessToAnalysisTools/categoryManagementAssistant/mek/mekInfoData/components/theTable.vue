<!--
 * @version: 1.0
 * @Author: zbin
 * @Date: 2021-08-05 15:47:10
 * @LastEditors: Please set LastEditors
 * @Descripttion: your project
-->
<template>
  <div>
    <el-form label-position="left" label-width="50">
      <el-row type="flex" justify="space-between" align="middle">
        <el-col :span="4">
          <el-form-item :label="language('CAILIAOZU','材料组')">
            <iSelect clearable filterable @change="getTableList" :placeholder="language('QXZCLZ','请选择材料组')" v-model="form.materialGroupCode">
              <el-option :value="item.categoryCode" :label="item.categoryName" v-for="item of formGoup.materialGroupList" :key="item.categoryCode"></el-option>
            </iSelect>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item :label="language('CHEXING','车型')">
            <iSelect clearable filterable @change="getTableList" :placeholder="language('QXZCX','请选择车型')" v-model="form.motorId">
              <el-option :value="item.id" :label="item.modelNameZh" v-for="item of formGoup.carTypeList" :key="item.id"></el-option>
            </iSelect>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item :label="language('LINGJIANHAO','零件号')">
            <iInput clearable @change="getTableList" :placeholder="language('QSRLINGJIANHAO','请输入零件号')" v-model="form.partNumber">
            </iInput>
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item>
            <div v-if="isEdit">
              <iButton @click="edit">{{language('BIANJI','编辑')}}</iButton>
              <iButton @click="handleAdd">{{language('TIANJIA','添加')}}</iButton>
              <iButton @click="handleDelete">{{language('SHANCHU','删除')}}</iButton>
              <iButton @click="handleExport">{{language('DAOCHU','导出')}}</iButton>
              <iButton @click="handleLog">{{language('Change Log','Change Log')}}</iButton>
            </div>
            <div v-else>
              <iButton @click="edit">{{language('QUXIAO','取消')}}</iButton>
              <iButton @click="handleSave">{{language('BAOCUN','保存')}}</iButton>
            </div>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <el-table tooltip-effect="light" class="elTable" v-loading="tableLoading" @selection-change="handleSelectionChange" :data="tableListData" style="width: 100%">
      <el-table-column type="selection" width="55">
      </el-table-column>
      <el-table-column type="index" :index="indexMethod" label="#" width="55"> </el-table-column>
      <el-table-column show-overflow-tooltip :label="language('LINGJIAN','零件')" prop="date">
        <template slot-scope="scope">
          <div>{{scope.row.partNumber}}</div>
          <div>{{scope.row.partName}}</div>
        </template>
      </el-table-column>
      <el-table-column show-overflow-tooltip :label="language('CAILIAOZU','材料组')" prop="materialGroup">
        <template slot-scope="scope">
          <div>{{scope.row.materialGroup}}</div>
          <div>{{scope.row.stuffGroup}}</div>
        </template>
      </el-table-column>
      <el-table-column show-overflow-tooltip :label="language('CHEXINGXINGXI','车型信息')" prop="name">
        <template slot-scope="scope">
          <div>{{scope.row.motorName}}</div>
          <div>{{scope.row.motorProject}}</div>
        </template>
      </el-table-column>
      <el-table-column show-overflow-tooltip :label="language('PINGPAIPINGTAI','品牌/平台')" prop="name">
        <template slot-scope="scope">
          <div>{{scope.row.brand}}</div>
          <div>{{scope.row.platform}}</div>
        </template>
      </el-table-column>
      <el-table-column show-overflow-tooltip :label="language('JIEBIELEIXING','级别/类型')" prop="name">
        <template slot-scope="scope">
          <div>{{scope.row.position}}</div>
          <div>{{scope.row.type}}</div>
        </template>
      </el-table-column>
      <el-table-column width="300" :label="language('CHEXINGXINGXI','车型信息')">
        <template slot="header">
          <div>{{language('CHEXINGXINGXI','车型信息')}}</div>
          <div class="flex-between-center-center margin-top10">
            <div>{{language('PEIZHIXINGXI','配置信息')}}</div>
            <icon name="iconMEK-xuxian" symbol />
            <div class="flex-between-center-center">
              <span>{{language('CHUANDONG','EBR')}}</span>
              <el-popover trigger="hover" placement="top-start" :content="language('SBXTZBFBSCXFCGLGLJSZCX','鼠标悬停在百分比上出现浮窗，高亮出该零件所在车型')">
                <icon slot="reference" symbol name="iconxinxitishi" class="font-size16 margin-left5" />
              </el-popover>
            </div>
          </div>
        </template>
        <template slot-scope="scope">
          <div class="flex-between-center-center">
            <div v-if="isEdit">{{scope.row.carTypeInfo}}</div>
            <div v-else>
              <iSelect :loading="carTypeInfoLoading" @focus="getCarTypeMessage(scope.row.motorSvwCode)" :placeholder="language('QINGXUANZHE','请选择')" v-model="scope.row.carTypeInfo">
                <el-option :value="item.carTypeInfo" :label="item.carTypeInfo" v-for="(item,index) of formGoup.carTypeInfoList" :key="index"></el-option>
              </iSelect>
            </div>
            <el-popover trigger="hover" placement="top-start">
              <div class="tip-box">
                <div class="tip-title">{{language("GAICHEXINGPEIZHI",'该车型配置:')}}</div>
                <div v-for="(item,index) in scope.row.configurationList" :key="index" :class="item.isHighlight?'highlight':'black'">{{item.configuration}}</div>
              </div>
              <div slot="reference">{{scope.row.ebr}}</div>
            </el-popover>
          </div>
        </template>
      </el-table-column>
      <el-table-column show-overflow-tooltip width="250" :label="language('JIAGEXINGXI','价格信息')" prop="name">
        <template slot="header">
          <div>{{language('JIAGEXINGXI  ','价格信息')}}</div>
          <div class="flex-between-center-center margin-top10">
            <div>{{language('SOPXINGXI','SOP信息')}}</div>
            <icon name="iconMEK-xuxian" symbol />
            <div>{{language('DANGQIANJIAGE','当前价格')}}</div>
          </div>
        </template>
        <template slot-scope="scope">
          <div class="flex-between-center-center">
            <div class="car-type">
              <div>{{scope.row.sopDate}}</div>
              <div>{{scope.row.sopPrice}}</div>
            </div>
            <div class="car-type"></div>
            <div class="car-type3">
              <div>{{scope.row.date}}</div>
              <div>{{scope.row.price}}</div>
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column show-overflow-tooltip :label="language('GONGYINGSHANGXINGXI','供应商信息')" prop="name">
        <template slot-scope="scope">
          <div>{{scope.row.supplierCode}}</div>
          <div>{{scope.row.supplierName}}</div>
        </template>
      </el-table-column>
      <el-table-column show-overflow-tooltip :label="language('XIANSHIYINGCHANG','显示/隐藏')" prop="isHidden">
        <template slot-scope="scope">
          <div class="cursor" @click="handleIsHidden(scope.row)">
            <icon :name="scope.row.isHidden?'iconyincang':'iconxianshi'" symbol />
          </div>
        </template>
      </el-table-column>
    </el-table>
    <addPartDialog v-model="addPartDialog" />
    <iLog :show.sync="changeLogDialog" :bizId="bizId"  />
    <iPagination v-update @size-change="handleSizeChange($event, getTableList)" @current-change="handleCurrentChange($event, getTableList)" background :page-sizes="page.pageSizes" :page-size="page.pageSize" :layout="page.layout" :current-page='page.currPage' :total="page.totalCount" />
  </div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';
import { iButton, icon, iSelect, iPagination, iLog, iMessage, iInput } from "rise";
import addPartDialog from "./addPartDialog.vue";
import tableList from '@/components/ws3/commonTable';
import { pageMixins } from '@/utils/pageMixins';
import resultMessageMixin from '@/utils/resultMessageMixin.js';
import { tableTitle } from "./data.js";
import { getName, mekInfoList, infoUpdate, getCarTypeMessage, categoryList, carTypeList, infoDelete } from "@/api/partsrfq/mek/index.js";
import { excelExport } from "@/utils/filedowLoad";
export default {
  // import引入的组件需要注入到对象中才能使用
  mixins: [pageMixins, resultMessageMixin],
  components: { iButton, icon, iSelect, tableList, iPagination, addPartDialog, iLog, iInput },
  data() {
    // 这里存放数据
    return {
      bizId: 'MEK0000001',
      addPartDialog: false,
      changeLogDialog: false,
      form: {
        materialGroupCode: this.$route.query.categoryCode,
        motorId: "",
        partNumber: ''
      },
      formGoup: {
        materialGroupList: [],
        carTypeList: [],
        carTypeInfoList: []
      },
      selectTableData: [],
      tableListData: [],
      tableTitle: tableTitle,
      tableLoading: false,
      carTypeInfoLoading: false,
      isEdit: true
    }
  },
  // 监听属性 类似于data概念
  computed: {},
  // 监控data中的数据变化
  watch: {},
  // 方法集合
  methods: {
    // 添加
    handleAdd() {
      this.addPartDialog = true
    },
    handleLog() {
      this.changeLogDialog = true
    },
    // 获取材料组
    async categoryList() {
      try {
        const res = await categoryList({})
        this.formGoup.materialGroupList = res.data
      } catch (error) {
        this.formGoup.materialGroupList = []
      }
    },
    // 获取车型
    async handleCarType() {
      const res = await carTypeList({})
      this.formGoup.carTypeList = res.data
    },
    // 编辑
    edit() {
      this.isEdit = !this.isEdit
    },
    // 是否隐藏
    async handleIsHidden(item) {
      console.log(item);
      let pms = item
      pms.effectFlag = 1
      pms.isHidden = !pms.isHidden
      const res = await infoUpdate([pms])
      this.resultMessage(res, () => {
        this.getTableList()
      })
    },
    // 获取车型信息集合
    async getCarTypeMessage(val) {
      this.formGoup.carTypeInfoList = []
      this.carTypeInfoLoading = true
      const res = await getCarTypeMessage({ motorSvwCode: val })
      res.data.map(item => item.carTypeInfo = item.engine + '+' + item.transmission + '+' + item.configuration)
      this.formGoup.carTypeInfoList = res.data
      this.carTypeInfoLoading = false
    },
    handleAdded() {
      this.page.currPage = 1
      this.page.pageSize = 10
      this.getTableList()
    },
    // 获取列表集合
    async getTableList() {
      try {
        this.tableLoading = true
        const pms = {
          ...this.form,
          mekId: this.$route.query.chemeId,
          motorIds: this.$route.query.vwModelCodes && JSON.parse(this.$route.query.vwModelCodes) || [],
          pageNo: this.page.currPage,
          pageSize: this.page.pageSize,
        }
        const res = await mekInfoList(pms)
        res.data.map(item => item.carTypeInfo = item.engine + '+' + item.transmission + '+' + item.configuration)
        this.page.currPage = res.pageNum
        this.page.pageSize = res.pageSize
        this.page.totalCount = res.total
        this.tableListData = res.data
        this.tableLoading = false
      } catch {
        this.tableListData = []
        this.tableLoading = false
      }
    },
    // 导出
    async handleExport() {

      const res = await mekInfoList({
        pageNo: 1,
        pageSize: this.page.totalCount,
      })
      let excelList = res.data
      excelList.map((item) => {
        item.partNumber1 = item.partNumber + item.partName
        item.materialGroup1 = item.materialGroup + item.stuffGroup
        item.motorNameMotorProject = item.motorName + item.motorProject
        item.brandPlatform = item.brand + item.platform
        item.positionType = item.position + item.type
        item.carInfo = item.carTypeInfo + '      ' + item.ebr
        item.priceInfo = item.sopDate + item.sopPrice + '      ' + item.data + item.price
        item.supplierInfo = item.supplierCode + item.supplierName
        return item.isHidden1 = item.isHidden
      })
      excelList.unshift({
        carInfo: this.language('PEIZHIXINGXI', '配置信息') + '        ' + 'EBR',
        priceInfo: this.language('SOPXINGXI', 'SOP信息') + '         ' + this.language('DANGQIANJIAGE', '当前价格')
      })
      const fileName = await getName(this.$route.query.chemeId)
      await excelExport(excelList, this.tableTitle, fileName.data)
    },
    // 保存
    async handleSave() {
      let pms = this.tableListData
      pms.map(item => {
        let strs = item.carTypeInfo.split("+");
        item.engine = strs[0]
        item.transmission = strs[1]
        item.position = strs[2]
        return item.effectFlag = 1
      })
      const res = await infoUpdate(pms)
      this.resultMessage(res, () => {
        this.getTableList()
        this.isEdit = true
      })
    },
    handleSelectionChange(val) {
      this.selectTableData = val
    },
    // 删除
    async handleDelete() {
      if (!this.selectTableData.length) {
        iMessage.warm(this.language('QXZYTSJSC', '请选择一条数据删除'))
        return
      }
      let ids = []
      this.selectTableData.forEach(item => {
        ids.push(item.id)
      })
      const res = await infoDelete(ids)
      this.resultMessage(res, () => {
        this.getTableList()
      })
    },
  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.categoryList()
    this.handleCarType()
    this.getTableList()
  },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {

  },
}
</script>
<style lang='scss' scoped>
// @import url(); 引入公共css类
.icon {
  font-size: 1.5rem;
}
.tip-title {
  font-size: 14px;
  color: #000;
}
.highlight {
  font-size: 14px;
  color: #e83638;
}
::v-deep .elTable th > .cell {
  height: 4rem;
  text-align: center;
}
::v-deep .elTable td > .cell {
  text-align: center;
}
::v-deep .elTable th:nth-child(8) {
  .cell {
    text-align: left;
  }
}
::v-deep .elTable th:nth-child(9) {
  .cell {
    text-align: left;
  }
}
.car-type {
  width: 70px;
}
.car-type3 {
  width: 90px;
}
.car-info {
  width: 70px;
}
.el-form-item {
  display: flex;
}
::v-deep .el-col-10 .el-form-item {
  display: flex;
  justify-content: flex-end;
}
</style>