<template>
  <div class="pb-4">
    <!-- 标签页 -->
    <div class="flex gap-2 px-4 py-3 bg-white overflow-x-auto border-b border-gray-50">
      <span 
        v-for="tab in tabs" 
        :key="tab.value"
        class="px-4 py-1.5 rounded-full text-[13px] whitespace-nowrap cursor-pointer"
        :class="activeTab === tab.value ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600'"
        @click="activeTab = tab.value"
      >
        {{ tab.label }}
      </span>
    </div>

    <!-- 消息列表 -->
    <div v-if="activeTab === 'list'" class="px-4 mt-2">
      <div class="flex flex-col gap-2">
        <div 
          v-for="(msg, index) in messageList" 
          :key="index"
          class="flex gap-3 p-3 bg-white rounded-xl cursor-pointer"
          @click="showMessageDetail(msg)"
        >
          <div 
            class="w-11 h-11 rounded-full flex items-center justify-center text-white text-lg flex-shrink-0"
            :class="getIconClass(msg.type)"
          >
            {{ getIconText(msg.type) }}
          </div>
          <div class="flex-1 min-w-0">
            <div class="flex justify-between items-center mb-1">
              <h4 class="text-sm font-semibold text-gray-800 truncate">{{ msg.title }}</h4>
              <span class="text-[11px] text-gray-400">{{ msg.time }}</span>
            </div>
            <p class="text-[13px] text-gray-500 truncate">{{ msg.desc }}</p>
          </div>
          <div v-if="msg.unread" class="w-2 h-2 rounded-full bg-red-500 flex-shrink-0 mt-2"></div>
        </div>
      </div>
    </div>

    <!-- 聊天列表 -->
    <div v-else class="px-4 mt-2">
      <div class="flex flex-col gap-2">
        <div 
          v-for="(chat, index) in chatList" 
          :key="index"
          class="flex gap-3 p-3 bg-white rounded-xl cursor-pointer"
          @click="goToChat(chat.id)"
        >
          <div class="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-primary-light flex items-center justify-center text-white font-semibold">
            {{ chat.avatar }}
          </div>
          <div class="flex-1 min-w-0">
            <div class="flex justify-between items-center mb-1">
              <h4 class="text-sm font-semibold text-gray-800">{{ chat.name }}</h4>
              <span class="text-[11px] text-gray-400">{{ chat.time }}</span>
            </div>
            <p class="text-[13px] text-gray-500 truncate">{{ chat.preview }}</p>
          </div>
          <span v-if="chat.badge" class="min-w-[20px] h-5 rounded-full bg-red-500 text-white text-[11px] flex items-center justify-center px-1">
            {{ chat.badge }}
          </span>
        </div>
      </div>
    </div>

    <!-- 消息详情弹窗 -->
    <div v-if="showModal" class="fixed inset-0 bg-black/50 z-50 flex items-end" @click.self="showModal = false">
      <div class="w-full max-w-[480px] mx-auto bg-white rounded-t-2xl max-h-[80vh] overflow-y-auto animate-slide-up">
        <div class="flex justify-between items-center p-4 border-b border-gray-100 sticky top-0 bg-white">
          <h3 class="text-base font-semibold text-gray-800">{{ currentMessage.title }}</h3>
          <span class="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 cursor-pointer" @click="showModal = false">×</span>
        </div>
        <div class="p-4 text-sm text-gray-600 leading-relaxed whitespace-pre-line">
          {{ currentMessage.content }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const activeTab = ref('list')

const tabs = [
  { label: '消息列表', value: 'list' },
  { label: '企业聊天', value: 'chat' }
]

const messageList = [
  { type: 'system', title: '欢迎加入宁夏残疾人就业服务平台', desc: '感谢您注册成为我们的会员，这里有海量职位推荐...', time: '2024-01-15 10:30', unread: true, content: '感谢您注册成为我们的会员！宁夏残疾人就业服务平台致力于为残疾人朋友提供全方位的就业服务，包括职位推荐、技能培训、政策咨询等。\n\n我们建议您：\n1. 完善个人简历，提高求职成功率\n2. 及时查看职位推荐\n3. 参加职业技能培训提升竞争力' },
  { type: 'job', title: '为您推荐新职位', desc: '根据您的求职意向，为您推荐以下高薪职位...', time: '2024-01-14 15:20', unread: true, content: '根据您的求职意向和简历情况，为您推荐以下优质岗位。' },
  { type: 'activity', title: '2024年春季残疾人专场招聘会', desc: '宁夏残联将于1月20日举办春季专场招聘会...', time: '2024-01-12 09:00', unread: false, content: '宁夏回族自治区残疾人联合会联合宁夏人力资源和社会保障局举办"2024年春季残疾人专场招聘会"。\n\n📅 时间：2024年1月20日（周六）9:00-14:00\n📍 地点：银川国际会展中心A馆' },
  { type: 'system', title: '您的简历已被企业查看', desc: '宁夏华兴环保科技有限公司查看了您的简历...', time: '2024-01-10 14:30', unread: false, content: '宁夏华兴环保科技有限公司查看了您的简历。' },
  { type: 'job', title: '面试邀请', desc: '宁夏智诚信息咨询有限公司邀请您参加面试...', time: '2024-01-08 11:00', unread: true, content: '宁夏智诚信息咨询有限公司邀请您参加面试。\n\n📋 岗位：数据录入员\n💰 薪资：2500-3500元/月\n🕐 面试时间：2024年1月18日（周四）上午10:00' }
]

const chatList = [
  { id: 1, name: '宁夏华兴环保科技', avatar: '宁', time: '10:30', preview: '您好，请问您投递的简历已收到...', badge: 2 },
  { id: 2, name: '智诚信息咨询', avatar: '智', time: '昨天', preview: '恭喜您通过初筛，请于明天上午...', badge: 0 },
  { id: 3, name: '京东电商服务', avatar: '京', time: '周一', preview: '感谢您的投递，我们正在整理...', badge: 1 },
  { id: 4, name: '西部软件园', avatar: '西', time: '1/15', preview: '您好，关于软件测试工程师岗...', badge: 0 },
  { id: 5, name: '中国电信宁夏分公司', avatar: '电', time: '1/12', preview: '欢迎加入中国电信，期待您的...', badge: 5 }
]

const showModal = ref(false)
const currentMessage = ref({})

function getIconClass(type) {
  const classes = {
    system: 'bg-gradient-to-br from-purple-500 to-purple-600',
    job: 'bg-gradient-to-br from-green-500 to-green-400',
    activity: 'bg-gradient-to-br from-pink-500 to-pink-600'
  }
  return classes[type] || 'bg-gray-500'
}

function getIconText(type) {
  const texts = {
    system: '系',
    job: '岗',
    activity: '活'
  }
  return texts[type] || '?'
}

function showMessageDetail(msg) {
  currentMessage.value = msg
  showModal.value = true
}

function goToChat(id) {
  router.push(`/chat/${id}`)
}
</script>

<style scoped>
.animate-slide-up {
  animation: slideUp 0.3s ease;
}
@keyframes slideUp {
  from { transform: translateY(100%); }
  to { transform: translateY(0); }
}
</style>
