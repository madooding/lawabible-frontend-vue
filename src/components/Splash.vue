<template>
    <div id="splash">
        <div class="splash__logo">พะทัม<div class="lawa">ลเวือะ</div></div>
    </div>
</template>

<script>
export default {
    mounted(){
        let fadeOutDelay = 250;
        let splashTime = 2000;
        _.debounce(()=>{
            $('#splash').addClass('fade-out')
        }, splashTime)()
        _.debounce(()=>{
            $('body').css('overflow-y', 'auto')
            $(this.$el).remove()
        }, splashTime + fadeOutDelay)()
    }
}
</script>
