<template>
  <div class="pb-4">
    <!-- 标题栏 -->
    <div class="flex items-center gap-3 px-4 py-3 bg-white border-b border-gray-100 sticky top-0 z-10">
      <span class="text-2xl text-gray-800 cursor-pointer" @click="$router.back()">&#8249;</span>
      <h3 class="text-base font-semibold text-gray-800">详情</h3>
    </div>

    <!-- 文章详情 -->
    <div v-if="article" class="p-4">
      <!-- 标题 -->
      <h1 class="text-lg font-semibold text-gray-800 mb-3">{{ article.title }}</h1>
      
      <!-- 来源和时间 -->
      <div class="flex items-center gap-4 mb-4">
        <span class="text-xs text-gray-500">{{ article.source }}</span>
        <span class="text-xs text-gray-400">|</span>
        <span class="text-xs text-gray-400">{{ article.time }}</span>
      </div>

      <!-- 封面图 -->
      <div v-if="article.cover" class="mb-4">
        <img 
          :src="article.cover" 
          :alt="article.title"
          class="w-full rounded-lg"
        />
      </div>

      <!-- 正文内容 -->
      <div class="text-sm text-gray-600 leading-relaxed whitespace-pre-line">{{ article.content }}</div>

      <!-- 相关推荐 -->
      <div v-if="relatedArticles.length > 0" class="mt-6 pt-4 border-t border-gray-100">
        <h4 class="text-sm font-semibold text-gray-800 mb-3">相关新闻</h4>
        <div class="flex flex-col gap-2">
          <div 
            v-for="item in relatedArticles" 
            :key="item.id"
            class="text-sm text-primary cursor-pointer"
            @click="goToDetail(item)"
          >
            {{ item.title }}
          </div>
        </div>
      </div>
    </div>

    <!-- 不存在 -->
    <div v-else class="p-4 text-center text-gray-400">
      <p>文章不存在</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { randomImage } from '../utils/randomImage'

const route = useRoute()
const router = useRouter()

const policyList = ref([
  {
    id: 1,
    type: 'news',
    title: '宁夏残疾人就业工作取得新成效',
    summary: '今年第一季度，我区新增残疾人就业人数达到328人，同比增长15%。',
    cover: randomImage(),
    source: '宁夏日报',
    time: '2024-03-15',
    content: `今年第一季度，我区残疾人就业工作取得新成效。据统计，全区新增残疾人就业人数达到328人，同比增长15%。

一、完善政策体系
出台《宁夏回族自治区残疾人就业保障条例》，进一步优化残疾人就业政策环境。

二、拓宽就业渠道
1. 举办专场招聘会12场，提供岗位5000余个
2. 建设残疾人就业实训基地5个
3. 发展辅助性就业机构8家

三、提升服务质量
开展残疾人职业技能培训1500人次，帮助残疾人提升就业能力。

四、典型示范引领
评选残疾人就业创业示范户20户，带动更多残疾人实现就业创业。

下一步，我们将继续加大工作力度，确保完成年度目标任务。`
  },
  {
    id: 2,
    type: 'news',
    title: '残联举办春季专场招聘会',
    summary: '宁夏残联联合多家企业举办春季专场招聘会，提供岗位500余个。',
    cover: randomImage(),
    source: '宁夏新闻网',
    time: '2024-03-10',
    content: `3月10日，宁夏残联联合多家企业在银川举办了春季专场招聘会。

本次招聘会共有80家企业参会，提供岗位500余个，涵盖行政管理、客户服务、手工艺制作、数据处理等多个领域。招聘会现场气氛热烈，共有1200余名求职者入场，达成就业意向328人。

招聘会现场还设置了政策咨询区、技能展示区等功能区域，为求职者提供全方位的就业服务。`
  },
  {
    id: 3,
    type: 'news',
    title: '残疾人就业援助月活动启动',
    summary: '为期一个月的残疾人就业援助月活动正式启动。',
    cover: '',
    source: '宁夏残联',
    time: '2024-03-05',
    content: `3月5日，我区"残疾人就业援助月"活动正式启动。

活动主题："就业帮扶，真情相助"
活动时间：3月5日-4月5日

活动内容：
1. 走访慰问困难残疾人家庭
2. 开展就业需求调查
3. 举办专场招聘会
4. 提供职业指导服务
5. 落实就业扶持政策

各地区残联将同步开展相关活动，确保活动取得实效。`
  },
  {
    id: 4,
    type: 'news',
    title: '我区首家残疾人就业实训基地挂牌',
    summary: '宁夏首家残疾人就业实训基地在银川正式挂牌成立。',
    cover: randomImage(),
    source: '宁夏日报',
    time: '2024-02-28',
    content: `2月28日，我区首家残疾人就业实训基地在银川正式挂牌成立。

该基地位于银川市金凤区，占地面积2000平方米，可同时容纳200人开展实训。基地配备无障碍设施、辅助器具等，为残疾人提供良好的学习环境。

实训内容涵盖：计算机操作、电子商务、手工艺制作、客户服务等实用技能。基地已与20余家企业建立合作关系，学员结业后可优先推荐就业。`
  },
  {
    id: 5,
    type: 'notice',
    title: '关于开展2024年残疾人就业状况调查的通知',
    summary: '为全面掌握全区残疾人就业状况，现组织开展就业状况调查。',
    cover: '',
    source: '宁夏残联',
    time: '2024-03-12',
    content: `各 市、县（区）残联：

为全面掌握全区残疾人就业状况，现组织开展2024年残疾人就业状况调查，具体事项通知如下：

一、调查时间
2024年3月15日-4月15日

二、调查对象
全区16-59周岁有劳动能力的残疾人

三、调查方式
采取入户调查与电话调查相结合的方式

四、工作要求
1. 高度重视，加强组织领导
2. 精心组织，确保数据质量
3. 按时完成，做好数据上报

联系人：XXX 联系电话：XXXX-XXXXXXXX`
  },
  {
    id: 6,
    type: 'notice',
    title: '2024年残疾人职业技能培训计划',
    summary: '现发布2024年度残疾人职业技能培训计划，共计20个培训项目。',
    cover: randomImage(),
    source: '宁夏人社局',
    time: '2024-03-08',
    content: `为做好2024年残疾人职业技能培训工作，现发布培训计划如下：

一、培训项目
1. 计算机操作基础（初级）
2. 电子商务应用
3. 会计实务
4. 手工艺制作（刺绣）
5. 插花艺术
...（共20个项目）

二、培训时间
全年共举办40期，每期7-15天

三、报名方式
到户籍所在地残联报名，或登录宁夏残疾人服务网在线报名

四、补贴政策
培训费用全免，每人每年可享受一次免费培训`
  },
  {
    id: 7,
    type: 'notice',
    title: '残疾人就业保障金征收使用管理办法',
    summary: '现印发《残疾人就业保障金征收使用管理办法》。',
    cover: '',
    source: '宁夏财政厅',
    time: '2024-02-20',
    content: `第一章 总则
第一条 为规范残疾人就业保障金征收使用管理，促进残疾人就业，根据《残疾人保障法》《残疾人就业条例》等法律法规，结合本自治区实际，制定本办法。

第二条 本办法所称残疾人就业保障金，是指用人单位未达到规定比例安排残疾人就业，应当缴纳的用于残疾人就业的专项资金。

第三条 保障金纳入一般公共预算管理，专款专用。
...`
  },
  {
    id: 8,
    type: 'policy',
    title: '《宁夏回族自治区残疾人就业保障条例》修订发布',
    summary: '新版条例进一步完善了残疾人就业保障措施。',
    cover: randomImage(),
    source: '自治区政府',
    time: '2024-03-01',
    content: `《宁夏回族自治区残疾人就业保障条例》已修订发布，将于2024年5月1日起施行。

主要修订内容：

一、扩大保障范围
将智力残疾人、精神残疾人纳入保障范围

二、提高补贴标准
1. 创业补贴最高标准提高至15万元
2. 培训补贴标准提高至5000元

三、优化服务措施
1. 推行"一件事"改革
2. 实现就业服务"一网通办"
3. 加强就业跟踪服务

四、强化监督考核
将残疾人就业工作纳入政府绩效考核`
  },
  {
    id: 9,
    type: 'policy',
    title: '残疾人创业扶持政策再升级',
    summary: '残疾人创业补贴标准提高，最高可达15万元。',
    cover: randomImage(),
    source: '宁夏人社局',
    time: '2024-02-15',
    content: `为鼓励残疾人创业就业，我区创业扶持政策再升级：

一、创业补贴
1. 初次创业补贴：5000-10000元
2. 经营场地补贴：最高3万元/年
3. 设备购置补贴：最高5万元
4. 创业担保贷款：最高20万元

二、税收优惠
1. 增值税减免：3年内免征
2. 个人所得税：减半征收
3. 印花税：免征

三、社保补贴
创业残疾人可享受社保补贴，补贴标准为实际缴费的60%

四、申报流程
到户籍所在地人社局或残联申报`
  },
  {
    id: 10,
    type: 'policy',
    title: '超比例安排残疾人就业奖励办法',
    summary: '企业超比例安排残疾人就业可获得额外奖励。',
    cover: '',
    source: '宁夏残联',
    time: '2024-01-28',
    content: `为鼓励用人单位超比例安排残疾人就业，现制定奖励办法如下：

一、奖励标准
1. 超比例1人奖励5000元/年
2. 超比例2人奖励12000元/年
3. 超比例3人及以上奖励20000元/年

二、申报条件
1. 依法与残疾人签订劳动合同
2. 正常支付工资并缴纳社保
3. 年度在岗残疾职工不少于规定人数

三、申报时间
每年3月1日-31日

四、申报材料
1. 营业执照副本
2. 残疾职工花名册
3. 劳动合同及社保缴纳证明
4. 工资发放凭证`
  }
])

const article = computed(() => {
  const id = parseInt(route.params.id)
  return policyList.value.find(p => p.id === id)
})

const relatedArticles = computed(() => {
  if (!article.value) return []
  return policyList.value
    .filter(p => p.id !== article.value.id && p.type === article.value.type)
    .slice(0, 3)
})

function goToDetail(item) {
  router.push(`/employment-policy/${item.id}`)
}
</script>
