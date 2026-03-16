<template>
  <div class="min-h-screen bg-gray-50">
    <!-- 顶部导航 -->
    <div class="bg-white px-4 py-3 flex items-center gap-3 sticky top-0 z-10 border-b border-gray-100">
      <span class="text-2xl text-gray-600 cursor-pointer" @click="$router.back()">&#8249;</span>
      <h1 class="text-lg font-semibold text-gray-800">我的学习</h1>
    </div>

    <!-- 统计卡片 -->
    <div class="p-4">
      <div class="bg-white rounded-xl p-4 flex items-center justify-around">
        <div class="text-center">
          <p class="text-xl font-bold text-gray-800">{{ watchedVideos.length }}</p>
          <p class="text-xs text-gray-500 mt-1">视频课程</p>
        </div>
        <div class="w-px h-10 bg-gray-100"></div>
        <div class="text-center">
          <p class="text-xl font-bold text-gray-800">{{ readArticles.length }}</p>
          <p class="text-xs text-gray-500 mt-1">图文课程</p>
        </div>
        <div class="w-px h-10 bg-gray-100"></div>
        <div class="text-center">
          <p class="text-xl font-bold text-gray-800">{{ totalHours }}h</p>
          <p class="text-xs text-gray-500 mt-1">学习时长</p>
        </div>
      </div>
    </div>

    <!-- 标签切换 -->
    <div class="px-4">
      <div class="bg-white rounded-xl p-1.5 flex mb-4">
        <button 
          class="flex-1 py-2 rounded-lg text-sm font-medium transition-all"
          :class="activeTab === 'video' ? 'bg-primary text-white' : 'text-gray-600'"
          @click="activeTab = 'video'"
        >
          视频课程
        </button>
        <button 
          class="flex-1 py-2 rounded-lg text-sm font-medium transition-all"
          :class="activeTab === 'article' ? 'bg-primary text-white' : 'text-gray-600'"
          @click="activeTab = 'article'"
        >
          图文课程
        </button>
      </div>
    </div>

    <!-- 视频列表 -->
    <div v-if="activeTab === 'video'" class="px-4">
      <div v-if="watchedVideos.length === 0" class="text-center py-8 text-gray-400">
        <p class="text-sm">暂无观看记录</p>
      </div>
      <div v-else class="flex flex-col gap-3">
        <div 
          v-for="(video, index) in watchedVideos" 
          :key="index"
          class="bg-white rounded-xl p-4"
        >
          <div class="flex gap-3">
            <div class="w-24 h-16 rounded-lg bg-gradient-to-br from-primary to-primary-light flex items-center justify-center flex-shrink-0">
              <svg class="w-8 h-8 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7z"/>
              </svg>
            </div>
            <div class="flex-1">
              <h4 class="text-sm font-semibold text-gray-800">{{ video.title }}</h4>
              <p class="text-xs text-gray-500 mt-1">观看至 {{ video.progress }}</p>
              <p class="text-xs text-gray-400 mt-1">{{ video.time }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 图文列表 -->
    <div v-else class="px-4">
      <div v-if="readArticles.length === 0" class="text-center py-8 text-gray-400">
        <p class="text-sm">暂无阅读记录</p>
      </div>
      <div v-else class="flex flex-col gap-3">
        <div 
          v-for="(article, index) in readArticles" 
          :key="index"
          class="bg-white rounded-xl p-4"
        >
          <h4 class="text-sm font-semibold text-gray-800">{{ article.title }}</h4>
          <p class="text-xs text-gray-400 mt-2">{{ article.time }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const activeTab = ref('video')
const totalHours = ref(12.5)

const watchedVideos = ref([
  { title: '面试自我介绍技巧', progress: '08:25', time: '2024-03-15 14:30' },
  { title: '电商客服沟通技巧', progress: '15:20', time: '2024-03-14 10:15' },
  { title: '克服求职焦虑心理', progress: '05:10', time: '2024-03-13 16:45' }
])

const readArticles = ref([
  { title: '残疾人简历撰写指南：如何突出你的优势', time: '2024-03-15 09:20' },
  { title: '职场礼仪：给人留下良好的第一印象', time: '2024-03-14 15:30' }
])
</script>
