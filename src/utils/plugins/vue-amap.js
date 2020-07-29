import Vue from 'vue'
import VueAMap from 'vue-amap'

Vue.use(VueAMap)
VueAMap.initAMapApiLoader({
  key: '1399f61a816afccb87c8ea8a1348d798',
  plugin: [
    'AMap.Autocomplete',
    'AMap.LngLat',
    'AMap.Marker',
    'AMap.MouseTool',
    'AMap.Geocoder',
    'AMap.PlaceSearch',
    'AMap.Scale',
    'AMap.OverView',
    'AMap.ToolBar',
    'AMap.MapType',
    'AMap.PolyEditor',
    'MarkerClusterer',
    'AMap.CircleEditor'
  ],
  v: '1.4.9',
  uiVersion: '1.0.11'
})
