<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { menuItems } from './menuItems.js';
import {
  Open as Open,
  Odometer as OdometerIcon,
  Compass as CompassIcon,
  Setting as SettingIcon,
} from '@element-plus/icons-vue'

console.log(isCollapse)

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

// 创建映射表
const iconMap: { [key: string]: any } = {
  Odometer: OdometerIcon,
  Compass: CompassIcon,
  Setting: SettingIcon,
};

</script>

<script lang="ts">
export const isCollapse = ref(true)
</script>

<template>
  <el-menu default-active="2" class="el-menu-vertical-demo color-red-500 h-full"
    :collapse="isCollapse">
    <NuxtLink v-for="(item) in menuItems" :key="item.index" :to="item.path">
      <el-menu-item :index="item.index">
        <el-icon>
          <component :is="iconMap[item.icon]" />
        </el-icon>
        <template #title>{{ item.title }}</template>
      </el-menu-item>
    </NuxtLink>
    <NuxtLink v-if="userRole && userRole.role === 'ADMIN'" to="/admin" class="mb-auto">
      <el-menu-item index="1-z">
        <el-icon>
          <Open />
        </el-icon>
        <template #title>Admin</template>
      </el-menu-item>
    </NuxtLink>
  </el-menu>
</template>

<style scoped></style>
