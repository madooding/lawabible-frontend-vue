<template>
    <div class="main">
        <Splash></Splash>
        <Chapter></Chapter>
        <FooterSection></FooterSection>
    </div>
</template>

<script>
const Chapter = () => import(
    /* webpackChunkName: "chapter-content" */  '@/components/Chapter'
)    
const FooterSection = () => import(
    /* webpackChunkName: "footer-section" */ '@/components/FooterSection'
)
const Splash = () => import(
    /* webpackChunkName: "splash" */ '@/components/Splash'
)

export default {
    components: {
        Chapter,
        FooterSection,
        Splash
    }
}
</script>