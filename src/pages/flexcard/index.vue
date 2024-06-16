<template>
  <main class="container mx-auto !max-w-[1200px]">
    <div class="flex gap-3 justify-between rounded-3xl p-3 bg-gradient-to-tl from-blue-300 to-sky-100">
      <div class="flex flex-col gap-3 w-full rounded-2xl">
        <!--Input-->
        <textarea type="text" v-model="textContent" class="flexInput w-full h-[100px] rounded-2xl p-2" />
        <!--Design-->
        <div>
          <button class="changeCardThemeBtn" @click="changeCardTheme('default')">Default</button>
        </div>
      </div>
      <div class="flex flex-col gap-3 w-[40%]">
        <!--Renender Preivew-->
        <div id="card" class="w-full h-full rounded-2xl shadow-xl " :class=cardStyle>
          <div class="p-3">{{ textContent }}</div>
        </div>
        <!--Action-->
        <div class="w-full flex px-16 justify-between rounded-2xl shadow-xl bg-white">
          <el-button text :icon="Share" />
          <el-button text :icon="Download" @click="onExport" />
        </div>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Delete, Download, Share } from '@element-plus/icons-vue'
import html2canvas from "html2canvas";

const textContent = ref('')
const cardTheme = ref('default')
const cardStyle = ref('aspect-[3/4] bg-white')
const cardBgStype = ref('default')

const changeCardTheme = (theme: string) => {
  cardTheme.value = theme
  if (theme = 'default') {
    cardStyle.value = 'aspect-[3/4] bg-white'
  }
}

const onExport = () => {
  const cardElement: HTMLElement = document.querySelector("#card")!;
  console.log(cardElement)
  if (cardElement) {
    html2canvas(cardElement).then((canvas) => {
      const link = document.createElement("a");
      document.body.appendChild(link);
      link.download = "flexcard.png";
      link.href = canvas.toDataURL();
      link.target = "_blank";
      link.click();
    });
  }
}

</script>

<style scoped>
.flexInput {}

.flexInput:focus {
  outline: none;
}

.changeCardThemeBtn {
  @apply shadow rounded-2xl;
  aspect-ratio: 1;
  width: 96px;
}
</style>