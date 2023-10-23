<template>
    <iPage class="navPage">
        <div class="navBox">
            <iNavMvp :list="tabRouterList" class="margin-bottom20" :routerPage="true" :lev="1"/>
            <div class="btnRow">
                <div class="btnList flex-align-center margin-bottom20">
                    <ul class="btngroup">
                        <li v-for="(items, index) in btnsgroup1" :key="index" @click="exchangeSelectState(items,index)">
                            <span :class="indexBtn == index ? 'activetest' : ''">{{ $t(items.key) }}</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <keep-live>
            <component :is="currentView" />
        </keep-live>
    </iPage>
</template>

<script>
    import {iPage, iNavMvp, iButton} from 'rise';
    import Home from './home'
    import Other from './other'
    import Table from './table'
    import {tabRouterList, btnsgroup1} from '../data';

    export default {
        components: {
            iPage,
            iNavMvp,
            iButton,
            Home,
            Other,
            Table,
        },
        data() {
            return {
                tabRouterList,
                btnsgroup1,
                indexBtn: 0,
                currentView:'Home'
            };
        },
        methods: {
            exchangeSelectState(item,index) {
                if(index==0) {
                    this.currentView = 'Home'
                }
                if(index==1) {
                    this.currentView = 'Table'
                }

                if(index==2) {
                    this.currentView = 'Other'
                }

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

.navPage{
  padding:20px 0!important;
}
</style>
