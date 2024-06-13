import fs from 'node:fs/promises'
import fse from 'fs-extra';
import { promisify } from 'util';
import { copyFile } from 'node:fs'
import { resolve } from 'path'
import { parallel, series } from 'gulp';
import { exec } from 'child_process';

export const projRoot = resolve(__dirname, '..', '..') // 项目根目录
export const pkgRoot = resolve(projRoot, 'packages') // 
export const webRoot = resolve(pkgRoot, 'web') // 网页端根目录

export const buildOutput = resolve(projRoot, 'dist') // 构建输出目录
export const webOutput = resolve(buildOutput, 'web') // 网页端输出目录
export const crxOutput = resolve(buildOutput, 'crx') // Chrome 插件输出目录

// 清理
const cleanPromise = promisify(fse.remove);
export const clean = () => {
  return cleanPromise(buildOutput)
    .then(() => console.log('移除 dist 目录成功'))
    .catch((err: any) => console.error('清理输出目录错误:', err));
}

// 构建所有组件
const buildChain = {
  web: () => {
    return new Promise<void>((resolve, reject) => {
      exec('pnpm build', { cwd: '../../packages/web' }, (error, stdout, stderr) => {
        if (error) {
          console.error(`构建错误: ${error}`);
          return reject(error);
        }
        console.log(`stdout: ${stdout}`);
        console.error(`stderr: ${stderr}`);
        resolve();
      });
    });
  }
}


// 将 fse.copy 转换为 Promise 形式
const copyPromise = promisify(fse.copy);
// 复制文件到根目录的 dist 文件夹
export const copyFiles = () => {
  console.log('copy: ' + webRoot + ' to: ' + webOutput);
  // 返回一个 Promise，确保 Gulp 知道何时任务完成
  return copyPromise(webRoot + '/.output', webOutput)
    .then(() => console.log('文件复制成功'))
    .catch((err: any) => console.error('复制文件时发生错误:', err));
}

export default exports.build = series(clean, buildChain.web, copyFiles);