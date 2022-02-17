/**
 * @description: html文本替换,支持全局关键词替换,支持局部替换,支持多选,支持异步
 * @author: Vencent Lum
 * @Date: 2022-02-16
 */

/** config
 * @description: MutationObserver的配置项
 * @type {{subtree: boolean, attributes: boolean, childList: boolean}}
 */

/**
 * option
 * @description: 正则匹配的规则参数,默认是 gum
 */

/**
 * NODE_TYPE
 * @description: 节点类型，文本节点是 3
 * @type {number}
 */
class VcTextContentReplace {
    constructor(node = document.querySelector('body'), data = new Map(), option) {
        this.node = node;
        this.option = option || 'gum';
        this.config = {
            attributes: false,
            childList: true,
            characterData: true,
            subtree: true
        };
        this.NODE_TYPE = 3;
        if (data instanceof Map) {
            this.mapMap = data
        } else throw new Error('data exception Map');
        this.nodeNotText = this.nodeNotText.bind(this);
        this.nodeText = this.nodeText.bind(this);
        this.observerCallback = this.observerCallback.bind(this);
        this.replace = this.replace.bind(this);
    }
    observerCallback (mutationsList, observer) {
        // Use traditional 'for loops' for IE 11
        for (const mutation of mutationsList) {
            if (mutation.type === 'childList') {
                for (let node of mutation.addedNodes) {
                    if (node && node.nodeType === this.NODE_TYPE) {
                         // 如果节点是 Text, 查找并替换文本
                         this.nodeText(node);
                    } else {
                         // 如果节点并不是 Text, 继续向下查找childNodes
                         this.nodeNotText(node);
                    }
                }
            }
        }
    }

    /**
     * 当前节点已经是 Text，直接对节点处理
     * @param node Node
     */
    nodeText (node) {
        this.resoluteMap(this.mapMap, node);
    }

    /**
     * 当前节点非 Text，仍然需要向下解析
     * @param node Node
     */
    nodeNotText (node) {
        for (let n of node.childNodes) {
            if (n && n.nodeType === this.NODE_TYPE && !('vcIgnore' in node.dataset)) {
                this.nodeText(n);
            } else if (!('vcIgnore' in node.dataset)){
                this.nodeNotText(n);
            }
        }
    }

    /**
     * 解析Map并逐次替换
     * @param map Map
     * @param node Node
     */
    resoluteMap (map, node) {
         map.forEach((value, key) => {
             this.replace(value, key, node);
         })
    }

    /**
     * 文本替换
     * @param value String
     * @param key String
     * @param node Node
     */
    replace (value, key, node) {
       node.textContent = node.textContent.replace(new RegExp(key,this.option), value);
    }

    /**
     * 注册dom变化观察
     */
    initialize () {
        const observer = new MutationObserver(this.observerCallback);
        // Start observing the target node for configured mutations
        observer.observe(this.node, this.config);
    }
}

export default VcTextContentReplace;
