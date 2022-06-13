<!--
 * @Author: YoHo
 * @Date: 2022-04-01 16:54:39
 * @LastEditTime: 2022-04-01 18:30:53
 * @LastEditors: YoHo
 * @Description: 等待接口完善
-->
<template>
  <iDialog :visible.sync="dialogVisible" @close="clearDialog">
    <template #title>
      <p class="title">{{ isAeA ? '车型变更' : '车型项目变更' }}</p>
      <div class="control">
        <iButton @click="save">{{ language("QUEREN", "确认") }}</iButton>
        <!-- <iButton @click="reset">{{ language("CHONGZHI", "重置") }}</iButton> -->
      </div>
    </template>
    <div>
      <el-table ref="table" :data="tableList" class="padding-bottom20">
        <el-table-column label="PID" prop="pid" align="center" width="100"></el-table-column>
        <el-table-column :label="isAeA ? '现有车型' : '现有车型项目'" prop="projOldName" align="center"></el-table-column>
        <el-table-column prop="projName" align="center">
          <template slot="header">
            {{ isAeA ? '变更车型' : '变更车型项目' }} <span class="required">*</span>
          </template>
          <template slot-scope="scope">
            <iSelect v-model="scope.row.projName" clearable :loading="loading" @visible-change="getOptions($event, scope.$index, scope.row)" :placeholder="language('QINGXUANZE', '请选择')">
              <template v-for="item in scope.row.options || []">
                <el-option :key="item.value" :value="item.value">
                </el-option>
              </template>
            </iSelect>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </iDialog>
</template>

<script>
import { iDialog, iSelect, iButton, iMessage } from "rise";
import tableList from "@/components/iTableSort";
import { changePartProject, productFamilyCartTypeAndCarTypePro } from "@/api/aeko/detail/partsList.js"
export default {
  props: {
    dialogVisible: { type: Boolean, default: false },
    isAeA: { type: Boolean, default: false },
    tableData: { type: Array, default: () => [] }
  },
  components: {
    iDialog,
    iButton,
    iSelect,
    tableList,
  },
  data() {
    return {
      tableList: [],
      loading:false
    }
  },
  created() {
    this.tableList = JSON.parse(JSON.stringify(this.tableData)).map(item => {
      return {
        pid: item.id,
        projOldName: item.name,
        projName: item.name,
        options:[]
      }
    })
  },
  methods: {
    clearDialog() {
      this.$emit("changeVisible", "changeModelProjectVisible", false);
    },
    save() {
      const { requirementAekoId = '', } = this.$route.query;
      let arr = this.tableList.filter((item) => !item.projName.trim());
      if (arr.length) return iMessage.error("请维护必填项");
      let params = {
        requirementAekoId,
        carModelDTOS: this.tableList.map(item=>{
          return {
            pid:item.pid,
            projId:'',
            projName:item.projName
          }
        })
      }
      changePartProject(params).then(res => {
        this.$emit('updateList')
        this.clearDialog()
      })
    },
    async getOptions(ev, index, row) {
      if (ev&&!row.options.length) {
        this.loading = true
        const res = await productFamilyCartTypeAndCarTypePro({ productCode: [row.pid] })
        if (res?.code == 200) {
          let option = this.isAeA ? { value: (this.$i18n.locale === "zh" ? res.data[0].cartypeVo.productNameZh:res.data[0].cartypeVo.productNameEn)||res.data[0].cartypeVo.modelNameZh } : { value: this.$i18n.locale === "zh" ? res.data[0].cartypeProVo.cartypeProjectZh : res.data[0].cartypeProVo.cartypeProjectEn  }
          row.options = [option]
        }
        this.tableList.splice(index, 1, row)
        this.$nextTick(()=>{
          this.loading = false
        })
      }
    },
  },
};
</script>

<style lang="scss" scoped>
::v-deep .el-dialog__header {
  position: relative;

  .title {
    font-size: 18px;
    font-weight: bold;
    line-height: 25px;
  }
}

.control {
  position: absolute;
  top: 50%;
  right: 94px;
  transform: translate(0, -50%);
}

.required {
  font-size: 14px;
  color: red;
}
</style>