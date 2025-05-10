<template>
    <div class="p-10 flex gap-4">
        <router-link :to="{name: 'api.service'}" class="p-4 border border-red-600">Service api</router-link>
        <router-link :to="{name: 'crud'}" class="p-4 border border-red-600">Todo</router-link>
        <router-link :to="{name: 'authorization'}" class="p-4 border border-red-600">Authorization</router-link>
        <router-link :to="{name: 'face-auth'}" class="p-4 border border-red-600">Face Auth </router-link>
        <router-link :to="{name: 'pagination'}" class="p-4 border border-red-600">Pagination</router-link>
    </div>
</template>
<style scoped>

</style>