<template>
  <div class="pb-4">
    <!-- 标题栏 -->
    <div class="flex items-center gap-3 px-4 py-3 bg-white border-b border-gray-100 sticky top-0 z-10">
      <span class="text-2xl text-gray-800 cursor-pointer" @click="$router.back()">&#8249;</span>
      <h3 class="text-base font-semibold text-gray-800">就业政策</h3>
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

    <!-- 政策分类 -->
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

    <!-- 资讯列表 -->
    <div class="p-4">
      <div class="flex flex-col gap-3">
        <div 
          v-for="item in filteredList" 
          :key="item.id"
          class="bg-white rounded-xl overflow-hidden shadow-sm cursor-pointer"
          @click="goToDetail(item)"
        >
          <!-- 有图片的情况 -->
          <div v-if="item.cover" class="flex items-center p-3">
            <div class="flex-1 pr-3">
              <h4 class="text-sm font-semibold text-gray-800 mb-1" style="display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">{{ item.title }}</h4>
              <p class="text-xs text-gray-500 mb-1" style="display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">{{ item.summary }}</p>
              <div class="flex items-center justify-between">
                <span class="text-[10px] text-gray-400">{{ item.source }}</span>
                <span class="text-[10px] text-gray-400">{{ item.time }}</span>
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
            <p class="text-xs text-gray-500 mb-1" style="display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">{{ item.summary }}</p>
            <div class="flex items-center justify-between">
              <span class="text-[10px] text-gray-400">{{ item.source }}</span>
              <span class="text-[10px] text-gray-400">{{ item.time }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const activeTab = ref('news')

const banners = ref([
  { image: 'https://picsum.photos/800/343?random=10', title: '残疾人就业援助月' },
  { image: 'https://picsum.photos/800/343?random=11', title: '春季专场招聘会' },
  { image: 'https://picsum.photos/800/343?random=12', title: '创业扶持政策' }
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

const tabs = [
  { value: 'news', label: '就业资讯' },
  { value: 'notice', label: '通知公告' },
  { value: 'policy', label: '政策要闻' }
]

const policyList = ref([
  // 就业资讯
  {
    id: 1,
    type: 'news',
    title: '宁夏残疾人就业工作取得新成效',
    summary: '今年第一季度，我区新增残疾人就业人数达到328人，同比增长15%。',
    cover: 'https://picsum.photos/400/400?random=1',
    source: '宁夏日报',
    time: '2024-03-15'
  },
  {
    id: 2,
    type: 'news',
    title: '残联举办春季专场招聘会',
    summary: '宁夏残联联合多家企业举办春季专场招聘会，提供岗位500余个。',
    cover: 'https://picsum.photos/400/400?random=2',
    source: '宁夏新闻网',
    time: '2024-03-10'
  },
  {
    id: 3,
    type: 'news',
    title: '残疾人就业援助月活动启动',
    summary: '为期一个月的残疾人就业援助月活动正式启动。',
    cover: '',
    source: '宁夏残联',
    time: '2024-03-05'
  },
  {
    id: 4,
    type: 'news',
    title: '我区首家残疾人就业实训基地挂牌',
    summary: '宁夏首家残疾人就业实训基地在银川正式挂牌成立。',
    cover: 'https://picsum.photos/400/400?random=3',
    source: '宁夏日报',
    time: '2024-02-28'
  },
  // 通知公告
  {
    id: 5,
    type: 'notice',
    title: '关于开展2024年残疾人就业状况调查的通知',
    summary: '为全面掌握全区残疾人就业状况，现组织开展就业状况调查。',
    cover: '',
    source: '宁夏残联',
    time: '2024-03-12'
  },
  {
    id: 6,
    type: 'notice',
    title: '2024年残疾人职业技能培训计划',
    summary: '现发布2024年度残疾人职业技能培训计划，共计20个培训项目。',
    cover: 'https://picsum.photos/400/400?random=4',
    source: '宁夏人社局',
    time: '2024-03-08'
  },
  {
    id: 7,
    type: 'notice',
    title: '残疾人就业保障金征收使用管理办法',
    summary: '现印发《残疾人就业保障金征收使用管理办法》。',
    cover: '',
    source: '宁夏财政厅',
    time: '2024-02-20'
  },
  // 政策要闻
  {
    id: 8,
    type: 'policy',
    title: '《宁夏回族自治区残疾人就业保障条例》修订发布',
    summary: '新版条例进一步完善了残疾人就业保障措施。',
    cover: 'https://picsum.photos/400/400?random=5',
    source: '自治区政府',
    time: '2024-03-01'
  },
  {
    id: 9,
    type: 'policy',
    title: '残疾人创业扶持政策再升级',
    summary: '残疾人创业补贴标准提高，最高可达15万元。',
    cover: 'https://picsum.photos/400/400?random=6',
    source: '宁夏人社局',
    time: '2024-02-15'
  },
  {
    id: 10,
    type: 'policy',
    title: '超比例安排残疾人就业奖励办法',
    summary: '企业超比例安排残疾人就业可获得额外奖励。',
    cover: '',
    source: '宁夏残联',
    time: '2024-01-28'
  }
])

const filteredList = computed(() => {
  return policyList.value.filter(item => item.type === activeTab.value)
})

function goToDetail(item) {
  router.push(`/employment-policy/${item.id}`)
}
</script>
