<template>
  <div class="min-h-screen bg-gray-50">
    <!-- 顶部导航 -->
    <div class="bg-white px-4 py-3 flex items-center gap-3 sticky top-0 z-10 border-b border-gray-100">
      <span class="text-2xl text-gray-600 cursor-pointer" @click="$router.back()">&#8249;</span>
      <h1 class="text-lg font-semibold text-gray-800">浏览记录</h1>
      <button 
        v-if="history.length > 0"
        class="ml-auto text-sm text-gray-500"
        @click="clearHistory"
      >
        清空
      </button>
    </div>

    <!-- 浏览记录列表 -->
    <div class="p-4">
      <div v-if="history.length === 0" class="text-center py-12">
        <div class="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg class="w-10 h-10 text-gray-400" viewBox="0 0 24 24" fill="currentColor">
            <path d="M13 3c-4.97 0-9 4.03-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42C8.27 19.99 10.51 21 13 21c4.97 0 9-4.03 9-9s-4.03-9-9-9zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8H12z"/>
          </svg>
        </div>
        <p class="text-gray-500 text-sm">暂无浏览记录</p>
      </div>

      <div v-else class="flex flex-col gap-3">
        <div 
          v-for="item in history" 
          :key="item.id"
          class="bg-white rounded-xl p-4 cursor-pointer"
          @click="goToJob(item.id)"
        >
          <h4 class="text-sm font-semibold text-gray-800">{{ item.title }}</h4>
          <p class="text-xs text-gray-500 mt-1">{{ item.company }}</p>
          <div class="flex justify-between items-center mt-2">
            <span class="text-xs text-gray-400">{{ item.time }}</span>
            <span class="text-sm text-primary">{{ item.salary }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// 模拟浏览记录数据
const history = ref([
  { id: 1, title: '行政文员', company: '宁夏华兴环保科技有限公司', salary: '3000-4000元/月', time: '今天 14:30' },
  { id: 2, title: '数据录入员', company: '宁夏智诚信息咨询有限公司', salary: '2500-3500元/月', time: '今天 10:15' },
  { id: 3, title: '客服专员', company: '宁夏京东电商服务', salary: '2800-4000元/月', time: '昨天 16:45' }
])

function goToJob(id) {
  router.push(`/job/${id}`)
}

function clearHistory() {
  if (confirm('确定要清空浏览记录吗？')) {
    history.value = []
  }
}
</script>
