<script setup async lang="ts">
import { ref, onMounted } from 'vue';

const supabase = useSupabaseClient()
</script>

<template>
  <main class="container max-w-[600px] mx-auto border rounded-xl py-12 px-8">
    <h1 class="text-2xl font-bold pb-6">Confirm Your Email</h1>
    <section class="container mx-auto">
      <div>We send an email to your mailbox, please check it.</div>
    </section>
  </main>
</template>