<template>
  <div class="pb-4">
    <!-- 标题栏 -->
    <div class="flex items-center gap-3 px-4 py-3 bg-white border-b border-gray-100 sticky top-0 z-10">
      <span class="text-2xl text-gray-800 cursor-pointer" @click="$router.back()">&#8249;</span>
      <h3 class="text-base font-semibold text-gray-800">就业帮扶</h3>
    </div>

    <!-- Banner轮播图 -->
    <div class="relative w-full" style="padding-bottom: 42.86%;">
      <div class="absolute inset-0 flex overflow-hidden">
        <div 
          class="w-full h-full flex transition-transform duration-500"
          :style="{ transform: `translateX(-${currentBanner * 100}%)` }"
        >
          <div 
            v-for="(banner, index) in banners" 
            :key="index"
            class="w-full h-full flex-shrink-0"
          >
            <img 
              :src="banner.image" 
              :alt="banner.title"
              class="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
      <!-- 指示器 -->
      <div class="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
        <span 
          v-for="(banner, index) in banners" 
          :key="index"
          class="w-2 h-2 rounded-full cursor-pointer transition-colors"
          :class="currentBanner === index ? 'bg-white' : 'bg-white/50'"
          @click="currentBanner = index"
        ></span>
      </div>
    </div>

    <!-- 统计卡片 -->
    <div class="px-4 py-4 bg-white">
      <div class="grid grid-cols-3 gap-3">
        <div class="text-center p-3 bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl">
          <p class="text-xl font-bold text-primary">328</p>
          <p class="text-xs text-gray-500">帮扶人数</p>
        </div>
        <div class="text-center p-3 bg-gradient-to-br from-green/10 to-green/5 rounded-xl">
          <p class="text-xl font-bold text-green-600">256</p>
          <p class="text-xs text-gray-500">成功就业</p>
        </div>
        <div class="text-center p-3 bg-gradient-to-br from-orange/10 to-orange/5 rounded-xl">
          <p class="text-xl font-bold text-orange-600">80+</p>
          <p class="text-xs text-gray-500">合作企业</p>
        </div>
      </div>
    </div>

    <!-- 联系服务 -->
    <div class="px-4 py-4 bg-white mt-2">
      <h4 class="text-sm font-semibold text-gray-800 mb-3">联系我们</h4>
      <div class="space-y-3">
        <div class="flex items-center gap-3 p-3 bg-white rounded-xl shadow-sm">
          <div class="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
            <svg class="w-6 h-6 text-green-500" viewBox="0 0 24 24" fill="currentColor"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>
          </div>
          <div class="flex-1">
            <p class="text-sm font-semibold text-gray-800">就业服务热线</p>
            <p class="text-xs text-gray-500">0951-12345678</p>
          </div>
          <button class="px-3 py-1.5 bg-green-500 text-white text-xs rounded-full">拨打</button>
        </div>
        <div class="flex items-center gap-3 p-3 bg-white rounded-xl shadow-sm">
          <div class="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
            <svg class="w-6 h-6 text-blue-500" viewBox="0 0 24 24" fill="currentColor"><path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"/></svg>
          </div>
          <div class="flex-1">
            <p class="text-sm font-semibold text-gray-800">在线客服</p>
            <p class="text-xs text-gray-500">工作日 9:00-18:00</p>
          </div>
          <button class="px-3 py-1.5 bg-primary text-white text-xs rounded-full">咨询</button>
        </div>
        <div class="flex items-center gap-3 p-3 bg-white rounded-xl shadow-sm">
          <div class="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
            <svg class="w-6 h-6 text-purple-500" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
          </div>
          <div class="flex-1">
            <p class="text-sm font-semibold text-gray-800">残联服务大厅</p>
            <p class="text-xs text-gray-500">银川市解放西街123号</p>
          </div>
          <button class="px-3 py-1.5 bg-gray-100 text-gray-600 text-xs rounded-full">查看</button>
        </div>
      </div>
    </div>

    <!-- 帮扶内容 -->
    <div class="px-4 py-4 bg-white mt-2">
      <h4 class="text-sm font-semibold text-gray-800 mb-3">帮扶内容</h4>
      <div class="grid grid-cols-4 gap-2">
        <div class="flex flex-col items-center p-2">
          <div class="w-12 h-12 rounded-full bg-yellow-50 flex items-center justify-center mb-1">
            <svg class="w-6 h-6 text-yellow-500" viewBox="0 0 24 24" fill="currentColor"><path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1-1 .45-1 1-1zm2 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/></svg>
          </div>
          <span class="text-xs text-gray-600">职业指导</span>
        </div>
        <div class="flex flex-col items-center p-2">
          <div class="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center mb-1">
            <svg class="w-6 h-6 text-red-500" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
          </div>
          <span class="text-xs text-gray-600">岗位推荐</span>
        </div>
        <div class="flex flex-col items-center p-2">
          <div class="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center mb-1">
            <svg class="w-6 h-6 text-blue-500" viewBox="0 0 24 24" fill="currentColor"><path d="M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10zm-2-8h-2v2h2v-2zm0 4h-2v2h2v-2z"/></svg>
          </div>
          <span class="text-xs text-gray-600">企业对接</span>
        </div>
        <div class="flex flex-col items-center p-2">
          <div class="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center mb-1">
            <svg class="w-6 h-6 text-green-500" viewBox="0 0 24 24" fill="currentColor"><path d="M21 5c-1.11-.35-2.33-.5-3.5-.5-1.95 0-4.05.4-5.5 1.5-1.45-1.1-3.55-1.5-5.5-1.5S2.45 4.9 1 6v14.65c0 .25.25.5.5.5.1 0 .15-.05.25-.05C3.1 20.45 5.05 20 6.5 20c1.95 0 4.05.4 5.5 1.5 1.35-.85 3.8-1.5 5.5-1.5 1.65 0 3.35.3 4.75 1.05.1.05.15.05.25.05.25 0 .5-.25.5-.5V6c-.6-.45-1.25-.75-2-1zm0 13.5c-1.1-.35-2.3-.5-3.5-.5-1.7 0-4.15.65-5.5 1.5V8c1.35-.85 3.8-1.5 5.5-1.5 1.2 0 2.4.15 3.5.5v11.5z"/></svg>
          </div>
          <span class="text-xs text-gray-600">培训推荐</span>
        </div>
      </div>
    </div>

    <!-- 申请帮扶 -->
    <div class="px-4 py-4 bg-white mt-2">
      <h4 class="text-sm font-semibold text-gray-800 mb-3">申请帮扶</h4>
      <div class="bg-white rounded-xl p-4 shadow-sm">
        <div class="mb-3">
          <label class="block text-xs text-gray-600 mb-1">姓名</label>
          <input v-model="form.name" type="text" placeholder="请输入姓名" class="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary" />
        </div>
        <div class="mb-3">
          <label class="block text-xs text-gray-600 mb-1">电话</label>
          <input v-model="form.phone" type="tel" placeholder="请输入电话" class="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary" />
        </div>
        <div class="mb-3">
          <label class="block text-xs text-gray-600 mb-1">需求类型</label>
          <select v-model="form.type" class="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary">
            <option value="就业推荐">就业推荐</option>
            <option value="创业扶持">创业扶持</option>
            <option value="技能培训">技能培训</option>
            <option value="其他">其他</option>
          </select>
        </div>
        <button @click="submitApply" class="w-full py-3 bg-primary text-white rounded-lg text-sm font-medium">提交申请</button>
      </div>
    </div>

    <!-- 常见问题 -->
    <div class="px-4 py-4 bg-white mt-2">
      <h4 class="text-sm font-semibold text-gray-800 mb-3">常见问题</h4>
      <div class="space-y-2">
        <div 
          v-for="(faq, index) in faqs" 
          :key="index"
          class="p-3 bg-gray-50 rounded-lg cursor-pointer"
          @click="toggleFaq(index)"
        >
          <div class="flex items-center justify-between">
            <span class="text-xs text-gray-700">{{ faq.question }}</span>
            <svg 
              class="w-4 h-4 text-gray-400 transition-transform" 
              :class="{ 'rotate-180': expandedFaq === index }"
              viewBox="0 0 24 24" 
              fill="currentColor"
            >
              <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41 1.41z"/>
            </svg>
          </div>
          <div v-if="expandedFaq === index" class="mt-2 pt-2 border-t border-gray-200">
            <p class="text-xs text-gray-500 leading-relaxed">{{ faq.answer }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { randomImage } from '../utils/randomImage'

const currentBanner = ref(0)
let bannerTimer = null

onMounted(() => {
  bannerTimer = setInterval(() => {
    currentBanner.value = (currentBanner.value + 1) % banners.value.length
  }, 3000)
})

onUnmounted(() => {
  if (bannerTimer) clearInterval(bannerTimer)
})

const banners = ref([
  { image: randomImage(), title: '就业帮扶' },
  { image: randomImage(), title: '一对一帮扶' },
  { image: randomImage(), title: '政策扶持' }
])

const form = ref({
  name: '',
  phone: '',
  type: '就业推荐'
})

const expandedFaq = ref(null)

const faqs = ref([
  {
    question: '帮扶服务需要收费吗？',
    answer: '宁夏残疾人就业服务平台提供的就业帮扶服务完全免费。我们不收取任何费用，旨在帮助残疾人朋友更好地实现就业梦想。所有职业指导、岗位推荐、企业对接等服务均由政府及相关机构支持。'
  },
  {
    question: '申请帮扶需要什么条件？',
    answer: '具有宁夏户籍或居住证的残疾人，持有《中华人民共和国残疾人证》，有就业意愿和能力的朋友们均可申请帮扶服务。不限年龄、残疾类别和等级，我们都会根据您的实际情况提供个性化的就业帮扶。'
  },
  {
    question: '帮扶周期是多久？',
    answer: '帮扶周期根据个人情况而定。一般而言，从提交申请到成功就业，整个过程约为1-3个月。我们会为您提供全程跟踪服务，直到您成功就业并稳定工作为止。'
  },
  {
    question: '可以同时申请多项帮扶吗？',
    answer: '可以的。您可以根据自身需求同时申请多项帮扶服务，如职业指导+岗位推荐+技能培训等。我们的工作人员会根据您的实际情况，为您量身定制最合适的帮扶方案，帮助您尽快实现就业目标。'
  }
])

function submitApply() {
  if (!form.value.name || !form.value.phone) {
    alert('请填写姓名和电话')
    return
  }
  alert(`申请已提交！\n\n姓名：${form.value.name}\n电话：${form.value.phone}\n需求：${form.value.type}\n\n我们会尽快与您联系！`)
  form.value = { name: '', phone: '', type: '就业推荐' }
}

function toggleFaq(index) {
  expandedFaq.value = expandedFaq.value === index ? null : index
}
</script>
