<!--
 * @Author: wentliao
 * @Date: 2021-07-28 16:44:09
 * @Description: 封面表态
-->
<template>
    <div>
        <previewCover/>
        <editCover/>
    </div>
</template>

<script>
import previewCover from './components/previewCover'
import editCover from './components/editCover'
export default {
    name:'aekoDetailCover',
    components:{
        previewCover,
        editCover,
    }
}
</script>

<style>

</style>