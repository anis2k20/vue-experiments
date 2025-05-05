<template>
     <div class="flex h-screen">

<!-- Sidebar -->
<div class="w-64 bg-gray-800 text-white p-4">
  <h1 class="text-2xl font-bold mb-6">Dashboard</h1>
  <ul>
    <li class="mb-4"><a href="#" class="text-gray-300 hover:text-white">Home</a></li>
    <li class="mb-4"><a href="#" class="text-gray-300 hover:text-white">Reports</a></li>
    <li class="mb-4"><a href="#" class="text-gray-300 hover:text-white">Settings</a></li>
  </ul>
</div>

<!-- Main Content -->
<div class="flex-1 p-6">
  <!-- Header -->
  <div class="flex justify-between items-center mb-6">
    <h2 class="text-3xl font-semibold">Welcome Back, User!</h2>
    <router-link :to="{name: 'home'}" class="bg-blue-500 text-white px-4 py-2 rounded-lg">Logout</router-link>
  </div>

  <!-- Content Section -->
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    <div class="bg-white p-4 rounded-lg shadow-lg">
      <h3 class="text-xl font-semibold mb-4">Total Sales</h3>
      <p class="text-2xl font-bold text-blue-500">$45,320</p>
    </div>
    <div class="bg-white p-4 rounded-lg shadow-lg">
      <h3 class="text-xl font-semibold mb-4">New Orders</h3>
      <p class="text-2xl font-bold text-green-500">120</p>
    </div>
    <div class="bg-white p-4 rounded-lg shadow-lg">
      <h3 class="text-xl font-semibold mb-4">Customers</h3>
      <p class="text-2xl font-bold text-red-500">1,200</p>
    </div>
  </div>
</div>
</div>
</template>