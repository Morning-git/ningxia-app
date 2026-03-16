<template>
  <div class="pb-4">
    <!-- 标题栏 -->
    <div class="flex items-center gap-3 px-4 py-3 bg-white border-b border-gray-100 sticky top-0 z-10">
      <span class="text-2xl text-gray-800 cursor-pointer" @click="$router.back()">&#8249;</span>
      <h3 class="text-base font-semibold text-gray-800">我的需求</h3>
    </div>

    <!-- 需求统计 -->
    <div class="px-4 py-4 bg-white">
      <div class="grid grid-cols-3 gap-2">
        <div class="text-center p-2">
          <p class="text-xl font-bold text-primary">{{ stats.total }}</p>
          <p class="text-xs text-gray-500">全部需求</p>
        </div>
        <div class="text-center p-2">
          <p class="text-xl font-bold text-blue-600">{{ stats.processing }}</p>
          <p class="text-xs text-gray-500">处理中</p>
        </div>
        <div class="text-center p-2">
          <p class="text-xl font-bold text-green-600">{{ stats.completed }}</p>
          <p class="text-xs text-gray-500">已完成</p>
        </div>
      </div>
    </div>

    <!-- 操作按钮 -->
    <div class="px-4 py-3 bg-white mt-2">
      <button 
        class="w-full py-3 bg-primary text-white rounded-xl text-sm font-medium flex items-center justify-center gap-2"
        @click="showAddModal = true"
      >
        <svg class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
        </svg>
        添加新需求
      </button>
    </div>

    <!-- 需求列表 -->
    <div class="px-4 py-4 bg-white mt-2">
      <h4 class="text-sm font-semibold text-gray-800 mb-3">需求记录</h4>
      <div v-if="demands.length > 0" class="space-y-3">
        <div 
          v-for="(item, index) in demands" 
          :key="index"
          class="bg-gray-50 rounded-xl p-4"
        >
          <div class="flex items-start justify-between mb-2">
            <div class="flex-1">
              <div class="flex items-center gap-2 mb-1">
                <span class="text-sm font-semibold text-gray-800">{{ item.type }}</span>
                <span 
                  class="text-[10px] px-2 py-0.5 rounded-full"
                  :class="{
                    'bg-blue-50 text-blue-600': item.status === '处理中',
                    'bg-green-50 text-green-600': item.status === '已完成'
                  }"
                >{{ item.status }}</span>
              </div>
              <p class="text-xs text-gray-600 mb-2 line-clamp-2">{{ item.desc }}</p>
              <span class="text-[10px] text-gray-400">{{ item.time }}</span>
            </div>
            <button 
              v-if="item.status === '处理中'"
              class="ml-2 text-xs text-primary"
              @click="cancelDemand(index)"
            >取消</button>
          </div>
        </div>
      </div>
      <div v-else class="text-center py-8">
        <svg class="w-16 h-16 mx-auto text-gray-200 mb-2" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 14H6v-2h6v2zm4-4H6v-2h10v2zm0-4H6V7h10v2z"/>
        </svg>
        <p class="text-sm text-gray-400">暂无需求记录</p>
        <p class="text-xs text-gray-300 mt-1">点击上方按钮添加您的需求</p>
      </div>
    </div>

    <!-- 需求类型说明 -->
    <div class="px-4 py-4 bg-white mt-2">
      <h4 class="text-sm font-semibold text-gray-800 mb-3">需求类型</h4>
      <div class="bg-gray-50 rounded-xl p-4 space-y-3">
        <div class="flex items-start gap-3">
          <div class="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
            <svg class="w-4 h-4 text-green-600" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20 6L9 17l-5-5"/>
            </svg>
          </div>
          <div>
            <p class="text-sm font-medium text-gray-800">就业推荐</p>
            <p class="text-xs text-gray-500">为您推荐合适的就业岗位，精准匹配企业需求</p>
          </div>
        </div>
        <div class="flex items-start gap-3">
          <div class="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
            <svg class="w-4 h-4 text-blue-600" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20 6L9 17l-5-5"/>
            </svg>
          </div>
          <div>
            <p class="text-sm font-medium text-gray-800">创业扶持</p>
            <p class="text-xs text-gray-500">提供创业指导、场地支持和技术培训服务</p>
          </div>
        </div>
        <div class="flex items-start gap-3">
          <div class="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
            <svg class="w-4 h-4 text-purple-600" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20 6L9 17l-5-5"/>
            </svg>
          </div>
          <div>
            <p class="text-sm font-medium text-gray-800">技能培训</p>
            <p class="text-xs text-gray-500">推荐免费培训课程，提升职业技能水平</p>
          </div>
        </div>
        <div class="flex items-start gap-3">
          <div class="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0">
            <svg class="w-4 h-4 text-orange-600" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20 6L9 17l-5-5"/>
            </svg>
          </div>
          <div>
            <p class="text-sm font-medium text-gray-800">辅具申请</p>
            <p class="text-xs text-gray-500">申请辅助器具补贴，解决工作生活难题</p>
          </div>
        </div>
        <div class="flex items-start gap-3">
          <div class="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
            <svg class="w-4 h-4 text-gray-600" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20 6L9 17l-5-5"/>
            </svg>
          </div>
          <div>
            <p class="text-sm font-medium text-gray-800">其他需求</p>
            <p class="text-xs text-gray-500">其他就业相关的个性化服务需求</p>
          </div>
        </div>
      </div>
    </div>

    <!-- 添加需求弹窗 -->
    <div v-if="showAddModal" class="fixed inset-0 bg-black/50 z-50 flex items-end" @click.self="showAddModal = false">
      <div class="w-full max-w-[480px] mx-auto bg-white rounded-t-2xl max-h-[80vh] overflow-y-auto">
        <div class="flex justify-between items-center p-4 border-b border-gray-100">
          <h3 class="text-base font-semibold text-gray-800">添加需求</h3>
          <span class="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 cursor-pointer" @click="showAddModal = false">×</span>
        </div>
        <div class="p-4">
          <div class="mb-4">
            <label class="block text-xs text-gray-600 mb-2">需求类型</label>
            <div class="grid grid-cols-2 gap-2">
              <button 
                v-for="type in demandTypes" 
                :key="type"
                class="py-2.5 px-3 rounded-lg text-xs text-center border transition-all"
                :class="newDemand.type === type 
                  ? 'border-primary bg-primary/10 text-primary' 
                  : 'border-gray-200 text-gray-600 hover:border-gray-300'"
                @click="newDemand.type = type"
              >
                {{ type }}
              </button>
            </div>
          </div>
          <div class="mb-4">
            <label class="block text-xs text-gray-600 mb-2">详细描述</label>
            <textarea 
              v-model="newDemand.desc" 
              placeholder="请详细描述您的需求，如期望岗位、工作地点、薪资要求等..." 
              class="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm h-24 resize-none focus:outline-none focus:border-primary"
            ></textarea>
          </div>
          <button 
            @click="saveDemand" 
            class="w-full py-3 bg-primary text-white rounded-xl text-sm font-medium"
            :disabled="!newDemand.type || !newDemand.desc"
            :class="{ 'opacity-50': !newDemand.type || !newDemand.desc }"
          >
            提交需求
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useUserStore } from '../store'

const userStore = useUserStore()
const demands = ref(userStore.demands)
const showAddModal = ref(false)
const newDemand = ref({ type: '', desc: '' })

const demandTypes = ['就业推荐', '创业扶持', '技能培训', '辅具申请', '其他需求']

const stats = computed(() => ({
  total: demands.value.length,
  processing: demands.value.filter(d => d.status === '处理中').length,
  completed: demands.value.filter(d => d.status === '已完成').length
}))

function saveDemand() {
  if (!newDemand.value.type || !newDemand.value.desc) {
    return
  }
  userStore.addDemand(newDemand.value.type, newDemand.value.desc)
  demands.value = userStore.demands
  showAddModal.value = false
  newDemand.value = { type: '', desc: '' }
  alert('需求提交成功！')
}

function cancelDemand(index) {
  if (confirm('确定要取消此需求吗？')) {
    demands.value.splice(index, 1)
    userStore.demands = demands.value
  }
}
</script>
