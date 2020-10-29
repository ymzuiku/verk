# Verk

详细文档：[http://verk.writeflowy.com](http://verk.writeflowy.com)

## Welcome

首先恭喜你找到 Verk，它立志提供一个全新的 web 开发方式。

Verk 是一个基于 Web-Components 的前端(`微服务`)框架。Verk 以纯 html 实现一个框架常用的功能，让用户实现一些普通项目时尽可能的少些 JS 代码。

Verk 的核心特点是不需要编译，使用纯 html 进行组织项目。

Verk 把每一个 html 都作为组件进行引用、实例化，并且提供了 props、slot、renderHook 等组件常用的模式。

Verk 内置全局状态管理、路由。

Verk 很轻，仅有 5kb (min + gzip).

Verk 是一个颠覆现有前端开发方式的**尝试**，其实还未准备好在生产环境进行使用。因为一个优秀的工程，还需要解决许多方面的问题，Verk 在错误调试方面并没有任何优势。

## Verk 立志于解决以下问题

- **前端巨石应用:**  Verk是一个天生的前端微服务框架.
- **工程复杂度随迭代增高，处于失控边缘徘徊:**  Verk的设计模式使得我们很容易编写复杂度内聚的工程.
- **前端编译、工程配置繁碎:**  Verk不需要编译，不需要配置工程.
- **跨工程复用组件，频繁发包:**  Verk可以直接使用其他在线Verk工程的模块、组件.
- **非常多重复的代码量:**  Verk可以直接编写HTML标签完成大部分有状态需求的业务逻辑.
- **状态管理过度封装，调试困难:**  Verk直接在标签中嵌入状态管理，并且所有状态都是实时响应的，只有遇到了性能瓶颈时才需要稍加约束.
- **单页面应用切换为多页面应用有一定的工作量:**  Verk是纯html，天生为多页面应用，可以轻松编写多页面混合单页面应用的工程
- **编译后JS资源庞大，即便做了代码拆分:**  Verk天生确保代码拆分，虽然牺牲了代码bundle的加载优势，但是换来了其他更多的特性；现实情况是，很少有应用因为代码拆分的多导致整体性能下降，首屏的性能大部分在于必要依赖过多。


## Use

在问的底部引入 verk.js，必须在**底部**：

```html
<script src="https://unpkg.com/verk@0.1.0/umd/index.min.js"></script>
```

## Route map

### Base

- [x] v-if
- [x] v-route
- [x] v-show
- [x] v-for
- [x] v-txt
- [x] v-set
- [x] v-watch
- [x] v-shadow
- [x] v-keep
- [x] v-preload

### Template

- [x] v-component
- [x] v-new
- [x] v-new src
- [x] v-new props
- [x] v-new script
- [x] v-new loading
- [x] v-new slot
- [x] v-new uuid-
- [x] v-new $renderHook


### Use Other script

- [x] load script at template/from

### Debug

- [x] error in Element

### Document

- [x] home page
- [ ] document mobile
- [x] live edtor

### addon

- [x] css runtime flavorcss
