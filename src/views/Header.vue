<template>
    <div class="header">
        <div class="container">
            <Toggle v-if="mobileView" @click="toggleMenu"/>
            <router-link :to="{name:'home'}">
                <div class="logo">
                    <img src="/images/logo.png" alt="">
                </div>
            </router-link>
            <div class="ad"  v-if="!mobileView">
                <img src="/images/top-ad.jpg" alt="">
            </div>
            <div class="right-ad"  v-if="mobileView">
                News
            </div>
        </div>
    </div>
</template>

<script>
import Toggle from './buttons/Toogle.vue'

export default ({
    props:['mobileView'],
    components:{
        Toggle
    },
    el: '#app',
    methods:{
        toggleMenu(){
            this.$emit('toggle');
        }
    }
})
</script>

<style scoped>
    .header{
        width: 100%;
        height: 100px;
        background-color: black;
    }
    .logo{
        float: left;
        margin-top: 15px;
        width: 70px;
        height: 70px;
    }
    .logo img{
        height: 100%;
    }
    .ad{
        float: right;
        margin-top: 15px;
        height: 70px; 
    }
    .ad img{
        height: 100%;
    }
    .toggle-menu {
        color: white;
        cursor: pointer;
    }
    .toggle-menu{
        display: none;
    }
    .right-ad{
        color: white;
    }

    .mobile-view .header{
        height: 60px;
    }
    .mobile-view .logo {
        margin: 10px;
        height: 40px;
    }
    .mobile-view .header .container{
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
</style>