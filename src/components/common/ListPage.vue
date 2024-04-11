<template>
    <div v-for="item in items" :key="item.id">
        <div></div>
    </div>
    <div class="pagination">
        <button @click="prevPage" :disabled="currentPage === 1">上一页</button>
        <span>第 {{ currentPage }} 页/共 {{ totalPages }} 页 </span>
        <button @click="nextPage" :disabled="currentPage === totalPages">下一页</button>
    </div>
</template>

<script setup>
    import { reactive, ref } from 'vue'
    const props = defineProps({
        pageNum: Number,
        pages: Number,
        list: []
    })
    console.log('get value:', props);
    const currentPage = ref(props.pageNum);
    const totalPages = ref(props.pages);
    const items = ref(props.list);
    function prevPage() {
        if (currentPage.value > 0) {
            currentPage.value --;
        }
    }

    function nextPage() {
        if (currentPage.value < totalPages.value) {
            currentPage.value ++;
        }
    }
</script>

