<template>
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

         </div>
     </div>
   </div>
</template>

<script>

import NewsBox from './NewsBox.vue'

import * as Vue from 'vue' // in Vue 3
import axios from 'axios'
import VueAxios from 'vue-axios'

export default ({
    components: {
      NewsBox
    },
    data(){
      return{
          NewsByCategory : []
      }
    },
    created() {
        axios.get('http://127.0.0.1:8090/api/v1/posts')
        .then(response => {
            this.NewsByCategory = response.data['data']
        })
        .catch( error => {
          console.log(error);
        })
        
    }
})
</script>

