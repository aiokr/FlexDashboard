<script setup async lang="ts">
import { onMounted, ref } from 'vue';
import { PDFDocument } from 'pdf-lib';
import { UploadFilled } from '@element-plus/icons-vue'

const frontPdf = ref<any>();
const backPdf = ref<any>();

// 处理文件上传的函数
async function handleFileChange(event: any, isFront: boolean) {
  const file = event.raw; // 获取上传的文件
  const arrayBuffer = await file.arrayBuffer(); // 将文件转换为 ArrayBuffer
  if (isFront) {
    frontPdf.value = arrayBuffer;
    console.log('frontPdf')
    console.log(frontPdf.value)
  } else {
    backPdf.value = arrayBuffer;
    console.log('backPdf')
    console.log(backPdf.value)
  }
}

// 合并 PDF 文件
async function mergePDFs() {
  if (!frontPdf.value || !backPdf.value) {
    console.error("Both PDF files are required.");
    return;
  }

  const mergedPdfDoc = await PDFDocument.create();
  const [frontPdfDoc, backPdfDoc] = await Promise.all([
    PDFDocument.load(frontPdf.value),
    PDFDocument.load(backPdf.value),
  ]);

  const frontPages = await mergedPdfDoc.copyPages(frontPdfDoc, frontPdfDoc.getPageIndices());
  frontPages.forEach(page => mergedPdfDoc.addPage(page));

  const backPages = await mergedPdfDoc.copyPages(backPdfDoc, backPdfDoc.getPageIndices());
  backPages.forEach(page => mergedPdfDoc.addPage(page));

  const mergedPdfBytes = await mergedPdfDoc.save();
  
  // 创建一个 Blob 对象，并使用 URL.createObjectURL 创建一个指向该 Blob 的 URL
  const blob = new Blob([mergedPdfBytes], { type: "application/pdf" });
  const url = URL.createObjectURL(blob);

  // 创建一个临时的 a 标签来下载合并后的 PDF
  const a = document.createElement("a");
  a.href = url;
  a.download = "merged.pdf";
  document.body.appendChild(a);
}

</script>
<template>
  <header class="pb-6">
    <h1 class="text-3xl font-bold">PDF 单面扫描合并</h1>
  </header>
  <div class="flex gap-4">
    <div class="fileBox w-1/2">
      <el-upload class="upload-demo" drag accept=".pdf" :limit="1" :on-change="event => handleFileChange(event, true)">
        <el-icon class="el-icon--upload"><upload-filled /></el-icon>
        <div class="el-upload__text">Drag the <span class="font-bold">front-side </span>scanned PDF file here or <em>click to upload</em></div>
      </el-upload>
    </div>
    <div class="fileBox w-1/2">
      <el-upload class="upload-demo" drag accept=".pdf" :limit="1" :on-change="event => handleFileChange(event, false)">
        <el-icon class="el-icon--upload"><upload-filled /></el-icon>
        <div class="el-upload__text">Drag the <span class="font-bold">back-side </span>scanned PDF file here or <em>click to upload</em></div>
      </el-upload>
    </div>
    <el-button type="primary" @click="mergePDFs">Merge PDFs</el-button>
    <a id="download" download="merged.pdf">download</a>
  </div>

  {{ frontPdf && frontPdf.value }}
</template>

<style scoped>
.fileBox {
  @apply p-4 min-h-24 bg-white rounded-2xl border
}
</style>
