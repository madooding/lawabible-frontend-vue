<template>
    <div class="chapterControlBtnPanel">
        <router-link :to="previousChapterLink" v-if="previousChapterLink">
            <div class="chapterControlBtnPanel--btn left">
                <img src="../assets/svg/left-arrow.svg" alt="Previous Chapter">
            </div>
        </router-link>
        <router-link :to="nextChapterLink" v-if="nextChapterLink">
            <div class="chapterControlBtnPanel--btn right">
                <img src="../assets/svg/right-arrow.svg" alt="Next Chapter">
            </div>
        </router-link>
    </div>
</template>

<script>
    export default {
        data: () => ({
            nextChapterLink: null,
            previousChapterLink: null
        }),

        created(){
            this.updateLink()
        },

        computed:{
            getCurrents(){
                return this.$store.getters.getCurrents
            }
        },

        mounted(){
            $('body').keydown((event) => {
                if(event.keyCode == 39 && this.nextChapterLink){
                    this.$router.replace(this.nextChapterLink)
                }else if(event.keyCode == 37 && this.previousChapterLink){
                    this.$router.replace(this.previousChapterLink)
                }
            })
        },

        watch: {
            getCurrents(){
                this.updateLink()
            }
        },

        methods: {
            updateLink(){
                let books = this.$store.getters.getAllBooksInfo
                let currentChapter = Number(this.getCurrents.chapter)
                let currentBookName = this.getCurrents.bookName
                let chapters = Number(this.$store.getters.getChapters)
                let book = _.find(books, o => o.bookName == currentBookName)
                if(book.firstChapter == 0){
                    if(currentChapter < book.chapters - 1){
                        this.nextChapterLink = `/${currentBookName}/${currentChapter+1}/`
                    }else{
                        if(book._id < 66){
                            let nextBook =  _.find(books, o => o._id == book._id + 1)
                            this.nextChapterLink = `/${nextBook.bookName}/1/`
                        }else{
                            this.nextChapterLink = null
                        }
                    }
                }else {
                    if(currentChapter < book.chapters){
                        this.nextChapterLink = `/${currentBookName}/${currentChapter+1}/`
                    }else{
                        if(book._id < 66){
                            let nextBook =  _.find(books, o => o._id == book._id + 1)
                            this.nextChapterLink = `/${nextBook.bookName}/1/`
                        }
                    }
                }

                if(currentChapter > 1){
                    this.previousChapterLink = `/${currentBookName}/${currentChapter-1}/`
                }else{
                    if (book._id > 1) {
                        let previousBook = _.find(books, o => o._id == book._id - 1)
                        if(previousBook.firstChapter == 0){
                            this.previousChapterLink = `/${previousBook.bookName}/${previousBook.chapters-1}/`
                        }else{
                            this.previousChapterLink = `/${previousBook.bookName}/${previousBook.chapters}/`
                        }
                    }else{
                        this.previousChapterLink = null
                    }
                }
            }
        }
    }
</script>
