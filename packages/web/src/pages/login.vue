<script setup async lang="ts">
import { da } from 'element-plus/es/locales.mjs';
import { ref, onMounted } from 'vue';
const supabase = useSupabaseClient()

const pageMode = ref("login");

const login = async (form: { email: string; password: string }) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: form.email,
    password: form.password,
  });
  if (error) {
    console.error(error.message);
    throw error;
  }
  console.log(data);
  window.location.href = "/";
}

const register = async (form: { email: string; password: string, name: string }) => {
  const { data, error } = await supabase.auth.signUp({
    email: form.email,
    password: form.password,
    options: {
      data: { name: form.name },
      emailRedirectTo: window.location.origin + "/confirm",
    },
  });
  if (error) {
    console.error(error.message);
    throw error;
  }

  await $fetch('/createNewUser', {
    method: 'post',
    body: data,
  }).then((res) => {
    console.log(res);
  })

  window.location.href = "/confirm";
}

// Form reactive ref to keep up with the form data
const form = ref({
  email: "",
  password: "",
  name: "",
});

const handleLogin = async () => {
  try {
    await login(form.value);
  } catch (error: any) {
    console.log(error.message);
  }
};

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
    <h1 class="text-2xl font-bold pb-6" v-if="pageMode === 'login'">Login</h1>
    <h1 class="text-2xl font-bold pb-6" v-else>Register</h1>
    <section class="container mx-auto">
      <form @submit.prevent="handleLogin" v-if="pageMode === 'login'">
        <div class="flex flex-col gap-4">
          <div>
            <label>Email <input v-model="form.email" type="email" /></label>
          </div>
          <div>
            <label>Password <input v-model="form.password" type="password" /></label>
          </div>
        </div>
        <button class="btn">Login</button>
      </form>
      <form @submit.prevent="handleRegister" v-else-if="pageMode === 'register'">
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
      </form>
      <div class="pt-4">
        <span class="text-sm" v-if="pageMode === 'register'">Already have an account?
          <button @click="pageMode = 'login'" class="text-blue-500">Login</button>
        </span>

        <span class="text-sm" v-else>Don't have an account?
          <button @click="pageMode = 'register'" class="text-blue-500">Register</button>
        </span>
      </div>
    </section>
  </main>
</template>

<style scoped>
label {
  @apply block text-sm text-slate-400 dark:text-slate-300
}

input {
  @apply w-full flex items-center text-sm leading-6 text-slate-400 rounded-md ring-1 ring-slate-900/10 py-1.5 pl-2 pr-3 hover:ring-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700
}

.btn {
  @apply bg-blue-500 text-white rounded-md py-2 px-4 mt-12 text-sm
}
</style>