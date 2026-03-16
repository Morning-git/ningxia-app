<template>
  <div class="pb-20 bg-gray-50 min-h-screen">
    <!-- 用户信息头部 -->
    <div class="bg-gradient-to-br from-primary to-primary-light px-4 pt-8 pb-6">
      <div class="flex items-center gap-4">
        <!-- 头像 -->
        <div class="relative">
          <div class="w-18 h-18 rounded-full bg-white/20 flex items-center justify-center w-16 h-16">
            <svg class="w-10 h-10 text-white" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
            </svg>
          </div>
          <div v-if="userStore.isLoggedIn" class="absolute -bottom-1 -right-1 w-5 h-5 bg-green-400 rounded-full border-2 border-white flex items-center justify-center">
            <svg class="w-3 h-3 text-white" viewBox="0 0 24 24" fill="currentColor">
              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
            </svg>
          </div>
        </div>
        
        <!-- 用户信息 -->
        <div class="flex-1">
          <div v-if="userStore.isLoggedIn">
            <h3 class="text-lg font-bold text-white mb-1">{{ userStore.currentUser?.name }}</h3>
            <p class="text-sm text-white/80">{{ userStore.currentUser?.phone }}</p>
            <div v-if="userStore.currentUser?.disabilityType" class="flex items-center gap-1 mt-2">
              <span class="px-2 py-0.5 bg-white/20 text-white text-xs rounded-full">
                {{ userStore.currentUser.disabilityType }}
                <span v-if="userStore.currentUser.disabilityLevel">{{ getDisabilityLevelLabel(userStore.currentUser.disabilityLevel) }}</span>
              </span>
            </div>
          </div>
          <div v-else>
            <h3 class="text-lg font-bold text-white mb-1">未登录</h3>
            <p class="text-sm text-white/80 mb-3">登录后享受更多就业服务</p>
            <button 
              class="px-4 py-1.5 bg-white text-primary text-sm rounded-full font-medium"
              @click="router.push('/login')"
            >
              立即登录
            </button>
          </div>
        </div>

        <!-- 设置图标 -->
        <div 
          v-if="userStore.isLoggedIn"
          class="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center cursor-pointer"
          @click="router.push('/help-center')"
        >
          <svg class="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
            <path d="M11 18h2v-2h-2v2zm1-16C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-2.21 0-4 1.79-4 4h2c0-1.1.9-2 2-2s2 .9 2 2c0 2-3 1.75-3 5h2c0-2.25 3-2.5 3-5 0-2.21-1.79-4-4-4z"/>
          </svg>
        </div>
      </div>
    </div>

    <!-- 数据统计卡片（登录后显示） -->
    <div v-if="userStore.isLoggedIn" class="px-4 -mt-3">
      <div class="bg-white rounded-xl p-4 shadow-sm">
        <div class="flex items-center justify-around">
          <div class="flex-1 text-center cursor-pointer" @click="goToPage('/my-applications')">
            <p class="text-xl font-bold text-gray-800">{{ userStore.applications.length }}</p>
            <p class="text-xs text-gray-500 mt-1">我的投递</p>
          </div>
          <div class="w-px h-10 bg-gray-100"></div>
          <div class="flex-1 text-center cursor-pointer" @click="goToPage('/my-collections')">
            <p class="text-xl font-bold text-gray-800">{{ userStore.collections.length }}</p>
            <p class="text-xs text-gray-500 mt-1">我的收藏</p>
          </div>
          <div class="w-px h-10 bg-gray-100"></div>
          <div class="flex-1 text-center cursor-pointer" @click="goToPage('/my-learning')">
            <p class="text-xl font-bold text-gray-800">{{ trainingHours }}h</p>
            <p class="text-xs text-gray-500 mt-1">我的学习</p>
          </div>
          <div class="w-px h-10 bg-gray-100"></div>
          <div class="flex-1 text-center cursor-pointer" @click="goToPage('/my-demands')">
            <p class="text-xl font-bold text-gray-800">{{ userStore.demands.length }}</p>
            <p class="text-xs text-gray-500 mt-1">需求记录</p>
          </div>
        </div>
      </div>
    </div>

    <!-- 功能列表 -->
    <div class="px-4 mt-4">
      <div class="bg-white rounded-xl overflow-hidden">
        <!-- 我的简历 -->
        <div 
          class="flex items-center gap-3 px-4 py-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50"
          @click="goToPage('/resume')"
        >
          <div class="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center">
            <svg class="w-5 h-5 text-green-500" viewBox="0 0 24 24" fill="currentColor">
              <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/>
            </svg>
          </div>
          <div class="flex-1">
            <p class="text-sm text-gray-800">我的简历</p>
            <p class="text-xs text-gray-400 mt-0.5">查看和编辑简历信息</p>
          </div>
          <span class="text-gray-300 text-lg">›</span>
        </div>

        <!-- 求职意向 -->
        <div 
          class="flex items-center gap-3 px-4 py-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50"
          @click="goToPage('/job-intention')"
        >
          <div class="w-10 h-10 rounded-lg bg-purple-50 flex items-center justify-center">
            <svg class="w-5 h-5 text-purple-500" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
          </div>
          <div class="flex-1">
            <p class="text-sm text-gray-800">求职意向</p>
            <p class="text-xs text-gray-400 mt-0.5">{{ jobIntentionText }}</p>
          </div>
          <span class="text-gray-300 text-lg">›</span>
        </div>

        <!-- 残疾证管理 -->
        <div 
          class="flex items-center gap-3 px-4 py-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50"
          @click="goToPage('/disability-card')"
        >
          <div class="w-10 h-10 rounded-lg bg-pink-50 flex items-center justify-center">
            <svg class="w-5 h-5 text-pink-500" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17 3H7c-1.1 0-2 .9-2 2v16l7-3 7 3V5c0-1.1-.9-2-2-2z"/>
            </svg>
          </div>
          <div class="flex-1">
            <p class="text-sm text-gray-800">残疾证管理</p>
            <p class="text-xs text-gray-400 mt-0.5">{{ disabilityCardText }}</p>
          </div>
          <div class="flex items-center gap-2">
            <span v-if="!userStore.currentUser?.hasDisabilityCard" class="px-2 py-0.5 bg-orange-50 text-orange-600 text-[10px] rounded">未绑定</span>
            <span class="text-gray-300 text-lg">›</span>
          </div>
        </div>

        <!-- 我的投递 -->
        <div 
          class="flex items-center gap-3 px-4 py-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50"
          @click="goToPage('/my-applications')"
        >
          <div class="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
            <svg class="w-5 h-5 text-blue-500" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
            </svg>
          </div>
          <div class="flex-1">
            <p class="text-sm text-gray-800">我的投递</p>
            <p class="text-xs text-gray-400 mt-0.5">查看投递进度</p>
          </div>
          <div class="flex items-center gap-2">
            <span v-if="userStore.applications.length > 0" class="text-xs text-gray-400">{{ userStore.applications.length }}个</span>
            <span class="text-gray-300 text-lg">›</span>
          </div>
        </div>

        <!-- 我的收藏 -->
        <div 
          class="flex items-center gap-3 px-4 py-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50"
          @click="goToPage('/my-collections')"
        >
          <div class="w-10 h-10 rounded-lg bg-red-50 flex items-center justify-center">
            <svg class="w-5 h-5 text-red-500" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
          </div>
          <div class="flex-1">
            <p class="text-sm text-gray-800">我的收藏</p>
            <p class="text-xs text-gray-400 mt-0.5">收藏的职位</p>
          </div>
          <div class="flex items-center gap-2">
            <span v-if="userStore.collections.length > 0" class="text-xs text-gray-400">{{ userStore.collections.length }}个</span>
            <span class="text-gray-300 text-lg">›</span>
          </div>
        </div>

        <!-- 我的学习 -->
        <div 
          class="flex items-center gap-3 px-4 py-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50"
          @click="goToPage('/my-learning')"
        >
          <div class="w-10 h-10 rounded-lg bg-cyan-50 flex items-center justify-center">
            <svg class="w-5 h-5 text-cyan-500" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72L12 15l5-2.73v3.72z"/>
            </svg>
          </div>
          <div class="flex-1">
            <p class="text-sm text-gray-800">我的学习</p>
            <p class="text-xs text-gray-400 mt-0.5">看过的视频和图文</p>
          </div>
          <span class="text-gray-300 text-lg">›</span>
        </div>

        <!-- 浏览记录 -->
        <div 
          class="flex items-center gap-3 px-4 py-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50"
          @click="goToPage('/browsing-history')"
        >
          <div class="w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center">
            <svg class="w-5 h-5 text-gray-500" viewBox="0 0 24 24" fill="currentColor">
              <path d="M13 3c-4.97 0-9 4.03-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42C8.27 19.99 10.51 21 13 21c4.97 0 9-4.03 9-9s-4.03-9-9-9zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8H12z"/>
            </svg>
          </div>
          <div class="flex-1">
            <p class="text-sm text-gray-800">浏览记录</p>
            <p class="text-xs text-gray-400 mt-0.5">最近看过的职位</p>
          </div>
          <span class="text-gray-300 text-lg">›</span>
        </div>

        <!-- 需求记录 -->
        <div 
          class="flex items-center gap-3 px-4 py-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50"
          @click="goToPage('/my-demands')"
        >
          <div class="w-10 h-10 rounded-lg bg-yellow-50 flex items-center justify-center">
            <svg class="w-5 h-5 text-yellow-500" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm2 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
            </svg>
          </div>
          <div class="flex-1">
            <p class="text-sm text-gray-800">需求记录</p>
            <p class="text-xs text-gray-400 mt-0.5">就业帮扶需求反馈</p>
          </div>
          <div class="flex items-center gap-2">
            <span v-if="userStore.demands.length > 0" class="text-xs text-gray-400">{{ userStore.demands.length }}个</span>
            <span class="text-gray-300 text-lg">›</span>
          </div>
        </div>

        <!-- 帮助中心 -->
        <div 
          class="flex items-center gap-3 px-4 py-4 cursor-pointer hover:bg-gray-50"
          @click="goToPage('/help-center')"
        >
          <div class="w-10 h-10 rounded-lg bg-indigo-50 flex items-center justify-center">
            <svg class="w-5 h-5 text-indigo-500" viewBox="0 0 24 24" fill="currentColor">
              <path d="M11 18h2v-2h-2v2zm1-16C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-2.21 0-4 1.79-4 4h2c0-1.1.9-2 2-2s2 .9 2 2c0 2-3 1.75-3 5h2c0-2.25 3-2.5 3-5 0-2.21-1.79-4-4-4z"/>
            </svg>
          </div>
          <div class="flex-1">
            <p class="text-sm text-gray-800">帮助中心</p>
            <p class="text-xs text-gray-400 mt-0.5">常见问题与客服</p>
          </div>
          <span class="text-gray-300 text-lg">›</span>
        </div>
      </div>
    </div>

    <!-- 退出登录（登录后显示） -->
    <div v-if="userStore.isLoggedIn" class="px-4 mt-6 mb-4">
      <button 
        class="w-full py-3.5 bg-white text-red-500 rounded-xl text-sm font-medium shadow-sm"
        @click="handleLogout"
      >
        退出登录
      </button>
    </div>

    <!-- 版本号 -->
    <div class="text-center py-4">
      <p class="text-xs text-gray-400">宁夏残疾人就业服务平台 v1.0.0</p>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '../store'
import { disabilityLevels } from '../data/mock'

const router = useRouter()
const userStore = useUserStore()

const trainingHours = 12.5

const jobIntentionText = computed(() => {
  if (userStore.jobIntention.length === 0) return '未设置'
  return userStore.jobIntention.slice(0, 3).join('、') + (userStore.jobIntention.length > 3 ? '等' : '')
})

const disabilityCardText = computed(() => {
  if (userStore.currentUser?.hasDisabilityCard) {
    return `${userStore.currentUser.disabilityType} ${getDisabilityLevelLabel(userStore.currentUser.disabilityLevel)}`
  }
  return '未绑定残疾证'
})

function getDisabilityLevelLabel(value) {
  const level = disabilityLevels.find(l => l.value === value)
  return level ? level.label : ''
}

function goToPage(path) {
  if (!userStore.isLoggedIn) {
    router.push('/login')
    return
  }
  router.push(path)
}

function handleLogout() {
  if (confirm('确定要退出登录吗？')) {
    userStore.logout()
    alert('已退出登录')
  }
}
</script>
