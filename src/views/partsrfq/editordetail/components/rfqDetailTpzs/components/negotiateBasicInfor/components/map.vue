<!--
 * @version: 1.0
 * @Author: zbin
 * @Date: 2021-06-17 16:28:01
 * @LastEditors: zbin
 * @Descripttion: 总览
-->
<template>
  <div class="chartmap">
    <el-amap map-style="amap://styles/macaron" :dragEnable="false" vid="amapDemo" :roam="false" :zoomEnable="false" :zoom="4" :center="[130,33]">
      <!-- <el-amap-text v-if="tooltipShow" :position="tooltipSite" :text="tooltipText" /> -->
      <el-amap-circle v-for="(circle,index) in circles" :key="index" :center="circle.center" :radius="circle.radius" :fill-opacity="circle.fillOpacity" :events="circle.events"></el-amap-circle>
      <el-amap-marker v-for="(item,index) in tableData" :content='item.content' :key="index" :events='events' :position="[item.lon,item.lat]"></el-amap-marker>
      <el-amap-circle :center="[111,30]" :radius="11" :fillOpacity="1" strokeStyle="solid"></el-amap-circle>
      <el-amap-circle :zIndex="10" :radius="item.symbolSize" :stroke-weight="0" :stroke-color="color[index]" :fill-color="color[index]" v-for="(item,index) in tableData" :key="index" :center="[item.lon, item.lat]" />
      <!-- <el-amap-marker :stroke-weight="7" :icon='svwImg' v-for="(item,index) in svwData" :key="index" :label='tooltipSvw' @mouseout="handleOut()" @mouseover="handleOver(item)" :position="[item.lon, item.lat]" /> -->
    </el-amap>
  </div>
</template>

<script>

import { iCard, icon, iLabel } from "rise";
import svwImg from "@/assets/images/svw.png";
import { cloneDeep } from "lodash";
// window.AmapVue.config={
//   // 高德的key
//   key: 'ad8bb27d93a0b17188e1b46872a446f8',
//   // 插件集合
//   plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor'],
//   // 高德 sdk 版本，默认为 1.4.4
//   version: '2.0'
// };
// console.log(window);
window.VueAMap.initAMapApiLoader({
  // 高德的key
  key: 'ad8bb27d93a0b17188e1b46872a446f8',
  // 插件集合
  plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor'],
  // 高德 sdk 版本，默认为 1.4.4
  v: '1.4.4'
});
export default {
  components: { iCard, icon, iLabel },
  props: {
    mapListData: {
      type: Object, default: (data) => {
        console.log(data);
        return {}
      }
    }
  },
  watch: {
    '$i18n.locale'(newValue) {
      this.handleMap();
    },
    mapListData: {
      handler(objects) {
        const data = cloneDeep(objects)
        console.log(data);
        var sum = 0

        this.svwData = data.purchaseDataList
        this.tableData = data.offerDataList
        this.tableData.forEach(item => {
          sum = sum + item.toAmount
        })
        this.tableData.map(item => {
          item.symbolSize = item.toAmount / sum * 100 / 5
          item.toAmount = String(item.toAmount).replace(/\B(?=(\d{3})+(?!\d))/g, ',') + 'RMB'
          return item.value = [item.lon, item.lat]
        })
        this.svwData.map(item => {
          return item.value = [item.lon, item.lat]
        })
      },
      deep: true,
    }
  },
  data() {
    return {
      zoom: 15,
      center: [121.5273285, 31.21515044],
      circles: [
        {
          center: [121.5273285, 31.21515044],
          radius: 200,
          fillOpacity: 0.5,
          events: {
            click: () => {
              alert('click');
            }
          }
        }
      ],
      svwImg: {
        image: svwImg,
        imageSize: [15, 15],
      },
      tooltipShow: false,
      tooltipSite: [],
      tooltipText: '',
      tooltipSvw: {
        content: '',
        offset: [0, 0],
        direction: 'top'
      },
      svwData: [],
      color: ['#B9DDFA', '#8BC7F7', '#46B3F3', '#009FEF', '#008CEE', '#0078ED', '#0050EB', '#0641C8', '#0B31A5', '#46647C', '#235A7A', '#005078'],
      tableData: []
    }
  },
  created() {
  },
  mounted() {
  },
  methods: {
    handleOut() {
      this.tooltipSvw.content = ''
      this.tooltipShow = false
    },
    handleOver(params) {
      console.log(params);
      let carTypeList = ''
      params.carTypeProjectList.forEach((item, index) => {
        carTypeList += params.carTypeProjectList.length - 1 > index ? item + ' | ' : item
      })
      console.log(carTypeList);
      if (params.title === 'OFFER') {
        this.tooltipSite = [params.lon, params.lat]
        this.tooltipShow = true
        this.tooltipText = `<div class='tooltip'>
                                    <div class='flex'>
                                      <div class="img"></div><div class='title'>${params.name}</div>
                                    </div>
                                    <div class='label'>${this.$t('LK_CHEXING') + ':'}</div>
                                    <div class='value'>${carTypeList}</div>
                                    <div class='label'>${this.$t('TPZS.SQDZDZ')}</div>
                                    <div class='value'>${params.factoryAddress}</div>
                                    <div class='label'>${this.$t('TPZS.ZXSE')}</div>
                                    <div class='value'>${params.toAmount}</div>
                                </div>`
      } else {
        this.tooltipSvw.content = `<div class='tooltip'>
                                  <div class='flex'>
                                    <div class="img-svw"></div><div class='title'>${params.name}</div>
                                  </div>
                                  <div class='label'>${this.$t('LK_CHEXING') + ':'}</div>
                                  <div class='value'>${carTypeList}</div>
                                  <div class='label'>${this.$t('TPZS.SQDZDZ')}</div>
                                  <div class='value'>${params.factoryAddress}</div>
                                </div>`
      }
    },

  }
}
</script>

<style lang='scss' scoped>
.chartmap {
  width: 100%;
  height: 60rem;
}
::v-deep .amap-logo,
.amap-copyright {
  display: none !important;
}

::v-deep .tooltip {
  padding: 30px;
  /* width: 40rem; */
  .flex {
    align-items: center;
    .title {
      margin-left: 5px;
      color: #7e84a3;
      font-size: 20px;
    }
    .img {
      width: 33px;
      height: 25px;
      background: url("~@/assets/images/zl.png") center center no-repeat;
      background-size: 33px auto;
    }
    .img-svw {
      width: 33px;
      height: 35px;
      background: url("~@/assets/images/svw.png") center center no-repeat;
      background-size: 33px auto;
    }
  }
  .label {
    color: #7e84a3;
    font-size: 20px;
    text-align: left;
    margin-top: 8px;
    margin-bottom: 8px;
  }
  .value {
    color: #131523;
    font-size: 16px;
    text-align: left;
  }
}
</style>