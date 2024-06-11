<script setup async lang="ts">
import { onMounted, ref } from 'vue';
import { FullScreen, DArrowLeft, DArrowRight } from '@element-plus/icons-vue'

// 卫星选择
const satellite = ref('himawari8') // fy4a

// 获取当前时间
const now = new Date()
const utcNow = new Date(now.getTime() + now.getTimezoneOffset() * 60000)
const pickTime = ref(new Date(now.getTime() + now.getTimezoneOffset() * 60000))

// 选择时间
const handleChangeTime = (event: any) => {

  // 选择时间大于当前时间时，选择当前时间
  if (event.getTime() > utcNow.getTime()) {
    pickTime.value = utcNow
    return
  }

  pickTime.value = event // 更新选择时间
  sliderValue.value = Math.floor((pickTime.value.getTime() - oneMonthAgo.getTime()) / (24 * 60 * 60 * 1000)) // pickTime 改变时，滑条也要改变
  himawariPic_url.value = getPicUrl(pickTime.value) // 更新图片地址
}

// 向前向后选择
const handleFrontOrBack = (isFront: boolean) => {
  const time = pickTime.value
  const newTime = new Date(isFront ? time.getTime() - 60 * 60 * 1000 : time.getTime() + 10 * 60 * 1000)
  if (newTime.getTime() > utcNow.getTime()) {
    pickTime.value = utcNow
    return
  }
  pickTime.value = newTime
  himawariPic_url.value = getPicUrl(pickTime.value)
}

// 判断当前时间是否可被选择
const disabledDate = (time: any) => {
  return time.getTime() > utcNow.getTime()
}

// 滑条功能
const sliderValue = ref(100)

// 滑条起始时间
const oneMonthAgo = new Date(utcNow.getTime() - 100 * 24 * 60 * 60 * 1000)

// 映射滑条值到时间
const mapSliderValueToTime = (value: number) => {
  const time = new Date(oneMonthAgo.getTime() + value * 24 * 60 * 60 * 1000)
  return time
}

// 滑条操作
const handleChangeSlide = (value: number) => {
  pickTime.value = mapSliderValueToTime(value)
  himawariPic_url.value = getPicUrl(pickTime.value)
}

// --- 向日葵8号 --- //

// 向日葵8号图片地址 // 示例：https://himawari8.nict.go.jp/img/D531106/1d/550/2024/06/01/081000_0_0.png // 分钟必须为整 10
const himawariBase_url = 'https://himawari8.nict.go.jp/img/D531106/1d/550/' // '2024/05/01/082000_0_0.png'
const himawariPic_url = ref('')

// 拼接图片地址
const getPicUrl = (time: any) => {
  const bef20 = new Date(time.getTime() - 20 * 60 * 1000) // 20分钟前
  const year = bef20.getFullYear() + '/'
  const month = (bef20.getMonth() + 1).toString().padStart(2, '0').toString() + '/'
  const day = bef20.getDate().toString().padStart(2, '0').toString() + '/'
  const hour = bef20.getHours().toString().padStart(2, '0').toString()
  let nowMinute = bef20.getMinutes();
  const minute = (Math.floor(nowMinute / 10) * 10).toString().padStart(2, '0').toString(); // 将分钟数设置为最接近的整10分钟
  const second = '00'
  const url = himawariBase_url + year + month + day + hour + minute + second + '_0_0.png'
  console.log(url)
  return url
}

// 获取图片
onMounted(() => {
  himawariPic_url.value = getPicUrl(pickTime.value)
  console.log(himawariPic_url.value)
})

// --- 风云4号 --- //

// 全屏
const isFullScreen = ref(false)
const handleFullScreen = () => {
  console.log(isFullScreen.value)
  if (!isFullScreen.value) {
    const starContain = document.getElementById('starContain')
    starContain?.requestFullscreen()
    isFullScreen.value = true
  } else {
    document.exitFullscreen()
    isFullScreen.value = false
  }
}

</script>

<template>
  <section id="starContain"
    class="flex flex-col items-center justify-between bg-black text-white w-full h-full rounded-xl p-4">
    <!--Header-->
    <div class="flex gap-4 items-center justify-between w-full">
      <div class="text-xl font-bold opacity-40">多卫星地球图像获取</div>
      <el-button link @click="handleFullScreen()">
        <el-icon color="#ffffff" class="m-2 opacity-40">
          <FullScreen />
        </el-icon>
      </el-button>
    </div>
    <div class="pt-4 flex justify-center min-h-72">
      <img v-if="satellite === 'himawari8'" :src="himawariPic_url" :alt="himawariPic_url" class="w-full" />
    </div>
    <div class="pt-4 flex flex-col items-center justify-center container mx-aut0 max-w-[800px]">
      <div class="flex items-center gap-8 w-full">
        <el-button link @click="handleFrontOrBack(true)">
          <el-icon>
            <DArrowLeft />
          </el-icon>
        </el-button>
        <el-slider v-model="sliderValue" @change="handleChangeSlide" max="100" step="0.01" />
        <el-button link @click="handleFrontOrBack(false)">
          <el-icon>
            <DArrowRight />
          </el-icon>
        </el-button>
      </div>
      <div class="container flex items-center justify-center gap-4">
        <el-select v-model="satellite" placeholder="Select" style="width: 240px">
          <el-option label="向日葵8号" value="himawari8" />
          <el-option label="风云4号" value="fy4a" />
        </el-select>
        <el-date-picker isdark v-model="pickTime" type="datetime" placeholder="Pick a Date" editable="false"
          @disabled-date="disabledDate($event)" @change="handleChangeTime" />
      </div>
    </div>
  </section>
</template>

<style>
#starContain .el-date-editor--datetime {
  --el-fill-color-blank: #212121;
  --el-border-color-hover: #00000000;
  --el-border-color-active: #00000000;
  --el-border-color: #00000000;
  --el-input-focus-border: #00000000;
  --el-input-focus-border-color: #00000000;
}

#starContain .el-select {
  --el-fill-color-blank: #212121;
  --el-border-color-hover: #00000000;
  --el-border-color-active: #00000000;
  --el-border-color: #00000000;
  --el-input-focus-border: #00000000;
  --el-color-primary: #00000000;
}
</style>