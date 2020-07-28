import Vue from 'vue'
import Router from 'vue-router'
import Log from '@/pages/log'
import Setting from '@/pages/setting'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'log',
      component: Log
    },
    {
      path: '/',
      name: 'setting',
      component: Setting
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
