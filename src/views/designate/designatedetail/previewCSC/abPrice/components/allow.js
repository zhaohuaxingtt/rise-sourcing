/*
 * @Author: 余继鹏 917955345@qq.com
 * @Date: 2023-02-05 23:34:21
 * @LastEditors: 余继鹏 917955345@qq.com
 * @LastEditTime: 2023-02-16 22:48:43
 * @FilePath: \front-web\src\views\designate\designatedetail\previewCSC\abPrice\components\components\allow.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
export default {
    data() {
        return {
            left: {
                position: "fixed",
                top: 0,
                left: 0,
            },
            right: {
                position: "fixed",
                top: 0,
                left: 0,
            },
            gutter: "0px",  // total表右侧滚动条距离
        };
    },

    // 暂定,数据变化触发渲染时重新定位
    updated() {
        // this.$nextTick(() => {
            // window.onload = ()=>{
            //     console.log('加载完成了');
            // }
            // setTimeout(() => {
            //     console.log('setTimeout');
            //     this.positionAllow();
            // }, 120);
        // });
    },
    mounted() {
        // 未监听打开控制台引起的页面变化
        // 页面缩放的时候重新去获取翻页按钮定位
        window.addEventListener("resize", this.positionAllow);
        // 滚动的时候重新去获取翻页按钮定位
        // 相关页面都是由appRouterView触发的页面滚动,所以这里用appRouterView
        document
            .getElementById("appRouterView")
            .addEventListener("scroll", this.positionAllow);
            this.$nextTick(()=>{
                this.positionAllow()
            })
    },
    methods: {
        // 点击事件用于获取右箭头位置
        rightAllow(event) {
            this.right.top = -event.layerY + "px";
            this.right.left = -event.layerX + "px";
        },
        // 点击事件用于获取左箭头位置
        leftAllow(event) {
            this.left.top = -event.layerY + "px";
            this.left.left = -event.layerX + "px";
        },
        // 触发定位元素,点击事件
        positionAllow() {
            this.$nextTick(() => {
                setTimeout(() => {
                    this.gutter =
                        (this.$refs[this.ref] &&
                            this.$refs[this.ref].getElementsByClassName("gutter")[0].style
                                .width) ||
                        '0px';
                    const rightAllow =
                        this.$refs[this.ref] &&
                        this.$refs[this.ref].getElementsByClassName("rightAllow")[0];
                    rightAllow && rightAllow.click();
                    const leftAllow =
                        this.$refs[this.ref] &&
                        this.$refs[this.ref].getElementsByClassName("leftAllow")[0];
                    leftAllow && leftAllow.click();
                }, 0);
            });
        },
    },
    destroyed() {
        window.removeEventListener("resize", this.positionAllow);
        document
            .getElementById("appRouterView")
            .removeEventListener("scroll", this.positionAllow);
    },
};