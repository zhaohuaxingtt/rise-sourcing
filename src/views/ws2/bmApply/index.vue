<template>
  <div>
    <div class="page-head">
      <div class="page-head-flex" :class="tableIndex === 0 ? 'head-on' : ''" @click="selectHeadTable(0)">
        <div class="line-divL line-div">
          <div class="title">All</div>
          <div class="describe">{{$t('LK_ALLBMAPPLY')}}</div>
        </div>
        <div class="line-divR line-div">
          <icon v-if="tableIndex === 0" symbol name="iconsuoyouBAshenqingxuanzhong" class="openIcon"></icon>
          <icon v-else symbol name="iconsuoyouBAshenqingweixuanzhong" class="openIcon"></icon>
        </div>
      </div>
      <div class="page-head-flex" :class="tableIndex === 1 ? 'head-on' : ''" @click="selectHeadTable(1)">
        <div class="line-divL line-div">
          <div class="title">1</div>
          <div class="describe">{{$t('LK_DAIQUERENBMDAN')}}</div>
        </div>
        <div class="line-divR line-div">
          <icon v-if="tableIndex === 1" symbol name="icondaiquerenBAshenqingzhuijiajinexuanzhong" class="openIcon"></icon>
          <icon v-else symbol name="icondaiquerenBAshenqingzhuijiajineweixuanzhong" class="openIcon"></icon>
        </div>
      </div>
      <div class="page-head-flex" :class="tableIndex === 2 ? 'head-on' : ''" @click="selectHeadTable(2)">
        <div class="line-divL line-div">
          <div class="title">2</div>
          <div class="describe">{{$t('LK_AEKOZENGZHIBMDAN')}}</div>
        </div>
        <div class="line-divR line-div">
          <icon v-if="tableIndex === 2" symbol name="iconAekozengzhiBMdanxuanzhong" class="openIcon"></icon>
          <icon v-else symbol name="iconAekozengzhiBMdanweixuanzhong" class="openIcon"></icon>
        </div>
      </div>
      <div class="page-head-flex" :class="tableIndex === 3 ? 'head-on' : ''" @click="selectHeadTable(3)">
        <div class="line-divL line-div">
          <div class="title">44</div>
          <div class="describe">{{$t('LK_AEKOJIANZHIBMDAN')}}</div>
        </div>
        <div class="line-divR line-div">
          <icon v-if="tableIndex === 3" symbol name="iconAekojianzhiBMdanxuanzhong" class="openIcon"></icon>
          <icon v-else symbol name="iconAekojianzhiBMdanweixuanzhong" class="openIcon"></icon>
        </div>
      </div>
    </div>

    <!-- 所有BM申请单 -->
    <template v-if="tableIndex === 0">
      <SearchBlock />
      <iCard>
        <div class="table-head">
          <iButton @click="modifyA">{{ $t('LK_XIAZAIQINGDAN') }}</iButton><!-- 下载清单 -->
        </div>
        <iTableList
          :tableData="allTableList"
          :tableTitle="allTableHead"
          :tableLoading="allTableLoading"
          @handleSelectionChange="handleSelectionChange"
        >
          
        </iTableList>
      </iCard>
      
    </template>

    <!-- 待确认BM单 -->
    <template v-if="tableIndex === 1">
      <iCard>
        <div class="table-head">
          <iButton @click="modifyA">{{ $t('LK_QUERENSHENQING') }}</iButton><!-- 确认申请 -->
          <iButton @click="modifyA">{{ $t('LK_ZUOFEI') }}</iButton><!-- 作废 -->
          <iButton @click="modifyA">{{ $t('LK_XIAZAIQINGDAN') }}</iButton><!-- 下载清单 -->
        </div>
        <iTableList
          :tableData="bmTableList"
          :tableTitle="bmTableHead"
          :tableLoading="allTableLoading"
          @handleSelectionChange="handleSelectionChange"
        >
          <template #data1="scope">
            <div class="table-txtStyle" @click="openBMDetail(scope.row)">{{scope.row.data1}}</div>
          </template>
        </iTableList>
      </iCard>
    </template>

    <!-- Aeko增值金额 -->
    <template v-if="tableIndex === 2">
      <iCard>
        <div class="table-head">
          <iButton @click="modifyA">{{ $t('LK_QUERENSHENQING') }}</iButton><!-- 确认申请 -->
          <iButton @click="modifyA">{{ $t('LK_ZUOFEI') }}</iButton><!-- 作废 -->
          <iButton @click="modifyA">{{ $t('LK_XIAZAIQINGDAN') }}</iButton><!-- 下载清单 -->
        </div>
        <iTableList
          :tableData="aekoTableList"
          :tableTitle="aekoTableHead"
          :tableLoading="allTableLoading"
          @handleSelectionChange="handleSelectionChange"
        >
          
        </iTableList>
      </iCard>
    </template>

    <!-- Aeko减值BM单 -->
    <template v-if="tableIndex === 3">
      <iCard>
        <div class="table-head">
          <iButton @click="modifyA">{{ $t('LK_QUERENSHENQING') }}</iButton><!-- 确认申请 -->
          <iButton @click="modifyA">{{ $t('LK_ZUOFEI') }}</iButton><!-- 作废 -->
          <iButton @click="modifyA">{{ $t('LK_XIAZAIQINGDAN') }}</iButton><!-- 下载清单 -->
        </div>
        <iTableList
          :tableData="aekoBmTableList"
          :tableTitle="aekoBmTableHead"
          :tableLoading="allTableLoading"
          @handleSelectionChange="handleSelectionChange"
        >
          
        </iTableList>
      </iCard>
    </template>

    <!-- BM单流水号弹窗 -->
    <BmPopup :visible="bmVisible" @changeLayer="() => this.bmVisible = false" title="BM单流⽔号：CSA-0098100177">
      <template slot="btns">
        <iButton @click="save">{{ $t('LK_BAOCUN') }}</iButton><!-- 保存 -->
      </template>

      <template slot="content">
        <div class="popup-form">
          <div class="popup-formItem">
            <div class="item">
              <div class="txt">
                <span>{{ $t('LK_BMDANLIUSHUIHAO') }}</span><!-- BM单流水号 -->
              </div>
              <div class="disabled">CSA-0098100177</div>
            </div>
            <div class="item">
              <div class="txt">
                <span>{{ $t('LK_CHEXINGXIANGMU') }}</span><!-- 车型项目 -->
              </div>
              <div class="disabled">CSA-0098100177</div>
            </div>
            <div class="item">
              <div class="txt">
                <span>{{ $t('LK_CAIGOUSHENQINGHAO') }}</span><!-- 采购申请号 -->
              </div>
              <div class="disabled">CSA-0098100177</div>
            </div>
            <div class="item">
              <div class="txt required">
                <span>{{ $t('LK_WBSBIANHAO') }}</span><!-- WBS编号 -->
              </div>
              <iInput class="input" :placeholder="$t('LK_QINGSHURU')"></iInput>
            </div>
          </div>

          <div class="popup-formItem">
            <div class="item">
              <div class="txt">
                <span>{{ $t('LK_KEMU') }}</span><!-- 科目 -->
              </div>
              <div class="disabled">CSA-0098100177</div>
            </div>
            <div class="item">
              <div class="txt">
                <span>{{ $t('LK_CHENGBENZHONGXIN') }}</span><!-- 成本中心 -->
              </div>
              <div class="disabled">CSA-0098100177</div>
            </div>
            <div class="item">
              <div class="txt">
                <span>{{ $t('LK_CHENGBENKONGZHIYU') }}</span><!-- 成本控制域 -->
              </div>
              <div class="disabled">CSA-0098100177</div>
            </div>
            <div class="item">
              <div class="txt required">
                <span>{{ $t('LK_ZONGZHANGKEMU') }}</span><!-- 总账科目 -->
              </div>
              <iInput class="input" :placeholder="$t('LK_QINGSHURU')"></iInput>
            </div>
          </div>

          <div class="popup-formItem">
            <div class="item">
              <div class="txt">
                <span>{{ $t('LK_TONGJIDINGDAN') }}</span><!-- 统计订单 -->
              </div>
              <iInput class="input" :placeholder="$t('LK_QINGSHURU')"></iInput>
            </div>
            <div class="item">
              <div class="txt">
                <span>{{ $t('LK_CAIGOUGONGCHANG') }}</span><!-- 采购工厂 -->
              </div>
              <iSelect class="input" :placeholder="$t('LK_QINGXUANZE')">
                <el-option
                    :value="item.id"
                    :label="item.cartypeNname"
                    v-for="(item, index) in factoryList"
                    :key="index"
                ></el-option>
              </iSelect>
            </div>
            <div class="item">
              <div class="txt">
                <span>{{ $t('LK_WULIAOZHU') }}</span><!-- 物料组 -->
              </div>
              <div class="disabled">CSA-0098100177</div>
            </div>
            <div class="item">
              <div class="txt">
                <span>{{ $t('LK_JIAOHUORIQI') }}</span><!-- 交货日期 -->
              </div>
              <div class="disabled">CSA-0098100177</div>
            </div>
          </div>

          <div class="popup-formItem">
            <div class="item">
              <div class="txt">
                <span>{{ $t('LK_KESHI') }}</span><!-- 科室 -->
              </div>
              <iSelect class="input" :placeholder="$t('LK_QINGXUANZE')">
                <el-option
                    :value="item.id"
                    :label="item.cartypeNname"
                    v-for="(item, index) in departmentList"
                    :key="index"
                ></el-option>
              </iSelect>
            </div>
            <div class="item">
              <div class="txt">
                <span>{{ $t('LK_REGINOCONTROLLER') }}</span><!-- 区域控制员 -->
              </div>
              <iInput class="input" :placeholder="$t('LK_QINGSHURU')"></iInput>
            </div>
            <div class="item">
              <div class="txt required">
                <span>{{ $t('LK_CAIGOUZU') }}</span><!-- 采购组 -->
              </div>
              <iInput class="input" :placeholder="$t('LK_QINGSHURU')"></iInput>
            </div>
            <div class="item">
              <div class="txt">
                <span>FS/GS</span><!-- FS/GS -->
              </div>
              <div class="disabled">CSA-0098100177</div>
            </div>
          </div>

          <div class="popup-formItem">
            <div class="item">
              <div class="txt">
                <span>{{ $t('LK_BUHANSUICHENGBEN') }}</span><!-- 不含税成本 -->
              </div>
              <div class="disabled">CSA-0098100177</div>
            </div>
            <div class="item">
              <div class="txt">
                <span>{{ $t('LK_HANSUICHENGBEN') }}</span><!-- 含税成本 -->
              </div>
              <div class="disabled">CSA-0098100177</div>
            </div>
            <div class="item">
              <div class="txt required">
                <span>{{ $t('LK_SOPRIQI') }}</span><!-- SOP日期 -->
              </div>
              <div class="disabled">CSA-0098100177</div>
            </div>
            <div class="item">
              <div class="txt">
                <span>{{ $t('LK_QIANSHOURIQI') }}</span><!-- 签收日期 -->
              </div>
              <div class="disabled">CSA-0098100177</div>
            </div>
          </div>

          <div class="popup-formItem">
            <div class="lastItem">
              <div class="txt">
                <span>{{ $t('LK_DUANWENBEN') }}</span><!-- 短文本 -->
              </div>
              <iInput class="input" :placeholder="$t('LK_QINGSHURU')"></iInput>
            </div>
          </div>
        </div>

        <iTableList
          :tableData="aekoTableList"
          :tableTitle="bmPopupTableHead"
          :tableLoading="allTableLoading"
          @handleSelectionChange="handleSelectionChange"
        >
          
        </iTableList>
      </template>
    </BmPopup>
  </div>
</template>

<script>
import {
  icon,
  iTableList
} from "@/components";
import {
  iMessage,
  iButton,
  iCard,
  iPagination,
  iDialog,
  iInput,
  iSelect,
} from "rise";
import SearchBlock from "./components/searchBlock";
import { allTableHead, bmTableHead, aekoTableHead, aekoBmTableHead, bmPopupTableHead } from "./components/data";
import BmPopup from "./components/popup";
export default {
  components: {
    icon, SearchBlock, iTableList, iCard,
    iButton, BmPopup, iInput, iSelect
  },
  data(){
    return {
      tableIndex: 1,
      allTableHead,
      bmTableHead,
      aekoTableHead,
      aekoBmTableHead,
      bmPopupTableHead,
      allTableLoading: false,
      allTableList: [], //  所有BM申请列表
      bmTableList: [
        {data1: '111111'}
      ],  //  待确认BM列表
      aekoTableList: [],  //  aeko增值BM单
      aekoBmTableList: [],  //  Aeko减值BM单
      selectTableList: [],
      bmVisible: false,
      factoryList: [],  //  工厂下拉列表
      departmentList: [], //  科室下拉列表
    }
  },

  methods: {

    //  打开BM单流水号
    openBMDetail(scope){
      this.bmVisible = true;
    },

    selectHeadTable(type){
      this.selectTableList = [];
      this.tableIndex = type;
    },

    handleSelectionChange(val){
      this.selectTableList = val;
    },
  }
}
</script>

<style lang="scss" scoped>
.popup-form{
  border-bottom: 2px solid #E3E3E3;
  margin-bottom: 20px;

  .popup-formItem{
    display: flex;
    margin-bottom: 20px;
    
    .lastItem{
      width: 50%;
      display: flex;
      padding-right: 30px;

      .txt{
        flex: 1;
        font-size: 16px;
        color: #4B4B4C;
      }

      .input{
        flex: 6;
      }
    }

    .item{
      display: flex;
      flex: 1;
      margin-left: 80px;
      line-height: 35px;

      .required{

        span::after{
          content: '*';
          color: crimson;
        }
      }

      .txt{
        flex: 1;
        font-size: 16px;
        color: #4B4B4C;
      }

      .disabled{
        width: 250px;
        height: 35px;
        background: #F8F8FA;
        border-radius: 4px;
        text-align: center;
      }

      .input{
        width: 250px;
        height: 35px;
      }
    }

    & .item:nth-child(1){
      margin-left: 0;
    }
  }
}
.table-txtStyle{
  color: #1663F6;
  text-decoration: underline;
  font-family: Arial;
  cursor: pointer;
}
.table-head{
  display: flex;
  justify-content: flex-end;
  margin-bottom: 20px;
}
.page-head{
  display: flex;
  padding-top: 20px;
  margin-bottom: 20px;

  .head-on{
    background: linear-gradient(42deg, #1660F1 0%, #76A5FF 100%) !important;

    .title, .describe{
      color: #FFFFFF !important;
    }
  }

  .page-head-flex{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 70px;
    flex: 1;
    height: 160px;
    background: #FFFFFF;
    box-shadow: 0px 0px 20px rgba(27, 29, 33, 0.08);
    border-radius: 10px;
    margin-left: 20px;
    cursor: pointer;

    .line-div{

      .title{
        font-size: 60px;
        font-weight: bold;
      }
      .describe{
        color: #798489;
        font-size: 16px;
        margin-top: 7px;
      }
      .openIcon{
        width: 78px;
        height: 78px;
      }
    }
  }
  & .page-head-flex:nth-child(1){
    margin-left: 0;
  }
}
</style>