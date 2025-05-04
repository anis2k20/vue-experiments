<script setup>
  import { ref } from 'vue'
  import axios from 'axios'
  
  const email = ref('')
  const password = ref('')
  const error = ref('')
  
  const handleLogin = async () => {
    try {
      const response = await axios.post('https://dummyjson.com/auth/login', {
        username: email.value,
        password: password.value
      })
  
      const token = response.data.token
      localStorage.setItem('token', token) // Save token
  
      // Redirect to dashboard or homepage
      window.location.href = '/dashboard'
    } catch (err) {
      error.value = 'Login failed: ' + err.response?.data?.message || err.message
    }
  }
  </script>
  
<template>
  <div class="space-y-4">
    <h2 class="text-center font-bold text-4xl">Login</h2>
    <form @submit.prevent="handleLogin" class="block flex flex-col max-w-sm gap-2 mx-auto">
      <input v-model="email" type="text" placeholder="Username" required  class="border p-2 "/>
      <input v-model="password" type="password" placeholder="Password" required class="border p-2 " />
      <button type="submit" class="bg-gray-200 p-2 hover:bg-green-500 hover:text-white rounded">Login</button>
      <p v-if="error">{{ error }}</p>
    </form></div>
  </template>
  
  