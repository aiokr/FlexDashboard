<script setup lang="ts">
import { onMounted, ref } from 'vue';

const supabase = useSupabaseClient()
const userRole = ref<any>()

onMounted(async () => {
  // Get the user's data from Supabase Auth
  const { data, error } = await supabase.auth.getUser()

  // Get the user's role from Database
   await $fetch('/getUserRole', {
    method: 'post',
    body: data
  }).then((res) => {
    userRole.value = res
  })
})
</script>

<template>
  <el-menu default-active="2" class="el-menu-vertical-demo color-red-500">
    <NuxtLink to="/"><el-menu-item index="1-1">Dashboard</el-menu-item></NuxtLink>
    <NuxtLink to="/tools"><el-menu-item index="1-2">Tools</el-menu-item></NuxtLink>
    <NuxtLink to="/settings"><el-menu-item index="1-y">Settings</el-menu-item></NuxtLink>
    <NuxtLink v-if="userRole && userRole.role === 'ADMIN'" to="/admin">
      <el-menu-item index="1-">Admin</el-menu-item>
    </NuxtLink>
  </el-menu>
</template>

<style scoped></style>
