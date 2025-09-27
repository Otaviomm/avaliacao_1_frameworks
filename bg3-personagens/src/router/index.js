import { createRouter, createWebHistory } from 'vue-router'
import CatalogoView from '../views/CatalogoView.vue'
import GaleriaCardsView from '../views/GaleriaCardsView.vue'
import SobreView from '../views/SobreView.vue'

const routes = [
  { path: '/', component: CatalogoView },
  { path: '/galeria', component: GaleriaCardsView },
  { path: '/sobre', component: SobreView }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router