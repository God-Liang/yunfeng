# 项目说明

## 目录
* [运行步骤](#运行步骤)
* [项目介绍](#项目介绍)
* [功能介绍](#功能介绍)

* [目录结构](#目录结构)
* [历史版本](#历史版本)

<a name="运行步骤"></a>
### 运行步骤
1. 拉取代码 `git clone 'https://gitee.com/yunfeng_medical_chain/bee-cloud-admin.git'`
2. 安装依赖 `npm install`
3. 运行项目 `npm run dev`
4. 打包项目 `npm run build:prod`

<a name="项目介绍"></a>
### 项目介绍
> 依米云医后台管理系统

<a name="功能介绍"></a>
### 功能介绍

<a name="目录结构"></a>
### 目录结构

```
├── build                      # 构建相关
├── mock                       # 项目mock 模拟数据
├── plop-templates             # 基本模板
├── public                     # 静态资源
│   │── favicon.ico            # favicon图标
│   └── index.html             # html模板
├── src                        # 源代码
│   ├── api                    # 所有请求
│   ├── assets                 # 主题 字体等静态资源
│   ├── components             # 全局公用组件
│   ├── directive              # 全局指令
│   ├── filters                # 全局 filter
│   ├── icons                  # 项目所有 svg icons
│   ├── layout                 # 全局 layout
│   ├── router                 # 路由
│   ├── store                  # 全局 store管理
│   ├── styles                 # 全局样式
│   ├── utils                  # 全局公用方法
│   ├── vendor                 # 公用vendor
│   ├── views                  # views 所有页面
│   ├── App.vue                # 入口页面
│   ├── main.js                # 入口文件 加载组件 初始化等
│   └── permission.js          # 权限管理
├── tests                      # 测试
├── .env.xxx                   # 环境变量配置
├── .eslintignore              # eslint不检查文件
├── .eslintrc.js               # eslint 配置项
├── .babelrc                   # babel-loader 配置
├── .travis.yml                # 自动化CI配置
├── vue.config.js              # vue-cli 配置
├── postcss.config.js          # postcss 配置
└── package.json               # package.json
```

<a name="历史版本"></a>
### 历史版本

##### 版本V1.0.0
新增客服管理、运营管理(运营端/医生端)、平台运维、系统管理