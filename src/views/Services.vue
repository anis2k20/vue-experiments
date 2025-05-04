<!-- components/PostsList.vue -->
<script setup>
import { ref, onMounted } from 'vue'
import { useApi } from '@/composable/useApi';   // adjust path as needed

const form = ref({
  title:'',
  body:'',
  userId: '',
})
const { get,post, loading, error } = useApi()
const posts = ref([])

async function fetchPosts() {
  try {
    posts.value = await get('/posts')  
  } catch (e) {
    // error ref already populated; extra handling optional
  }
}

async function addPost() {
  try{
    await post('/posts',form.value)
  }catch(e){
    console.error(e)
  }
}



onMounted(fetchPosts)
</script>

<template>
  <section class="space-y-4">
    <h1 class="text-2xl font-bold">JSONPlaceholder Posts</h1>

    <form @submit.prevent="addPost" class="flex  flex-col gap-4">
      <label for="titel">
        <input type="text" name="title" v-model="form.title">
      </label>
      <label for="body">
        <input type="text" name="body" v-model="form.body">
      </label>
      <label for="userId">
        <input type="number" name="userId" v-model="form.userId">
      </label>
      <button type="submit" clas="bg-red-400 text-white">Add Post</button>
    </form>

    <!-- Loading / error states -->
    <p v-if="loading" class="italic">Loading…</p>
    <p v-else-if="error" class="text-red-600">{{ error }}</p>

    <!-- Render posts -->
    <ul v-else class="grid gap-3">
      <li
        v-for="post in posts"
        :key="post.id"
        class="rounded-lg shadow p-4"
      >
        <h2 class="font-semibold">{{ post.title }}</h2>
        <p class="text-sm text-gray-700">{{ post.body }}</p>
      </li>
    </ul>
  </section>
</template>
