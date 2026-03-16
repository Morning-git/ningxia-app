<template>
  <div class="pb-4">
    <!-- 搜索栏 -->
    <div class="flex gap-2 px-4 py-4 bg-white">
      <input 
        v-model="searchKeyword"
        type="text" 
        placeholder="搜索职位/企业/地点"
        class="flex-1 px-4 py-2 bg-gray-100 rounded-full text-sm outline-none focus:border-primary"
        @keyup.enter="handleSearch"
      />
      <button 
        @click="handleSearch"
        class="px-4 py-2 bg-primary text-white rounded-full text-sm"
      >
        搜索
      </button>
    </div>

    <!-- 筛选条件栏：快速筛选 + 排序/筛选 -->
    <div class="flex items-center justify-between px-4 py-2 bg-white border-t border-gray-100">
      <!-- 左侧：快速筛选标签 -->
      <div class="flex gap-2 overflow-x-auto scrollbar-hide pr-2">
        <span 
          v-for="tab in quickFilterTabs" 
          :key="tab.value"
          class="px-3 py-1.5 rounded-full text-[12px] whitespace-nowrap cursor-pointer transition-colors flex-shrink-0"
          :class="activeQuickFilter === tab.value ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600'"
          @click="activeQuickFilter = tab.value"
        >
          {{ tab.label }}
        </span>
      </div>

      <!-- 右侧：排序 + 筛选 -->
      <div class="flex items-center gap-2 flex-shrink-0">
        <!-- 排序 -->
        <div 
          class="flex items-center gap-1 px-3 py-1.5 bg-gray-100 rounded-full text-[12px] text-gray-600 cursor-pointer"
          :class="{ 'bg-primary text-white': activeSort !== 'default' }"
          @click="showSortPanel = !showSortPanel"
        >
          <span>{{ sortLabel }}</span>
          <span class="text-[10px]">{{ showSortPanel ? '▲' : '▼' }}</span>
        </div>

        <!-- 筛选 -->
        <div 
          class="flex items-center gap-1 px-3 py-1.5 rounded-full text-[12px] cursor-pointer"
          :class="filterCount > 0 ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600'"
          @click="showMoreFilter = true"
        >
          <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M3 18h6v-2H3v2zM3 6v2h18V6H3zm0 7h12v-2H3v2z"/>
          </svg>
          <span>筛选</span>
          <span v-if="filterCount > 0" class="ml-0.5 text-[10px]">({{ filterCount }})</span>
        </div>
      </div>
    </div>

    <!-- 已选筛选条件展示 -->
    <div v-if="activeFilters.length > 0" class="flex items-center gap-2 px-4 py-2 bg-white border-t border-gray-100 flex-wrap">
      <span class="text-xs text-gray-400">已选：</span>
      <span 
        v-for="filter in activeFilters" 
        :key="filter.key"
        class="flex items-center gap-1 px-2 py-1 bg-green-50 text-green-700 text-xs rounded-full"
      >
        {{ filter.label }}
        <span class="cursor-pointer" @click="clearFilter(filter.key)">×</span>
      </span>
      <span class="text-xs text-gray-400 cursor-pointer ml-2" @click="resetAllFilters">清空全部</span>
    </div>

    <!-- 排序面板 -->
    <div v-if="showSortPanel" class="bg-white border-t border-gray-100 p-4">
      <div class="flex flex-col gap-2">
        <div 
          v-for="sort in sortOptions" 
          :key="sort.value"
          class="flex items-center justify-between p-3 rounded-lg cursor-pointer"
          :class="activeSort === sort.value ? 'bg-primary/10' : 'hover:bg-gray-50'"
          @click="selectSort(sort.value)"
        >
          <span class="text-sm" :class="activeSort === sort.value ? 'text-primary font-medium' : 'text-gray-700'">{{ sort.label }}</span>
          <span v-if="activeSort === sort.value" class="text-primary">✓</span>
        </div>
      </div>
    </div>

    <!-- 底部筛选弹窗 -->
    <div v-if="showMoreFilter" class="fixed inset-0 bg-black/50 z-50 flex items-end" @click.self="showMoreFilter = false">
      <div class="w-full max-w-[480px] mx-auto bg-white rounded-t-2xl max-h-[80vh] overflow-y-auto">
        <!-- 头部 -->
        <div class="flex justify-between items-center p-4 border-b border-gray-100 sticky top-0 bg-white">
          <h3 class="text-base font-semibold text-gray-800">筛选条件</h3>
          <span class="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 cursor-pointer" @click="showMoreFilter = false">×</span>
        </div>

        <div class="p-4 space-y-6">
          <!-- 工作类型 -->
          <div>
            <h4 class="text-sm font-semibold text-gray-800 mb-3">工作类型</h4>
            <div class="flex flex-wrap gap-2">
              <span 
                v-for="type in workTypeOptions" 
                :key="type"
                class="px-3 py-1.5 rounded-lg text-[13px] cursor-pointer transition-colors"
                :class="selectedWorkType === type ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600'"
                @click="selectedWorkType = type"
              >
                {{ type }}
              </span>
            </div>
          </div>

          <!-- 工作模式 -->
          <div>
            <h4 class="text-sm font-semibold text-gray-800 mb-3">工作模式</h4>
            <div class="flex flex-wrap gap-2">
              <span 
                v-for="mode in workModeOptions" 
                :key="mode.value"
                class="px-3 py-1.5 rounded-lg text-[13px] cursor-pointer transition-colors"
                :class="selectedWorkMode === mode.value ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600'"
                @click="selectedWorkMode = mode.value"
              >
                {{ mode.label }}
              </span>
            </div>
          </div>

          <!-- 残疾类型 -->
          <div>
            <h4 class="text-sm font-semibold text-gray-800 mb-3">适合残疾类型</h4>
            <div class="flex flex-wrap gap-2">
              <span 
                v-for="type in disabilityTypes" 
                :key="type"
                class="px-3 py-1.5 rounded-lg text-[13px] cursor-pointer transition-colors"
                :class="selectedDisabilityType === type ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600'"
                @click="selectedDisabilityType = type"
              >
                {{ type }}
              </span>
            </div>
          </div>

          <!-- 残疾等级 -->
          <div>
            <h4 class="text-sm font-semibold text-gray-800 mb-3">适合残疾等级</h4>
            <div class="flex flex-wrap gap-2">
              <span 
                v-for="level in disabilityLevels" 
                :key="level.value"
                class="px-3 py-1.5 rounded-lg text-[13px] cursor-pointer transition-colors"
                :class="selectedDisabilityLevel === level.value ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600'"
                @click="selectedDisabilityLevel = level.value"
              >
                {{ level.label }}
              </span>
            </div>
          </div>

          <!-- 企业福利 -->
          <div>
            <h4 class="text-sm font-semibold text-gray-800 mb-3">企业福利</h4>
            <div class="flex flex-wrap gap-2">
              <span 
                v-for="welfare in welfareOptions" 
                :key="welfare"
                class="px-3 py-1.5 rounded-lg text-[13px] cursor-pointer transition-colors"
                :class="selectedWelfares.includes(welfare) ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600'"
                @click="toggleWelfare(welfare)"
              >
                {{ welfare }}
              </span>
            </div>
          </div>

          <!-- 地区 -->
          <div>
            <h4 class="text-sm font-semibold text-gray-800 mb-3">工作地区</h4>
            <div class="flex flex-wrap gap-2">
              <span 
                v-for="loc in locationOptions" 
                :key="loc"
                class="px-3 py-1.5 rounded-lg text-[13px] cursor-pointer transition-colors"
                :class="selectedLocation === loc ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600'"
                @click="selectedLocation = loc"
              >
                {{ loc }}
              </span>
            </div>
          </div>

          <!-- 薪资范围 -->
          <div>
            <h4 class="text-sm font-semibold text-gray-800 mb-3">薪资范围</h4>
            <div class="flex flex-wrap gap-2">
              <span 
                v-for="salary in salaryRanges" 
                :key="salary.value"
                class="px-3 py-1.5 rounded-lg text-[13px] cursor-pointer transition-colors"
                :class="selectedSalary === salary.value ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600'"
                @click="selectedSalary = salary.value"
              >
                {{ salary.label }}
              </span>
            </div>
          </div>

          <!-- 公司规模 -->
          <div>
            <h4 class="text-sm font-semibold text-gray-800 mb-3">公司规模</h4>
            <div class="flex flex-wrap gap-2">
              <span 
                v-for="scale in companyScaleOptions" 
                :key="scale"
                class="px-3 py-1.5 rounded-lg text-[13px] cursor-pointer transition-colors"
                :class="selectedCompanyScale === scale ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600'"
                @click="selectedCompanyScale = scale"
              >
                {{ scale }}
              </span>
            </div>
          </div>
        </div>

        <!-- 底部按钮 -->
        <div class="flex gap-3 p-4 border-t border-gray-100 sticky bottom-0 bg-white">
          <button 
            class="flex-1 py-3 bg-gray-100 rounded-xl text-sm text-gray-600"
            @click="resetFilter"
          >
            重置
          </button>
          <button 
            class="flex-1 py-3 bg-primary rounded-xl text-sm text-white"
            @click="applyFilter"
          >
            确定 ({{ filteredJobsCount }}个职位)
          </button>
        </div>
      </div>
    </div>

    <!-- 职位列表 -->
    <div class="px-4 mt-2">
      <div class="flex justify-between items-center mb-2">
        <span class="text-xs text-gray-400">共 {{ filteredJobs.length }} 个职位</span>
      </div>
      <JobList 
        :jobs="displayJobs" 
        :has-more="hasMore"
        :loading="loading"
        @click="goToJobDetail"
        @load-more="loadMore"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useUserStore } from '../store'
import { jobsData, companyData } from '../data/mock'
import JobList from '../components/common/JobList.vue'

const router = useRouter()
const route = useRoute()
const userStore = useUserStore()

// 搜索和筛选状态
const searchKeyword = ref('')
const activeQuickFilter = ref('all')
const activeSort = ref('default')
const showSortPanel = ref(false)
const showMoreFilter = ref(false)
const activeFilterPanel = ref('')

// 筛选条件
const selectedLocation = ref('全部')
const selectedWorkType = ref('不限')
const selectedWorkMode = ref('all')
const selectedDisabilityType = ref('全部')
const selectedDisabilityLevel = ref('all')
const selectedSalary = ref('不限')
const selectedWelfares = ref([])
const selectedCompanyScale = ref('不限')

// 分页
const PAGE_SIZE = 10
const currentPage = ref(1)
const loading = ref(false)
const hasMore = ref(true)

// 快速筛选标签（从求职意向获取）
const defaultPositions = ['行政文员', '客服专员', '数据录入']

const quickFilterTabs = computed(() => {
  const positions = userStore.jobIntention.length > 0 
    ? userStore.jobIntention 
    : defaultPositions
  return [
    { label: '全部', value: 'all' },
    ...positions.slice(0, 5).map(pos => ({ label: pos, value: pos }))
  ]
})

// 工作类型选项
const workTypeOptions = ['不限', '全职', '兼职', '实习', '临时工']

// 工作模式选项
const workModeOptions = [
  { label: '全部', value: 'all' },
  { label: '办公室坐班', value: 'office' },
  { label: '居家办公', value: 'home' },
  { label: '户外工作', value: 'outdoor' },
  { label: '混合办公', value: 'hybrid' }
]

// 残疾类型选项
const disabilityTypes = ['全部', '肢体残疾', '视力残疾', '听力残疾', '言语残疾', '智力残疾', '精神残疾', '多重残疾']

// 残疾等级选项
const disabilityLevels = [
  { label: '全部', value: 'all' },
  { label: '一级(重度)', value: '1' },
  { label: '二级(中度)', value: '2' },
  { label: '三级(轻度)', value: '3' },
  { label: '四级', value: '4' }
]

// 地区选项
const locationOptions = ['全部', '银川市', '石嘴山', '吴忠市', '固原市', '中卫市', '宁夏全区']

// 薪资范围
const salaryRanges = [
  { label: '不限', value: '不限' },
  { label: '2K以下', value: '1' },
  { label: '2K-3K', value: '2' },
  { label: '3K-5K', value: '3' },
  { label: '5K-8K', value: '4' },
  { label: '8K-10K', value: '5' },
  { label: '10K以上', value: '6' }
]

// 企业福利选项
const welfareOptions = ['五险一金', '双休', '包吃住', '带薪年假', '年终奖', '带薪培训', '可居家', '时间灵活']

// 公司规模选项
const companyScaleOptions = ['不限', '20人以下', '20-50人', '50-100人', '100-500人', '500人以上']

// 排序选项
const sortOptions = [
  { label: '默认排序', value: 'default' },
  { label: '最新发布', value: 'latest' },
  { label: '薪资最高', value: 'salary-high' },
  { label: '薪资最低', value: 'salary-low' },
  { label: '离我最近', value: 'nearest' }
]

// 计算属性
const sortLabel = computed(() => {
  const sort = sortOptions.find(s => s.value === activeSort.value)
  return sort ? sort.label : '默认排序'
})

// 已选筛选条件
const activeFilters = computed(() => {
  const filters = []
  if (selectedLocation.value !== '全部') {
    filters.push({ key: 'location', label: selectedLocation.value })
  }
  if (selectedWorkType.value !== '不限') {
    filters.push({ key: 'workType', label: selectedWorkType.value })
  }
  if (selectedWorkMode.value !== 'all') {
    const mode = workModeOptions.find(m => m.value === selectedWorkMode.value)
    filters.push({ key: 'workMode', label: mode?.label })
  }
  if (selectedDisabilityType.value !== '全部') {
    filters.push({ key: 'disabilityType', label: selectedDisabilityType.value })
  }
  if (selectedDisabilityLevel.value !== 'all') {
    const level = disabilityLevels.find(l => l.value === selectedDisabilityLevel.value)
    filters.push({ key: 'disabilityLevel', label: level?.label })
  }
  if (selectedSalary.value !== '不限') {
    const salary = salaryRanges.find(s => s.value === selectedSalary.value)
    filters.push({ key: 'salary', label: salary?.label })
  }
  if (selectedWelfares.value.length > 0) {
    filters.push({ key: 'welfare', label: `${selectedWelfares.value.length}项福利` })
  }
  if (selectedCompanyScale.value !== '不限') {
    filters.push({ key: 'companyScale', label: selectedCompanyScale.value })
  }
  return filters
})

// 筛选数量
const filterCount = computed(() => activeFilters.value.length)

// 过滤后的职位
const filteredJobs = computed(() => {
  let result = [...jobsData]

  // 搜索筛选
  if (searchKeyword.value) {
    const keyword = searchKeyword.value.toLowerCase()
    result = result.filter(job => 
      job.title.toLowerCase().includes(keyword) ||
      job.company.toLowerCase().includes(keyword) ||
      job.location.toLowerCase().includes(keyword)
    )
  }

  // 快速筛选（按岗位名称）
  if (activeQuickFilter.value !== 'all') {
    result = result.filter(job => job.title.includes(activeQuickFilter.value))
  }

  // 地区筛选
  if (selectedLocation.value !== '全部') {
    result = result.filter(job => job.location.includes(selectedLocation.value.replace('市', '')))
  }

  // 工作类型筛选
  if (selectedWorkType.value !== '不限') {
    result = result.filter(job => job.type === selectedWorkType.value)
  }

  // 工作模式筛选
  if (selectedWorkMode.value !== 'all') {
    result = result.filter(job => {
      const access = job.accessibility || ''
      const tags = job.tags || []
      switch(selectedWorkMode.value) {
        case 'home':
          return access.includes('居家') || tags.some(t => t.includes('居家'))
        case 'office':
          return !access.includes('居家')
        case 'outdoor':
          return access.includes('户外')
        default:
          return true
      }
    })
  }

  // 残疾类型筛选
  if (selectedDisabilityType.value !== '全部') {
    result = result.filter(job => 
      job.suitableDisability?.some(d => d.type === selectedDisabilityType.value)
    )
  }

  // 残疾等级筛选
  if (selectedDisabilityLevel.value !== 'all') {
    const level = parseInt(selectedDisabilityLevel.value)
    result = result.filter(job => 
      job.suitableDisability?.some(d => d.level === level)
    )
  }

  // 薪资筛选
  if (selectedSalary.value !== '不限') {
    result = result.filter(job => {
      const salaryNums = job.salary.match(/\d+/g)
      if (!salaryNums || salaryNums.length === 0) return false
      const minSalary = parseInt(salaryNums[0]) * 1000
      const maxSalary = salaryNums.length > 1 ? parseInt(salaryNums[1]) * 1000 : minSalary

      switch(selectedSalary.value) {
        case '1': return maxSalary < 2000
        case '2': return minSalary >= 2000 && maxSalary < 3000
        case '3': return minSalary >= 3000 && maxSalary < 5000
        case '4': return minSalary >= 5000 && maxSalary < 8000
        case '5': return minSalary >= 8000 && maxSalary < 10000
        case '6': return minSalary >= 10000
        default: return true
      }
    })
  }

  // 福利筛选
  if (selectedWelfares.value.length > 0) {
    result = result.filter(job => 
      selectedWelfares.value.every(welfare => job.tags?.includes(welfare))
    )
  }

  // 公司规模筛选
  if (selectedCompanyScale.value !== '不限') {
    result = result.filter(job => {
      const company = companyData[job.company]
      if (!company) return true
      return company.scale === selectedCompanyScale.value
    })
  }

  return result
})

const filteredJobsCount = computed(() => filteredJobs.value.length)

// 排序后的职位
const sortedJobs = computed(() => {
  const result = [...filteredJobs.value]
  
  switch(activeSort.value) {
    case 'latest':
      return result.sort((a, b) => b.id - a.id)
    case 'salary-high':
      return result.sort((a, b) => {
        const salaryA = parseInt(a.salary.match(/\d+/g)?.[0] || 0)
        const salaryB = parseInt(b.salary.match(/\d+/g)?.[0] || 0)
        return salaryB - salaryA
      })
    case 'salary-low':
      return result.sort((a, b) => {
        const salaryA = parseInt(a.salary.match(/\d+/g)?.[0] || 0)
        const salaryB = parseInt(b.salary.match(/\d+/g)?.[0] || 0)
        return salaryA - salaryB
      })
    default:
      return result
  }
})

// 显示的职位
const displayJobs = computed(() => {
  return sortedJobs.value.slice(0, currentPage.value * PAGE_SIZE)
})

// 监听筛选变化，重置分页
watch([searchKeyword, activeQuickFilter, selectedLocation, selectedSalary, 
        selectedWorkType, selectedWorkMode, selectedDisabilityType, 
        selectedDisabilityLevel, selectedWelfares, selectedCompanyScale, activeSort], () => {
  resetPagination()
}, { deep: true })

// 方法
function handleSearch() {
  resetPagination()
}

function resetPagination() {
  currentPage.value = 1
  hasMore.value = true
}

function loadMore() {
  if (loading.value || !hasMore.value) return
  loading.value = true
  setTimeout(() => {
    currentPage.value++
    if (displayJobs.value.length >= sortedJobs.value.length) {
      hasMore.value = false
    }
    loading.value = false
  }, 500)
}

function openFilterPanel(type) {
  activeFilterPanel.value = type
  showMoreFilter.value = true
}

function toggleWelfare(welfare) {
  const index = selectedWelfares.value.indexOf(welfare)
  if (index > -1) {
    selectedWelfares.value.splice(index, 1)
  } else {
    selectedWelfares.value.push(welfare)
  }
}

function clearFilter(key) {
  switch(key) {
    case 'location': selectedLocation.value = '全部'; break
    case 'workType': selectedWorkType.value = '不限'; break
    case 'workMode': selectedWorkMode.value = 'all'; break
    case 'disabilityType': selectedDisabilityType.value = '全部'; break
    case 'disabilityLevel': selectedDisabilityLevel.value = 'all'; break
    case 'salary': selectedSalary.value = '不限'; break
    case 'welfare': selectedWelfares.value = []; break
    case 'companyScale': selectedCompanyScale.value = '不限'; break
  }
}

function resetAllFilters() {
  selectedLocation.value = '全部'
  selectedWorkType.value = '不限'
  selectedWorkMode.value = 'all'
  selectedDisabilityType.value = '全部'
  selectedDisabilityLevel.value = 'all'
  selectedSalary.value = '不限'
  selectedWelfares.value = []
  selectedCompanyScale.value = '不限'
  activeQuickFilter.value = 'all'
}

function resetFilter() {
  selectedLocation.value = '全部'
  selectedWorkType.value = '不限'
  selectedWorkMode.value = 'all'
  selectedDisabilityType.value = '全部'
  selectedDisabilityLevel.value = 'all'
  selectedSalary.value = '不限'
  selectedWelfares.value = []
  selectedCompanyScale.value = '不限'
}

function applyFilter() {
  showMoreFilter.value = false
  resetPagination()
}

function selectSort(value) {
  activeSort.value = value
  showSortPanel.value = false
}

function goToJobDetail(jobOrId) {
  const id = typeof jobOrId === 'object' ? jobOrId.id : jobOrId
  router.push(`/job/${id}`)
}

// 页面加载时处理URL参数
onMounted(() => {
  if (route.query.type === 'parttime') {
    selectedWorkType.value = '兼职'
  }
  if (route.query.type === 'flex') {
    selectedWorkMode.value = 'home'
  }
  if (route.query.keyword) {
    searchKeyword.value = route.query.keyword
  }
  if (route.query.location) {
    selectedLocation.value = route.query.location
  }
})
</script>

<style scoped>
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
