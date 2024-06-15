<script setup lang="ts">
import { ref, onMounted } from 'vue';

const supabase = useSupabaseClient()

type User = {
  [key: string]: any
}

const user = ref<User | null>(null)

onMounted(async () => {
  const { data, error } = await supabase.auth.getUser()
  user.value = data.user
  if (error) {
    console.error(error)
    return
  }
})

</script>

<template>
  <main class="container max-w-[600px] mx-auto border rounded-xl py-12 px-8">
    <h1 class="text-2xl font-bold pb-6">Welcome {{ user?.user_metadata.name }}</h1>
    <section class="container mx-auto">
      <div>Your email has been confirmed successfully.<NuxtLink to="/" class="text-blue-500"> Go to homepage.</NuxtLink></div>
    </section>
  </main>
</template>