<template>
   <div class="bg">
        <img src="/images/bg.jpg" alt="" class="bg-image">
        <div class="container">
            <div class="row my-4">
                <div class="col-md-9 content p-4">
                    <h1>{{ news.title }}</h1>
                    <p class="date">{{ news.created_at}}</p>

                    <div class="description">{{ news.body }}</div>
                </div>
                <div class="col-md-3">
                
                </div>
            </div>
        </div>
   </div>
</template>


<script>
import * as Vue from 'vue' // in Vue 3
import axios from 'axios'
import VueAxios from 'vue-axios'

export default ({
    props:['id'],
    data() {
        return{
            news: []
        }
    },
    created() {
        axios.get('http://127.0.0.1:8090/api/v1/posts/'+this.id)
        .then(response => {
            this.news = response.data['record']
        })
        .catch(error => {
            console.log(error)
        })
    }
})
</script>

<style scoped>
    .bg{
        width: 100%;
        height: 100%;
        position: relative;
    }
    .bg-image{
        top: 0;
        left: 0;
        position: absolute;
        width: 100%;
        /* Add the blur effect */
        filter: blur(8px);
        -webkit-filter: blur(8px);
        z-index: 1;
    }
    .content{
        z-index: 2;
        background-color: white;
    }
    .content .date{
        color: rgb(97, 97, 97);
    }
    .content .description{
        text-align: justify;
    }
</style>