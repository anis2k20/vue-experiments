<script setup>
import { onMounted, ref } from "vue";
import axios from "axios";
import api from "@/axios";

const data = ref([]);
const loading = ref(true);
const error = ref(null);

onMounted(async () => {
  try {
    // const response = await axios.get(
    //   "https://jsonplaceholder.typicode.com/posts"
    // );
    const response = await api.get("/posts");

    data.value = response.data;
  } catch (err) {
    error.value = err;
  } finally {
    loading.value = false;
  }
});
</script>
<template>
  <div>
    <h1>Posts</h1>
    <div v-if="loading">Loading...</div>
    <div v-else-if="error">Error: {{ error }}</div>
    <div v-else>
      <div
        v-for="post in data"
        :key="post.id"
        style="border: 1px solid black; padding: 10px; margin: 10px"
      >
        <router-link :to="{ name: 'post.show', params: { id: post.id } }">
          <h2>{{ post.title }}</h2>
        </router-link>
      </div>
    </div>
  </div>
</template>
