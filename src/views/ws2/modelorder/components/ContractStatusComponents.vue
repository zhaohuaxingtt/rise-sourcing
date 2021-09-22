<template>
  <div>
    <el-tooltip class='item' effect='light' placement='bottom' >
      <div slot="content" style="width: 200px">{{ row['contractRemark'] != null ? row['contractRemark'] : '原因不详' }}
      </div>
      <span>
              <icon class='el-icon-warning-outline icon_color'/>
              {{ myContractStatus }}
      </span>
    </el-tooltip>

  </div>
</template>

<script>
export default {
  name: 'ContractStatusComponents',
  props: {
    contractStatus: {type: Array, require: true, default: () => []},
    row: {type: Object, require: true}
  },
  computed: {
    myContractStatus: function () {
      let myContractStatus = this.row['contractStatus']
      if (myContractStatus != null || myContractStatus != '') {
        if (null != this.contractStatus && this.contractStatus.length > 0 && this.contractStatus != undefined) {
          let res = this.contractStatus.find((item) => item.code == this.row['contractStatus'])
          if (res != null && res != '' && res != undefined) {
            return res.name
          }
        }
      }
      return '未创建'
    }
  }
}
</script>

<style scoped>
.icon_color {
  color: skyblue;
}
</style>