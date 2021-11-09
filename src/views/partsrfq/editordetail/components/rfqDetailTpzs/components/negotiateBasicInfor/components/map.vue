<!--
 * @version: 1.0
 * @Author: zbin
 * @Date: 2021-06-17 16:28:01
 * @LastEditors: zbin
 * @Descripttion: 总览
-->
<template>
  <div ref="charMap" id="container" class="amap-wrapper" />
</template>

<script>
import lg from "@/assets/images/N-tire-grayness.png";
import highlight from "@/assets/images/N-tire-highlight.png";
import { iCard, icon, iLabel } from "rise";
import svwImg from "@/assets/images/svw.png";
import { cloneDeep } from "lodash";

export default {
  components: { iCard, icon, iLabel },
  props: {
    mapListData: {
      type: Object, default: (data) => {
        return {}
      }
    }
  },
  data() {
    return {
      lg: lg,
      highlight: highlight,
      svwImg: svwImg,
      svwData: [],
      color: ['#B9DDFA', '#8BC7F7', '#46B3F3', '#009FEF', '#008CEE', '#0078ED', '#0050EB', '#0641C8', '#0B31A5', '#46647C', '#235A7A', '#005078'],
      tableData: []
    }
  },
  watch: {
    '$i18n.locale'(newValue) {
      this.handleMap();
    },
    mapListData: {
      handler(objects) {
        const data = cloneDeep(objects)
        var sum = 0

        this.svwData = data.purchaseDataList
        this.tableData = data.offerDataList
        this.tableData && this.tableData.forEach(item => {
          sum = sum + parseFloat(item.toAmount)
        })
        this.tableData && this.tableData.map(item => {
          item.symbolSize = parseFloat(item.toAmount) / sum * 100 / 5
          item.toAmount = String(item.toAmount).replace(/\B(?=(\d{3})+(?!\d))/g, ',') + 'RMB'
          return item.value = [item.lon, item.lat]
        })
        this.svwData && this.svwData.map(item => {
          return item.value = [item.lon, item.lat]
        })
        if (this.$refs.charMap && (this.tableData || this.svwData)) {
          this.handleMap()
        }
      },
      deep: true,
    }
  },
  created() {
  },
  mounted() {
    this.handleMap()
  },
  methods: {
    handleMap() {
      console.log('creat map');
      // 初始化地图
      var map = new AMap.Map('container', {
        WebGLParams: {
          preserveDrawingBuffer: true //解除缓冲
        },
        resizeEnable: true, //是否监控地图容器尺寸变化
        zoom: 4.7, //初始地图级别
        center: [110, 39], //初始地图中心点
        showIndoorMap: true, //关闭室内地图
        roam: true,
        zoomEnable: true,
        dragEnable: true,
        // mapStyle: 'amap://styles/macaron'
      });
      // 圆点
      this.tableData && this.tableData.map((item, index) => {
        let carTypeList = ''
        item.carTypeProjectList.forEach((val, i) => {
          carTypeList += item.carTypeProjectList.length - 1 > i ? val + ' | ' : val
        })
        var circleMarker = new AMap.CircleMarker({
          center: [item.lon, item.lat],
          radius: item.symbolSize,//3D视图下，CircleMarker半径不要超过64px
          strokeColor: this.color[index],
          strokeWeight: 2,
          strokeOpacity: 1,
          fillColor: this.color[index],
          fillOpacity: 1,
          zIndex: 10,
          bubble: true,
          cursor: 'pointer',
          clickable: true,
          data: item
        })
        circleMarker.setMap(map)
        let clickIcon = new AMap.Icon({
          image: this.highlight,
          size: new AMap.Size(40, 30),
          imageSize: new AMap.Size(20, 30),
          anchor: 'center',
        });
        // 点
        let marker = new AMap.Marker({
          position: new AMap.LngLat(item.lon, item.lat),
          icon: clickIcon,
          clickable: true,
          anchor: "center",
          offset: new AMap.Pixel(-10, 0) //设置偏移量
        });
        marker.setMap(map)
        marker.hide()
        circleMarker.on('click', () => {
          marker.show()
          handleTooltip.open(map, [item.lon, item.lat])
        })
        circleMarker.on('mouseout', () => {
          map.clearInfoWindow()
          marker.hide()
        })
        var handleTooltip = new AMap.InfoWindow({
          content: `<div class='tips' style="height:'350px'">
                      <div class='flex'>
                        <div class="img"></div><div class='title'>${item.name}</div>
                      </div>
                      <div class='label'>${this.language('CHEXINGXIANGMUMAOHAO', '车型：')}</div>
                      <div class='carType'>${carTypeList}</div>
                      <div class='label'>${this.language('GONGYINGSHANGGONGCHANGDIZHI', '供应商工厂地址：')}</div>
                      <div class='value'>${item.factoryName}-${item.factoryAddress}</div>
                      <div class='label'>${this.language('GONGCHANGZONGXIAOSHOUE', '工厂总销售额：')}</div>
                      <div class='value'>${item.toAmount}</div>
                  </div>`,
          offset: new AMap.Pixel(-0, -15)
        });
      })
      // svw图标
      this.svwData && this.svwData.map(item => {
        let carTypeList = ''
        item.carTypeProjectList.forEach((val, index) => {
          carTypeList += item.carTypeProjectList.length - 1 > index ? val + ' | ' : val
        })
        // 图标
        var svwImg = new AMap.Icon({
          size: new AMap.Size(40, 40),
          imageSize: new AMap.Size(20, 20),
          image: this.svwImg,
          anchor: 'center',
        });
        // 点
        let marker = new AMap.Marker({
          position: new AMap.LngLat(item.lon, item.lat),
          icon: svwImg,
          clickable: true,
          anchor: "center"
        });
        marker.setMap(map)
        marker.on('click', () => {
          handleTooltip.open(map, [item.lon, item.lat])
          console.log('purchase');
        })
        var handleTooltip = new AMap.InfoWindow({
          content: `<div class='tips' style="height="300px"">
                        <div class='flex'>
                          <div class="img-svw"></div><div class='title'>${item.name}</div>
                        </div>
                        <div class='label'>${this.$t('LK_CHEXING')}:</div>
                        <div class='carType'>${carTypeList}</div>
                        <div class='label'>${this.language('GONGCHANGDIZHI', '工厂地址')}:</div>
                        <div class='value'>${item.factoryName}-${item.factoryAddress}</div>
                      </div>`,
          offset: new AMap.Pixel(7, -15)
        });
      })
    },
  }
}
</script>

<style lang='scss' scoped>
::v-deep.amap-wrapper {
  width: 100%;
  height: 60rem;
}
::v-deep .amap-logo {
  display: none !important;
}
::v-deep .amap-copyright {
  display: none !important;
}
::v-deep .tips {
  width: 415px;
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
    text-align: left;
    margin-top: 20px;
    margin-bottom: 8px;
    font-size: 12px;
  }
  .carType {
    height: 3rem;
    overflow: auto;
    color: #131523;
    font-size: 12px;
    text-align: left;
  }
  .value {
    color: #131523;
    font-size: 12px;
    text-align: left;
  }
}
</style>