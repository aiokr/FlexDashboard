const fs = require('fs-extra');
const path = require('path');
const { exec } = require('child_process');

const dirPath = path.join(__dirname, 'element-plus');

// 删除element-plus目录
fs.remove(dirPath, err => {
  if (err) return console.error(err);

  console.log('element-plus 文件夹已删除。开始克隆仓库...');

  // 克隆仓库
  exec('git clone https://github.com/aiokr/element-plus.git --depth=1', (error, stdout, stderr) => {
    if (error) return console.error(`克隆仓库出错: ${error}`);
    console.log('仓库克隆成功。安装依赖并构建...');

    // 进入目录，安装依赖并构建
    process.chdir('element-plus');
    exec('pnpm install && pnpm build', (installError, installStdout, installStderr) => {
      if (installError) return console.error(`安装依赖出错: ${installError}`);
      console.log('依赖安装并构建完成。');
    });
  });
});