<template>
  <div class="content" ref="reTitle">
    <iCard class="rsTitle pageCard rsPdfCard" title="Title">
      <iFormGroup row="1">
        <div class="col">
          <template v-for="(item, index) in items">
            <iFormItem v-if="!item.hidden" :key="index" :label="`${ item.label }:`">
              <iText>{{ data[item.key] }}</iText>
            </iFormItem>
          </template>
        </div>
      </iFormGroup>
    </iCard>
    <div class="pdf-item">
      <div class="pageCard-main rsPdfCard">
        <slot name="tabTitle"></slot>
        <iCard class="rsTitle pageCard rsPdfCard" title="Title">
          <iFormGroup row="1" :style="{'height': cntentHeight + 'px'}">
            <div class="col">
              <template v-for="(item, index) in items">
                <iFormItem v-if="!item.hidden" :key="index" :label="`${ item.label }:`">
                  <iText>{{ data[item.key] }}</iText>
                </iFormItem>
              </template>
            </div>
          </iFormGroup>
          <div class="page-logo">
            <img src="../../../../../../../assets/images/logo.png" alt="" :height="46*0.6+'px'" :width="126*0.6+'px'">
            <div>
              <p class="pageNum"></p>
            </div>
            <div>
              <p>{{ userName }}</p>
              <p>{{ new Date().getTime() | dateFilter('YYYY-MM-DD')}}</p>
            </div>
          </div>
        </iCard>
      </div>
    </div>
  </div>
</template>

<script>
import {iCard, iFormGroup, iFormItem, iText} from "rise"
import {titleData} from "@/views/designate/designatedetail/decisionData/title/data"
import {findLayoutTitleInfo} from "@/api/designate/decisiondata/title"
import filters from "@/utils/filters"

export default {
  mixins:[filters],
  props:{
    tableList: { type: Array, default: () => [] },
    prototypeTableList: { type: Array, default: () => [] },
  },
  computed:{
    userName(){
      return this.$i18n.locale === 'zh' ? this.$store.state.permission.userInfo.nameZh : this.$store.state.permission.userInfo.nameEn
    },
    hasTitle(){
      return this.$slots.tabTitle && 116 || 0
    }
  },
  components: {
    iCard,
    iFormGroup,
    iFormItem,
    iText
  },
  data() {
    return {
      items: _.cloneDeep(titleData),
      data: {}
    }
  },
  created() {
    this.findLayoutTitleInfo()
  },
  methods: {
    findLayoutTitleInfo: function () {
      findLayoutTitleInfo({
        nominateId: this.$route.query.desinateId
      })
          .then(res => {
            if (res.code == 200) {
              this.items.forEach(item => {
                switch (item.key) {
                  case "PCA/TIA":
                    if (!res.data.isShow) this.$set(item, "hidden", true)
                    else {
                      this.$set(item, "hidden", false)
                      this.$set(this.data, item.key, `${res.data.pacStatus}/${res.data.tiaStatus}`)
                    }

                    break
                  case "projects":
                    this.$set(this.data, item.key, Array.isArray(res.data[item.key]) ? res.data[item.key].join() : "-")

                    break
                  case "singleSourcing":
                    if (res.data.singleSourcing) {
                      this.$set(item, "hidden", false)
                      this.$set(this.data, item.key, "Y")
                    } else this.$set(item, "hidden", true)

                    break
                  default:
                    this.$set(this.data, item.key, res.data[item.key])
                }
              })
            }
          })
    }
  }
}
</script>

<style lang="scss" scoped>

.rsPdfCard{
  box-shadow: none;
  & + .rsCard {
    margin-top: 20px; /*no*/
  }
  ::v-deep .cardHeader{
    padding: 30px 0px;
  }
  ::v-deep .cardBody{
    padding: 0px;
  }
}
.rsTitle {
  ::v-deep .cardBody {
    padding-bottom: 0;
  }

  ::v-deep .el-form-item__label {
    width: 200px; /*no*/
  }

  .page-logo{
    display: flex;
    justify-content: space-between;
    padding: 10px;
    align-items: center;
    border-top: 1px solid #666;
  }
}
</style>
