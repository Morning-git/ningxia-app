<template>
  <div 
    class="bg-white rounded-xl p-4 shadow-sm active:scale-[0.98] transition-transform"
  >
    <div class="cursor-pointer" @click="$emit('click')">
      <div class="flex justify-between items-start mb-2">
        <span class="text-sm font-semibold text-gray-800">{{ job.title }}</span>
        <span class="text-sm text-red-500 font-medium">{{ job.salary }}</span>
      </div>
      <div class="flex gap-4 text-[13px] text-gray-500 mb-2">
        <span class="flex items-center gap-1">
          <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
          {{ job.location }}
        </span>
        <span class="flex items-center gap-1">
          <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-6 0h-4V4h4v2z"/></svg>
          {{ job.type }}
        </span>
      </div>
      <div class="text-[13px] text-gray-400 mb-2 flex items-center gap-1">
        <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10zm-2-8h-2v2h2v-2zm0 4h-2v2h2v-2z"/></svg>
        {{ job.company }}
      </div>
      <div class="flex gap-2 flex-wrap">
        <span 
          v-if="job.disabilityFriendly && job.suitableDisability"
          class="text-[11px] px-2 py-1 bg-orange-50 text-orange-500 rounded"
        >
          {{ formatDisabilityText(job.suitableDisability) }}
        </span>
        <span 
          v-for="tag in job.tags" 
          :key="tag"
          class="text-[11px] px-2 py-1 bg-green-50 text-green-600 rounded"
        >
          {{ tag }}
        </span>
      </div>
    </div>
    <div class="flex gap-2 mt-3 pt-3 border-t border-gray-100">
      <button 
        class="flex-1 py-2 rounded-lg text-xs font-medium border border-primary text-primary flex items-center justify-center gap-1"
        @click.stop="handleChat"
      >
        <svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"/></svg>
        联系企业
      </button>
      <button 
        class="flex-1 py-2 rounded-lg text-xs font-medium bg-primary text-white flex items-center justify-center gap-1"
        @click.stop="handleApply"
      >
        <svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg>
        立即投递
      </button>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useUserStore } from '../../store'
import { jobToChatMap } from '../../data/mock'

function formatDisabilityText(disabilities) {
  if (!disabilities || disabilities.length === 0) return ''
  const formatted = disabilities.slice(0, 2).map(d => {
    if (d.level) {
      return `${d.type}${d.level}级`
    }
    return d.type || d
  })
  if (disabilities.length > 2) {
    formatted.push('...')
  }
  return formatted.join('')
}

const props = defineProps({
  job: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['click'])
const router = useRouter()
const userStore = useUserStore()

function handleChat() {
  if (!userStore.isLoggedIn) {
    router.push('/login')
    return
  }
  const chatId = jobToChatMap[props.job.id]
  if (chatId) {
    router.push(`/chat/${chatId}`)
  } else {
    alert('暂不支持与企业聊天，请电话联系企业。')
  }
}

function handleApply() {
  if (!userStore.isLoggedIn) {
    router.push('/login')
    return
  }
  const exists = userStore.applications.find(a => a.jobId === props.job.id)
  if (exists) {
    alert('您已经投递过该职位了！')
    return
  }
  userStore.addApplication({
    jobId: props.job.id,
    jobTitle: props.job.title,
    company: props.job.company,
    salary: props.job.salary,
    status: 'pending'
  })
  alert('简历投递成功！\n\n我们将尽快为您安排面试，请保持手机畅通。')
}
</script>
