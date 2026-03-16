<template>
  <div class="pb-20">
    <!-- 标题栏 -->
    <div class="flex items-center gap-3 px-4 py-3 bg-white border-b border-gray-100 sticky top-0 z-10">
      <span class="text-2xl text-gray-800 cursor-pointer" @click="$router.back()">&#8249;</span>
      <h3 class="text-base font-semibold text-gray-800">企业详情</h3>
    </div>

    <div v-if="company">
      <!-- 企业头部 -->
      <div class="p-4 bg-white">
        <div class="flex items-center gap-4 mb-4">
          <div class="w-16 h-16 rounded-xl bg-gradient-to-br from-primary to-primary-light flex items-center justify-center text-white text-2xl font-bold">
            {{ company.name.charAt(0) }}
          </div>
          <div class="flex-1">
            <div class="flex items-center gap-2">
              <h2 class="text-lg font-semibold text-gray-800">{{ company.shortName }}</h2>
              <span v-if="company.verified" class="text-[10px] px-1.5 py-0.5 bg-blue-50 text-blue-500 rounded">认证</span>
            </div>
            <p class="text-xs text-gray-500 mt-1">{{ company.name }}</p>
          </div>
        </div>
        
        <!-- 标签 -->
        <div class="flex flex-wrap gap-2 mb-4">
          <span class="text-[12px] px-2 py-1 bg-gray-100 text-gray-600 rounded">{{ company.industry }}</span>
          <span class="text-[12px] px-2 py-1 bg-gray-100 text-gray-600 rounded">{{ company.scale }}</span>
        </div>
      </div>

      <!-- 企业简介 -->
      <div class="mt-2 p-4 bg-white">
        <h4 class="text-sm font-semibold text-gray-800 mb-2 pl-3 border-l-2 border-primary">企业简介</h4>
        <p class="text-sm text-gray-600 leading-relaxed">{{ company.intro }}</p>
      </div>

      <!-- 基本信息 -->
      <div class="mt-2 p-4 bg-white">
        <h4 class="text-sm font-semibold text-gray-800 mb-3 pl-3 border-l-2 border-primary">基本信息</h4>
        <div class="space-y-3">
          <div class="flex items-center gap-3">
            <svg class="w-4 h-4 text-gray-400" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
            <span class="text-sm text-gray-600">{{ company.address }}</span>
          </div>
          <div class="flex items-center gap-3">
            <svg class="w-4 h-4 text-gray-400" viewBox="0 0 24 24" fill="currentColor"><path d="M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10zm-2-8h-2v2h2v-2zm0 4h-2v2h2v-2z"/></svg>
            <span class="text-sm text-gray-600">{{ company.industry }} · {{ company.scale }}</span>
          </div>
          <div class="flex items-center gap-3">
            <svg class="w-4 h-4 text-gray-400" viewBox="0 0 24 24" fill="currentColor"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
            <span class="text-sm text-gray-600">招聘负责人：{{ company.hr }}</span>
          </div>
          <div class="flex items-center gap-3">
            <svg class="w-4 h-4 text-gray-400" viewBox="0 0 24 24" fill="currentColor"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>
            <span class="text-sm text-gray-600">{{ company.contact }}</span>
          </div>
        </div>
      </div>

      <!-- 员工福利 -->
      <div class="mt-2 p-4 bg-white">
        <h4 class="text-sm font-semibold text-gray-800 mb-3 pl-3 border-l-2 border-primary">员工福利</h4>
        <div class="flex flex-wrap gap-2">
          <span 
            v-for="welfare in company.welfare" 
            :key="welfare"
            class="text-[12px] px-2 py-1 bg-green-50 text-green-600 rounded"
          >
            {{ welfare }}
          </span>
        </div>
      </div>

      <!-- 在招职位 -->
      <div class="mt-2 p-4 bg-white">
        <h4 class="text-sm font-semibold text-gray-800 mb-3 pl-3 border-l-2 border-primary">在招职位</h4>
        <div class="flex flex-col gap-2">
          <div 
            v-for="job in companyJobs" 
            :key="job.id"
            class="flex items-center justify-between p-3 bg-gray-50 rounded-lg cursor-pointer"
            @click="goToJob(job.id)"
          >
            <div>
              <p class="text-sm font-semibold text-gray-800">{{ job.title }}</p>
              <p class="text-xs text-gray-500 mt-1">{{ job.location }} · {{ job.type }}</p>
            </div>
            <div class="text-right">
              <p class="text-sm text-red-500 font-medium">{{ job.salary }}</p>
              <span class="text-xs text-gray-400">&gt;</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 操作按钮 -->
      <div class="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[480px] bg-white border-t border-gray-100 p-4 flex gap-3">
        <button 
          class="flex-1 py-3 rounded-full text-sm font-medium border border-primary text-primary flex items-center justify-center gap-1"
          @click="handleCollect"
        >
          <svg class="w-4 h-4" :class="isCollected ? 'text-red-500 fill-current' : ''" viewBox="0 0 24 24" :fill="isCollected ? 'currentColor' : 'none'" stroke="currentColor" stroke-width="2"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
          {{ isCollected ? '已收藏' : '收藏' }}
        </button>
        <button 
          class="flex-1 py-3 rounded-full text-sm font-medium bg-primary text-white flex items-center justify-center gap-1"
          @click="handleContact"
        >
          <svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"/></svg>
          联系企业
        </button>
      </div>
    </div>

    <!-- 不存在 -->
    <div v-else class="p-4 text-center text-gray-400">
      <p>企业不存在</p>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useUserStore } from '../store'
import { companyData, jobsData } from '../data/mock'

const route = useRoute()
const router = useRouter()
const userStore = useUserStore()

const company = computed(() => {
  const name = route.query.name
  return companyData[name] || null
})

const companyJobs = computed(() => {
  if (!company.value) return []
  return jobsData.filter(job => job.company === company.value.name).slice(0, 3)
})

const isCollected = computed(() => {
  if (!company.value) return false
  return userStore.isCollected(company.value.id + 1000)
})

function handleCollect() {
  if (!userStore.isLoggedIn) {
    router.push('/login')
    return
  }
  userStore.toggleCollect(company.value.id + 1000)
}

function handleContact() {
  if (!userStore.isLoggedIn) {
    router.push('/login')
    return
  }
  alert(`联系电话：${company.value.contact}\n联系人：${company.value.hr}`)
}

function goToJob(id) {
  router.push(`/job/${id}`)
}
</script>
