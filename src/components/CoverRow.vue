<template>
  <el-row class="rec-room-row" :gutter="20">
    <el-col class="rec-room-col" :xs="20" :sm="10" :md="8" :lg="6" :xl="6"
            v-for="(cover, index) in coverList" :key="index">
      <router-link :to="{path: '/home/liveRoom', query: {p: cover.platform, rid: cover.roomId}}"
                   :target="openBlank()">
        <el-card shadow="hover" class="rec-room-card">
          <div class="rec-room-pic">
            <div class="pic-bottom">
              <div class="pic-bottom-area">{{ cover.categoryName }}</div>
              <div class="pic-bottom-num">
                <i class="el-icon-user"></i>{{ handleOnline(cover.online) }}
              </div>
            </div>
            <el-image v-if="cover.isLive === 1" class="rec-room-img" :src="cover.roomPic" :fit="fit"/>
          </div>
          <div class="rec-room-under">
            <div class="rec-room-info-head">
              <el-image :src="cover.ownerHeadPic" fit="fill" style="border-radius: 8px;"/>
            </div>
            <div class="rec-room-info">
              <span class="rec-room-info-owner">{{ getPlatform(cover.platform) }}-{{ cover.ownerName }}</span>
              <span class="rec-room-info-roomName">{{ cover.roomName }}</span>
            </div>
          </div>
        </el-card>
      </router-link>
    </el-col>
    <div class="cover-row-load" v-loading="loading" element-loading-background="rgba(255, 255, 255, 0.8)"></div>
  </el-row>
</template>

<script>

export default {
  name: 'CoverRow',
  components: {},
  props: ['coverList','newBlank'],
  data() {
    return {
      loading: false,
      fit: 'cover'
    }
  },
  methods: {
    openBlank() {
      return this.newBlank ? '_blank' : '_self';
    },
    handleOnline(online) {
      let num = online.toString().trim()
      if (num.length > 4) {
        let numCut = num.substring(0, num.length - 4)
        let afterPoint = num.substring(num.length - 4, num.length - 3)
        return numCut + '.' + afterPoint + '万'
      } else {
        return num + '人'
      }
    },
    getPlatform(platform) {
      switch (platform) {
        case 'bilibili':
          return '哔哩哔哩'
        case 'douyu':
          return '斗鱼'
        case 'huya':
          return '虎牙'
      }
    }
  }
}
</script>

<style scoped>
.rec-room-row {
  overflow: hidden;
  padding-bottom: 40px;
  padding-left: 200px;
  padding-right: 200px;
}

.rec-room-col {
  margin-top: 30px;
}

.rec-room-col:hover{
  height:85%;
}

.rec-room-card {
  margin: 0 auto;
  position: relative;
  height: 99%;
  width: 85%;
  transition: all 0.2s;
  border-radius: 20px;
}

.rec-room-card:hover{
  cursor: pointer;
  transform: scale(1.15);
}

.rec-room-pic {
  width: 100%;
  height: 200px;
  position: relative;
  z-index: 1;
  box-shadow: inset 0 -10px 0 -10px #000000;
  overflow: hidden;
}

.rec-room-img {
  height: 100%;
  width: 100%;
}

.pic-bottom {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 20px;
  z-index: 100;
  box-shadow: inset 0 -10px 20px 1px #474747;
}

.pic-bottom-area {
  color: white;
  font-weight: bold;
  font-size: small;
  float: left;
  margin-left: 10px;
}

.pic-bottom-num {
  color: white;
  font-weight: normal;
  font-size: small;
  float: right;
  margin-left: 10px;
  margin-right: 5px;
}

.rec-room-under {
  position: relative;
  width: 100%;
  height: 52px;
  background-color: #f6f4f4;
}

.rec-room-info-head {
  margin-left: 10px;
  margin-top: 9px;
  float: left;
  width: 35px;
  height: 35px;
}

.rec-room-info {
  position: absolute;
  overflow: hidden;
  top: 5px;
  left: 55px;
  right: 10px;
  bottom: 5px;
}

.rec-room-info-owner {
  width: 100%;
  height: 50%;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  float: left;
  font-weight: bold;
  font-size: 15px;
}

.rec-room-info-roomName {
  color: gray;
  float: left;
  font-weight: normal;
  width: 100%;
  height: 50%;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  font-size: 13px;
}

.cover-row-load{
  position: absolute;
  width: 100%;
  bottom: 0;
  left: 0;
  height: 80px;
}

.el-card /deep/ .el-card__body {
  padding: 0;
  height: 100%;
}
</style>
