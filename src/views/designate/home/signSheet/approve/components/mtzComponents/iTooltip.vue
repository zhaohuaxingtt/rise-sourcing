<template>
    <el-tooltip class="item" effect="light" placement="top">
        <template #content>
            <div v-html="txtInfo"></div>
        </template>
        <icon class="logIcon margin-left4" v-if="type=='icon'" symbol name="iconxinxitishi" ></icon>
        <span class="numIcon" v-if="type=='num'" size="mini" circle type="primary">{{ num }}</span>
    </el-tooltip>
</template>
 
<script>
import { icon,  } from 'rise';

export default {
    components: {
        icon,

  },
    name: 'iTooltip',
    props: {
        type: {
            type: String,
            default: 'num'
        },
        txtInfo: {
            type: String,
            default: ''
        },
        num: {
            type: String,
            default: 1,
        }
    },
    data() {
        return {
        }
    },
    methods: {
    }
}
</script>
 
<style lang="scss" scoped>

.numIcon{
    display:inline-block;
    text-align:center;
    line-height:20px;
    width:20px;
    height:20px;
    font-size:14px;
    background-color:#1763f7;
    color:white;
    border-radius:50%;
    
}
</style>
