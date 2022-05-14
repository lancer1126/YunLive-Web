<template>
  <div id="app">
    <router-view v-slot="{ Component }">
      <transition>
        <keep-alive>
          <component :is="Component" />
        </keep-alive>
      </transition>
    </router-view>
  </div>
</template>

<style>
html, body, #app {
  width: 100%;
  height: 100%;
  background-color: #F3F6F8;
  margin: 0;
  padding: 0;
}
</style>
