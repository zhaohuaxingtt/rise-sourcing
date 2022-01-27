<template>
    <div>
    </div>
</template>

<script>

</script>

<style scoped lang="scss">
    .box-card {
        .btn{
            position: absolute;
            right: 20px;
            top:0px;
            .active {
                transition: transform .3s;
                transform: rotate(180deg)
            }
            .active1 {
                transition: transform .3s;
                transform: rotate(0deg)
            }
        }
        .content{
            margin-top: 60px;
            position: relative;
            .left-box{
                display: inline-block;
                width: 240px;
            }
            .right-box{
                width: calc(100% - 240px);
                overflow-x: scroll;
                display: inline-block;
                margin: 0 auto;
                position: absolute;
                bottom: 0px;
                .box {
                    .item {
                        width: 150px;
                        text-align: center;
                        display: inline-block;
                        .hover{
                            cursor: pointer;
                        }
                    }
                }
                .row {
                    font-size: 16px;
                    height: 5px;
                    background-color: #8bb1fb;
                    border-radius: 10px;
                    margin: 30px 0 6px 65px;
                    .item {
                        width: 150px;
                        display: inline-block;
                        position: relative;
                        top: -10px
                    }
                }
            }
        }
    }
    .tips-content {
        font-weight: bold;
        font-size: 16px;
        li {
            line-height: 30px;

        }
    }
    ::v-deep .el-form-item {
        margin-bottom: 0px;
    }
    .actived{
        font-weight: 600;
    }
    ::v-deep .tablelist th tr {
        height: 39px;
    }

    ::-webkit-scrollbar { /*滾動條整體樣式*/
        width: 3px; /*高寬分別對應橫豎滾動條的尺寸*/
        height: 5px;
    }

    ::-webkit-scrollbar-thumb { /*滾動條里面小方塊*/
        border-radius: 5px;
        -webkit-box-shadow: inset 0 0 5px transparent;
        background: rgba(171, 208, 254, .5);
    }

    ::-webkit-scrollbar-track { /*滾動條里面軌道*/
        -webkit-box-shadow: inset 0 0 5px transparent;
        border-radius: 5px;
        background: rgba(171, 208, 254, .2);
    }
</style>
