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
            <span v-if="item.children" @click="changeOpen(item)">
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
        checkAll:false,
        checkedCities:[]
      }
    },
    computed:{
      isIndeterminate(){
        return this.checkIsIndeterminate(this.rowData)
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
              this.$set(item,'isIndeterminate',false)
              this.$set(item,'check',check)
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
      changeOpen(item){
        console.log(item);
        this.$set(item, 'show', !item.show)
      },
      checkChange(val){
        this.checkData(this.rowData,[],val)
      },
      itemCheckChange(val,item) {
        if(item.children){
          this.$set(item, 'isIndeterminate', false)
          item.children.forEach(child=>{
            if(val)
              this.$set(child,'check',true)
            else
            this.$set(child,'check',false)
          })
        }
      },
      childCheckChange(val,item){
        if(val){
          let isIndeterminate = item.children.some(child=>!child.check)
          this.$set(item, 'isIndeterminate', isIndeterminate)
          if(isIndeterminate){
            this.$set(item,'check',false)
          }else{
            this.$set(item,'check',true)
          }
        }else{
          let isIndeterminate = item.children.some(child=>child.check)
          item.isIndeterminate = isIndeterminate
          this.$set(item, 'isIndeterminate', isIndeterminate)
          this.$set(item,'check',false)
        }
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