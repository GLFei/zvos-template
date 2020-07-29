<template>
  <div class="position-map-block">
    <div class="position-map-info">
      <span>{{ addressOffset }}</span>
      <span>经度：{{ mapCenter.length > 1 && mapCenter[0]}}</span>
      <span>纬度：{{ mapCenter.length > 1 && mapCenter[1]}}</span>
    </div>

    <el-amap
      ref="amapPosition"
      vid="amapPosition"
      class="amap-demo"
      map-manager="amapManager"
      :zoom="16"
      :center="mapCenter"
      :plugin="plugin"
      :style="`height:${mapHeight}`"
    >
      <el-amap-marker :position="mapCenter"></el-amap-marker>
      <el-amap-info-window
        :position="mapCenter"
        :content="address"
        :offset="offset"
        :visible="infoWinVisible"
      ></el-amap-info-window>
      <template v-for="(polygon, index) in polygons">
        <el-amap-polygon
          v-if="polygon.pathType === 'polygon'"
          :key="index"
          :path="polygon.path"
          :stroke-color="'#3ae2c4'"
          :stroke-opacity="1"
          :stroke-weight="2"
          :fill-color="'#3ae2c4'"
          :fill-opacity="0.2"
        ></el-amap-polygon>
        <el-amap-circle
          v-if="polygon.pathType === 'circle'"
          :key="index"
          :center="polygon.center"
          :radius="polygon.radius"
          :stroke-color="'#3ae2c4'"
          :stroke-opacity="1"
          :stroke-weight="2"
          :fill-color="'#3ae2c4'"
          :fill-opacity="0.2"
        ></el-amap-circle>

        <el-amap-rectangle
          v-if="polygon.pathType === 'rectangle'"
          :key="index"
          :bounds="polygon.bounds"
          :stroke-color="'#3ae2c4'"
          :stroke-opacity="1"
          :stroke-weight="2"
          :fill-color="'#3ae2c4'"
          :fill-opacity="0.2"
        ></el-amap-rectangle>
      </template>
    </el-amap>

    <div class="input-card">
      <p class="card-line">
        <i class="el-icon-check" v-if="addSatelliteFlag"></i>
        <el-button @click="satellite">卫星</el-button>
      </p>
      <p class="card-line">
        <i class="el-icon-check" v-if="addTraffic"></i>
        <el-button  @click="traffic">路况</el-button>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "PositionExceptionMap",
  props: {
    mapHeight: {
      default: "500px;"
    },
    offset: {
      default() {
        return [0, -32];
      }
    },
    mapCenter: {
      type: Array,
      default() {
        return [121.5273285, 31.21515044];
      }
    },
    address: {
      type: String,
      default: ""
    },
    addressOffset: {
      type: String,
      default: ""
    },
    polygons: {
      default() {
        return [];
      }
    },
    plugin: {
      default() {
        return ["ToolBar"];
      }
    }
  },
  data() {
    return {
      map: null,
      satelliteLayer: null,
      trafficLayer: null,
      addSatelliteFlag: false,
      addTraffic: false,
      infoWinVisible: true
    };
  },
  mounted() {
    // 构造官方卫星图层
    this.satelliteLayer = new AMap.TileLayer.Satellite();

    //实时路况图层
    this.trafficLayer = new AMap.TileLayer.Traffic();
  },
  methods: {
    satellite() {
      if (!this.map) {
        this.map = this.$refs.amapPosition.$$getInstance()
      }
      if (!this.addSatelliteFlag) {
        this.map.add(this.satelliteLayer);
        setTimeout(() => {
          this.addSatelliteFlag = true
        }, 300)
      } else {
        this.map.remove(this.satelliteLayer);
        this.addSatelliteFlag = false
      }
    },
    traffic() {
      if (!this.map) {
        this.map = this.$refs.amapPosition.$$getInstance()
      }
      if (!this.addTraffic) {
        this.map.add(this.trafficLayer);
        setTimeout(() => {
          this.addTraffic = true
        }, 300)
      } else {
        this.map.remove(this.trafficLayer);
        this.addTraffic = false
      }
    }
  },
  beforeDestroy() {
    this.map && this.map.destroy();
  }
};
</script>

<style lang="less" scoped>
.position-map-block {
  position: relative;
  .position-map-info {
    padding-bottom: 10px;
    span {
      margin-right: 5px;
      line-height: 19px;
    }
  }
  .input-card {
    position: absolute;
    top: 20px;
    right: 10px;
    .el-button--small {
      padding-left: 20px;
      padding-right: 20px;
    }
    .card-line {
      position: relative;
      .el-icon-check {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        left: 6px;
      }
    }
  }
}
</style>
