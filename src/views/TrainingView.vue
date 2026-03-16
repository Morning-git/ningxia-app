<template>
  <div class="pb-20 bg-gray-50 min-h-screen">
    <!-- 顶部标题区 -->
    <div class="bg-gradient-to-r from-primary to-primary-light px-4 pt-8 pb-6">
      <h1 class="text-xl font-bold text-white mb-2">就业指导</h1>
      <p class="text-white/80 text-sm">视频+图文，全方位提升就业技能</p>
    </div>

    <!-- 搜索栏 -->
    <div class="px-4 -mt-3">
      <div class="bg-white rounded-xl p-3 shadow-md flex items-center gap-3">
        <svg class="w-5 h-5 text-gray-400" viewBox="0 0 24 24" fill="currentColor">
          <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
        </svg>
        <input 
          v-model="searchKeyword"
          type="text" 
          placeholder="搜索课程..."
          class="flex-1 text-sm outline-none"
        />
      </div>
    </div>

    <!-- 快捷入口 -->
    <div class="px-4 mt-4">
      <div class="grid grid-cols-4 gap-3">
        <div 
          v-for="item in quickAccess" 
          :key="item.name"
          class="flex flex-col items-center gap-2 py-3 cursor-pointer"
          @click="handleQuickAccess(item)"
        >
          <div 
            class="w-12 h-12 rounded-xl flex items-center justify-center"
            :class="item.bgColor"
          >
            <svg class="w-6 h-6" :class="item.iconColor" viewBox="0 0 24 24" fill="currentColor">
              <path :d="item.icon"/>
            </svg>
          </div>
          <span class="text-xs text-gray-600">{{ item.name }}</span>
        </div>
      </div>
    </div>

    <!-- 课程类型切换 -->
    <div class="px-4 mt-4">
      <div class="bg-white rounded-xl p-1.5 flex">
        <button 
          v-for="type in courseTypes" 
          :key="type.value"
          class="flex-1 py-2.5 rounded-lg text-sm font-medium transition-all"
          :class="activeType === type.value ? 'bg-primary text-white shadow-sm' : 'text-gray-600'"
          @click="activeType = type.value"
        >
          <span class="flex items-center justify-center gap-2">
            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path :d="type.icon"/>
            </svg>
            {{ type.label }}
          </span>
        </button>
      </div>
    </div>

    <!-- 视频课程区域 -->
    <div v-if="activeType === 'video'" class="px-4 mt-4">
      <!-- 推荐视频 -->
      <div v-if="!searchKeyword" class="mb-4">
        <div class="flex justify-between items-center mb-3">
          <h3 class="text-base font-semibold text-gray-800">推荐学习</h3>
        </div>
        <div class="relative rounded-xl overflow-hidden cursor-pointer" @click="playVideo(featuredVideo)">
          <div class="aspect-video bg-gradient-to-br from-primary to-primary-light flex items-center justify-center relative">
            <img v-if="featuredVideo.cover" :src="featuredVideo.cover" class="absolute inset-0 w-full h-full object-cover" />
            <div class="absolute inset-0 bg-black/20"></div>
            <div class="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center z-10">
              <svg class="w-8 h-8 text-primary ml-1" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7z"/>
              </svg>
            </div>
            <span class="absolute bottom-3 right-3 px-2 py-1 bg-black/60 text-white text-xs rounded">
              {{ featuredVideo.duration }}
            </span>
          </div>
          <div class="p-3 bg-white">
            <h4 class="text-sm font-semibold text-gray-800">{{ featuredVideo.title }}</h4>
            <p class="text-xs text-gray-500 mt-1">{{ featuredVideo.desc }}</p>
            <div class="flex items-center gap-3 mt-2 text-[11px] text-gray-400">
              <span>{{ featuredVideo.views }}次观看</span>
              <span>{{ featuredVideo.time }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 视频分类筛选 -->
      <div class="flex gap-2 overflow-x-auto pb-3 scrollbar-hide">
        <button 
          v-for="cat in videoCategories" 
          :key="cat.value"
          class="px-4 py-2 rounded-full text-sm whitespace-nowrap transition-all"
          :class="activeVideoCategory === cat.value ? 'bg-primary text-white' : 'bg-white text-gray-600'"
          @click="activeVideoCategory = cat.value"
        >
          {{ cat.label }}
        </button>
      </div>

      <!-- 视频列表 -->
      <div class="flex flex-col gap-3">
        <div 
          v-for="video in filteredVideos" 
          :key="video.id"
          class="bg-white rounded-xl overflow-hidden shadow-sm cursor-pointer"
          @click="playVideo(video)"
        >
          <div class="flex p-3 gap-3">
            <!-- 视频封面 -->
            <div class="w-32 h-20 rounded-lg bg-gradient-to-br flex items-center justify-center relative flex-shrink-0"
              :class="video.bgColor || 'from-gray-400 to-gray-600'"
            >
              <img v-if="video.cover" :src="video.cover" class="absolute inset-0 w-full h-full object-cover rounded-lg" />
              <div class="absolute inset-0 bg-black/20 rounded-lg"></div>
              <div class="w-8 h-8 rounded-full bg-white/90 flex items-center justify-center z-10">
                <svg class="w-4 h-4 text-gray-700 ml-0.5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              </div>
              <span class="absolute bottom-1 right-1 px-1.5 py-0.5 bg-black/60 text-white text-[10px] rounded">
                {{ video.duration }}
              </span>
            </div>
            <!-- 视频信息 -->
            <div class="flex-1 min-w-0">
              <h4 class="text-sm font-semibold text-gray-800 line-clamp-2">{{ video.title }}</h4>
              <p class="text-xs text-gray-500 mt-1 line-clamp-1">{{ video.desc }}</p>
              <div class="flex items-center gap-3 mt-2 text-[11px] text-gray-400">
                <span class="flex items-center gap-1">
                  <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
                  </svg>
                  {{ video.views }}
                </span>
                <span>{{ video.time }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 空状态 -->
      <div v-if="filteredVideos.length === 0" class="py-10 text-center">
        <div class="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
          <svg class="w-10 h-10 text-gray-400" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z"/>
          </svg>
        </div>
        <p class="text-gray-400 text-sm">暂无相关视频课程</p>
      </div>
    </div>

    <!-- 图文课程区域 -->
    <div v-else class="px-4 mt-4">
      <!-- 图文分类筛选 -->
      <div class="flex gap-2 overflow-x-auto pb-3 scrollbar-hide">
        <button 
          v-for="cat in articleCategories" 
          :key="cat.value"
          class="px-4 py-2 rounded-full text-sm whitespace-nowrap transition-all"
          :class="activeArticleCategory === cat.value ? 'bg-primary text-white' : 'bg-white text-gray-600'"
          @click="activeArticleCategory = cat.value"
        >
          {{ cat.label }}
        </button>
      </div>

      <!-- 图文列表 -->
      <div class="flex flex-col gap-3">
        <div 
          v-for="article in filteredArticles" 
          :key="article.id"
          class="bg-white rounded-xl overflow-hidden shadow-sm cursor-pointer"
          @click="viewArticle(article)"
        >
          <!-- 文章封面图 -->
          <div v-if="article.cover" class="w-full h-40 relative">
            <img :src="article.cover" class="w-full h-full object-cover" />
            <span class="absolute top-2 left-2 px-2 py-1 bg-white/90 text-gray-700 text-[10px] rounded-full">
              {{ article.categoryLabel }}
            </span>
          </div>
          <!-- 文章内容 -->
          <div class="p-3">
            <h4 class="text-sm font-semibold text-gray-800 line-clamp-2">{{ article.title }}</h4>
            <p class="text-xs text-gray-500 mt-2 line-clamp-3 leading-relaxed">{{ article.summary }}</p>
            
            <!-- 图片预览（多图文章显示） -->
            <div v-if="article.images && article.images.length > 0" class="flex gap-2 mt-3 overflow-x-auto scrollbar-hide">
              <img 
                v-for="(img, idx) in article.images.slice(0, 3)" 
                :key="idx"
                :src="img" 
                class="w-16 h-16 rounded-lg object-cover flex-shrink-0"
              />
              <div v-if="article.images.length > 3" class="w-16 h-16 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0">
                <span class="text-xs text-gray-500">+{{ article.images.length - 3 }}</span>
              </div>
            </div>

            <div class="flex items-center justify-between mt-3">
              <div class="flex items-center gap-3 text-[11px] text-gray-400">
                <span class="flex items-center gap-1">
                  <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
                  </svg>
                  {{ article.views }}
                </span>
                <span class="flex items-center gap-1">
                  <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M21 6h-2v9H6v2c0 .55.45 1 1 1h11l4 4V7c0-.55-.45-1-1-1zm-4 6V3c0-.55-.45-1-1-1H3c-.55 0-1 .45-1 1v14l4-4h10c.55 0 1-.45 1-1z"/>
                  </svg>
                  {{ article.comments }}
                </span>
              </div>
              <span class="text-xs text-primary">阅读全文 ></span>
            </div>
          </div>
        </div>
      </div>

      <!-- 空状态 -->
      <div v-if="filteredArticles.length === 0" class="py-10 text-center">
        <div class="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
          <svg class="w-10 h-10 text-gray-400" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
          </svg>
        </div>
        <p class="text-gray-400 text-sm">暂无相关图文课程</p>
      </div>
    </div>

    <!-- 视频播放弹窗 -->
    <div v-if="showVideoPlayer" class="fixed inset-0 bg-black/90 z-50 flex flex-col">
      <!-- 视频播放器头部 -->
      <div class="flex items-center justify-between p-4 text-white">
        <span class="text-sm">{{ currentVideo?.title }}</span>
        <span class="w-8 h-8 flex items-center justify-center text-2xl" @click="closeVideo">×</span>
      </div>
      <!-- 视频播放区域 -->
      <div class="flex-1 flex items-center justify-center bg-black">
        <div class="w-full aspect-video bg-gray-900 flex items-center justify-center relative">
          <div class="text-center text-white/60">
            <svg class="w-16 h-16 mx-auto mb-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z"/>
            </svg>
            <p class="text-sm">模拟视频播放区域</p>
            <p class="text-xs mt-2">实际项目接入视频播放器组件</p>
          </div>
          <!-- 播放控制 -->
          <div class="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
            <div class="h-1 bg-white/30 rounded-full mb-4">
              <div class="h-full w-1/3 bg-white rounded-full"></div>
            </div>
            <div class="flex items-center justify-between text-white">
              <div class="flex items-center gap-4">
                <button @click="togglePlay">
                  <svg v-if="isPlaying" class="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
                  </svg>
                  <svg v-else class="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                </button>
                <span class="text-sm">05:23 / {{ currentVideo?.duration }}</span>
              </div>
              <button @click="toggleFullscreen">
                <svg class="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
      <!-- 课程信息 -->
      <div class="bg-white p-4 max-h-48 overflow-y-auto">
        <h3 class="text-base font-semibold text-gray-800">{{ currentVideo?.title }}</h3>
        <p class="text-sm text-gray-500 mt-2">{{ currentVideo?.desc }}</p>
        <div class="flex gap-4 mt-3">
          <button class="flex-1 py-2.5 bg-primary text-white rounded-lg text-sm">
            收藏课程
          </button>
          <button class="flex-1 py-2.5 bg-gray-100 text-gray-700 rounded-lg text-sm">
            分享课程
          </button>
        </div>
      </div>
    </div>

    <!-- 图文详情弹窗 -->
    <div v-if="showArticleDetail" class="fixed inset-0 bg-white z-50 overflow-y-auto">
      <!-- 顶部导航 -->
      <div class="sticky top-0 bg-white border-b border-gray-100 px-4 py-3 flex items-center gap-3">
        <span class="text-2xl text-gray-600" @click="closeArticle">&#8249;</span>
        <span class="text-base font-semibold text-gray-800 line-clamp-1">{{ currentArticle?.title }}</span>
      </div>
      <!-- 文章内容 -->
      <div class="p-4">
        <h1 class="text-lg font-bold text-gray-800">{{ currentArticle?.title }}</h1>
        <div class="flex items-center gap-3 mt-3 text-xs text-gray-400">
          <span>{{ currentArticle?.time }}</span>
          <span>{{ currentArticle?.views }}次阅读</span>
          <span class="px-2 py-0.5 bg-green-50 text-green-600 rounded">{{ currentArticle?.categoryLabel }}</span>
        </div>
        
        <!-- 正文内容 -->
        <div class="mt-4 space-y-4">
          <div v-for="(block, idx) in currentArticle?.content" :key="idx">
            <!-- 文本段落 -->
            <p v-if="block.type === 'text'" class="text-sm text-gray-700 leading-relaxed">
              {{ block.content }}
            </p>
            <!-- 图片 -->
            <div v-else-if="block.type === 'image'" class="my-4">
              <img :src="block.url" class="w-full rounded-lg" />
              <p v-if="block.caption" class="text-xs text-gray-400 text-center mt-2">{{ block.caption }}</p>
            </div>
            <!-- 小标题 -->
            <h3 v-else-if="block.type === 'heading'" class="text-base font-semibold text-gray-800 mt-6 mb-3">
              {{ block.content }}
            </h3>
            <!-- 列表 -->
            <ul v-else-if="block.type === 'list'" class="space-y-2">
              <li v-for="(item, i) in block.items" :key="i" class="flex gap-2 text-sm text-gray-700">
                <span class="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0"></span>
                <span>{{ item }}</span>
              </li>
            </ul>
            <!-- 提示框 -->
            <div v-else-if="block.type === 'tip'" class="bg-green-50 border-l-4 border-primary p-3 rounded-r-lg">
              <p class="text-sm text-green-700">{{ block.content }}</p>
            </div>
          </div>
        </div>

        <!-- 底部操作 -->
        <div class="flex gap-3 mt-8 mb-4">
          <button class="flex-1 py-3 bg-primary text-white rounded-lg text-sm">
            收藏文章
          </button>
          <button class="flex-1 py-3 bg-gray-100 text-gray-700 rounded-lg text-sm">
            分享文章
          </button>
        </div>
      </div>
    </div>

    <!-- 我的学习弹窗 -->
    <div v-if="showMyLearning" class="fixed inset-0 bg-black/50 z-50 flex items-end">
      <div class="w-full max-w-[480px] mx-auto bg-white rounded-t-2xl max-h-[80vh] overflow-y-auto">
        <div class="flex justify-between items-center p-4 border-b border-gray-100 sticky top-0 bg-white">
          <h3 class="text-base font-semibold text-gray-800">我的学习</h3>
          <span class="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 cursor-pointer" 
            @click="showMyLearning = false">×</span>
        </div>
        <div class="p-4">
          <!-- 学习统计 -->
          <div class="grid grid-cols-3 gap-3 mb-4">
            <div class="bg-green-50 rounded-xl p-3 text-center">
              <p class="text-lg font-bold text-green-600">{{ myLearning.videoCount }}</p>
              <p class="text-xs text-gray-600">视频课程</p>
            </div>
            <div class="bg-green-50 rounded-xl p-3 text-center">
              <p class="text-lg font-bold text-green-500">{{ myLearning.articleCount }}</p>
              <p class="text-xs text-gray-600">图文课程</p>
            </div>
            <div class="bg-green-50 rounded-xl p-3 text-center">
              <p class="text-lg font-bold text-green-600">{{ myLearning.learnedHours }}h</p>
              <p class="text-xs text-gray-600">学习时长</p>
            </div>
          </div>

          <!-- 最近学习 -->
          <h4 class="text-sm font-semibold text-gray-800 mb-3">最近学习</h4>
          <div v-if="myLearning.recent.length > 0" class="flex flex-col gap-3">
            <div 
              v-for="item in myLearning.recent" 
              :key="item.id"
              class="flex gap-3 bg-gray-50 rounded-xl p-3 cursor-pointer"
              @click="continueLearning(item)"
            >
              <div class="w-16 h-16 rounded-lg flex items-center justify-center flex-shrink-0"
                :class="item.type === 'video' ? 'bg-green-100' : 'bg-green-50'"
              >
                <svg class="w-8 h-8" :class="item.type === 'video' ? 'text-green-500' : 'text-primary'" viewBox="0 0 24 24" fill="currentColor">
                  <path :d="item.type === 'video' 
                    ? 'M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z'
                    : 'M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z'"
                  />
                </svg>
              </div>
              <div class="flex-1">
                <h5 class="text-sm font-semibold text-gray-800 line-clamp-1">{{ item.title }}</h5>
                <p class="text-xs text-gray-500 mt-0.5">学习至 {{ item.progress }}</p>
                <div class="flex items-center gap-2 mt-2">
                  <div class="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                    <div class="h-full bg-primary rounded-full" :style="{width: item.percent + '%'}"></div>
                  </div>
                  <span class="text-[10px] text-gray-400">{{ item.percent }}%</span>
                </div>
              </div>
            </div>
          </div>
          <div v-else class="py-8 text-center text-gray-400 text-sm">
            暂无学习记录
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '../store'

const router = useRouter()
const userStore = useUserStore()

// 搜索关键词
const searchKeyword = ref('')

// 当前课程类型
const activeType = ref('video')

// 当前分类
const activeVideoCategory = ref('all')
const activeArticleCategory = ref('all')

// 弹窗控制
const showVideoPlayer = ref(false)
const showArticleDetail = ref(false)
const showMyLearning = ref(false)
const currentVideo = ref(null)
const currentArticle = ref(null)
const isPlaying = ref(false)

// 快捷入口
const quickAccess = [
  { 
    name: '我的学习', 
    icon: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z',
    bgColor: 'bg-green-50',
    iconColor: 'text-green-500',
    action: 'myLearning'
  },
  { 
    name: '收藏夹', 
    icon: 'M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z',
    bgColor: 'bg-red-50',
    iconColor: 'text-red-500',
    action: 'favorite'
  },
  { 
    name: '学习打卡', 
    icon: 'M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM9 10H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm-8 4H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2z',
    bgColor: 'bg-green-50',
    iconColor: 'text-green-500',
    action: 'checkin'
  },
  { 
    name: '在线咨询', 
    icon: 'M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z',
    bgColor: 'bg-green-50',
    iconColor: 'text-green-600',
    action: 'consult'
  }
]

// 课程类型
const courseTypes = [
  { value: 'video', label: '视频课程', icon: 'M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z' },
  { value: 'article', label: '图文课程', icon: 'M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z' }
]

// 视频分类
const videoCategories = [
  { value: 'all', label: '全部' },
  { value: 'interview', label: '面试技巧' },
  { value: 'skill', label: '职业技能' },
  { value: 'career', label: '职场规划' },
  { value: 'psychology', label: '求职心理' }
]

// 图文分类
const articleCategories = [
  { value: 'all', label: '全部' },
  { value: 'resume', label: '简历制作' },
  { value: 'etiquette', label: '职场礼仪' },
  { value: 'communication', label: '沟通技巧' },
  { value: 'law', label: '劳动法规' }
]

// 推荐视频
const featuredVideo = {
  id: 0,
  title: '残疾人求职面试全攻略',
  desc: '从简历准备到面试技巧，全方位提升求职成功率',
  duration: '45:30',
  views: '1.2万',
  time: '3天前',
  cover: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=800&q=80',
  bgColor: 'from-primary to-primary-light'
}

// 视频课程数据
const videoCourses = [
  {
    id: 1,
    title: '面试自我介绍技巧',
    desc: '3分钟打造完美自我介绍',
    duration: '12:35',
    views: 3256,
    time: '1周前',
    category: 'interview',
    bgColor: 'from-green-400 to-green-600',
    cover: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 2,
    title: '电商客服沟通技巧',
    desc: '提升客户满意度的话术训练',
    duration: '28:20',
    views: 2189,
    time: '2周前',
    category: 'skill',
    bgColor: 'from-green-400 to-green-500',
    cover: 'https://images.unsplash.com/photo-1533197265010-48746a9e493c?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 3,
    title: '如何规划职业发展路径',
    desc: '残疾人就业职业规划指南',
    duration: '35:45',
    views: 1876,
    time: '3周前',
    category: 'career',
    bgColor: 'from-purple-400 to-purple-600',
    cover: 'https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 4,
    title: '克服求职焦虑心理',
    desc: '建立自信，积极面对求职挑战',
    duration: '18:50',
    views: 4521,
    time: '1个月前',
    category: 'psychology',
    bgColor: 'from-pink-400 to-pink-600',
    cover: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 5,
    title: '无声面试沟通技巧',
    desc: '听障人士面试手语与文字沟通',
    duration: '22:15',
    views: 1654,
    time: '1个月前',
    category: 'interview',
    bgColor: 'from-green-400 to-green-600',
    cover: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 6,
    title: '居家办公效率提升',
    desc: '远程工作的时间管理与自律',
    duration: '15:40',
    views: 2890,
    time: '2个月前',
    category: 'skill',
    bgColor: 'from-orange-400 to-orange-600',
    cover: 'https://images.unsplash.com/photo-1533197265010-48746a9e493c?auto=format&fit=crop&w=400&q=80'
  }
]

// 图文课程数据
const articleCourses = [
  {
    id: 101,
    title: '残疾人简历撰写指南：如何突出你的优势',
    summary: '一份好的简历是求职成功的第一步。本文将教你如何在简历中合理展示残疾情况，突出个人能力和经验，让HR一眼看到你的价值...',
    category: 'resume',
    categoryLabel: '简历制作',
    views: 5678,
    comments: 128,
    time: '2天前',
    cover: 'https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=400&q=80',
    images: ['https://images.unsplash.com/photo-1533197265010-48746a9e493c?auto=format&fit=crop&w=200&q=80', 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=200&q=80'],
    content: [
      { type: 'text', content: '简历是求职的敲门砖，对于残疾人求职者来说，如何在简历中恰当表达自己的情况，同时突出个人优势，是一门学问。' },
      { type: 'heading', content: '一、简历的基本结构' },
      { type: 'text', content: '一份完整的简历应包含个人信息、求职意向、教育背景、工作经历、技能特长、自我评价等部分。' },
      { type: 'image', url: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=400&q=80', caption: '简历结构示例' },
      { type: 'heading', content: '二、如何描述残疾情况' },
      { type: 'list', items: ['残疾情况不是必须写在简历中的内容', '如果残疾与岗位要求无关，可以选择在面试时说明', '如需要特殊工作环境，可在自我评价中简要提及'] },
      { type: 'tip', content: '提示：保持自信，残疾不影响你的工作能力！' }
    ]
  },
  {
    id: 102,
    title: '职场礼仪：给人留下良好的第一印象',
    summary: '良好的职场礼仪能帮助你快速融入团队。从着装规范到沟通技巧，本文为你详细解读职场礼仪的方方面面...',
    category: 'etiquette',
    categoryLabel: '职场礼仪',
    views: 4321,
    comments: 89,
    time: '5天前',
    cover: 'https://images.unsplash.com/photo-1533197265010-48746a9e493c?auto=format&fit=crop&w=400&q=80',
    images: ['https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=200&q=80'],
    content: [
      { type: 'text', content: '第一印象往往在7秒内形成，而良好的职场礼仪是建立正面形象的关键。' },
      { type: 'heading', content: '一、着装礼仪' },
      { type: 'list', items: ['根据公司文化选择合适的着装', '保持整洁干净是基本要求', '避免过于花哨或暴露的服装'] },
      { type: 'heading', content: '二、沟通礼仪' },
      { type: 'text', content: '沟通是职场中最重要的技能之一，良好的沟通礼仪包括：倾听、表达、反馈等多个方面。' }
    ]
  },
  {
    id: 103,
    title: '与HR沟通的艺术：如何谈薪资和福利',
    summary: '薪资谈判是求职过程中的关键环节。本文教你如何在尊重对方的前提下，合理表达自己的薪资期望...',
    category: 'communication',
    categoryLabel: '沟通技巧',
    views: 3890,
    comments: 156,
    time: '1周前',
    cover: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=400&q=80',
    content: [
      { type: 'text', content: '薪资谈判需要技巧和勇气，合理的薪资期望既体现了你对自己价值的认可，也展示了对市场的了解。' },
      { type: 'heading', content: '谈判前的准备' },
      { type: 'list', items: ['了解行业薪资水平', '明确自己的底线和期望', '准备充分的理由支撑你的要求'] }
    ]
  },
  {
    id: 104,
    title: '残疾人就业权益保护：你需要知道的法律知识',
    summary: '了解劳动法规，保护自己的合法权益。本文解读残疾人就业相关的法律法规，帮助你在职场中维护自身权益...',
    category: 'law',
    categoryLabel: '劳动法规',
    views: 6234,
    comments: 234,
    time: '2周前',
    cover: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=400&q=80',
    images: ['https://images.unsplash.com/photo-1533197265010-48746a9e493c?auto=format&fit=crop&w=200&q=80', 'https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=200&q=80', 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=200&q=80'],
    content: [
      { type: 'text', content: '残疾人在就业过程中享有平等就业的权利，了解相关法律法规是保护自身权益的基础。' },
      { type: 'heading', content: '一、《残疾人保障法》相关规定' },
      { type: 'list', items: ['禁止歧视残疾人就业', '用人单位应提供合理便利', '残疾人享有平等的薪酬待遇'] },
      { type: 'tip', content: '如遇就业歧视，可向当地残联或劳动仲裁部门投诉。' }
    ]
  },
  {
    id: 105,
    title: '肢体残疾人士求职简历写作要点',
    summary: '针对肢体残疾求职者的简历写作建议，帮助你更好地展示能力，获得面试机会...',
    category: 'resume',
    categoryLabel: '简历制作',
    views: 2156,
    comments: 67,
    time: '3周前',
    cover: 'https://images.unsplash.com/photo-1533197265010-48746a9e493c?auto=format&fit=crop&w=400&q=80',
    content: [
      { type: 'text', content: '肢体残疾不应成为求职的障碍，一份优秀的简历能帮你打开职场大门。' },
      { type: 'heading', content: '重点突出能力' },
      { type: 'text', content: '简历的核心是展示你能为公司带来什么价值，而不是你的身体状况。' }
    ]
  },
  {
    id: 106,
    title: '职场沟通技巧：如何与同事建立良好关系',
    summary: '良好的同事关系是职场成功的关键。本文分享实用的沟通技巧，帮助你快速融入团队...',
    category: 'communication',
    categoryLabel: '沟通技巧',
    views: 3456,
    comments: 98,
    time: '1个月前',
    cover: 'https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=400&q=80',
    content: [
      { type: 'text', content: '职场不是单打独斗的地方，学会与同事良好沟通，能让你的工作事半功倍。' },
      { type: 'heading', content: '主动沟通的重要性' },
      { type: 'list', items: ['遇到问题及时沟通', '定期汇报工作进展', '主动寻求帮助和建议'] }
    ]
  }
]

// 我的学习数据
const myLearning = ref({
  videoCount: 3,
  articleCount: 5,
  learnedHours: 12.5,
  recent: [
    {
      id: 1,
      type: 'video',
      title: '面试自我介绍技巧',
      progress: '08:25',
      percent: 65
    },
    {
      id: 101,
      type: 'article',
      title: '残疾人简历撰写指南：如何突出你的优势',
      progress: '第3节',
      percent: 45
    },
    {
      id: 4,
      type: 'video',
      title: '克服求职焦虑心理',
      progress: '05:20',
      percent: 28
    }
  ]
})

// 过滤后的视频
const filteredVideos = computed(() => {
  let result = videoCourses
  
  if (activeVideoCategory.value !== 'all') {
    result = result.filter(v => v.category === activeVideoCategory.value)
  }
  
  if (searchKeyword.value.trim()) {
    const keyword = searchKeyword.value.toLowerCase()
    result = result.filter(v => 
      v.title.toLowerCase().includes(keyword) || 
      v.desc.toLowerCase().includes(keyword)
    )
  }
  
  return result
})

// 过滤后的图文
const filteredArticles = computed(() => {
  let result = articleCourses
  
  if (activeArticleCategory.value !== 'all') {
    result = result.filter(a => a.category === activeArticleCategory.value)
  }
  
  if (searchKeyword.value.trim()) {
    const keyword = searchKeyword.value.toLowerCase()
    result = result.filter(a => 
      a.title.toLowerCase().includes(keyword) || 
      a.summary.toLowerCase().includes(keyword)
    )
  }
  
  return result
})

// 切换课程类型时重置搜索
watch(activeType, () => {
  searchKeyword.value = ''
})

// 处理快捷入口点击
function handleQuickAccess(item) {
  switch(item.action) {
    case 'myLearning':
      showMyLearning.value = true
      break
    case 'favorite':
      alert('收藏夹功能开发中...')
      break
    case 'checkin':
      alert('今日已打卡！\n连续学习 5 天')
      break
    case 'consult':
      alert('就业指导热线：0951-12345678\n工作时间：周一至周五 9:00-17:00')
      break
  }
}

// 播放视频
function playVideo(video) {
  if (!userStore.isLoggedIn) {
    if (confirm('请先登录后再观看\n\n是否前往登录页面？')) {
      router.push('/login')
    }
    return
  }
  currentVideo.value = video
  showVideoPlayer.value = true
  isPlaying.value = true
}

// 关闭视频
function closeVideo() {
  showVideoPlayer.value = false
  currentVideo.value = null
  isPlaying.value = false
}

// 切换播放状态
function togglePlay() {
  isPlaying.value = !isPlaying.value
}

// 全屏播放
function toggleFullscreen() {
  alert('全屏播放功能')
}

// 查看图文
function viewArticle(article) {
  if (!userStore.isLoggedIn) {
    if (confirm('请先登录后再阅读\n\n是否前往登录页面？')) {
      router.push('/login')
    }
    return
  }
  currentArticle.value = article
  showArticleDetail.value = true
}

// 关闭图文
function closeArticle() {
  showArticleDetail.value = false
  currentArticle.value = null
}

// 继续学习
function continueLearning(item) {
  showMyLearning.value = false
  if (item.type === 'video') {
    const video = videoCourses.find(v => v.id === item.id)
    if (video) playVideo(video)
  } else {
    const article = articleCourses.find(a => a.id === item.id)
    if (article) viewArticle(article)
  }
}
</script>

<style scoped>
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.line-clamp-1 {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
