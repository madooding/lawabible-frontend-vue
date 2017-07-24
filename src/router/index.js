import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/pages/Main.vue'
import store from '../store'
import VueCookie from 'vue-cookie'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
        path: '/',
        name: 'root-path',
        component: Main
    },
    {
      path: '/:book/:chapter/',
      name: 'Book-Chapter',
      component: Main
    }
  ]
})


router.beforeEach((to, from, next) => {
    let redirectLink = '/GEN/1'
    let chapter = 1
    let book = 'GEN'
    if (VueCookie.get('book') && VueCookie.get('chapter') && isChapterExist({
        bookName: VueCookie.get('book'),
        chapter: VueCookie.get('chapter')
    })){
        chapter = VueCookie.get('chapter')
        book = VueCookie.get('book')
        redirectLink = `/${book}/${chapter}/`
    }
    if(to.name == 'root-path'){
        setCurrents({
            bookName: book,
            chapter: chapter
        })
    } else if(to.name == 'Book-Chapter'){
        let currents = {
            bookName: to.params.book,
            chapter: to.params.chapter
        }
        if(isChapterExist(currents)){
            setCurrents(currents)
        }else{
            next(redirectLink)
        }
    } else {
        next(redirectLink)
    }
    next()
})

const isChapterExist = (currents) => {
    let bookName = currents.bookName
    let chapter = Number(currents.chapter)
    let books = store.getters.getAllBooksInfo
    let book = _.find(books, o => o.bookName == bookName)
    if (book != null){
        if (book.firstChapter == 0){
            if (chapter <= book.chapters - 1 && chapter > 0){
                return true
            }
        } else {
            if (chapter <= book.chapters && chapter > 0){
                return true
            }
        }
    }
    return false
}

const setCurrents = (currents) => {
    VueCookie.set('book', currents.bookName)
    VueCookie.set('chapter', currents.chapter)
    store.dispatch('setCurrents', {
        bookName: currents.bookName,
        chapter: Number(currents.chapter)
    })
}


export default router

