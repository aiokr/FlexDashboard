<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { RouterView } from 'vue-router';
import Header from './components/Header.vue';
import Menu from './components/Menu.vue';

</script>
<template>
  <main class="w-screen h-screen overflow-auto">
    <div class="common-layout">
      <Header />
      <el-container>
        <el-aside width="200px">
          <Menu />
        </el-aside>
        <el-container>
          <el-main>
            <RouterView />
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
