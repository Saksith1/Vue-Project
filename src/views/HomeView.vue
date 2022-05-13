<template>
   <Loading v-if="loading" />
   <div class="container">
     <div class="row my-2">
         <div class="col-md-9">
           <div class="row">
             <div class="col-md-6 p-0" v-for="news in NewsByCategory" :key="news.id">
                 <NewsBox v-bind:news="news"/>
             </div>
           </div>
         </div>
         <div class="col-md-3">
           <div class="row">
             <div class="col-12">
               <div class="ads-left">
                 <img src="images/ads-left.jpg" alt="">
               </div>
             </div>
             <div class="col-12">
               <div class="ads-left">
                 <img src="images/ads-left.jpg" alt="">
               </div>
             </div>
           </div>
         </div>
     </div>
     <div class="row my-2">
        <div class="col-12 my-4" v-for="Newslist in NewsCategoryList" :key="Newslist.id">
          <BoxNewsByCategory v-bind:getNewList="Newslist"/>
        </div>
     </div>
   </div>
</template>

<script>

import NewsBox from './NewsBox.vue'
import BoxNewsByCategory from './BoxNewsByCategory.vue'

import * as Vue from 'vue' // in Vue 3
import axios from 'axios'
import VueAxios from 'vue-axios'
import Loading from './Animation/Loading.vue'

export default ({
    components: {
      NewsBox,
      Loading,
      BoxNewsByCategory
    },
    data(){
      return{
          NewsByCategory : [],
          NewsCategoryList: [],
          loading : true
      }
    },
    created() {
        this.loading =  true
        axios.get('http://127.0.0.1:8090/api/v1/posts-top-home')
        .then(response => {
            this.NewsByCategory = response.data['data']
            this.loading = false
        })
        .catch( error => {
          console.log(error);
        })

        axios.get('http://127.0.0.1:8090/api/v1/posts-cateogry-list-home')
        .then(response => {
            this.NewsCategoryList = response.data['data']
            // console.log(response.data['data'])
            this.loading = false
        })
        .catch( error => {
          console.log(error);
        })
        
    }
})
</script>

