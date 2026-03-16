<template>
  <div class="pb-4">
    <!-- 标题栏 -->
    <div class="flex items-center gap-3 px-4 py-3 bg-white border-b border-gray-100 sticky top-0 z-10">
      <span class="text-2xl text-gray-800 cursor-pointer" @click="$router.back()">&#8249;</span>
      <h3 class="text-base font-semibold text-gray-800">商品详情</h3>
    </div>

    <!-- 商品详情 -->
    <div v-if="product">
      <!-- 商品图片 -->
      <div class="w-full bg-gray-100 relative" style="padding-bottom: 100%;">
        <img 
          v-if="product.cover"
          :src="product.cover" 
          :alt="product.title"
          class="absolute inset-0 w-full h-full object-cover"
        />
        <span v-else class="absolute inset-0 flex items-center justify-center text-6xl">{{ product.icon }}</span>
      </div>

      <!-- 商品信息 -->
      <div class="p-4 bg-white">
        <p class="text-xl text-red-500 font-bold mb-2">¥{{ product.price }}</p>
        <h1 class="text-base font-semibold text-gray-800 mb-2">{{ product.title }}</h1>
        <div class="flex items-center gap-2 text-xs text-gray-500 mb-3">
          <span>作者：{{ product.author }}</span>
          <span class="text-gray-300">|</span>
          <span>{{ product.disability }}</span>
        </div>
        <div class="flex items-center gap-4 text-xs text-gray-500 mb-3">
          <span>材质：{{ product.materials }}</span>
          <span>尺寸：{{ product.size }}</span>
        </div>
        <p class="text-sm text-gray-600 leading-relaxed">{{ product.desc }}</p>
      </div>

      <!-- 联系方式表单 -->
      <div class="p-4 bg-white mt-2">
        <h3 class="text-sm font-semibold text-gray-800 mb-3">联系商家</h3>
        <div class="space-y-3">
          <div>
            <label class="text-xs text-gray-600 mb-1 block">您的姓名</label>
            <input 
              v-model="contactForm.name"
              type="text" 
              placeholder="请输入您的姓名"
              class="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary"
            />
          </div>
          <div>
            <label class="text-xs text-gray-600 mb-1 block">联系电话</label>
            <input 
              v-model="contactForm.phone"
              type="tel" 
              placeholder="请输入您的联系电话"
              class="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary"
            />
          </div>
          <div>
            <label class="text-xs text-gray-600 mb-1 block">留言</label>
            <textarea 
              v-model="contactForm.message"
              placeholder="请输入您的留言，如购买意向、颜色选择等"
              rows="3"
              class="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary resize-none"
            ></textarea>
          </div>
          <button 
            class="w-full py-3 bg-primary text-white rounded-lg text-sm font-medium"
            @click="submitContact"
          >
            提交信息
          </button>
          <p class="text-[10px] text-gray-400 text-center">提交后商家会尽快与您联系</p>
        </div>
      </div>

      <!-- 更多商品 -->
      <div class="p-4 bg-white mt-2">
        <h3 class="text-sm font-semibold text-gray-800 mb-3">更多商品</h3>
        <div class="grid grid-cols-2 gap-3">
          <div 
            v-for="item in moreProducts" 
            :key="item.id"
            class="bg-white rounded-xl overflow-hidden shadow-sm cursor-pointer"
            @click="goToDetail(item.id)"
          >
            <div class="w-full bg-gray-100 relative" style="padding-bottom: 100%;">
              <img 
                v-if="item.cover"
                :src="item.cover" 
                :alt="item.title"
                class="w-full h-full object-cover"
              />
              <span v-else class="absolute inset-0 flex items-center justify-center text-2xl">{{ item.icon }}</span>
            </div>
            <div class="p-2">
              <h4 class="text-xs font-semibold text-gray-800 mb-1" style="display: -webkit-box; -webkit-line-clamp: 1; -webkit-box-orient: vertical; overflow: hidden;">{{ item.title }}</h4>
              <p class="text-xs text-red-500 font-medium">¥{{ item.price }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 不存在 -->
    <div v-else class="p-4 text-center text-gray-400">
      <p>商品不存在</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const contactForm = ref({
  name: '',
  phone: '',
  message: ''
})

const handcrafts = ref([
  {
    id: 1,
    category: 'weaving',
    title: '羊毛编织围巾',
    author: '李阿姨',
    disability: '肢体残疾4级',
    cover: 'https://picsum.photos/400/400?random=50',
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
    disability: '听力残疾3级',
    cover: 'https://picsum.photos/400/400?random=51',
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
    disability: '言语残疾4级',
    cover: 'https://picsum.photos/400/400?random=52',
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
    disability: '视力残疾4级',
    cover: 'https://picsum.photos/400/400?random=53',
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
    disability: '肢体残疾3级',
    cover: 'https://picsum.photos/400/400?random=54',
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
    disability: '智力残疾4级',
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
    disability: '肢体残疾2级',
    cover: 'https://picsum.photos/400/400?random=55',
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
    disability: '听力残疾4级',
    cover: 'https://picsum.photos/400/400?random=56',
    icon: '🧣',
    price: '168',
    desc: '宽大披肩式围巾，优雅大方。',
    materials: '羊绒混纺',
    size: '200cm×70cm'
  }
])

const product = computed(() => {
  const id = parseInt(route.params.id)
  return handcrafts.value.find(p => p.id === id)
})

const moreProducts = computed(() => {
  if (!product.value) return []
  return handcrafts.value.filter(p => p.id !== product.value.id).slice(0, 4)
})

function submitContact() {
  if (!contactForm.value.name || !contactForm.value.phone) {
    alert('请填写姓名和联系电话')
    return
  }
  alert(`信息已提交！\n\n姓名：${contactForm.value.name}\n电话：${contactForm.value.phone}\n留言：${contactForm.value.message || '无'}\n\n商家会尽快与您联系！`)
  contactForm.value = { name: '', phone: '', message: '' }
}

function goToDetail(id) {
  router.push(`/handcraft/${id}`)
}
</script>
