<template>
  <div v-loading="loading" class="platform-room-container"
       element-loading-background="rgba(243, 246, 248, 0.8)">
    <div class="platform-room-name">{{ getPlatform(platform) }}</div>
    <div class="area-type">
      <div class="area-type-name" v-for="(areaGroup, index) in areaList" :key="index">
        <el-dropdown>
          <div :id="areaGroup.groupName" class="area-dropdown-link" @click="selectGroup(areaGroup)">
            {{ areaGroup.groupName }}
          </div>
          <template v-slot:dropdown>
            <el-dropdown-menu class="dropdown-menu">
              <el-dropdown-item v-for="(areaDetail, index) in areaGroup.areaList" :key="index"
                                @click="selectArea(areaDetail)">
                {{ areaDetail.areaName }}
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
    <div class="platform-room-list">
      <CoverRow ref="roomList" :cover-list="roomList"></CoverRow>
    </div>
  </div>
</template>

<script>
import {getAreas, getRecommendByPlatform, getRecByGroupArea} from "@/api/LiveRoom";
import CoverRow from "@/components/CoverRow";

export default {
  name: 'PlatformRoom',
  components: {CoverRow},
  data() {
    return {
      page: 1,
      querySize: 20,
      loading: false,
      platform: null,
      areaList: [],
      roomList: []
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      this.loading = true
      this.platform = this.$route.params.p
      getAreas(this.platform)
          .then(resp => {
            if (resp.data.code === 200) {
              this.areaList = resp.data.data
            }
          })
      getRecommendByPlatform(this.platform, this.page, this.querySize)
          .then(resp => {
            if (resp.data.code === 200) {
              this.roomList = resp.data.data
            }
            this.loading = false
          })
    },
    getPlatform(platForm) {
      switch (platForm) {
        case 'bilibili':
          return '哔哩哔哩'
        case 'douyu':
          return '斗鱼'
        case 'huya':
          return '虎牙'
      }
    },
    selectGroup(areaGroup) {
      this.loading = true
      this.roomList = []
      getRecByGroupArea(this.platform, areaGroup.groupId, null, 1, 20)
          .then(resp => {
            if (resp.data.code === 200) {
              this.roomList = resp.data.data
            }
            this.loading = false
          })
    },
    selectArea(areaDetail) {
      this.loading = true
      this.roomList = []
      getRecByGroupArea(this.platform, areaDetail.groupId, areaDetail.areaId, 1, 20)
          .then(resp => {
            if (resp.data.code === 200) {
              this.roomList = resp.data.data
            }
            this.loading = false
          })
    }
  }
}
</script>

<style scoped>
.platform-room-container {
  height: 100%;
  width: 100%;
  position: relative;
}

.platform-room-name {
  position: absolute;
  left: 250px;
  font-weight: bold;
  font-size: 40px;
}

.area-type {
  position: absolute;
  display: inline-block;
  left: 250px;
  top: 60px;
  right: 0;
  height: 25px;
  margin-top: 10px;
}

.area-type-name {
  font-weight: bold;
  cursor: pointer;
  float: left;
  margin-right: 20px;
  text-align: center;
}

.·area-dropdown-link {
  color: #000000;
  font-size: 17px;
  transition: all 0.1s;
}

.area-dropdown-link:hover {
  transform: scale(1.2);
}

.dropdown-menu {
  overflow: auto;
  max-height: 500px;
  background-color: #fbfdff;
  border: #8e8e8e;
}

.dropdown-menu::-webkit-scrollbar {
  width: 8px;
}

.dropdown-menu::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background: #8e8e8e;
}

.platform-room-list {
  position: absolute;
  bottom: 0;
  left: 10px;
  top: 78px;
  width: 100%;
}
</style>
