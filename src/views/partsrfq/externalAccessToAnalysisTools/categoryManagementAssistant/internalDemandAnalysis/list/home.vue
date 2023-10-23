<template>
    <div>
        <theSearch @getTableList="getTableList" class="margin-bottom20" name="theSearch"/>
        <theTable ref="theTable"/>
    </div>
</template>

<script>
    import {iPage, iNavMvp, iButton} from 'rise';
    import theSearch from './components/theSearch';
    import theTable from './components/theTable';

    export default {
        components: {
            iPage,
            iNavMvp,
            iButton,
            theSearch,
            theTable,
        },
        data() {
            return {
                indexBtn: 0,
            };
        },
        mounted() {

        },
        methods: {
            getTableList() {
                this.$refs.theTable.getTableList();
            },
            exchangeSelectState(item,index) {
                this.indexBtn = index
            },
        },
    };
</script>

<style scoped lang="scss">
    .navBox {
        position: relative;

        .btnRow {
            position: absolute;
            right: 0;
            top: 5px;
            .btnList {
                .btngroup {
                    display: flex;
                    flex-direction: row;
                    cursor: pointer;

                    > li {
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        padding-left: 20px;
                        padding-right: 20px;
                        height: 16px;

                        &:not(:last-child) {
                            border-right: 2px solid #909091;
                        }

                        > span {
                            font-size: 18px;
                            font-family: Arial;
                            font-weight: 400;
                            line-height: 25px;
                            color: #00000048;
                        }

                        .activetest {
                            font-weight: bold;
                            color: #67C23A;
                        }
                    }
                }

                > span {
                    font-size: 20px;
                    margin-left: 20px;

                    // opacity: 0.5;
                    .log {
                        font-size: 16px;
                        color: #67C23A;
                        margin-left: 5px;
                    }
                }
            }
        }
    }
</style>
