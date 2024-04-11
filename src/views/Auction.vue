<template>
    <!-- <ListPage :pageInfo="pageInfo"/> -->
    
    <div class="test-page">
        <p>{{pageInfo.size}}</p>
    </div>
</template>

<script setup>
    import ListPage from '@/components/common/ListPage.vue';
    import axios from 'axios';
    import {ref, reactive} from 'vue';
    const pageNum = ref(1);
    const pageSize = ref(2);
    const response = await axios.get(`http://localhost/backEnd/product/list?pageNumber=${pageNum.value}&pageSize=${pageSize.value}`);
    //const response = axios.get(`http://localhost/backEnd/product/list?pageNumber=${pageNum.value}&pageSize=${pageSize.value}`);
    console.log ('response:', response.data.data);
    const pageInfo =  ref(
        response.data.data
        );
    console.log('pageInfo: ', pageInfo)
</script>

<style>
    .test-page{
        margin: 80px 20px 10vh 20px;
        display: flex;
        flex-direction: column;
        height: 90vh;
        background-color: #ebebeb;
    }
</style>