<!--
 * @Author: wentliao
 * @Date: 2021-07-27 14:35:26
 * @Description: aeko描述页---附件列表
-->
<template>
    <div class="aekoFilesList">
        <ul class="filesList">
            <li v-for="(item,index) in list" :key="'aekoFilesList_'+index">
                <i class="list-index">{{index+1}}.</i>
                <span class="link-underline" @click="downloadFile(item)">{{item.fileName}}</span>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name:'aekoFilesList',
    data(){
        return{
            list:[
                {fileName:'附件名称1.pdf'},
                {fileName:'附件名称2.pdf'},
                {fileName:'附件名称3.pdf'},
                {fileName:'附件名称4.pdf'},
                {fileName:'附件名称5.pdf'},
            ]
        }
    },
    created(){
        this.getList();
    },
    methods:{
      // 获取列表
      async getList(){
        
      },

      // 下载附件
      downloadFile(file){
          // 判断一下是不是pdf 如果是的话就直接新开窗口预览
          const { fileName,filePath } = file;
          const isPdf = (fileName.toLowerCase()).indexOf('.pdf')>=0;
          if(isPdf){
              window.open(filePath)
          }
          
      }
    }
}
</script>

<style lang="scss" scoped>
    .aekoFilesList{
        .filesList{
            li{
                padding: 15px 0;
                border-bottom: 1px dashed rgba($color: #707070, $alpha: .2);
                position: relative;
                .list-index{
                    font-style: normal;
                    display: inline-block;
                    position: absolute;
                    width: 20px;
                    left: -20px;
                    top: 16px;
                    text-align: right;
                }
            }
        }
    }
</style>