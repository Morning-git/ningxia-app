<template>
  <div class="pb-4">
    <div class="flex items-center gap-3 px-4 py-3 bg-white border-b border-gray-100">
      <span class="text-2xl text-gray-800 cursor-pointer" @click="$router.back()">&#8249;</span>
      <h3 class="text-base font-semibold text-gray-800">注册</h3>
    </div>

    <div class="p-6">
      <div class="text-center mb-8">
        <h2 class="text-xl font-semibold text-gray-800 mb-2">创建账号</h2>
        <p class="text-sm text-gray-500">注册后可享受专属就业服务</p>
      </div>

      <div class="space-y-4">
        <div>
          <input 
            v-model="name"
            type="text" 
            placeholder="请输入姓名"
            class="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm outline-none focus:border-primary"
          />
        </div>
        <div>
          <input 
            v-model="phone"
            type="tel" 
            placeholder="请输入手机号"
            class="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm outline-none focus:border-primary"
          />
        </div>
        <div>
          <input 
            v-model="password"
            type="password" 
            placeholder="请输入密码"
            class="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm outline-none focus:border-primary"
          />
        </div>
        <div>
          <select 
            v-model="disabilityType"
            class="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm outline-none focus:border-primary bg-white"
          >
            <option value="">请选择残疾类别（选填）</option>
            <option v-for="t in disabilityTypes" :key="t.value" :value="t.value">{{ t.label }}</option>
          </select>
        </div>
        <div>
          <select 
            v-model="disabilityLevel"
            class="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm outline-none focus:border-primary bg-white"
          >
            <option value="">请选择残疾等级（选填）</option>
            <option v-for="l in disabilityLevels" :key="l.value" :value="l.value">{{ l.label }}</option>
          </select>
        </div>
        <div>
          <input 
            v-model="disabilityCard"
            type="text" 
            placeholder="请输入残疾证号（选填）"
            class="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm outline-none focus:border-primary"
          />
        </div>
      </div>

      <button 
        @click="handleRegister"
        class="w-full py-3 mt-6 bg-primary text-white rounded-full text-base font-medium"
      >
        注册
      </button>

      <div class="text-center mt-4">
        <span class="text-sm text-gray-500">已有账号？</span>
        <span class="text-sm text-primary cursor-pointer" @click="$router.push('/login')">立即登录</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useUserStore } from '../store'
import { disabilityTypes, disabilityLevels } from '../data/mock'

const router = useRouter()
const route = useRoute()
const userStore = useUserStore()

const name = ref('')
const phone = ref('')
const password = ref('')
const disabilityType = ref('')
const disabilityLevel = ref('')
const disabilityCard = ref('')

function handleRegister() {
  if (!name.value || !phone.value || !password.value) {
    alert('请填写完整的注册信息')
    return
  }
  if (phone.value.length !== 11) {
    alert('请输入正确的手机号')
    return
  }
  
  userStore.register({
    name: name.value,
    phone: phone.value,
    disabilityType: disabilityType.value,
    disabilityLevel: disabilityLevel.value,
    disabilityCard: disabilityCard.value,
    hasDisabilityCard: !!disabilityCard.value
  })
  
  alert('注册成功！欢迎加入宁夏残疾人就业服务平台~\n\n建议您完善残疾证信息，可享受更多专属就业服务。')
  // 返回之前的页面或首页
  const redirect = route.query.redirect || '/'
  router.replace(redirect)
}
</script>
