
### 中文  &#124

# html文本替换,支持全局关键词替换,缺省文本处理
#### 介绍
基于 es6+ 的html文本处理工具，用于缺省文本和异常文本的处理。可以在html 的body内任意区域使用，支持多个候选词，支持动态替换，异步替换


#### 安装教程

##### 使用 ```npm``` 和 ```yarn```
```shell script
npm i vc-text-content-replace

yarn add vc-text-content-replace
```
个人推荐使用 [pnpm](https://pnpm.io/) 代替 ```npm``` 作为包管理器
##### 使用 ```pnpm```
```shell script
pnpm install vc-text-content-replace
```

#### 使用说明
```javascript
import VcTextContentReplace from 'vc-text-content-replace'

const textReplace = new VcTextContentReplace(node: Node, dataSource: Map, option: RegExp enum);
textReplace.initialize();
```

```javascript
// default node
document.querySelector('body');
// default map
new Map()
// default option
'gum'
```
#### 使用例子
请查看 <code>example/index.html</code> (由于使用了<code>script type="module"</code>,所以得启用服务端口查看)

#### 测试用例一览
```javascript
   import VcTextContentReplace from '../index.js';

   const dataDemo = new Map([['undefined', 'Android'], ['NaN', 'iPhone'],['null', 'Windows'],['😊', 'Linux']]);
        /** demo1 start **/
        ;(function(){
            const tools = new VcTextContentReplace(document.querySelector('#example'), dataDemo);
            tools.initialize();
            const exampleText = 'undefined 永远嘀神 ！！！ 😊 YYDS!!!';
            document.querySelector('#btn_0').onclick = function() {
                const a = document.createElement('div');
                a.classList.add('result');
                const b = document.createElement('h4');
                b.textContent = exampleText;
                a.appendChild(b);
                document.querySelector('#example').appendChild(a);
            }
        })()
        /** demo1 end **/
```
