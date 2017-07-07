<template>
    <div class="main">
        <Chapter></Chapter>
        <FooterSection></FooterSection>
        <Splash></Splash>
    </div>
</template>

<script>
import Chapter from '@/components/Chapter'
import FooterSection from '@/components/FooterSection'
import Splash from '@/components/Splash'

export default {
    components: {
        Chapter,
        FooterSection,
        Splash
    }
}
</script>