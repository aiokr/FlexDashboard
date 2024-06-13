import fs from 'node:fs/promises'
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
export const clean = () => {
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


// 复制文件到根目录的 dist 文件夹
export const copyFiles = () => {
  console.log('copy: ' + webRoot + ' to: ' + webOutput);
  copyFile(
    webRoot + '/.output',
    webOutput,
    (err) => {
      if (err) {
        console.error('复制文件时发生错误:', err);
        return;
      }
      console.log('文件复制成功');
    }
  );
}

export default exports.build = series(parallel([buildChain.web]), copyFiles);