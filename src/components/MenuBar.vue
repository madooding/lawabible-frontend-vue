<template>
    <div id="menu-bar">
        <div class="menubar__container">
            <div class="ui secondary large menu">
                <a class="item logo">พะทัม<div class="lawa">ลเวือะ</div><sup class="beta">beta</sup></a>
                <a class="item logo--icon"><img src="../assets/svg/icon.svg"></a>
                <div class="item dropdown-section">
                    <div class="ui grid dropdown-section__container">
                        <div class="eleven wide column" id="bookSelectorColumn">
                            <select class="ui fluid selection dropdown" v-if="books" ref="bookSelector" :value="currentBookName">
                                <option v-for="each in books" :value="each.bookName" :key="each._id">{{ each.bookNameLW }}</option>
                            </select>
                        </div>
                        <div class="five wide column"  id="chapterSelectorColumn">
                            <select class="ui fluid selection dropdown" :value="currentChapter" ref="chapterSelector" v-cloak>
                                <option v-for="chapter in chapters" :value="chapter" :key="chapter">{{ chapter }}</option>
                            </select>
                        </div>      
                    </div>
                </div>
                <div class="right item menu">
                    <div class="item" ref='adjustTextSizeBtn' id="adjustTextSizeBtn">
                        Aa
                    </div>
                    <TextSizeAdjustPopup ref="textSizeAdjustPopup"></TextSizeAdjustPopup>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Books from '../data/books.js'
import axios from 'axios'
import TextSizeAdjustPopup from './TextSizeAdjust'


export default {
    components: {
        TextSizeAdjustPopup
    },

    data: () => ({
        books: Books,
        currentBookName: 'GEN',
        currentChapter: 1,
        chapters: 50
    }),
    
    created(){
        this.updateState()
    },

    mounted(){
        $('.ui.dropdown').dropdown()
        $(this.$refs.bookSelector).on('change', () => {
            this.$router.replace(`/${$(this.$refs.bookSelector).val()}/1`)

        })
        $(this.$refs.chapterSelector).on('change', () => {
            this.$router.replace(`/${this.currentBookName}/${$(this.$refs.chapterSelector).val()}`)
        })
        $('#adjustTextSizeBtn').on('click', () => {
            this.$refs.textSizeAdjustPopup.toggle()
        })
    },

    computed:{
        getCurrents(){
            return this.$store.getters.getCurrents
        }
    },

    watch: {
        
        getCurrents(){
            this.updateState()
        },

        currentBookName() {
            let book = _.find(this.books, o => o.bookName == this.currentBookName)
            $('#bookSelectorColumn div.text').html(book.bookNameLW)
            $('#bookSelectorColumn div.menu > div.item').removeClass('active selected')
            $(`#bookSelectorColumn div.menu > div.item:nth(${book._id - 1})`).addClass('active selected')
        },
        currentChapter(){
            $('#chapterSelectorColumn div.text').html(this.currentChapter)
            this.updateChapterSelected()
        },

        chapters(){
            this.$nextTick(() => {
                this.updateChapterSelected()
            })
        }
    },

    methods: {
        updateState(){
            this.books = this.$store.getters.getAllBooksInfo
            this.currentBookName = this.$store.getters.getCurrents.bookName
            this.currentChapter = this.$store.getters.getCurrents.chapter
            this.chapters = this.$store.getters.getChapters
        },

        updateChapterSelected(){
            $('#chapterSelectorColumn div.menu > div.item').removeClass('active selected')
            $(`#chapterSelectorColumn div.menu > div.item:nth(${this.currentChapter - 1})`).addClass('active selected')
        }
    }
}
</script>
<style>
</style>