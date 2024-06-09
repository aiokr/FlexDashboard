<script setup lang="ts">
import { ref, onMounted } from 'vue';

const supabase = useSupabaseClient()
const userName = ref<any | null>(null)
const userEmail = ref<any | null>(null)
const userRole = ref<any>()

onMounted(async () => {
  const { data, error } = await supabase.auth.getUser()
  userName.value = data.user?.user_metadata.name
  userEmail.value = data.user?.email

  // Get the user's role from Database
   await $fetch('/getUserRole', {
    method: 'post',
    body: data
  }).then((res) => {
    userRole.value = res
  })

  if (error) {
    console.error(error)
  }
})

const logout = async () => {
  await supabase.auth.signOut()
  window.location.href = "/login"
}
</script>

<template>
  <el-header class="flex items-center justify-between">
    <el-dropdown>
      <h1 class="text-lg font-bold mr-auto">FlexBoard</h1>
      <template #dropdown>
        <NuxtLink to="/"><el-dropdown-item>Dashboard</el-dropdown-item></NuxtLink>
        <NuxtLink to="/tools"><el-dropdown-item>Tools</el-dropdown-item></NuxtLink>
        <NuxtLink to="/settings"><el-dropdown-item>Settings</el-dropdown-item></NuxtLink>
        <NuxtLink v-if="userRole && userRole.role === 'ADMIN'" to="/admin">
          <el-dropdown-item>Admin</el-dropdown-item>
        </NuxtLink>
      </template>
    </el-dropdown>
    <div>
      <el-popover
        placement="bottom-end"
        :title="userName || 'No Login'"
        :width="200"
        trigger="click"
        content="this is content, this is content, this is content"
      >
        <template #reference>
          <el-avatar v-if="!userName">No Login</el-avatar>
          <el-avatar v-else>{{ userName }}</el-avatar>
        </template>
        <template #default>
          {{ userEmail }}
          <div class="flex justify-between pt-3">
            <NuxtLink to="/login" v-if="!userName">
              <el-button>Login</el-button>
            </NuxtLink>
            <el-button v-else @click="logout">Logout</el-button>
            <NuxtLink to="/settings">
              <el-button type="primary">Settings</el-button>
            </NuxtLink>
          </div>
        </template>
      </el-popover>
    </div>
  </el-header>
</template>

<style scoped></style>
