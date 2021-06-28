<!--
 * @Author: Haojiang
 * @Date: 2021-06-24 17:53:08
 * @LastEditTime: 2021-06-28 12:16:02
 * @LastEditors: Please set LastEditors
 * @Description: m签字单新增、详情
 * @FilePath: /front-web/src/views/designate/home/signSheet/newSignSheet.vue
-->
<template>
  <iPage class="designateHome">
    
      <div class="margin-bottom20 clearFloat">
        <span class="font18 font-weight">
          {{ language("XINJIANQIANZIDAN",'新建签字单') }}</span
        >
        <div class="floatright">
          <span v-if="mode === 'add'">
            <iButton>
              {{ language("BAOCUN",'保存') }}
            </iButton>
            <iButton>
              {{ language("LK_TIJIAO",'提交') }}
            </iButton>
            <iButton>
              {{ language("YICHU",'移除') }}
            </iButton>
            <iButton>
              {{ language("FANHUI",'返回') }}
            </iButton>
          </span>
          <span v-else>
            <iButton @click="multiEditControl = true">
              {{ language("LK_BIANJI",'返回') }}
            </iButton>
          </span>
          
        </div>
      </div>
      <iCard>
        <el-form>
          <!-- 签字单号 -->
          <el-form-item :label="language('QIANZIDANHAO','签字单号')">
            <iInput
              v-model="form.signId"
              :placeholder="language('LK_QINGSHURU','请输入')"
            ></iInput>
          </el-form-item>
          <!-- 状态 -->
          <el-form-item :label="language('ZHUANGTAI','状态')">
            <iInput
              v-model="form.status"
              :placeholder="language('LK_QINGSHURU','请输入')"
            ></iInput>
          </el-form-item>
        </el-form>
      </iCard>
  </iPage>
</template>
<script>
import { pageMixins } from '@/utils/pageMixins'
import filters from "@/utils/filters"
import tablelist from "@/views/designate/supplier/components/tableList";

import {
  iPage,
  iCard,
  iButton,
  iPagination,
  iMessage
} from "rise";

export default {
  mixins: [ filters, pageMixins ],
  data() {
    return {
      mode: 'add',
      form: {
        signId: this.$router.query.signId,
        status: '草稿'
      },
      
    }
  },
  components: {
    iPage,
    iCard,
    iButton,
    iPagination,
    tablelist
  },

}
</script>