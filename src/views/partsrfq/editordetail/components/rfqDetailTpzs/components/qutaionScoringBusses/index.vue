<!--
 * @Author: 业务分配模拟
 * @Date: 2021-06-09 22:25:34
 * @LastEditTime: 2022-01-17 11:34:08
 * @LastEditors: caopeng
 * @Description: In User Settings Edit
 * @FilePath: \front-sourcing-new\src\views\partsrfq\editordetail\components\rfqDetailTpzs\components\qutaionScoringBusses\index.vue
-->
<script>
import buMonitor from "@/views/designate/suggestion/components/buMonitor";
import { icardData } from "../data";
import { downloadPdfMixins } from "@/utils/pdf";
export default {
  extends: buMonitor,
  mixins: [downloadPdfMixins],
  props: {
    rfqInfoData: { type: Object },
    collapse: {
      type: Boolean,
      default: true,
    },
    cardTitle: {
      type: String,
      default: "业务分配模拟",
    },
    title: {
      type: String,
      default: "",
    },
  },
  inject: ["getDisabled"],
  computed: {
    disabled() {
      return this.getDisabled();
    },
  },
  data() {
    return {
      cardShow: JSON.parse(JSON.stringify(icardData)),
      rfqId: this.$route.query.id,
    };
  },
  mounted() {
    // let domElement = this.$el
    // var box = domElement.getElementsByClassName('title_content')[0]
    // var span = document.createElement('span')
    // span.className = 'cursor '
    // box.appendChild(span)
    window["addFileMn"] = (id) => {
      this.addFile(false, 5, "业务分配模拟");
    };
    // span.innerHTML = `<i onclick="addFileMn()" style='color:#67C23A; font-weight: bold;font-size: 18px;' class='el-icon-shopping-cart-1''></i>`
  },
};
</script>