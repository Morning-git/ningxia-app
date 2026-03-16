import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useUserStore = defineStore('user', () => {
  const currentUser = ref(null)
  const collections = ref([])
  const applications = ref([])
  const demands = ref([])
  const jobIntention = ref(['行政文员', '客服专员', '普工'])
  const chatMessages = ref({
    1: [{ from: 'company', text: '您好！感谢您投递简历到本公司职位。' }],
    2: [{ from: 'company', text: '您好！恭喜您通过初筛，请于明天上午参加面试。' }],
    3: [{ from: 'company', text: '感谢您的投递，我们正在整理简历，稍后与您联系。' }]
  })

  const isLoggedIn = computed(() => !!currentUser.value)

  function loadFromStorage() {
    const userStr = localStorage.getItem('currentUser')
    const collectionsStr = localStorage.getItem('collections')
    const applicationsStr = localStorage.getItem('applications')
    const demandsStr = localStorage.getItem('demands')
    const jobIntentionStr = localStorage.getItem('jobIntention')
    const messagesStr = localStorage.getItem('chatMessages')
    
    if (userStr) currentUser.value = JSON.parse(userStr)
    if (collectionsStr) collections.value = JSON.parse(collectionsStr)
    if (applicationsStr) applications.value = JSON.parse(applicationsStr)
    if (demandsStr) demands.value = JSON.parse(demandsStr)
    if (jobIntentionStr) jobIntention.value = JSON.parse(jobIntentionStr)
    if (messagesStr) chatMessages.value = JSON.parse(messagesStr)
  }

  function saveToStorage() {
    localStorage.setItem('currentUser', JSON.stringify(currentUser.value))
    localStorage.setItem('collections', JSON.stringify(collections.value))
    localStorage.setItem('applications', JSON.stringify(applications.value))
    localStorage.setItem('demands', JSON.stringify(demands.value))
    localStorage.setItem('jobIntention', JSON.stringify(jobIntention.value))
    localStorage.setItem('chatMessages', JSON.stringify(chatMessages.value))
  }

  function login(phone, password) {
    currentUser.value = {
      name: '用户' + phone.slice(-4),
      phone: phone
    }
    saveToStorage()
  }

  function register(userData) {
    currentUser.value = userData
    saveToStorage()
  }

  function logout() {
    currentUser.value = null
    localStorage.removeItem('currentUser')
  }

  function updateDisabilityInfo(disabilityType, disabilityLevel, disabilityCard) {
    if (currentUser.value) {
      currentUser.value.disabilityType = disabilityType
      currentUser.value.disabilityLevel = disabilityLevel
      currentUser.value.disabilityCard = disabilityCard
      currentUser.value.hasDisabilityCard = !!disabilityCard
      saveToStorage()
    }
  }

  function toggleCollect(jobId) {
    const index = collections.value.indexOf(jobId)
    if (index > -1) {
      collections.value.splice(index, 1)
    } else {
      collections.value.push(jobId)
    }
    saveToStorage()
  }

  function isCollected(jobId) {
    return collections.value.includes(jobId)
  }

  function addApplication(job) {
    const exists = applications.value.find(a => a.jobId === job.id)
    if (!exists) {
      applications.value.unshift({
        jobId: job.id,
        jobTitle: job.title,
        company: job.company,
        salary: job.salary,
        time: new Date().toLocaleString(),
        status: 'pending'
      })
      saveToStorage()
    }
  }

  function addDemand(type, desc) {
    demands.value.unshift({
      type,
      desc,
      time: new Date().toLocaleString(),
      status: '处理中'
    })
    saveToStorage()
  }

  function updateJobIntention(positions) {
    jobIntention.value = positions
    saveToStorage()
  }

  function sendMessage(chatId, text) {
    if (!chatMessages.value[chatId]) {
      chatMessages.value[chatId] = []
    }
    chatMessages.value[chatId].push({ from: 'user', text })
    saveToStorage()
  }

  function getMessages(chatId) {
    return chatMessages.value[chatId] || []
  }

  loadFromStorage()

  return {
    currentUser,
    collections,
    applications,
    demands,
    jobIntention,
    chatMessages,
    isLoggedIn,
    login,
    register,
    logout,
    updateDisabilityInfo,
    toggleCollect,
    isCollected,
    addApplication,
    addDemand,
    updateJobIntention,
    sendMessage,
    getMessages,
    loadFromStorage
  }
})
