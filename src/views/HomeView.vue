<template>
  <div class="pb-4">
    <!-- 横幅 -->
    <div class="relative h-[300px] overflow-hidden bg-gradient-to-br from-primary to-primary-light">
      <div 
        v-for="(banner, index) in banners" 
        :key="index"
        class="absolute inset-0 flex flex-col items-center justify-center transition-opacity duration-500"
        :class="index === currentBanner ? 'opacity-100' : 'opacity-0'"
      >
        <h3 class="text-white text-[22px] font-semibold mb-2 drop-shadow">{{ banner.title }}</h3>
        <p class="text-white/90 text-sm">{{ banner.subtitle }}</p>
      </div>
      <div class="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
        <span 
          v-for="(_, index) in banners" 
          :key="index"
          class="w-2 h-2 rounded transition-all duration-300"
          :class="index === currentBanner ? 'bg-white w-5' : 'bg-white/40'"
        ></span>
      </div>
    </div>

    <!-- 快捷入口 -->
    <div class="mx-4 -mt-5 relative bg-white rounded-xl p-4 shadow-lg">
      <div class="grid grid-cols-5 gap-2">
        <div 
          v-for="entry in quickEntries" 
          :key="entry.name"
          class="flex flex-col items-center gap-2 py-2 cursor-pointer"
          @click="handleQuickEntry(entry.name)"
        >
          <div 
            class="w-12 h-12 rounded-xl flex items-center justify-center"
            :class="entry.color"
          >
            <svg v-if="entry.name === '灵活就业'" class="w-6 h-6 text-green-500" viewBox="0 0 24 24" fill="currentColor">
              <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/>
            </svg>
            <svg v-else-if="entry.name === '大学生就业'" class="w-6 h-6 text-blue-500" viewBox="0 0 24 24" fill="currentColor">
              <path d="M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82zM12 3L1 9l11 6 9-4.91V17h2V9L12 3z"/>
            </svg>
            <svg v-else-if="entry.name === '网络招聘会'" class="w-6 h-6 text-orange-500" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20 6h-4V4c0-1.1-.9-2-2-2h-4c-1.1 0-2 .9-2 2v2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zM10 4h4v2h-4V4zm10 16H4V8h16v12z"/>
            </svg>
            <svg v-else-if="entry.name === '职业测评'" class="w-6 h-6 text-pink-500" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/>
            </svg>
            <svg v-else-if="entry.name === '就业政策'" class="w-6 h-6 text-purple-500" viewBox="0 0 24 24" fill="currentColor">
              <path d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/>
            </svg>
            <svg v-else-if="entry.name === '职业培训'" class="w-6 h-6 text-cyan-500" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72L12 15l5-2.73v3.72z"/>
            </svg>
            <svg v-else-if="entry.name === '就业典型'" class="w-6 h-6 text-yellow-500" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
            </svg>
            <svg v-else-if="entry.name === '不尤手作'" class="w-6 h-6 text-red-500" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
            <svg v-else-if="entry.name === '就业帮扶'" class="w-6 h-6 text-pink-500" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z"/>
            </svg>
            <svg v-else-if="entry.name === '我的需求'" class="w-6 h-6 text-green-500" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
            </svg>
          </div>
          <span class="text-[12px] text-gray-600">{{ entry.name }}</span>
        </div>
      </div>
    </div>

    <!-- 一、找工作：推荐职位 -->
    <section class="px-4 mt-4">
      <div class="flex justify-between items-center mb-3">
        <h3 class="text-base font-semibold text-gray-800">推荐职位</h3>
        <span class="text-xs text-primary cursor-pointer" @click="$router.push('/jobs')">更多 &gt;</span>
      </div>
      <p class="text-xs text-gray-500 mb-3">匹配您的求职意向，底部「工作」可浏览全部</p>
      <div class="flex flex-col gap-3">
        <JobCard 
          v-for="job in recommendedJobs" 
          :key="job.id" 
          :job="job" 
          @click="goToJobDetail(job.id)"
        />
      </div>
    </section>

    <!-- 二、找工作：网络招聘会 -->
    <section class="px-4 mt-5">
      <div class="flex justify-between items-center mb-3">
        <h3 class="text-base font-semibold text-gray-800">网络招聘会</h3>
        <span class="text-xs text-primary cursor-pointer" @click="$router.push('/job-fair')">更多 &gt;</span>
      </div>
      <div class="flex flex-col gap-3">
        <div 
          v-for="fair in jobFairJobs" 
          :key="fair.id"
          class="bg-white rounded-xl overflow-hidden shadow-sm cursor-pointer"
          @click="$router.push(`/job-fair/${fair.id}`)"
        >
          <div class="relative w-full" style="padding-bottom: 42.86%;">
            <img 
              :src="fair.cover" 
              :alt="fair.title"
              class="absolute inset-0 w-full h-full object-cover"
            />
            <span 
              class="absolute top-2 right-2 px-2 py-0.5 rounded-full text-[10px] font-medium"
              :class="fair.status === 'ongoing' ? 'bg-green-500 text-white' : fair.status === 'upcoming' ? 'bg-blue-500 text-white' : 'bg-gray-400 text-white'"
            >
              {{ fair.status === 'ongoing' ? '进行中' : fair.status === 'upcoming' ? '即将开始' : '已结束' }}
            </span>
          </div>
          <div class="p-3">
            <h4 class="text-sm font-semibold text-gray-800 mb-1">{{ fair.title }}</h4>
            <div class="flex items-center justify-between">
              <span class="text-xs text-gray-500">{{ fair.startTime }}</span>
              <span class="text-xs text-primary">{{ fair.joinedCount }}人参加</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 三、学技能：精选培训 -->
    <section class="px-4 mt-5">
      <div class="flex justify-between items-center mb-3">
        <h3 class="text-base font-semibold text-gray-800">精选培训</h3>
        <span class="text-xs text-primary cursor-pointer" @click="$router.push('/training')">更多 &gt;</span>
      </div>
      <p class="text-xs text-gray-500 mb-3">免费课程提升技能，底部「培训」可查看全部</p>
      <div class="flex flex-col gap-3">
        <div 
          v-for="course in courses" 
          :key="course.id"
          class="flex items-center gap-3 bg-white rounded-xl p-3 shadow-sm cursor-pointer"
          @click="goToCourseDetail(course.id)"
        >
          <div 
            class="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0"
            :class="getCourseIconBg(course.icon)"
          >
            <svg class="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9z"/>
            </svg>
          </div>
          <div class="flex-1 min-w-0">
            <h4 class="text-sm font-semibold text-gray-800 mb-1">{{ course.title }}</h4>
            <p class="text-xs text-gray-500 mb-1 line-clamp-1">{{ course.desc }}</p>
            <div class="flex gap-2 flex-wrap">
              <span class="text-[10px] px-2 py-0.5 bg-green-50 text-green-600 rounded">免费</span>
              <span class="text-[10px] px-2 py-0.5 bg-gray-100 text-gray-500 rounded">{{ course.duration }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 四、政策与资讯 -->
    <section class="px-4 mt-5">
      <div class="flex justify-between items-center mb-3">
        <h3 class="text-base font-semibold text-gray-800">政策与资讯</h3>
        <span class="text-xs text-primary cursor-pointer" @click="$router.push('/employment-policy')">更多 &gt;</span>
      </div>
      <div class="grid grid-cols-2 gap-2 mb-3">
        <div 
          class="p-3 bg-blue-50 rounded-xl cursor-pointer"
          @click="$router.push('/employment-policy')"
        >
          <h4 class="text-sm font-medium text-blue-800 mb-1">创业补贴</h4>
          <p class="text-[11px] text-gray-600 line-clamp-2">自主创业可申请最高10万元一次性补贴</p>
        </div>
        <div 
          class="p-3 bg-green-50 rounded-xl cursor-pointer"
          @click="$router.push('/employment-policy')"
        >
          <h4 class="text-sm font-medium text-green-800 mb-1">税收减免</h4>
          <p class="text-[11px] text-gray-600 line-clamp-2">个体经营3年内免征增值税等</p>
        </div>
      </div>
      <div class="flex flex-col gap-2">
        <div 
          v-for="news in newsList" 
          :key="news.id"
          class="flex gap-3 bg-white rounded-xl p-3 shadow-sm cursor-pointer"
          @click="$router.push('/employment-policy')"
        >
          <div class="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center flex-shrink-0">
            <svg class="w-5 h-5 text-primary" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7v-2h10v2zm0-4H7V7h10v2z"/>
            </svg>
          </div>
          <div class="flex-1 min-w-0">
            <h4 class="text-sm font-medium text-gray-800 line-clamp-2 mb-1">{{ news.title }}</h4>
            <div class="flex gap-3 text-[11px] text-gray-400">
              <span>{{ news.type }}</span>
              <span>{{ news.date }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 五、更多服务 -->
    <section class="px-4 mt-5 pb-4">
      <h3 class="text-base font-semibold text-gray-800 mb-3">更多服务</h3>
      <div class="grid grid-cols-3 gap-2">
        <div 
          class="flex flex-col items-center gap-2 p-3 bg-white rounded-xl shadow-sm cursor-pointer border border-gray-100"
          @click="$router.push('/success-cases')"
        >
          <div class="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
            <svg class="w-5 h-5 text-amber-600" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
            </svg>
          </div>
          <span class="text-xs font-medium text-gray-700">就业典型</span>
          <span class="text-[10px] text-gray-400 text-center">榜样故事</span>
        </div>
        <div 
          class="flex flex-col items-center gap-2 p-3 bg-white rounded-xl shadow-sm cursor-pointer border border-gray-100"
          @click="$router.push('/handcraft')"
        >
          <div class="w-10 h-10 rounded-full bg-rose-100 flex items-center justify-center">
            <svg class="w-5 h-5 text-rose-600" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
          </div>
          <span class="text-xs font-medium text-gray-700">不尤手作</span>
          <span class="text-[10px] text-gray-400 text-center">手工艺</span>
        </div>
        <div 
          class="flex flex-col items-center gap-2 p-3 bg-white rounded-xl shadow-sm cursor-pointer border border-gray-100"
          @click="$router.push('/employment-help')"
        >
          <div class="w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center">
            <svg class="w-5 h-5 text-pink-600" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z"/>
            </svg>
          </div>
          <span class="text-xs font-medium text-gray-700">就业帮扶</span>
          <span class="text-[10px] text-gray-400 text-center">热线·咨询</span>
        </div>
      </div>
    </section>

    <!-- 政策弹窗 -->
    <div v-if="showPolicyModal" class="fixed inset-0 bg-black/50 z-50 flex items-end" @click.self="showPolicyModal = false">
      <div class="w-full max-w-[480px] mx-auto bg-white rounded-t-2xl max-h-[80vh] overflow-y-auto">
        <div class="flex justify-between items-center p-4 border-b border-gray-100 sticky top-0 bg-white">
          <h3 class="text-base font-semibold text-gray-800">就业政策</h3>
          <span class="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 cursor-pointer" @click="showPolicyModal = false">×</span>
        </div>
        <div class="p-4 space-y-3">
          <div class="p-3 bg-blue-50 rounded-lg">
            <h4 class="text-sm font-semibold text-blue-600 mb-1">创业补贴</h4>
            <p class="text-xs text-gray-600">自主创业残疾人可申请最高10万元一次性创业补贴</p>
          </div>
          <div class="p-3 bg-green-50 rounded-lg">
            <h4 class="text-sm font-semibold text-green-600 mb-1">税收减免</h4>
            <p class="text-xs text-gray-600">残疾人员从事个体经营，3年内免征增值税和个人所得税</p>
          </div>
          <div class="p-3 bg-purple-50 rounded-lg">
            <h4 class="text-sm font-semibold text-purple-600 mb-1">就业奖励</h4>
            <p class="text-xs text-gray-600">超比例安排残疾人就业的企业给予奖励补贴</p>
          </div>
          <div class="p-3 bg-orange-50 rounded-lg">
            <h4 class="text-sm font-semibold text-orange-600 mb-1">职业培训</h4>
            <p class="text-xs text-gray-600">残疾人可免费参加职业技能培训并获得补贴</p>
          </div>
          <div class="p-3 bg-pink-50 rounded-lg">
            <h4 class="text-sm font-semibold text-pink-600 mb-1">辅具补贴</h4>
            <p class="text-xs text-gray-600">购买辅助器具可享受补贴，最高5000元</p>
          </div>
        </div>
      </div>
    </div>

    <!-- 测评弹窗 -->
    <div v-if="showQuizModal" class="fixed inset-0 bg-black/50 z-50 flex items-end" @click.self="showQuizModal = false">
      <div class="w-full max-w-[480px] mx-auto bg-white rounded-t-2xl max-h-[80vh] overflow-y-auto">
        <div class="flex justify-between items-center p-4 border-b border-gray-100 sticky top-0 bg-white">
          <h3 class="text-base font-semibold text-gray-800">职业测评</h3>
          <span class="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 cursor-pointer" @click="showQuizModal = false">×</span>
        </div>
        <div class="p-4">
          <div class="mb-4 p-3 bg-gray-50 rounded-lg">
            <h4 class="text-sm font-semibold text-gray-800 mb-2">测评说明</h4>
            <p class="text-xs text-gray-600">回答以下问题，帮助您了解适合的职业方向</p>
          </div>
          <div class="mb-4">
            <p class="text-sm text-gray-700 mb-2">1. 您 prefer的工作环境是？</p>
            <div class="space-y-2">
              <label class="flex items-center gap-2 text-xs text-gray-600">
                <input type="radio" v-model="quizAnswers.q1" value="A" class="accent-primary"> 办公室/室内
              </label>
              <label class="flex items-center gap-2 text-xs text-gray-600">
                <input type="radio" v-model="quizAnswers.q1" value="B" class="accent-primary"> 户外/灵活
              </label>
            </div>
          </div>
          <div class="mb-4">
            <p class="text-sm text-gray-700 mb-2">2. 您擅长的工作类型是？</p>
            <div class="space-y-2">
              <label class="flex items-center gap-2 text-xs text-gray-600">
                <input type="radio" v-model="quizAnswers.q2" value="A" class="accent-primary"> 沟通协调
              </label>
              <label class="flex items-center gap-2 text-xs text-gray-600">
                <input type="radio" v-model="quizAnswers.q2" value="B" class="accent-primary"> 技术研发
              </label>
              <label class="flex items-center gap-2 text-xs text-gray-600">
                <input type="radio" v-model="quizAnswers.q2" value="C" class="accent-primary"> 创意设计
              </label>
            </div>
          </div>
          <div class="mb-4">
            <p class="text-sm text-gray-700 mb-2">3. 您期望的工作方式是？</p>
            <div class="space-y-2">
              <label class="flex items-center gap-2 text-xs text-gray-600">
                <input type="radio" v-model="quizAnswers.q3" value="A" class="accent-primary"> 全职稳定
              </label>
              <label class="flex items-center gap-2 text-xs text-gray-600">
                <input type="radio" v-model="quizAnswers.q3" value="B" class="accent-primary"> 兼职灵活
              </label>
              <label class="flex items-center gap-2 text-xs text-gray-600">
                <input type="radio" v-model="quizAnswers.q3" value="C" class="accent-primary"> 居家办公
              </label>
            </div>
          </div>
          <button @click="submitQuiz" class="w-full py-3 bg-primary text-white rounded-lg text-sm">提交测评</button>
        </div>
      </div>
    </div>

    <!-- 成功案例弹窗 -->
    <div v-if="showSuccessCases" class="fixed inset-0 bg-black/50 z-50 flex items-end" @click.self="showSuccessCases = false">
      <div class="w-full max-w-[480px] mx-auto bg-white rounded-t-2xl max-h-[80vh] overflow-y-auto">
        <div class="flex justify-between items-center p-4 border-b border-gray-100 sticky top-0 bg-white">
          <h3 class="text-base font-semibold text-gray-800">就业典型</h3>
          <span class="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 cursor-pointer" @click="showSuccessCases = false">×</span>
        </div>
        <div class="p-4 space-y-3">
          <div class="p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl">
            <div class="flex items-center gap-3 mb-2">
              <div class="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-white font-bold">张</div>
              <div>
                <h4 class="text-sm font-semibold text-gray-800">张明（化名）</h4>
                <p class="text-xs text-gray-500">肢体残疾 · 现为某科技公司测试工程师</p>
              </div>
            </div>
            <p class="text-xs text-gray-600">通过参加残联组织的免费技能培训，成功转型为软件测试工程师，月薪8000元</p>
          </div>
          <div class="p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl">
            <div class="flex items-center gap-3 mb-2">
              <div class="w-10 h-10 rounded-full bg-purple-500 flex items-center justify-center text-white font-bold">李</div>
              <div>
                <h4 class="text-sm font-semibold text-gray-800">李华（化名）</h4>
                <p class="text-xs text-gray-500">听力残疾 · 创办手工艺品工作室</p>
              </div>
            </div>
            <p class="text-xs text-gray-600">利用自己的手工特长创业，成立手工艺品工作室，带动其他残疾人就业</p>
          </div>
          <div class="p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl">
            <div class="flex items-center gap-3 mb-2">
              <div class="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">王</div>
              <div>
                <h4 class="text-sm font-semibold text-gray-800">王芳（化名）</h4>
                <p class="text-xs text-gray-500">视力残疾 · 成为优秀按摩师</p>
              </div>
            </div>
            <p class="text-xs text-gray-600">苦练按摩技术，获得高级按摩师证书，现在是养生馆的金牌按摩师</p>
          </div>
        </div>
      </div>
    </div>

    <!-- 帮助弹窗 -->
    <div v-if="showHelpModal" class="fixed inset-0 bg-black/50 z-50 flex items-end" @click.self="showHelpModal = false">
      <div class="w-full max-w-[480px] mx-auto bg-white rounded-t-2xl max-h-[80vh] overflow-y-auto">
        <div class="flex justify-between items-center p-4 border-b border-gray-100 sticky top-0 bg-white">
          <h3 class="text-base font-semibold text-gray-800">就业帮扶</h3>
          <span class="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 cursor-pointer" @click="showHelpModal = false">×</span>
        </div>
        <div class="p-4 space-y-3">
          <div class="flex items-center gap-3 p-3 bg-white border border-gray-200 rounded-xl">
            <div class="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
              <svg class="w-5 h-5 text-green-500" viewBox="0 0 24 24" fill="currentColor"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>
            </div>
            <div class="flex-1">
              <h4 class="text-sm font-semibold text-gray-800">就业服务热线</h4>
              <p class="text-xs text-gray-500">0951-12345678</p>
            </div>
          </div>
          <div class="flex items-center gap-3 p-3 bg-white border border-gray-200 rounded-xl">
            <div class="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
              <svg class="w-5 h-5 text-blue-500" viewBox="0 0 24 24" fill="currentColor"><path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"/></svg>
            </div>
            <div class="flex-1">
              <h4 class="text-sm font-semibold text-gray-800">在线客服</h4>
              <p class="text-xs text-gray-500">点击右侧咨询</p>
            </div>
            <button class="px-3 py-1 bg-primary text-white text-xs rounded-full">咨询</button>
          </div>
          <div class="flex items-center gap-3 p-3 bg-white border border-gray-200 rounded-xl">
            <div class="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
              <svg class="w-5 h-5 text-purple-500" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
            </div>
            <div class="flex-1">
              <h4 class="text-sm font-semibold text-gray-800">残联服务大厅</h4>
              <p class="text-xs text-gray-500">银川市解放西街123号</p>
            </div>
          </div>
          <div class="p-3 bg-yellow-50 rounded-lg mt-4">
            <h4 class="text-sm font-semibold text-yellow-600 mb-2">温馨提示</h4>
            <p class="text-xs text-gray-600">如需帮助，您可以：拨打服务热线、前往当地残联服务大厅、或通过平台在线客服联系我们</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { jobsData, newsData, bannerData, quickEntries, trainingData } from '../data/mock'
import { useUserStore } from '../store'
import JobCard from '../components/common/JobCard.vue'

const router = useRouter()
const userStore = useUserStore()

const showPolicyModal = ref(false)
const showQuizModal = ref(false)
const showSuccessCases = ref(false)
const showHelpModal = ref(false)
const quizAnswers = ref({})
const banners = bannerData
const currentBanner = ref(0)

let bannerTimer = null

onMounted(() => {
  bannerTimer = setInterval(() => {
    currentBanner.value = (currentBanner.value + 1) % banners.length
  }, 3000)
})

onUnmounted(() => {
  if (bannerTimer) clearInterval(bannerTimer)
})

const recommendedJobs = computed(() => jobsData.slice(5, 11))
const jobFairJobs = computed(() => [
  {
    id: 1,
    title: '2024年春季残疾人专场招聘会',
    cover: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1200&q=80',
    startTime: '2024年3月20日 9:00',
    status: 'ongoing',
    joinedCount: 328
  },
  {
    id: 2,
    title: '宁夏残疾人就业援助月专场',
    cover: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1200&q=80',
    startTime: '2024年3月25日 10:00',
    status: 'upcoming',
    joinedCount: 156
  }
])
const courses = computed(() => trainingData.slice(0, 3))
const newsList = computed(() => newsData.slice(0, 4))

function getCourseIconBg(icon) {
  const colors = {
    'gradient-purple': 'bg-gradient-to-br from-purple-500 to-purple-600',
    'gradient-pink': 'bg-gradient-to-br from-pink-500 to-pink-600',
    'gradient-blue': 'bg-gradient-to-br from-blue-500 to-blue-600',
    'gradient-orange': 'bg-gradient-to-br from-orange-500 to-orange-600'
  }
  return colors[icon] || 'bg-gray-500'
}

function submitQuiz() {
  const answers = quizAnswers.value
  if (!answers.q1 || !answers.q2 || !answers.q3) {
    alert('请完成所有问题')
    return
  }
  
  let result = ''
  if (answers.q2 === 'A') {
    result = '推荐方向：行政文员、客服专员、电话客服'
  } else if (answers.q2 === 'B') {
    result = '推荐方向：软件测试、数据录入、电商运营'
  } else if (answers.q2 === 'C') {
    result = '推荐方向：视频剪辑、手工艺、设计制图'
  }
  
  if (answers.q3 === 'B' || answers.q3 === 'C') {
    result += '\n适合灵活就业/居家办公岗位'
  } else {
    result += '\n适合全职稳定岗位'
  }
  
  alert(`测评结果：\n\n${result}\n\n详情可查看推荐职位`)
  showQuizModal.value = false
  router.push('/jobs')
}

function goToJobDetail(id) {
  router.push(`/job/${id}`)
}

function goToCourseDetail(id) {
  router.push(`/course/${id}`)
}

function handleQuickEntry(name) {
  switch(name) {
    case '灵活就业':
      router.push('/flex-job')
      break
    case '大学生就业':
      router.push('/campus-recruit')
      break
    case '网络招聘会':
      router.push('/job-fair')
      break
    case '职业测评':
      window.location.href = 'https://cjrcp.webtrn.cn/zcl/#/login'
      break
    case '就业政策':
      router.push('/employment-policy')
      break
    case '职业培训':
      window.location.href = 'https://training.cdpee.org.cn/'
      break
    case '就业典型':
      router.push('/success-cases')
      break
    case '不尤手作':
      router.push('/handcraft')
      break
    case '就业帮扶':
      router.push('/employment-help')
      break
    case '我的需求':
      if (userStore.isLoggedIn) {
        router.push('/my-demand')
      } else {
        router.push('/login')
      }
      break
    default:
      alert(`${name}功能开发中...`)
  }
}
</script>
