<template>
  <div class="pb-4">
    <!-- 标题栏 -->
    <div class="flex items-center gap-3 px-4 py-3 bg-white border-b border-gray-100 sticky top-0 z-10">
      <span class="text-2xl text-gray-800 cursor-pointer" @click="$router.back()">&#8249;</span>
      <h3 class="text-base font-semibold text-gray-800">不尤手作</h3>
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

    <!-- 商品列表 -->
    <div class="p-4">
      <div class="grid grid-cols-2 gap-3">
        <div 
          v-for="item in filteredList" 
          :key="item.id"
          class="bg-white rounded-xl overflow-hidden shadow-sm cursor-pointer"
          @click="goToDetail(item)"
        >
          <div class="w-full h-40 bg-gray-100">
            <img 
              v-if="item.cover"
              :src="item.cover" 
              :alt="item.title"
              class="w-full h-full object-cover"
            />
            <span v-else class="w-full h-full flex items-center justify-center text-4xl">{{ item.icon }}</span>
          </div>
          <div class="p-2">
            <h4 class="text-xs font-semibold text-gray-800 mb-1" style="display: -webkit-box; -webkit-line-clamp: 1; -webkit-box-orient: vertical; overflow: hidden;">{{ item.title }}</h4>
            <p class="text-[10px] text-gray-500 mb-1">{{ item.author }}</p>
            <p class="text-xs text-red-500 font-medium">¥{{ item.price }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { randomImage } from '../utils/randomImage'

const router = useRouter()

const activeTab = ref('all')
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
  { image: randomImage(), title: '不尤手作' },
  { image: randomImage(), title: '手工编织' },
  { image: randomImage(), title: '残疾人手工艺' }
])

const tabs = [
  { value: 'all', label: '全部' },
  { value: 'weaving', label: '编织' },
  { value: 'embroidery', label: '刺绣' },
  { value: 'knitting', label: '针织' },
  { value: 'other', label: '其他' }
]

const handcrafts = ref([
  {
    id: 1,
    category: 'weaving',
    title: '羊毛编织围巾',
    author: '李阿姨',
    cover: randomImage(),
    icon: '🧶',
    price: '89',
    desc: '纯羊毛手工编织围巾，保暖舒适，多色可选。',
    materials: '100%纯羊毛',
    size: '180cm×30cm'
  },
  {
    id: 2,
    category: 'embroidery',
    title: '山水画十字绣',
    author: '王大姐',
    cover: randomImage(),
    icon: '🎨',
    price: '156',
    desc: '手工十字绣山水画，客厅装饰佳品。',
    materials: '纯棉绣布+进口绣线',
    size: '60cm×80cm'
  },
  {
    id: 3,
    category: 'knitting',
    title: '手工毛线包',
    author: '张师傅',
    cover: randomImage(),
    icon: '👜',
    price: '128',
    desc: '时尚手工毛线包，简约大方。',
    materials: '优质毛线+皮质配件',
    size: '25cm×20cm×8cm'
  },
  {
    id: 4,
    category: 'weaving',
    title: '丝网花束',
    author: '赵女士',
    cover: randomImage(),
    icon: '🌸',
    price: '68',
    desc: '精美丝网花束，永恒的美丽。',
    materials: '丝网+铁丝+花杆',
    size: '40cm×30cm'
  },
  {
    id: 5,
    category: 'embroidery',
    title: '福字刺绣挂件',
    author: '陈大叔',
    cover: randomImage(),
    icon: '🧵',
    price: '45',
    desc: '福字刺绣挂件，新年装饰首选。',
    materials: '绸布+金线',
    size: '20cm×20cm'
  },
  {
    id: 6,
    category: 'knitting',
    title: '宝宝毛线鞋',
    author: '刘大姐',
    cover: '',
    icon: '👶',
    price: '38',
    desc: '柔软舒适的宝宝毛线鞋。',
    materials: '纯棉毛线',
    size: '0-2岁'
  },
  {
    id: 7,
    category: 'other',
    title: '串珠纸巾盒',
    author: '杨师傅',
    cover: randomImage(),
    icon: '📦',
    price: '58',
    desc: '精美串珠纸巾盒，实用美观。',
    materials: '亚克力珠子+鱼线',
    size: '25cm×12cm×10cm'
  },
  {
    id: 8,
    category: 'weaving',
    title: '披肩式围巾',
    author: '周阿姨',
    cover: randomImage(),
    icon: '🧣',
    price: '168',
    desc: '宽大披肩式围巾，优雅大方。',
    materials: '羊绒混纺',
    size: '200cm×70cm'
  }
])

const filteredList = computed(() => {
  if (activeTab.value === 'all') {
    return handcrafts.value
  }
  return handcrafts.value.filter(item => item.category === activeTab.value)
})

function goToDetail(item) {
  router.push(`/handcraft/${item.id}`)
}
</script>
