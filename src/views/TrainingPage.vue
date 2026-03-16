<template>
  <div class="pb-4">
    <!-- 标题栏 -->
    <div class="flex items-center gap-3 px-4 py-3 bg-white border-b border-gray-100 sticky top-0 z-10">
      <span class="text-2xl text-gray-800 cursor-pointer" @click="$router.back()">&#8249;</span>
      <h3 class="text-base font-semibold text-gray-800">职业培训</h3>
    </div>

    <div class="p-4">
      <div class="bg-gradient-to-r from-cyan-500 to-cyan-600 rounded-xl p-4 text-white mb-4">
        <h3 class="text-base font-semibold mb-1">免费职业技能培训</h3>
        <p class="text-xs opacity-80">提升技能，增强就业竞争力</p>
      </div>

      <h4 class="text-sm font-semibold text-gray-800 mb-3">热门培训课程</h4>
      <div class="flex flex-col gap-3">
        <div 
          v-for="course in trainingData" 
          :key="course.id"
          class="bg-white rounded-xl p-4 shadow-sm cursor-pointer"
          @click="goToCourse(course.id)"
        >
          <div class="flex items-center gap-3">
            <div 
              class="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0"
              :class="getIconBg(course.icon)"
            >
              <svg class="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M21 3H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H3V5h18v14zM9.5 12.5l2.5 3.01L14.5 12l4.5 6H5l4.5-6z"/>
              </svg>
            </div>
            <div class="flex-1">
              <h4 class="text-sm font-semibold text-gray-800 mb-1">{{ course.title }}</h4>
              <p class="text-xs text-gray-500 mb-1">{{ course.desc }}</p>
              <div class="flex gap-2">
                <span class="text-[10px] px-2 py-0.5 bg-green-50 text-green-600 rounded">免费</span>
                <span class="text-[10px] px-2 py-0.5 bg-gray-100 text-gray-500 rounded">{{ course.duration }}</span>
              </div>
            </div>
            <button 
              class="px-3 py-1 bg-primary text-white rounded-full text-xs"
              @click.stop="handleApply(course.title)"
            >
              报名
            </button>
          </div>
        </div>
      </div>

      <h4 class="text-sm font-semibold text-gray-800 mb-3 mt-6">培训优势</h4>
      <div class="grid grid-cols-2 gap-3">
        <div class="p-3 bg-white rounded-xl text-center">
          <div class="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-2">
            <svg class="w-5 h-5 text-green-500" viewBox="0 0 24 24" fill="currentColor"><path d="M21 5c-1.11-.35-2.33-.5-3.5-.5-1.95 0-4.05.4-5.5 1.5-1.45-1.1-3.55-1.5-5.5-1.5S2.45 4.9 1 6v14.65c0 .25.25.5.5.5.1 0 .15-.05.25-.05C3.1 20.45 5.05 20 6.5 20c1.95 0 4.05.4 5.5 1.5 1.35-.85 3.8-1.5 5.5-1.5 1.65 0 3.35.3 4.75 1.05.1.05.15.05.25.05.25 0 .5-.25.5-.5V6c-.6-.45-1.25-.75-2-1zm0 13.5c-1.1-.35-2.3-.5-3.5-.5-1.7 0-4.15.65-5.5 1.5V8c1.35-.85 3.8-1.5 5.5-1.5 1.2 0 2.4.15 3.5.5v11.5z"/></svg>
          </div>
          <p class="text-xs font-semibold text-gray-800">免费培训</p>
          <p class="text-[10px] text-gray-500">全程免费</p>
        </div>
        <div class="p-3 bg-white rounded-xl text-center">
          <div class="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center mx-auto mb-2">
            <svg class="w-5 h-5 text-blue-500" viewBox="0 0 24 24" fill="currentColor"><path d="M21 5c-1.11-.35-2.33-.5-3.5-.5-1.95 0-4.05.4-5.5 1.5-1.45-1.1-3.55-1.5-5.5-1.5S2.45 4.9 1 6v14.65c0 .25.25.5.5.5.1 0 .15-.05.25-.05C3.1 20.45 5.05 20 6.5 20c1.95 0 4.05.4 5.5 1.5 1.35-.85 3.8-1.5 5.5-1.5 1.65 0 3.35.3 4.75 1.05.1.05.15.05.25.05.25 0 .5-.25.5-.5V6c-.6-.45-1.25-.75-2-1zm0 13.5c-1.1-.35-2.3-.5-3.5-.5-1.7 0-4.15.65-5.5 1.5V8c1.35-.85 3.8-1.5 5.5-1.5 1.2 0 2.4.15 3.5.5v11.5z"/></svg>
          </div>
          <p class="text-xs font-semibold text-gray-800">证书认证</p>
          <p class="text-[10px] text-gray-500">颁发证书</p>
        </div>
        <div class="p-3 bg-white rounded-xl text-center">
          <div class="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center mx-auto mb-2">
            <svg class="w-5 h-5 text-purple-500" viewBox="0 0 24 24" fill="currentColor"><path d="M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-6 0h-4V4h4v2z"/></svg>
          </div>
          <p class="text-xs font-semibold text-gray-800">推荐就业</p>
          <p class="text-[10px] text-gray-500">对接企业</p>
        </div>
        <div class="p-3 bg-white rounded-xl text-center">
          <div class="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center mx-auto mb-2">
            <svg class="w-5 h-5 text-orange-500" viewBox="0 0 24 24" fill="currentColor"><path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z"/></svg>
          </div>
          <p class="text-xs font-semibold text-gray-800">培训补贴</p>
          <p class="text-[10px] text-gray-500">额外收入</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { trainingData } from '../data/mock'

const router = useRouter()

function getIconBg(icon) {
  const colors = {
    'gradient-purple': 'bg-gradient-to-br from-purple-500 to-purple-600',
    'gradient-pink': 'bg-gradient-to-br from-pink-500 to-pink-600',
    'gradient-blue': 'bg-gradient-to-br from-blue-500 to-blue-600',
    'gradient-orange': 'bg-gradient-to-br from-orange-500 to-orange-600'
  }
  return colors[icon] || 'bg-gray-500'
}

function goToCourse(id) {
  router.push(`/course/${id}`)
}

function handleApply(name) {
  alert(`您已报名「${name}」课程！\n\n工作人员将尽快与您联系确认培训事宜。`)
}
</script>
