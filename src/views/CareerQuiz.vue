<template>
  <div class="pb-4">
    <!-- 标题栏 -->
    <div class="flex items-center gap-3 px-4 py-3 bg-white border-b border-gray-100 sticky top-0 z-10">
      <span class="text-2xl text-gray-800 cursor-pointer" @click="$router.back()">&#8249;</span>
      <h3 class="text-base font-semibold text-gray-800">职业测评</h3>
    </div>

    <div class="p-4">
      <div class="bg-gradient-to-r from-pink-500 to-pink-600 rounded-xl p-4 text-white mb-4">
        <h3 class="text-base font-semibold mb-1">职业兴趣测评</h3>
        <p class="text-xs opacity-80">科学评估您的职业发展方向</p>
      </div>

      <!-- 测评题目 -->
      <div v-if="currentQuestion < questions.length" class="bg-white rounded-xl p-4">
        <div class="flex justify-between items-center mb-4">
          <span class="text-sm text-gray-500">第 {{ currentQuestion + 1 }} 题</span>
          <span class="text-sm text-gray-400">{{ currentQuestion + 1 }}/{{ questions.length }}</span>
        </div>
        
        <p class="text-base text-gray-800 font-medium mb-4">{{ questions[currentQuestion].question }}</p>
        
        <div class="space-y-2">
          <div 
            v-for="(option, index) in questions[currentQuestion].options" 
            :key="index"
            class="p-3 border border-gray-200 rounded-lg cursor-pointer"
            :class="answers[currentQuestion] === index ? 'border-primary bg-primary/5' : ''"
            @click="selectAnswer(index)"
          >
            <span class="text-sm text-gray-700">{{ option }}</span>
          </div>
        </div>

        <button 
          v-if="currentQuestion < questions.length - 1"
          class="w-full py-3 bg-primary text-white rounded-lg text-sm mt-4"
          :disabled="answers[currentQuestion] === undefined"
          @click="nextQuestion"
        >
         下一题
        </button>
        <button 
          v-else
          class="w-full py-3 bg-primary text-white rounded-lg text-sm mt-4"
          :disabled="!isCompleted"
          @click="showResult"
        >
          查看结果
        </button>
      </div>

      <!-- 测评结果 -->
      <div v-else class="bg-white rounded-xl p-4">
        <div class="text-center mb-4">
          <div class="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-2">
            <span class="text-3xl">🎉</span>
          </div>
          <h4 class="text-base font-semibold text-gray-800">测评完成</h4>
        </div>

        <div class="mb-4 p-3 bg-gray-50 rounded-lg">
          <h5 class="text-sm font-semibold text-gray-800 mb-2">推荐职业方向</h5>
          <p class="text-sm text-gray-600">{{ result.recommendation }}</p>
        </div>

        <div class="mb-4 p-3 bg-gray-50 rounded-lg">
          <h5 class="text-sm font-semibold text-gray-800 mb-2">职业性格分析</h5>
          <p class="text-sm text-gray-600">{{ result.personality }}</p>
        </div>

        <button class="w-full py-3 bg-primary text-white rounded-lg text-sm" @click="goToJobs">
          查看推荐职位
        </button>
        <button class="w-full py-3 border border-primary text-primary rounded-lg text-sm mt-2" @click="resetQuiz">
          重新测评
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const questions = [
  {
    question: '您更喜欢的工作环境是？',
    options: ['办公室/室内', '户外/灵活', '居家/远程', '无特定要求']
  },
  {
    question: '您擅长的工作类型是？',
    options: ['沟通协调类', '技术研发类', '创意设计类', '执行操作类']
  },
  {
    question: '您期望的工作方式是？',
    options: ['全职稳定', '兼职灵活', '居家办公', '项目制']
  },
  {
    question: '您更看重什么？',
    options: ['薪资待遇', '发展空间', '工作氛围', '工作稳定性']
  }
]

const currentQuestion = ref(0)
const answers = ref([])
const result = ref({
  recommendation: '行政文员、客服专员、数据录入员',
  personality: '您性格稳重踏实，善于沟通，有较强的责任心。适合从事需要细心和耐心的工作。'
})

const isCompleted = computed(() => {
  return answers.value.length === questions.length && answers.value.every(a => a !== undefined)
})

function selectAnswer(index) {
  answers.value[currentQuestion.value] = index
}

function nextQuestion() {
  if (currentQuestion.value < questions.length - 1) {
    currentQuestion.value++
  }
}

function showResult() {
  currentQuestion.value = questions.length
}

function resetQuiz() {
  currentQuestion.value = 0
  answers.value = []
}

function goToJobs() {
  router.push('/jobs')
}
</script>
