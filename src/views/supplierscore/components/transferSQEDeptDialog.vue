<template>
  <iDialog
      class="transferDialog"
      v-bind="$props"
      v-on="$listeners"
      :visible.sync="visible"
      width="400px"
      :title="language('选择SQE评分股')"
      :close-on-click-modal="false">
    <div class="body">
      <iFormGroup class="total margin-left20" :row="1" inline>
        <iFormItem class="item">
          <iSelect v-model="rateDeptNum" filterable :loading="loading" :loading-text="language('JIAZAIZHONG', '加载中')"
                   @change="handleChange">
            <el-option v-for="item in options" :key="item.key" :value="item.deptNum" :label="item.deptNum"/>
          </iSelect>
        </iFormItem>
      </iFormGroup>
    </div>
    <div slot="footer" class="footer">
      <iButton :loading="confirmLoading" @click="handleConfirm">{{ language("QUEREN", "确认") }}</iButton>
      <iButton @click="cancel">{{ language("QUXIAO", "取消") }}</iButton>
    </div>
  </iDialog>
</template>

<script>
import {iDialog, iSelect, iFormGroup, iFormItem, iButton, iMessage} from 'rise'
import {listDepartByTag} from "@/api/scoreConfig/configscoredept"
import {setSqeRateDeptNum} from "@/api/supplierscore";

export default {
  components: {iDialog, iSelect, iFormGroup, iFormItem, iButton},
  props: {
    ...iDialog.props,
    visible: {
      type: Boolean,
      default: false
    },
    rows: {
      type: Array,
      default: ()=>[]
    }
  },
  watch: {
    visible(nv) {
      if (nv) {
        this.listDepartByTag()
      } else {
        this.rateDeptNum = ""
        this.options = []
      }
    },
  },
  data() {
    return {
      loading: false,
      options: [],
      rateDeptNum: "",
      confirmLoading: false,
    }
  },
  methods: {
    listDepartByTag() {
      this.loading = true
      listDepartByTag({tagId: '40'}).then((res) => {
        if (res?.code == '200') {
          this.options = Array.isArray(res.data) ? res.data : [];
        }
      }).finally(() => {
        this.loading = false
      })
    },
    // 确认
    handleConfirm() {
      if (!this.rateDeptNum) return iMessage.warn(this.language("请选择评分股"))
      let params = {
        rateDeptNum:this.rateDeptNum,
        rfqIds:this.rows.map(item=>item.rfqId)
      }
      this.confirmLoading = true
      setSqeRateDeptNum(params).then(res=>{
        if(res?.code==200){
          this.$emit('getData')
          this.$emit('update:visible', false)
        }else{
          iMessage.error(res?.desZh)
        }
      }).finally(()=>{
        this.confirmLoading = false
      })
    },
    // 取消
    cancel(){
      this.$emit('update:visible', false)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>