<template>
  <div class="pb-4">
    <!-- 标题栏 -->
    <div class="flex items-center gap-3 px-4 py-3 bg-white border-b border-gray-100 sticky top-0 z-10">
      <span class="text-2xl text-gray-800 cursor-pointer" @click="$router.back()">&#8249;</span>
      <h3 class="text-base font-semibold text-gray-800">灵活就业</h3>
    </div>

    <!-- 顶部Banner -->
    <div class="bg-gradient-to-r from-primary to-primary-light p-5">
      <h2 class="text-white text-lg font-semibold mb-2">灵活就业  自在工作</h2>
      <p class="text-white/80 text-sm mb-4">时间自由、居家可做，多种灵活就业方式助您增收</p>
      <div class="flex gap-3">
        <div class="flex-1 bg-white/20 rounded-lg p-2 text-center">
          <p class="text-white text-xl font-bold">500+</p>
          <p class="text-white/70 text-xs">岗位数量</p>
        </div>
        <div class="flex-1 bg-white/20 rounded-lg p-2 text-center">
          <p class="text-white text-xl font-bold">200+</p>
          <p class="text-white/70 text-xs">合作企业</p>
        </div>
        <div class="flex-1 bg-white/20 rounded-lg p-2 text-center">
          <p class="text-white text-xl font-bold">98%</p>
          <p class="text-white/70 text-xs">就业成功率</p>
        </div>
      </div>
    </div>

    <!-- 工作类型选择 -->
    <div class="px-4 py-4 bg-white mt-2">
      <h4 class="text-sm font-semibold text-gray-800 mb-3">选择工作类型</h4>
      <div class="grid grid-cols-4 gap-2">
        <div 
          v-for="item in workTypes" 
          :key="item.type"
          class="flex flex-col items-center gap-2 p-2 rounded-xl cursor-pointer transition-all bg-gray-50"
          @click="goToTypePage(item.type)"
        >
          <div class="w-12 h-12 rounded-full flex items-center justify-center bg-gray-100">
            <svg class="w-6 h-6 text-gray-500" viewBox="0 0 24 24" fill="currentColor">
              <path :d="item.icon"/>
            </svg>
          </div>
          <span class="text-xs text-gray-600">{{ item.label }}</span>
        </div>
      </div>
    </div>

    <!-- 职位列表 -->
    <div class="p-4">
      <div class="flex justify-between items-center mb-3">
        <h4 class="text-sm font-semibold text-gray-800">推荐岗位</h4>
      </div>
      
      <div class="flex flex-col gap-3">
        <div 
          v-for="job in filteredJobs" 
          :key="job.id"
          class="bg-white rounded-xl p-4 shadow-sm"
        >
          <div class="cursor-pointer" @click="goToJob(job.id)">
            <div class="flex justify-between items-start mb-2">
              <div>
                <span class="text-sm font-semibold text-gray-800">{{ job.title }}</span>
                <span class="ml-2 text-[10px] px-2 py-0.5 bg-green-50 text-green-600 rounded">可居家</span>
              </div>
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

    <!-- 灵活就业优势 -->
    <div class="px-4 py-4 bg-white mt-2">
      <h4 class="text-sm font-semibold text-gray-800 mb-3">灵活就业优势</h4>
      <div class="grid grid-cols-2 gap-3">
        <div class="p-3 bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl">
          <div class="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center mb-2">
            <svg class="w-5 h-5 text-orange-500" viewBox="0 0 24 24" fill="currentColor"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/></svg>
          </div>
          <p class="text-xs font-semibold text-gray-800">时间灵活</p>
          <p class="text-[10px] text-gray-500">可根据自身情况安排</p>
        </div>
        <div class="p-3 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl">
          <div class="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mb-2">
            <svg class="w-5 h-5 text-blue-500" viewBox="0 0 24 24" fill="currentColor"><path d="M19 3H4.99c-1.11 0-1.98.89-1.98 2L3 19c0 1.1.88 2 1.99 2H19c1.1 0 2-.9 2-2V5c0-1.11-.9-2-2-2zm0 12h-4c0 1.66-1.35 3-3 3s-3-1.34-3-3H4.99V5H19v10z"/></svg>
          </div>
          <p class="text-xs font-semibold text-gray-800">居家办公</p>
          <p class="text-[10px] text-gray-500">减少通勤成本</p>
        </div>
        <div class="p-3 bg-gradient-to-br from-green-50 to-green-100 rounded-xl">
          <div class="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mb-2">
            <svg class="w-5 h-5 text-green-500" viewBox="0 0 24 24" fill="currentColor"><path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z"/></svg>
          </div>
          <p class="text-xs font-semibold text-gray-800">按劳取酬</p>
          <p class="text-[10px] text-gray-500">多劳多得</p>
        </div>
        <div class="p-3 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl">
          <div class="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center mb-2">
            <svg class="w-5 h-5 text-purple-500" viewBox="0 0 24 24" fill="currentColor"><path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm2 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/></svg>
          </div>
          <p class="text-xs font-semibold text-gray-800">门槛较低</p>
          <p class="text-[10px] text-gray-500">适合各类人群</p>
        </div>
      </div>
    </div>

    <!-- 申请流程 -->
    <div class="px-4 py-4 bg-white mt-2">
      <h4 class="text-sm font-semibold text-gray-800 mb-3">申请流程</h4>
      <div class="flex items-center justify-between">
        <div class="flex flex-col items-center">
          <div class="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold text-sm">1</div>
          <p class="text-xs text-gray-600 mt-1">选择岗位</p>
        </div>
        <div class="flex-1 h-0.5 bg-gray-200 mx-2"></div>
        <div class="flex flex-col items-center">
          <div class="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold text-sm">2</div>
          <p class="text-xs text-gray-600 mt-1">提交申请</p>
        </div>
        <div class="flex-1 h-0.5 bg-gray-200 mx-2"></div>
        <div class="flex flex-col items-center">
          <div class="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold text-sm">3</div>
          <p class="text-xs text-gray-600 mt-1">企业审核</p>
        </div>
        <div class="flex-1 h-0.5 bg-gray-200 mx-2"></div>
        <div class="flex flex-col items-center">
          <div class="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold text-sm">4</div>
          <p class="text-xs text-gray-600 mt-1">开始工作</p>
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
          <div class="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center text-primary font-bold text-lg mx-auto mb-1">
            {{ company.avatar }}
          </div>
          <p class="text-xs text-gray-600 truncate">{{ company.name }}</p>
        </div>
      </div>
    </div>

    <!-- 咨询客服 -->
    <div class="p-4">
      <div class="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-4 text-white">
        <div class="flex items-center justify-between">
          <div>
            <p class="font-semibold mb-1">需要帮助？</p>
            <p class="text-sm text-white/80">联系客服了解更多</p>
          </div>
          <button class="px-4 py-2 bg-white text-green-600 rounded-lg text-sm font-medium">
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

const workTypes = [
  { type: 'all', label: '全部', icon: 'M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H8V4h12v12z' },
  { type: 'remote', label: '远程办公', icon: 'M19 3H4.99c-1.11 0-1.98.89-1.98 2L3 19c0 1.1.88 2 1.99 2H19c1.1 0 2-.9 2-2V5c0-1.11-.9-2-2-2zm0 12h-4c0 1.66-1.35 3-3 3s-3-1.34-3-3H4.99V5H19v10z' },
  { type: 'parttime', label: '兼职', icon: 'M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z' },
  { type: 'freelance', label: '自由职业', icon: 'M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z' }
]

const companies = [
  { name: '智诚信息', avatar: '智' },
  { name: '京东电商', avatar: '京' },
  { name: '西部软件', avatar: '西' },
  { name: '银川大酒店', avatar: '银' },
  { name: '中阿商贸', avatar: '中' },
  { name: '宁医总院', avatar: '宁' }
]

const filteredJobs = computed(() => {
  let jobs = jobsData.filter(job => job.type === '兼职' || job.type === '远程')
  return jobs.slice(0, 6)
})

function goToJob(id) {
  router.push(`/job/${id}`)
}

function goToTypePage(type) {
  switch(type) {
    case 'all':
      router.push('/flex-job/all')
      break
    case 'remote':
      router.push('/flex-job/remote')
      break
    case 'parttime':
      router.push('/flex-job/parttime')
      break
    case 'freelance':
      router.push('/flex-job/freelance')
      break
  }
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
