<template>
   <Loading v-if="loading"/>
   <div class="container">
        <div class="row py-4">
            <div class="col-md-9 ">
                <div class="row m-0">
                  <div class="top-bar">
                     <p>{{ category }} <i class="fas fa-chevron-right"></i></p>
                     <span>
                        <i class="fas fa-list-ul px-2 btn-list" :class="{'active':listView}" @click="listViewHanlder"></i>
                       <i class="fas fa-compress px-2 btn-column" :class="{'active':!listView}" @click="colViewHanlder"></i>
                     </span>
                  </div>
                </div>
                <div class="row news-container p-4 m-0">
                  <div v-for="article in articles " :key="article.id" class="col-12" :class="{'col-md-4':!listView}">
                     <BoxShowNews v-bind:article="article" :v-bind:listView="listView" :class="{'column-view':!listView}" />
                  </div>
                </div>
            </div>
            <div class="col-md-3">

            </div>
        </div>
   </div>
</template>

<script>

import { cloneVNode } from '@vue/runtime-core'
import axios from 'axios'
import NewsBox from './NewsBox.vue'
import BoxShowNews from './BoxShowNews.vue'
import Loading from './Animation/Loading.vue'
import LaravelVuePagination from 'laravel-vue-pagination'

export default ({
    components: {
    'Pagination': LaravelVuePagination,
      BoxShowNews,
      Loading
    },
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
    mounted() {
      console.log(`the component is now mounted.`)
    },
    // updated(){
    //   console.log(this.id)
    // },
    props:['id'],
    watch: {
      '$route.params.id': function (id) {
      this.loading = true
      axios.get('http://127.0.0.1:8090/api/v1/topic/'+id+'?page=1')
       .then(response => {
           this.articles=response.data['data']
           this.page = 1
           console.log(this.articles)
           this.category = response.data['data'][0]['category'][0]['title']
           this.laravelData = response.data
           this.loading = false
          //  console.log(response.meta)
       })
       .catch(error => {
         console.log(error)
       })
      }
    },
    methods:{
      listViewHanlder() {
         this.listView = true
      },
      colViewHanlder() {
         this.listView = false
      },
      paginateHanlder(page) {
            this.loading = true
            axios.get('http://127.0.0.1:8090/api/v1/topic/'+this.id+'?page='+page)
            .then(response => {
                this.loading = false
                this.links = response.data['meta']['links']
                var length = response.data['data'].length

                for(let i=0; i<length; i++){
                    this.articles.push(response.data['data'][i])
                }
            })
            .catch(error => {
              console.log(error)
            })
      },
      // getInitialUsers() {
      //   axios.get(`https://randomuser.me/api/?results=5`).then((response) => {
      //     this.users = response.data.results;
      //     console.log(response.data.results)
      //   });
      // },
      getNextUser() {
          window.onscroll  = () => {
            // @var int totalPageHeight
            var totalPageHeight = document.body.scrollHeight; 

            // @var int scrollPoint
            var scrollPoint = window.scrollY + window.innerHeight;

            // check if we hit the bottom of the page
            if(scrollPoint >= totalPageHeight)
            {
               if(this.links.length > this.page){
                 this.paginateHanlder(this.page)
                 this.page = this.page + 1
               }
            }
        }
      }
    },
    beforeMount() {
       this.loading = true
       axios.get('http://127.0.0.1:8090/api/v1/topic/'+this.id+'?page=0')
       .then(response => {
           this.articles  = response.data['data']
           this.loading = false
           this.links = response.data['meta']['links']
           console.log(response.data['data'])
       })
       .catch(error => {
         console.log(error)
       })
    },
    mounted() {
      this.getNextUser();
    }
})
</script>

<style scoped>
  .news-container{
    background-color: white;
    border: 0.2px solid rgb(214, 214, 214);
    box-shadow: 5px 5px solid rgb(0, 0, 0);
  }
  .top-bar{
    width: 100%;
    height: 40px;
    border-bottom:2px solid rgb(23, 165, 23);
  }
  .top-bar p{
    float: left;
    height: 40px;
    line-height: 40px;
    padding: 0px 5px;
    color: white;
    background-color: rgb(23, 165, 23);
  }
  .top-bar span{
    float: right;
  }
   .top-bar span i{
     cursor: pointer;
   }
   .top-bar .btn-list.active{
     color: rgb(23, 165, 23);
   }
   .top-bar .btn-column.active{
     color: rgb(23, 165, 23);
   }

   /* --------------------------- */
  .user {
    display: flex;
    background: #ccc;
    border-radius: 1em;
    margin: 1em auto;
  }

  .user-avatar {
    padding: 1em;
  }

  .user-avatar img {
    display: block;
    width: 100%;
    min-width: 64px;
    height: auto;
    border-radius: 50%;
  }

  .user-details {
    padding: 1em;
  }

  .user-name {
    margin: 0;
    padding: 0;
    font-size: 2rem;
    font-weight: 900;
  }
</style>