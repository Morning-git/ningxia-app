<template>
  <div class="h-full flex flex-col bg-gray-100 max-w-full mx-auto relative overflow-hidden ios-container">
    <!-- iOS状态栏 -->
    <StatusBar />
    
    <!-- 主内容区 -->
    <main class="flex-1 overflow-y-auto">
      <router-view v-slot="{ Component }">
        <keep-alive>
          <component :is="Component" />
        </keep-alive>
      </router-view>
    </main>
    
    <!-- 底部导航栏（含安全区，白底贯通到底） -->
    <TabBar v-if="showTabBar" />
    
    <!-- 非 TabBar 页面的 iOS 安全区占位 -->
    <div v-if="!showTabBar" class="ios-home-indicator"></div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import StatusBar from './components/common/StatusBar.vue'
import TabBar from './components/common/TabBar.vue'

const route = useRoute()

const showTabBar = computed(() => {
  const path = route.path
  const showRoutes = ['/', '/jobs', '/message', '/training', '/profile']
  return showRoutes.includes(path)
})
</script>

<style scoped>
.ios-container {
  min-height: 100vh;
  min-height: -webkit-fill-available;
}

.ios-home-indicator {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: env(safe-area-inset-bottom, 0px);
  min-height: env(safe-area-inset-bottom, 0px);
  background: transparent;
  z-index: 40;
  pointer-events: none;
}

main {
  padding-bottom: env(safe-area-inset-bottom);
}
</style>
