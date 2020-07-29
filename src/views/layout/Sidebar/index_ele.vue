<template>
  <el-aside class="main-sidebar zv-el-aside " :width="width+'px'">
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <menu-tree :default-openeds="['0', '2']" :default-active="'2-1'" :menu-model="menuModel">
      </menu-tree>
    </el-scrollbar>

  </el-aside>

</template>

<style lang="less">
  .main-sidebar.el-aside{
    width:200px;
    background-color:#00413d;
    text-align: left;

    -webkit-transition: width .3s;
    -moz-transition: width .3s;
    -ms-transition: width .3s;
    -o-transition: width .3s;
    transition: width .3s;

    .el-scrollbar{
      height: calc( 100vh - 60px);

      .scrollbar-wrapper{
        overflow-x:hidden;
      }

    }
  }
</style>

<script>
  import pageMixin from "@/mixins/pageMixin";
  import MenuTree from "./MenuTree"

  var data = {
    name: 'My Tree',
    mixins: [pageMixin],
    children: [
      { name: 'hello' },
      { name: 'wat' },
      {
        name: 'child folder',
        children: [
          {
            name: 'child folder',
            children: [
              { name: 'hello' },
              { name: 'wat' }
            ]
          },
          { name: 'hello' },
          { name: 'wat' },
          {
            name: 'child folder',
          }
        ]
      }
    ]
  }
export default {
  components: {
    MenuTree
  },

  props:{
    width: Number
  },
  data() {
    return {
      menuModel:data
    }
  },
}

</script>
