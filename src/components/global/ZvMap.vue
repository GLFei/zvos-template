<!--公用组件：地图组件
    /**
    * @desc 组件描述
    * @date 2019年5月20日15:32:00
    * @param {Number, String} [mapHeight]    - 地图高度(必填)
    * @param {Array} [markers]    - 点标记数据
    * @param {String} [regionPosition]    - 多边形顶点坐标数组 或圆形圆心和半径的对象  字符串
    * @param {Object} [addData] - 针对点围栏定制的对象，包含传递的围栏名称（name）和围栏半径（radius）
    * @param {String} [markContentHtml] - 针对点围栏定制的对象，气泡窗体中内容的html的字符串
    * @param {String} [address] - 针对电子围栏定制的对象，用户输入的具体地址
    * @example 调用示例
    * <zv-map
        :address="address"
        ref="regionFenceMap"
        :markers="markers"
        :regionPosition="regionPosition"
        :addData="addData"
    * ></zv-map>
    */
-->
<template>
  <div class="amap-page-container" id="mapContainer" v-loading="mapLoading" :style="`height:${thisMapHeight}`">
    <!-- <el-amap
      vid="aMap"
      :zoom="zoom"
      :plugin="plugin"
      :style="`height:${thisMapHeight}`"
    >
    </el-amap> -->
  </div>
</template>

<script>
  import {lazyAMapApiLoaderInstance} from 'vue-amap'
  import AMap from 'AMap'
  import ZvModel from './zv-model'
  import Tips from "@/utils/utils/Tips";

  const MyMarks = (param = {}) => {
    // 构造点标记
    let marker = new AMap.Marker(param)
    return marker
  }
  const MyCircleMarker = (param = {}) => {
    // 构造圆圈围栏
    let defaultParam = {
      center: '', // 圆心位置
      radius: '', // 圆半径
      strokeColor: '#3ae2c4', // 描边颜色
      strokeOpacity: 1,
      strokeWeight: 2, // 描边宽度
      fillColor: '#3ae2c4', // 圆形填充颜色
      fillOpacity: 0.2, //圆不透明度
    }
    defaultParam.center = param.center
    defaultParam.radius = param.radius
    let this_circle = new AMap.Circle(defaultParam)
    return this_circle
  }
  export default {
    name: 'ZvMap',
    mixins: [ZvModel],
    props: {
      mapHeight: {
        type: [Number, String],
        default: ''
      },
      markers: {
        type: Array,
        default() {
          return []
        }
      },
      regionPosition: {
        type: String,
        default: ""
      },
      addData: {
        type: Object,
        default() {
          return {}
        }
      },
      markContentHtml: {
        type: String,
        default: ''
      },
      address: {
        type: String,
        default: ''
      },
      lonLat: {
        type: Object,
        default() {
          return {}
        }
      },
      /** 有些地点可以查找,为啥不能定位展示?  为true时展示 */
      showArea: {
        type: Boolean,
        default: false
      },
      fenceType: {
        type: [Number, String],
        default: 200851
      }
    },
    computed: {
      thisMapHeight() {
        return typeof this.mapHeight === 'number'
          ? this.mapHeight + 'px'
          : this.mapHeight
      }
    },
    data() {
      return {
        mapLoading: false,
        addPointFenceFlag: true,
        drawPolygonFlag: true,
        map: null,
        mouseTool: null,
        mapObj: null,
        markersObjectArr: [],
        cluster: null,
        polyEditor: null,
        zoom: 13,
        radius: 0,
        mapCenter: [105, 34],
        geocoder: null,
        circleMarker: null,
        infoWindow: null,
        plugin: [
          {
            pName: 'Scale',
            events: {}
          },
          {
            pName: 'ToolBar',
            events: {}
          }
        ],
        pointMarker: null
      }
    },
    beforeDestroy() {
      this.reSetMarker();
      this.map && this.map.destroy()
      try {
        let el = document.getElementById("lnglat2container")
        let input = document.getElementById("lnglat")
        el && el.removeEventListener('click', this.setRadius)
        input && input.removeEventListener('click', this.setRadiusValue)
      } catch(e) {
        console.log(e)
      }
    },
    mounted() {
      let that = this
      that.mapLoading = true
      that.addPointFenceFlag = true
      that.drawPolygonFlag = true
      /*
      window.addEventListener('load', function() {
        if (!that.map) {
          that.map = new AMap.Map('mapContainer', {
            resizeEnable: true,
            center: that.mapCenter,
            zoom: that.zoom
          })
          if (!that.geocoder) {
            that.geocoder = new AMap.Geocoder({})
          }
          that.mapLoading = false
          if (that.markers && that.markers.length) {
            that.showMakers()
          }
        }
      })
      */
      // setTimeout(() => {
        if (!that.map) {
          that.map = new AMap.Map('mapContainer', {
            resizeEnable: true,
            center: that.mapCenter,
            zoom: that.zoom
          })
          let toolBar = new AMap.ToolBar({
            visible: true
          })
          let scale = new AMap.Scale({
            visible: true
          })
          that.map.addControl(toolBar)
          that.map.addControl(scale)
          if (!that.geocoder) {
            that.geocoder = new AMap.Geocoder({})
          }
        }
        that.mapLoading = false
        if (that.markers && that.markers.length > 0) {
          that.showMakers()
        }

        this.initMapClick(this.fenceType)
      // }, 2000)
      this.$nextTick(() => {
        if (!that.geocoder) {
          // setTimeout(() => {
            lazyAMapApiLoaderInstance.load().then(() => {
              that.geocoder = new AMap.Geocoder({})
            })
          // }, 2000)
        }
      })
    },
    watch: {
      addData(val) {
        this.radius = !val ? 0 : val.radius || 0
      },
      markers: {
        // handler(newValue, oldValue) {
        handler() {
          let that = this
          this.mapLoading = true
          setTimeout(() => {
            //if (newValue !== oldValue) {
              let changeMarkers = []
              //that.markersObjectArr = []
              that.showMakers()
              // 获取变更图标的marker并将视图定位到该点
              // newValue.forEach(newItem => {
              //   oldValue.forEach((oldItem, index) => {
              //     if (
              //       newItem.position.length &&
              //       oldItem.position.length &&
              //       newItem.position[0] === oldItem.position[0] &&
              //       newItem.position[1] === oldItem.position[1] &&
              //       newItem.icon !== oldItem.icon
              //     ) {
              //       changeMarkers.push(that.markersObjectArr[index])
              //     }
              //   })
              // })
              if (changeMarkers.length) {
                that.map.setFitView(changeMarkers)
                that.map.setZoom(4)
              }
              this.mapLoading = false
            //}
          }, 500)
        },
        deep: true
      },
      // markers: {
      //   handler(newValue, oldValue) {
      //     if (newValue !== oldValue) {
      //       this.markersObjectArr = []
      //       this.showMakers()
      //     }
      //   },
      //   deep: true
      // }
      fenceType(val) {
        this.initMapClick(val)
      }
    },
    methods: {
      initMapClick(val) {
        if (val == 200850) {
          this.drawCircle()
          this.map.on('click', this.handleMapClick);
          if (this.polyEditor) {
            this.polyEditor.close()
            this.polyEditor.off('end', this.handlePolyEditorEnd)
          }
          if (this.mouseTool) {
            this.mouseTool.off('draw', this.handleMouseToolDraw)
          }
        } else if (val == 200851) {
          this.map.off('click', this.handleMapClick);
          if (this.polyEditor) {
            this.polyEditor.open()
            this.polyEditor.on('end', this.handlePolyEditorEnd)
          }
          if (this.mouseTool) {
            this.mouseTool.on('draw', this.handleMouseToolDraw)
          }
        }
      },
      // 抛出整个vue实例
      transVue() {
        this.$emit('on-trans-map', this)
      },
      // 根据详细地址转换成高德经纬度并设立maker
      geoCode() {
        let that = this
        let address = this.address
        this.map && this.map.clearMap()
        that.geocoder.getLocation(address, function (status, result) {
          if (status === 'complete' && result.geocodes.length) {
            let lnglat = [that.lonLat.lng, that.lonLat.lat]
            that.mapCenter = lnglat
            that.map.setCenter(lnglat)
            that.setMyMarks(address, lnglat);
            // 点围栏
            if (that.fenceType == 200850) {
              that.addPointFenceFlag = true
              that.drawCircle();
            } else if (that.fenceType == 200851) {
              that.drawPolygon()
            }
            that.map.setFitView(that.pointMarker)
          } else if(status === 'no_data') {
            if (that.showArea) {
              let lnglat = [that.lonLat.lng, that.lonLat.lat]
              that.mapCenter = lnglat
              that.map.setCenter(lnglat)
              that.setMyMarks(address, lnglat);
              // 点围栏
              if (that.fenceType == 200850) {
                that.addPointFenceFlag = true
                that.drawCircle();
              } else if (that.fenceType == 200851) {
                that.drawPolygon()
              }
              that.map.setFitView(that.pointMarker)
            } else {
              Tips.message({
                message: "没有搜索结果,请输入具体位置",
                type: 'error'
              })
            }
          } else {
            Tips.message({
              message: result,
              type: 'error'
            })
          }
        })
      },
      setMyMarks(address, lnglat) {
        let that = this
        this.reSetMarker();
        that.pointMarker = new MyMarks()
        that.map.add(that.pointMarker)
        if (that.fenceType == 200850) {
          that.pointMarker.on('click', that.pointMarkerClick);
        }
        // 设置鼠标划过点标记显示的文字提示
        that.pointMarker.setTitle(address)
        that.pointMarker.setPosition(lnglat)
      },
      // 展示多个maker
      showMakers() {
        let that = this
        let markersArr = []
        markersArr = that.markers
        let infoWindow = new AMap.InfoWindow({offset: new AMap.Pixel(0, -30)})
        if (!that.map) {
          that.map = new AMap.Map('mapContainer', {
            resizeEnable: true,
            center: that.mapCenter,
            zoom: that.zoom
          })
        }
        if (that.markersObjectArr && that.markersObjectArr.length > 0) {
          //that.map.clearMap(that.markersObjectArr)
          that.map.remove(that.markersObjectArr[0]);
        }
        let markerClick = e => {
          let lnglat = [
            e.target.getPosition().lng,
            e.target.getPosition().lat
          ]
          that.mapCenter = lnglat
          that.map.setCenter(lnglat)
          infoWindow.setContent(e.target.content)
          infoWindow.open(that.map, e.target.getPosition())
        }
        that.markersObjectArr = []
        if (markersArr && markersArr.length > 0) {
          markersArr.forEach(marker => {
            if (marker.position[0] && marker.position[1]) {
              let myMarker = new AMap.Marker({
                map: that.map,
                icon: marker.icon,
                position: marker.position,
                // offset: new AMap.Pixel(-13, -30)
              })
              myMarker.content = marker.content
              myMarker.on('click', markerClick)
              that.markersObjectArr.push(myMarker)
              myMarker.emit('click', { target: myMarker })
              // 创建多边形
              // var path = [
              //   [109.399352,34.488156],
              //   [109.393945,34.495283],
              //   [109.393988,34.484884],
              //   [109.411712,34.484282]
              // ];
              // let pos = myMarker.getPosition()
              // var isPointInRing = AMap.GeometryUtil.isPointInRing(pos,path);
              // alert(isPointInRing)
              //
              // // 计算path上距离pos最近的点
              // var closestPositionOnLine  = AMap.GeometryUtil.closestOnLine(pos,path);
              // var distance = Math.round(AMap.GeometryUtil.distanceToLine(pos,path));
              // alert(distance)
            }
              //myMarker.emit('click', { target: marker })
          })
        } else {
          //this.clearMap()
        }
        /*
        // 点聚合
        let pointStyle = [
          {
            url: 'https://a.amap.com/jsapi_demos/static/images/blue.png',
            size: new AMap.Size(32, 32),
            offset: new AMap.Pixel(-16, -16)
          },
          {
            url: 'https://a.amap.com/jsapi_demos/static/images/green.png',
            size: new AMap.Size(32, 32),
            offset: new AMap.Pixel(-16, -16)
          },
          {
            url: 'https://a.amap.com/jsapi_demos/static/images/orange.png',
            size: new AMap.Size(36, 36),
            offset: new AMap.Pixel(-18, -18)
          },
          {
            url: 'https://a.amap.com/jsapi_demos/static/images/red.png',
            size: new AMap.Size(48, 48),
            offset: new AMap.Pixel(-24, -24)
          },
          {
            url: 'https://a.amap.com/jsapi_demos/static/images/darkRed.png',
            size: new AMap.Size(48, 48),
            offset: new AMap.Pixel(-24, -24)
          }
        ]
        */
        if (that.cluster) {
          that.cluster.setMap(null)
          that.cluster = null
        }
        // @param markersObjectArr为markers的Marker对象数组，不能为数据数组
        // that.cluster = new AMap.MarkerClusterer(that.map, that.markersObjectArr, {
        //   gridSize: 80,
        //   averageCenter: true,
        //   styles: pointStyle
        //   // renderClusterMarker: that.myRenderClusterMarker
        // })
        // that.map.setFitView(that.markersObjectArr)
      },
      myRenderClusterMarker(context) {
        const zoom = this.mapObj.getZoom()
        const zc = zoom > 12 ? 30 : 0
        const div = document.createElement('div')
        div.style.backgroundColor = '#95b223'
        const size = 100 - zc
        div.style.width = div.style.height = size + 'px'
        div.style.borderRadius = size / 2 + 'px'
        div.innerHTML = context.count
        div.style.lineHeight = size + 'px'
        div.style.color = '#ffffff'
        div.style.fontSize = '14px'
        div.style.textAlign = 'center'
        context.marker.setOffset(new AMap.Pixel(-size / 2, -size / 2))
        context.marker.setContent(div)
      },
      // 展示编辑信息窗体
      showInfoWindow(param = {}) {
        let that = this
        if (!that.infoWindow) {
          that.infoWindow = new AMap.InfoWindow({
            position: param.lnglat,
            offset: new AMap.Pixel(0, -35)
          })
        }
        that.infoWindow.setContent(that.markContentHtml)
        that.infoWindow.open(that.map)
        that.map.setFitView()
        setTimeout(() => {
          that.$emit('on-bind-function', param)
        }, 50)
      },
      // 点围栏更改半径生成新的围栏
      changeRadius(param = {}) {
        if (this.circleMarker) {
          this.map.remove(this.circleMarker)
        }
        if (param.mapCenter) {
          this.mapCenter = param.mapCenter
        }
        this.circleMarker = new MyCircleMarker({
          center: param.mapCenter || this.mapCenter,
          radius: param.radius || this.addData.radius
        })

        this.map.add(this.circleMarker)
        this.map.setFitView()
      },
      drawComplete() {
        this.infoWindow.close()
        this.addPointFenceFlag = false
        this.drawPolygonFlag = false
        this.transVue()
      },
      // 自适应视图
      fitView() {
        this.map.setFitView()
      },
      // 清理地图所有覆盖物
      clearMap() {
        this.map.clearMap()
      },
      // 绘制多边形
      drawPolygon() {
        let that = this
        if (!that.map) {
          that.map = new AMap.Map('mapContainer', {
            resizeEnable: true
          })
        }
        if (that.drawPolygonFlag) {
          this.mouseTool = new AMap.MouseTool(that.map)
          this.mouseTool.on('draw', this.handleMouseToolDraw)
          this.mouseTool.polygon({
            strokeColor: '#3ae2c4',
            strokeOpacity: 1,
            strokeWeight: 2,
            fillColor: '#3ae2c4',
            fillOpacity: 0.2,
            zIndex: 50
          })
        }
      },
      handleMouseToolDraw(e) {
        this.$emit('on-region-drawed', e.obj.B.path)
        this.map.clearMap()
        // e.obj 为绘制出来的覆盖物对象
        let polygon = new AMap.Polygon({
          path: e.obj.B.path,
          strokeColor: '#3ae2c4',
          strokeOpacity: 1,
          strokeWeight: 2,
          fillColor: '#3ae2c4',
          fillOpacity: 0.2,
          zIndex: 50
        })
        this.map.add(polygon)
        return;
        /**
         * return 后面注释 2019/11/14 guolanfei
        that.map.setFitView([polygon])
        that.polyEditor = new AMap.PolyEditor(that.map, polygon)
        that.polyEditor.open()
        that.polyEditor.on('end', function (event) {
          that.$emit('on-region-drawed', event.target.ue.path)
        })
        */
      },
      // 展示多边形
      showRegion(edit = false,isMulti = false) {
        let regionPosition = this.filterPosition(this.regionPosition)
        let that = this
        if (!that.map) {
          that.map = new AMap.Map('mapContainer', {
            resizeEnable: true,
            center: that.mapCenter,
            zoom: that.zoom
          })
        }
        that.clearMap()
        let polygon = null
        if(isMulti) {
          //that.addPolygon(regionPosition[1])
          regionPosition.forEach(regionP =>{
            that.addPolygon(regionP, !isMulti)
          })
        } else {
          polygon = that.addPolygon(regionPosition, !isMulti)
        }
        // let polygon = new AMap.Polygon({
        //   path: regionPosition,
        //   strokeColor: '#3ae2c4',
        //   strokeWeight: 3,
        //   strokeOpacity: 0.6,
        //   fillOpacity: 0.4,
        //   fillColor: '#3ae2c4',
        //   zIndex: 50
        // })
        // that.map.add(polygon)
        // that.map.setFitView([polygon])
        if (edit) {
          that.polyEditor = new AMap.PolyEditor(that.map, polygon)
          that.polyEditor.open()
          that.polyEditor.on('end', this.handlePolyEditorEnd)
        }
      },
      handlePolyEditorEnd(e) {
        this.$emit('on-region-drawed-edit', e.target.B.path)
      },
      addPolygon(regionPosition, isFitView) {
        let polygon = new AMap.Polygon({
          path: regionPosition,
          strokeColor: '#3ae2c4',
          strokeOpacity: 1,
          strokeWeight: 2,
          fillColor: '#3ae2c4',
          fillOpacity: 0.2,
          zIndex: 50
        })
        this.map.add(polygon)
        if(isFitView) {
          this.map.setFitView([polygon])
        }
        return polygon
      },
      closeDrawRegion() {
        if (this.polyEditor) {
          this.polyEditor.close()
        }
      },

      // 绘制圆形
      drawCircle(type) {
        let that = this
        if (!that.map) {
          that.map = new AMap.Map('mapContainer', {resizeEnable: true})
        }
        // 窗体
        if (!that.infoWindow) {
          that.infoWindow = new AMap.InfoWindow({offset: new AMap.Pixel(0, -35)})
        }

        if (type === 'EDIT') {
          this.drawCircle()
          this.map.on('click', this.handleMapClick);
          if (this.polyEditor) {
            this.polyEditor.close()
            this.polyEditor.off('end', this.handlePolyEditorEnd)
          }
          if (this.mouseTool) {
            this.mouseTool.off('draw', this.handleMouseToolDraw)
          }
        }
      },
      // 展示圆形
      showCircle() {
        let that = this
        that.drawCircle();

        that.clearMap()

        let regionPosition = this.filterPosition(this.regionPosition)
        if (regionPosition && regionPosition.length) {
          this.radius =  Math.ceil( Math.round(AMap.GeometryUtil.distanceOfLine([this.regionPosition[0], this.regionPosition[18]])) / 2) ;
          this.circleLnglat = [(this.regionPosition[0][0] + this.regionPosition[18][0]) / 2, (this.regionPosition[0][1] + this.regionPosition[18][1]) / 2]
        } else {
          this.radius = regionPosition.radius
          this.circleLnglat = regionPosition.center
        }
        // 编辑时展示圆形
        // console.log(radius, this.circleLnglat)
        this.circleMarker = new MyCircleMarker({
          center: this.circleLnglat,
          radius: this.radius
        })

        this.pointMarker = this.createMarker(this.circleLnglat) 
        this.pointMarker.on('click', this.pointMarkerClick);
        this.map.add(this.pointMarker)
        this.map.add(this.circleMarker)
        this.map.setFitView();

        // this.addPointFenceFlag = false
      },
      // 地图点击事件
      handleMapClick (e) {
        if (!this.addPointFenceFlag) return
        this.map && this.map.clearMap()
        this.radius = 0;
        // this.pointMarker && this.pointMarker.setMap() // 清空已有点
        // this.addPointFenceFlag = true
        this.pointMarkerClick(e); // 地图点击时 显示信息弹窗

        // 添加标记点 添加事件
        this.reSetMarker();
        this.pointMarker = this.createMarker([e.lnglat.getLng(), e.lnglat.getLat()]) 
        this.pointMarker.on('click', this.pointMarkerClick);
        this.map.add(this.pointMarker)
      },
      // 创建点标记
      createMarker(pos) {
        return new AMap.Marker({
          icon: "http://10.39.52.74:8888/theme/v1.3/markers/n/mark_bs.png",
          position: pos,
        });
      },
      reSetMarker() {
        if (this.pointMarker) {
          this.pointMarker.off('click', this.pointMarkerClick);
          this.pointMarker = null
        }
      },
      /**
       * 地图，点标记: 添加点击事件
       * 显示信息栏的弹窗
      */
      pointMarkerClick(e) {
        let that = this,
          pos;
        this.circleLnglat = [e.lnglat.getLng(), e.lnglat.getLat()]
        if (this.pointMarker && this.pointMarker.getMap()) {
          pos = this.pointMarker.getPosition()
          this.circleLnglat = [pos.lng, pos.lat]
        } else {
          // 重新设置圆形围栏时， 确认之前不清空显示
          that.circleMarker && that.circleMarker.setMap();
        }

        that.infoWindow.open(that.map, pos || e.lnglat); // 展示输入信息栏
        if (that.addPointFenceFlag) {
          // infowidnow 的 innerHTML
          var infoWindowContent =
            `<div class="custom-infowindow input-card">
                <label class="info-title">围栏半径</label>
                <div class="input-item">
                  <span class="input-item-text">半径(m): </span><input id="lnglat" class="info-input" type="number" />
                </div>
                <input id="lnglat2container" type="button" class="el-button el-button--primary el-button--small btn" value="确认"/>
            </div>`;
          that.infoWindow.setContent(infoWindowContent)

          setTimeout(() => {
            document.getElementById("lnglat").value = this.radius;
            document.getElementById("lnglat2container").addEventListener('click', this.setRadius)
            document.getElementById("lnglat").addEventListener('input', this.setRadiusValue)
          }, 500)
        }
      },
      setRadius() {
        this.radius = document.getElementById("lnglat").value
        if (this.radius < 0) {
          Tips.message({
            message: "围栏半径不能小于0",
            type: 'error'
          })
          return
        }
        let circleParams = {center: this.circleLnglat,radius: this.radius}
        this.circleMarker && this.circleMarker.setMap();
        this.circleMarker = new MyCircleMarker(circleParams)
        try {
          this.map.add(this.circleMarker)
          this.map.setFitView();
          this.$emit('on-region-drawed-circle', circleParams)
        } catch(e) {
          // console.log(e)
          this.circleMarker && this.circleMarker.setMap();
          Tips.message({
            message: "请输入合理围栏半径",
            type: 'error'
          })
          return
        }
        document.getElementById("lnglat2container").removeEventListener('click', this.setRadius)
        this.infoWindow.close();
      },
      setRadiusValue(e) {
        let val = e.target.value
        if (/^-/.test(val)) {
          Tips.message({
            message: "围栏半径不能小于0",
            type: 'error'
          })
          return
        }
        e.target.value = val.replace(/^(0)+(\d)/, "$2")
        return window.event
          ? window.event.cancelBubble = true
          : e.stopPropagation
            ? e.stopPropagation()
            : false;
      },
      filterPosition(str) {
        let pos = JSON.parse(str)
        let position = [];
        if (Object.prototype.toString.call(pos) === '[object Object]') {
          return pos
        } else if (pos && pos.length > 0) {
          pos.forEach(item => {
            position.push([item.longitude, item.latitude]);
          });
        }
        return position;
      }
    }
  }
</script>

<style lang="less">
  #mapContainer {
    // height: 550px;
    position: relative;
  }
  .custom-infowindow {
    display: flex;
    flex-direction: column;
    .info-title {
      color: grey;
    }
    .input-item {
      padding: 9px 0;
    }
    .info-input {
      height: 28px;
      line-height: 28px;
      background-color: #FFFFFF;
      border-radius: 4px;
      border: 1px solid #DCDFE6;
      padding: 0 15px;
      &::hover {
        border-color: #C0C4CC;
      }
      &::focus {
        outline: none;
        border-color: #3ae2c4;
      }
    }
    .el-button--small {
      align-self: center;
      padding: 8px 16px;
      margin-top: 5px;
    }
  }
  .amap-info-close {
    top: 10px;
  }
</style>
