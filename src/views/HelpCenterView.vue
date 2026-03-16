<template>
  <div class="min-h-screen bg-gray-50">
    <!-- 顶部导航 -->
    <div class="bg-white px-4 py-3 flex items-center gap-3 sticky top-0 z-10 border-b border-gray-100">
      <span class="text-2xl text-gray-600 cursor-pointer" @click="$router.back()">&#8249;</span>
      <h1 class="text-lg font-semibold text-gray-800">帮助中心</h1>
    </div>

    <!-- 客服电话卡片 -->
    <div class="p-4">
      <div class="bg-gradient-to-r from-primary to-primary-light rounded-xl p-5 text-white">
        <h3 class="text-base font-semibold mb-1">服务热线</h3>
        <p class="text-2xl font-bold mb-2">0951-12345678</p>
        <p class="text-sm opacity-80">工作日 9:00-17:00</p>
      </div>
    </div>

    <!-- 常见问题 -->
    <div class="px-4">
      <h3 class="text-sm font-semibold text-gray-800 mb-3">常见问题</h3>
      <div class="bg-white rounded-xl overflow-hidden">
        <div 
          v-for="(item, index) in faqList" 
          :key="index"
          class="border-b border-gray-100 last:border-0"
        >
          <div 
            class="flex items-center justify-between p-4 cursor-pointer"
            @click="toggleExpand(index)"
          >
            <span class="text-sm text-gray-800">{{ item.question }}</span>
            <span class="text-gray-400 text-lg transition-transform" :class="{ 'rotate-90': expandedIndex === index }">›</span>
          </div>
          <div v-if="expandedIndex === index" class="px-4 pb-4">
            <p class="text-sm text-gray-600 leading-relaxed">{{ item.answer }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- 其他帮助 -->
    <div class="px-4 mt-4">
      <h3 class="text-sm font-semibold text-gray-800 mb-3">其他帮助</h3>
      <div class="bg-white rounded-xl overflow-hidden">
        <div class="flex items-center gap-3 px-4 py-4 border-b border-gray-100 cursor-pointer">
          <div class="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
            <svg class="w-5 h-5 text-blue-500" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"/>
            </svg>
          </div>
          <div class="flex-1">
            <p class="text-sm text-gray-800">在线客服</p>
            <p class="text-xs text-gray-400 mt-0.5">即时解答您的问题</p>
          </div>
          <span class="text-gray-300 text-lg">›</span>
        </div>
        <div class="flex items-center gap-3 px-4 py-4 cursor-pointer">
          <div class="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center">
            <svg class="w-5 h-5 text-green-500" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
            </svg>
          </div>
          <div class="flex-1">
            <p class="text-sm text-gray-800">服务网点</p>
            <p class="text-xs text-gray-400 mt-0.5">查看线下服务地址</p>
          </div>
          <span class="text-gray-300 text-lg">›</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const expandedIndex = ref(-1)

const faqList = ref([
  {
    question: '如何投递简历？',
    answer: '浏览职位列表，点击感兴趣的职位进入详情页，点击"立即投递"按钮即可投递简历。您也可以在职位详情页点击"收藏"按钮收藏职位，方便以后查看。'
  },
  {
    question: '如何修改个人信息？',
    answer: '进入"我的"页面，点击"我的简历"可以编辑个人信息、求职意向等内容。点击"残疾证管理"可以完善残疾证信息。'
  },
  {
    question: '如何联系企业？',
    answer: '投递简历后，企业若感兴趣会主动与您联系。您也可以通过"消息"页面与企业HR在线沟通，或拨打企业电话直接联系。'
  },
  {
    question: '如何参加职业培训？',
    answer: '在首页点击"就业指导"进入培训页面，选择感兴趣的视频或图文课程进行学习。部分课程需要报名，点击"报名"按钮即可。'
  },
  {
    question: '残疾证信息会泄露吗？',
    answer: '您的残疾证信息仅用于平台为您提供更精准的就业服务，不会泄露给第三方企业。企业只能看到您愿意公开的基本信息。'
  }
])

function toggleExpand(index) {
  expandedIndex.value = expandedIndex.value === index ? -1 : index
}
</script>
