# 物资申领

### 开发配置文件

##### 文件.env.development 配置

```配置介绍
VUE_APP_BASE_API：接口地址
```

### 线上配置文件

##### 文件/public/config.json 配置

```配置介绍
host：接口地址
url：文件夹名称(大小写一致)
path：文件夹名称(必须是小写)
type：wx/dd
appid: 微信授权所需appid
```

```钉钉配置
{
    "host": "",
    "url": "/adminddmcwz/",
    "path": "/adminddmcwz/",
    "type": "dd"
}
```

```微信配置
{
    "host": "",
    "url": "/ADMINWZ/",
    "path": "/adminwz/",
    "type": "wx",
    "appid": ""
}
```