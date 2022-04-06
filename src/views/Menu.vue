<template>
    <div class="menu-bar" :class="{'active':showMenu}">
        <div class="container">
            <ul>
                <li v-for="menu in menus" :key="menu.id">
                    <router-link :to="{name:menu.url, params:{id:menu.id}}">
                        <a>{{ menu.title }}</a>
                    </router-link>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>

import * as Vue from 'vue' // in Vue 3
import axios from 'axios'
import VueAxios from 'vue-axios'

export default ({
    props:['showMenu'],
    data() {
        return{
            menus: []
        }
    },
    created(){
        axios.get('http://127.0.0.1:8090/api/v1/categoires')
        .then(response => {
            this.menus =  response.data['data']
        })
        .catch(error => {
            console.log(error)
        })
    }
})
</script>

<style scoped>
    .menu-bar{
        width: 100%;
        height: 60px;
        background-color: #f1232d;
        z-index: 4;
    }
    .menu-bar ul{
        margin: 0;
        padding: 0;
    }
    .menu-bar ul li{
        list-style-type: none;
        display: inline-block;
        height: 60px;
        line-height: 60px;
    }
    .menu-bar ul li a{
        text-decoration: none;
        color:white;
        font-size: 22px;
        margin-right: 20px;
        font-weight: 600;
    }
    .menu-bar ul li a:hover{
        color: rgb(216, 216, 216);
    }

    .mobile-view .menu-bar{
            position: fixed;
            height: fit-content;
            top: 60px;
            left: -750px;
            transition: 0.3s;
    }
    .mobile-view .menu-bar ul li{
             display: list-item;
    }
    .active.menu-bar{
        left: 0px;
    }
</style>
