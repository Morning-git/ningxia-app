<template>
  <div class="pb-4">
    <!-- 标题栏 -->
    <div class="flex items-center gap-3 px-4 py-3 bg-white border-b border-gray-100 sticky top-0 z-10">
      <span class="text-2xl text-gray-800 cursor-pointer" @click="$router.back()">&#8249;</span>
      <h3 class="text-base font-semibold text-gray-800">大学生就业</h3>
    </div>

    <!-- 顶部Banner -->
    <div class="bg-gradient-to-r from-blue-500 to-blue-600 p-5">
      <h2 class="text-white text-lg font-semibold mb-2">大学生就业  职引未来</h2>
      <p class="text-white/80 text-sm mb-4">知名企业进校园，优质岗位等你来</p>
      <div class="flex gap-3">
        <div class="flex-1 bg-white/20 rounded-lg p-2 text-center">
          <p class="text-white text-xl font-bold">50+</p>
          <p class="text-white/70 text-xs">进校企业</p>
        </div>
        <div class="flex-1 bg-white/20 rounded-lg p-2 text-center">
          <p class="text-white text-xl font-bold">2000+</p>
          <p class="text-white/70 text-xs">招聘岗位</p>
        </div>
        <div class="flex-1 bg-white/20 rounded-lg p-2 text-center">
          <p class="text-white text-xl font-bold">5000+</p>
          <p class="text-white/70 text-xs">Offer发放</p>
        </div>
      </div>
    </div>

    <!-- 招聘会预告 -->
    <div class="px-4 py-4 bg-white mt-2">
      <h4 class="text-sm font-semibold text-gray-800 mb-3">近期招聘会</h4>
      <div class="flex flex-col gap-3">
        <div 
          v-for="event in recruitmentEvents" 
          :key="event.title"
          class="p-3 bg-gradient-to-r from-blue-50 to-white rounded-xl border border-blue-100"
        >
          <div class="flex justify-between items-start mb-2">
            <div>
              <p class="text-sm font-semibold text-gray-800">{{ event.title }}</p>
              <p class="text-xs text-gray-500 mt-1">{{ event.time }}</p>
            </div>
            <span class="text-[10px] px-2 py-1 bg-blue-500 text-white rounded-full">即将开始</span>
          </div>
          <div class="flex items-center gap-4 text-xs text-gray-500">
            <span class="flex items-center gap-1">
              <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
              {{ event.location }}
            </span>
            <span class="flex items-center gap-1">
              <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
              {{ event.count }}家企业
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- 热门企业 -->
    <div class="px-4 py-4 bg-white mt-2">
      <h4 class="text-sm font-semibold text-gray-800 mb-3">热门招聘企业</h4>
      <div class="flex gap-3 overflow-x-auto pb-2">
        <div 
          v-for="company in companies" 
          :key="company.name"
          class="flex-shrink-0 w-24 text-center cursor-pointer"
          @click="goToCompany(company.name)"
        >
          <div class="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500/20 to-blue-500/5 flex items-center justify-center text-blue-500 font-bold text-lg mx-auto mb-1">
            {{ company.avatar }}
          </div>
          <p class="text-xs text-gray-600 truncate">{{ company.name }}</p>
        </div>
      </div>
    </div>

    <!-- 职位列表 -->
    <div class="p-4">
      <div class="flex justify-between items-center mb-3">
        <h4 class="text-sm font-semibold text-gray-800">校招岗位</h4>
        <span class="text-xs text-gray-400">共 {{ campusJobs.length }} 个岗位</span>
      </div>
      
      <div class="flex flex-col gap-3">
        <div 
          v-for="job in campusJobs" 
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
            <div class="text-[13px] text-gray-400 flex items-center gap-1 mb-3">
              <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10zm-2-8h-2v2h2v-2zm0 4h-2v2h2v-2z"/></svg>
              {{ job.company }}
            </div>
          </div>
          <div class="flex gap-2 pt-3 border-t border-gray-100">
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

    <!-- 校园招聘流程 -->
    <div class="px-4 py-4 bg-white mt-2">
      <h4 class="text-sm font-semibold text-gray-800 mb-3">校园招聘流程</h4>
      <div class="flex items-center justify-between">
        <div class="flex flex-col items-center">
          <div class="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-sm">1</div>
          <p class="text-xs text-gray-600 mt-1">投递简历</p>
        </div>
        <div class="flex-1 h-0.5 bg-gray-200 mx-2"></div>
        <div class="flex flex-col items-center">
          <div class="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-sm">2</div>
          <p class="text-xs text-gray-600 mt-1">参加宣讲</p>
        </div>
        <div class="flex-1 h-0.5 bg-gray-200 mx-2"></div>
        <div class="flex flex-col items-center">
          <div class="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-sm">3</div>
          <p class="text-xs text-gray-600 mt-1">面试笔试</p>
        </div>
        <div class="flex-1 h-0.5 bg-gray-200 mx-2"></div>
        <div class="flex flex-col items-center">
          <div class="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-white font-bold text-sm">4</div>
          <p class="text-xs text-gray-600 mt-1">签约入职</p>
        </div>
      </div>
    </div>

    <!-- 就业服务 -->
    <div class="px-4 py-4 bg-white mt-2">
      <h4 class="text-sm font-semibold text-gray-800 mb-3">就业服务</h4>
      <div class="grid grid-cols-2 gap-3">
        <div class="p-3 bg-gradient-to-br from-blue-50 to-white rounded-xl">
          <div class="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mb-2">
            <svg class="w-5 h-5 text-blue-500" viewBox="0 0 24 24" fill="currentColor"><path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm2 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/></svg>
          </div>
          <p class="text-xs font-semibold text-gray-800">简历指导</p>
          <p class="text-[10px] text-gray-500">专业老师指导</p>
        </div>
        <div class="p-3 bg-gradient-to-br from-green-50 to-white rounded-xl">
          <div class="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mb-2">
            <svg class="w-5 h-5 text-green-500" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
          </div>
          <p class="text-xs font-semibold text-gray-800">面试培训</p>
          <p class="text-[10px] text-gray-500">模拟面试练习</p>
        </div>
        <div class="p-3 bg-gradient-to-br from-purple-50 to-white rounded-xl">
          <div class="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center mb-2">
            <svg class="w-5 h-5 text-purple-500" viewBox="0 0 24 24" fill="currentColor"><path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72L12 15l5-2.73v3.72z"/></svg>
          </div>
          <p class="text-xs font-semibold text-gray-800">职业规划</p>
          <p class="text-[10px] text-gray-500">明确就业方向</p>
        </div>
        <div class="p-3 bg-gradient-to-br from-orange-50 to-white rounded-xl">
          <div class="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center mb-2">
            <svg class="w-5 h-5 text-orange-500" viewBox="0 0 24 24" fill="currentColor"><path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z"/></svg>
          </div>
          <p class="text-xs font-semibold text-gray-800">就业补贴</p>
          <p class="text-[10px] text-gray-500">政策咨询解读</p>
        </div>
      </div>
    </div>

    <!-- 咨询客服 -->
    <div class="p-4">
      <div class="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-4 text-white">
        <div class="flex items-center justify-between">
          <div>
            <p class="font-semibold mb-1">需要帮助？</p>
            <p class="text-sm text-white/80">联系客服了解更多</p>
          </div>
          <button class="px-4 py-2 bg-white text-blue-600 rounded-lg text-sm font-medium">
            咨询客服
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '../store'
import { jobsData, jobToChatMap } from '../data/mock'

const router = useRouter()
const userStore = useUserStore()

const recruitmentEvents = [
  { title: '宁夏大学春季招聘会', time: '2024年3月15日 9:00', location: '宁夏大学体育馆', count: 80 },
  { title: '银川能源学院专场', time: '2024年3月20日 10:00', location: '银川能源学院', count: 50 },
  { title: '北方民族大学双选会', time: '2024年3月25日 9:00', location: '北方民族大学', count: 60 }
]

const companies = [
  { name: '中国电信', avatar: '电' },
  { name: '中国银行', avatar: '银' },
  { name: '宁夏银行', avatar: '宁' },
  { name: '国家电网', avatar: '电' },
  { name: '宁夏能源', avatar: '能' },
  { name: '伊利集团', avatar: '伊' }
]

const campusJobs = computed(() => {
  return jobsData.filter(job => job.type === '全职').slice(0, 6)
})

function goToJob(id) {
  router.push(`/job/${id}`)
}

function goToCompany(name) {
  router.push({ path: '/company', query: { name } })
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
