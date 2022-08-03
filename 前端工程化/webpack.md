# webpack

webpack主要是打包，所以其核心存在两个部分，入口和出口，你可以把webpack加工想象成香肠加工厂，就是活猪进去，香肠出来的那种，但是如果每次加工都需要员工亲力亲为，那多麻烦那，所以我们考虑到了自动化配置。webpack存在功能类似的配置文件，让webpack通过配置，全自动的执行我们需要的编译操作。
​
​webpack分成四个部分，期中最核心的就是入口和出口，当然在入口和出口配置的同时我们还需要一些加载器和插件，这就是我们所谓的webpack配置文件。这个配置文件我们习惯把其命名为webpack.config.js ，还有webpackfile.js
​总结一下，webpack共分为四个部分，这个概念一定要记好，本堂课就是围绕这四个配置进行展开的 :
* 入口  * 出口  * 加载器  * 插件

![webpack原理图](https://www.runoob.com/wp-content/uploads/2017/01/32af52ff9594b121517ecdd932644da4.png)

1. 入口(Entry)指示 webpack 以哪个文件为入口起点开始打包，分析构建内部依赖图。

2. 输出(Output)指示 webpack 打包后的资源 bundles 输出到哪里去，以及如何命名。

3. Loader：让 webpack 能够去处理那些非 JS 的文件，比如样式文件、图片文件(webpack 自身只理解JS)

4. 插件(Plugins)：可以用于执行范围更广的任务。插件的范围包括，从打包优化和压缩，一直到重新定义环境中的变量等。

5. 模式(Mode)：指示 webpack 使用相应模式的配置。

| 选项 | 描述 | 特点 |
| --- | --- | --- |
| development | 会将 DefinePlugin 中 process.env.NODE_ENV 的值设置为 development。启用 NamedChunksPlugin 和 NamedModulesPlugin。 | 能让代码本地调试运行的环境 |
| production | 会将 DefinePlugin 中 process.env.NODE_ENV 的值设置为 production。启用 FlagDependencyUsagePlugin, FlagIncludedChunksPlugin, ModuleConcatenationPlugin, NoEmitOnErrorsPlugin, OccurrenceOrderPlugin, SideEffectsFlagPlugin 和 TerserPlugin。 | 能让代码优化上线运行的环境 |

[配置方法](https://juejin.cn/post/6909731086977368078/)