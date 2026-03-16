<template>
  <div class="min-h-screen bg-gray-50 pb-4">
    <!-- 顶部导航 -->
    <div class="bg-white px-4 py-3 flex items-center gap-3 sticky top-0 z-10 border-b border-gray-100">
      <span class="text-2xl text-gray-600 cursor-pointer" @click="$router.back()">&#8249;</span>
      <h1 class="text-lg font-semibold text-gray-800">我的收藏</h1>
    </div>

    <!-- 收藏列表 -->
    <div class="p-4">
      <div v-if="collections.length === 0" class="text-center py-12">
        <div class="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg class="w-10 h-10 text-gray-400" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
          </svg>
        </div>
        <p class="text-gray-500 text-sm mb-4">暂无收藏职位</p>
        <button 
          class="px-6 py-2 bg-primary text-white text-sm rounded-full"
          @click="$router.push('/jobs')"
        >
          去浏览
        </button>
      </div>

      <div v-else class="flex flex-col gap-3">
        <JobCard 
          v-for="job in collections" 
          :key="job.id" 
          :job="job"
          @click="goToJob(job.id)"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '../store'
import { jobsData } from '../data/mock'
import JobCard from '../components/common/JobCard.vue'

const router = useRouter()
const userStore = useUserStore()

const collections = computed(() => {
  return jobsData.filter(job => userStore.collections.includes(job.id))
})

function goToJob(id) {
  router.push(`/job/${id}`)
}
</script>
