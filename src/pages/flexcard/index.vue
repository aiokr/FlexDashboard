<template>
  <main class="container mx-auto !max-w-[1200px]">
    <div class="flex gap-3 justify-between rounded-3xl p-3 border">
      <div class="flex flex-col gap-3 w-full rounded-2xl">
        <!--Input-->
        <textarea type="text" v-model="textContent" class="flexInput w-full h-[100px] rounded-2xl p-2 border" />
        <!--Design-->
        <div class="flex items-center gap-4">
          <button class="changeCardSizeBtn" @click="changeCardSize('null')">NULL</button>
          <button class="changeCardSizeBtn" @click="changeCardSize('3/4')">3/4</button>
          <button class="changeCardSizeBtn" @click="changeCardSize('1')">Square</button>
          <button class="changeCardSizeBtn" @click="changeCardSize('4/3')">4/3</button>
          <button class="changeCardSizeBtn" @click="changeCardSize('2350/1000')">Wechat Public</button>
        </div>
        <div class="flex items-center gap-3">
          <button class="changeCardThemeBtn bgDefault border" @click="changeCardBackStyle('bgDefault')"></button>
          <button class="changeCardThemeBtn bgSunset" @click="changeCardBackStyle('bgSunset')"></button>
          <button class="changeCardThemeBtn bgSky" @click="changeCardBackStyle('bgSky')"></button>
        </div>
      </div>
      <div class="flex flex-col gap-3 w-[40%]">
        <!--Renender Preivew-->
        <div class="border">
          <div id="card"
            class="w-full max-w-full overflow-y-hidden h-full min-h-32 flex flex-col items-cemter justify-center"
            :class="cardBackStyle" :style="cardAspect">
            <div
              class="m-5 rounded-xl bg-white/80 backdrop-blur-xl overflow-y-hidden flex flex-col items-cemter justify-center">
              <p class="m-4">{{ textContent }}</p>
            </div>
            <div class="flex flex-col items-center justify-center mb-5">
              <span class="inline-block text-xs font-black text-zinc-800">CARDIFY</span>
            </div>
          </div>
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
const cardAspect = ref('aspect-ratio: null')
const cardBackStyle = ref('')
const textAspect = ref('')

const changeCardTheme = (theme: string) => {
  cardTheme.value = theme
  console.log(cardTheme.value)
}

const changeCardBackStyle = (style: string) => {
  if (style) {
    cardBackStyle.value = style
  } else {
    cardBackStyle.value = 'bgDefault'
  }
}

const changeCardSize = (aspect: string) => {
  cardAspect.value = `aspect-ratio: ${aspect}`;
  textAspect.value = `aspect-ratio: ${aspect}`
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
  @apply rounded-full;
  aspect-ratio: 1;
  width: 36px;
}

.bgDefault {
  background: #ffffff;
}

.bgSky {
  @apply bg-gradient-to-tl from-blue-300 to-sky-100
}

.bgSunset {
  @apply bg-gradient-to-br from-indigo-300 via-purple-300 to-pink-400
}
</style>