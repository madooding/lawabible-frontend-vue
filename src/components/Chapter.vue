<template>
    <div class="content">
        <div class="content--chapter" :class="{ loading: loading }">
            <div class="content--chapter--text" v-if="!loading">
                <span v-for="each in chapter.contents" :class="each.type" v-html="each.content" v-bind:key="each"></span>
            </div>
            <Spinner v-else line-fg-color="#303030"></Spinner>
        </div>
        <ChapterControlBtn></ChapterControlBtn>
        <AlertModal ref="alertModal"></AlertModal>
    </div>
</template> 

<script>
import axios from 'axios'
import Spinner from 'vue-simple-spinner'
import AlertModal from '../components/AlertModal'
import ChapterControlBtn from '../components/ChapterControlBtn'

export default {
    components: {
        Spinner,
        AlertModal,
        ChapterControlBtn
    },
    data: () => ({
        chapter: null,
        loading: false
    }),

    created(){
        this.fetchChapter()
    },


    computed:{
        getCurrents(){
            return this.$store.getters.getCurrents
        },

        getFontSize(){
            return this.$store.getters.getFontSize
        }
    },

    watch: {
        chapter(){
            const re = new RegExp("^[0-9]{1,3}[-]?[0-9]{0,3}", "g")
            if(this.chapter != null){
                for (let content of this.chapter.contents){
                    if(content.type == 'verse'){
                        let to_replace = `<span class='verse__verse-num'>${re.exec(content.content)[0]}</span>`
                        content.content = content.content.replace(re, to_replace)
                    }
                }
                this.$nextTick(()=>{
                    this.adjustFontSize()
                })
                
            }
        },

        getCurrents(){
            this.fetchChapter()
        },

        getFontSize(){
            this.adjustFontSize()
        }

    },

    methods: {
        fetchChapter() {
            const hostname = "https://lawabible.madooding.com"
            this.chapter = null
            this.loading = true
            let book = _.find(this.$store.getters.getAllBooksInfo, o => o.bookName == this.getCurrents.bookName)
            axios.get(`${hostname}/api/book/${book._id}/${this.getCurrents.chapter}`)
                .then(res => {
                    this.chapter = res.data
                    this.loading = false
                })
                .catch(err => {
                    if(err.message == 'Network Error'){
                        this.callModal({
                            header: "Network Error",
                            content: "ไม่สามารถเชื่อมต่อกับ API server ได้, กรุณาลองใหม่อีกครั้ง."
                        })
                    }
                    else {
                        this.callModal({
                            header: "Error",
                            content: "เกิดข้อผิดพลาดขึ้นบางอย่าง, กรุณาลองใหม่อีกครั้ง."
                        })
                    }
                })
        },

        callModal(data) {
            this.$refs.alertModal.callModal(data)
        },

        adjustFontSize(){
            let actualFontSize = (this.getFontSize - 26) / 2
            $('.verse, .paragraph, .italic').css('font-size', `${26 + actualFontSize * 2}px`)
            $('.verse, .paragraph, .italic').css('line-height', `${36 + actualFontSize * 2}px`)
            $('.header').css('font-size', `${38 + actualFontSize * 2}px`)
            $('.header').css('line-height', `${38 + actualFontSize * 2}px`)
            $('.sub-header').css('font-size', `${32 + actualFontSize * 2}px`)
            $('.sub-header').css('line-height', `${36 + actualFontSize * 2}px`)
            $('.references').css('font-size', `${24 + actualFontSize * 2}px`)
            $('.references').css('line-height', `${36 + actualFontSize * 2}px`)
        }
    }
}
</script>