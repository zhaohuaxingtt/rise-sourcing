<!--
 * @Author: your name
 * @Date: 2021-08-10 18:10:36
 * @LastEditTime: 2021-08-17 18:14:02
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\components\partsprocure\startProject\index.vue
-->
<template>
  <iButton @click="start" :loading="startLoding">{{ language("partsprocure.PARTSPROCURESTARTINQUIRY",'启动询价') }}</iButton>
</template>
<script>
import {iMessage,iButton} from 'rise';
import { insertRfq } from "@/api/partsrfq/home";
export default{
  components:{iButton},
  props:{
    startItems:{
      type:Array,
      default:()=>[]
    },
    keys:{
      type:String,
      default:'id'
    }
  },
  data(){
    return {
      startLoding:false
    }
  },
  methods:{
    /*********************************************************************
    *                          启动询价模块
    *********************************************************************/
    validateStart() {
      return new Promise((r) => {
        if (this.startItems.length == 0) {
          r(false);
          iMessage.warn(
            this.language(
              "LK_NINDANGQIANHAIWEIXUANZEXUYAOQIDONGXUNJIADECAIGOUXIANGMU",
              '抱歉，您当前还未选择需要启动询价的采购项目！'
            )
          );
          return;
        }
        if (this.startItems.find((items) => items.fsnrGsnrNum == "")) {
          r(false);
          iMessage.warn(
            this.language(
              "LK_DANGQIANCAIGOUXIANGMUZHONGCUNZAIHAIWEISHENGCHENGFSNRDESHUJUWUFAWEININQIDONGXUNJIA",
              '抱歉，当前采购项目中存在还未生成FSNR的数据，无法为您启动询价！'
            )
          );
          return;
        }
        r(true);
      });
    },
    async start() {
      if (!(await this.validateStart())) return;
      this.startLoding = true;
      insertRfq({
        rfqPartDTOList: this.startItems.map(item => ({
          ...item,
          purchaseProjectId: item.id,
          // id: undefined
        })),
      })
        .then((res) => {
          this.startLoding = false;
          if (res.data && res.data.rfqId) {
            this.$router.push({
              path: "/sourcing/partsrfq/editordetail",
              query: {
                id: res.data.rfqId,
              },
            });
          } else {
            iMessage.warn(res.desZh);
          }
        })
        .catch((err) => {
          this.startLoding = false;
        });
    },
  }
}
</script>
<style lang='scss' scoped>
</style>