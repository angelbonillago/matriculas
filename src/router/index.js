import { createRouter, createWebHistory } from 'vue-router'
import HomeViewP from '../views/HomeViewP.vue'
import EstudianteNew from '../views/EstudianteNew.vue'
import EstudianteEdit from '../views/EstudianteEdit.vue'
import EstudianteView from '../views/EstudianteView.vue'

import HomeCursoView from '../views/HomeCursoView.vue'
import CursoNew from '../views/CursoNewView.vue'
import CursoEdit from '../views/CursoEdit.vue'

import MatriculaView from '../views/MatriculaView.vue'
import MatriculaFormAdmin from '../views/MatriculaFormAdmin.vue'
import MatriculaFormStudent from '../views/MatriculaFormStudent.vue'


import LoginView from '../views/LoginView.vue'
import DashboardView from '../views/DashboardView.vue';
import store from '../store/index.js';

const requireAuth = (to, from, next) => {
  // Verificar si hay un usuario en sesión (o cualquier lógica de autenticación que uses)
  if (!store.state.usuario) {
    // Si no hay usuario, redirigir al inicio de sesión
    next({ path: '/' })

  } else {
    next();
  }
};

const routes = [
  {
    path: '/',
    name: 'login',
    component: LoginView,
    //beforeEnter: requireAuth,
  },
  { 
    path: '/dashboard',
    name: 'dashboard',
    component: DashboardView,
    beforeEnter: requireAuth,
  },
  { 
    path: '/estudiantes',
    name: 'home',
    component: HomeViewP,
    beforeEnter: requireAuth,
  },
  {
    path: '/create-estudiante',
    name: 'createE',
    component: EstudianteNew,
    beforeEnter: requireAuth,
  },
  {
    path: '/edit-estudiante/:id',
    name: 'editE',
    component: EstudianteEdit,
    beforeEnter: requireAuth,
  },
  {
    path: '/view-estudiante/:id',
    name: 'viewE',
    component: EstudianteView,
    beforeEnter: requireAuth,
  },

  {
    path: '/cursos',
    name: 'cursos',
    component: HomeCursoView,
    beforeEnter: requireAuth,
  },
  {
    path: '/create-curso',
    name: 'createC',
    component: CursoNew,
    beforeEnter: requireAuth,
  },
  {
    path: '/edit-curso/:id',
    name: 'editC',
    component: CursoEdit,
    beforeEnter: requireAuth,
  },
  {
    path: '/curso-matriculado',
    name: 'createM',
    component: MatriculaView,
    beforeEnter: requireAuth,
  },

  {
    path: '/matricula-alumno',
    name: 'formularioEstudiante',
    component: MatriculaFormStudent,
    beforeEnter: requireAuth,
  },

  {
    path: '/matricula-admin',
    name: 'formularioAdmin',
    component: MatriculaFormAdmin,
    beforeEnter: requireAuth,
  },
  


  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router