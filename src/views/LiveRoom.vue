<template>
  <div class="room-main-container">
    <div class="room-left">
      <div v-if="isLive" class="room-left-video">
        <YunArtPlayer v-if="isLive" class="room-left-video-play"
                      @newDanmakuSend="newDanmakuSend"
                      @notSupport="notSupport"
                      :platform="platform"
                      :room-id="roomId"
                      :is-live="isLive"
                      :danmaku-style="danmakuStyle"
                      :danmaku-speed="danmakuSpeed"
                      :danmaku-area="danmakuArea"
                      :danmaku-num="danmakuNum"/>
      </div>
      <div v-else class="room-left-video-notLive">直播间未开播</div>
      <div class="room-left-info">
        <div class="left-info-head">
          <el-image :src="roomInfo.ownerHeadPic" :preview-src-list="getPreList(roomInfo.ownerHeadPic)"/>
        </div>
        <div class="left-info-profile">
          <div class="left-info-profile-name">{{ roomInfo.roomName }}
            <div :class="isLive ? 'info-live' : 'info-notLive'">{{ isLive ? '直播中' : '未开播' }}</div>
          </div>
          <div class="left-info-profile-owner">{{ getPlatform(platform) }} - {{ roomInfo.ownerName }}</div>
        </div>
        <div class="left-info-right">
          <div class="right-link">
            <el-tooltip effect="dark" content="跳转到直播间" placement="top">
              <a :href="getUrl()" target="_blank">
                <el-icon :color="getColor">
                  <Link/>
                </el-icon>
              </a>
            </el-tooltip>
          </div>
        </div>
      </div>
    </div>
    <div class="room-right">
      <div class="room-right-top">
        <div class="room-right-top">直播聊天</div>
        <div class="room-right-body">
          <div v-if="danmakuSupport">
            <transition-group name="danmaku">
              <div class="show-danmaku" v-for="(danmaku, index) in danmakuList" :key="index">
                <span class="danmaku-name">{{ danmaku.fromName }}: </span>
                <span class="danmaku-msg">{{ danmaku.msg }}</span>
              </div>
            </transition-group>
          </div>
          <div v-else class="not-support">暂不支持{{ getPlatform(platform) }}的弹幕</div>
        </div>
      </div>
      <div v-if="!isBottom" @click="toBottom()" class="to-bottom">返回底部</div>
    </div>
  </div>
</template>

<script>
import {getRoomInfo} from "@/api/LiveRoom";
import YunArtPlayer from "@/components/YunArtPlayer";
import {Link} from "@element-plus/icons-vue";

export default {
  name: "LiveRoom",
  components: {YunArtPlayer, Link},
  props: ['userInfo'],
  data() {
    return {
      isBottom: true,
      danmakuSupport: true,
      followed: false,
      platform: null,
      roomId: null,
      roomInfo: {},
      danmakuList: [],
      danmakuStyle: {
        fontSize: 50,
        color: "#ffffff",
        textShadow: true,
        opacity: 100,
        fontWeight: 50,
      },
      danmakuSpeed: 20,
      danmakuNum: 100,
      danmakuArea: 100
    }
  },
  created() {
    this.listenerFunc()
  },
  mounted() {
    this.init()
  },
  watch: {
    '$route'(to, from) {
      // 监听路由是否变化
      if (to.query.rid !== from.query.rid) {
        this.$router.go(0)
      }
    }
  },
  computed: {
    getColor() {
      return '#9b9696'
    }
  },
  methods: {
    init() {
      this.platform = this.$route.query.p
      this.roomId = this.$route.query.rid
      if (localStorage.getItem("danmakuStyle")) {
        this.danmakuStyle = JSON.parse(localStorage.getItem("danmakuStyle"))
      }
      if (localStorage.getItem("danmakuSpeed")) {
        this.danmakuStyle = Number(localStorage.getItem("danmakuSpeed"))
      }
      if (localStorage.getItem("danmakuArea")) {
        this.danmakuStyle = Number(localStorage.getItem("danmakuArea"))
      }
      getRoomInfo(123, this.platform, this.roomId)
          .then(resp => {
            if (resp.data.code === 200) {
              this.roomInfo = resp.data.data
              this.roomId = resp.data.data.roomId
              this.followed = resp.data.data.isFollowed === 1
            }
          })
    },
    toBottom() {
      let _this = this
      _this.$nextTick(() => {
        let container = document.getElementsByClassName("room-right-body")[0]
        container.scrollTop = container.scrollHeight
      })
      this.isBottom = true
    },
    getPlatform(platform) {
      switch (platform) {
        case 'bilibili':
          return '哔哩哔哩'
        case 'douyu':
          return '斗鱼'
        case 'huya':
          return '虎牙'
        case 'cc':
          return '网易CC'
        case 'egame':
          return '企鹅电竞'
      }
    },
    isLive() {
      return this.roomInfo.isLive === '1'
    },
    listenerFunc() {
      document.addEventListener('scroll', this.handleScroll, true)
    },
    handleScroll() {
      let target = document.getElementsByClassName("room-right-body")[0]
      this.isBottom = (target.scrollHeight - target.clientHeight) - target.scrollTop <= 10;
    },
    newDanmakuSend(newDanmaku) {
      let _this = this
      if (_this.danmakuList.length >= 200) {
        this.danmakuList.splice(0, 100)
      }
      this.danmakuList.push(newDanmaku)
      _this.$nextTick(() => {
        if (this.isBottom) {
          let container = document.getElementsByClassName("room-right-body")[0]
          container.scrollTop = container.scrollHeight
        }
      })
    },
    notSupport() {
      this.danmakuSupport = false
    },
    getPreList(picUrl) {
      return [picUrl]
    },
    getUrl() {
      if (this.platform === 'bilibili') {
        return 'https://live.bilibili.com/' + this.roomId
      }
    }
  },
  beforeUnmount() {
    document.removeEventListener('scroll', this.handleScroll, true)
    console.log('销毁LiveRoom')
  }
}
</script>

<style scoped>
.room-main-container {
  height: 100%;
  width: 100%;
}

.room-left {
  position: relative;
  width: 82%;
  height: 100%;
}

.room-left-video {
  position: absolute;
  width: 100%;
  background-color: black;
  bottom: 80px;
  top: 0;
  left: 0;
}

.room-left-video-notLive {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 80px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: justify;
  font-weight: bolder;
  font-size: 25px;
  color: #939495;
  background-color: black;
}

.room-left-video-play {
  width: 100%;
  height: 100%;
}

.room-left-info {
  width: 100%;
  height: 80px;
  position: absolute;
  bottom: 0;
  left: 0;
}

.left-info-head {
  float: left;
  margin-top: 9px;
  margin-left: 8px;
  width: 60px;
  height: 60px;
  box-shadow: #2b2b2b 0 0 5px 1px;
  border-radius: 10px;
}

.left-info-profile {
  float: left;
  margin-left: 10px;
  margin-top: 8px;
}

.left-info-profile-name {
  font-weight: bold;
  font-size: 20px;
}

.left-info-profile-owner {
  margin-top: 10px;
  font-weight: bold;
  font-size: 15px;
}

.info-live {
  margin-top: 5px;
  margin-left: 8px;
  float: right;
  height: 18px;
  width: 45px;
  background-color: #c10f0f;
  border-radius: 10px;
  font-size: 5px;
  font-weight: 600;
  text-align: center;
  color: #F3F6F8;
}

.info-notLive {
  margin-top: 5px;
  margin-left: 8px;
  float: left;
  height: 18px;
  width: 45px;
  background-color: #979797;
  border-radius: 10px;
  font-size: 5px;
  font-weight: 600;
  text-align: center;
  color: #F3F6F8;
}

.left-info-right {
  float: right;
  margin-top: 8px;
  margin-right: 10px;
  font-size: 35px;
}

.room-right {
  position: fixed;
  width: 18%;
  height: 92%;
  top: 50px;
  right: 0;
  border-left: 1px solid #c8c8c9;
}

.room-right-top {
  width: 100%;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: justify;
  font-weight: bold;
  font-size: 20px;
  border-bottom: 1px solid #c8c8c9;
}

.room-right-body {
  overflow-x: hidden;
  overflow-y: auto;
  width: 100%;
  position: absolute;
  top: 40px;
}

.to-bottom {
  cursor: pointer;
  background-color: #4e4c4c;
}

.show-danmaku {
  margin-top: 10px;
  margin-left: 20px;
  font-size: 15px;
  width: 94%;
}

.danmaku-name {
  float: left;
  font-weight: bold;
}

.danmaku-msg {
  margin-left: 5px;
  font-weight: normal;
  white-space: pre-wrap;
  word-wrap: break-word;
  overflow: hidden;
}

.not-support {
  margin-top: 20px;
  font-weight: normal;
  text-align: center;
}

.right-link {
  float: right;
  margin-top: 10px;
  margin-right: 25px;
  transition: all 0.2s;
}
</style>
