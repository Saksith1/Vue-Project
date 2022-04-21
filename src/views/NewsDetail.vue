<template>
   <loading v-if="loading"/>
   <div class="bg">
        <img :src="news.image" alt="" class="bg-image">
        <div class="container">
            <div class="row my-4">
                <div class="col-md-9 content p-4">
                    <h1>{{ news.title }}</h1>
                    <p class="date">{{ news.created_at}}</p>

                    <div class="description" v-html="news.body "></div>
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
import Loading from './Animation/Loading.vue'

export default ({
    props:['id'],
    components:{
        Loading
    },
    data() {
        return{
            news: [],
            loading: true
        }
    },
    created() {
        this.loading = true
        axios.get('http://127.0.0.1:8090/api/v1/posts/'+this.id)
        .then(response => {
            this.news = response.data['record']
             this.loading = false
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