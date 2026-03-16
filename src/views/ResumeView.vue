<template>
  <div class="min-h-screen bg-gray-50 pb-20">
    <!-- 顶部导航 -->
    <div class="bg-white px-4 py-3 flex items-center justify-between sticky top-0 z-10">
      <div class="flex items-center gap-3">
        <span class="text-2xl text-gray-600 cursor-pointer" @click="$router.back()">&#8249;</span>
        <h1 class="text-lg font-semibold text-gray-800">我的简历</h1>
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
        @click="saveResume"
      >
        保存
      </button>
    </div>

    <!-- 简历完成度 -->
    <div class="bg-white px-4 py-4 border-t border-gray-100">
      <div class="flex justify-between items-center mb-2">
        <span class="text-sm text-gray-600">简历完成度</span>
        <span class="text-lg font-bold text-primary">{{ completionRate }}%</span>
      </div>
      <div class="h-2 bg-gray-100 rounded-full overflow-hidden">
        <div class="h-full bg-primary rounded-full transition-all duration-300" :style="{width: completionRate + '%'}"></div>
      </div>
      <p class="text-xs text-gray-400 mt-2">完善的简历可以提高求职成功率</p>
    </div>

    <!-- 基本信息 -->
    <div class="px-4 mt-3">
      <div class="bg-white rounded-xl overflow-hidden">
        <div class="px-4 py-3 border-b border-gray-100 flex justify-between items-center">
          <h3 class="text-sm font-semibold text-gray-800">基本信息</h3>
          <span v-if="!isEditing && basicInfoComplete" class="text-xs text-green-600">已完成</span>
        </div>
        <div class="p-4">
          <div v-if="!isEditing" class="space-y-3">
            <div class="flex">
              <span class="w-20 text-sm text-gray-500">姓名</span>
              <span class="flex-1 text-sm text-gray-800">{{ resume.name || '-' }}</span>
            </div>
            <div class="flex">
              <span class="w-20 text-sm text-gray-500">性别</span>
              <span class="flex-1 text-sm text-gray-800">{{ resume.gender || '-' }}</span>
            </div>
            <div class="flex">
              <span class="w-20 text-sm text-gray-500">年龄</span>
              <span class="flex-1 text-sm text-gray-800">{{ resume.age ? resume.age + '岁' : '-' }}</span>
            </div>
            <div class="flex">
              <span class="w-20 text-sm text-gray-500">手机号</span>
              <span class="flex-1 text-sm text-gray-800">{{ resume.phone || '-' }}</span>
            </div>
            <div class="flex">
              <span class="w-20 text-sm text-gray-500">邮箱</span>
              <span class="flex-1 text-sm text-gray-800">{{ resume.email || '-' }}</span>
            </div>
            <div class="flex">
              <span class="w-20 text-sm text-gray-500">居住地</span>
              <span class="flex-1 text-sm text-gray-800">{{ resume.address || '-' }}</span>
            </div>
          </div>
          <div v-else class="space-y-4">
            <div>
              <label class="block text-sm text-gray-600 mb-1">姓名</label>
              <input v-model="resume.name" type="text" class="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm" placeholder="请输入姓名" />
            </div>
            <div class="flex gap-3">
              <div class="flex-1">
                <label class="block text-sm text-gray-600 mb-1">性别</label>
                <select v-model="resume.gender" class="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm">
                  <option value="">请选择</option>
                  <option value="男">男</option>
                  <option value="女">女</option>
                </select>
              </div>
              <div class="flex-1">
                <label class="block text-sm text-gray-600 mb-1">年龄</label>
                <input v-model="resume.age" type="number" class="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm" placeholder="请输入年龄" />
              </div>
            </div>
            <div>
              <label class="block text-sm text-gray-600 mb-1">手机号</label>
              <input v-model="resume.phone" type="tel" class="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm" placeholder="请输入手机号" />
            </div>
            <div>
              <label class="block text-sm text-gray-600 mb-1">邮箱</label>
              <input v-model="resume.email" type="email" class="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm" placeholder="请输入邮箱" />
            </div>
            <div>
              <label class="block text-sm text-gray-600 mb-1">居住地</label>
              <input v-model="resume.address" type="text" class="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm" placeholder="请输入居住地" />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 残疾信息 -->
    <div class="px-4 mt-3">
      <div class="bg-white rounded-xl overflow-hidden">
        <div class="px-4 py-3 border-b border-gray-100 flex justify-between items-center">
          <h3 class="text-sm font-semibold text-gray-800">残疾信息</h3>
          <span v-if="!isEditing && disabilityInfoComplete" class="text-xs text-green-600">已完成</span>
        </div>
        <div class="p-4">
          <div v-if="!isEditing" class="space-y-3">
            <div class="flex">
              <span class="w-20 text-sm text-gray-500">残疾类型</span>
              <span class="flex-1 text-sm text-gray-800">{{ resume.disabilityType || '-' }}</span>
            </div>
            <div class="flex">
              <span class="w-20 text-sm text-gray-500">残疾等级</span>
              <span class="flex-1 text-sm text-gray-800">{{ resume.disabilityLevel || '-' }}</span>
            </div>
            <div class="flex">
              <span class="w-20 text-sm text-gray-500">残疾证号</span>
              <span class="flex-1 text-sm text-gray-800">{{ resume.disabilityCard || '-' }}</span>
            </div>
          </div>
          <div v-else class="space-y-4">
            <div>
              <label class="block text-sm text-gray-600 mb-1">残疾类型</label>
              <select v-model="resume.disabilityType" class="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm">
                <option value="">请选择</option>
                <option v-for="t in disabilityTypes" :key="t.value" :value="t.label">{{ t.label }}</option>
              </select>
            </div>
            <div>
              <label class="block text-sm text-gray-600 mb-1">残疾等级</label>
              <select v-model="resume.disabilityLevel" class="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm">
                <option value="">请选择</option>
                <option v-for="l in disabilityLevels" :key="l.value" :value="l.label">{{ l.label }}</option>
              </select>
            </div>
            <div>
              <label class="block text-sm text-gray-600 mb-1">残疾证号</label>
              <input v-model="resume.disabilityCard" type="text" class="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm" placeholder="请输入残疾证号" />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 求职意向 -->
    <div class="px-4 mt-3">
      <div class="bg-white rounded-xl overflow-hidden">
        <div class="px-4 py-3 border-b border-gray-100 flex justify-between items-center">
          <h3 class="text-sm font-semibold text-gray-800">求职意向</h3>
          <span v-if="!isEditing && jobIntentionComplete" class="text-xs text-green-600">已完成</span>
        </div>
        <div class="p-4">
          <div v-if="!isEditing" class="space-y-3">
            <div class="flex">
              <span class="w-20 text-sm text-gray-500">期望职位</span>
              <span class="flex-1 text-sm text-gray-800">{{ resume.expectedJobs.join('、') || '-' }}</span>
            </div>
            <div class="flex">
              <span class="w-20 text-sm text-gray-500">期望薪资</span>
              <span class="flex-1 text-sm text-gray-800">{{ resume.expectedSalary || '-' }}</span>
            </div>
            <div class="flex">
              <span class="w-20 text-sm text-gray-500">工作地区</span>
              <span class="flex-1 text-sm text-gray-800">{{ resume.expectedLocation || '-' }}</span>
            </div>
            <div class="flex">
              <span class="w-20 text-sm text-gray-500">工作类型</span>
              <span class="flex-1 text-sm text-gray-800">{{ resume.jobType || '-' }}</span>
            </div>
          </div>
          <div v-else class="space-y-4">
            <div>
              <label class="block text-sm text-gray-600 mb-1">期望职位（可多选）</label>
              <div class="flex flex-wrap gap-2">
                <span 
                  v-for="job in commonJobs" 
                  :key="job"
                  class="px-3 py-1.5 rounded-lg text-sm cursor-pointer"
                  :class="resume.expectedJobs.includes(job) ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600'"
                  @click="toggleJob(job)"
                >
                  {{ job }}
                </span>
              </div>
            </div>
            <div>
              <label class="block text-sm text-gray-600 mb-1">期望薪资</label>
              <select v-model="resume.expectedSalary" class="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm">
                <option value="">请选择</option>
                <option value="2000-3000">2000-3000元/月</option>
                <option value="3000-5000">3000-5000元/月</option>
                <option value="5000-8000">5000-8000元/月</option>
                <option value="8000+">8000元以上/月</option>
              </select>
            </div>
            <div>
              <label class="block text-sm text-gray-600 mb-1">工作地区</label>
              <select v-model="resume.expectedLocation" class="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm">
                <option value="">请选择</option>
                <option value="银川市">银川市</option>
                <option value="石嘴山市">石嘴山市</option>
                <option value="吴忠市">吴忠市</option>
                <option value="固原市">固原市</option>
                <option value="中卫市">中卫市</option>
              </select>
            </div>
            <div>
              <label class="block text-sm text-gray-600 mb-1">工作类型</label>
              <select v-model="resume.jobType" class="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm">
                <option value="">请选择</option>
                <option value="全职">全职</option>
                <option value="兼职">兼职</option>
                <option value="实习">实习</option>
                <option value="临时工">临时工</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 教育经历 -->
    <div class="px-4 mt-3">
      <div class="bg-white rounded-xl overflow-hidden">
        <div class="px-4 py-3 border-b border-gray-100 flex justify-between items-center">
          <h3 class="text-sm font-semibold text-gray-800">教育经历</h3>
          <button v-if="isEditing" class="text-xs text-primary" @click="addEducation">+ 添加</button>
        </div>
        <div class="p-4">
          <div v-if="resume.education.length === 0" class="text-center py-6 text-gray-400 text-sm">
            暂无教育经历
          </div>
          <div v-else class="space-y-4">
            <div v-for="(edu, index) in resume.education" :key="index" class="relative pb-4 border-b border-gray-100 last:border-0 last:pb-0">
              <div v-if="isEditing" class="absolute top-0 right-0 text-xs text-red-500 cursor-pointer" @click="removeEducation(index)">删除</div>
              <div v-if="!isEditing">
                <h4 class="text-sm font-semibold text-gray-800">{{ edu.school }}</h4>
                <p class="text-xs text-gray-500 mt-1">{{ edu.major }} · {{ edu.degree }}</p>
                <p class="text-xs text-gray-400 mt-1">{{ edu.time }}</p>
              </div>
              <div v-else class="space-y-3">
                <input v-model="edu.school" type="text" class="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm" placeholder="学校名称" />
                <div class="flex gap-2">
                  <input v-model="edu.major" type="text" class="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm" placeholder="专业" />
                  <select v-model="edu.degree" class="w-24 px-3 py-2 border border-gray-200 rounded-lg text-sm">
                    <option value="">学历</option>
                    <option value="初中">初中</option>
                    <option value="高中">高中</option>
                    <option value="大专">大专</option>
                    <option value="本科">本科</option>
                    <option value="硕士">硕士</option>
                  </select>
                </div>
                <input v-model="edu.time" type="text" class="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm" placeholder="时间段，如：2018-2022" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 工作经历 -->
    <div class="px-4 mt-3">
      <div class="bg-white rounded-xl overflow-hidden">
        <div class="px-4 py-3 border-b border-gray-100 flex justify-between items-center">
          <h3 class="text-sm font-semibold text-gray-800">工作经历</h3>
          <button v-if="isEditing" class="text-xs text-primary" @click="addWork">+ 添加</button>
        </div>
        <div class="p-4">
          <div v-if="resume.workExperience.length === 0" class="text-center py-6 text-gray-400 text-sm">
            暂无工作经历
          </div>
          <div v-else class="space-y-4">
            <div v-for="(work, index) in resume.workExperience" :key="index" class="relative pb-4 border-b border-gray-100 last:border-0 last:pb-0">
              <div v-if="isEditing" class="absolute top-0 right-0 text-xs text-red-500 cursor-pointer" @click="removeWork(index)">删除</div>
              <div v-if="!isEditing">
                <h4 class="text-sm font-semibold text-gray-800">{{ work.company }}</h4>
                <p class="text-xs text-gray-500 mt-1">{{ work.position }}</p>
                <p class="text-xs text-gray-400 mt-1">{{ work.time }}</p>
                <p class="text-xs text-gray-600 mt-2">{{ work.description }}</p>
              </div>
              <div v-else class="space-y-3">
                <input v-model="work.company" type="text" class="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm" placeholder="公司名称" />
                <input v-model="work.position" type="text" class="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm" placeholder="职位名称" />
                <input v-model="work.time" type="text" class="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm" placeholder="时间段，如：2020-2022" />
                <textarea v-model="work.description" class="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm h-20 resize-none" placeholder="工作内容描述"></textarea>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 自我评价 -->
    <div class="px-4 mt-3 mb-6">
      <div class="bg-white rounded-xl overflow-hidden">
        <div class="px-4 py-3 border-b border-gray-100">
          <h3 class="text-sm font-semibold text-gray-800">自我评价</h3>
        </div>
        <div class="p-4">
          <div v-if="!isEditing">
            <p class="text-sm text-gray-600 leading-relaxed">{{ resume.selfEvaluation || '暂无自我评价' }}</p>
          </div>
          <div v-else>
            <textarea v-model="resume.selfEvaluation" class="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm h-24 resize-none" placeholder="请简要介绍自己，突出个人优势和特长..."></textarea>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '../store'
import { disabilityTypes, disabilityLevels } from '../data/mock'

const router = useRouter()
const userStore = useUserStore()

const isEditing = ref(false)

const commonJobs = ['行政文员', '客服专员', '数据录入', '普工', '操作工', '会计', '设计师', '程序员', '司机', '保安']

const resume = ref({
  name: '',
  gender: '',
  age: '',
  phone: '',
  email: '',
  address: '',
  disabilityType: '',
  disabilityLevel: '',
  disabilityCard: '',
  expectedJobs: [],
  expectedSalary: '',
  expectedLocation: '',
  jobType: '',
  education: [],
  workExperience: [],
  selfEvaluation: ''
})

// 从store加载用户信息
onMounted(() => {
  const user = userStore.currentUser
  if (user) {
    resume.value.name = user.name || ''
    resume.value.phone = user.phone || ''
    resume.value.disabilityType = user.disabilityType || ''
    resume.value.disabilityLevel = user.disabilityLevel || ''
    resume.value.disabilityCard = user.disabilityCard || ''
  }
  // 从localStorage加载简历数据
  const savedResume = localStorage.getItem('userResume')
  if (savedResume) {
    resume.value = { ...resume.value, ...JSON.parse(savedResume) }
  }
  // 期望职位从求职意向获取
  if (userStore.jobIntention.length > 0) {
    resume.value.expectedJobs = [...userStore.jobIntention]
  }
})

// 计算完成度
const completionRate = computed(() => {
  let score = 0
  let total = 7
  
  if (resume.value.name) score++
  if (resume.value.phone) score++
  if (resume.value.disabilityType && resume.value.disabilityLevel) score++
  if (resume.value.expectedJobs.length > 0) score++
  if (resume.value.expectedSalary) score++
  if (resume.value.education.length > 0) score++
  if (resume.value.workExperience.length > 0) score++
  
  return Math.round((score / total) * 100)
})

const basicInfoComplete = computed(() => resume.value.name && resume.value.phone)
const disabilityInfoComplete = computed(() => resume.value.disabilityType && resume.value.disabilityLevel)
const jobIntentionComplete = computed(() => resume.value.expectedJobs.length > 0 && resume.value.expectedSalary)

// 方法
function toggleJob(job) {
  const index = resume.value.expectedJobs.indexOf(job)
  if (index > -1) {
    resume.value.expectedJobs.splice(index, 1)
  } else {
    resume.value.expectedJobs.push(job)
  }
}

function addEducation() {
  resume.value.education.push({
    school: '',
    major: '',
    degree: '',
    time: ''
  })
}

function removeEducation(index) {
  resume.value.education.splice(index, 1)
}

function addWork() {
  resume.value.workExperience.push({
    company: '',
    position: '',
    time: '',
    description: ''
  })
}

function removeWork(index) {
  resume.value.workExperience.splice(index, 1)
}

function saveResume() {
  // 保存到localStorage
  localStorage.setItem('userResume', JSON.stringify(resume.value))
  // 更新求职意向
  userStore.updateJobIntention(resume.value.expectedJobs)
  // 更新残疾信息
  if (resume.value.disabilityType && resume.value.disabilityLevel) {
    userStore.updateDisabilityInfo(resume.value.disabilityType, resume.value.disabilityLevel, resume.value.disabilityCard)
  }
  isEditing.value = false
  alert('简历保存成功！')
}
</script>
