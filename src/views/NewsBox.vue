<template>
    <router-link :to="{name:'news-detail', params:{id:news.id}}">
    <div class="box-news" style=" background-image: url('/images/bg.jpg')">
        <div class="bg"></div>
        <div v-for="category in news.category" :key="category.id" class="category">{{ category.title }}</div>
            <div class="title">
                <h3>{{ news.title }}</h3>
                <p>{{ news.body }}</p>
            </div>
        <div class="footer">{{ news.createdAt }}</div>
    </div>
    </router-link>
</template>

<script>

export default ({
    props:['news']
})
</script>

<style scoped>
    .box-news{
        width: 100%;
        height: 250px;
        position: relative;
        background-position: fixed;
        background-size: cover;
        background-repeat: no-repeat;
        overflow: hidden;

    }
    .box-news .category{
        position: absolute;
        background-color: green;
        color: white;
        font-weight: 400;
        padding: 10px;
        top: 10px;
        left: 0;
    }
    .box-news .footer{
        position: absolute;
        width: 100%;
        height: 40px;
        line-height: 40px;
        padding: 0px 10px;
        left: 0;
        bottom: 0;
        color: white;
        z-index: 2;
    }
    .box-news .title{
        position: absolute;
        left: 0;
        width: 100%;
        bottom: -10px;
        z-index: 1;
        transition: 0.8s;
        color: white;
    }
    .box-news .bg{
        position: absolute;
        width: 100%;
        height: 100%;
        background: rgb(2,0,36);
        background: linear-gradient(0deg, rgba(2,0,36,1) 0%, rgba(0,0,0,1) 17%, rgba(0,212,255,0) 100%);
        opacity: 0;
        transition: 0.3s;
    }
    .box-news .title h3{
        font-size: 20px;
        padding: 0px 10px;
    }
    .box-news .title p{
        margin: 0;
        height: 40px;
        font-size: 13px;
        padding: 0px 10px;
        opacity: 0;
        transition: 0.3s;
    }
    .box-news:hover >  .title{
        bottom: 40px;
    }
    .box-news:hover .bg{
        opacity: 1;
    }
    .box-news:hover .title p{
        opacity: 1;
    }
</style>