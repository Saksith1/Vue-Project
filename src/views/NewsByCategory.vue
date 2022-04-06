<template>
   <div class="container">
        <div class="row">
            <div class="col-md-9">
                <div class="row">
                  <h1>id:{{ this.id }}</h1>
                  <div v-for="article in articles " :key="article.id" class="col-12">
                     <BoxShowNews v-bind:article="article"/>
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
export default ({
    components: {
      BoxShowNews
    },
    data(){
      return{
        articles : []
      }
    },
    mounted() {
      console.log(`the component is now mounted.`)
    },
    props:['id'],
    created(){
       axios.get('http://127.0.0.1:8090/api/v1/topic/'+this.id)
       .then(response => {
           this.articles  = response.data['data']
       })
       .catch(error => {
         console.log(error)
       })
    }
})
</script>

