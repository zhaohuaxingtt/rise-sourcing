<!--
 * @Author: yuszhou
 * @Date: 2021-05-27 14:55:03
 * @LastEditTime: 2022-01-27 14:40:02
 * @LastEditors: Please set LastEditors
 * @Description: 采购员报价与基本分析模具界面
 * @FilePath: \front-sourcing-new\src\views\partsrfq\editordetail\components\rfqDetailTpzs\components\quotationScoringMj\index.vue
-->
<script>
import { getRfqSupplierList } from '@/api/designate/supplier'
import quotationMj from 'rise/web/mouldOffer/components/moduleCost'
import { hasShowDelegate } from '@/api/partsrfq/editordetail'
import { iMessageBox, iMessage } from 'rise'
import { icardData } from '../data'
import { downloadPdfMixins } from '@/utils/pdf'
export default {
  mixins: [downloadPdfMixins],
  extends: quotationMj,
  inject: ['getbaseInfoData', 'getDisabled'],
  props: {
    rfqInfoData: { type: Object },
  },
  provide() {
    return {
      supplierId: this.supplierId,
    }
  },
  data() {
    return {
      cardShow: JSON.parse(JSON.stringify(icardData)),
      useCardSlot: false,
      hasSupplierComponets: true,
      supplierId: '',
      supplierList: [],
      myDisabled: true,
      titleKey: 'BJZS.LK_BAOJIAZUSHOU_MJDANWEIYUAN',
      oldSupplierId: '',
      quotationSupplierState: true,
    }
  },
  computed: {
    disabled() {
      return this.getDisabled()
    },
    hastateSupplierBj() {
      return (
        this.getbaseInfoData().currentRoundsStatus !== '已关闭' &&
        this.quotationSupplierState
      )
    },
  },
  watch: {
    /**
     * @description: 记录上一次的供应商值
     * @param {*} old
     * @param {*} val
     * @return {*}
     */
    supplierId: function (old, val) {
      this.oldSupplierId = val
    },
  },
  created() {
    //          this.$nextTick(()=>{

    //    })
    this.partInfo.rfqId = parseInt(this.$route.query.id)
    this.partInfo.currentRounds = parseInt(this.getbaseInfoData().currentRounds)
    this.partInfo.carTypeNames = this.$route.query.carTypeNames
    this.getRfqSupplierList().then((r) => {
      this.getAllMouldFee()
      this.hasShowDelegate()
      this.getAllPartForMould()
    })
    console.log(this.rfqInfoData)
  },
  mounted() {
    let domElement = this.$el
    var box = domElement.getElementsByClassName('title_content')[0]
    var span = document.createElement('span')
    span.className = 'cursor '
    box.appendChild(span)
    
    window['addFileMj'] = (id) => {
      this.addFile(false,3,'报价分析汇总-模具',2)
    }
    span.innerHTML = `<i onclick="addFileMj()" style='color:#1660f1; font-weight: bold;font-size: 18px;' class='el-icon-shopping-cart-1''></i>`
  },
  methods: {
    hasShowDelegate() {
      hasShowDelegate({
        round: this.partInfo.currentRounds,
        rfqId: this.partInfo.rfqId,
        supplierId: this.supplierId,
      })
        .then((res) => {
          if (res.code == 200) {
            if (this.dgysBj) this.dgysBj = res.data
          }
        })
        .catch((err) => {
          iMessage.error(err.desZh)
        })
    },
    getFee(res) {
      if (this.dgysBj && this.tableListData.length > 0) {
        iMessageBox('编辑状态下，切换供应商不会保存！您确定要切换供应商吗？')
          .then((res) => {
            this.tableListData = []
            this.getAllMouldFee()
            this.getAllPartForMould()
            this.hasShowDelegate()
          })
          .catch(() => {
            this.supplierId = this.oldSupplierId
          })
      } else {
        this.tableListData = []
        this.getAllMouldFee()
        this.getAllPartForMould()
        this.hasShowDelegate()
      }
    },
    getRfqSupplierList() {
      return new Promise((r) => {
        getRfqSupplierList({ rfqId: this.partInfo.rfqId })
          .then((res) => {
            if (res && res.code == 200) {
              this.supplierId = Array.isArray(res.data) && res.data.length ? res.data[0].supplierId : ''
              this.supplierList = Array.isArray(res.data) ? res.data : []
              r(res)
            }
          })
          .catch((err) => {
            r()
          })
      })
    },
    // 零件号选择-重写父方法供应商Id
    handleChangeByAssembledPartCode(partNum, row) {
      this.$set(row, 'assembledPartPrjCode', '')
      const fsObj = this.partNumMap[partNum][0]
      if (fsObj) {
        this.$set(row, 'assembledPartName', fsObj.partName)
        this.handleInputByAssembledPartName(fsObj.partName, row)
      }

      this.$set(row, "mouldId", "")

      const mouldIdIndexes = this.tableListData.filter(item => item.priceType === row.priceType).map((item) => {
        const list = item.mouldId.split('_')
        return +list[list.length - 1].replace(/\D/g, '') || 0
      })

      mouldIdIndexes.sort((a, b) => b - a)
      const index = mouldIdIndexes[0]
        ? mouldIdIndexes[0] >= 10
          ? mouldIdIndexes[0] + 1 + ''
          : '0' + (mouldIdIndexes[0] + 1)
        : '01'

      if (row.assembledPartPrjCode && row.priceType) {
        this.$set(
          row,
          'mouldId',
          `${this.partInfo.rfqId}_${this.supplierId}_${row.assembledPartPrjCode}_${ row.priceType === "LC" ? "TL" : "TS" }${index}`
        )
      }
    },
    // fs号选择--重写父方法。供应商ID
    handleChangeByAssembledPartPrjCode(fsNum, row) {
      const fsObj = this.fsNums.filter((item) => item.fsnrGsnrNum === fsNum)[0]
      this.$set(row, 'quotationId', fsObj.quotationId)

      if (fsObj.priceType === "SKDLC") {
        this.$set(row, "priceType", "LC")
      } else {
        this.$set(row, "priceType", fsObj.priceType)
      }

      if (!row.assembledPartCode) {
        this.$set(row, 'assembledPartCode', fsObj.partNum)
        this.$set(row, 'assembledPartName', fsObj.partName)
        this.handleInputByAssembledPartName(fsObj.partName, row)

        this.$set(row, "mouldId", "")

        const mouldIdIndexes = this.tableListData.filter(item => item.priceType === row.priceType).map((item) => {
          const list = item.mouldId.split('_')
          return +list[list.length - 1].replace(/\D/g, '') || 0
        })

        mouldIdIndexes.sort((a, b) => b - a)
        const index = mouldIdIndexes[0]
          ? mouldIdIndexes[0] >= 10
            ? mouldIdIndexes[0] + 1 + ''
            : '0' + (mouldIdIndexes[0] + 1)
          : '01'

        if (fsNum && row.priceType) {
          this.$set(
            row,
            'mouldId',
            `${this.partInfo.rfqId}_${this.supplierId}_${fsNum}_${ row.priceType === "LC" ? "TL" : "TS" }${index}`
          )
        }
      }
    },
  },
}
</script>
