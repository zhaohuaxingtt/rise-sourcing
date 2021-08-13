<template>
  <iPage v-loading="pageLoading">
    <headerNav>
      <template #extralButton>
        <template v-if="!editStatus">
          <iButton @click="handleEdit">{{ language('PLGLZS.BIANJI', '编辑') }}</iButton>
        </template>
        <template v-else>
          <iButton @click="handleCancel">{{ language('PLGLZS.QUXIAO', '取消') }}</iButton>
          <iButton @click="handleSave">{{ language('PLGLZS.BAOCUN', '保存') }}</iButton>
        </template>
        <iButton @click="handleExport" :loading="exportButtonLoading">{{ language('PLGLZS.DAOCHU', '导出') }}</iButton>
      </template>
    </headerNav>
    <div id="container">
      <el-row :gutter="20">
        <el-col :span="8" v-for="item of treeData" :key="item.id">
          <div class="header-title"> {{ setName(item) }}</div>
          <theCard
              v-for="level1Children of item.children"
              :key="level1Children.id"
              :title="setName(level1Children)"
              :star="level1Children.star"
              :iconName="level1Children.iconUrl"
              class="theCard"
              :ref="'theCard'+level1Children.id"
          >
            <!--第二级-->
            <div>
              <div
                  v-for="level2Children of level1Children.children"
                  :key="level2Children.id"
                  class="level2BoxStyle"
              >
                <div class="flex">
                  <div class="blueDot" v-if="!notHaveChildren(level2Children) || !editStatus"/>
                  <theCheckBox
                      :treeDataSelect="treeDataSelect"
                      :currentChildren="level2Children"
                      :categoryChildren="level1Children"
                      :editStatus="editStatus"
                      @handleSelect="handleSelect"
                  />
                  <span class="level2Text">{{ setName(level2Children) }}</span>
                </div>
                <theRemark :children="level2Children" :editStatus="editStatus" :exportStatus="exportStatus"/>
                <iInput
                    v-if="editStatus && (level2Children.name === treeDataSelect[level1Children.name])"
                    v-model="form[level2Children.id]"
                    type="textarea"
                    :rows="2"
                    resize="none"
                    :placeholder="language('PLGLZS.QINGSHURU','请输入')"
                    class="margin-top10"
                    :maxlength="maxlength"
                />
                <!--第三级-->
                <div v-if="level2Children.children">
                  <div
                      v-for="level3Children of level2Children.children"
                      :key="level3Children.id"
                      class="level3BoxStyle"
                  >
                    <div class="flex">
                      <theCheckBox
                          :treeDataSelect="treeDataSelect"
                          :currentChildren="level3Children"
                          :categoryChildren="level1Children"
                          :editStatus="editStatus"
                          @handleSelect="handleSelect"
                      />
                      <span>{{ setName(level3Children) }}</span>
                    </div>
                    <theRemark :children="level3Children" :editStatus="editStatus" :exportStatus="exportStatus"/>
                    <iInput
                        v-if="editStatus && (level3Children.name === treeDataSelect[level1Children.name])"
                        v-model="form[level3Children.id]"
                        type="textarea"
                        :rows="2"
                        resize="none"
                        :placeholder="language('PLGLZS.QINGSHURU','请输入')"
                        class="margin-top10"
                        :maxlength="maxlength"
                    />
                  </div>
                </div>
              </div>
            </div>
          </theCard>
        </el-col>
      </el-row>
    </div>
  </iPage>
</template>

<script>
import {iPage, iButton, iInput} from 'rise';
import headerNav from '../components/headerNav';
import theCard from './compoents/theCard';
import {getList, saveInfos} from '../../../../../api/categoryManagementAssistant/listOfInitiatives';
import theCheckBox from './compoents/theCheckBox';
import theRemark from './compoents/theRemark';
import resultMessageMixin from '@/utils/resultMessageMixin';
import {downloadPDF} from '@/utils/pdf';

export default {
  mixins: [resultMessageMixin],
  components: {
    iPage,
    iButton,
    iInput,
    headerNav,
    theCard,
    theCheckBox,
    theRemark,
  },
  data() {
    return {
      pageLoading: false,
      treeData: {},
      treeDataSelect: {},
      editStatus: true,
      form: {},
      maxlength: 500,
      categoryCode: this.$store.state.rfq.categoryCode,
      exportStatus: false,
      exportButtonLoading: false,
    };
  },
  created() {
    this.getList();
  },
  methods: {
    handleEdit() {
      this.editStatus = true;
    },
    handleCancel() {
      this.editStatus = false;
    },
    async handleSave() {
      try {
        this.pageLoading = true;
        const req = {
          categoryCode: this.categoryCode,
          selectList: [],
        };
        const selectList = [];
        for (const [key, value] of Object.entries(this.form)) {
          const item = {
            actionInfoId: key,
            context: value,
          };
          selectList.push(item);
        }
        req.selectList = selectList;
        const res = await saveInfos(req);
        this.resultMessage(res, () => {
          this.editStatus = false;
          this.getList();
        });
        this.pageLoading = false;
      } catch {
        this.pageLoading = false;
      }
    },
    async getList() {
      try {
        this.pageLoading = true;
        this.treeData = {};
        this.treeDataSelect = {};
        const req = {
          categoryCode: this.categoryCode,
        };
        const res = await getList(req);
        this.treeData = res.data;
        const obj = {};
        this.treeDataSelect = res.data.map(item => {
          item.children.map(itemChildren => {
            obj[itemChildren.name] = '';
          });
        });
        const formData = {};
        this.getFormData({treeData: res.data, formData});
        this.form = formData;
        this.treeDataSelect = obj;
        this.pageLoading = false;
      } catch {
        this.treeData = {};
        this.treeDataSelect = {};
        this.pageLoading = false;
      }
    },
    // 递归数据回显
    getFormData({treeData, formData}) {
      treeData.map(item => {
        if (!item.children) {
          formData[item.id] = item.context;
        } else {
          this.getFormData({treeData: item.children, formData});
        }
      });
    },
    setName(item) {
      return this.$i18n.locale === 'zh' ? item.name : item.nameEn;
    },
    handleSelect({props, value}) {
      this.treeDataSelect[props.name] = value.name;
    },
    notHaveChildren(item) {
      return item.children === null;
    },
    handleExport() {
      this.exportButtonLoading = true;
      this.exportStatus = true;
      Object.keys(this.$refs).map(item => {
        this.$refs[item][0].handleShowHide(true);
      });
      setTimeout(() => {
        this.downloadFile();
        this.exportButtonLoading = false;
        this.exportStatus = false;
      }, 1000);
    },
    downloadFile() {
      downloadPDF({
        idEle: 'container',
        pdfName: 'overview',
      });
    },
  },
  watch: {
    '$store.state.rfq.categoryCode'() {
      this.categoryCode = this.$store.state.rfq.categoryCode;
      this.getList();
    },
  },
};
</script>

<style scoped lang="scss">
.header-title {
  margin-top: 20px;
  margin-bottom: 20px;
  font-size: 22px;
  font-weight: bold;
  line-height: 26px;
  color: #000000;
}

.flex {
  display: flex;
}

.level2BoxStyle + .level2BoxStyle {
  margin-top: 15px;
}

.level2BoxStyle {
  color: #4F4F4F;
}

.level3BoxStyle {
  margin-top: 10px;
  margin-left: 35px;
  font-size: 14px;
  color: #838383;
}

.blueDot {
  width: 10px;
  height: 10px;
  background: #1763F7;
  border-radius: 50%;
  margin-left: 5px;
  margin-right: 20px;
  margin-top: 7px;
}

.theCard + .theCard {
  margin-top: 20px;
}


</style>
