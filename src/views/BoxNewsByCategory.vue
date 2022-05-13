<template>
    <div class="new-container">
        <div class="row">
            <div class="top-bar my-0 py-0">
               <p class="title p-0 m-0 px-2">
                   <span>{{getNewList.title}} - {{getNewList.id}}</span> <i class="fas fa-chevron-right"></i>
               </p>
            </div>
            <div class="content my-0 py-2">
                <LoadingBox v-if="loading"/>
                <i class="fas fa-chevron-left p-2 btn-page" @click="prevPageHanlder"></i>
                <div class="row">
                    <div class="col-md-4">
                        <div class="left-box-news">
                            <img src="" alt="">
                            <p>ក្រុមហ៊ុនអាកាសចរណ៍អាមេរិក ចេញមុខសុំទោស ក្រោយបុគ្គលិកខ្លួនដេញ DJ Soda ចេញពីយន្ដហោះ</p>
                        </div>
                    </div>
                    <div class="col-md-8">
                        <div class="row">
                            <div class="col-md-4" v-for="article in articles" :key="article.id">
                                 <router-link :to="{name:'news-detail', params:{id:article.id}}" class="link">
                                    <div class="right-box-new">
                                        <img :src="article.image" alt="">
                                        <p>{{article.title}}</p>
                                    </div>
                                </router-link>
                            </div>
                        </div>
                    </div>
                </div>
                <i class="fas fa-chevron-right p-2 btn-page" @click="nextPageHanlder"></i>
            </div>
        </div>
    </div>
</template>

<script>
import { cloneVNode } from '@vue/runtime-core'
import axios from 'axios'
import LaravelVuePagination from 'laravel-vue-pagination'
import LoadingBox from './Animation/LoadingBox.vue'
export default ({
    props:['getNewList'],
    data(){
        return{
            articles : [],
            loading:true,
            category: '',
            links:[],
            listView: true,
            laravelData: {},
            users: [],
            page:1
        }
    },
    components: {
        LoadingBox
    },
    methods:{
        paginateHanlder(page) {
                this.loading = true
                axios.get('http://127.0.0.1:8090/api/v1/topic/'+this.$props.getNewList.id+'?page='+page)
                .then(response => {
                    this.loading = false
                    this.links = response.data['meta']['links']
                    var length = response.data['data'].length
                    this.articles=response.data['data']
                })
                .catch(error => {
                  console.log(error)
                })
        },
        nextPageHanlder() {
            this.page = this.page + 1
            this.paginateHanlder(this.page) 
           
        },
        prevPageHanlder() {
            this.page = this.page - 1
            this.paginateHanlder(this.page) 
           
        }
    },
    created() {
      this.loading = true
      axios.get('http://127.0.0.1:8090/api/v1/topic/'+this.$props.getNewList.id+'?page='+this.page)
       .then(response => {
           this.articles=response.data['data']
           this.page = 1
           console.log(response.data['data'])
           this.category = response.data['data'][0]['category'][0]['title']
           this.laravelData = response.data
           this.loading = false
          //  console.log(response.meta)
       })
       .catch(error => {
         console.log(error)
       })
    },
})
</script>

<style scoped>
    .new-container .top-bar{
        width: 100%;
        border-bottom:3px solid rgb(8, 213, 145);
    }
    .new-container .top-bar .title{
        height: 80px;
        width: fit-content;
        line-height: 80px;
        padding: 0px 20px;
        color: white;
        font-size: 18px;
        font-weight: 600;
        background-color: rgb(8, 213, 145);
    }
    .new-container .content{
        position: relative;
        width: 100%;
        background-color: white;
        box-shadow: 0px 2px 2px 0.5px #888888;
        display: flex;
        align-items: center;
    }
    .left-box-news img{
        width: 100%;
        height: 240px;
        background-color: orange;
    }
    .left-box-news p{
        background-color: rgb(228, 54, 83);
        padding: 10px;
        font-size: 20px;
        font-weight: 600;
        color: white;
    }
    .right-box-new{
        width: 100%;
    }
    .right-box-new img{
        width: 100%;
        height: 90px;
        background-color: olivedrab;
    }
    .right-box-new p{
        font-size: 13px;
        font-weight: 500;
    }
    .link{
        text-decoration: none;
        color: black;
    }
    .btn-page{
        font-size: 20px;
        cursor: pointer;
        color: rgb(228, 54, 83);
    }
</style>