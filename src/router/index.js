import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/pages/Main.vue'
import store from '../store'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Main',
      component: Main
    },
    {
      path: '/:book/:chapter',
      name: 'Book-Chapter',
      component: Main
    }
  ]
})

router.beforeEach((to, from, next) => {
    if(to.name == 'Book-Chapter'){
        store.dispatch('setCurrents', {
            bookName: to.params.book,
            chapter: Number(to.params.chapter)
        })
    }
    next()
})


export default router

