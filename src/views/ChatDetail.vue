<template>
  <div class="h-full flex flex-col">
    <!-- 标题栏 -->
    <div class="flex items-center gap-3 px-4 py-3 bg-white border-b border-gray-100">
      <span class="text-2xl text-gray-800 cursor-pointer" @click="$router.back()">&#8249;</span>
      <h3 class="text-base font-semibold text-gray-800">{{ company?.name || '企业名称' }}</h3>
    </div>

    <!-- 消息列表 -->
    <div ref="messagesContainer" class="flex-1 p-4 overflow-y-auto bg-gray-100">
      <div class="flex flex-col gap-4">
        <div 
          v-for="(msg, index) in messages" 
          :key="index"
          class="flex gap-2"
          :class="msg.from === 'user' ? 'flex-row-reverse' : ''"
        >
          <div 
            class="w-9 h-9 rounded-full flex items-center justify-center text-white text-sm flex-shrink-0"
            :class="msg.from === 'user' ? 'bg-gradient-to-br from-blue-500 to-blue-600' : 'bg-gradient-to-br from-primary to-primary-light'"
          >
            {{ msg.from === 'user' ? '我' : company?.avatar }}
          </div>
          <div 
            class="px-4 py-2 rounded-2xl text-sm max-w-[70%]"
            :class="msg.from === 'user' ? 'bg-primary text-white' : 'bg-white text-gray-800'"
          >
            {{ msg.text }}
          </div>
        </div>
      </div>
    </div>

    <!-- 输入框 -->
    <div class="flex items-center gap-2 px-4 py-3 bg-white border-t border-gray-100">
      <input 
        v-model="inputText"
        type="text" 
        placeholder="请输入消息..."
        class="flex-1 px-4 py-2 bg-gray-100 rounded-full text-sm outline-none"
        @keyup.enter="sendMessage"
      />
      <button 
        @click="sendMessage"
        class="px-4 py-2 bg-primary text-white rounded-full text-sm"
      >
        发送
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, nextTick, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useUserStore } from '../store'
import { chatCompanies } from '../data/mock'

const route = useRoute()
const userStore = useUserStore()

const chatId = computed(() => parseInt(route.params.id))
const company = computed(() => chatCompanies[chatId.value])
const messages = ref([])
const inputText = ref('')
const messagesContainer = ref(null)

onMounted(() => {
  messages.value = userStore.getMessages(chatId.value) || []
  if (messages.value.length === 0) {
    messages.value = [{ from: 'company', text: '您好！感谢您投递简历到本公司职位。' }]
  }
  scrollToBottom()
})

function scrollToBottom() {
  nextTick(() => {
    if (messagesContainer.value) {
      messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
    }
  })
}

function sendMessage() {
  const text = inputText.value.trim()
  if (!text) return

  messages.value.push({ from: 'user', text })
  userStore.sendMessage(chatId.value, text)
  inputText.value = ''
  scrollToBottom()

  setTimeout(() => {
    const replies = [
      '感谢您的消息，我们会尽快处理。',
      '好的，有任何问题随时联系我们。',
      '期待与您的进一步沟通。',
      '我们已经收到您的信息。',
      '请保持手机畅通，我们会联系您。'
    ]
    const reply = replies[Math.floor(Math.random() * replies.length)]
    messages.value.push({ from: 'company', text: reply })
    scrollToBottom()
  }, 1000)
}
</script>
