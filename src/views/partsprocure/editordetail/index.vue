<!--
 * @Author: yuszhou
 * @Date: 2021-02-25 10:09:36
 * @LastEditTime: 2021-03-02 15:24:21
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \rise\src\views\partsprocure\editordetail\index.vue
-->
<template>
  <iPage>
    <iCard>
      <iFormGroup row="4" inline :rules="rules">
          <div class="row">
            <div class="col">
              <iFormItem label="零件号：" name="test">
                <iInput></iInput>
              </iFormItem>
              <iFormItem label="FSNR/GSNR/SPNR：" name="test">
                <iInput></iInput>
              </iFormItem>
              <iFormItem label="询价采购员：" name="test">
                <iInput></iInput>
              </iFormItem>
              <iFormItem label="签收日期：" name="test">
                <iInput></iInput>
              </iFormItem>
            </div>
                   <div class="col">
              <iFormItem label="零件号：" name="test">
                <iInput></iInput>
              </iFormItem>
              <iFormItem label="FSNR/GSNR/SPNR：" name="test">
                <iInput></iInput>
              </iFormItem>
              <iFormItem label="询价采购员：" name="test">
                <iInput></iInput>
              </iFormItem>
              <iFormItem label="签收日期：" name="test">
                <iInput></iInput>
              </iFormItem>
            </div>
                   <div class="col">
              <iFormItem label="零件号：" name="test">
                <iInput></iInput>
              </iFormItem>
              <iFormItem label="FSNR/GSNR/SPNR：" name="test">
                <iInput></iInput>
              </iFormItem>
              <iFormItem label="询价采购员：" name="test">
                <iInput></iInput>
              </iFormItem>
              <iFormItem label="签收日期：" name="test">
                <iInput></iInput>
              </iFormItem>
            </div>
                   <div class="col">
              <iFormItem label="零件号：" name="test">
                <iInput></iInput>
              </iFormItem>
              <iFormItem label="FSNR/GSNR/SPNR：" name="test">
                <iInput></iInput>
              </iFormItem>
              <iFormItem label="询价采购员：" name="test">
                <iInput></iInput>
              </iFormItem>
              <iFormItem label="签收日期：" name="test">
                <iInput></iInput>
              </iFormItem>
            </div>
          </div>
      </iFormGroup>
    </iCard>
  </iPage>
</template>
<script>
import { iPage, iFormGroup, iFormItem, iInput ,iCard} from "@/components";
export default {
  components: { iPage, iFormGroup, iFormItem, iInput ,iCard},
};
</script>
<style lang="scss" scoped>
  .row{
    width: 100%;
    height: 100%;
    overflow: hidden;
    display: flex;
    justify-content: space-between;
    .col{
      width: 395px;
      border-right: 1px solid $color-border;
      margin-right: 10px;
      &:last-child{
        margin-right: 0px;
        border-right: none;
      }
    }
    .items{
      width: 300px;
    }
  }
</style>
