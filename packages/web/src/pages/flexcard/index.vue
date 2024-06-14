<template>
  <main class="container !max-w-[1200px]">
    <div class="flex gap-3 justify-between rounded-3xl p-3 bg-gradient-to-tl from-blue-300 to-sky-100">
      <div class="flex flex-col gap-3 w-full rounded-2xl">
        <!--Input-->
        <textarea type="text" v-model="textContent" class="flexInput w-full h-[100px] rounded-2xl p-2" />
        <!--Design-->
        <div>
        </div>
      </div>
      <div class="flex flex-col gap-3 w-[40%]">
        <!--Renender Preivew-->
        <div class="w-full h-full aspect-[3/4] rounded-2xl shadow-xl bg-white">
          <div id="card">{{ textContent }}</div>
        </div>
        <!--Action-->
        <div class="w-full flex px-16 justify-between rounded-2xl shadow-xl bg-white">
          <el-button text :icon="Share" />
          <el-button text :icon="Download" :on-click="onExport" />
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
const cardTheme = ref('')

const onExport = () => {
  const cardElement:HTMLElement = document.querySelector("#card")!;
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
</style>