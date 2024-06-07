<script setup lang="ts">
import { onMounted } from 'vue';

</script>

<template>
  <el-menu default-active="2" class="el-menu-vertical-demo color-red-500">
    <NuxtLink to="/"><el-menu-item index="1-1">Dashboard</el-menu-item></NuxtLink>
    <NuxtLink to="/settings"><el-menu-item index="1-2">Settings</el-menu-item></NuxtLink>
    <NuxtLink :to="{ name: 'user', query: { pagePurpose: 'register' } }">
      <el-menu-item index="1-3">User Register</el-menu-item>
    </NuxtLink>
  </el-menu>
</template>

<style scoped></style>