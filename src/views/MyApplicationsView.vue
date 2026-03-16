<template>
  <div class="min-h-screen bg-gray-50">
    <!-- 顶部导航 -->
    <div class="bg-white px-4 py-3 flex items-center gap-3 sticky top-0 z-10 border-b border-gray-100">
      <span class="text-2xl text-gray-600 cursor-pointer" @click="$router.back()">&#8249;</span>
      <h1 class="text-lg font-semibold text-gray-800">我的投递</h1>
    </div>

    <!-- 投递列表 -->
    <div class="p-4">
      <div v-if="applications.length === 0" class="text-center py-12">
        <div class="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg class="w-10 h-10 text-gray-400" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
          </svg>
        </div>
        <p class="text-gray-500 text-sm mb-4">暂无投递记录</p>
        <button 
          class="px-6 py-2 bg-primary text-white text-sm rounded-full"
          @click="$router.push('/jobs')"
        >
          去投递
        </button>
      </div>

      <div v-else class="flex flex-col gap-3">
        <div 
          v-for="app in applications" 
          :key="app.jobId"
          class="bg-white rounded-xl p-4"
        >
          <div class="flex justify-between items-start mb-2">
            <h4 class="text-base font-semibold text-gray-800">{{ app.jobTitle }}</h4>
            <span 
              class="text-xs px-2 py-1 rounded-full"
              :class="getStatusClass(app.status)"
            >
              {{ getStatusText(app.status) }}
            </span>
          </div>
          <p class="text-sm text-gray-500">{{ app.company }}</p>
          <p class="text-sm text-primary font-medium mt-1">{{ app.salary }}</p>
          <div class="flex justify-between items-center mt-3 pt-3 border-t border-gray-100">
            <span class="text-xs text-gray-400">投递时间：{{ app.time }}</span>
            <button 
              v-if="app.status === 'pending'"
              class="text-xs text-gray-500 px-3 py-1.5 bg-gray-100 rounded-full"
            >
              查看详情
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useUserStore } from '../store'

const userStore = useUserStore()

const applications = computed(() => userStore.applications)

function getStatusClass(status) {
  const classes = {
    pending: 'bg-yellow-50 text-yellow-600',
    success: 'bg-green-50 text-green-600',
    rejected: 'bg-red-50 text-red-600'
  }
  return classes[status] || 'bg-gray-100 text-gray-600'
}

function getStatusText(status) {
  const texts = {
    pending: '待处理',
    success: '已通过',
    rejected: '已拒绝'
  }
  return texts[status] || '未知'
}
</script>
