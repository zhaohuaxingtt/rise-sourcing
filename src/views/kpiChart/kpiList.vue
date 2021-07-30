<template>
  <div>
    <iPage class="template">
      <div class="Main">
        <!-- 搜索条件 -->
        <div class="SearchMenu">
          <div class="SearchOptions">
            <i-search @sure="sure" @reset="reset">
              <el-form>
                <el-form-item
                  :label="$t('supplierkpi.bumen')"
                  class="SearchOption"
                >
                  <i-select
                    :placeholder="$t('staffManagement.SELECT_PLACEHOLDER')"
                    v-model="formData.deptId"
                  >
                    <el-option
                      v-for="item in organizationMenu"
                      :key="item.value"
                      :label="item.nameZh"
                      :value="item.id"
                    >
                    </el-option>
                  </i-select>
                </el-form-item>
                <el-form-item
                  :label="$t('supplierkpi.cailiao')"
                  class="LastSearchOption"
                >
                  <i-select
                    :placeholder="$t('staffManagement.SELECT_PLACEHOLDER')"
                    v-model="formData.status"
                  >
                    <el-option
                      v-for="item in status"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    >
                    </el-option>
                  </i-select>
                </el-form-item>
                <el-form-item
                  :label="$t('supplierkpi.ENGLISHNAME')"
                  class="SearchOption"
                >
                  <i-input
                    :placeholder="$t('staffManagement.gongyingshangmincheng')"
                    class=""
                    v-model="formData.nameEn"
                  ></i-input>
                </el-form-item>
              </el-form>
            </i-search>
          </div>
          <!-- 列表 -->
          <div class="OrganizationListContainer">
            <iCard>
                <tableFold
                :tabelTittle="tabSetting"
                :tableDataBefore="tableDataBefore"
                ></tableFold>
                <!-- 分页标签 -->
                <iPagination
                  v-update
                  @size-change="handleSizeChange($event)"
                  @current-change="handleCurrentChange($event)"
                  background
                  :current-page="page.currPage"
                  :page-sizes="page.pageSizes"
                  :page-size="page.pageSize"
                  :layout="page.layout"
                  :total="page.totalCount"
                  style="margin:20px 0"
                >
                </iPagination>
            </iCard>
          </div>
        </div>
      </div>
    </iPage>
  </div>
</template>

<script>
import {
  iSearch,
  iInput,
  iSelect,
  iPage,
  iCard,
  iButton,
  iPagination
} from 'rise'
import tableFold from './components/tableFold'
import { pageMixins } from '@/utils/pageMixins'
import { tabSetting } from './components/data'
// import {
//   deleteUsers,
//   getPageListByParams,
//   getDeptDropDownList
// } from '@/api/authorityMgmt'
export default {
  components: {
    iSearch,
    iInput,
    iSelect,
    iPage,
    iCard,
    iButton,
    iPagination,
    tableFold
  },
  mixins: [pageMixins],
  data() {
    return {
      tableListData: [],
      tabSetting:tabSetting,
      formData: {},
      organizationMenu: [],
      selectData: [],
      delDisabled: true,
      editDisabled: true,
      status: [
        {
          value: true,
          label: '有效'
        },
        {
          value: false,
          label: '无效'
        }
      ],
      tableHeight: '',
      tableLoading:false,
      tableDataBefore:[{
                roleName:'1232132',
                id:"123",
                code:"dwqdwsd",
                fullNameZh:"dsfdsfsdf",
                code:"dwqdwsd",
                aa:"dsfdsfsdf",
            },
            {
                roleName:'1232132',
                id:"123",
                code:"dwqdwsd",
                fullNameZh:"dsfdsfsdf",
                code:"dwqdwsd",
                aa:"aaa"
            },{
                roleName:'1232132',
                id:"123",
                code:"dwqdwsd",
                fullNameZh:"dsfdsfsdf",
                code:"dwqdwsd",
                fullNameZh:"dsfdsfsdf"
            },{
                roleName:'1232132',
                id:"123",
                code:"dwqdwsd",
                fullNameZh:"dsfdsfsdf",
                code:"dwqdwsd",
                aa:"test data"
            }],
    }
  },
  created() {
    //this.getList()
    // 查询部门列表
    // getDeptDropDownList({}).then(res => {
    //   this.organizationMenu = res.data
    // })
  },
  mounted() {
    
  },
  methods: {
    sure() {
      this.page.currPage = 1
      this.getList()
    },
    getList() {
      this.formData.current = this.page.currPage
      this.formData.size = this.page.pageSize
      this.tableLoading=true
      getPageListByParams(this.formData).then(res => {
        this.tableLoading=false
        this.tableListData = res.data
        this.page.totalCount = res.total
        this.tableListData.forEach(x => {
          x.status !== null && x.status ? (x.status = '有效') : '无效'
          x.updateDate=x.updateDate?x.updateDate.substring(0,10):''
        })
      })
    },
    // 重置数据
    reset() {
      for (const key in this.formData) {
        this.formData[key] = ''
      }
      this.page.currPage = 1
      this.getList()
    },
    // //改变page操作
    handleSizeChange(event) {
      this.page.pageSize = event
      this.getList()
    }, // //改变页码操作
    handleCurrentChange(event) {
      this.page.currPage = event
      this.getList()
    }
  }
}
</script>

<style lang="scss" scoped>
.Main {
  width: 100%;
  height: calc(100vh - 100px);
  overflow-y: auto;
}
.LastSearchOption {
  margin-top: 20px;
}

.OrganizationListContainer {
  margin-top: 20px;
}

.OrganizationTable {
  margin-top: 20px;
}

.OperationButtonContainer {
  display: flex;
  justify-content: flex-end;
}
</style>
