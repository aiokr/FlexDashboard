<script setup async lang="ts">
import { onMounted, ref } from 'vue';
import { Files, Loading, MagicStick } from '@element-plus/icons-vue'

const tools = [
  {
    category: '向着星辰与深渊',
    tools: [
      {
        title: '地球图像',
        path: '/tools/himawari',
        icon: Loading,
        color: 'zinc'
      }
    ]
  },
  {
    category: '文字工具',
    tools: [
      {
        title: 'FlexCard',
        path: '/flexcard',
        icon: MagicStick,
        color: 'orange'
      },
      {
        title: 'PDF 单面扫描合并',
        path: '/tools/pdf',
        icon: Files,
        color: 'red'
      }
    ]
  }
]
</script>

<template>
  <header class="pb-6">
    <h1 class="text-3xl font-bold">Flex Toolbox</h1>
  </header>
  <div v-for="item in tools" class="container">
    <h2 class="text-xl font-bold pt-6 pb-3">{{ item.category }}</h2>
    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
      <NuxtLink v-for="(tool) in item.tools" :key="tool.title" :to="tool.path"
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
  </div>
</template>

<style scoped>
.blue-icon {
  @apply bg-blue-400;
}

.blue-bg {
  @apply from-blue-100;
}

.orange-icon {
  @apply bg-orange-400;
}

.orange-bg {
  @apply from-orange-100;
}

.red-icon {
  @apply bg-red-400;
}

.red-bg {
  @apply from-red-50;
}

.zinc-icon {
  @apply bg-zinc-400;
}

.zinc-bg {
  @apply from-zinc-100;
}
</style>
