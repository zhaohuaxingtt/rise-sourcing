<!--
 * @Author: Luoshuang
 * @Date: 2021-05-26 14:48:50
 * @LastEditors: Luoshuang
 * @LastEditTime: 2021-07-17 01:56:42
 * @Description: 添加配件弹窗
 * @FilePath: \front-web\src\views\accessoryPart\createRfq\components\addAccessoryPart.vue
-->

<template>
  <iDialog 
    :title="language('TIANJIAPEIJIAN','添加配件')"
    :visible.sync="dialogVisible"
    @close="clearDialog"
    width="90%"
    class="addPartsDialog"
  >
    <iSearch @sure="getTableList" @reset="reset">
      <el-form>
        <el-form-item v-for="(item, index) in searchList" :key="index" :label="language(item.key,item.label)">
          <iSelect v-if="item.type === 'select'" v-model="searchParams[item.value]">
            <el-option value="" :label="language('ALL','全部')"></el-option>
            <el-option
              v-for="item in selectOptions[item.selectOption] || []"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </iSelect> 
          <iInput v-else v-model="searchParams[item.value]"></iInput> 
        </el-form-item>
      </el-form>
    </iSearch>
    <div class="margin-bottom20 clearFloat margin-top20">
      <div class="floatright">
        <!--------------------选择按钮----------------------------------->
        <iButton @click="handleSelectPart" >{{language('XUANZE','选择')}}</iButton>
      </div>
    </div>
    <tableList :activeItems='"a1"' selection indexKey :tableData="tableData" :tableTitle="tableTitle" :tableLoading="tableLoading" @handleSelectionChange="handleSelectionChange" @openPage="openPage"></tableList>
    <!------------------------------------------------------------------------>
    <!--                  表格分页                                          --->
    <!------------------------------------------------------------------------>
    <iPagination v-update @size-change="handleSizeChange($event, getTableList)" @current-change="handleCurrentChange($event, getTableList)" background :page-sizes="page.pageSizes"
      :page-size="page.pageSize"
      :layout="page.layout"
      :current-page="page.currPage"
      :total="page.totalCount"
      class="padding-bottom20"
    />
  </iDialog>
</template>

<script>
import { iDialog, iButton, iSelect, iInput, iSearch, iPagination, iMessage } from 'rise'
import tableList from '@/views/designate/designatedetail/components/tableList'
import { pageMixins } from "@/utils/pageMixins"
import { tableTitle, searchList } from '../../integratedManage/data'
import {findBySearches, getCartypeDict} from "@/api/partsrfq/home";
import { getDictByCode } from '@/api/dictionary'
import { getAccessoryManageList } from '@/api/accessoryPart/index'
import { uniq } from 'lodash'
import {
  dictkey,
} from "@/api/partsprocure/editordetail";
export default {
  mixins: [pageMixins],
  components: { iDialog, iButton, iSelect, iInput, tableList, iSearch, iPagination },
  props: {
    dialogVisible: { type: Boolean, default: false },
    stuffId: {type: String}
  },
  data() {
    return {
      backType: '',
      backReason: '',
      tableData: [],
      tableTitle: tableTitle,
      tableLoading: false,
      searchList,
      searchParams: {
        carType: '',
        carProject: '',
        state: '',
        partStatus: '',
        partState: '',
        cfTargetPrice: '',
        nomiType: '',
        idState: ''
      },
      selectOptions: {
        yesOrNoOption: [{value: '1', label: '是'},{value: '0', label: '否'}]
      },
      selectParts: []
    }
  },
  watch: {
    dialogVisible(val) {
      if(val) {
        
        this.getTableList()
        
      }
    }
  },
  created() {
    this.getSelectOptions()
    // this.getCarTypeOptions()
    this.getCartypeDict()
    this.getProcureGroup()
  },
  methods: {
    //获取上方group信息
    getProcureGroup() {
      dictkey().then((res) => {
        if (res.data) {
          this.fromGroup = res.data;
          this.selectOptions.cartypeProjectOptions = res.data.CAR_TYPE_PRO.map(item => {
            return {
              ...item,
              value: item.code,
              key: item.code,
              name: item.name
            }
          })
        }
      });
    },
    // 获取车型字典
    getCartypeDict() {
      getCartypeDict()
      .then(res => {
        if (res.code == 200) {
          this.selectOptions.carTypeOptions = 
            Array.isArray(res.data) ?
            res.data.map(item => ({
              ...item,
              key: item.code,
              label: item.name,
              value: item.value
            })) :
            []
        }
      })
    },
    /**
     * @Description: 点击选择按钮
     * @Author: Luoshuang
     * @param {*}
     * @return {*}
     */    
    handleSelectPart() {
      if (this.selectParts.length < 1) {
        iMessage.warn(this.language('QINGXUANZEPEIJIAN','请选择配件'))
        return
      }
      if (this.selectParts.some(item => item.rfqNum)) {
        iMessage.warn(this.language('LK_QINGXUANZEWEIFENPEIRFQDEPEIJIAN','请选择未分配RFQ的配件'))
        return
      }
      const selectStuffId = uniq(this.selectParts.map(item => item.stuffId))
      if (selectStuffId.length > 1 || (this.stuffId && selectStuffId[0] !== this.stuffId)) {
        iMessage.warn(this.language('QINGXUANZEXIANGTONGGONGYIZUDEPEIJIAN','请选择相同工艺组的配件'))
        return
      } if (!selectStuffId[0]) {
        iMessage.warn(this.language('GAIGONGYINGSHANGBUZAIGONGYIZUBDLNEI','该供应商不在工艺组BDL内，请与EPS确认'))
        return
      }
      this.$emit('selectPart', this.selectParts.map(item => item.spnrNum))
    },
    /**
     * @Description: 表格数据选中
     * @Author: Luoshuang
     * @param {*} val 选中的行
     * @return {*}
     */    
    handleSelectionChange(val) {
      this.selectParts = val
    },
    /**
     * @Description: 搜索条件重置
     * @Author: Luoshuang
     * @param {*}
     * @return {*}
     */    
    reset() {
      this.searchParams = {
        carType: '',
        carProject: '',
        state: '',
        partStatus: '',
        partState: '',
        cfTargetPrice: '',
        nomiType: '',
        idState: ''
      }
      this.sure()
    },
    /**
     * @Description: 车型项目下拉框
     * @Author: Luoshuang
     * @param {*}
     * @return {*}
     */    
    async getCarTypeOptions() {
      const res = await findBySearches('01')
      this.selectOptions.carTypeOptions = res.data
    },
    /**
     * @Description: 调取数据字典获取下拉
     * @Author: Luoshuang
     * @param {*} optionName 下拉选项名称
     * @param {*} optionType 下拉类型
     * @return {*}
     */    
    getDictionary(optionName, optionType) {
      getDictByCode(optionType).then(res => {
        if(res?.result) {
          this.selectOptions[optionName] = res.data[0]?.subDictResultVo.map(item => {
            return { value: item.code, label: item.name }
          })
        }
      })
    },
    /**
     * @Description: 获取下拉数据
     * @Author: Luoshuang
     * @param {*}
     * @return {*}
     */    
    getSelectOptions() {
      // 配件状态
      this.getDictionary('accessoryTypeOption', 'ACCESSORY_STATE')
      // ID状态
      this.getDictionary('accessoryIdStateOption', 'ACCESSORY_ID_STATE')
      // 定点状态
      this.getDictionary('nominateStateOption', 'NOMINATE_STATE')
      // 合同状态
      this.getDictionary('contactStateOption', 'CONTRACT_STATE')
      // 零件状态
      this.getDictionary('partStateOption', 'RFQ_PART_STATUS_CODE_TYPE')
    },
    /**
     * @Description: 获取列表数据
     * @Author: Luoshuang
     * @param {*}
     * @return {*}
     */    
    getTableList() {
      this.tableLoading = true
      const params = {
        ...this.searchParams,
        current: this.page.currPage,
        size: this.page.pageSize
      }
      getAccessoryManageList(params).then(res => {
        if(res.result) {
          this.tableData = res.data.records
          this.page.pageSize = res.data.size
          this.page.currPage = res.data.current
          this.page.totalCount = res.data.total
        } else {
          this.tableData = []
          iMessage.error(this.$i18n.locale === 'zh' ? res.desZh : res.desEn)
        }
      }).finally(() => {
        this.tableLoading = false
      })
    },
    clearDialog() {
      this.$emit('changeVisible', false)
    },
    /**
     * @Description: 点击SP号跳转事件
     * @Author: Luoshuang
     * @param {*}
     * @return {*}
     */    
    openPage() {
      const router =  this.$router.resolve({path: '/sourceinquirypoint/sourcing/accessorypartdetail', query: {  }})
      window.open(router.href,'_blank')
    },
  }
}
</script>

<style lang="scss" scoped>
.addPartsDialog {
  .card {
    box-shadow: none;
    border-radius: 0;
    border-bottom: 1px solid rgba(112, 112, 112, .1);
    ::v-deep .cardBody {
      padding-top: 0;
      padding-left: 0;
      padding-right: 0;
    }
  }
  ::v-deep .el-dialog {
    margin-top: 30px !important;
    // height: 90%;
    // .el-dialog__body {
    //   height: calc(100% - 70px);
    //   overflow: auto;
    // }
  }
}
</style>