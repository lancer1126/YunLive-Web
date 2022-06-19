<template>
  <el-row class="platform-row" :gutter="20">

    <router-link :to="{name: 'platformRoom', params: {p: 'bilibili'}}">
      <el-col class="platform-col" :span="11">
        <div class="platform-pic">
          <img src="https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2124600341,1611607365&fm=15&gp=0.jpg"
               alt="">
        </div>
        <div class="platform-info">
          <div class="platform-info-title">哔哩哔哩</div>
        </div>
      </el-col>
    </router-link>

<!--    <router-link :to="{name: 'platformRoom', params: {p: 'douyu'}}">-->
<!--      <el-col class="platform-col" :span="11">-->
<!--        <div class="platform-pic">-->
<!--          <img src="https://imgsrc.baidu.com/forum/pic/item/297a0bfc1e178a823f26bdc2e103738da977e81c.jpg" alt="">-->
<!--        </div>-->
<!--        <div class="platform-info">-->
<!--          <div class="platform-info-title">斗鱼直播</div>-->
<!--        </div>-->
<!--      </el-col>-->
<!--    </router-link>-->

<!--    <router-link :to="{name: 'platformRoom', params: {p: 'huya'}}">-->
<!--      <el-col class="platform-col" :span="11">-->
<!--        <div class="platform-pic">-->
<!--          <img src="https://imgsrc.baidu.com/forum/pic/item/902397dda144ad3469d79d09dea20cf430ad85d7.jpg" alt="">-->
<!--        </div>-->
<!--        <div class="platform-info">-->
<!--          <div class="platform-info-title">虎牙直播</div>-->
<!--        </div>-->
<!--      </el-col>-->
<!--    </router-link>-->

  </el-row>
</template>

<script>
export default {}
</script>

<style scoped>
.platform-row {
  height: 100%;
  width: 100%;
}

.platform-col {
  position: relative;
  margin-left: 30px;
  background-color: #e8e6e6;
  margin-bottom: 30px;
  height: 300px;
  border-radius: 10px;
  transition: all 0.2s;
}

.platform-col:hover {
  cursor: pointer;
  transform: scale(1.04);
}

.platform-pic {
  float: left;
  margin-top: 10px;
  height: 280px;
  width: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: justify;
}

.platform-info {
  position: absolute;
  top: 40%;
  right: 0;
  left: 210px;
}
.platform-info-title{
  font-size: 35px;
  font-weight: bold;
  text-align: center;
  width: 100%;
}
</style>
