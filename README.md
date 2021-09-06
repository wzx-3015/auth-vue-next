<!--
 * @Description: 请输入当前文件描述
 * @Author: @Xin (834529118@qq.com)
 * @Date: 2021-04-19 10:06:21
 * @LastEditTime: 2021-08-31 09:25:29
 * @LastEditors: @Xin (834529118@qq.com)
-->
# 通用平台前端脚手架
1. 集成权限管理通用平台
2. 请求封装处理提供常用请求配置(get post put del request)
3. 增加频繁操作发送请求拦截告警处理
4. 增加全局异常告警处理
5. 协同后端框架进行数据格式的定义以及实现
6. 集成常用类库,以及正则(lodash + element-plus + echarts + decimal.js + dayjs...)
7. 全局环境变量配置项
8. splitChunks 代码的拆分(element-plus + echarts已拆分为独立包加载)
9. vuex 操作辅助库 (解决vuex获取繁琐的问题),自定义hook 请保证在setup 中执行否则无法获取store信息
## 项目注意事项
```
推荐使用vscode进行项目开发,已创建了.vscode方便结合Prettier插件进行格式化处理
暂未集成git提交eslit校验钩子函数(考虑到项目频繁的更改可能部分功能暂时注释影响git的提交)
```

## vue3注意事项!
```
尽量减少使用es6解构操作(vue3中解构赋值之后会导致数据响应失效)
<script setup> 该功能目前在试用阶段请勿使用以及eslit校验等均会出现问题
以use开头属于系定义hook或者内置hook 请保证方法在setup中执行,否则无法获得想要的结果
```

### 路由配置注意事项
```
所有的路由均需要存在且唯一的name属性
对路由进行格式化处理时会和权限管理平台返回的modules进行name名称的匹配,如果名字不存在则会进行异常警告且会停止后续处理(异常信息已在控制台抛出   包含权限平台模块信息)
匹配规则:  权限管理平台路由名 === 路由属性name

constRoutes 路由配置为静态路由不需要重后台进行获取对比
  route.name 为 ['404', '403', 'redirect']属性的路由会及进行登录校验其余均属于开放性路由
```
### 集成权限管理系统(未完成)

```
内置v-hasPermi 用来进行权限校验的判断
v-hasPermi="['PUT', 'GET']" 如用户存在 PUT 权限 || GET权限则校验通过 否则 移除dom

某些情况下无法使用指令 提供函数式权限校验 位置:@/utils/permission
hasPermission(['PUT', 'GET'])


所有关于用户的信息全部存储在store  user模块下(导航栏信息, 名称),业务使用需自行展示处理

提供获取指定RouteName子导航列表
import useStoreAuxiliary from '@/plugins/useStoreAuxiliary'
const { getGetters } = useStoreAuxiliary()
示例: getGetters('getChildrenMenus')('About')
```


### 集成常用类库以及部分正则
```
vue3 + vue-router + vuex + lodash + element-plus + echarts + decimal.js + axios + dayjs
```
### axios请求封装处理
```
1.提供常用请求request get post put del请求
2.增加频繁操作发送请求的异常告警处理(增加allowedRepeat配置项,可进行请求的频繁发送或者增加动态时间参数)
3.增加全局异常告警处理(增加handlerErr配置项,可自行处理异常告警)
4.请求为200会进入then函数，异常会进入catch函数（请勿使用async await语法糖）
```

### 增加环境变量全局配置项
```
.env // 所有环境全部应用
.env.development // 开发环境应用
.env.production // 生产环境应用

--- 配置项 ---
VUE_APP_SYSTEM_NAME // 系统名称及title的展示
VUE_APP_REQUEST_API // 接口统一前缀配置(根据此配置生成了proxy代理配置以及axios统一前缀)
VUE_APP_LOGINPATH   // 权限管理平台登录页路径(http://192.168.10.126:8080/#/login)
VUE_APP_LOGIN_AUTH // 登录鉴权配置项默认开发生产环境为开启状态(true)  关闭时将忽略登录操作以及用户信息的获取  所有路由模块全部加载(menus导航栏信息出现异常)
```
### 项目优化处理
1. 完成splitChunks代码的拆分 将element-puls 和 echarts 拆分为单独的文件包
2. 开启打包zip文件压缩功能(以压缩的文件见不会清除全部存放在 dist_zip 文件夹中)
3. 全局less变量的引入(未实现)

### 关闭git自动执行换行符的格式化
git config --global core.autocrlf false


### 文件格式规范信息
├─ public                                     
│  ├─ favicon.ico                             
│  └─ index.html                              
├─ src                                        
│  ├─ assets                                  // 全局公用资源                           
│  ├─ components                              // 全局自定义组件                 
│  ├─ directive                               // 全局自定义指令
│  │  ├─ modules                              // 指令模块文件(该文件下的指令模块已自动注册)
│  │  │  └─ demo.js                           
│  │  └─ index.js                             // 指令注册入口文件
│  ├─ layout                                  // 应用与布局的容器
│  ├─ plugins                                 // 插件
│  │  ├─ echarts.js                           // 可视化图表类库(按需加载请自行引用)
│  │  ├─ elementUI.js                         // elementUI插件库(目前以全局引用,可进行按需引用需自行调整)
│  │  └─ useStoreAuxiliary.js                 // Vux 使用辅助库
│  ├─ router                                  // 路由文件
│  │  └─ index.js                             
│  ├─ store                                   // vuex Store信息
│  │  ├─ modules                              // Store子模块(该文件下的store已自动引用 
│  │  │  └─ app.js                            
│  │  └─ index.js                             // store注册入口文件
│  ├─ utils                                   // 工具类
│  │  ├─ request.js                           // 网络请求
│  │  └─ validate.js                          // 正则工具类
│  ├─ views                                   // 单文件页面资源(文件均以大写方式开头)
│  │  ├─ About                                
│  │  │  ├─ assets                            // 单页面资源文件(包含图片、视频等信息直接扁平化放置)
│  │  │  ├─ components                        // 单页面公用组件或组件
│  │  │  ├─ index.vue                         
│  │  │  └─ service.js                        // 单页面请求逻辑以及数据处理文件  
│  │  └─ Home.vue                             
│  ├─ App.vue                                 
│  └─ main.js                                 
├─ .env                                       // 开发生产环境均使用的配置文件
├─ .env.development                           // 开发环境配置文件
├─ .env.production                            // 生产环境配置文件
├─ babel.config.js                            // babel配置文件
├─ package.json                               // package.json信息
├─ README.md                                  // 项目说明文档
├─ vue.config.js                              // vue.config.js配置信息                        
