<script setup async lang="ts">
import { onMounted, ref } from 'vue';
import { FullScreen } from '@element-plus/icons-vue'

const nowTime = new Date()
const year = nowTime.getFullYear()
const month = (nowTime.getMonth() + 1).toString().padStart(2, '0')
const day = nowTime.getDate()

const date = year + '/' + month + '/' + day + '/'
console.log(date)
const hour = '00'
const minute = '00'
const second = '00'

// 四分片高清图地址
const hdPic1_url = 'https://himawari8.nict.go.jp/img/D531106/2d/550/' + date + hour + minute + second + '_0_0.png'
const hdPic2_url = 'https://himawari8.nict.go.jp/img/D531106/2d/550/' + date + hour + minute + second + '_1_0.png'
const hdPic3_url = 'https://himawari8.nict.go.jp/img/D531106/2d/550/' + date + hour + minute + second + '_0_1.png'
const hdPic4_url = 'https://himawari8.nict.go.jp/img/D531106/2d/550/' + date + hour + minute + second + '_1_1.png'

// 单片图地址
const hdPic_url = 'https://himawari8.nict.go.jp/img/D531106/1d/550/' + date + hour + minute + second + '_0_0.png'

// https://himawari8.nict.go.jp/img/D531106/1d/550/2024/06/10/110000_0_0.png


const isFullScreen = ref(false)

const handleFullScreen = () => {
  console.log(isFullScreen.value)
  if (!isFullScreen.value) {
    const starContain = document.getElementById('starContain')
    starContain.requestFullscreen()
    isFullScreen.value = true
  } else {
    document.exitFullscreen()
    isFullScreen.value = false
  }
}

</script>

<template>
  <section id="starContain" class="bg-black text-white w-full h-full rounded-xl p-4">
    <!--Header-->
    <div class="flex gap-4 items-center justify-between">
      <div class="text-xl font-bold opacity-40">多卫星地球图像获取</div>
      <el-button link @click="handleFullScreen()">
        <el-icon color="#ffffff" class="m-2 opacity-40">
          <FullScreen />
        </el-icon>
      </el-button>
    </div>
    <div class="pt-4 flex justify-center">
      <img :src="hdPic_url" alt="高清图" />
    </div>
  </section>
</template>