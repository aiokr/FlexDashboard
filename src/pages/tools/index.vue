<script setup async lang="ts">
import { onMounted, ref } from 'vue';
import { Files } from '@element-plus/icons-vue'

const tools = [
  {
    title: 'PDF 单面扫描合并',
    path: '/tools/pdf',
    icon: Files,
    color: 'red'
  }
]
</script>

<template>
  <header class="pb-6">
    <h1 class="text-3xl font-bold">Flex Toolbox</h1>
  </header>
  <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
    <NuxtLink v-for="(tool) in tools" :key="tool.title" :to="tool.path"
      class="flex flex-col justify-between items-start h-36 border rounded-2xl p-4 bg-gradient-to-br to-white"
      :class="tool.color + '-bg'">
      <div class="h-10 text-white rounded-full aspect-square flex items-center justify-center"
        :class="tool.color + '-icon'">
        <el-icon size="22">
          <component :is="tool.icon" />
        </el-icon>
      </div>
      {{ tool.title }}
    </NuxtLink>
  </div>
</template>

<style scoped>
.blue-icon {
  @apply bg-blue-400;
}

.blue-bg {
  @apply from-blue-100;
}

.red-icon {
  @apply bg-red-400;
}

.red-bg {
  @apply from-red-100;
}

</style>
