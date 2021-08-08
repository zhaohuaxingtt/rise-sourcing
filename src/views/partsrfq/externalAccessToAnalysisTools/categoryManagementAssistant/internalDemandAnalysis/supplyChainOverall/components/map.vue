<template>
  <div ref="charMap" id="container" class="amap-wrapper">
  </div>
</template>

<script>
import lg from "@/assets/images/N-tire-grayness.png";
import { downloadPdfMixins } from '@/utils/pdf';
import resultMessageMixin from '@/utils/resultMessageMixin';
export default {
  mixins: [resultMessageMixin, downloadPdfMixins],
  props: {
    mapListData: {
      type: Array, default: () => {
        return []
      }
    }
  },
  data() {
    return {
      markerList: [],
      lg: lg
    }
  },
  watch: {
    mapListData(data) {
      console.log(data);
      this.markerList = data
      if (this.markerList && this.$refs.charMap) {
        this.showCityInfo();
      }
    }
  },
  created() { },
  mounted() {
    this.showCityInfo();
  },
  methods: {
    showCityInfo() {
      var map = new AMap.Map('container', {
        WebGLParams: {
          preserveDrawingBuffer: true
        },
        resizeEnable: true, //是否监控地图容器尺寸变化
        zoom: 4, //初始地图级别
        center: [130, 39.239637], //初始地图中心点
        showIndoorMap: false, //关闭室内地图
        roam: false,
        zoomEnable: false,
        dragEnable: false,
        mapStyle: 'amap://styles/macaron'
      });

      // var lineArr = [
      //   ['75', '38'],
      //   ['117', '24']
      // ];
      // var polyline = new AMap.Polyline({
      //   path: lineArr,            // 设置线覆盖物路径
      //   strokeColor: '#3366FF',   // 线颜色
      //   strokeOpacity: 1,         // 线透明度
      //   strokeWeight: 2,          // 线宽
      //   strokeStyle: 'solid',     // 线样式
      //   strokeDasharray: [10, 5], // 补充线样式
      //   geodesic: true            // 绘制大地线
      // });
      // polyline.setMap(map);
      // console.log(this.markerList);
      // this.markerList.map(item => {
      //   // 图标
      //   var endIcon = new AMap.Icon({
      //     size: new AMap.Size(135, 40),
      //     image: this.lg,
      //     imageSize: new AMap.Size(135, 40),
      //     anchor: 'center',
      //   });
      //   // 点
      //   let marker = new AMap.Marker({
      //     position: new AMap.LngLat(item.lon, item.lat),
      //     icon: endIcon,
      //     clickable: true
      //   });
      //   marker.setMap(map)
      //   marker.on('mouseover', (e) => {
      //     console.log(e);
      //     var position = e.data.data && e.data.data.position;
      //     if (position) {
      //       normalMarker.setContent(
      //         '<div class="amap-info-window">'
      //         + position +
      //         '<div class="amap-info-sharp"></div>' +
      //         '</div>');
      //       normalMarker.setPosition(position);
      //       map.add(normalMarker);
      //     }
      //   })
      //   marker.on('mouseout', () => {
      //     this.handleTip()
      //   })
      // })
      // var path = [//每个弧线段有两种描述方式
      //   ['75', '38'],
      //   ['117', '24']
      // ];
      // var bezierCurve = new AMap.BezierCurve({
      //   path: path,
      //   isOutline: true,
      //   outlineColor: '#ffeeff',
      //   borderWeight: 3,
      //   strokeColor: "#3366FF",
      //   strokeOpacity: 1,
      //   strokeWeight: 6,
      //   // 线样式还支持 'dashed'
      //   strokeStyle: "solid",
      //   // strokeStyle是dashed时有效
      //   strokeDasharray: [10, 10],
      //   lineJoin: 'round',
      //   lineCap: 'round',
      //   zIndex: 50,
      // })
      // bezierCurve.setMap(map)
    },
    handleTip() {
      console.log(45678);
    }
  }
}
</script>
<style lang="scss" scoped>
.amap-wrapper {
  width: 100%;
  height: 60rem;
}
::v-deep .amap-logo {
  display: none !important; //去掉高德地图logo
}
::v-deep .amap-copyright {
  opacity: 0; //去掉高德的版本号
}
</style>

