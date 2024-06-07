<script setup async lang="ts">
import { onMounted, ref } from 'vue';
import { useAuthUser } from "@/libs/supabaseClient";

definePageMeta({
  middleware: ["auth"]
})

const sessionData = ref();

const loadSession = async () => {
  const getSession = useAuthUser().getSession;
  sessionData.value = await getSession();
  console.log(sessionData.value);
};

onMounted(() => {
  loadSession();
});

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