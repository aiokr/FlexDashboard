<script setup async lang="ts">
import { onMounted, ref } from 'vue';

const supabase = useSupabaseClient()

const register = async (form: { email: string; password: string, name: string }) => {
  const { data, error } = await supabase.auth.signUp({
    email: form.email,
    password: form.password,
    options: {
      data: { name: form.name },
      emailRedirectTo: window.location.origin + "/confirm",
    },
  }
  );
  if (error) {
    console.error(error.message);
    throw error;
  }
  console.log(data);
  window.location.href = "/check-email";
}

// Form reactive ref to keep up with the form data
const form = ref({
  name: "",
  email: "",
  password: "",
});

const handleRegister = async () => {
  try {
    await register(form.value);
  } catch (error: any) {
    console.log(error.message);
  }
};
</script>

<template>
  <main class="container max-w-[600px] mx-auto border rounded-xl py-12 px-8">
    <h1 class="text-2xl font-bold pb-6">Register</h1>
    <section class="container mx-auto">
      <form @submit.prevent="handleRegister">
        <div class="flex flex-col gap-4">
          <div>
            <label>Name <input v-model="form.name" type="name" /></label>
          </div>
          <div>
            <label>Email <input v-model="form.email" type="email" /></label>
          </div>
          <div>
            <label>Password <input v-model="form.password" type="password" /></label>
          </div>
        </div>
        <button class="btn">Register</button>
        <div class="pt-4">
          <span class="text-sm">Already have an account? <a href="/login" class="text-blue-500">Login</a></span>
        </div>
      </form>
    </section>
  </main>
</template>

<style scoped>
label {
  @apply block text-sm text-slate-400 dark:text-slate-300
}

input {
  @apply hidden w-full lg:flex items-center text-sm leading-6 text-slate-400 rounded-md ring-1 ring-slate-900/10 py-1.5 pl-2 pr-3 hover:ring-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700
}

.btn {
  @apply bg-blue-500 text-white rounded-md py-2 px-4 mt-12 text-sm
}
</style>