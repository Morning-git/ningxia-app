<template>
  <div class="pb-4">
    <!-- 标题栏 -->
    <div class="flex items-center gap-3 px-4 py-3 bg-white border-b border-gray-100 sticky top-0 z-10">
      <span class="text-2xl text-gray-800 cursor-pointer" @click="$router.back()">&#8249;</span>
      <h3 class="text-base font-semibold text-gray-800">{{ currentFair?.title || '网络招聘会' }}</h3>
    </div>

    <!-- 招聘会详情 -->
    <div v-if="currentFair">
      <!-- 封面图 -->
      <div class="relative w-full" style="padding-bottom: 42.86%;">
        <img 
          :src="currentFair.cover" 
          :alt="currentFair.title"
          class="absolute inset-0 w-full h-full object-cover"
        />
        <span 
          class="absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-medium"
          :class="getStatusClass(currentFair.status)"
        >
          {{ getStatusText(currentFair.status) }}
        </span>
      </div>

      <!-- 招聘会信息 -->
      <div class="p-4 bg-white">
        <div class="flex items-center gap-4 text-sm text-gray-500 mb-4">
          <span class="flex items-center gap-1">
            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11z"/></svg>
            {{ currentFair.startTime }}
          </span>
          <span class="flex items-center gap-1">
            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/></svg>
            {{ currentFair.duration }}
          </span>
        </div>
        <div class="flex items-center justify-between py-3 border-t border-b border-gray-100">
          <div class="flex items-center gap-2">
            <span class="text-sm text-gray-500">已有</span>
            <span class="text-lg font-bold text-primary">{{ currentFair.joinedCount }}</span>
            <span class="text-sm text-gray-500">人参加</span>
          </div>
          <button 
            class="px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium"
            @click="handleJoin"
          >
            立即参加
          </button>
        </div>
      </div>

      <!-- 参会企业 -->
      <div class="p-4">
        <h4 class="text-sm font-semibold text-gray-800 mb-3">参会企业</h4>
        <div class="flex flex-col gap-3">
          <div 
            v-for="job in fairJobs" 
            :key="job.id"
            class="bg-white rounded-xl p-4 shadow-sm"
          >
            <div class="cursor-pointer" @click="goToJob(job.id)">
              <div class="flex justify-between items-start mb-2">
                <span class="text-sm font-semibold text-gray-800">{{ job.title }}</span>
                <span class="text-sm text-red-500 font-medium">{{ job.salary }}</span>
              </div>
              <div class="flex gap-4 text-[13px] text-gray-500 mb-2">
                <span class="flex items-center gap-1">
                  <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
                  {{ job.location }}
                </span>
                <span class="flex items-center gap-1">
                  <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-6 0h-4V4h4v2z"/></svg>
                  {{ job.type }}
                </span>
              </div>
              <div class="flex items-center gap-2">
                <span class="text-[13px] text-gray-400 flex items-center gap-1">
                  <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10zm-2-8h-2v2h2v-2zm0 4h-2v2h2v-2z"/></svg>
                  {{ job.company }}
                </span>
              </div>
            </div>
            <div class="flex gap-2 mt-3 pt-3 border-t border-gray-100">
              <button 
                class="flex-1 py-2 rounded-lg text-xs font-medium border border-primary text-primary flex items-center justify-center gap-1"
                @click.stop="handleChat(job)"
              >
                <svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"/></svg>
                联系企业
              </button>
              <button 
                class="flex-1 py-2 rounded-lg text-xs font-medium bg-primary text-white flex items-center justify-center gap-1"
                @click.stop="handleApply(job)"
              >
                <svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg>
                立即投递
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- 招聘会须知 -->
      <div class="px-4 pb-4">
        <h4 class="text-sm font-semibold text-gray-800 mb-3">招聘会须知</h4>
        <div class="bg-white rounded-xl p-4 space-y-2">
          <p class="text-xs text-gray-600">• 招聘会期间可与企业HR在线沟通</p>
          <p class="text-xs text-gray-600">• 投递简历后可即时查看企业反馈</p>
          <p class="text-xs text-gray-600">• 预约面试时间，错过可二次申请</p>
          <p class="text-xs text-gray-600">• 咨询服务热线：0951-12345678</p>
        </div>
      </div>
    </div>

    <!-- 不存在 -->
    <div v-else class="p-4 text-center text-gray-400">
      <p>招聘会不存在</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useUserStore } from '../store'
import { jobsData, jobToChatMap } from '../data/mock'

const router = useRouter()
const route = useRoute()
const userStore = useUserStore()

const jobFairs = ref([
  {
    id: 1,
    title: '2024年春季残疾人专场招聘会',
    cover: '/img/Snipaste_2026-03-16_14-57-15.jpg',
    startTime: '2024年3月20日 9:00',
    duration: '8小时',
    status: 'ongoing',
    joinedCount: 328
  },
  {
    id: 2,
    title: '宁夏残疾人就业援助月专场',
    cover: '/img/Snipaste_2026-03-16_14-57-15.jpg',
    startTime: '2024年3月25日 10:00',
    duration: '6小时',
    status: 'upcoming',
    joinedCount: 156
  },
  {
    id: 3,
    title: '数字经济专场网络招聘会',
    cover: '/img/Snipaste_2026-03-16_14-57-15.jpg',
    startTime: '2024年4月1日 9:00',
    duration: '全天',
    status: 'upcoming',
    joinedCount: 89
  },
  {
    id: 4,
    title: '2024届残疾毕业生专场',
    cover: '/img/Snipaste_2026-03-16_14-57-15.jpg',
    startTime: '2024年2月15日 9:00',
    duration: '8小时',
    status: 'ended',
    joinedCount: 512
  },
  {
    id: 5,
    title: '手工艺制作专场招聘会',
    cover: '/img/Snipaste_2026-03-16_14-57-15.jpg',
    startTime: '2024年4月10日 14:00',
    duration: '4小时',
    status: 'upcoming',
    joinedCount: 45
  }
])

const currentFair = computed(() => {
  const id = parseInt(route.params.id)
  return jobFairs.value.find(f => f.id === id)
})

const fairJobs = jobsData.slice(0, 8)

function getStatusClass(status) {
  switch(status) {
    case 'ongoing':
      return 'bg-green-500 text-white'
    case 'upcoming':
      return 'bg-blue-500 text-white'
    case 'ended':
      return 'bg-gray-400 text-white'
    default:
      return 'bg-gray-100 text-gray-600'
  }
}

function getStatusText(status) {
  switch(status) {
    case 'ongoing':
      return '进行中'
    case 'upcoming':
      return '即将开始'
    case 'ended':
      return '已结束'
    default:
      return ''
  }
}

function handleJoin() {
  if (!userStore.isLoggedIn) {
    router.push('/login')
    return
  }
  alert('您已成功报名参加招聘会！')
}

function goToJob(id) {
  router.push(`/job/${id}`)
}

function handleChat(job) {
  if (!userStore.isLoggedIn) {
    router.push('/login')
    return
  }
  const chatId = jobToChatMap[job.id]
  if (chatId) {
    router.push(`/chat/${chatId}`)
  } else {
    alert('暂不支持与企业聊天，请电话联系企业。')
  }
}

function handleApply(job) {
  if (!userStore.isLoggedIn) {
    router.push('/login')
    return
  }
  const exists = userStore.applications.find(a => a.jobId === job.id)
  if (exists) {
    alert('您已经投递过该职位了！')
    return
  }
  userStore.addApplication({
    jobId: job.id,
    jobTitle: job.title,
    company: job.company,
    salary: job.salary,
    status: 'pending'
  })
  alert('简历投递成功！\n\n我们将尽快为您安排面试，请保持手机畅通。')
}
</script>
