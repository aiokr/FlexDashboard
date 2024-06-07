<script setup async lang="ts">
import { onMounted, ref } from 'vue';

definePageMeta({
  middleware: 'auth'
})

const user = useSupabaseUser()
console.log(user);

</script>

<template>
  <header class="pb-6">
    <h1 class="text-2xl font-bold">Hello, {{ user?.user_metadata.email }}</h1>
  </header>
  <main class="container mx-auto">
    <section>
    </section>
  </main>

</template>