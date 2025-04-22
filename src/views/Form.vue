<script setup>
import api from "@/axios";

async function creatPost() {
  try {
    const response = await api.post("/posts", {
      title: "this is title",
      body: "this is body",
      userId: 1,
    });
    console.log(response.data);
  } catch (err) {
    console.error(err);
  } finally {
    console.log("post successfull");
  }
}

async function updatePost() {
  try {
    const response = await api.put("/posts/1", {
      title: "titile changed",
    });
    console.log("put request", response.data);
  } catch (err) {
    console.error(err);
  }
}

async function deletePost() {
  try {
    const response = api.delete("/posts/1");
    console.log("delete post", response.data);
  } catch (err) {
    console.error(err);
  }
}

async function patchPost() {
  try {
    const response = api.patch("/posts/1", {
      title: "only title was changed",
    });
  } catch (e) {
    console.error(e);
  }
}

import { ref } from "vue";
const form = ref({
  id: null,
  title: "",
  body: "",
});
async function editPost(id) {
  try {
    const response = await api.get(`/posts/${id}`);
    form.value.title = response.data.title;
    form.value.body = response.data.body;
  } catch (e) {
    console.log(e);
  }
}

async function handleForm() {
  try {
    const response = api.post("/posts", {
      title: form.value,
      body: form.body,
    });
    console.log("post");
  } catch (err) {
    console.log(err);
  }
}
</script>
<template>
  <div>
    <button @click="creatPost">Post</button>
    <button @click="updatePost">Update Post</button>
    <button @click="deletePost">Delete Post</button>
    <button @click="patchPost">Patch Post</button>
    <button @click="editPost(1)">Edit Post</button>
  </div>
  <form @submit.prevent="handleForm">
    <div>
      <label for="title">Title: </label>
      <input v-model="form.title" type="text" required />
    </div>

    <div>
      <label for="body">Body: </label>
      <textarea v-model="form.body" />
    </div>

    <button>Submit</button>
  </form>
</template>
