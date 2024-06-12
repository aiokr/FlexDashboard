<script setup async lang="ts">
import { onMounted, ref } from 'vue';
import { FullScreen, DArrowLeft, DArrowRight } from '@element-plus/icons-vue'
import { fa } from 'element-plus/es/locales.mjs';

// 卫星选择
const satellite = ref('himawari8') // fy4b fy4bWeather noaaChina noaaPacific noaaAtlantic himawari9

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

  // 向日葵8号卫星时，时间为整10分钟
  if (satellite.value === 'himawari8') {
    const minute = event.getMinutes()
    const newMinute = Math.floor(minute / 10) * 10
    pickTime.value.setMinutes(newMinute)
    pickTime.value.setSeconds(0)
  }

  // 风云4号卫星时，时间为整15分钟
  if (satellite.value === 'fy4b' || satellite.value === 'fy4bWeather') {
    const minute = event.getMinutes()
    const newMinute = Math.floor(minute / 15) * 15
    pickTime.value.setMinutes(newMinute)
    pickTime.value.setSeconds(0)
  }

  pickTime.value = pickTime.value // 更新输入框显示的时间
  sliderValue.value = Math.floor((pickTime.value.getTime() - oneMonthAgo.getTime()) / (24 * 60 * 60 * 1000)) // pickTime 改变时，滑条也要改变
  getPics() // 刷新图片
}

// 点击向前向后按钮选择时间
const handleFrontOrBack = (isFront: boolean) => {
  const time = pickTime.value // 获取当前选择的时间
  let newTime = ref<Date>(time)

  // 向日葵系列卫星时，点击向前向后按钮，时间跳动1小时
  if (satellite.value === 'himawari8' || satellite.value === 'himawari9') {
    const minute = time.getMinutes()
    const newMinute = Math.floor(minute / 10) * 10
    time.setMinutes(newMinute)
    time.setSeconds(0)
    newTime.value = new Date(isFront ? time.getTime() - 60 * 60 * 1000 : time.getTime() + 60 * 60 * 1000)
  }

  // 风云4号卫星时，点击向前向后按钮，时间跳动15分钟
  if (satellite.value === 'fy4b' || satellite.value === 'fy4bWeather') {
    const minute = time.getMinutes()
    const newMinute = Math.floor(minute / 15) * 15
    time.setMinutes(newMinute)
    time.setSeconds(0)
    newTime.value = new Date(isFront ? time.getTime() - 60 * 15 * 1000 : time.getTime() + 60 * 15 * 1000)
  }

  if (newTime.value.getTime() > utcNow.getTime()) {
    pickTime.value = utcNow
    return
  }

  pickTime.value = newTime.value
  getPics()
}

// 滑条功能
const sliderValue = ref(100)

// 滑条起始时间(100天前)
const oneMonthAgo = new Date(utcNow.getTime() - 100 * 24 * 60 * 60 * 1000)

// 映射滑条值到时间
const mapSliderValueToTime = (value: number) => {
  const time = new Date(oneMonthAgo.getTime() + value * 24 * 60 * 60 * 1000)
  return time
}

// 滑条操作
const handleChangeSlide = (value: any) => {
  pickTime.value = mapSliderValueToTime(value)
  getPics()
}

// ------------------//
// --- 向日葵8号 --- //
// -----------------//
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
  // console.log(url)
  return url
}

// 向日葵8号四分片高清图
// const himawariHighPicBase_url = 'https://himawari8.nict.go.jp/img/D531106/2d/550/' // 2024/05/01/082000 // _0_0.png // _0_1.png // _1_0.png // _1_1.png
/*
const himawariHighPic_url1 = ref('')
const himawariHighPic_url2 = ref('')
const himawariHighPic_url3 = ref('')
const himawariHighPic_url4 = ref('')
*/


// ------------------//
// --- 向日葵9号 --- //
// ------------------//
// 圆盘文件列表 https://www.data.jma.go.jp/mscweb/data/himawari/list_fd_.html
// 圆盘图像示例 https://www.data.jma.go.jp/mscweb/data/himawari/img/fd_/fd__trm_0000.jpg
// 中亚地区文件列表 https://www.data.jma.go.jp/mscweb/data/himawari/list_ca1.html
// 中亚地区图像示例 https://www.data.jma.go.jp/mscweb/data/himawari/img/ca1/ca1_trm_0000.jpg


// ------------------//
// --- 风云4号B星 --- //
// ------------------//
// 中国区域 // https://img.nsmc.org.cn/CLOUDIMAGE/FY4B/AGRI/GCLR/SEC/china/2024/20240611/FY4B_china_20240611090000.JPG
// 中国区域(气象局) // https://weather.cma.cn/file/2024/06/12/SEVP_NSMC_WXBL_FY4B_ETCC_ACHN_LNO_PY_20240612001500000.JPG // 只支持 24h 内图像，时间粒度为 15 分钟
// 全圆盘 // https://img.nsmc.org.cn/CLOUDIMAGE/FY4B/AGRI/GCLR/DISK/FY4B-_AGRI--_N_DISK_1050E_L2-_GCLR_MULT_NOM_20240611094500_20240611095959_1000M_V0001.JPG
// 图片尺寸过大，暂不放出功能

const fy4bChinaBase_url = 'https://img.nsmc.org.cn/CLOUDIMAGE/FY4B/AGRI/GCLR/SEC/china/' // '2024/20240611/FY4B_china_20240611090000.JPG'
const fy4bChinaPic_url = ref('')

const fy4bWeatherBase_url = 'https://weather.cma.cn/file/' // '2024/06/12/' //SEVP_NSMC_WXBL_FY4B_ETCC_ACHN_LNO_PY_20240612000000000.JPG'
const fy4bWeatherBase_url2 = 'SEVP_NSMC_WXBL_FY4B_ETCC_ACHN_LNO_PY_'
const fy4bWeatherPic_url = ref('')

const getFy4bChinaPicUrl = (time: any) => {
  const year = time.getFullYear()
  const month = (time.getMonth() + 1).toString().padStart(2, '0').toString()
  const day = time.getDate().toString().padStart(2, '0').toString()
  const hour = time.getHours().toString().padStart(2, '0').toString()
  const url = fy4bChinaBase_url + year + '/' + year + month + day + '/' + 'FY4B_china_' + year + month + day + hour + '00' + '00' + '.JPG'
  // console.log(url)
  return url
}

const getFy4bWeatherPicUrl = (time: any) => {
  // 检查时间是否符合要求（24小时内，15分钟粒度）
  const now = new Date()
  const diff = now.getTime() - time.getTime()

  if (diff > 24 * 60 * 60 * 1000 && satellite.value === 'fy4bWeather') {
    console.log('时间超过24小时')
    pickTime.value = new Date(now.getTime() - 24 * 60 * 60 * 1000) // 选择24小时前的时间
  }

  // 检查分钟数是否为15的倍数
  let minute = time.getMinutes().toString().padStart(2, '0').toString()
  // 如果分钟数不是15的倍数，将分钟数设置为向前最接近的15的倍数
  if (minute % 15 !== 0) {
    minute = (Math.floor(minute / 15) * 15).toString().padStart(2, '0').toString()
  }

  const year = time.getFullYear()
  const month = (time.getMonth() + 1).toString().padStart(2, '0').toString()
  const day = time.getDate().toString().padStart(2, '0').toString()
  const hour = time.getHours().toString().padStart(2, '0').toString()
  const url = fy4bWeatherBase_url + year + '/' + month + '/' + day + '/' + fy4bWeatherBase_url2 + year + month + day + hour + minute + '00' + '000.JPG'
  // console.log(url)
  return url
}


// ----------------------------------------//
// --- NOAA 美国国家海洋和大气管理局卫星 --- //
// ---------------------------------------//
// https://gis.nnvl.noaa.gov/arcgis/rest/services/TRUE/TRUE_daily_750m/ImageServer/exportImage?f=image&bbox=-16458582.365364926%2C1591439.807728032%2C-2907825.9909724947%2C9800165.14932749&imageSR=102100&bboxSR=102100&size=1385%2C839
// https://gis.nnvl.noaa.gov/arcgis/rest/services/TRUE/TRUE_daily_750m/ImageServer/exportImage?f=image&bbox=-16458582.365364926,1591439.807728032,-2907825.9909724947,9800165.14932749&imageSR=102100&bboxSR=102100&size=1385,839
// https://gis.nnvl.noaa.gov/arcgis/rest/services/TRUE/TRUE_daily_750m/ImageServer/exportImage?f=image
// &bbox=-16458582.365364926,1591439.807728032,-2907825.9909724947,9800165.14932749 // 左下右上地图范围
// &imageSR=102100 // 图片空间参考
// &bboxSR=102100 // 地图范围空间参考
// &size=1385,839 // 图片尺寸

// 因为 NOAA 不支持时间选择，所以写死几个区域
// NOAA 中国区域
const noaaChinaAreaUrl = 'https://gis.nnvl.noaa.gov/arcgis/rest/services/TRUE/TRUE_daily_750m/ImageServer/exportImage?f=image&bbox=4617420.344470754%2C-816803.1203525807%2C18168176.718863174%2C7391922.221246878&imageSR=102100&bboxSR=102100&size=1385%2C839'
// NOAA 太平洋区域
const noaaPacificAreaUrl = 'https://gis.nnvl.noaa.gov/arcgis/rest/services/TRUE/TRUE_daily_750m/ImageServer/exportImage?f=image&bbox=-16458582.365364926%2C1591439.807728032%2C-2907825.9909724947%2C9800165.14932749&imageSR=102100&bboxSR=102100&size=1385%2C839'
// NOAA 大西洋区域
const noaaAtlanticAreaUrl = 'https://gis.nnvl.noaa.gov/arcgis/rest/services/TRUE/TRUE_daily_750m/ImageServer/exportImage?f=image&bbox=-16980627.56211163%2C-4944932.03388838%2C10120885.186673433%2C11472518.649310663&imageSR=102100&bboxSR=102100&size=1385%2C839'

// 获取图片
onMounted(() => {
  getPics()
})

const getPics = () => {
  himawariPic_url.value = getPicUrl(pickTime.value)
  fy4bChinaPic_url.value = getFy4bChinaPicUrl(pickTime.value)
  fy4bWeatherPic_url.value = getFy4bWeatherPicUrl(pickTime.value)
}

// 当前图例是否可调时间
const isPickTimeAble = ref(false)
onMounted(() => {
  isPickTimeAble.value = satellite.value === 'himawari8' || satellite.value === 'fy4b' || satellite.value === 'fy4bWeather'
})
watch(() => satellite.value, (value) => {
  isPickTimeAble.value = value === 'himawari8' || value === 'fy4b' || value === 'fy4bWeather'
})

// 实时获取当前时间 用于全屏模式下显示时间
const displayTime = ref(new Date()) // 实时时间
onMounted(() => {
  setInterval(() => {
    displayTime.value = new Date()
  }, 1000)
})

// 全屏
const isFullScreen = ref(false)
const handleFullScreen = (id: any) => {
  if (!isFullScreen.value) {
    const starContain = document.getElementById(id)
    starContain?.requestFullscreen()
    isFullScreen.value = true
  } else {
    document.exitFullscreen()
    isFullScreen.value = false
  }
  if (id === 'zenMode') {
    himawariPic_url.value = getPicUrl(new Date(now.getTime() + now.getTimezoneOffset() * 60000))
  }
}

// 全屏模式下自动更新图片
onMounted(() => {
  setInterval(() => {
    if (isFullScreen.value) {
      himawariPic_url.value = getPicUrl(new Date(now.getTime() + now.getTimezoneOffset() * 60000))
      checkPic()
    }
  }, 60000)
})

// 检测图片是否可用
const checkPic = async () => {
  await fetch(himawariPic_url.value)
    .then((response) => {
      if (!response.ok) {
        console.log('himawari8 图片不可用')
        // 获取一个小时前的图片
        himawariPic_url.value = getPicUrl(new Date(now.getTime() + now.getTimezoneOffset() * 60000 - 60 * 60 * 1000))
      }
    })
    .catch((error) => {
      console.error('Error:', error)
    })
}

</script>

<template>
  <div class="flex flex-col md:flex-row gap-4 h-full">
    <section id="starContain"
      class="flex flex-col items-center justify-between bg-black text-white w-full rounded-xl p-4 h-full md:w-[60%] lg:w-[70%]">
      <!--Header-->
      <div class="flex gap-4 items-center justify-between w-full">
        <div class="text-xl font-bold opacity-40">多卫星地球图像</div>
        <el-button link @click="handleFullScreen('starContain')">
          <el-icon color="#ffffff" class="m-2 opacity-40">
            <FullScreen />
          </el-icon>
        </el-button>
      </div>
      <!--Content-->
      <div class="pt-4 flex justify-center min-h-72">
        <img v-if="satellite === 'himawari8'" :src="himawariPic_url" alt="himawari8 Pic" class="w-full" />
        <img v-else-if="satellite === 'fy4b'" :src="fy4bChinaPic_url" alt="fy4bChina Pic" class="w-full" />
        <img v-else-if="satellite === 'fy4bWeather'" :src="fy4bWeatherPic_url" alt="fy4bWeather Pic" class="w-full" />
        <img v-else-if="satellite === 'noaaChina'" :src="noaaChinaAreaUrl" alt="noaaChina Pic" class="w-full" />
        <img v-else-if="satellite === 'noaaPacific'" :src="noaaPacificAreaUrl" alt="noaaPacific Pic" class="w-full" />
        <img v-else-if="satellite === 'noaaAtlantic'" :src="noaaAtlanticAreaUrl" alt="noaaAtlantic Pic"
          class="w-full" />
      </div>
      <!--Footer-->
      <div class="pt-4 flex flex-col items-center justify-center container mx-aut0 max-w-[800px]">
        <div v-if="isPickTimeAble" class="flex items-center gap-8 w-full">
          <el-button link @click="handleFrontOrBack(true)">
            <el-icon>
              <DArrowLeft />
            </el-icon>
          </el-button>
          <el-slider v-model="sliderValue" @change="handleChangeSlide" :max=100 :step=0.01 />
          <el-button link @click="handleFrontOrBack(false)">
            <el-icon>
              <DArrowRight />
            </el-icon>
          </el-button>
        </div>
        <div class="container flex items-center justify-center gap-4">
          <el-select v-model="satellite" placeholder="Select" style="width: 240px">
            <el-option label="向日葵8号" value="himawari8" />
            <!--<el-option label="风云4号" value="fy4b" />-->
            <el-option label="风云4号" value="fy4bWeather" />
            <el-option label="NOAA 中国地区" value="noaaChina" />
            <el-option label="NOAA 太平洋地区" value="noaaPacific" />
            <el-option label="NOAA 大西洋地区" value="noaaAtlantic" />
          </el-select>
          <el-date-picker v-if="isPickTimeAble" v-model="pickTime" type="datetime" placeholder="Pick a Date"
            :editable="false" @change="handleChangeTime" />
        </div>
      </div>
    </section>
    <section id="zenMode" :class="isFullScreen ? '' : 'p-4'"
      class="bg-black text-white rounded-xl  w-full md:w-[40%] lg:w-[30%]">
      <!--Header-->
      <div :class="isFullScreen ? 'fixed z-20' : ''" class="flex gap-4 items-center justify-between w-full">
        <div v-if="!isFullScreen" class="text-xl font-bold opacity-40">Zen</div>
        <div v-else></div>
        <el-button link @click="handleFullScreen('zenMode')">
          <el-icon color="#ffffff" class="m-2 opacity-40">
            <FullScreen />
          </el-icon>
        </el-button>
      </div>
      <!--Content-->
      <div :class="isFullScreen ? 'h-screen w-screen' : 'h-full'">
        <el-carousel v-if="isFullScreen" :height="isFullScreen ? '100vh' : '800px'" arrow="never" :interval="10000">
          <!--向日葵8轮播-->
          <el-carousel-item id="zenHimawari8" class="!flex items-center justify-center w-screen h-screen">
            <img :src="himawariPic_url" alt="himawari8 Pic" class="block" />
            <div class="fixed bottom-8 right-0 left-0 flex flex-col justify-center items-center gap-2">
              <div class="flex font-mono text-3xl font-bold text-zinc-600 gap-8">
                <div>{{ displayTime.toLocaleTimeString('zh-cn') }}</div>
                <div>{{ displayTime.toUTCString().split(' ')[4] }}</div>
              </div>
              <div class="text-zinc-800 text-xs">图像来自向日葵8号地球同步卫星</div>
            </div>
          </el-carousel-item>
          <!---->
          <el-carousel-item id="zenNoaaChinaArea">
            <div :class="isFullScreen === true ? 'h-screen w-screen' : 'h-full w-full '">
              <img :src="noaaChinaAreaUrl + '?t=' + new Date().toISOString().slice(0, 16).replace(/[-T:]/g, '')"
                alt="noaaChina Pic" class="w-full h-full mx-[-2px] object-cover" />
              <div class="fixed right-16 top-0 bottom-0 flex flex-col justify-center items-center gap-2">
                <div class="flex flex-col md:flex-row font-mono text-4xl font-bold text-zinc-50 gap-2 md:gap-8">
                  <div>{{ displayTime.toLocaleTimeString('zh-cn') }}</div>
                  <div>{{ displayTime.toUTCString().split(' ')[4] }}</div>
                </div>
              </div>
            </div>
          </el-carousel-item>
          <el-carousel-item id="zenNoaaPacificArea">
            <div :class="isFullScreen === true ? 'h-screen w-screen' : 'h-full w-full '">
              <img :src="noaaPacificAreaUrl + '?t=' + new Date().toISOString().slice(0, 16).replace(/[-T:]/g, '')"
                alt="noaaPacific Pic" class="w-full h-full mx-[-2px] object-cover" />
            </div>
          </el-carousel-item>
          <!--
          <el-carousel-item id="zenFy4b">
            <img :src="getFy4bChinaPicUrl(new Date(now.getTime() + now.getTimezoneOffset() * 60000))"
              alt="fy4bChina Pic" class="w-[500px]" />
          </el-carousel-item>
          -->
        </el-carousel>
      </div>
    </section>
  </div>
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