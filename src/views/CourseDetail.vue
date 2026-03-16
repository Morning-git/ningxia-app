<template>
  <div class="pb-20">
    <!-- 标题栏 -->
    <div class="flex items-center gap-3 px-4 py-3 bg-white border-b border-gray-100 sticky top-0 z-10">
      <span class="text-2xl text-gray-800 cursor-pointer" @click="$router.back()">&#8249;</span>
      <h3 class="text-base font-semibold text-gray-800">课程详情</h3>
    </div>

    <div v-if="course">
      <!-- 课程头部 -->
      <div class="p-4 bg-white">
        <div 
          class="w-full h-40 rounded-xl flex items-center justify-center mb-4"
          :class="getIconBg(course.icon)"
        >
          <svg class="w-16 h-16 text-white" viewBox="0 0 24 24" fill="currentColor">
            <path d="M21 3H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H3V5h18v14zM9.5 12.5l2.5 3.01L14.5 12l4.5 6H5l4.5-6z"/>
          </svg>
        </div>
        
        <h2 class="text-xl font-semibold text-gray-800 mb-2">{{ course.title }}</h2>
        
        <div class="flex flex-wrap gap-2 mb-4">
          <span class="text-[12px] px-2 py-1 bg-green-50 text-green-600 rounded">免费</span>
          <span class="text-[12px] px-2 py-1 bg-blue-50 text-blue-600 rounded">{{ course.duration }}</span>
          <span class="text-[12px] px-2 py-1 bg-orange-50 text-orange-500 rounded">{{ course.students }}人已报名</span>
        </div>
      </div>

      <!-- 课程介绍 -->
      <div class="mt-2 p-4 bg-white">
        <h4 class="text-sm font-semibold text-gray-800 mb-2 pl-3 border-l-2 border-primary">课程介绍</h4>
        <p class="text-sm text-gray-600 leading-relaxed">{{ course.desc }}</p>
      </div>

      <!-- 课程大纲 -->
      <div class="mt-2 p-4 bg-white">
        <h4 class="text-sm font-semibold text-gray-800 mb-3 pl-3 border-l-2 border-primary">课程大纲</h4>
        <div class="space-y-3">
          <div 
            v-for="(chapter, index) in courseOutline" 
            :key="index"
            class="flex gap-3"
          >
            <div class="w-6 h-6 rounded-full bg-primary/10 text-primary text-xs flex items-center justify-center flex-shrink-0">
              {{ index + 1 }}
            </div>
            <div class="flex-1">
              <p class="text-sm font-medium text-gray-800">{{ chapter.title }}</p>
              <p class="text-xs text-gray-500 mt-1">{{ chapter.desc }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- 授课老师 -->
      <div class="mt-2 p-4 bg-white">
        <h4 class="text-sm font-semibold text-gray-800 mb-3 pl-3 border-l-2 border-primary">授课老师</h4>
        <div class="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
          <div class="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-primary-light flex items-center justify-center text-white font-bold">
            {{ course.teacher?.charAt(0) || '张' }}
          </div>
          <div>
            <p class="text-sm font-semibold text-gray-800">{{ course.teacher || '张老师' }}</p>
            <p class="text-xs text-gray-500">{{ course.teacherTitle || '高级讲师' }}</p>
          </div>
        </div>
      </div>

      <!-- 课程特色 -->
      <div class="mt-2 p-4 bg-white">
        <h4 class="text-sm font-semibold text-gray-800 mb-3 pl-3 border-l-2 border-primary">课程特色</h4>
        <div class="grid grid-cols-2 gap-3">
          <div class="flex items-center gap-2 p-2 bg-green-50 rounded-lg">
            <span class="text-green-500">✓</span>
            <span class="text-xs text-gray-600">零基础入门</span>
          </div>
          <div class="flex items-center gap-2 p-2 bg-green-50 rounded-lg">
            <span class="text-green-500">✓</span>
            <span class="text-xs text-gray-600">实操教学</span>
          </div>
          <div class="flex items-center gap-2 p-2 bg-green-50 rounded-lg">
            <span class="text-green-500">✓</span>
            <span class="text-xs text-gray-600">证书认证</span>
          </div>
          <div class="flex items-center gap-2 p-2 bg-green-50 rounded-lg">
            <span class="text-green-500">✓</span>
            <span class="text-xs text-gray-600">推荐就业</span>
          </div>
        </div>
      </div>

      <!-- 学员评价 -->
      <div class="mt-2 p-4 bg-white">
        <h4 class="text-sm font-semibold text-gray-800 mb-3 pl-3 border-l-2 border-primary">学员评价</h4>
        <div class="space-y-3">
          <div class="p-3 bg-gray-50 rounded-lg">
            <div class="flex items-center gap-2 mb-2">
              <span class="text-xs text-gray-400">⭐⭐⭐⭐⭐</span>
              <span class="text-xs text-gray-500">2024-01-10</span>
            </div>
            <p class="text-sm text-gray-600">课程内容很实用，老师讲解清晰，推荐！</p>
          </div>
          <div class="p-3 bg-gray-50 rounded-lg">
            <div class="flex items-center gap-2 mb-2">
              <span class="text-xs text-gray-400">⭐⭐⭐⭐⭐</span>
              <span class="text-xs text-gray-500">2024-01-08</span>
            </div>
            <p class="text-sm text-gray-600">学完找到了工作，非常感谢平台！</p>
          </div>
        </div>
      </div>

      <!-- 报名按钮 -->
      <div class="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[480px] bg-white border-t border-gray-100 p-4">
        <button 
          class="w-full py-3 rounded-full text-sm font-medium bg-primary text-white"
          @click="handleApply"
        >
          立即报名
        </button>
      </div>
    </div>

    <!-- 不存在 -->
    <div v-else class="p-4 text-center text-gray-400">
      <p>课程不存在</p>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { trainingData } from '../data/mock'

const route = useRoute()
const router = useRouter()

const course = computed(() => {
  const id = parseInt(route.params.id)
  return trainingData.find(c => c.id === id) || null
})

const courseOutline = computed(() => {
  if (!course.value) return []
  const outlines = {
    1: [
      { title: '第一章：电商基础入门', desc: '了解电商行业现状与发展趋势' },
      { title: '第二章：店铺开设', desc: '如何在主流平台开设自己的店铺' },
      { title: '第三章：商品上架', desc: '商品标题、详情页制作技巧' },
      { title: '第四章：店铺运营', desc: '流量获取与转化提升方法' }
    ],
    2: [
      { title: '第一章：计算机基础知识', desc: '认识计算机硬件与软件' },
      { title: '第二章：Windows系统操作', desc: '文件管理与系统设置' },
      { title: '第三章：Office办公软件', desc: 'Word、Excel、PPT入门' },
      { title: '第四章：网络基础', desc: '上网设置与邮件收发' }
    ],
    3: [
      { title: '第一章：编织基础', desc: '了解编织材料和工具' },
      { title: '第二章：基础针法', desc: '学习各种编织基本针法' },
      { title: '第三章：成品制作', desc: '完成简单的编织作品' },
      { title: '第四章：作品展示', desc: '摄影与线上销售技巧' }
    ],
    4: [
      { title: '第一章：中医基础理论', desc: '了解中医经络学' },
      { title: '第二章：按摩手法', desc: '学习推、拿、揉、捏等手法' },
      { title: '第三章：常见病症调理', desc: '肩颈、腰腿疼痛调理' },
      { title: '第四章：实操练习', desc: '真人实操训练' }
    ]
  }
  return outlines[course.value?.id] || outlines[1]
})

function getIconBg(icon) {
  const colors = {
    'gradient-purple': 'bg-gradient-to-br from-purple-500 to-purple-600',
    'gradient-pink': 'bg-gradient-to-br from-pink-500 to-pink-600',
    'gradient-blue': 'bg-gradient-to-br from-blue-500 to-blue-600',
    'gradient-orange': 'bg-gradient-to-br from-orange-500 to-orange-600'
  }
  return colors[icon] || 'bg-gradient-to-br from-primary to-primary-light'
}

function handleApply() {
  alert(`您已报名「${course.value.title}」课程！\n\n工作人员将尽快与您联系，确认培训时间和地点。\n\n如有疑问，请拨打服务热线：0951-12345678`)
  router.back()
}
</script>
