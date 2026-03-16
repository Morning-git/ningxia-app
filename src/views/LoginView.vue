<template>
  <div class="pb-4">
    <div class="flex items-center gap-3 px-4 py-3 bg-white border-b border-gray-100">
      <span class="text-2xl text-gray-800 cursor-pointer" @click="$router.back()">&#8249;</span>
      <h3 class="text-base font-semibold text-gray-800">登录</h3>
    </div>

    <div class="p-6">
      <div class="text-center mb-8">
        <h2 class="text-xl font-semibold text-gray-800 mb-2">欢迎回来</h2>
        <p class="text-sm text-gray-500">登录后可享受更多就业服务</p>
      </div>

      <div class="space-y-4">
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
      </div>

      <button 
        @click="handleLogin"
        class="w-full py-3 mt-6 bg-primary text-white rounded-full text-base font-medium"
      >
        登录
      </button>

      <div class="text-center mt-4">
        <span class="text-sm text-gray-500">还没有账号？</span>
        <span class="text-sm text-primary cursor-pointer" @click="$router.push('/register')">立即注册</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useUserStore } from '../store'

const router = useRouter()
const route = useRoute()
const userStore = useUserStore()

const phone = ref('')
const password = ref('')

function handleLogin() {
  if (!phone.value || !password.value) {
    alert('请填写完整的登录信息')
    return
  }
  if (phone.value.length !== 11) {
    alert('请输入正确的手机号')
    return
  }
  
  userStore.login(phone.value, password.value)
  alert('登录成功！欢迎回来~')
  // 返回之前的页面或首页
  const redirect = route.query.redirect || '/'
  router.replace(redirect)
}
</script>
