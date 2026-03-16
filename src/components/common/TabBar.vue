<template>
  <div class="fixed bottom-0 left-0 right-0 w-full bg-white border-t border-gray-100 flex justify-around py-2 z-50 ios-tab-bar">
    <div 
      v-for="tab in tabs" 
      :key="tab.path"
      class="flex flex-col items-center gap-0.5 cursor-pointer flex-1"
      :class="{ 'text-primary': isActive(tab.path) }"
      @click="navigate(tab.path)"
    >
      <div class="w-7 h-7 flex items-center justify-center">
        <!-- 首页 -->
        <svg v-if="tab.path === '/'" class="w-6 h-6" viewBox="0 0 24 24" :fill="isActive(tab.path) ? 'currentColor' : 'none'" :stroke="isActive(tab.path) ? 'none' : 'currentColor'" stroke-width="2">
          <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
          <polyline points="9 22 9 12 15 12 15 22" :stroke="isActive(tab.path) ? 'none' : 'currentColor'" stroke-width="2"/>
        </svg>
        <!-- 工作 -->
        <svg v-else-if="tab.path === '/jobs'" class="w-6 h-6" viewBox="0 0 24 24" :fill="isActive(tab.path) ? 'currentColor' : 'none'" :stroke="isActive(tab.path) ? 'none' : 'currentColor'" stroke-width="2">
          <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
          <path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16"/>
        </svg>
        <!-- 消息 -->
        <svg v-else-if="tab.path === '/message'" class="w-6 h-6" viewBox="0 0 24 24" :fill="isActive(tab.path) ? 'currentColor' : 'none'" :stroke="isActive(tab.path) ? 'none' : 'currentColor'" stroke-width="2">
          <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
        </svg>
        <!-- 培训 -->
        <svg v-else-if="tab.path === '/training'" class="w-6 h-6" viewBox="0 0 24 24" :fill="isActive(tab.path) ? 'currentColor' : 'none'" :stroke="isActive(tab.path) ? 'none' : 'currentColor'" stroke-width="2">
          <path d="M4 19.5A2.5 2.5 0 016.5 17H20"/>
          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/>
        </svg>
        <!-- 我的 -->
        <svg v-else-if="tab.path === '/profile'" class="w-6 h-6" viewBox="0 0 24 24" :fill="isActive(tab.path) ? 'currentColor' : 'none'" :stroke="isActive(tab.path) ? 'none' : 'currentColor'" stroke-width="2">
          <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/>
          <circle cx="12" cy="7" r="4"/>
        </svg>
      </div>
      <span class="text-[10px] font-medium" :class="isActive(tab.path) ? 'text-primary' : 'text-gray-500'">{{ tab.name }}</span>
    </div>
  </div>
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

const tabs = [
  { name: '首页', path: '/' },
  { name: '工作', path: '/jobs' },
  { name: '消息', path: '/message' },
  { name: '培训', path: '/training' },
  { name: '我的', path: '/profile' }
]

function isActive(path) {
  return route.path === path
}

function navigate(path) {
  router.push(path)
}

</script>

<style scoped>
.ios-tab-bar {
  /* 底栏贯通至屏幕最底部：安全区用 padding 撑开，白底铺满到底 */
  padding-bottom: max(env(safe-area-inset-bottom), 20px);
  min-height: 56px;
  box-sizing: border-box;
}
</style>
