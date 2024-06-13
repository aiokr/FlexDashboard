<script setup lang="ts">
import Header from '@/components/Header.vue';
import Menu from '@/components/Menu.vue';
import { isCollapse } from '@/components/Menu.vue';
</script>

<template>
  <main class="w-screen h-screen overflow-auto">
    <div class="common-layout">
      <Header />
      <el-container>
        <el-aside class="hidden md:block" :width="isCollapse ? '72px' : '200px'">
          <Menu />
        </el-aside>
        <el-container>
          <el-main>
            <slot />
          </el-main>
          <el-footer>
            <div class="bg-zinc-500 text-white text-sm py-4 px-4">
              Current route path: {{ $route.fullPath }}
            </div>
          </el-footer>
        </el-container>
      </el-container>
    </div>
  </main>
</template>

<style>
.el-aside {
  height: calc(100vh - 64px);
  transition: width 0.3s ease;
  scrollbar-width: none;
  overflow: hidden;

}

.el-container {
  transition: width 0.3s ease;
}
</style>