<!--
 * @Author: Luoshuang
 * @Date: 2021-05-24 11:27:22
 * @LastEditors: YoHo
 * @LastEditTime: 2022-03-23 16:30:27
 * @Description: 
 * @FilePath: \front-web\src\views\designate\designatedetail\addRfq\index.vue
-->

<template>
  <iPage>
    <!------------------------------------------------------------------------>
    <!--                  search 搜索模块                                   --->
    <!------------------------------------------------------------------------>
    <iSearch class="margin-bottom20" icon @reset="handleSearchReset" @sure="sure">
      <el-form>
        <!-- <el-form-item :label="language('LINGJIANHAO_FSNR_RFQBIANHAO_CAIGOUYUAN','零件号/FSNR/RFQ编号/采购员')" style="width: 340px">
          <iInput :placeholder="language('QINGXUANZE','请选择')" v-model="form.fsnrGsnrNum" ></iInput>
        </el-form-item> -->
         <el-form-item  :label="language('LK_LINGJIANHAO','零件号')">
            <iInput  :placeholder="language('partsprocure.PLEENTER','请输入')" v-model="form.partNum"></iInput>
          </el-form-item>
          <el-form-item  :label="language('LK_FSNR','零件采购项目号')">
            <iInput  :placeholder="language('partsprocure.PLEENTER','请输入')" v-model="form.fsnrGsnrNum"></iInput>
          </el-form-item>
          <el-form-item  :label="language('LK_RFQBIANHAO','RFQ编号')">
            <iInput  :placeholder="language('partsprocure.PLEENTER','请输入')" v-Int v-model="form.rfqId"></iInput>
          </el-form-item> 
          <el-form-item  :label="language('LK_XUNJIACAIGOUYUAN','询价采购员名称')">
            <iInput  :placeholder="language('partsprocure.PLEENTER','请输入')" v-model="form.buyerName"></iInput>
          </el-form-item> 
        <el-form-item :label="language('CHEXINGXIANGMU', '车型项目')">
          <iSelect :placeholder="language('QINGXUANZE','请选择')" v-model="form.cartypeProjectZh" filterable>
            <el-option value="" :label="language('ALL', '全部')"></el-option>
            <el-option v-for="items in carTypeOptions" :key='items.code' :value='items.code' :label="items.name"/>
          </iSelect>
        </el-form-item>
        <el-form-item :label="language('LINGJIANXIANGMULEIXING','零件项目类型')">
          <iSelect :placeholder="language('QINGXUANZE','请选择')" v-model="form.partProjectType">
            <el-option value="" :label="language('ALL','全部')"></el-option>
            <el-option v-for="items in partTypeOptions" :key='items.code' :value='items.code'
                        :label="items.name"/>
          </iSelect>
        </el-form-item>
        <el-form-item :label="language('RFQZHUANGTAI','RFQ状态')">
          <iSelect :placeholder="language('QINGXUANZE','请选择')" v-model="form.currentStatus">
            <el-option value="" :label="language('ALL','全部')"></el-option>
            <el-option v-for="items in rfqStatusOptions" :key='items.code' :value='items.code'
                        :label="items.name"/>
          </iSelect>
        </el-form-item>
      </el-form>
    </iSearch>
    <iCard>
      <div class="margin-bottom20 clearFloat">
          <div class="floatright">
            <!--------------------返回按钮----------------------------------->
            <iButton @click="goBack">{{language('FANHUI','返回')}}</iButton>
            <!--------------------选择按钮----------------------------------->
            <iButton @click="handleSelect">{{language('XUANZE','选择')}}</iButton>
            <buttonTableSetting @click="edittableHeader"></buttonTableSetting>
          </div>
      </div>
        <!------------------------------------------------------------------------>
        <!--                  表格模块                                          --->
        <!------------------------------------------------------------------------>
        <tableList
          permissionKey="DESIGNATE_DESIGNATEDETAIL_ADDRFQ"
          ref="tableList" 
          lang
          :activeItems='"id"' selection indexKey :tableData="tableListData" :tableTitle="tableTitle" :tableLoading="tableLoading" @handleSelectionChange="handleSelectionChange" @openPage="openPage" @updateSlot='toTop'>
          <template #kmAnalysis="scope">
            <el-popover
              v-if="scope.row.kmAnalysis"
              placement="left"
              width="300"
              trigger="click"
              @show="showAttachmentTable(scope.row)"
              @hide="attachmentTableListData = []">
              <tableList :tableTitle="attachmentTableTitle" :tableData="attachmentTableListData" :tableLoading="attachmentLoading" :selection="false">
                <template #fileName="attachmentScope">
                  <span class="link" @click="downLoad(attachmentScope.row)">{{ attachmentScope.row.fileName }}</span>
                </template>
              </tableList>
              <icon class="tick icon-style" symbol name="iconbaojiazhuangtailiebiao_yibaojia" slot="reference"/>
            </el-popover>
          </template>
        </tableList>
        <!------------------------------------------------------------------------>
        <!--                  表格分页                                          --->
        <!------------------------------------------------------------------------>
        <iPagination v-update @size-change="handleSizeChange($event, getTableList)" @current-change="handleCurrentChange($event, getTableList)" background :page-sizes="page.pageSizes"
          :page-size="page.pageSize"
          :layout="page.layout"
          :current-page="page.currPage"
          :total="page.totalCount"
        />
    </iCard>
  </iPage>
</template>

<script>
import { iPage, iCard, iPagination, iButton, iSearch, iSelect, iInput, iMessage, icon } from 'rise'
import { pageMixins } from "@/utils/pageMixins"
// import tableList from '../components/tableList'
import tableList from "@/components/iTableSort";
import { tableSortMixins } from "@/components/iTableSort/tableSortMixins";
import { rfqListTitle } from '../rfqdetail/data'
import { getRfqList, selectRfq } from '@/api/designate/designatedetail/addRfq/index'
import { getKmFileHistory } from "@/api/costanalysismanage/costanalysis"
import { attachmentTableTitle} from "@/views/partsrfq/home/components/data";
import { downloadFile, downloadUdFile } from "@/api/file"
import { getCarTypeSop } from "@/api/partsprocure/editordetail"
import { selectDictByRootKeys } from "@/api/dictionary"
import buttonTableSetting from '@/components/buttonTableSetting'
export default {
  mixins: [pageMixins,tableSortMixins],
  components: { iPage, iCard, 
  buttonTableSetting, iPagination, iButton, tableList, iSearch, iSelect, iInput, icon },
  data() {
    return {
      tableListData: [],
      tableTitle: rfqListTitle,
      tableLoading: false,
      carTypeOptions: [],
      rfqStatusOptions: [],
      partTypeOptions: [],
      form: {
        cartypeProjectZh: '',
        partProjectType: '',
        currentStatus: '',
        fsnrGsnrNum: ''
      },
      selectedRfqs: [],
      attachmentTableListData: [],
      attachmentTableTitle,
      attachmentLoading: false
    }
  },
  created() {
    this.selectDictByRootKeys()
    this.getCarTypeOptions()
    this.getTableList()
  },
  methods: {
    sure(){
      this.page.currPage = 1
      this.getTableList()
    },
    // 分析报告下载
    downLoad(row) {
      // downloadFile({
      //   applicationName: "rise",
      //   fileList: row.fileName
      // })
      downloadUdFile(row.uploadId)
    },
    showAttachmentTable(row) {
      this.getKmFileHistory(row.id)
    },
    // 获取分析报告
    getKmFileHistory(rfqId) {
      if (!rfqId) return

      this.attachmentLoading = true
      getKmFileHistory({
        hostId: rfqId,
        type: 1,
        currPage: 1,
        pageSize: 99999999
      })
      .then(res => {
        if (res.code == 200) {
          this.attachmentTableListData = Array.isArray(res.data) ? res.data : []
        } else {
          iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn)
        }

        this.attachmentLoading = false
      })
      .catch(() => this.attachmentLoading = false)
    },
    handleSearchReset() {
      this.form = {
        cartypeProjectZh: '',
        partProjectType: '',
        currentStatus: '',
        fsnrGsnrNum: ''
      }

      this.sure()
    },
    selectDictByRootKeys() {
      selectDictByRootKeys([
        { keys: "PPT" },
        { keys: "RFQ_STATE" },
      ])
      .then(res => {
        if (res.code == 200) {
          Object.keys(res.data).forEach(key => {
            switch(key) {
              case "PPT":
                this.partTypeOptions = Array.isArray(res.data["PPT"]) ? 
                  res.data["PPT"].map(item => ({
                    ...item,
                    key: item.code,
                    value: item.code,
                    zh: item.name,
                    en: item.nameEn,
                    de: item.nameDe
                  })) :
                  []
                break
              case "RFQ_STATE":
                this.rfqStatusOptions = Array.isArray(res.data["RFQ_STATE"]) ? 
                  res.data["RFQ_STATE"].map(item => ({
                    ...item,
                    key: item.code,
                    value: item.code,
                    zh: item.name,
                    en: item.nameEn,
                    de: item.nameDe
                  })) :
                  []
                break
              default:
            }
          })
        }
      })
    },
    getCarTypeOptions() {
      getCarTypeSop()
      .then(res => {
        if (res.code == 200) {
          this.carTypeOptions = 
            Array.isArray(res.data) ?
            res.data.map(item => ({
              code: item.cartypeProCode,
              name: item.cartypeProName
            })) :
            []
        }
      })
    },
    getTableList() {
      this.tableLoading = true
      const params = {
        ...this.form,
        current: this.page.currPage,
        size: this.page.pageSize,
        nominateId: this.$route.query.desinateId
      }
      getRfqList(params).then(res => {
        if(res?.result) {
          this.tableListData = res.data.records
          this.page.pageSize = res.data.size
          this.page.currPage = res.data.current
          this.page.totalCount = res.data.total
        } else {
          iMessage.error(this.$i18n.locale === 'zh' ? res.desZh : res.desEn)
        }
      }).finally(() => {
        this.tableLoading = false
      })
    },
    handleSelectionChange(val) {
      this.selectedRfqs = val
    },
    openPage(row) {
      const router =  this.$router.resolve({path: `/sourceinquirypoint/sourcing/partsrfq/editordetail?id=${row.id}`})
      window.open(router.href,'_blank')
    },
    toTop() {},
    handleSelect() {
      if (this.selectedRfqs.length < 1) {
        iMessage.warn(this.language('QINGXUANZERFQ','请选择RFQ'))
        return
      }
      this.tableLoading = true
      const params = {
        rfqIdArr: this.selectedRfqs.map(item => item.id),
        nominateProcessType: this.$route.query.designateType ? this.$route.query.designateType : this.$store.getters.nominationType,
        nominateId: this.$route.query.desinateId
      }
      selectRfq(params).then(res => {
        if (res?.result) {
          iMessage.success(this.$i18n.locale === 'zh' ? res.desZh : res.desEn)
          this.$router.push({path: '/designate/rfqdetail', query: {desinateId: res.data.nominateId, designateType: res.data.nominateProcessType}})
        } else {
          iMessage.error(this.$i18n.locale === 'zh' ? res.desZh : res.desEn)
        }
      }).finally(() => {
        this.tableLoading = false
      })
    },
    goBack() {
      // this.$router.push({path:'/designate/rfqdetail'})
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>