<template>
  <div class="pb-20">
    <!-- 标题栏 -->
    <div class="flex items-center gap-3 px-4 py-3 bg-white border-b border-gray-100 sticky top-0 z-10">
      <span class="text-2xl text-gray-800 cursor-pointer" @click="$router.back()">&#8249;</span>
      <h3 class="text-base font-semibold text-gray-800">职位详情</h3>
      <div class="flex-1"></div>
      <button class="text-gray-500" @click="showShareModal = true">
        <svg class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92-1.31-2.92-2.92-2.92z"/>
        </svg>
      </button>
    </div>

    <div v-if="job" class="p-4 bg-white">
      <!-- 职位头部 -->
      <div class="mb-4">
        <h2 class="text-xl font-semibold text-gray-800 mb-2">{{ job.title }}</h2>
        <div class="flex items-center gap-2 mb-3">
          <span class="text-lg text-primary font-semibold">{{ job.salary }}</span>
          <span class="text-xs px-2 py-0.5 bg-green-50 text-green-600 rounded">急招</span>
        </div>
        <div class="flex flex-wrap gap-2">
          <span class="text-[13px] px-3 py-1 bg-gray-100 text-gray-600 rounded-full flex items-center gap-1">
            <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
            {{ job.location }}
          </span>
          <span class="text-[13px] px-3 py-1 bg-blue-50 text-blue-600 rounded-full flex items-center gap-1">
            <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-6 0h-4V4h4v2z"/></svg>
            {{ job.type }}
          </span>
        </div>
      </div>

      <!-- 职位标签 -->
      <div class="flex flex-wrap gap-2 mb-4">
        <span 
          v-for="tag in job.tags" 
          :key="tag"
          class="text-[12px] px-2 py-1 bg-green-50 text-green-600 rounded"
        >
          {{ tag }}
        </span>
      </div>

      <!-- 残疾人适配信息 -->
      <div v-if="job.disabilityFriendly" class="mb-4 p-3 bg-blue-50 rounded-lg">
        <h4 class="text-blue-600 font-semibold text-sm mb-2">残疾人适配信息</h4>
        <p class="text-[13px] text-gray-600">
          <b>适合情况：</b>{{ formattedDisability }}<br>
          <b>无障碍设施：</b>{{ job.accessibility || '常规办公环境' }}
        </p>
      </div>

      <!-- 职位描述 -->
      <div class="mb-4">
        <h4 class="text-sm font-semibold text-gray-800 mb-2 pl-3 border-l-2 border-primary">职位描述</h4>
        <p class="text-sm text-gray-600 leading-relaxed">{{ job.desc }}</p>
      </div>

      <!-- 任职要求 -->
      <div class="mb-4">
        <h4 class="text-sm font-semibold text-gray-800 mb-2 pl-3 border-l-2 border-primary">任职要求</h4>
        <p class="text-sm text-gray-600 leading-relaxed whitespace-pre-line">{{ job.requirement }}</p>
      </div>

      <!-- 职位福利 -->
      <div class="mb-4">
        <h4 class="text-sm font-semibold text-gray-800 mb-2 pl-3 border-l-2 border-primary">职位福利</h4>
        <div class="flex flex-wrap gap-2">
          <span class="text-[12px] px-2 py-1 bg-orange-50 text-orange-500 rounded">五险</span>
          <span class="text-[12px] px-2 py-1 bg-orange-50 text-orange-500 rounded">带薪年假</span>
          <span class="text-[12px] px-2 py-1 bg-orange-50 text-orange-500 rounded">节日福利</span>
          <span class="text-[12px] px-2 py-1 bg-orange-50 text-orange-500 rounded">定期体检</span>
          <span class="text-[12px] px-2 py-1 bg-orange-50 text-orange-500 rounded">员工旅游</span>
        </div>
      </div>

      <!-- 工作地址 -->
      <div class="mb-4">
        <h4 class="text-sm font-semibold text-gray-800 mb-2 pl-3 border-l-2 border-primary">工作地址</h4>
        <div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
          <div>
            <p class="text-sm text-gray-800">{{ job.location }}市某某区某某路123号</p>
            <p class="text-xs text-gray-400 mt-1">距您约2.5公里</p>
          </div>
          <button class="text-primary text-sm">查看地图</button>
        </div>
      </div>

      <!-- 公司信息 -->
      <div class="mb-4">
        <h4 class="text-sm font-semibold text-gray-800 mb-2 pl-3 border-l-2 border-primary">公司信息</h4>
        <div class="flex items-center gap-3 p-3 bg-gray-50 rounded-lg cursor-pointer" @click="goToCompany">
          <div class="w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-primary-light flex items-center justify-center text-white font-bold">
            {{ job.company.charAt(0) }}
          </div>
          <div class="flex-1">
            <p class="text-sm font-semibold text-gray-800">{{ job.company }}</p>
            <p class="text-xs text-gray-500">点击查看企业详情</p>
          </div>
          <span class="text-gray-400">&gt;</span>
        </div>
      </div>

      <!-- 面试须知 -->
      <div class="mb-4 p-3 bg-yellow-50 rounded-lg">
        <h4 class="text-yellow-600 font-semibold text-sm mb-2 flex items-center gap-1">
          <svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm2 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/></svg>
          面试须知
        </h4>
        <ul class="text-[12px] text-gray-600 space-y-1">
          <li>• 请携带个人简历和相关证件</li>
          <li>• 面试时间：周一至周五 9:00-17:00</li>
          <li>• 联系电话：0951-12345678</li>
        </ul>
      </div>
    </div>

    <!-- 不存在 -->
    <div v-else class="p-4 text-center text-gray-400">
      <p>职位不存在</p>
    </div>

    <!-- 相似职位推荐 -->
    <div v-if="similarJobs.length > 0" class="px-4 py-4 bg-white mt-2">
      <h4 class="text-sm font-semibold text-gray-800 mb-3 pl-3 border-l-2 border-primary">相似职位推荐</h4>
      <div class="flex flex-col gap-3">
        <div 
          v-for="similarJob in similarJobs" 
          :key="similarJob.id"
          class="flex items-center gap-3 p-3 bg-gray-50 rounded-lg cursor-pointer"
          @click="goToSimilarJob(similarJob.id)"
        >
          <div class="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-primary-light flex items-center justify-center text-white font-bold text-sm">
            {{ similarJob.company.charAt(0) }}
          </div>
          <div class="flex-1">
            <p class="text-sm font-semibold text-gray-800">{{ similarJob.title }}</p>
            <p class="text-xs text-gray-500">{{ similarJob.company }} · {{ similarJob.location }}</p>
          </div>
          <div class="text-right">
            <p class="text-sm text-red-500 font-medium">{{ similarJob.salary }}</p>
            <p class="text-xs text-gray-400">今天更新</p>
          </div>
        </div>
      </div>
    </div>

    <!-- 操作按钮 -->
    <div v-if="job" class="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[480px] bg-white border-t border-gray-100 p-4 flex gap-2">
      <button 
        class="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center"
        @click="handleCollect"
      >
        <svg class="w-6 h-6" :class="isCollected ? 'text-red-500 fill-current' : 'text-gray-400'" viewBox="0 0 24 24" :fill="isCollected ? 'currentColor' : 'none'" stroke="currentColor" stroke-width="2"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
      </button>
      <button 
        class="flex-1 py-3 rounded-full text-sm font-medium border border-primary text-primary flex items-center justify-center gap-1"
        @click="handleContact"
      >
        <svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"/></svg>
        联系企业
      </button>
      <button 
        class="flex-1 py-3 px-6 rounded-full text-sm font-medium bg-primary text-white"
        @click="handleApply"
      >
        立即投递
      </button>
    </div>

    <!-- 分享弹窗 -->
    <div v-if="showShareModal" class="fixed inset-0 bg-black/50 z-50 flex items-end" @click.self="showShareModal = false">
      <div class="w-full max-w-[480px] mx-auto bg-white rounded-t-2xl p-4">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-base font-semibold text-gray-800">分享</h3>
          <span class="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 cursor-pointer" @click="showShareModal = false">×</span>
        </div>
        <div class="flex justify-around py-4">
          <div class="flex flex-col items-center gap-2">
            <div class="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
              <svg class="w-6 h-6 text-green-600" viewBox="0 0 24 24" fill="currentColor"><path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"/></svg>
            </div>
            <span class="text-xs text-gray-600">微信好友</span>
          </div>
          <div class="flex flex-col items-center gap-2">
            <div class="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
              <svg class="w-6 h-6 text-green-600" viewBox="0 0 24 24" fill="currentColor"><path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92-1.31-2.92-2.92-2.92z"/></svg>
            </div>
            <span class="text-xs text-gray-600">朋友圈</span>
          </div>
          <div class="flex flex-col items-center gap-2">
            <div class="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
              <svg class="w-6 h-6 text-blue-600" viewBox="0 0 24 24" fill="currentColor"><path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z"/></svg>
            </div>
            <span class="text-xs text-gray-600">复制链接</span>
          </div>
          <div class="flex flex-col items-center gap-2">
            <div class="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
              <svg class="w-6 h-6 text-gray-600" viewBox="0 0 24 24" fill="currentColor"><path d="M17 1.01L7 1c-1.1 0-2 .9-2 2v18c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-1.99-2-1.99zM17 19H7V5h10v14z"/></svg>
            </div>
            <span class="text-xs text-gray-600">手机分享</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useUserStore } from '../store'
import { jobsData, jobToChatMap } from '../data/mock'

const route = useRoute()
const router = useRouter()
const userStore = useUserStore()

const showShareModal = ref(false)

const job = computed(() => jobsData.find(j => j.id === parseInt(route.params.id)))

function formatDisabilityText(disabilities) {
  if (!disabilities || disabilities.length === 0) return '不限'
  return disabilities.map(d => {
    if (d.level) {
      return `${d.type}${d.level}级`
    }
    return d.type || d
  }).join('、')
}

const formattedDisability = computed(() => formatDisabilityText(job.value?.suitableDisability))

const isCollected = computed(() => job.value ? userStore.isCollected(job.value.id) : false)

const similarJobs = computed(() => {
  if (!job.value) return []
  return jobsData
    .filter(j => j.id !== job.value.id && j.type === job.value.type)
    .slice(0, 3)
})

function handleCollect() {
  if (!userStore.isLoggedIn) {
    router.push('/login')
    return
  }
  userStore.toggleCollect(job.value.id)
}

function handleContact() {
  if (!userStore.isLoggedIn) {
    router.push('/login')
    return
  }
  const chatId = jobToChatMap[job.value.id]
  if (chatId) {
    router.push(`/chat/${chatId}`)
  } else {
    alert('暂不支持与企业聊天，请电话联系企业。')
  }
}

function handleApply() {
  if (!userStore.isLoggedIn) {
    router.push('/login')
    return
  }
  
  const exists = userStore.applications.find(a => a.jobId === job.value.id)
  if (exists) {
    alert('您已经投递过该职位了！')
    return
  }
  
  userStore.addApplication(job.value)
  alert('简历投递成功！\n\n我们将尽快为您安排面试，请保持手机畅通。\n\n服务热线：0951-12345678')
}

function goToCompany() {
  router.push({ path: '/company', query: { name: job.value.company } })
}

function goToSimilarJob(id) {
  router.push(`/job/${id}`)
}
</script>
