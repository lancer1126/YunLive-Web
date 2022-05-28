<template>
  <div id="player" class="yun-art-player"></div>
</template>

<script>
import {getRealUrl} from "@/api/LiveRoom";
import ArtPlayer from 'artplayer';
import Hls from 'hls.js';
import FlvJs from 'flv.js';
import Danmaku from 'danmaku';
import Global from "@/components/Global";

export default {
  name: 'YunArtPlayer',
  props: ['platform', 'roomId', 'isLive', 'danmakuStyle', 'danmakuSpeed', 'danmakuArea', 'danmakuNum'],
  data() {
    return {
      player: null,
      danmaku: null,
      danmakuNumStep: 0,
      quality: [],
      videoType: null,
      hls: null,
      flv: null,
      danmakuShow: true,
      eGameToken: '',
      huyaAyyuid: '',
      ws: null
    }
  },
  watch: {
    platform() {
      this.$nextTick(() => {
        this.init()
      })
    },
    danmakuSpeed() {
      if (this.danmaku) {
        this.danmaku.speed = (this.danmakuSpeed() + 20) / 100 * 300
      }
    },
    danmakuArea() {
      if (this.danmaku) {
        this.danmaku.clear
        document.getElementsByClassName("art-danmaku")[0].style.height = this.danmakuArea + "%"
        this.danmaku.resize
      }
    },
    danmakuNum() {
      this.danmakuNumStep = (100 - this.danmakuNum) / 10
    }
  },
  methods: {
    init() {
      let _this = this
      if (this.isLive) {
        getRealUrl(this.platform, this.roomId)
            .then(resp => {
              const hasOwn = Object.prototype.hasOwnProperty

              let data = resp.data.data
              if (hasOwn.call(data, 'token')) {
                this.eGameToken = data.token
              }
              if (hasOwn.call(data, 'ayyuid')) {
                this.huyaAyyuid = data.ayyuid
              }
              this.quality = this.initQuality(data)

              let art = this.initPlayer(_this)
              if (_this.videoType === 'customHls') {
                art.on('destroy', () => {
                  _this.hls.destroy()
                })
                art.on('switch', () => {
                  _this.hls.destroy()
                  art.play = true
                })
              } else if (_this.videoType === 'flv') {
                art.on('destroy', () => {
                  _this.flv.destroy()
                })
                art.on('switch', () => {
                  _this.flv.destroy()
                  art.play = true
                })
              }

              art.on('resize', () => {
                _this.danmaku.resize()
              })

              this.danmaku = new Danmaku({
                container: document.getElementsByClassName('art-danmaku')[0]
              })

              this.danmaku.speed = (this.danmakuSpeed + 25) / 100 * 200
              this.player = art
              if (this.platform === 'bilibili') {
                this.initBilibiliWs()
              } else {
                _this.$emit('notSupport')
              }
            })
      }
    },
    initQuality(data) {
      let tempQuality = []
      const hasOwn = Object.prototype.hasOwnProperty
      if (hasOwn.call(data, 'fd')) {
        tempQuality.push({name: '流畅', url: data.fd})
      }
      if (hasOwn.call(data, 'ld')) {
        tempQuality.push({name: '清晰', url: data.ld})
      }
      if (hasOwn.call(data, 'sd')) {
        tempQuality.push({name: '高清', url: data.sd})
      }
      if (hasOwn.call(data, 'hd')) {
        tempQuality.push({name: '超清', url: data.hd})
      }
      if (hasOwn.call(data, 'od')) {
        tempQuality.push({name: '原画', url: data.od})
      }
      return tempQuality
    },
    initPlayer(_this) {
      return new ArtPlayer({
        container: '.yun-art-player',
        autoplay: true,
        isLive: true,
        url: this.quality[this.quality.length - 1].url,
        type: this.videoType,
        autoSize: true, //固定视频比例
        autoMini: true, //自动小窗播放
        pip: true,  //画中画
        fullscreen: true, //全屏按钮
        aspectRatio: true,  //
        fullscreenWeb: true,  //网页全屏按钮
        backdrop: true,
        lang: 'zh-cn',  //
        quality: this.quality,
        customType: {
          customHls(video, url) {
            const hls = new Hls()
            hls.loadSource(url)
            hls.attachMedia(video)
            _this.hls = hls
          },
          flv(video, url) {
            const flvPlayer = FlvJs.createPlayer({
              type: 'flv',
              url: url
            })
            flvPlayer.attachMediaElement(video)
            flvPlayer.load()
            _this.flv = flvPlayer
          }
        },
        controls: {
          tooltip: '弹幕开关',
          position: 'right',
          html: '<i class="iconfont icon-danmukaiqi" style="font-size: 25px"></i>',
          click() {
            _this.danmakuShow = !_this.danmakuShow
            if (_this.danmakuShow) {
              document.getElementsByClassName("iconfont icon-danmuguanbi")[0]
                  .setAttribute("class", "iconfont icon-danmukaiqi")
            } else {
              document.getElementsByClassName("iconfont icon-danmukaiqi")[0]
                  .setAttribute("class", "iconfont icon-danmuguanbi");
              _this.danmaku.hide()
            }
          }
        }
      })
    },
    initBilibiliWs() {
      const ws = new WebSocket('wss://broadcastlv.chat.bilibili.com:2245/sub')
      this.ws = ws
      let _this = this
      ws.onopen = () => {
        let sendInfo = Global.encode(JSON.stringify({
          roomid: Number(_this.roomId)
        }), 7)
        ws.send(sendInfo)
      }
      this.interval = setInterval(() => {
        ws.send(Global.encode('', 2))
      }, 30000)
      ws.onmessage = async msgEvent => {
        const packet = await Global.decode(msgEvent.data)
        switch (packet.op) {
          case 8:
            console.log('获取直播间弹幕成功')
            break
          case 5:
            packet.body.forEach((body) => {
              if (body.cmd === 'DANMU_MSG') {
                _this.emitDanmaku(`${body.info[1]}`, `${body.info[2][1]}`)
              }
            })
        }
      }
    },
    emitDanmaku(text, from) {
      let _this = this
      let danmakuObj = {
        text: text,
        style: {
          fontSize: (this.danmakuStyle.fontSize / 100 * 40) + "px",
          color: this.danmakuStyle.color,
          textShadow: this.danmakuStyle.textShadow ? '-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000' : '',
          opacity: this.danmakuStyle.opacity / 100,
          fontWeight: this.weightChange(this.danmakuStyle.fontWeight),
        },
      }
      let newDanmaku = {
        fromName: from,
        msg: text
      }
      _this.emit('newDanmaku', newDanmaku)
      if (this.danmakuNumStep > 0) {
        this.danmakuNumStep--
      } else {
        this.danmaku.emit(danmakuObj)
        this.danmakuNumStep = (100 - this.danmakuNum) / 10
      }
    },
    weightChange(value) {
      switch (value) {
        case 0:
          return "lighter"
        case 50:
          return "normal"
        case 100:
          return "bolder"
      }
    }
  }
}
</script>

<style scoped>
.yun-art-player {
  width: 100%;
  height: 100%;
}
</style>
