<template>
  <div class="pb-4">
    <!-- 标题栏 -->
    <div class="flex items-center gap-3 px-4 py-3 bg-white border-b border-gray-100 sticky top-0 z-10">
      <span class="text-2xl text-gray-800 cursor-pointer" @click="$router.back()">&#8249;</span>
      <h3 class="text-base font-semibold text-gray-800">网络招聘会</h3>
    </div>

    <!-- 顶部Banner -->
    <div class="p-5 pb-0">
      <h2 class="text-[#333333] text-lg font-semibold mb-2">网络招聘会  云端求职</h2>
      <p class="text-[#333333]/70 text-sm">足不出户找工作，企业HR在线直聊</p>
    </div>

    <!-- 招聘会列表 -->
    <div class="p-4">
      <div class="flex flex-col gap-4">
        <div 
          v-for="event in jobFairs" 
          :key="event.id"
          class="bg-white rounded-xl overflow-hidden shadow-sm cursor-pointer"
          @click="goToJobFair(event.id)"
        >
          <!-- 21:9 封面图 -->
          <div class="relative w-full" style="padding-bottom: 42.86%;">
            <img 
              :src="event.cover" 
              :alt="event.title"
              class="absolute inset-0 w-full h-full object-cover"
            />
            <!-- 状态标签 -->
            <span 
              class="absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-medium"
              :class="getStatusClass(event.status)"
            >
              {{ getStatusText(event.status) }}
            </span>
          </div>
          <!-- 招聘会信息 -->
          <div class="p-4">
            <h4 class="text-base font-semibold text-gray-800 mb-2">{{ event.title }}</h4>
            <div class="flex items-center gap-4 text-sm text-gray-500">
              <span class="flex items-center gap-1">
                <svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM9 10H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2z"/></svg>
                {{ event.startTime }}
              </span>
              <span class="flex items-center gap-1">
                <svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/></svg>
                {{ event.duration }}
              </span>
            </div>
            <div class="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
              <div class="flex items-center gap-2">
                <span class="text-xs text-gray-500">已有 <span class="text-primary font-medium">{{ event.joinedCount }}</span> 人参加</span>
              </div>
              <span class="text-primary text-sm font-medium">查看详情 →</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { randomImage } from '../utils/randomImage'

const router = useRouter()

const jobFairs = ref([
  {
    id: 1,
    title: '2024年春季残疾人专场招聘会',
    cover: randomImage(),
    startTime: '2024年3月20日 9:00',
    duration: '8小时',
    status: 'ongoing',
    joinedCount: 328
  },
  {
    id: 2,
    title: '宁夏残疾人就业援助月专场',
    cover: randomImage(),
    startTime: '2024年3月25日 10:00',
    duration: '6小时',
    status: 'upcoming',
    joinedCount: 156
  },
  {
    id: 3,
    title: '数字经济专场网络招聘会',
    cover: randomImage(),
    startTime: '2024年4月1日 9:00',
    duration: '全天',
    status: 'upcoming',
    joinedCount: 89
  },
  {
    id: 4,
    title: '2024届残疾毕业生专场',
    cover: randomImage(),
    startTime: '2024年2月15日 9:00',
    duration: '8小时',
    status: 'ended',
    joinedCount: 512
  },
  {
    id: 5,
    title: '手工艺制作专场招聘会',
    cover: randomImage(),
    startTime: '2024年4月10日 14:00',
    duration: '4小时',
    status: 'upcoming',
    joinedCount: 45
  }
])

function getStatusClass(status) {
  switch(status) {
    case 'ongoing':
      return 'bg-green-500 text-white'
    case 'upcoming':
      return 'bg-blue-500 text-white'
    case 'ended':
      return 'bg-gray-400 text-white'
    default:
      return 'bg-gray-100 text-gray-600'
  }
}

function getStatusText(status) {
  switch(status) {
    case 'ongoing':
      return '进行中'
    case 'upcoming':
      return '即将开始'
    case 'ended':
      return '已结束'
    default:
      return ''
  }
}

function goToJobFair(id) {
  router.push(`/job-fair/${id}`)
}
</script>
