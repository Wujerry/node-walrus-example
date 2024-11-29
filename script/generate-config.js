/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require('fs');
const path = require('path');

// 读取模板文件
const templatePath = path.join(process.cwd(), 'config', 'sui_config.template.yaml');
const outputPath = path.join(process.cwd(), 'config', 'sui_config.yaml');

const template = fs.readFileSync(templatePath, 'utf8');

// 替换 ${VAR} 占位符为环境变量的值
const interpolatedConfig = template.replace(/\${(.*?)}/g, () => {
  return path.join(process.cwd(), 'config', 'sui.keystore');
});

// 将生成的配置写入到 public 目录
fs.writeFileSync(outputPath, interpolatedConfig, 'utf8');

console.log('Configuration file generated at:', outputPath);