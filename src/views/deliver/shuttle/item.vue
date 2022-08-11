<template>
  <div>
    <div class="row-list">
      <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="checkChange"></el-checkbox>
      <template v-for="item in header">
        <div class="column-item" :key="item.props">{{item.label}}</div>
      </template>
    </div>
    <div v-for="(item,index) in rowData" :key="index">
      <template>
        <div class="row-list">
          <el-checkbox :indeterminate="item.isIndeterminate" v-model="item.check" @change="itemCheckChange($event,item,index)"></el-checkbox>
          <div class="column-item">
            <span v-if="item.children" @click="changeOpen(item,index)">
              <icon v-if="item.show" symbol name="iconliebiaoshouqilishishuju" />
              <icon v-else-if="!item.show" symbol name="iconliebiaozhankailishishuju" />
            </span>
            <i v-else class="padding"></i>
            <span>
              {{item.col1}}
            </span>
          </div>
          <div class="column-item">{{item.col2}}</div>
        </div>
      </template>
      <template v-if="item.show&&item.children">
        <template v-for="(child,cIndex) in item.children">
          <div class="row-list" :key="cIndex">
            <el-checkbox v-model="child.check" @change="childCheckChange($event,item,index)"></el-checkbox>
            <div class="column-item">
              <i class="padding"></i>
              <span>
                {{child.col1}}
              </span>
            </div>
            <div class="column-item">{{child.col2}}</div>
          </div>
        </template>
      </template>
    </div>
  </div>
</template>

<script>
import { icon } from "rise";
  export default {
    name:'rowList',
    components:{
      icon
    },
    props:{
      rowData: {
        type: Array,
        default: ()=>[]
      },
      header: {
        type: Array,
        default: ()=>[]
      }
    },
    data() {
      return {
        isIndeterminate: false,
        checkAll:false,
        checkedCities:[],
        data: [
          {
            col1:'row-col1',
            col2:'row-col2',
            id:1,
            children:[
              {
                col1:'row-col1-1',
                col2:'row-col1-2',
                id:2
              },{
                col1:'row-col1-3',
                col2:'row-col1-4',
                id:4,
            children:[
              {
                col1:'row-col1-1',
                col2:'row-col1-2',
                id:2
              },{
                col1:'row-col1-3',
                col2:'row-col1-4',
                id:4
              },
            ]
              },
            ]
          },{
            col1:'row-col2',
            col2:'row-col2',
            id:3,
            children:[
              {
                col1:'row-col1-1',
                col2:'row-col1-2',
                id:2
              },{
                col1:'row-col1-3',
                col2:'row-col1-4',
                id:4
              },
            ]
          }
        ]
      }
    },
    methods:{
      checkIsIndeterminate(data){
        let result = this.checkData(data)
        let hasTrue = result.some(item=>item)
        let hasFalse = result.some(item=>!item)
        if(hasTrue&&!hasFalse) this.checkAll = true
        else this.checkAll = false
        return  (hasTrue&&hasFalse) ? true :false
      },
      checkData(data,result=[],check=null){
        if(Array.isArray(data)){
          data.forEach(item=>{
              if(check!=null){
                item.check = check
              }
              else{
                result.push(!!item.check)
              }
              if(item.children&&item.children.length){
                this.checkData(item.children, result , check)
              }
          })
        }
        return result
      },
      changeOpen(item,index){
        this.$set(item, 'show', !item.show)
        // this.data = this.data.map((item,i)=>{
        //   if(i==index){
        //     item.show = !item.show
        //   }
        //   return item
        // })
        // console.log(this.data);
      },
      checkChange(val){
        this.isIndeterminate = false
        this.checkData(this.rowData,[],val)
      },
      itemCheckChange(val,item,index) {
        if(item.children){
          item.children.forEach(child=>{
            if(val)
            child.check = true
            else
            child.check = false
          })
        }
        this.isIndeterminate = this.checkIsIndeterminate(this.rowData)
      },
      childCheckChange(val,item,index){
        if(val){
          let isIndeterminate = item.children.some(child=>!child.check)
          item.isIndeterminate = isIndeterminate
          if(isIndeterminate){
            item.check = false
          }else{
            item.check = true
          }
        }else{
          let isIndeterminate = item.children.some(child=>child.check)
          item.isIndeterminate = isIndeterminate
          item.check = false
        }
        this.$set(this.rowData,index,item)
        this.isIndeterminate = this.checkIsIndeterminate(this.rowData)
      }
    }
  }
</script>

<style lang="scss" scoped>
.row-list{
  width: 100%;
  display: flex;
  flex-flow: row;
  align-items: center;
  .column-item{
    align-items: center;
    width: 45%;
    padding: 5px 15px 5px 30px;
    .icon{
      margin-right: 10px;
    }
    .padding{
      padding-right: 26px;
    }
  }
}
</style>