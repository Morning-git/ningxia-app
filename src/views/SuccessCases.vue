<template>
  <div class="pb-4">
    <!-- 标题栏 -->
    <div class="flex items-center gap-3 px-4 py-3 bg-white border-b border-gray-100 sticky top-0 z-10">
      <span class="text-2xl text-gray-800 cursor-pointer" @click="$router.back()">&#8249;</span>
      <h3 class="text-base font-semibold text-gray-800">就业典型</h3>
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

    <!-- 分类标签 -->
    <div class="px-4 py-3 bg-white mt-2">
      <div class="flex gap-2 overflow-x-auto pb-2">
        <span 
          v-for="tab in tabs" 
          :key="tab.value"
          class="px-4 py-2 rounded-lg text-sm whitespace-nowrap cursor-pointer transition-colors"
          :class="activeTab === tab.value ? 'bg-primary text-white font-medium' : 'bg-gray-100 text-gray-600'"
          @click="activeTab = tab.value"
        >
          {{ tab.label }}
        </span>
      </div>
    </div>

    <!-- 典型列表 -->
    <div class="p-4">
      <div class="flex flex-col gap-3">
        <div 
          v-for="item in filteredCases" 
          :key="item.id"
          class="bg-white rounded-xl overflow-hidden shadow-sm cursor-pointer"
          @click="goToDetail(item)"
        >
          <!-- 有图片的情况 -->
          <div v-if="item.cover" class="flex items-center p-3">
            <div class="flex-1 pr-3">
              <h4 class="text-sm font-semibold text-gray-800 mb-1" style="display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">{{ item.title }}</h4>
              <div class="flex items-center gap-2 mb-1">
                <span class="text-xs text-gray-500">{{ item.name }}</span>
                <span class="text-xs text-gray-400">|</span>
                <span class="text-xs text-gray-500">{{ item.job }}</span>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-[10px] text-gray-400">{{ item.date }}</span>
                <span class="text-[10px] text-gray-400">{{ item.readCount }}人看过</span>
              </div>
            </div>
            <div class="w-28 h-20 flex-shrink-0">
              <img 
                :src="item.cover" 
                :alt="item.title"
                class="w-full h-full object-cover rounded-lg"
              />
            </div>
          </div>
          <!-- 没有图片的情况 -->
          <div v-else class="p-3">
            <h4 class="text-sm font-semibold text-gray-800 mb-1" style="display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">{{ item.title }}</h4>
            <div class="flex items-center gap-2 mb-1">
              <span class="text-xs text-gray-500">{{ item.name }}</span>
              <span class="text-xs text-gray-400">|</span>
              <span class="text-xs text-gray-500">{{ item.job }}</span>
            </div>
            <p class="text-xs text-gray-500 mb-1" style="display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">{{ item.summary }}</p>
            <div class="flex items-center justify-between">
              <span class="text-[10px] text-gray-400">{{ item.date }}</span>
              <span class="text-[10px] text-gray-400">{{ item.readCount }}人看过</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 成功经验 -->
    <div class="px-4 pb-4">
      <div class="bg-gradient-to-r from-primary/10 to-primary/5 rounded-xl p-4">
        <h4 class="text-sm font-semibold text-gray-800 mb-3">成功经验</h4>
        <div class="space-y-2">
          <p class="text-xs text-gray-600 flex items-start gap-2">
            <span class="w-1.5 h-1.5 rounded-full bg-primary mt-1 flex-shrink-0"></span>
            保持积极心态，相信自己
          </p>
          <p class="text-xs text-gray-600 flex items-start gap-2">
            <span class="w-1.5 h-1.5 rounded-full bg-primary mt-1 flex-shrink-0"></span>
            不断提升专业技能
          </p>
          <p class="text-xs text-gray-600 flex items-start gap-2">
            <span class="w-1.5 h-1.5 rounded-full bg-primary mt-1 flex-shrink-0"></span>
            主动寻求就业机会
          </p>
          <p class="text-xs text-gray-600 flex items-start gap-2">
            <span class="w-1.5 h-1.5 rounded-full bg-primary mt-1 flex-shrink-0"></span>
            善于利用政府扶持政策
          </p>
          <p class="text-xs text-gray-600 flex items-start gap-2">
            <span class="w-1.5 h-1.5 rounded-full bg-primary mt-1 flex-shrink-0"></span>
            坚持不懈，终会成功
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const activeTab = ref('all')

const tabs = [
  { value: 'all', label: '全部' },
  { value: 'entrepreneur', label: '创业之星' },
  { value: 'employee', label: '就业标兵' },
  { value: 'skill', label: '技能能手' }
]

const banners = ref([
  { image: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1200&q=80', title: '就业典型' },
  { image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1200&q=80', title: '创业之星' },
  { image: 'https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=1200&q=80', title: '就业标兵' }
])

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

const cases = ref([
  {
    id: 1,
    category: 'entrepreneur',
    title: '从失业者到创业者：我的电商之路',
    name: '张明（化名）',
    disability: '肢体残疾',
    job: '软件测试工程师',
    cover: 'https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=400&q=80',
    summary: '因车祸导致下肢残疾的张明，一度对未来感到迷茫。在残联的帮助下，他参加了免费的软件测试培训，经过半年的努力学习，成功转型为一名软件测试工程师。',
    date: '2024-01-15',
    readCount: 256
  },
  {
    id: 2,
    category: 'entrepreneur',
    title: '巧手编织幸福梦',
    name: '李华（化名）',
    disability: '听力残疾',
    job: '手工艺品工作室创始人',
    cover: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=400&q=80',
    summary: '先天性听力残疾的李华，从小就喜欢手工编织。在残联的支持下，她创办了自己的手工艺品工作室，不仅实现了就业，还带动了其他10名残疾人就业。',
    date: '2024-01-12',
    readCount: 189
  },
  {
    id: 3,
    category: 'skill',
    title: '用技术说话的高级按摩师',
    name: '王芳（化名）',
    disability: '视力残疾',
    job: '高级按摩师',
    cover: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=400&q=80',
    summary: '视力残疾的王芳，通过努力考取了高级按摩师资格证书。她在一家中医养生馆工作，凭借精湛的技艺赢得了客户的广泛好评。',
    date: '2024-01-10',
    readCount: 312
  },
  {
    id: 4,
    category: 'employee',
    title: '认真做好每一件事',
    name: '赵强（化名）',
    disability: '智力残疾',
    job: '超市理货员',
    cover: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=400&q=80',
    summary: '轻度智力残疾的赵强，在残联的职业指导下，成为了一名超市理货员。他认真负责的工作态度得到了公司的认可。',
    date: '2024-01-08',
    readCount: 145
  },
  {
    id: 5,
    category: 'skill',
    title: '键盘上的飞翔人生',
    name: '陈磊（化名）',
    disability: '肢体残疾',
    job: '数据分析师',
    cover: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=400&q=80',
    summary: '双手残疾的陈磊，凭借顽强的毅力学会了用脚操作电脑，成为了一名优秀的数据分析师。',
    date: '2024-01-05',
    readCount: 428
  },
  {
    id: 6,
    category: 'entrepreneur',
    title: '小店铺成就大梦想',
    name: '刘娟（化名）',
    disability: '言语残疾',
    job: '便利店老板',
    cover: '',
    summary: '言语残疾的刘娟，在政府的扶持下开起了便利店，凭借诚信经营成为了社区居民信赖的小店。',
    date: '2024-01-03',
    readCount: 167
  }
])

const filteredCases = computed(() => {
  if (activeTab.value === 'all') {
    return cases.value
  }
  return cases.value.filter(item => item.category === activeTab.value)
})

function goToDetail(item) {
  alert(`查看详情：${item.title}`)
}
</script>
