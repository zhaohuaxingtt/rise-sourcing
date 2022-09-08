<template>
  <div>
    <el-table
      border
      tooltip-effect="light"
      :height="height"
      :data="tableData"
      v-loading="tableLoading"
      @selection-change="handleSelectionChange"
      :empty-text="$t('LK_ZANWUSHUJU')"
      ref="moviesTable"
      :class="radio && 'radio'"
      :span-method="objectSpanMethod"
      :row-class-name="tableRowClassName"
      class="table"
      :key="keystring"
    >
      <el-table-column
        v-if="selection"
        type="selection"
        width="50"
        align="center"
        :key="index"
      ></el-table-column>
      <template v-for="(items, index) in tableTitle">
        <el-table-column
          :key="index"
          align="center"
          :show-overflow-tooltip="items.tooltip"
          v-if="items.props == 'detail'"
          :prop="items.props"
          :label="$t(items.key)"
          :width="items.width"
          :min-width="items.minWidth"
        >
          <template slot-scope="row"
            ><span class="openLinkText cursor" @click="openDetailPage(row.row)"
              >明细</span
            ></template
          >
        </el-table-column>
        <el-table-column
          :key="index"
          align="center"
          :show-overflow-tooltip="items.tooltip && !canEdit"
          v-else-if="items.props == 'partType'"
          :prop="items.props"
          :label="$t(items.key)"
          :width="items.width"
          :min-width="items.minWidth"
        >
          <template slot="header">
            <span>{{ $t(items.key) }}</span>
            <span style="color: red">*</span>
          </template>
          <template slot-scope="scope">
            <iSelect
              v-if="canEdit && canEditRow(scope.row)"
              v-model="scope.row['partType']"
            >
              <el-option
                v-for="items in fromGroup.PART_TYPE"
                :key="items.code"
                :value="items.code"
                :label="items.name"
              />
            </iSelect>
            <span v-else>{{ translatePart(scope.row["partType"]) }}</span>
          </template>
        </el-table-column>
        <el-table-column
          :key="index"
          align="center"
          :show-overflow-tooltip="items.tooltip && !canEdit"
          v-else-if="items.props == 'unitCode'"
          :prop="items.props"
          :label="$t(items.key)"
          :width="items.width"
          :min-width="items.minWidth"
        >
          <template slot="header">
            <span>{{ $t(items.key) }}</span>
            <span style="color: red">*</span>
          </template>
          <template slot-scope="scope">
            <iSelect
              v-if="canEdit && canEditRow(scope.row)"
              v-model="scope.row['unitCode']"
              @change="handleUnitChange(scope.row, items.code)"
            >
              <el-option
                v-for="items in handleArray(fromGroup.UNIT)"
                :key="items.code"
                :value="items.code"
                :label="
                  $i18n.locale == 'zh' ? items.name : items.nameEn || items.code
                "
              />
            </iSelect>
            <span v-else>{{ scope.row["unitCode"] }}</span>
          </template>
        </el-table-column>
        <el-table-column
          :key="index"
          align="center"
          :show-overflow-tooltip="items.tooltip && !canEdit"
          v-else-if="items.props == 'account'"
          :prop="items.props"
          :label="$t(items.key)"
          :width="items.width"
          :min-width="items.minWidth"
        >
          <template slot-scope="scope">
            <iInput v-if="canEdit" v-model="scope.row['account']"></iInput>
            <span v-else>{{ scope.row["account"] }}</span>
          </template>
        </el-table-column>
        <el-table-column
          :key="index"
          align="center"
          :show-overflow-tooltip="items.tooltip && !canEdit"
          v-else-if="items.props == 'partNum'"
          :prop="items.props"
          :label="$t(items.key)"
          :width="items.width"
          :min-width="items.minWidth"
        >
          <template slot="header">
            <span>{{ $t(items.key) }}</span>
            <span v-if="!baseinfodata.partPrefix" style="color: red">*</span>
          </template>
          <template slot-scope="scope">
            <iInput
              v-if="canEdit && canEditRow(scope.row)"
              v-model.trim="scope.row['partNum']"
              @blur="
                getPartInfoAsync(scope.row['partNum'], scope.row['sapItem'])
              "
            ></iInput>
            <span v-else>{{ scope.row["partNum"] }}</span>
          </template>
        </el-table-column>
        <el-table-column
          :key="index"
          align="center"
          :show-overflow-tooltip="items.tooltip && !canEdit"
          v-else-if="items.props == 'partNameZh'"
          :prop="items.props"
          :label="$t(items.key)"
          :width="items.width"
          :min-width="items.minWidth"
        >
          <template slot="header">
            <span>{{ $t(items.key) }}</span>
            <span style="color: red">*</span>
          </template>
          <template slot-scope="scope">
            <iInput
              v-if="!scope.row['partNum'] && canEdit && canEditRow(scope.row)"
              v-model="scope.row.partNameZh"
              :disabled="scope.row.partNum != ''"
              placeholder="请输入"
            />
            <span v-else>{{ scope.row["partNameZh"] }}</span>
          </template>
        </el-table-column>
        <el-table-column
          :key="index"
          align="center"
          :show-overflow-tooltip="items.tooltip && !canEdit"
          v-else-if="items.props == 'quantity'"
          :prop="items.props"
          :label="$t(items.key)"
          :width="items.width"
          :min-width="items.minWidth"
        >
          <template slot="header">
            <span>{{ $t(items.key) }}</span>
            <span style="color: red">*</span>
          </template>
          <template slot-scope="scope">
            <span
              v-if="baseinfodata.subType === 'ZN_AGT'"
              class="openLinkText cursor"
              @click="viewQuantity(scope.row)"
              >查看</span
            >
            <iInput
              v-else-if="
                baseinfodata.subType === 'ZN_ONE' &&
                canEdit &&
                canEditRow(scope.row)
              "
              v-model="scope.row.quantity"
              @input="handleInput($event, scope.row)"
              placeholder="请输入"
            />
            <span v-else>{{ scope.row["quantity"] }}</span>
          </template>
        </el-table-column>
        <!--<el-table-column :key="index" align="center" :show-overflow-tooltip="items.tooltip" v-else-if="items.props == 'supplierNameZh'" :prop="items.props" :label="$t(items.key)" :width="items.width">
          <template slot="header">
            <span>{{ $t(items.key) }}</span>
            <span style="color: red">*</span>
          </template>
          <template slot-scope="scope">
            <iInput v-if="canEdit " v-model="scope.row['supplierInfo']" @blur="getSupplierInfoAsync(scope.row['supplierInfo'], scope.row['sapItem'])"></iInput>
            <span v-else>{{ scope.row['supplierNameZh'] == null || scope.row['supplierNameZh'] == '' ? '' : `${scope.row['supplierSapCode']}-${scope.row['supplierNameZh']}` }}</span>
          </template>
        </el-table-column>-->
        <el-table-column
          :key="index"
          align="center"
          :show-overflow-tooltip="items.tooltip && !canEdit"
          v-else-if="items.props == 'factoryName'"
          :prop="items.props"
          :label="$t(items.key)"
          :width="items.width"
        >
          <template slot="header">
            <span>{{ $t(items.key) }}</span>
            <span style="color: red">*</span>
          </template>
          <template slot-scope="scope">
            <iSelect
              v-if="canEdit && canEditRow(scope.row)"
              v-model="scope.row.procureFactory"
              @change="
                (procureFactory) =>
                  handleFactoryChange(procureFactory, scope.row)
              "
            >
              <el-option
                v-for="items in splitPurchList"
                :key="items.code"
                :value="items.procureFactory"
                :label="`${items.procureFactory}-${items.factoryName}`"
              />
            </iSelect>
            <span v-else>{{
              scope.row.factoryName == null || scope.row.factoryName == ""
                ? ""
                : `${scope.row.procureFactory}-${scope.row.factoryName}`
            }}</span>
          </template>
        </el-table-column>
        <el-table-column
          :key="index"
          align="center"
          :show-overflow-tooltip="items.tooltip && !canEdit"
          v-else-if="items.props == 'procureGroup'"
          :prop="items.props"
          :label="$t(items.key)"
          :width="items.width"
        >
          <template slot-scope="scope">
            <iInput
              v-if="canEdit && canEditRow(scope.row)"
              v-model="scope.row['procureGroup']"
              @blur="checkPurchaseGroup(scope.row)"
            ></iInput>
            <span v-else>{{ scope.row["procureGroup"] }}</span>
          </template>
        </el-table-column>
        <el-table-column
          :key="index"
          align="center"
          :show-overflow-tooltip="items.tooltip && !canEdit"
          v-else-if="items.props == 'requestTraceNo'"
          :prop="items.props"
          :label="$t(items.key)"
          :width="items.width"
        >
          <template slot-scope="scope">
            <iInput
              v-if="canEdit && canEditRow(scope.row)"
              v-model="scope.row['requestTraceNo']"
            ></iInput>
            <span v-else>{{ scope.row["requestTraceNo"] }}</span>
          </template>
        </el-table-column>
        <el-table-column
          :key="index"
          align="center"
          :show-overflow-tooltip="items.tooltip && !canEdit"
          v-else-if="items.props == 'storageLocationCode'"
          :prop="items.props"
          :label="$t(items.key)"
          :width="items.width"
        >
          <template slot-scope="scope">
            <iSelect
              v-if="canEdit && canEditRow(scope.row)"
              :disabled="!scope.row.procureFactory"
              v-model="scope.row.storageLocation"
              @visible-change="visibleChange($event, scope.row)"
              @change="
                (inventoryLocation) =>
                  departmentChange(inventoryLocation, scope.row)
              "
              value-key="id"
            >
              <el-option
                v-for="items in scope.row.addressList"
                :key="items.id"
                :value="`${items.inventoryLocation}-${items.description}`"
                :label="`${items.inventoryLocation}-${items.description}`"
              />
            </iSelect>
            <span v-else>{{ scope.row.storageLocationDesc }}</span>
          </template>
        </el-table-column>
        <el-table-column
          :key="index"
          align="center"
          :show-overflow-tooltip="items.tooltip && !canEdit"
          v-else-if="items.props == 'deliveryDate'"
          :width="items.width"
          :label="$t(items.key)"
          :prop="items.props"
        >
          <template slot="header">
            <span>{{ $t(items.key) }}</span>
            <span style="color: red">*</span>
          </template>
          <template slot-scope="scope">
            <iDatePicker
              v-if="canEdit && canEditRow(scope.row)"
              class="datapicker"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd HH:mm:ss"
              v-model="scope.row['deliveryDate']"
              type="date"
            />
            <span v-else>{{ scope.row["deliveryDate"] }}</span>
          </template>
        </el-table-column>
        <el-table-column
          :key="index"
          align="center"
          :show-overflow-tooltip="items.tooltip"
          v-else-if="items.props == 'status'"
          :width="items.width"
          :label="$t(items.key)"
          :prop="items.props"
        >
          <template slot-scope="scope">
            <span>{{
              getStatus(scope.row.status, scope.row.nominationStatus)
            }}</span>
          </template>
        </el-table-column>
        <el-table-column
          :key="index"
          align="center"
          :show-overflow-tooltip="items.tooltip"
          v-else
          :label="$t(items.key)"
          :prop="items.props"
          :width="items.width"
        ></el-table-column>
      </template>
    </el-table>
    <item-dialog
      @handleSaveDetail="handleSaveDetail"
      v-model="showItem"
      :canEdit="canEdit"
      :detailInfo="detailInfo"
    />
    <quility-dialog
      @handleSaveDetail="handleSaveQuantity"
      v-model="showQuility"
      :canEdit="canEdit"
      :detailInfo="detailInfo"
    />
  </div>
</template>

<script>
import { iInput, iSelect, iDatePicker, iMessage } from "rise";
import ItemDialog from "../../components/itemDialog.vue";
import QuilityDialog from "./quilityDialog.vue";
import { getSupplierInfoQuery } from "@/api/ws2/modelOrder";
import { numberProcessor } from "@/utils";
import { statusList } from "../../components/data";
import {
  validationPart,
  purchaseGroup,
  inventoryLocation,
} from "@/api/ws2/purchaserequest";
export default {
  components: {
    iInput,
    iSelect,
    iDatePicker,
    ItemDialog,
    QuilityDialog,
  },
  props: {
    tableData: { type: Array },
    tableTitle: { type: Array },
    tableLoading: { type: Boolean, default: false },
    height: { type: Number || String },
    fromGroup: { type: Object, default: () => ({}) },
    splitPurchList: { type: Array },
    selection: { type: Boolean, default: true },
    radio: { type: Boolean, default: false }, // 是否单选
    addressList: { type: Array },
    canEdit: { type: Boolean, default: false },
    baseinfodata: { type: Object, default: () => {} },
  },
  data() {
    return {
      showItem: false,
      showQuility: false,
      detailInfo: {},
    };
  },
  inject: ["vm"],
  created() {},
  methods: {
    canEditRow(row) {
      return ["", "-1", "-2"].includes(row.status);
    },
    // 限制输入数值
    handleInput(value, row) {
      this.$set(row, "quantity", numberProcessor(value, 2));
    },
    getLocation(purchaseFactory, row) {
      inventoryLocation({
        isSpare: false,
        procureFactory: purchaseFactory,
      })
        .then((res) => {
          this.$set(row, "addressList", res.data || []);
        })
        .catch((err) => {});
    },
    openDetailPage(val) {
      this.showItem = true;
      this.detailInfo = val;
    },
    handleSelectionChange(val) {
      if (this.radio) {
        if (val.length > 1) {
          //取出最后val的最后一个返回出来
          var duoxuans = val.pop();
          this.handleSelectArr = val.pop();
          //清除所有选中
          this.$refs.moviesTable.clearSelection();
          //给最后一个加上选中
          this.$refs.moviesTable.toggleRowSelection(duoxuans);
        } else {
          this.$emit("handleSelectionChange", val);
        }
      } else {
        this.$emit("handleSelectionChange", val);
      }
    },
    handleArray(ary) {
      if (ary) {
        ary.map((item, index) => {
          if (item.code == "PC") {
            ary.unshift(ary.splice(index, 1));
          }
        });
        return ary.flat();
      } else {
        return [];
      }
    },
    handleFactoryChange(procureFactory, row) {
      const factory = this.splitPurchList.find(
        (e) => e.procureFactory == procureFactory
      );
      if (factory) {
        row.factoryName = factory.factoryName;
        row.tmFactoryId = factory.id;
      }
      this.$set(row, "storageLocationCode", "");
      this.$set(row, "storageLocationDesc", "");
      this.$set(row, "storageLocation", "");
      this.getLocation(procureFactory, row);
      this.$emit("handleFactoryChange", procureFactory);
      /* let data = val.split('-')
			let factoryCode
			let factoryItem = this.splitPurchList.find((item) => {
				return item.procureFactory == data[0]
			})
			this.tableData = this.tableData.map((element) => {
				if (element.sapItem == index) {
					element.factoryInfo = `${data[0]}-${data[1]}`
					element.procureFactory = data[0]
					element.factoryName = data[1]
					element.tmFactoryId = factoryItem.id
					factoryCode = data[0]
				}
				return element
			}) */
      // this.$emit('handleFactoryChange', factoryCode)
    },
    // 查看數量
    viewQuantity(data) {
      this.showQuility = true;
      this.detailInfo = data;
    },
    //保存
    handleSaveQuantity(data) {
      this.showQuility = false;
      this.detailInfo.normalPrQuantityYears = data;
      this.$emit("normalPrQuantityYears", data);
    },
    // 保存
    handleSaveDetail() {
      this.showItem = false;
    },
    // 获取供应商信息
    getSupplierInfoAsync(queryString, index) {
      let query = queryString.split("-");
      let sapCode;
      if (query.length > 1) {
        sapCode = query[0];
      } else {
        sapCode = queryString;
      }
      getSupplierInfoQuery({
        sapCode: sapCode,
        supplierType: "PP",
      }).then((res) => {
        if (+res?.code !== 200 || res.data == null) {
          this.tableData = this.tableData.map((element) => {
            if (element.sapItem == index) {
              element.supplierInfo = "";
              element.supplierNameZh = "";
              element.supplierSapCode = "";
              element.tmSupplierId = "";
            }
            return element;
          });
          return iMessage.error("没有此供应商");
        } else {
          this.tableData = this.tableData.map((element) => {
            if (element.sapItem == index) {
              element.supplierInfo = `${res?.data?.sapCode}-${res?.data?.shortNameZh}`;
              element.supplierNameZh = res?.data?.shortNameZh;
              element.supplierSapCode = res?.data?.sapCode;
              element.tmSupplierId = res?.data?.supplierId;
            }
            return element;
          });
          // this.keystring = new Date()
        }
      });
    },
    //获取零件数据
    getPartInfoAsync(queryString, index) {
      validationPart({ partsNum: queryString }).then((res) => {
        if (+res?.code !== 200 || res.data == null) {
          this.tableData = this.tableData.map((element) => {
            if (element.sapItem == index) {
              element.partNum = "";
              element.categoryId = "";
              element.categoryName = "";
              element.partNameZh = "";
              element.unit = "";
              element.unitCode = "";
              element.applyDeptNo = "";
            }
            return element;
          });
          // return iMessage.error('没有此零件号')
        } else {
          this.tableData = this.tableData.map((element) => {
            if (element.sapItem == index) {
              element.categoryId = res?.data?.categoryId;
              element.categoryName = res?.data?.categoryName;
              element.dept = res?.data?.dept;
              element.partNameZh = res?.data?.partNameZh;
              element.unit = res?.data?.unitNameZh;
              element.unitCode = res?.data?.unitNameEn;
              element.applyDeptNo = res?.data?.dept;
            }
            return element;
          });
          // this.keystring = new Date()
        }
      });
    },
    //零件类型
    translatePart(status) {
      try {
        return this.fromGroup.PART_TYPE.find((i) => i.code == status).name;
      } catch (error) {
        return "";
      }
    },

    // 映射状态值
    getStatus(status, nominationStatus) {
      let item = statusList.find((k) => k.code == status);
      if (!item) return status;
      if (status == "1") {
        if (nominationStatus == "2") {
          return this.language("LK_YIDINGDIAN", "已定点");
        }
        return this.language("LK_YIQIANSHOU", "已签收");
      }
      return this.$i18n.locale == "zh" ? item.name : item.nameEn;
    },
    departmentChange(item, row) {
      // const location = row.addressList.find(
      // 	(e) => e.inventoryLocation === inventoryLocation
      // )
      if (item) {
        this.$set(row, "storageLocationCode", item.split("-")[0]);
        this.$set(row, "storageLocationDesc", item.split("-")[1]);
      }
    },
    // 展开库存下拉时查询下拉数据
    visibleChange(visible, row) {
      if (visible && !row.addressList) {
        this.getLocation(row.procureFactory, row);
      }
    },
    handleUnitChange(val, status) {
      try {
        // val.unitCode = this.fromGroup.UNIT.find((i) => i.code == status).code;
        val.unit = this.fromGroup.UNIT.find((i) => i.code == status).name;
      } catch (error) {
        return "";
      }
    },
    //校验采购组
    checkPurchaseGroup(data) {
      purchaseGroup({ purchaseGroupCode: data.procureGroup })
        .then((res) => {
          if (+res?.code !== 200 || res.data == null || res.data.length == 0) {
            data.procureGroup = "";
            return iMessage.error("没有此采购组");
          }
        })
        .catch((err) => iMessage.error("请求失败"));
    },
    // statusEdit(row) {
    //   return (row.status == '1' || !row.status) && !row.contractRiseCode
    // }
  },
};
</script>

<style lang="scss">
.openLinkText {
  color: $color-blue;
}
.activityText {
  color: $color-green;
}
.radio {
  ::v-deep thead .el-table-column--selection .cell {
    display: none;
  }
}
</style>
