<template>
  <el-container class="nav-under-header">
    <el-aside class="nav-aside" style="width: 130px">

      <router-link to="/home/nav/rec" class="nav-aside-item">
        <div class="nav-aside-item-icon"><i class="iconfont icon-home"></i></div>
        <div class="nav-aside-item-words">推荐</div>
      </router-link>

      <router-link to="/home/nav/plt" class="nav-aside-item">
        <div class="nav-aside-item-icon"><i class="iconfont icon-modular"></i></div>
        <div class="nav-aside-item-words">平台</div>
      </router-link>

      <router-link to="/home/nav/area" class="nav-aside-item">
        <div class="nav-aside-item-icon"><i class="iconfont icon-fenlei"></i></div>
        <div class="nav-aside-item-words">分区</div>
      </router-link>

      <router-link to="/home/nav/fw" class="nav-aside-item">
        <div class="nav-aside-item-icon"><i class="iconfont icon-favorite"></i></div>
        <div class="nav-aside-item-words">关注</div>
      </router-link>

    </el-aside>
  </el-container>
</template>

<script>
export default {}
</script>

<style scoped>
.nav-under-header {
  height: 80%;
  width: 100%;
}

.nav-aside {
  padding-top: 10px;
  height: 100%;
  box-shadow: 5px 0px 5px -5px #4e4c4c;
  overflow: hidden;
  position: relative;
}
.nav-aside-item{
  padding-top: 10px;
  padding-bottom: 5px;
  float: left;
  width: 100%;
  height: 30px;
  transition: all 0.1s;
}
.nav-aside-item:hover{
  cursor: pointer;
  transform: scale(1.3);
  font-weight: bold;
}
.nav-aside-item-icon{
  margin-left: 20%;
  float: left;
}
.nav-aside-item-words{
  font-weight: lighter;
  margin-left: 12px;
  float: left;
}
</style>
