<template>
    <router-link :to="{name:'news-detail', params:{id:article.id}}">
        <div class="box">
            <div class="img-box">
                <img :src="article.image" alt="">
            </div>
            <div class="content">
                <h4>{{article.title}}</h4>
                <span class="date">{{article.createdAt}}</span>
                <p>
                    {{article.body}}
                </p>
            </div>
        </div>
    </router-link>
</template>
<script>
export default ({
   props:['article']
})
</script>

<style scoped>
    .box{
        width: 100%;
        display: flex;
    }
    .box .img-box{
        min-width: 300px;
        max-height: 200px;
        overflow: hidden;
    }
    .box .img-box img{
         width: 100%;
    }
    .box .content h4{
        font-weight: 600;
    }
    .box .content{
        width: 100%;
        margin-left: 10px;
    }
    .box .content .date{
        width: 100%;
        font-size: 13px;
        color: rgb(107, 107, 107);
        border-bottom:0.2px solid gray;
    }
</style>