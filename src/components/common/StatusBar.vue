<template>
  <div 
    class="px-4 flex items-center justify-between bg-white text-sm font-semibold text-gray-800 border-b border-gray-100"
    :style="{ paddingTop: `calc(${safeAreaTop}px + 8px)`, height: `calc(${safeAreaTop}px + 44px)` }"
  >
    <div class="font-medium text-[15px]">{{ currentTime }}</div>
    <div class="flex items-center gap-1 -translate-y-1">
      <!-- 手机信号 -->
      <div class="flex gap-[1.5px] items-end h-3">
        <div class="w-[3px] bg-black rounded-full" :style="{ height: '4px' }"></div>
        <div class="w-[3px] bg-black rounded-full" :style="{ height: '6px' }"></div>
        <div class="w-[3px] bg-black rounded-full" :style="{ height: '8px' }"></div>
        <div class="w-[3px] bg-black rounded-full" :style="{ height: '10px' }"></div>
      </div>
      <!-- WiFi -->
      <svg class="w-7 h-5 ml-1.5" viewBox="0 0 24 24" fill="none">
        <path d="M5 12.55a11 11 0 0114 0M8.53 16.11a6 6 0 016.95 0M12 20h.01" stroke="#000" stroke-linecap="round" stroke-width="2" fill="none"/>
      </svg>
      <!-- 电池 -->
      <svg class="w-5 h-3 ml-1.5" viewBox="0 0 24 14" fill="none">
        <rect x="1" y="3" width="18" height="8" rx="2" stroke="#000" stroke-width="1.5" fill="none"/>
        <rect x="3" y="5" width="12" height="4" rx="1" fill="#000"/>
        <path d="M20 6v2" stroke="#000" stroke-width="1.5" stroke-linecap="round"/>
      </svg>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const currentTime = ref('')
const safeAreaTop = ref(0)

function updateTime() {
  const now = new Date()
  const hours = now.getHours()
  const minutes = now.getMinutes()
  currentTime.value = hours + ':' + (minutes < 10 ? '0' : '') + minutes
}

function getSafeArea() {
  const cssVar = getComputedStyle(document.documentElement).getPropertyValue('--sat')
  if (cssVar) {
    safeAreaTop.value = parseInt(cssVar) || 0
  } else {
    safeAreaTop.value = Number(window?.visualViewport?.offsetTop) || 47
  }
}

onMounted(() => {
  updateTime()
  getSafeArea()
  
  const timer = setInterval(updateTime, 1000)
  
  if (window) {
    window.addEventListener('resize', getSafeArea)
  }
  
  return () => {
    clearInterval(timer)
    if (window) {
      window.removeEventListener('resize', getSafeArea)
    }
  }
})

onUnmounted(() => {
  clearInterval(timer)
})
</script>
