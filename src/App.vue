<template>
  <div id = "app">
    <transition>
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </transition>
  </div>
</template>

<style>
html,body,#app {
  width: 100%;
  height: 100%;
  background-color: #F3F6F8;
  margin: 0;
  padding: 0;
}
</style>
