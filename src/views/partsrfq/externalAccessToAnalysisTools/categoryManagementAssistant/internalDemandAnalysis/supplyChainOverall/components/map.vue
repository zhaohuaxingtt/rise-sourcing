<!--
 * @version: 1.0
 * @Author: zbin
 * @Date: 2021-08-02 17:03:11
 * @LastEditors: zbin
 * @Descripttion: your project
-->
<template>
  <div class="amap-wrapper">
    <el-amap :events="mapEvents" :amap-manager="amapManager" :dragEnable="false" vid="amapDemo" :roam="false" :zoomEnable="false" :zoom="4" :center="[130,39]">
      <el-amap-marker v-for="(item,index) in markerList" :key="index" :events='events' :position="[item.lon,item.lat]"></el-amap-marker>
      <el-amap-text v-if="showTip" :text="text" :offset="[0,-160]" :position="tipSite"></el-amap-text>
      <el-amap-polyline strokeStyle='solid' strokeColor='#3366FF' :geodesic="true" :path="[[75, 38],[117, 24]]"></el-amap-polyline>
      <!-- <el-amap-bezier-curve v-for="(line,index) in lines" :events="line.events" :path="line.path" :key="index" :stroke-color="line.strokeColor" :stroke-style="line.strokeStyle" :stroke-opacity="line.strokeOpacity"></el-amap-bezier-curve> -->
    </el-amap>
  </div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';
window.VueAMap.initAMapApiLoader({
  // 高德的key
  key: 'ad8bb27d93a0b17188e1b46872a446f8',
  // 插件集合
  plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor'],
  // 高德 sdk 版本，默认为 1.4.4
  v: '1.4.4'
});
let amapManager = new window.VueAMap.AMapManager();
export default {
  // import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    // 这里存放数据
    return {
      text: '',
      tipSite: [],
      showTip: false,
      events: {
        mouseover: a => {
          console.log(a);
          this.tipSite = [a.lnglat.R, a.lnglat.Q]
          this.showTip = true
          this.text = `<div class='tooltip'>
                          <div class='flex'>
                            <div class="img"></div><div class='title'>${1}</div>
                          </div>
                          <div class='label'>${this.$t('LK_CHEXING') + ':'}</div>
                          <div class='value'>${1}</div>
                          <div class='label'>${this.$t('TPZS.SQDZDZ')}</div>
                          <div class='value'>${1}</div>
                          <div class='label'>${this.$t('TPZS.ZXSE')}</div>
                          <div class='value'>${1}</div>
                      </div>`
        },
        mouseout: () => {
          this.showTip = false
        }
      },
      amapManager,
      mapEvents: {
        init(o) {
          o.setMapStyle('amap://styles/macaron');//自定义的高德地图的样式，我选的是马卡龙

        }
      },
      markerList: [
        {
          lon: 75,
          lat: 38
        },
        {
          lon: 117,
          lat: 24
        },
      ],
      ellipses: [
        {
          center: [130.72899, 30.254775],
          radius: [130.72899, 30.254775],
          events: {
            click: () => {
              alert('click');
            }
          }
        }
      ],
      lines: [
        {
          path: [
            [119.72899, 30.254775], [119.72899, 35.254775],
            [116.385298, 39.907771, 116.40, 39.90]
          ],
          strokeDasharray: [10, 10],
          strokeColor: "#FF33FF", //线颜色
          strokeOpacity: 1, //线透明度
          strokeWeight: 3, //线宽
          strokeStyle: "solid", //线样式
          events: {
            click: () => {
              alert('click');
            }
          }
        }
      ]
    }
  },
  // 监听属性 类似于data概念
  computed: {},
  // 监控data中的数据变化
  watch: {},
  // 方法集合
  methods: {
    handleTip() {
      this.label.content = `<div>dsada</div>`
    }
  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created() {

  },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {

  },
}
</script>
<style >
.amap-wrapper {
  width: 100%;
  height: 60rem;
}
::v-deep .amap-logo {
  display: none !important;
}
::v-deep .amap-copyright {
  opacity: 0;
}
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
.tooltip {
  padding: 30px;
  width: 20rem;
}

.flex {
  align-items: center;
}
</style>
