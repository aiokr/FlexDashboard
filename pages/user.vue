<script setup lang="ts">
import { useAuthUser } from "@/libs/supabaseClient";

definePageMeta({
  middleware: ["auth"]
})

const getSession = useAuthUser().getSession;
const sessionData = await getSession();
console.log(sessionData);
</script>

<template>
  <header class="pb-6">
    <h1 class="text-2xl font-bold">Hello, {{ sessionData.session?.user.user_metadata.email }}</h1>
  </header>
  <main class="container mx-auto">
    <section>
    </section>
  </main>

</template>