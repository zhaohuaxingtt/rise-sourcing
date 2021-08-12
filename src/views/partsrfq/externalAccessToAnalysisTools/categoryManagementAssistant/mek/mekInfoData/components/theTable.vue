<!--
 * @version: 1.0
 * @Author: zbin
 * @Date: 2021-08-05 15:47:10
 * @LastEditors: zbin
 * @Descripttion: your project
-->
<template>
  <div>
    <el-table :data="tableListData" style="width: 100%">
      <el-table-column type="selection" width="55">
      </el-table-column>
      <el-table-column type="index" :index="indexMethod" label="#" width="55"> </el-table-column>
      <el-table-column :label="language('LINGJIAN','零件')" prop="date">
        <template slot-scope="scope">
          <div>{{scope.row.partNumber}}</div>
          <div>{{scope.row.partName}}</div>
        </template>
      </el-table-column>
      <el-table-column :label="language('CAILIAOZU','材料组')" prop="materialGroup">
        <template slot-scope="scope">
          <div>{{scope.row.materialGroup}}</div>
          <div>{{scope.row.stuffGroup}}</div>
        </template>
      </el-table-column>
      <el-table-column :label="language('CHEXINGXINGXI','车型信息')" prop="name">
        <template slot-scope="scope">
          <div>{{scope.row.motorName}}</div>
          <div>{{scope.row.motorProject}}</div>
        </template>
      </el-table-column>
      <el-table-column :label="language('PINGPAIPINGTAI','品牌/平台')" prop="name">
        <template slot-scope="scope">
          <div>{{scope.row.brand}}</div>
          <div>{{scope.row.platform}}</div>
        </template>
      </el-table-column>
      <el-table-column :label="language('JIEBIELEIXING','级别/类型')" prop="name">
        <template slot-scope="scope">
          <div>{{scope.row.position}}</div>
          <div>{{scope.row.type}}</div>
        </template>
      </el-table-column>
      <el-table-column width="350" :label="language('CHEXINGXINGXI','车型信息')">
        <template slot="header">
          <div>{{language('CHEXINGXINGXI','车型信息')}}</div>
          <div class="flex-between-center-center margin-top10">
            <div>{{language('DONGLI','动力')}}</div>
            <icon name="iconMEK-xuxian" symbol />
            <div>{{language('CHUANDONG','传动')}}</div>
            <icon name="iconMEK-xuxian" symbol />
            <div>{{language('PEIZHI','配置')}}</div>
          </div>
        </template>
        <template slot-scope="scope">
          <div v-if="isEdit" class="flex-between-center-center">
            <div class="car-info">{{scope.row.engine}}</div>
            <div class="car-info"></div>
            <div class="car-info">{{scope.row.transmission}}</div>
            <div class="car-info"></div>
            <div class="car-info">
              <span>{{scope.row.configuration}}</span>
              <el-popover trigger="hover" placement="top-start">
                <div class="tip-box">
                  <div class="tip-title">{{language("GAICHEXINGPEIZHI",'该车型配置:')}}</div>
                  <div class="tip-content">Trendline</div>
                  <div class="tip-content">Comfortline</div>
                  <div class="tip-title">Highline </div>
                </div>
                <icon slot="reference" symbol name="iconxinxitishi" class="font-size16 marin-left5" />
              </el-popover>
            </div>
          </div>
          <div v-else class="flex-between-center-center">
            <div class="car-info">
              <iSelect @change="$emit('getTableList',form)" :placeholder="language('QINGXUANZHE','请选择')" v-model="scope.row.engine">
                <el-option :value="item.code" :label="item.name" v-for="item of formGoup.materialGroupList" :key="item.code"></el-option>
              </iSelect>
            </div>
            <div class="car-info"></div>
            <div class="car-info">
              <iSelect @change="$emit('getTableList',form)" :placeholder="language('QINGXUANZHE','请选择')" v-model="scope.row.transmission">
                <el-option :value="item.code" :label="item.name" v-for="item of formGoup.materialGroupList" :key="item.code"></el-option>
              </iSelect>
            </div>
            <div class="car-info"></div>
            <div class="car-info">
              <iSelect @change="$emit('getTableList',form)" :placeholder="language('QINGXUANZHE','请选择')" v-model="scope.row.configuration">
                <el-option :value="item.code" :label="item.name" v-for="item of formGoup.materialGroupList" :key="item.code"></el-option>
              </iSelect>
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column width="250" :label="language('JIAGEXINGXI','价格信息')" prop="name">
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
      <el-table-column :label="language('GONGYINGSHANGXINGXI','供应商信息')" prop="name">
        <template slot-scope="scope">
          <div>{{scope.row.supplierCode}}</div>
          <div>{{scope.row.supplierName}}</div>
        </template>
      </el-table-column>
      <el-table-column :label="language('XIANSHIYINGCHANG','显示/隐藏')" prop="isHidden">
        <template slot-scope="scope">
          <div v-if="scope.row.isHidden" @click="handle(scope.row)">
            <icon name="iconxianshi" symbol />
          </div>
          <div v-else>
            <icon name="iconyincang" symbol />
          </div>
        </template>
      </el-table-column>
    </el-table>
    <iPagination v-update @size-change="handleSizeChange($event, getTableList)" @current-change="handleCurrentChange($event, getTableList)" background :page-sizes="page.pageSizes" :page-size="page.pageSize" :layout="page.layout" :current-page='page.currPage' :total="page.totalCount" />
  </div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';
import { iButton, icon, iSelect, iPagination } from "rise";
import addPartDialog from "./addPartDialog.vue";
import tableList from '@/components/ws3/commonTable';
import { pageMixins } from '@/utils/pageMixins';
import resultMessageMixin from '@/utils/resultMessageMixin.js';
import { tableTitle } from "./data.js";
import { mekInfoList } from "@/api/partsrfq/mek/index.js";
import theRemarkVue from '../../../listOfInitiatives/compoents/theRemark.vue';
export default {
  // import引入的组件需要注入到对象中才能使用
  mixins: [pageMixins, resultMessageMixin],
  components: { iButton, icon, iSelect, tableList, iPagination, addPartDialog },
  data() {
    // 这里存放数据
    return {
      tableListData: [
        {
          rfq: '256',
          isShow: true,
          carInfo: '9999',
          wire: true,
        },
        {
          rfq: '256',
          isShow: true,
          carInfo: '9999',
          tip: true,
          wire: false
        },
      ],
      tableTitle: tableTitle,
      tableLoading: false,
      isEdit: true
    }
  },
  // 监听属性 类似于data概念
  computed: {},
  // 监控data中的数据变化
  watch: {},
  // 方法集合
  methods: {
    edit(par) {
      console.log(par);
      this.isEdit = par
    },
    handle(item) {
      console.log(item);
    },
    async getTableList(par) {
      try {
        this.tableLoading = true
        const pms = {
          ...par,
          pageNo: this.page.currPage,
          pageSize: this.page.pageSize,
        }
        const res = await mekInfoList(pms)
        this.tableListData = res.data
        this.tableLoading = false
      } catch (error) {
        this.tableListData = []
        this.tableLoading = false
      }
    }
  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created() {
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
.tip-content {
  font-size: 14px;
  color: #e83638;
}
::v-deep th > .cell {
  height: 4rem;
  text-align: center;
}
::v-deep td > .cell {
  text-align: center;
}
::v-deep th:nth-child(8) {
  .cell {
    text-align: left;
  }
}
::v-deep th:nth-child(9) {
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
</style>
