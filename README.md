# 智能菜谱生成系统 (Intelligent Recipe Generation)

<div align="center">

**味道星球** - 基于微信小程序的智能菜谱推荐与社区分享平台

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![WeChat](https://img.shields.io/badge/WeChat-MiniProgram-green.svg)
![Python](https://img.shields.io/badge/Python-3.8+-blue.svg)
![Flask](https://img.shields.io/badge/Flask-2.0+-lightgrey.svg)

</div>

## 📖 项目简介

本项目是一个集**智能菜谱推荐**、**AI搜索**、**社区分享**为一体的微信小程序平台。用户可以根据现有食材快速搜索菜谱，体验菜谱盲盒功能，分享烹饪经验，并参与社区互动。

### ✨ 核心功能

- 🔍 **智能食材搜索** - 根据现有食材、烹饪方式、菜系风格智能推荐菜谱
- 🎲 **菜谱盲盒** - 随机推荐菜谱，解决"不知道吃什么"的困扰
- 🤖 **AI搜索助手** - 自然语言搜索，智能理解用户需求
- 📊 **热门排行榜** - 实时展示最受欢迎的菜谱和搜索关键词
- 👥 **社区分享** - 用户可以发布图文分享、撰写文章、互动评论
- 📝 **菜谱投稿** - 用户创作菜谱，后台审核发布
- 🔐 **用户系统** - 注册登录、个人主页、收藏管理

## 🏗️ 项目架构

```
intelligent-recipe-generation/
├── backend/                 # Flask后端服务
│   ├── app.py              # 主应用入口
│   ├── data_manager.py     # 数据管理模块
│   ├── data.json           # 数据存储文件
│   └── requirements.txt    # Python依赖
├── miniprogram/            # 微信小程序前端
│   ├── pages/              # 页面文件
│   │   ├── index/          # 首页
│   │   ├── search/         # 搜索页
│   │   ├── community/      # 社区页
│   │   ├── profile/        # 个人中心
│   │   ├── recipe-list/    # 菜谱列表
│   │   ├── recipe-detail/  # 菜谱详情
│   │   ├── ai-search/      # AI搜索
│   │   ├── hot-rank/       # 热门排行
│   │   ├── lucky-box/      # 菜谱盲盒
│   │   ├── upload/         # 菜谱投稿
│   │   ├── article-list/   # 文章列表
│   │   └── admin/audit/    # 管理员审核
│   ├── custom-tab-bar/     # 自定义标签栏
│   ├── images/             # 图片资源
│   ├── app.json            # 小程序配置
│   └── app.ts              # 小程序入口
└── cloudfunctions/         # 云函数（预留）
```

## 🚀 快速开始

### 环境要求

- **Python**: 3.8+
- **Node.js**: 14+
- **微信开发者工具**: 最新稳定版
- **操作系统**: Windows/macOS/Linux

### 后端部署

1. **进入后端目录**
```bash
cd backend
```

2. **安装Python依赖**
```bash
pip install -r requirements.txt
```

3. **启动后端服务**

Windows:
```bash
start_backend.bat
```

macOS/Linux:
```bash
python app.py
```

后端服务将在 `http://127.0.0.1:5000` 启动

### 前端部署

1. **安装小程序依赖**
```bash
npm install
```

2. **使用微信开发者工具**
   - 打开微信开发者工具
   - 导入项目，选择 `miniprogram` 目录
   - 填写 AppID（可使用测试号）
   - 编译运行

3. **配置后端地址**

在小程序代码中，确保API请求地址指向本地后端：
```typescript
const BASE_URL = 'http://127.0.0.1:5000/api'
```

## 📱 功能演示

### 主要页面

| 首页 | 搜索 | 社区 | 个人中心 |
|:---:|:---:|:---:|:---:|
| 精选菜谱展示 | 智能食材搜索 | 图文分享互动 | 用户信息管理 |

### 特色功能

- **智能推荐算法** - 基于食材、烹饪方式、菜系的多维度匹配
- **热度统计系统** - 实时统计搜索关键词和菜谱热度
- **社区互动** - 点赞、评论、收藏功能
- **内容审核** - 用户投稿后台审核机制

## 🛠️ 技术栈

### 前端

- **框架**: 微信小程序原生框架
- **语言**: TypeScript
- **UI组件**: Vant Weapp
- **状态管理**: 微信小程序原生API

### 后端

- **框架**: Flask (Python)
- **跨域处理**: Flask-CORS
- **服务器**: Waitress (生产环境)
- **数据存储**: JSON文件存储（可扩展至数据库）

## 📝 API接口

### 基础接口

| 接口 | 方法 | 说明 |
|------|------|------|
| `/api/health` | GET | 健康检查 |
| `/api/ingredients` | GET | 获取食材分类 |
| `/api/cooking-methods` | GET | 获取烹饪方式 |

### 菜谱接口

| 接口 | 方法 | 说明 |
|------|------|------|
| `/api/recipes` | GET | 搜索菜谱列表 |
| `/api/recipes` | POST | 投稿新菜谱 |
| `/api/recipes/<id>` | GET | 获取菜谱详情 |
| `/api/recipes/random` | GET | 获取随机菜谱 |
| `/api/recipes/hot` | GET | 获取热门菜谱 |

### 社区接口

| 接口 | 方法 | 说明 |
|------|------|------|
| `/api/posts` | GET | 获取图文分享列表 |
| `/api/posts` | POST | 发布图文分享 |
| `/api/posts/<id>/stats` | POST | 更新点赞/评论数 |
| `/api/articles` | GET | 获取文章列表 |
| `/api/articles` | POST | 发布文章 |

### 用户接口

| 接口 | 方法 | 说明 |
|------|------|------|
| `/api/auth/register` | POST | 用户注册 |
| `/api/auth/login` | POST | 用户登录 |

## 📊 数据结构

### 菜谱数据格式

```json
{
  "id": "r1",
  "name": "宫保鸡丁",
  "ingredients": ["鸡肉", "花生"],
  "method": "炒",
  "cuisine": "川菜",
  "difficulty": "中等",
  "time": "30分钟",
  "steps": ["步骤1", "步骤2"],
  "image": "/images/real_recipes/r1.jpg",
  "views": 1234,
  "likes": 89,
  "approved": true
}
```
