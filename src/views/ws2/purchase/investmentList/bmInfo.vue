<template>
  <iPage>
    <div class="head">
      <div class="title">{{language('LK_BMDANLIUSHUIHAO', 'BM单流水号')}}：6584767893</div>
      <div class="edition">
        <div class="txt">{{language('LK_BANBENHAO', '版本号')}}:</div>
        <iSelect
            :placeholder="language('LK_QINGXUANZHE', '请选择')"
            v-model="versionId"
            filterable
            ref="carTypeProjectRef"
            clearable
        >
          <el-option
              :value="item.id"
              :label="item.cartypeNname"
              v-for="(item, index) in versionList"
              :key="index"
          ></el-option>
        </iSelect>
      </div>
    </div>

    <iCard>
      <div class="head-serch">
        <div class="top-box">
          <div class="title">{{language('LK_JICHUXINXI', '基础信息')}}</div>
          <icon @click.native="changeSerch(false)" v-if="isOpen" class="icon" symbol name="iconfilterquyukuaijiantoushouqi"></icon>
          <icon @click.native="changeSerch(true)" v-else class="icon" symbol name="iconfilterquyukuaijiantouzhankai"></icon>
        </div>

        <div class="content" v-show="isOpen">
          <div class="c-line">
            <div class="item">
              <div class="txt">
                <span>{{ language('LK_BMDANLIUSHUIHAO', 'BM单流水号') }}</span>
              </div>
              <div class="disabled">123123123</div>
            </div>
            <div class="item">
              <div class="txt">
                <span>{{ language('LK_TOUZIQINGDANLAIYUAN', '投资清单来源') }}</span>
              </div>
              <div class="disabled">123123123</div>
            </div>
            <div class="item">
              <div class="txt">
                <span>{{ language('LK_LAIYUANBIANHAO', '来源编号') }}</span>
              </div>
              <div class="disabled">123123123</div>
            </div>
            <div class="item">
              <div class="txt">
                <span>{{ language('LK_SHIFOUHIL', '是否HIL') }}</span>
              </div>
              <div class="disabled">123123123</div>
            </div>

            <div class="item">
              <div class="txt">
                <span>{{ language('LK_GONGYINGSHANG', '供应商') }}</span>
              </div>
              <div class="disabled">123123123</div>
            </div>
            <div class="item">
              <div class="txt">
                <span>{{ language('LK_KESHI', '科室') }}</span>
              </div>
              <div class="disabled">123123123</div>
            </div>
            <div class="item">
              <div class="txt">
                <span>{{ language('LK_LINIE', 'Linie') }}</span>
              </div>
              <div class="disabled">123123123</div>
            </div>
            <div class="item">
              <div class="txt">
                <span>{{ language('LK_XIANGMUCAIGOUYUAN', '项目采购员') }}</span>
              </div>
              <div class="disabled">123123123</div>
            </div>

            <div class="item">
              <div class="txt">
                <span>{{ language('LK_WBSBIANHAO', 'WBS编号') }}</span>
              </div>
              <div class="disabled">123123123</div>
            </div>
            <div class="item">
              <div class="txt">
                <span>{{ language('LK_CHEXINGXIANGMU', '车型项目') }}</span>
              </div>
              <div class="disabled">123123123</div>
            </div>
            <div class="item">
              <div class="txt">
                <span>{{ language('LK_TOUZIZONGJINE', '投资总金额') }}</span>
              </div>
              <div class="disabled">123123123</div>
            </div>
            <div class="item">
              <div class="txt">
                <span>{{ language('LK_TOUZIQINGDANZHUANGTAI', '投资清单状态') }}</span>
              </div>
              <div class="disabled">123123123</div>
            </div>
          </div>
        </div>
        
      </div>
    </iCard>

    <iCard class="table">
      <div class="table-top">
        <div class="top-l">
          <div class="item">
            <div style="widht: 80px">{{language('LK_GONGYILEIXING', '工艺类型')}}:</div>
            <iSelect
                :placeholder="language('LK_QINGXUANZHE', '请选择')"
                v-model="versionId"
                filterable
                ref="carTypeProjectRef"
                clearable
                class="select"
            >
              <el-option
                  :value="item.id"
                  :label="item.cartypeNname"
                  v-for="(item, index) in technologyTypeList"
                  :key="index"
              ></el-option>
            </iSelect>
          </div>

          <div class="item">
            <div style="widht: 112px">{{language('LK_ZICHANFENLEIBIANHAO', '资产分类编号')}}:</div>
            <iSelect
                :placeholder="language('LK_QINGXUANZHE', '请选择')"
                v-model="versionId"
                filterable
                ref="carTypeProjectRef"
                clearable
                class="select"
            >
              <el-option
                  :value="item.id"
                  :label="item.cartypeNname"
                  v-for="(item, index) in assetsTypeList"
                  :key="index"
              ></el-option>
            </iSelect>
          </div>
        </div>

        <div class="top-r">
          <iButton @click="exportList">{{ language('LK_DAOCHU', '导出') }}</iButton>
          <iButton @click="exportList">{{ language('LK_CAIGOUYUANQUEREN', '采购员确认') }}</iButton>
        </div>
        
      </div>

      <iTableList
          :tableData="tableListData"
          :tableTitle="tableTitle"
          :tableLoading="tableLoading"
          :selection="false"
          :typeIndex="true"
      >
        <!-- BM单流⽔号 -->
        <template #data1="scope">
          <div class="table-link" @click="openBMDetail(scope.row)">{{scope.row.data1}}</div>
        </template>
      </iTableList>
      <div style="color: #999999;font-size: 14px;text-align: right;margin: 10px 0;">{{ $t('货币：人民币  |  单位：元  |  不含税 ') }}</div>

      <!--      <div class="UnitExplain">-->
<!--        <UnitExplain />-->
<!--      </div>-->
    </iCard>

  </iPage>
</template>

<script>
import {
  iTableList
} from "@/components";
import {iPage, iMessage, iDialog, iButton, iSelect, iSearch, iInput,
  iCard, icon
} from "rise";
import {bmInfoTitle} from "../components/data"

export default {
  components: {
    iPage,
    iSelect,
    iCard,
    icon,
    iTableList,
    iButton,
  },

  data(){
    return {
      versionId: '',
      versionList: [],  //  版本列表
      technologyTypeList: [], //  工艺类型
      assetsTypeList: [], //  资产分类编号
      tableTitle: bmInfoTitle,
      tableListData: [],
      isOpen: false,
      detailsTableLoading: false,
    }
  },

  methods: {
    changeSerch(type){
      this.isOpen = type;
    },

    exportList(){ //  导出

    },
  }
}
</script>

<style lang="scss" scoped>
.changeList{

}
.UnitExplain{
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
}
.table{
  margin-top: 20px;

  .table-top{
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;

    .top-l{
      display: flex;
      align-items: center;

      .item{
        display: flex;
        align-items: center;
        margin-right: 40px;

        .select{
          width: 220px;
          margin-left: 20px;
        }
      }
    }

    
  }
}

.head-serch{
  .content{
    .c-line{
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;

      .disabled1{
        background-color: #fff !important;
      }
      
      .disabled{
        width: 250px;
        height: 35px;
        background: #F8F8FA;
        border-radius: 4px;
        text-align: center;
        overflow: hidden;/*超出部分隐藏*/
        white-space: nowrap;/*不换行*/
        text-overflow:ellipsis;/*超出部分文字以...显示*/
      }

      .item{
        display: flex;
        flex: 0 1 auto;
        line-height: 35px;
        margin-bottom: 20px;
      }

      .txt{
        font-size: 16px;
        color: #4B4B4C;
        width: 116px;
      }
    }
  }

  .top-box{
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;

    .icon{
      width: 25px;
      height: 14px;
      cursor: pointer;
    }

    .title{
      color: #131523;
      font-size: 18px;
      font-weight: bold;
    }
  }
  
}
.head{
  display: flex;
  align-content: center;
  align-items: center;
  width: 100%;
  margin-bottom: 25px;

  .title{
    font-size: 20px;
    font-weight: bold;
    margin-right: 30px;
  }

  .edition{
    display: flex;
    align-content: center;
    align-items: center;

    .txt{
      width: 68px;
      color: #0D2451;
      font-size: 14px;
    }
  }
}
</style>