<template>
  <div class="min-h-screen bg-gray-50 pb-20">
    <!-- 顶部导航 -->
    <div class="bg-white px-4 py-3 flex items-center gap-3 sticky top-0 z-10 border-b border-gray-100">
      <span class="text-2xl text-gray-600 cursor-pointer" @click="$router.back()">&#8249;</span>
      <h1 class="text-lg font-semibold text-gray-800">需求记录</h1>
    </div>

    <!-- 需求列表 -->
    <div class="p-4">
      <div v-if="demands.length === 0" class="text-center py-12">
        <div class="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg class="w-10 h-10 text-gray-400" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm2 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
          </svg>
        </div>
        <p class="text-gray-500 text-sm mb-4">暂无需求记录</p>
        <button 
          class="px-6 py-2 bg-primary text-white text-sm rounded-full"
          @click="showAdd = true"
        >
          提交需求
        </button>
      </div>

      <div v-else class="flex flex-col gap-3">
        <div 
          v-for="(item, index) in demands" 
          :key="index"
          class="bg-white rounded-xl p-4"
        >
          <div class="flex justify-between items-start mb-2">
            <h4 class="text-sm font-semibold text-gray-800">{{ item.type }}</h4>
            <span class="text-xs px-2 py-1 bg-yellow-50 text-yellow-600 rounded-full">{{ item.status }}</span>
          </div>
          <p class="text-sm text-gray-600 mt-2">{{ item.desc }}</p>
          <p class="text-xs text-gray-400 mt-3">提交时间：{{ item.time }}</p>
        </div>
      </div>
    </div>

    <!-- 添加需求按钮 -->
    <div v-if="demands.length > 0" class="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-100">
      <button 
        class="w-full py-3.5 bg-primary text-white rounded-xl text-sm font-medium"
        @click="showAdd = true"
      >
        + 提交新需求
      </button>
    </div>

    <!-- 添加需求弹窗 -->
    <div v-if="showAdd" class="fixed inset-0 bg-black/50 z-50 flex items-end">
      <div class="w-full max-w-[480px] mx-auto bg-white rounded-t-2xl p-4">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-base font-semibold text-gray-800">提交新需求</h3>
          <span class="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 cursor-pointer" @click="showAdd = false">×</span>
        </div>
        <div class="mb-4">
          <label class="block text-sm text-gray-600 mb-2">需求类型</label>
          <select v-model="newType" class="w-full px-3 py-3 border border-gray-200 rounded-lg text-sm bg-gray-50">
            <option value="">请选择需求类型</option>
            <option value="就业推荐">就业推荐</option>
            <option value="创业扶持">创业扶持</option>
            <option value="技能培训">技能培训</option>
            <option value="政策咨询">政策咨询</option>
          </select>
        </div>
        <div class="mb-4">
          <label class="block text-sm text-gray-600 mb-2">需求描述</label>
          <textarea v-model="newDesc" placeholder="请详细描述您的需求..." class="w-full px-3 py-3 border border-gray-200 rounded-lg text-sm h-24 resize-none"></textarea>
        </div>
        <button 
          class="w-full py-3.5 bg-primary text-white rounded-xl text-sm font-medium"
          @click="submitDemand"
        >
          提交
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useUserStore } from '../store'

const userStore = useUserStore()
const demands = ref([])
const showAdd = ref(false)
const newType = ref('')
const newDesc = ref('')

onMounted(() => {
  demands.value = [...userStore.demands]
})

function submitDemand() {
  if (!newType.value || !newDesc.value) {
    alert('请填写完整的需求信息')
    return
  }
  userStore.addDemand(newType.value, newDesc.value)
  demands.value = [...userStore.demands]
  showAdd.value = false
  newType.value = ''
  newDesc.value = ''
  alert('需求提交成功！')
}
</script>
