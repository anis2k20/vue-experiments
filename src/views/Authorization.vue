<script setup>
  import { onMounted, ref } from 'vue'
  import axios from 'axios'
  
  const email = ref('')
  const password = ref('')
  const error = ref('')
  const token = ref('');
  
  const handleLogin = async () => {
  try {
    const response = await axios.post(
      'https://reqres.in/api/login',
      {
        email: email.value,
        password: password.value,
      },
      {
        headers: {
          'x-api-key': 'reqres-free-v1',
          'Content-Type': 'application/json'
        },
      }
    )

    token.value = response.data.token
    localStorage.setItem('token', token.value) // Save token
    window.location.href = '/dashboard'
  } catch (err) {
    error.value = 'Login failed: ' + (err.response?.data?.error || err.message)
  }
}

function fetchToken(){
  token.value = localStorage.getItem('token');
}

onMounted(()=>{
  fetchToken();
})
  </script>
  
<template>
  <div class="space-y-4">
    <h2 class="text-center font-bold text-4xl">Login</h2>
    <form @submit.prevent="handleLogin" class="block flex flex-col max-w-sm gap-2 mx-auto">
      <input v-model="email" type="email" placeholder="Email" required  class="border p-2 "/>
      <input v-model="password" type="password" placeholder="Password" required class="border p-2 " />
      <button type="submit" class="bg-gray-200 p-2 hover:bg-green-500 hover:text-white rounded">Login</button>
      <p v-if="error">{{ error }}</p>
    </form>
  <p class="text-center text-gray-400 text-sm">email: <strong>eve.holt@reqres.in</strong></p>
  <p class="text-center text-gray-400 text-sm">password: <strong>cityslicka</strong></p>
  <p class="text-center text-gray-400 text-sm">token: <strong>{{ token }}</strong></p>
  </div>
  </template>
  
  