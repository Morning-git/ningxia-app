<template>
  <div class="min-h-screen bg-gray-50">
    <!-- 顶部导航 -->
    <div class="bg-white px-4 py-3 flex items-center gap-3 sticky top-0 z-10 border-b border-gray-100">
      <span class="text-2xl text-gray-600 cursor-pointer" @click="$router.back()">&#8249;</span>
      <h1 class="text-lg font-semibold text-gray-800">残疾证管理</h1>
    </div>

    <div class="p-4">
      <!-- 提示信息 -->
      <div class="bg-green-50 rounded-xl p-4 mb-4">
        <h3 class="text-sm font-semibold text-green-800 mb-1">完善残疾证信息</h3>
        <p class="text-xs text-green-600">完善残疾证信息可获得更多就业推荐和政策支持</p>
      </div>

      <!-- 残疾类型 -->
      <div class="bg-white rounded-xl p-4 mb-4">
        <h3 class="text-sm font-semibold text-gray-800 mb-3">残疾类型</h3>
        <div class="flex flex-wrap gap-2">
          <span 
            v-for="type in disabilityTypes" 
            :key="type.value"
            class="px-4 py-2 rounded-lg text-sm cursor-pointer transition-colors"
            :class="selectedType === type.value ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600'"
            @click="selectedType = type.value"
          >
            {{ type.label }}
          </span>
        </div>
      </div>

      <!-- 残疾等级 -->
      <div class="bg-white rounded-xl p-4 mb-4">
        <h3 class="text-sm font-semibold text-gray-800 mb-3">残疾等级</h3>
        <div class="flex flex-wrap gap-2">
          <span 
            v-for="level in disabilityLevels" 
            :key="level.value"
            class="px-4 py-2 rounded-lg text-sm cursor-pointer transition-colors"
            :class="selectedLevel === level.value ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600'"
            @click="selectedLevel = level.value"
          >
            {{ level.label }}
          </span>
        </div>
      </div>

      <!-- 残疾证号 -->
      <div class="bg-white rounded-xl p-4 mb-6">
        <h3 class="text-sm font-semibold text-gray-800 mb-3">残疾证号</h3>
        <input 
          v-model="cardNumber" 
          type="text" 
          placeholder="请输入残疾证号" 
          class="w-full px-3 py-3 border border-gray-200 rounded-lg text-sm"
        />
        <p class="text-xs text-gray-400 mt-2">残疾证号可在残疾证上查看，一般为18位数字</p>
      </div>

      <!-- 保存按钮 -->
      <button 
        class="w-full py-3.5 bg-primary text-white rounded-xl text-sm font-medium"
        @click="saveCard"
      >
        保存信息
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '../store'
import { disabilityTypes, disabilityLevels } from '../data/mock'

const router = useRouter()
const userStore = useUserStore()

const selectedType = ref('')
const selectedLevel = ref('')
const cardNumber = ref('')

onMounted(() => {
  // 加载已有数据
  const user = userStore.currentUser
  if (user) {
    selectedType.value = user.disabilityType || ''
    selectedLevel.value = user.disabilityLevel || ''
    cardNumber.value = user.disabilityCard || ''
  }
})

function saveCard() {
  if (!selectedType.value || !selectedLevel.value) {
    alert('请选择残疾类型和等级')
    return
  }
  
  const typeLabel = disabilityTypes.find(t => t.value === selectedType.value)?.label
  const levelLabel = disabilityLevels.find(l => l.value === selectedLevel.value)?.label
  
  userStore.updateDisabilityInfo(typeLabel, levelLabel, cardNumber.value)
  alert('残疾证信息保存成功！')
  router.back()
}
</script>
