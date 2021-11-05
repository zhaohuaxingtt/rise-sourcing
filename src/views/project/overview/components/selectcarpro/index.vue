<!--
 * @Author: Luoshuang
 * @Date: 2021-07-29 23:35:25
 * @LastEditors: Luoshuang
 * @LastEditTime: 2021-08-13 14:05:20
 * @Description: 选择车型项目弹窗
 * @FilePath: \front-web\src\views\project\overview\components\selectcarpro\index.vue
-->

<template>
  <iDialog 
    :title="language('XUANZEXIANSHICHEXINGXIANGMU','选择显示车型项目')"
    :visible.sync="dialogVisible"
    @close="clearDialog"
    width="90%"
  >
    <iSearch :icon="true" class="selectcarSearch">
      <template slot="button">
        <iButton @click="handleSure">{{language('QUEREN', '确认')}}</iButton>
        <iButton @click="handleReset">{{language('LK_CHONGZHI', '重置')}}</iButton>
      </template>
      <el-form>
        <el-form-item :label="language('CHEXINGXIANGMU','车型项目')">
          <iSelect filterable v-model="carProject">
            <el-option
              v-for="item in carProjectOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </iSelect>
        </el-form-item>
      </el-form>
    </iSearch>
    <div class="tableBox padding-bottom40">
      <div class="tableBox-btn">
        <iButton @click="handleSave">{{language('BAOCUN', '保存')}}</iButton>
      </div>
      <tableList ref="table" :tableTitle="tableTitle" :tableData="tableData" :tableLoading="tableLoading" @handleSelectionChange="handleSelectionChange"></tableList>
    </div>
  </iDialog>
</template>

<script>
import { iDialog, iButton, iSearch, iSelect, iMessage } from 'rise'
import { tableTitle } from './data'
import tableList from '@/views/project/schedulingassistant/progroup/components/tableList'
import { getSelectCarType, updateSelectCarType, getCarTypePro } from '@/api/project'
export default {
  components: { iDialog, iButton, tableList, iSearch, iSelect },
  props: {
    dialogVisible: { type: Boolean, default: false },
    allData: {type:Array, default: () => []},
    selectValue: {type:Array, default: () => [{}]}
  },
  watch:{
    dialogVisible(val) {
      if(val) {
        this.getSelectCarPro()
      }
    }
  },
  data() {
    return {
      carProject: '',
      saveLoading: false,
      tableTitle: tableTitle,
      tableLoading: false,
      tableData: [{}],
      carProjectOptions: [],
      selectTableList: []
    }
  },
  created() {
    this.getCarProjectOptions()
  },
  methods: {
    /**
     * @Description: 列表选中项改变
     * @Author: Luoshuang
     * @param {*} val
     * @return {*}
     */    
    handleSelectionChange(val) {
      this.selectTableList = val
    },
    /**
     * @Description: 重置操作-重置筛选条件和列表
     * @Author: Luoshuang
     * @param {*}
     * @return {*}
     */    
    handleReset() {
      this.carProject = ''
      this.getSelectCarPro()
    },
    /**
     * @Description: 确定操作-根据筛选条件筛选列表
     * @Author: Luoshuang
     * @param {*}
     * @return {*}
     */    
    handleSure() {
      this.getSelectCarPro(this.carProject)
    },
    /**
     * @Description: 保存操作
     * @Author: Luoshuang
     * @param {*}
     * @return {*}
     */    
    handleSave() {
      this.tableLoading = true
      const tableList = this.tableData.map(item => {
        return {
          ...item,
          isSelect: this.selectTableList.some(selectItem => selectItem.id === item.id)
        }
      })
      updateSelectCarType(tableList).then(res => {
        if (res?.result) {
          iMessage.success(this.$i18n.locale === 'zh' ? res?.desZh : res?.desEn)
          this.getSelectCarPro()
        } else {
          iMessage.error(this.$i18n.locale === 'zh' ? res?.desZh : res?.desEn)
        }
      }).finally(() => {
        this.tableLoading = false
      })
    },
    /**
     * @Description: 获取车型项目列表
     * @Author: Luoshuang
     * @param {*} carTypeProId
     * @return {*}
     */    
    async getSelectCarPro(carTypeProId = this.carProject) {
      this.tableLoading = true
      try {
        const res = await getSelectCarType(carTypeProId)
        if (res?.result) {
          this.tableData = res.data || []
          this.$nextTick(() => {
            this.$refs.table.toggleSelection(res.data.filter(item => item.isSelect))
          })
        } else {
          this.tableData = []
          iMessage.error(this.$i18n.locale === 'zh' ? res?.desZh : res?.desEn)
        }
        this.tableLoading = false
      } catch(error) {
        this.tableLoading = false
      }
    },
    /**
     * @Description: 获取车型项目下拉框数据
     * @Author: Luoshuang
     * @param {*}
     * @return {*}
     */    
    getCarProjectOptions() {
      getCarTypePro().then(res => {
        if (res?.result) {
          this.carProjectOptions = res.data.map(item => {
            return {
              ...item,
              value: item.id,
              label: item.cartypeProName
            }
          })
        } else {
          iMessage.error(this.$i18n.locale === 'zh' ? res?.desZh : res?.desEn)
        }
      })
    },
    clearDialog() {
      this.reasonDescription = ''
      this.$emit('changeVisible', false)
    },
    changeSaveLoading(loading) {
      this.saveLoading = loading
    }
  }
}
</script>

<style lang="scss" scoped>
.selectcarSearch {
  box-shadow: unset;
  ::v-deep .cardBody {
    padding: unset;
    padding-bottom: 20px;
  }
}
.tableBox {
  border-top: 1px solid rgba(112, 112, 112, 0.1);
  &-btn {
    margin: 20px 0;
    text-align: right;
  }
}
</style>