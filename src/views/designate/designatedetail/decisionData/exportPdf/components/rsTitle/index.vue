<template>
  <iCard class="rsTitle" title="Title">
    <div class="content">
      <iFormGroup row="1">
        <div class="col">
          <template v-for="(item, index) in items">
            <iFormItem v-if="!item.hidden" :key="index" :label="`${ item.label }:`">
              <iText>{{ data[item.key] }}</iText>
            </iFormItem>
          </template>
        </div>
      </iFormGroup>
    </div>
  </iCard>
</template>

<script>
import {iCard, iFormGroup, iFormItem, iText} from "rise"
import {titleData} from "@/views/designate/designatedetail/decisionData/title/data"
import {findLayoutTitleInfo} from "@/api/designate/decisiondata/title"

export default {
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
.rsTitle {
  ::v-deep .cardBody {
    padding-bottom: 0;
  }

  ::v-deep .el-form-item__label {
    width: 200px; /*no*/
  }
}
</style>
