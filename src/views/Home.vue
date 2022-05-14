<template>
  <el-container style="height: 100%; width: 100%">
    <el-header class="home-header" style="height: 50px">
      <div class="home-header-search-bar">
        <div class="logo" @click="toHome()">YunLive</div>
        <div v-if="showSearch">
          <el-input
              class="header-search"
              placeholder="搜索主播"
              v-model="searchInput"
              @keydown.enter="submitKeyword()">
          </el-input>
          <el-button class="search-btn" @click="submitKeyword()">
            <el-icon style="vertical-align: middle">
              <Search/>
            </el-icon>
          </el-button>
        </div>
        <div class="top-follow">
          <div class="top-follow-font">关注</div>
          <el-dropdown trigger="click" placement="bottom-end" @visible-change="refreshRoomList()">
            <template v-slot:dropdown>
              <el-dropdown-menu class="top-follow-menu">
                <el-dropdown-item v-if="showFollowLoading" v-loading="topFollowLoading" style="height: 80px"/>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
        <div class="user-info">
          <div v-if="isLogin">
            <el-dropdown @command="handleCommand">
              <div class="el-dropdown-link">
                {{ userInfo.nickname }}<i class="el-icon-arrow-down el-icon--right"/>
              </div>
              <template v-slot:dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item command="changeInfo">信息修改</el-dropdown-item>
                  <el-dropdown-item command="changePwd">信息修改</el-dropdown-item>
                  <el-dropdown-item command="logout" divided>信息修改</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
          <div v-else class="to-login" @click="login()">登录</div>
        </div>
      </div>
    </el-header>
    <router-view v-slot="{ Component }" @existSearch="existSearch" @inSearch="!existSearch"
                 :isLogin="isLogin" :userInfo="userInfo">
      <keep-alive>
        <component :is="Component"/>
      </keep-alive>
    </router-view>
  </el-container>
</template>

<script>
import {Search} from "@element-plus/icons-vue";

export default {
  name: 'Home',
  components: {Search},
  data() {
    return {
      showSearch: true,
      showFollowLoading: false,
      topFollowLoading: true,
      isLogin: false,
      searchInput: '',
      roomListOn: [],
      userInfo: {}
    }
  },
  methods: {
    toHome() {
      this.$router.push('/home/nav/rec')
    },
    submitKeyword() {
      // todo 搜索关键字
    },
    refreshRoomList() {
      this.roomListOn = []
      // todo 获取直播间列表
    },
    login() {

    },
    handleCommand(command) {
      if (command === 'changeInfo') {
        // 更改用户信息
      } else if (command === 'changePwd') {
        // 更改密码
      } else if (command === 'logout') {
        // 注销登录
      }
    },
    existSearch() {
      this.showSearch = true
    }
  }
}
</script>

<style scoped>
.home-header {
  width: 100%;;
  box-shadow: 0 5px 5px -5px #4e4c4c;
}

.home-header-search-bar {
  position: relative;
  width: 100%;
  height: 100%;
}

.logo {
  position: absolute;
  cursor: pointer;
  top: 5px;
  left: 10px;
  font-weight: bold;
  font-size: 30px;
}

.header-search {
  width: 250px;
  margin-left: 40%;
  margin-top: 9px;
}

.search-btn {
  margin-left: 5px;
}

.top-follow {
  position: absolute;
  top: 12px;
  right: 120px;
  transition: all 0.1s;
}

.top-follow:hover {
  cursor: pointer;
  transform: scale(1.2);
}

.top-follow-font {
  font-size: 18px;
  font-weight: 600;
}

.top-follow-menu {
  overflow: auto;
  max-height: 600px;
  width: 250px;
}

.user-info {
  position: absolute;
  top: 12px;
  right: 50px;
}

.to-login {
  cursor: pointer;
  font-size: 18px;
  font-weight: 600;
  transition: all 0.1s;
}

.to-login:hover {
  transform: scale(1.2);
}

.el-dropdown-link {
  cursor: pointer;
  max-width: 150px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  font-size: 18px;
  font-weight: 600;
  transition: all 0.2s;
}

</style>
