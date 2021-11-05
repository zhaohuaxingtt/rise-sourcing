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
              <div class="disabled">{{detailsData.bmSerial}}</div>
            </div>
            <div class="item">
              <div class="txt">
                <span>{{ language('LK_TOUZIQINGDANLAIYUAN', '投资清单来源') }}</span>
              </div>
              <div class="disabled">{{detailsData.investmentSourceName}}</div>
            </div>
            <div class="item">
              <div class="txt">
                <span>{{ language('LK_LAIYUANBIANHAO', '来源编号') }}</span>
              </div>
              <div class="disabled">{{detailsData.investmentSourceNum}}</div>
            </div>
            <div class="item">
              <div class="txt">
                <span>{{ language('LK_SHIFOUHIL', '是否HIL') }}</span>
              </div>
              <div class="disabled">{{detailsData.isHilName}}</div>
            </div>
          </div>

          <div class="c-line">
            <div class="item">
              <div class="txt">
                <span>{{ language('LK_KESHI', '科室') }}</span>
              </div>
              <div class="disabled">{{detailsData.deptName}}</div>
            </div>
            <div class="item">
              <div class="txt">
                <span>{{ language('LK_LINIE', 'Linie') }}</span>
              </div>
              <div class="disabled">{{detailsData.linieName}}</div>
            </div>
            <div class="item">
              <div class="txt">
                <span>{{ language('LK_GONGYINGSHANG', '供应商') }}</span>
              </div>
              <div class="disabled">{{detailsData.designatedSupplierName}}</div>
            </div>
            <div class="item">
              <div class="txt">
                <span>{{ language('LK_RUZHANGRIQI', '入账日期') }}</span>
              </div>
              <div class="disabled">{{detailsData.enterAccountDate}}</div>
            </div>
          </div>

          <div class="c-line">
            <div class="item">
              <div class="txt">
                <span>{{ language('LK_WBSBIANHAO', 'WBS编号') }}</span>
              </div>
              <div class="disabled">{{detailsData.wbsCode}}</div>
            </div>
            <div class="item">
              <div class="txt">
                <span>{{ language('LK_DINGDANHAO', '订单号') }}</span>
              </div>
              <div class="disabled">{{detailsData.orderNum}}</div>
            </div>
            <div class="item">
              <div class="txt">
                <span>{{ language('LK_TOUZIZONGJINE', '投资总金额') }}</span>
              </div>
              <div class="disabled">{{detailsData.investmentTotalAmount}}</div>
            </div>
            <div class="item">
              <div class="txt">
                <span>{{ language('LK_RUZHANGDANHAO', '入账单号') }}</span>
              </div>
              <div class="disabled">{{detailsData.enterAccountNum}}</div>
            </div>
          </div>

          <div class="c-line">
            <div class="item">
              <div class="txt">
                <span>{{ language('LK_CHEXINGXIANGMU', '车型项目') }}</span>
              </div>
              <div class="disabled">{{detailsData.tmCartypeProName}}</div>
            </div>
            <div class="item">
              <div class="txt">
                <span>{{ language('LK_SAPDINGDANHAO', 'SAP订单号') }}</span>
              </div>
              <div class="disabled">{{detailsData.sapOrder}}</div>
            </div>
            <div class="item">
              <div class="txt">
                <span></span>
              </div>
              <div class="disabled disabled1"></div>
            </div>
            <div class="item">
              <div class="txt">
                <span></span>
              </div>
              <div class="disabled disabled1"></div>
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
        </div>
        
      </div>

      <iTableList
        :tableData="detailsTableList"
        :tableTitle="detailsTableHead"
        :tableLoading="detailsTableLoading"
        :selection="false"
      >
        <!-- 照片 -->
        <template #img="scope">
          <div class="table-link" @click="openPhoto(scope.row)">{{scope.row.img}}</div>
        </template>
      </iTableList>
      
      <div class="UnitExplain">
        <UnitExplain />
      </div>
    </iCard>

    <iCard class="changeList">
      <div class="title">{{language('LK_BIANGENDANJIALIEBIAO', '变更单列表')}}</div>
      <iTableList
        :tableData="detailsBottomTableList"
        :tableTitle="detailsBottomTableHead"
        :tableLoading="detailsBottomTableLoading"
        :selection="false"
      >
        <!-- BM单流⽔号 -->
        <template #data1="scope">
          <div class="table-link">{{scope.row.data1}}</div>
        </template>
      </iTableList>
    </iCard>

    <PhotoList :imgList="imgList" :visible="visible" @changeLayer="() => visible = false" />
  </iPage>
</template>

<script>
import {
  iTableList
} from "@/components";
import {iPage, iMessage, iDialog, iButton, iSelect, iSearch, iInput,
  iCard, icon
} from "rise";
import { detailsTableHead, detailsBottomTableHead } from "./components/data";
import UnitExplain from "./components/unitExplain";
import PhotoList from "../components/photoList";
import {
  detailByBmSerial
} from "@/api/ws2/purchase/mouldBook";

export default {
  components: {
    iPage,
    iSelect,
    iCard,
    icon,
    iTableList,
    iButton,
    UnitExplain,
    PhotoList
  },

  data(){
    return {
      versionId: '',
      versionList: [],  //  版本列表
      technologyTypeList: [], //  工艺类型
      assetsTypeList: [], //  资产分类编号
      detailsTableList: [{'img': '照片'}],
      detailsBottomTableList: [
        {data1: 'TC0000000004', data2: 'V05-20210303', data3: 'CBD变更', data4: '张三', data5: '2021-03-03'},
        {data1: 'TC0000000003', data2: 'V04-20210204', data3: 'Aeko减值(Aeko号)', data4: '系统自动', data5: '2021-02-04'},
      ],
      isOpen: false,
      detailsTableHead,
      detailsBottomTableHead,
      detailsTableLoading: false,
      detailsBottomTableLoading: false,
      visible: false,
      imgList: ['https://cdn6-banquan.ituchong.com/weili/l/919767005971611831.webp', 'https://cdn6-banquan.ituchong.com/weili/l/915608610047000641.webp', 'https://cdn9-banquan.ituchong.com/weili/l/903371741418749965.webp'],
      detailsData: {},
      bmSerial: ''
    }
  },

  created(){
    this.bmSerial = this.$route.query.bmSerial;
    this.detailByBmSerial();
  },

  methods: {

    detailByBmSerial(){
      detailByBmSerial({bmSerial: this.bmSerial}).then(res => {
        const result = this.$i18n.locale === 'zh' ? res.desZh : res.desEn;

        if(res.data){
          this.detailsData = res.data;
        }else{
          iMessage.error(result);
        }
      })
    },

    //  照片
    openPhoto(){
      this.visible = true;
    },

    changeSerch(type){
      this.isOpen = type;
    },

    exportList(){ //  导出

    },
  }
}
</script>

<style lang="scss" scoped>
.table-link{
  color: #1763F7;
  cursor: pointer;
  text-decoration: underline;
}
.changeList{
  margin-top: 20px;

  .title{
    color: #020918;
    font-weight: bold;
    margin-bottom: 20px;
  }
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
    margin-bottom: 10px;

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
      margin-bottom: 20px;

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