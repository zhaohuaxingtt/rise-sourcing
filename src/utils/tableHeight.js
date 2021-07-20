/*
 * @Author: yangzhen
 * @Date: 2021-05-19 14:28:34
 * @Description: 针对页面高度适配table高度
 */

export const tableHeight = {
    data() {
        return {
            tableHeight: 0
        }
    },
    methods: {
        getHeight(){
            this.tableHeight = document.documentElement.clientHeight || document.body.clientHeight
            // this.tableHeight = -50000
        }
    },
    created() {
        this.getHeight()
        window.addEventListener('resize', this.getHeight)
    },
    destroyed() {
        window.removeEventListener('resize', this.getHeight)
    }
}

