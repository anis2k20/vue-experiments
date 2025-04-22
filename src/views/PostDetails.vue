<script setup>
import { useRoute } from "vue-router";
import api from "@/axios";
import { onMounted, computed, ref, watch } from "vue";

const route = useRoute();
const postId = computed(() => {
  return route.params.id;
});
const post = ref(null);
const loading = ref(true);
const error = ref(null);

async function fetchPost() {
  loading.value = true;
  error.value = null;
  try {
    const response = await api.get(`/posts/${postId.value}`);
    post.value = response.data;
  } catch (err) {
    error.value = err;
  } finally {
    loading.value = false;
  }
}

watch(
  () => route.params.id,
  () => {
    loading.value = true;
    fetchPost();
  }
);

onMounted(() => {
  fetchPost();
});
</script>

<template>
  <div>
    <h1>Post Details</h1>
    <p v-if="loading">Loading...</p>
    <div v-else>
      <h2>{{ post.title }}</h2>
      <p>{{ post.body }}</p>
    </div>
  </div>
</template>
