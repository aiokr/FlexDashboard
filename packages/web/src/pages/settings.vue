<script setup async lang="ts">
import { onMounted, ref } from 'vue';

const supabase = useSupabaseClient()
const userProfileTable = ref<any | null>(null)
const userProfile = ref<any | null>(null)

onMounted(async () => {
  const { data, error } = await supabase.auth.getUser()

  userProfile.value = data

  const userRole = ref('')

  await $fetch('/getUserRole', {
    method: 'post',
    body: data
  }).then((res) => {
    userRole.value = res
  })

  userProfileTable.value = [
    {
      id: 1,
      item: 'Name',
      value: data.user?.user_metadata.name
    },
    {
      id: 2,
      item: 'Email',
      value: data.user?.email
    },
    {
      id: 3,
      item: 'Role',
      value: userRole.value.role
    }
  ]

  if (error) {
    console.error(error)
    return
  }
})

// Click the row to edit the metadata
const handleEditMetadata = (itemName: any) => {
  if (itemName.item === 'Name') {
    console.log('Edit Name')
    editNamedialogVisible.value = true
  } else if (itemName.item === 'Email') {
    console.log('Edit Email')
  }
}

const editNamedialogVisible = ref(false)
const newName = ref('')

// Change the user's name
const changeName = async (newName: string) => {
  // Check if the name is empty
  if (newName === '') {
    return
  }

  // Update the user's name
  const { data, error } = await supabase.auth.updateUser({
    data: {
      name: newName
    }
  })
  if (error) {
    console.error(error)
    return
  }

  // Close the dialog
  editNamedialogVisible.value = false

  // Update the display name(only this time)
  userProfileTable.value = userProfileTable.value?.map((item: any) => {
    if (item.item === 'Name') {
      item.value = newName
    }
    userProfile.value.user.user_metadata.name = newName
    return item
  })
}
</script>

<template>
  <header class="pb-6">
    <h1 class="text-3xl font-bold">Hello, {{ userProfile?.user.user_metadata.name }}</h1>
  </header>
  <main class="container">
    <section>
      <h2 class="text-xl font-bold pb-2">Account Profile</h2>
      <el-table :data="userProfileTable" style="width: 800px" :show-header="false" @row-click="handleEditMetadata">
        <el-table-column prop="item" label="Item" width="180" />
        <el-table-column prop="value" label="Value" />
        <el-table-column prop="role" label="Role" width="180" />
      </el-table>
    </section>
  </main>

  <el-dialog v-model="editNamedialogVisible" title="Edit Name" width="500">
    <el-input v-model="newName" style="width: 240px" :placeholder="userProfile?.user.user_metadata.name" />
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="editNamedialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="changeName(newName)"> Confirm </el-button>
      </div>
    </template>
  </el-dialog>
</template>
