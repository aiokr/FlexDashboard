<script setup async lang="ts">
import { onMounted, ref } from 'vue';
</script>
<template>
  <header class="pb-6">
    <h1 class="text-3xl font-bold">PDF 单面扫描合并</h1>
  </header>
  <div class="flex gap-4">
    <div class="fileBox w-1/2"></div>
    <div class="fileBox w-1/2"></div>
  </div>
</template>

<style scoped>
.fileBox {
  @apply p-4 h-24 bg-white rounded-2xl border
}
</style>
