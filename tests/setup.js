const fs = require('fs');
const path = require('path');

// Jest模拟配置
// jest.mock('fs'); // 暂时注释掉 fs 模拟，因为 testUtils 需要真实的文件系统操作
jest.mock('child_process');

// 全局测试设置
global.testUtils = {
  // 项目根目录
  rootDir: path.resolve(__dirname, '..'),
  
  // 获取项目路径
  getProjectPath: (...segments) => {
    return path.join(global.testUtils.rootDir, ...segments);
  },
  
  // 读取JSON文件
  readJsonFile: (filePath) => {
    try {
      const content = fs.readFileSync(filePath, 'utf-8');
      return JSON.parse(content);
    } catch (error) {
      throw new Error(`Failed to read JSON file ${filePath}: ${error.message}`);
    }
  },
  
  // 检查文件是否存在
  fileExists: (filePath) => {
    return fs.existsSync(filePath);
  },
  
  // 获取目录下的文件列表
  getFilesInDirectory: (dirPath, extension = null) => {
    if (!fs.existsSync(dirPath)) {
      return [];
    }
    
    const files = fs.readdirSync(dirPath);
    if (extension) {
      return files.filter(file => file.endsWith(extension));
    }
    return files;
  },
  
  // 创建临时目录
  createTempDir: () => {
    const tempDir = path.join(global.testUtils.rootDir, 'temp', `test-${Date.now()}`);
    fs.mkdirSync(tempDir, { recursive: true });
    return tempDir;
  },
  
  // 清理临时目录
  cleanupTempDir: (tempDir) => {
    if (fs.existsSync(tempDir)) {
      fs.rmSync(tempDir, { recursive: true, force: true });
    }
  }
};

// 测试前设置
beforeAll(() => {
  console.log('🧪 Starting MPLP Test Suite');
  
  // 确保构建目录存在
  const buildDir = global.testUtils.getProjectPath('build');
  if (!fs.existsSync(buildDir)) {
    fs.mkdirSync(buildDir, { recursive: true });
  }
  
  // 确保报告目录存在
  const reportsDir = global.testUtils.getProjectPath('build', 'reports');
  if (!fs.existsSync(reportsDir)) {
    fs.mkdirSync(reportsDir, { recursive: true });
  }
});

// 测试后清理
afterAll(() => {
  console.log('🧹 Cleaning up test environment');
  
  // 清理临时文件
  const tempDir = global.testUtils.getProjectPath('temp');
  if (fs.existsSync(tempDir)) {
    try {
      fs.rmSync(tempDir, { recursive: true, force: true });
    } catch (error) {
      console.warn('Warning: Failed to cleanup temp directory:', error.message);
    }
  }
});

// 设置测试超时
jest.setTimeout(30000);

// 抑制控制台输出（可选）
if (process.env.NODE_ENV === 'test' && !process.env.VERBOSE_TESTS) {
  global.console = {
    ...console,
    log: jest.fn(),
    debug: jest.fn(),
    info: jest.fn(),
    warn: jest.fn(),
    error: console.error // 保留错误输出
  };
}