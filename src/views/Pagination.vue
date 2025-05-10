<script setup>
import axios from "axios";
import {computed, onMounted, ref, watchEffect} from "vue";

const users = ref([]);
const page = ref(1);
const totalPages = ref(1);
const search = ref("");

async function fetchUsers() {
   const res = await axios.get('https://reqres.in/api/users',{
    
    params: {
        page: page.value,
    },
    headers:{
       'x-api-key': 'reqres-free-v1',
       'Content-Type': 'application/json'
    }
   });
   const data = res.data;
   page.value = data.page;
   totalPages.value= data.total_pages;
   users.value = data.data;
   console.log(users.value);
   
}

watchEffect(()=>{
    fetchUsers();
})


const filteredUsers = computed(() => {
  return users.value.filter(user =>
    user.first_name.toLowerCase().includes(search.value.toLowerCase()) ||
    user.last_name.toLowerCase().includes(search.value.toLowerCase()) ||
    user.email.toLowerCase().includes(search.value.toLowerCase())
  )
})



</script>

<template>
    <div class="max-w-lg mx-auto mt-10 space-y-4">
    <h2 class="text-2xl font-bold">User List</h2>
    <!-- <button @click="fetchUsers">Fetch Users</button> -->
    <div class="relative">

   
    <input
      v-model="search"
      type="text"
      placeholder="Search (fake - not functional here)"
      class="w-full border px-3 py-2"
    />

    <ul v-if="search.length>0" class="absolute bg-gray-100 rounded-lg w-full p-4 shadow-lg">
      <li v-for="user in filteredUsers" :key="user.id" class="border-b hover:text-blue-600 hover:underline cursor-pointer flex gap-small items-center p-2">
      <img :src="user.avatar" class="rounded-full h-10 w-10"/> <span class="pl-2"> {{ user.first_name }} {{ user.last_name }} - {{ user.email }}</span>
      </li>
    </ul> 
</div>
    
    <ul>
      <li v-for="user in users" :key="user.id" class="border flex items-center p-2">
        <img :src="user.avatar" class="rounded-full h-10 w-10"/> <span class="pl-2">{{ user.first_name }} {{ user.last_name }} - {{ user.email }}</span>
      </li>
    </ul>
   

    <div class="flex justify-between mt-4">
      <button @click="page--" :disabled="page === 1" class="px-4 py-2 bg-gray-200">Previous</button>
      <button @click="page++" :disabled="page === totalPages" class="px-4 py-2 bg-gray-200">Next</button>
    </div>
  </div>
</template>