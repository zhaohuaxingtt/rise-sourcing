<!--
 * @Author: your name
 * @Date: 2021-08-10 17:39:20
 * @LastEditTime: 2021-08-17 18:11:03
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\components\partsprocure\cancelProject\index.vue
-->
<template>
  <div class="inline" v-permission="PARTSPROCURE_EDITORDETAIL_CANCELITEMS">
    <iButton :loading='cancelLoading' @click="openDiologBack">{{ language("partsprocure.PARTSPROCURECANCELPARTSPURCHASE",'取消零件采购项目') }}</iButton>
    <backItems v-model="diologBack" @sure="cancel" :title="language('LK_QUXIAOLINGJIANCAIGOUXIANGMU','取消零件采购项目')"></backItems>
  </div>
</template>
<script>
import {iButton,iMessage} from 'rise'
import backItems from "@/views/partsign/home/components/backItems";
import {cancelApi} from "@/api/partsprocure/home";
export default{
  components:{iButton,backItems},
  props:{
    backItems:{
    type:Array,
    default:()=>[]
  }},
  data(){
    return {
      cancelLoading:false,
      diologBack:false
    }
  },
  methods:{
    //退回
    openDiologBack() {
      if (this.backItems.length == 0)
        return iMessage.warn(
          this.language(
            "LK_NINDANGQIANHAIWEIXUANZENINXUYAOQUXIAODELINGJIANCAIGOUXIANGMU",
            '抱歉，您当前还未选择您需要取消的零件采购项目！'
          )
        );
      this.diologBack = true;
    },
       // 取消零件采购
    cancel(backmark) {
      this.cancelLoading = true
      this.diologBack = false;
      let cancel = {
        remark: backmark,
        ids: this.backItems.map(r=>r.id),
      };
      cancelApi(cancel).then((res) => {
          if (res.data) {
            iMessage.success(this.language("LK_CAOZUOCHENGGONG",'操作成功'));
            this.$emit('refresh')
            this.cancelLoading = false
          } else {
            iMessage.error(res.desZh);
            this.cancelLoading = false
          }
        })
        .catch(() => {
          this.cancelLoading = false
        });
    },
  }
}
</script>
<style lang='scss' scoped>
  .inline{
    display: inline-block;
    padding-right: 10px;
  }
</style>