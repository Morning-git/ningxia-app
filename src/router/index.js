import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import JobsView from '../views/JobsView.vue'
import MessageView from '../views/MessageView.vue'
import TrainingView from '../views/TrainingView.vue'
import ProfileView from '../views/ProfileView.vue'
import JobDetail from '../views/JobDetail.vue'
import CompanyDetail from '../views/CompanyDetail.vue'
import CourseDetail from '../views/CourseDetail.vue'
import ChatDetail from '../views/ChatDetail.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import FlexJob from '../views/FlexJob.vue'
import FlexJobAll from '../views/FlexJobAll.vue'
import FlexJobRemote from '../views/FlexJobRemote.vue'
import FlexJobParttime from '../views/FlexJobParttime.vue'
import FlexJobFreelance from '../views/FlexJobFreelance.vue'
import CampusRecruit from '../views/CampusRecruit.vue'
import JobFair from '../views/JobFair.vue'
import JobFairList from '../views/JobFairList.vue'
import CareerQuiz from '../views/CareerQuiz.vue'
import EmploymentPolicy from '../views/EmploymentPolicy.vue'
import EmploymentPolicyDetail from '../views/EmploymentPolicyDetail.vue'
import TrainingPage from '../views/TrainingPage.vue'
import SuccessCases from '../views/SuccessCases.vue'
import Handcraft from '../views/Handcraft.vue'
import HandcraftDetail from '../views/HandcraftDetail.vue'
import EmploymentHelp from '../views/EmploymentHelp.vue'
import MyDemand from '../views/MyDemand.vue'
import ResumeView from '../views/ResumeView.vue'
import JobIntentionView from '../views/JobIntentionView.vue'
import DisabilityCardView from '../views/DisabilityCardView.vue'
import MyApplicationsView from '../views/MyApplicationsView.vue'
import MyCollectionsView from '../views/MyCollectionsView.vue'
import MyLearningView from '../views/MyLearningView.vue'
import BrowsingHistoryView from '../views/BrowsingHistoryView.vue'
import MyDemandsView from '../views/MyDemandsView.vue'
import HelpCenterView from '../views/HelpCenterView.vue'

const routes = [
  { path: '/', name: 'home', component: HomeView },
  { path: '/jobs', name: 'jobs', component: JobsView },
  { path: '/message', name: 'message', component: MessageView },
  { path: '/training', name: 'training', component: TrainingView },
  { path: '/profile', name: 'profile', component: ProfileView },
  { path: '/job/:id', name: 'job-detail', component: JobDetail },
  { path: '/company', name: 'company-detail', component: CompanyDetail },
  { path: '/course/:id', name: 'course-detail', component: CourseDetail },
  { path: '/chat/:id', name: 'chat-detail', component: ChatDetail },
  { path: '/login', name: 'login', component: LoginView },
  { path: '/register', name: 'register', component: RegisterView },
  { path: '/flex-job', name: 'flex-job', component: FlexJob },
  { path: '/flex-job/all', name: 'flex-job-all', component: FlexJobAll },
  { path: '/flex-job/remote', name: 'flex-job-remote', component: FlexJobRemote },
  { path: '/flex-job/parttime', name: 'flex-job-parttime', component: FlexJobParttime },
  { path: '/flex-job/freelance', name: 'flex-job-freelance', component: FlexJobFreelance },
  { path: '/campus-recruit', name: 'campus-recruit', component: CampusRecruit },
  { path: '/job-fair', name: 'job-fair', component: JobFairList },
  { path: '/job-fair/:id', name: 'job-fair-detail', component: JobFair },
  { path: '/career-quiz', name: 'career-quiz', component: CareerQuiz },
  { path: '/employment-policy', name: 'employment-policy', component: EmploymentPolicy },
  { path: '/employment-policy/:id', name: 'employment-policy-detail', component: EmploymentPolicyDetail },
  { path: '/training-page', name: 'training-page', component: TrainingPage },
  { path: '/success-cases', name: 'success-cases', component: SuccessCases },
  { path: '/handcraft', name: 'handcraft', component: Handcraft },
  { path: '/handcraft/:id', name: 'handcraft-detail', component: HandcraftDetail },
  { path: '/employment-help', name: 'employment-help', component: EmploymentHelp },
  { path: '/my-demand', name: 'my-demand', component: MyDemand },
  { path: '/resume', name: 'resume', component: ResumeView },
  { path: '/job-intention', name: 'job-intention', component: JobIntentionView },
  { path: '/disability-card', name: 'disability-card', component: DisabilityCardView },
  { path: '/my-applications', name: 'my-applications', component: MyApplicationsView },
  { path: '/my-collections', name: 'my-collections', component: MyCollectionsView },
  { path: '/my-learning', name: 'my-learning', component: MyLearningView },
  { path: '/browsing-history', name: 'browsing-history', component: BrowsingHistoryView },
  { path: '/my-demands', name: 'my-demands', component: MyDemandsView },
  { path: '/help-center', name: 'help-center', component: HelpCenterView }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
