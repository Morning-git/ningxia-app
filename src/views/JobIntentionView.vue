<template>
  <div class="min-h-screen bg-gray-50">
    <!-- 顶部导航 -->
    <div class="bg-white px-4 py-3 flex items-center justify-between sticky top-0 z-10 border-b border-gray-100">
      <div class="flex items-center gap-3">
        <span class="text-2xl text-gray-600 cursor-pointer" @click="$router.back()">&#8249;</span>
        <h1 class="text-lg font-semibold text-gray-800">求职意向</h1>
      </div>
      <button 
        v-if="!isEditing"
        class="px-4 py-1.5 bg-primary text-white text-sm rounded-full"
        @click="isEditing = true"
      >
        编辑
      </button>
      <button 
        v-else
        class="px-4 py-1.5 bg-primary text-white text-sm rounded-full"
        @click="saveIntention"
      >
        保存
      </button>
    </div>

    <div class="p-4">
      <!-- 期望职位 -->
      <div class="bg-white rounded-xl p-4 mb-4">
        <h3 class="text-sm font-semibold text-gray-800 mb-3">期望职位</h3>
        <div v-if="!isEditing" class="flex flex-wrap gap-2">
          <span 
            v-for="job in selectedJobs" 
            :key="job"
            class="px-3 py-1.5 bg-green-50 text-green-700 text-sm rounded-lg"
          >
            {{ job }}
          </span>
          <span v-if="selectedJobs.length === 0" class="text-gray-400 text-sm">未设置</span>
        </div>
        <div v-else class="flex flex-wrap gap-2">
          <span 
            v-for="job in commonJobs" 
            :key="job"
            class="px-3 py-2 rounded-lg text-sm cursor-pointer transition-colors"
            :class="selectedJobs.includes(job) ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600'"
            @click="toggleJob(job)"
          >
            {{ job }}
          </span>
        </div>
      </div>

      <!-- 期望薪资 -->
      <div class="bg-white rounded-xl p-4 mb-4">
        <h3 class="text-sm font-semibold text-gray-800 mb-3">期望薪资</h3>
        <div v-if="!isEditing">
          <p class="text-sm text-gray-600">{{ expectedSalary || '未设置' }}</p>
        </div>
        <div v-else>
          <select v-model="expectedSalary" class="w-full px-3 py-3 border border-gray-200 rounded-lg text-sm bg-gray-50">
            <option value="">请选择期望薪资</option>
            <option value="2000-3000">2000-3000元/月</option>
            <option value="3000-5000">3000-5000元/月</option>
            <option value="5000-8000">5000-8000元/月</option>
            <option value="8000+">8000元以上/月</option>
          </select>
        </div>
      </div>

      <!-- 工作地区 -->
      <div class="bg-white rounded-xl p-4 mb-4">
        <h3 class="text-sm font-semibold text-gray-800 mb-3">工作地区</h3>
        <div v-if="!isEditing">
          <p class="text-sm text-gray-600">{{ expectedLocation || '未设置' }}</p>
        </div>
        <div v-else>
          <select v-model="expectedLocation" class="w-full px-3 py-3 border border-gray-200 rounded-lg text-sm bg-gray-50">
            <option value="">请选择工作地区</option>
            <option value="银川市">银川市</option>
            <option value="石嘴山市">石嘴山市</option>
            <option value="吴忠市">吴忠市</option>
            <option value="固原市">固原市</option>
            <option value="中卫市">中卫市</option>
          </select>
        </div>
      </div>

      <!-- 工作类型 -->
      <div class="bg-white rounded-xl p-4">
        <h3 class="text-sm font-semibold text-gray-800 mb-3">工作类型</h3>
        <div v-if="!isEditing">
          <p class="text-sm text-gray-600">{{ jobType || '未设置' }}</p>
        </div>
        <div v-else class="flex flex-wrap gap-2">
          <span 
            v-for="type in jobTypes" 
            :key="type"
            class="px-4 py-2 rounded-lg text-sm cursor-pointer"
            :class="jobType === type ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600'"
            @click="jobType = type"
          >
            {{ type }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '../store'

const router = useRouter()
const userStore = useUserStore()

const isEditing = ref(false)
const commonJobs = ['行政文员', '客服专员', '数据录入', '普工', '操作工', '会计', '设计师', '程序员', '司机', '保安']
const jobTypes = ['全职', '兼职', '实习', '临时工']

const selectedJobs = ref([])
const expectedSalary = ref('')
const expectedLocation = ref('')
const jobType = ref('')

onMounted(() => {
  // 从store加载数据
  selectedJobs.value = [...userStore.jobIntention]
  // 从localStorage加载其他数据
  const savedData = localStorage.getItem('jobIntentionDetail')
  if (savedData) {
    const data = JSON.parse(savedData)
    expectedSalary.value = data.expectedSalary || ''
    expectedLocation.value = data.expectedLocation || ''
    jobType.value = data.jobType || ''
  }
})

function toggleJob(job) {
  const index = selectedJobs.value.indexOf(job)
  if (index > -1) {
    selectedJobs.value.splice(index, 1)
  } else {
    selectedJobs.value.push(job)
  }
}

function saveIntention() {
  // 保存到store
  userStore.updateJobIntention(selectedJobs.value)
  // 保存到localStorage
  localStorage.setItem('jobIntentionDetail', JSON.stringify({
    expectedSalary: expectedSalary.value,
    expectedLocation: expectedLocation.value,
    jobType: jobType.value
  }))
  isEditing.value = false
  alert('求职意向保存成功！')
}
</script>
