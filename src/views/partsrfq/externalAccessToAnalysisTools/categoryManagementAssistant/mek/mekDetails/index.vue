<!--
 * @Author: your name
 * @Date: 2021-08-05 06:53:42
 * @LastEditTime: 2021-08-08 15:20:20
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\views\partsrfq\externalAccessToAnalysisTools\categoryManagementAssistant\mek\mekDetails\index.vue
-->
<template>
  <iPage class="new-MEK">
    <div id="content">
      <div class="navBox flex-between-center">
        <div class="title font-weight flex">
          <label for=""
            >{{ language("切换材料组", "QIEHUANCAILIAOZU") }}:</label
          >
          <iSelect
            v-model="chartType"
            @change="changeBy"
            placeholder="材料组编号_名称"
          >
            <el-option value="supplier" :label="$t('按供应商比较')">
            </el-option>
            <el-option value="turn" :label="$t('按轮次比较')"></el-option>
            <el-option
              value="spareParts"
              :label="$t('按零件号比较')"
            ></el-option>
          </iSelect>
        </div>
        <div class="flex">
          <!--预览-->
          <iButton class="margin-left30">{{ $t("MEK分析库") }}</iButton>
          <!--保存-->
          <iButton class="margin-left30">{{ $t("MEK基础数据库") }}</iButton>
          <!--BoB分析库-->
          <iButton class="margin-left30">{{ $t("预览") }}</iButton>
          <!--查找零件-->
          <iButton class="margin-left30">{{ $t("保存") }}</iButton>
          <icon symbol name="iconrizhi" class="margin-left30 "></icon>
        </div>
      </div>
    </div>
    <div class=" bodyBox clearFloat">
      <div class="cardBox" style="width:15%;height:579px">
        <iCard>
          <el-form label-position="top" :model="form" style="height: 565px">
            <el-row class="margin-bottom20">
              <!--对标车型-->
              <el-form-item :label="$t('对标车型')">
                <iSelect v-model="carType" @change="changeBy" multiple>
                  <el-option value="1" :label="$t('车型1')"> </el-option>
                  <el-option value="2" :label="$t('车型2')"></el-option>
                  <el-option value="3" :label="$t('车型3')"></el-option>
                  <el-option value="4" :label="$t('车型4')"></el-option>
                  <el-option value="5" :label="$t('车型5')"></el-option>
                  <el-option value="6" :label="$t('车型6')"></el-option>
                  <el-option value="7" :label="$t('车型7')"></el-option>
                  <el-option value="8" :label="$t('车型8')"></el-option>
                </iSelect>
              </el-form-item>
              <!--类型选择-->
              <el-form-item :label="$t('类型选择')">
                <iSelect v-model="chartType" @change="changeBy">
                  <el-option value="1" :label="$t('按车型配置')"> </el-option>
                  <el-option value="2" :label="$t('按发动机')"></el-option>
                  <el-option value="3" :label="$t('按变速箱')"></el-option>
                  <el-option value="4" :label="$t('按电池容量')"></el-option>
                  <el-option value="5" :label="$t('按计算车型')"></el-option>
                </iSelect>
              </el-form-item>
              <!--零件六位号-->
              <el-form-item :label="$t('零件六位号')">
                <iSelect v-model="chartType" @change="changeBy" multiple>
                  <el-option value="1" :label="$t('857705')"> </el-option>
                  <el-option value="2" :label="$t('857706')"></el-option>
                  <el-option value="3" :label="$t('857707')"></el-option>
                  <el-option value="4" :label="$t('857708')"></el-option>
                  <el-option value="5" :label="$t('857709')"></el-option>
                  <el-option value="6" :label="$t('857710')"></el-option>
                  <el-option value="7" :label="$t('857711')"></el-option>
                  <el-option value="8" :label="$t('857712')"></el-option>
                  <el-option value="9" :label="$t('857713')"></el-option>
                  <el-option value="10" :label="$t('857714')"></el-option>
                  <el-option value="11" :label="$t('857715')"></el-option>
                  <el-option value="12" :label="$t('857715')"></el-option>
                  <el-option value="13" :label="$t('857715')"></el-option>
                  <el-option value="14" :label="$t('857715')"></el-option>
                  <el-option value="15" :label="$t('857715')"></el-option>
                  <el-option value="16" :label="$t('857715')"></el-option>
                </iSelect>
              </el-form-item>
            </el-row>
          </el-form>
          <div class="end">
            <iButton
              type="primary"
              style="width:100px;height:35px"
              @click="searchChartData"
              >{{ $t("LK_QUEDING") }}</iButton
            >
            <iButton
              type="primary"
              style="width:100px;height:35px"
              @click="handleSearchReset"
              >{{ $t("LK_ZHONGZHI") }}</iButton
            >
          </div>
        </iCard>
      </div>
      <div class="cardBox" style="width:85%">
        <iCard style="flex:1" class="margin-left20">
          <div class="chartBox1">
            <div class="chartBox">
              <div class="flex chartItem">
                <div class="operation">
                  <icon
                    symbol
                    name="iconbob-shanchu"
                    class="margin-bottom10 "
                    style="width:20px;height:20px "
                  ></icon>
                  <iSelect
                    v-model="carType"
                    @change="changeBy"
                    style="width:150px"
                    class="margin-bottom10"
                    multiple
                  >
                    <el-option value="1" :label="$t('车型1')"> </el-option>
                    <el-option value="2" :label="$t('车型2')"></el-option>
                    <el-option value="3" :label="$t('车型3')"></el-option>
                    <el-option value="4" :label="$t('车型4')"></el-option>
                  </iSelect>
                  <span class="margin-bottom10 ">Best Ball</span>
                  <span class="yield">22,000</span>
                </div>
                <datasetBar1 ref="datasetBar1"></datasetBar1>
              </div>
              <div class="flex chartItem">
                <div class="operation">
                  <icon
                    symbol
                    name="iconbob-shanchu"
                    class="margin-bottom10 "
                    style="width:20px;height:20px"
                  ></icon>
                  <iSelect
                    v-model="carType"
                    @change="changeBy"
                    style="width:150px"
                    class="margin-bottom10"
                    multiple
                  >
                    <el-option value="1" :label="$t('车型1')"> </el-option>
                    <el-option value="2" :label="$t('车型2')"></el-option>
                    <el-option value="3" :label="$t('车型3')"></el-option>
                    <el-option value="4" :label="$t('车型4')"></el-option>
                  </iSelect>
                  <span class="margin-bottom10 ">Best Ball</span>
                  <span class="yield">22,000</span>
                </div>
                <datasetBar ref="datasetBar" :notY="true"></datasetBar>
              </div>
              <div class="flex chartItem">
                <div class="operation">
                  <icon
                    symbol
                    name="iconbob-shanchu"
                    class="margin-bottom10 "
                    style="width:20px;height:20px"
                  ></icon>
                  <iSelect
                    v-model="carType"
                    @change="changeBy"
                    style="width:150px"
                    class="margin-bottom10"
                    multiple
                  >
                    <el-option value="1" :label="$t('车型1')"> </el-option>
                    <el-option value="2" :label="$t('车型2')"></el-option>
                    <el-option value="3" :label="$t('车型3')"></el-option>
                    <el-option value="4" :label="$t('车型4')"></el-option>
                  </iSelect>
                  <span class="margin-bottom10 ">Best Ball</span>
                  <span class="yield">22,000</span>
                </div>
                <datasetBar ref="datasetBar" :notY="true"></datasetBar>
              </div>
              <div class="flex chartItem">
                <div class="operation">
                  <icon
                    symbol
                    name="iconbob-shanchu"
                    class="margin-bottom10 "
                    style="width:20px;height:20px"
                  ></icon>
                  <iSelect
                    v-model="carType"
                    @change="changeBy"
                    style="width:150px"
                    class="margin-bottom10"
                    multiple
                  >
                    <el-option value="1" :label="$t('车型1')"> </el-option>
                    <el-option value="2" :label="$t('车型2')"></el-option>
                    <el-option value="3" :label="$t('车型3')"></el-option>
                    <el-option value="4" :label="$t('车型4')"></el-option>
                  </iSelect>
                  <span class="margin-bottom10 ">Best Ball</span>
                  <span class="yield">22,000</span>
                </div>
                <datasetBar ref="datasetBar" :notY="true"></datasetBar>
              </div>
              <div class="flex chartItem">
                <div class="operation">
                  <icon
                    symbol
                    name="iconbob-shanchu"
                    class="margin-bottom10 "
                    style="width:20px;height:20px"
                  ></icon>
                  <iSelect
                    v-model="carType"
                    @change="changeBy"
                    style="width:150px"
                    class="margin-bottom10"
                    multiple
                  >
                    <el-option value="1" :label="$t('车型1')"> </el-option>
                    <el-option value="2" :label="$t('车型2')"></el-option>
                    <el-option value="3" :label="$t('车型3')"></el-option>
                    <el-option value="4" :label="$t('车型4')"></el-option>
                  </iSelect>
                  <span class="margin-bottom10 ">Best Ball</span>
                  <span class="yield">22,000</span>
                </div>
                <datasetBar ref="datasetBar" :notY="true"></datasetBar>
              </div>
            </div>
          </div>
          <report :dialogVisible="true"></report>
        </iCard>
      </div>
    </div>
  </iPage>
</template>

<script>
import { iPage, iButton, iSelect, icon, iCard } from "rise";
import datasetBar from "../components/datasetBar";
import datasetBar1 from "../components/datasetBar1";
import report from "../components/report";
export default {
  name: "mekDetails",
  components: {
    iPage,
    iButton,
    iSelect,
    icon,
    iCard,
    datasetBar,
    datasetBar1,
    report
  },
  data() {
    return {
      chartType: "",
      carType: "",
      form: {},
    };
  },
  mounted() {},
  methods: {},
};
</script>

<style lang="scss" scoped>
.new-MEK {
  .bodyBox {
    margin-top: 25px;
  }
  .formBox {
    width: 100%;
    overflow: auto;
  }
  .end {
    display: flex;
    text-align: center;
    position: relative;
    bottom: 0;
    justify-content: space-between;
  }
}
.cardBox {
  float: left;
}
.chartItem {
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-right: 60px;
  &:last-child {
    margin-right: 0;
  }
}
.operation {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: -25px;
}
.title {
  font-family: Arial;
  font-size: $font-size20;
  color: black;
  align-items: center;
  label {
    width: 210px;
  }
}
.icon {
  width: 45px;
  height: 45px;
}
.yield {
  width: 100px;
  height: 35px;
  background: #eef2fb;
  opacity: 1;
  border-radius: 20px;
  padding: 9px 26px;
}
.chartBox {
  display: flex;
  overflow: auto;
}
.chartBox1 {
  width: 100%;
  overflow: hidden;
}
</style>
<style lang="scss">
.el-scrollbar__wrap {
  overflow-x: hidden;
}
</style>
