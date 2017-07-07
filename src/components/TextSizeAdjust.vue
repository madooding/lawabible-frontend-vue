<template>
    <div class="menuPopup" ref="textSizeAdjustPopup" v-if="!isHiding">
    Size
        <vueSlider v-bind="value" v-model="value.value"></vueSlider>
    {{ 26 + value.value * 2 }}pt
    </div>
</template>

<script>
import vueSlider from 'vue-slider-component';

export default {
    components: {
        vueSlider
    },

    created(){
        if(!this.$cookie.get('font-size') || !(Number(this.$cookie.get('font-size')) <= 36 && Number(this.$cookie.get('font-size')) >= 16)){
            this.$cookie.set('font-size', 26)
            this.$store.dispatch('setFontSize', 26)
        }else{
            this.value.value = (Number(this.$cookie.get('font-size')) - 26) / 2
            this.$store.dispatch('setFontSize', Number(this.$cookie.get('font-size')))   
        }
    },


    mounted(){
        $(document).mouseup((e) =>
            {
                var container = $(this.$refs.textSizeAdjustPopup);
                if (!$('.item').is(e.target) && !container.is(e.target) && container.has(e.target).length === 0)
                {
                    this.hide()
                }
        })
        
        $(this.$refs.textSizeAdjustPopup).on('click', (e) => {
            e.stopPropagation();
        })
    },

    methods: {
        show(){
            this.isHiding = false
        },
        hide(){
            this.isHiding = true
        },
        toggle(){
            if(this.isHiding){
                this.show()
            }else{
                this.hide()
            }
        }
    },

    data: () => ({
        isHiding: true,
        value : {
            value: 0,
            width: 100,
            height: 2,
            min: -5,
            max: 5,
            interval: 1,
            disabled: false,
            show: true,
            speed: 0.1,
            reverse: false,
            tooltip: "none",
            piecewise: true
        }
    }),

    watch: {
        'value.value': function(){
            this.$cookie.set('font-size', 26 + this.value.value * 2)
            this.$store.dispatch('setFontSize', 26 + this.value.value * 2)
        }
    }
}
</script>
